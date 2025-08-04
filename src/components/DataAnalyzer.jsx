import React, { useState, useEffect } from 'react'
import { Upload, FileSpreadsheet, BarChart3, Info, CheckCircle, AlertCircle, Filter, MapPin } from 'lucide-react'
import { loadExcelFile, analyzeDataStructure, loadCrimeClassification, isNorthOfJuliaSt, calculateDistance, getSecurityShift } from '../utils/dataUtils'

const DataAnalyzer = ({ onDataLoaded }) => {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [crimeClassification, setCrimeClassification] = useState(null)
  const [processingStatus, setProcessingStatus] = useState({})

  // Office coordinates for proximity analysis
  const OFFICE_COORDS = {
    lat: 29.942960685319683,
    lon: -90.0653479519101
  }

  useEffect(() => {
    // Automatically try to load the NOPD Data.xlsx file and crime classification
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    setError(null)
    setProcessingStatus({ loading: 'Loading data files...' })

    try {
      // Load crime classification first
      setProcessingStatus({ loading: 'Loading crime classification...' })
      const classification = await loadCrimeClassification()
      setCrimeClassification(classification)

      // Load Excel data
      setProcessingStatus({ loading: 'Loading NOPD Excel data...' })
      const excelData = await loadExcelFile('/NOPD Data.xlsx')
      
      if (!excelData) {
        throw new Error('Could not load NOPD Data.xlsx file')
      }

      // Process and analyze data with your specific requirements
      setProcessingStatus({ loading: 'Processing crime data...' })
      const enhancedAnalysis = await processNOPDData(excelData, classification)
      
      setAnalysis(enhancedAnalysis)
      setProcessingStatus({ complete: true, totalRecords: enhancedAnalysis.totalRecords })
      
      // Pass the processed data back to parent component
      if (onDataLoaded) {
        onDataLoaded(excelData, enhancedAnalysis)
      }
    } catch (err) {
      setError(err.message)
      setProcessingStatus({ error: err.message })
      console.error('Error loading NOPD data:', err)
    } finally {
      setLoading(false)
    }
  }

  const processNOPDData = async (excelData, classification) => {
    const analysis = analyzeDataStructure(excelData)
    
    // Enhanced processing for your specific requirements
    let totalRecords = 0
    let excludedJuliaSt = 0
    let violentCrimes = 0
    let nonViolentCrimes = 0
    let proximityData = { within100ft: 0, within300ft: 0, within500ft: 0 }
    let shiftData = { day: 0, evening: 0, overnight: 0 }
    let monthlyData = {}
    let topCrimes = {}
    
    // Process the main data sheet (assuming first sheet contains crime data)
    if (excelData.sheets && excelData.sheetNames.length > 0) {
      const mainSheet = excelData.sheets[excelData.sheetNames[0]]
      const headers = mainSheet[0] // First row as headers
      
      for (let i = 1; i < mainSheet.length; i++) {
        const row = mainSheet[i]
        totalRecords++
        
        // Extract relevant data based on your actual Excel structure
        const crimeClass = row[0] || '' // Column A: Class
        const reportNumber = row[1] || '' // Column B: Report Number
        const crimeType = row[2] || '' // Column C: Crime
        const dateTime = row[3] || '' // Column D: First Date Time
        const address = row[4] || '' // Column E: Address Of Crime
        const attempted = row[5] || '' // Column F: Attempted
        const latitude = parseFloat(row[6]) || null // Column G: Latitude
        const longitude = parseFloat(row[7]) || null // Column H: Longitude
        const offenseDescription = row[8] || '' // Column I: Offense Description
        const accuracy = row[9] || '' // Column J: Accuracy
        
        // 1. Apply Julia St. filter
        if (isNorthOfJuliaSt(address, latitude)) {
          excludedJuliaSt++
          continue // Skip this record
        }
        
        // 2. Classify violent vs non-violent using improved matching
        const crimeClassified = classification[crimeType.toUpperCase().trim()] || 
                               classification[crimeClass.toUpperCase().trim()] || 
                               'Unknown'
        if (crimeClassified === 'Violent') {
          violentCrimes++
        } else if (crimeClassified === 'Non-Violent') {
          nonViolentCrimes++
        }
        
        // 3. Proximity analysis
        if (latitude && longitude) {
          const distance = calculateDistance(
            OFFICE_COORDS.lat, OFFICE_COORDS.lon,
            latitude, longitude
          )
          
          if (distance <= 100) proximityData.within100ft++
          else if (distance <= 300) proximityData.within300ft++
          else if (distance <= 500) proximityData.within500ft++
        }
        
        // 4. Security shift analysis
        const shift = getSecurityShift(dateTime)
        if (shift.includes('Day')) shiftData.day++
        else if (shift.includes('Evening')) shiftData.evening++
        else if (shift.includes('Overnight')) shiftData.overnight++
        
        // 5. Monthly trends
        if (dateTime) {
          const date = new Date(dateTime)
          if (!isNaN(date)) {
            const monthKey = date.toISOString().substring(0, 7) // YYYY-MM
            if (!monthlyData[monthKey]) {
              monthlyData[monthKey] = { violent: 0, nonViolent: 0, total: 0 }
            }
            monthlyData[monthKey].total++
            if (crimeClassified === 'Violent') monthlyData[monthKey].violent++
            else if (crimeClassified === 'Non-Violent') monthlyData[monthKey].nonViolent++
          }
        }
        
        // 6. Top crimes tracking
        if (!topCrimes[crimeType]) {
          topCrimes[crimeType] = { count: 0, type: crimeClassified }
        }
        topCrimes[crimeType].count++
      }
    }
    
    // Calculate derived metrics
    const violentRatio = totalRecords > 0 ? (violentCrimes / (violentCrimes + nonViolentCrimes)) * 100 : 0
    
    // Find peak month and week
    const monthlyArray = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data
    })).sort((a, b) => b.total - a.total)
    
    const peakMonth = monthlyArray[0] || null
    
    return {
      ...analysis,
      totalRecords,
      excludedJuliaSt,
      violentCrimes,
      nonViolentCrimes,
      violentRatio: violentRatio.toFixed(1),
      proximityData,
      shiftData,
      monthlyData: monthlyArray,
      topCrimes: Object.entries(topCrimes)
        .map(([crime, data]) => ({ crime, ...data }))
        .sort((a, b) => b.count - a.count),
      peakMonth,
      crimeClassification: classification
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">
            {processingStatus.loading || 'Loading NOPD data...'}
          </span>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Processing Steps:</h4>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• Loading crime classification (convertlist.csv)</li>
            <li>• Loading NOPD Excel data</li>
            <li>• Applying Julia St. geographic filter</li>
            <li>• Classifying violent vs non-violent crimes</li>
            <li>• Calculating proximity to office coordinates</li>
            <li>• Analyzing security shift patterns</li>
            <li>• Processing monthly trends</li>
          </ul>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
        <div className="flex items-center space-x-3 text-red-600 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Data Loading Error</h3>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-500">
          Make sure the 'NOPD Data.xlsx' file is in the public folder and accessible.
        </p>
        <button 
          onClick={loadAllData}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry Loading
        </button>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">NOPD Data Analysis</h3>
          <p className="text-gray-600 mb-6">
            Ready to analyze your NOPD data structure and create visualizations.
          </p>
          <button 
            onClick={loadAllData}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
          >
            <Upload className="h-4 w-4" />
            <span>Load NOPD Data</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-green-900">
              NOPD Data Successfully Processed
            </h3>
            <p className="text-green-700">
              Analyzed {analysis.totalRecords} records with enhanced filtering and classification
            </p>
          </div>
        </div>
        
        {/* Processing Results */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">Total Records</p>
            <p className="text-xl font-bold text-green-600">{analysis.totalRecords}</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">Violent Crimes</p>
            <p className="text-xl font-bold text-red-600">{analysis.violentRatio}%</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">Excluded (Julia St.)</p>
            <p className="text-xl font-bold text-yellow-600">{analysis.excludedJuliaSt}</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-600">Near Office (100ft)</p>
            <p className="text-xl font-bold text-blue-600">{analysis.proximityData?.within100ft || 0}</p>
          </div>
        </div>
      </div>

      {/* Enhanced Processing Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Filter className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Enhanced Data Processing</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Crime Classification</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Violent Crimes:</span>
                <span className="font-medium text-red-600">{analysis.violentCrimes}</span>
              </div>
              <div className="flex justify-between">
                <span>Non-Violent Crimes:</span>
                <span className="font-medium text-blue-600">{analysis.nonViolentCrimes}</span>
              </div>
              <div className="flex justify-between">
                <span>Classification Source:</span>
                <span className="font-medium text-green-600">convertlist.csv</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Geographic Filtering</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Records Excluded (N of Julia St.):</span>
                <span className="font-medium text-yellow-600">{analysis.excludedJuliaSt}</span>
              </div>
              <div className="flex justify-between">
                <span>Office Coordinates:</span>
                <span className="font-medium text-gray-600">29.9429°, -90.0653°</span>
              </div>
              <div className="flex justify-between">
                <span>Proximity Analysis:</span>
                <span className="font-medium text-green-600">✓ Complete</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Security Shift Distribution
          </h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-blue-600">Day Shift</p>
              <p className="font-bold text-blue-800">{analysis.shiftData?.day || 0}</p>
              <p className="text-xs text-blue-600">7:45AM-4:15PM</p>
            </div>
            <div className="text-center">
              <p className="text-blue-600">Evening Shift</p>
              <p className="font-bold text-blue-800">{analysis.shiftData?.evening || 0}</p>
              <p className="text-xs text-blue-600">3:45PM-12:15AM</p>
            </div>
            <div className="text-center">
              <p className="text-blue-600">Overnight Shift</p>
              <p className="font-bold text-blue-800">{analysis.shiftData?.overnight || 0}</p>
              <p className="text-xs text-blue-600">11:45PM-8:15AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Structure Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Info className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Data Structure Analysis</h3>
        </div>

        {analysis.sheets.map((sheet, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Sheet: {sheet.name}
              </h4>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {sheet.recordCount} records
              </span>
            </div>

            {/* Field Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Date Fields</h5>
                {sheet.dateFields.length > 0 ? (
                  <ul className="text-sm text-blue-700 space-y-1">
                    {sheet.dateFields.map((field, i) => (
                      <li key={i} className="truncate">• {field}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-blue-600">None found</p>
                )}
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h5 className="font-medium text-red-900 mb-2">Crime Fields</h5>
                {sheet.crimeFields.length > 0 ? (
                  <ul className="text-sm text-red-700 space-y-1">
                    {sheet.crimeFields.map((field, i) => (
                      <li key={i} className="truncate">• {field}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-red-600">None found</p>
                )}
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">Location Fields</h5>
                {sheet.locationFields.length > 0 ? (
                  <ul className="text-sm text-green-700 space-y-1">
                    {sheet.locationFields.map((field, i) => (
                      <li key={i} className="truncate">• {field}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-600">None found</p>
                )}
              </div>
            </div>

            {/* All Headers */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">All Column Headers</h5>
              <div className="text-sm text-gray-700 max-h-32 overflow-y-auto">
                {sheet.headers.join(', ')}
              </div>
            </div>

            {/* Sample Data Preview */}
            {sheet.sampleData.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Sample Record</h5>
                <div className="text-sm text-gray-700 max-h-32 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {sheet.headers.slice(0, 10).map((header, i) => (
                      <div key={i} className="flex">
                        <span className="font-medium min-w-0 flex-shrink-0 mr-2">{header}:</span>
                        <span className="text-gray-600 truncate">{sheet.sampleData[i] || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Dashboard Recommendations</h3>
        </div>
        
        <div className="text-blue-800 space-y-2">
          <p>• <strong>Timeline Charts:</strong> Use date fields for trend analysis over time</p>
          <p>• <strong>Crime Distribution:</strong> Create pie charts based on crime type fields</p>
          <p>• <strong>Geographic Analysis:</strong> Map incidents by district/location fields</p>
          <p>• <strong>Performance Metrics:</strong> Calculate clearance rates, response times</p>
        </div>
      </div>
    </div>
  )
}

export default DataAnalyzer
