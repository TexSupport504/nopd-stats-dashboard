import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

const DataTest = () => {
  const [result, setResult] = useState('Testing...')

  useEffect(() => {
    const testDataLoad = async () => {
      try {
        console.log('=== DIRECT DATA TEST ===')
        
        // Test 1: Basic fetch
        console.log('Test 1: Basic fetch')
        const response = await fetch('/nopd-data.xlsx')
        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        // Test 2: Get arrayBuffer
        console.log('Test 2: Getting arrayBuffer')
        const arrayBuffer = await response.arrayBuffer()
        console.log('ArrayBuffer size:', arrayBuffer.byteLength)
        
        // Test 3: Parse with XLSX
        console.log('Test 3: Parsing with XLSX')
        const workbook = XLSX.read(arrayBuffer, { type: 'array' })
        console.log('Sheet names:', workbook.SheetNames)
        
        // Test 4: Convert to JSON
        console.log('Test 4: Converting to JSON')
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
        console.log('Data rows:', data.length)
        console.log('Headers:', data[0])
        console.log('First 3 data rows:', data.slice(1, 4))
        
        setResult(`SUCCESS! Loaded ${data.length} rows with ${data[0]?.length} columns`)
        
      } catch (error) {
        console.error('Test failed:', error)
        setResult(`FAILED: ${error.message}`)
      }
    }
    
    testDataLoad()
  }, [])

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '20px' }}>
      <h2>NOPD Data Loading Test</h2>
      <p><strong>Result:</strong> {result}</p>
      <p><em>Check browser console for detailed logs</em></p>
    </div>
  )
}

export default DataTest
