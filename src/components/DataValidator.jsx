import { useState, useEffect } from 'react'
import { loadExcelFile, loadCrimeClassification } from '../utils/dataUtils'

export const DataValidator = () => {
  const [validationResults, setValidationResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const validateData = async () => {
    setLoading(true)
    const results = {
      fileExists: false,
      sheetsFound: [],
      headerStructure: null,
      sampleRows: [],
      columnCount: 0,
      rowCount: 0,
      errors: []
    }

    try {
      // Test Excel file loading
      const excelData = await loadExcelFile('/NOPD Data.xlsx')
      
      if (excelData) {
        results.fileExists = true
        results.sheetsFound = excelData.sheetNames
        
        if (excelData.sheetNames.length > 0) {
          const firstSheet = excelData.sheets[excelData.sheetNames[0]]
          
          if (firstSheet && firstSheet.length > 0) {
            results.headerStructure = firstSheet[0] // First row (headers)
            results.columnCount = firstSheet[0].length
            results.rowCount = firstSheet.length
            
            // Get first 3 data rows (skip header)
            results.sampleRows = firstSheet.slice(1, 4)
          } else {
            results.errors.push('First sheet appears to be empty')
          }
        } else {
          results.errors.push('No sheets found in Excel file')
        }
      } else {
        results.errors.push('Failed to load Excel file')
      }

      // Test crime classification loading
      try {
        const classification = await loadCrimeClassification()
        results.classificationLoaded = !!classification
        results.classificationCount = Object.keys(classification || {}).length
      } catch (err) {
        results.errors.push(`Crime classification error: ${err.message}`)
      }

    } catch (error) {
      results.errors.push(`Validation error: ${error.message}`)
    }

    setValidationResults(results)
    setLoading(false)
  }

  useEffect(() => {
    validateData()
  }, [])

  if (loading) {
    return <div className="p-4">Validating NOPD data files...</div>
  }

  if (!validationResults) {
    return <div className="p-4">No validation results available</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">NOPD Data Validation Results</h2>
      
      <div className="space-y-4">
        {/* File Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">File Status</h3>
          <p className="mb-2">
            <span className="font-medium">Excel File:</span> 
            <span className={validationResults.fileExists ? 'text-green-600' : 'text-red-600'}>
              {validationResults.fileExists ? ' ✓ Found' : ' ✗ Not Found'}
            </span>
          </p>
          <p>
            <span className="font-medium">Crime Classification:</span> 
            <span className={validationResults.classificationLoaded ? 'text-green-600' : 'text-red-600'}>
              {validationResults.classificationLoaded ? ` ✓ Loaded (${validationResults.classificationCount} entries)` : ' ✗ Failed to Load'}
            </span>
          </p>
        </div>

        {/* Sheet Information */}
        {validationResults.sheetsFound.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Excel Structure</h3>
            <p><span className="font-medium">Sheets Found:</span> {validationResults.sheetsFound.join(', ')}</p>
            <p><span className="font-medium">Columns:</span> {validationResults.columnCount}</p>
            <p><span className="font-medium">Rows:</span> {validationResults.rowCount}</p>
          </div>
        )}

        {/* Headers */}
        {validationResults.headerStructure && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Column Headers</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {validationResults.headerStructure.map((header, index) => (
                <div key={index} className="flex">
                  <span className="font-medium w-8">#{index + 1}:</span>
                  <span>{header || '<empty>'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Data */}
        {validationResults.sampleRows.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Sample Data (First 3 Rows)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    {validationResults.headerStructure.map((header, index) => (
                      <th key={index} className="p-2 text-left border">
                        {header || `Col ${index + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {validationResults.sampleRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2 border max-w-xs truncate">
                          {cell || '<empty>'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Errors */}
        {validationResults.errors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-lg mb-2 text-red-800">Issues Found</h3>
            <ul className="list-disc pl-5 space-y-1">
              {validationResults.errors.map((error, index) => (
                <li key={index} className="text-red-700">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Expected Structure */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-lg mb-2 text-blue-800">Expected Data Structure</h3>
          <p className="text-blue-700 mb-2">The dashboard expects the following columns (in order):</p>
          <ol className="list-decimal pl-5 space-y-1 text-blue-700">
            <li>Record ID (Column A)</li>
            <li>Crime Type (Column B) - Must match entries in convertlist.csv</li>
            <li>Address (Column C) - Used for Julia St. filtering</li>
            <li>Latitude (Column D) - Decimal format for proximity analysis</li>
            <li>Longitude (Column E) - Decimal format for proximity analysis</li>
            <li>Date/Time (Column F) - Used for security shift analysis</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default DataValidator
