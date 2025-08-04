// Enhanced Data utilities for the NOPD Stats Dashboard
import * as XLSX from 'xlsx'

/**
 * Load and parse Excel file
 * @param {string} filePath - Path to Excel file
 * @returns {Promise<Object>} Parsed data with sheets
 */
export const loadExcelFile = async (filePath) => {
  try {
    const response = await fetch(filePath)
    const arrayBuffer = await response.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    
    const sheets = {}
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName]
      sheets[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    })
    
    return {
      sheetNames: workbook.SheetNames,
      sheets: sheets,
      rawWorkbook: workbook
    }
  } catch (error) {
    console.error('Error loading Excel file:', error)
    return null
  }
}

/**
 * Load crime classification mapping from convertlist.csv
 * @returns {Promise<Object>} Crime classification mapping
 */
export const loadCrimeClassification = async () => {
  try {
    const response = await fetch('/convertlist.csv')
    const text = await response.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    const classification = {}
    lines.forEach((line, index) => {
      if (index === 0) return // Skip header
      const [crime, type] = line.split(',').map(item => item.trim().replace(/"/g, ''))
      if (crime && type) {
        classification[crime.toUpperCase()] = type
      }
    })
    
    return classification
  } catch (error) {
    console.error('Error loading crime classification:', error)
    // Fallback classification based on your requirements
    return {
      'AGGRAVATED ASSAULT': 'Violent',
      'SIMPLE ASSAULT': 'Violent',
      'SIMPLE BATTERY': 'Violent',
      'AGGRAVATED BATTERY': 'Violent',
      'ARMED ROBBERY': 'Violent',
      'THEFT': 'Non-Violent',
      'AUTO THEFT': 'Non-Violent',
      'BURGLARY': 'Non-Violent',
      'CRIMINAL MISCHIEF': 'Non-Violent',
      'FRAUD': 'Non-Violent'
    }
  }
}

/**
 * Check if an address is north of Julia Street (to be excluded)
 * @param {string} address - Address string
 * @param {number} latitude - Latitude coordinate
 * @returns {boolean} True if should be excluded
 */
export const isNorthOfJuliaSt = (address, latitude) => {
  // Julia Street approximate latitude: 29.9434 (this needs to be refined based on actual data)
  const JULIA_ST_LATITUDE = 29.9434
  
  if (latitude && latitude > JULIA_ST_LATITUDE) {
    return true
  }
  
  // Check address string for north side indicators
  if (address && typeof address === 'string') {
    const addressUpper = address.toUpperCase()
    // Look for street numbers that indicate north side
    if (addressUpper.includes('JULIA') && addressUpper.includes('N ')) {
      return true
    }
  }
  
  return false
}

/**
 * Calculate distance from office coordinates
 * @param {number} lat1 - Latitude 1
 * @param {number} lon1 - Longitude 1  
 * @param {number} lat2 - Latitude 2
 * @param {number} lon2 - Longitude 2
 * @returns {number} Distance in feet
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000 // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distanceMeters = R * c
  return distanceMeters * 3.28084 // Convert to feet
}

/**
 * Determine security shift based on time
 * @param {string|Date} timeString - Time string or Date object
 * @returns {string} Shift name
 */
export const getSecurityShift = (timeString) => {
  let hour, minute
  
  if (timeString instanceof Date) {
    hour = timeString.getHours()
    minute = timeString.getMinutes()
  } else if (typeof timeString === 'string') {
    const time = new Date(timeString)
    if (!isNaN(time)) {
      hour = time.getHours()
      minute = time.getMinutes()
    } else {
      // Try to parse time string manually
      const timeMatch = timeString.match(/(\d{1,2}):(\d{2})/)
      if (timeMatch) {
        hour = parseInt(timeMatch[1])
        minute = parseInt(timeMatch[2])
      } else {
        return 'Unknown'
      }
    }
  } else {
    return 'Unknown'
  }
  
  const totalMinutes = hour * 60 + minute
  
  // Day Shift: 7:45AM - 4:15PM (465 - 975 minutes)
  if (totalMinutes >= 465 && totalMinutes < 975) {
    return 'Day (7:45AM-4:15PM)'
  }
  // Evening Shift: 3:45PM - 12:15AM (945 - 1455 minutes, wrapping around)
  else if (totalMinutes >= 945 || totalMinutes < 15) {
    return 'Evening (3:45PM-12:15AM)'
  }
  // Overnight Shift: 11:45PM - 8:15AM (1425 minutes or < 495 minutes)
  else {
    return 'Overnight (11:45PM-8:15AM)'
  }
}

/**
 * Process raw NOPD data and return formatted statistics
 * @param {Array} rawData - Your raw data array
 * @returns {Object} Formatted statistics object
 */
export const processStatsData = (rawData) => {
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return {
      totalIncidents: 0,
      incidentTrend: 0,
      totalArrests: 0,
      arrestTrend: 0,
      responseTime: 0,
      responseTrend: 0,
      clearanceRate: 0,
      clearanceTrend: 0
    }
  }

  // Basic statistics calculation
  const totalIncidents = rawData.length
  
  // Calculate trends (mock for now - you'll adjust based on your date fields)
  const currentMonth = new Date().getMonth()
  const currentMonthData = rawData.filter(item => {
    // Adjust this based on your actual date field name
    const date = new Date(item.date || item.Date || item.DATE)
    return date.getMonth() === currentMonth
  })
  
  const previousMonthData = rawData.filter(item => {
    const date = new Date(item.date || item.Date || item.DATE)
    return date.getMonth() === currentMonth - 1
  })
  
  const incidentTrend = previousMonthData.length > 0 
    ? ((currentMonthData.length - previousMonthData.length) / previousMonthData.length * 100)
    : 0

  return {
    totalIncidents,
    incidentTrend: Math.round(incidentTrend * 10) / 10,
    totalArrests: rawData.filter(item => item.arrest || item.Arrest || item.ARREST).length,
    arrestTrend: 2.1, // Will calculate based on actual data
    responseTime: 8.5, // Will calculate based on actual data
    responseTrend: -12.3, // Will calculate based on actual data
    clearanceRate: 68.7, // Will calculate based on actual data
    clearanceTrend: 2.8 // Will calculate based on actual data
  }
}

/**
 * Process data for chart visualization with NOPD-specific logic
 * @param {Array} rawData - Your raw data array
 * @param {string} chartType - Type of chart ('bar', 'pie', 'line', 'timeline')
 * @returns {Array} Formatted data for charts
 */
export const processChartData = (rawData, chartType = 'bar') => {
  if (!rawData || !Array.isArray(rawData)) return []
  
  switch (chartType) {
    case 'timeline':
    case 'bar':
      // Group by month for timeline charts
      const monthlyData = groupDataByMonth(rawData)
      return Object.keys(monthlyData).map(month => ({
        month: month,
        incidents: monthlyData[month].length,
        arrests: monthlyData[month].filter(item => item.arrest || item.Arrest).length
      }))
    
    case 'pie':
      // Group by crime type or incident type
      const crimeTypes = groupBy(rawData, 'crimeType' || 'crime_type' || 'type')
      const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4', '#f97316']
      
      return Object.keys(crimeTypes).slice(0, 7).map((type, index) => ({
        name: type || 'Unknown',
        value: crimeTypes[type].length,
        color: colors[index] || '#6b7280'
      }))
    
    case 'district':
      // Group by district or geographic area
      const districts = groupBy(rawData, 'district' || 'District' || 'DISTRICT')
      return Object.keys(districts).map(district => ({
        district: district || 'Unknown',
        incidents: districts[district].length
      }))
    
    default:
      return []
  }
}

/**
 * Group data by month
 * @param {Array} data - Data array
 * @returns {Object} Data grouped by month
 */
const groupDataByMonth = (data) => {
  return data.reduce((groups, item) => {
    // Try different possible date field names
    const dateField = item.date || item.Date || item.DATE || item.incident_date || item.reportDate
    if (!dateField) return groups
    
    const date = new Date(dateField)
    if (isNaN(date.getTime())) return groups
    
    const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    
    if (!groups[monthKey]) {
      groups[monthKey] = []
    }
    groups[monthKey].push(item)
    return groups
  }, {})
}

/**
 * Analyze NOPD data structure and provide summary
 * @param {Object} excelData - Parsed Excel data
 * @returns {Object} Data structure analysis
 */
export const analyzeDataStructure = (excelData) => {
  if (!excelData || !excelData.sheets) {
    return { error: 'No data provided' }
  }

  const analysis = {
    sheets: [],
    totalRecords: 0,
    dateFields: [],
    crimeFields: [],
    locationFields: [],
    recommendedStructure: {}
  }

  Object.keys(excelData.sheets).forEach(sheetName => {
    const sheetData = excelData.sheets[sheetName]
    if (sheetData.length === 0) return

    const headers = sheetData[0] || []
    const sampleRow = sheetData[1] || []
    const recordCount = sheetData.length - 1 // Exclude header

    // Analyze field types
    const dateFields = headers.filter(header => 
      typeof header === 'string' && (
        header.toLowerCase().includes('date') ||
        header.toLowerCase().includes('time') ||
        header.toLowerCase().includes('when')
      )
    )

    const crimeFields = headers.filter(header =>
      typeof header === 'string' && (
        header.toLowerCase().includes('crime') ||
        header.toLowerCase().includes('incident') ||
        header.toLowerCase().includes('offense') ||
        header.toLowerCase().includes('type')
      )
    )

    const locationFields = headers.filter(header =>
      typeof header === 'string' && (
        header.toLowerCase().includes('district') ||
        header.toLowerCase().includes('location') ||
        header.toLowerCase().includes('address') ||
        header.toLowerCase().includes('zone') ||
        header.toLowerCase().includes('beat')
      )
    )

    analysis.sheets.push({
      name: sheetName,
      headers,
      recordCount,
      sampleData: sampleRow,
      dateFields,
      crimeFields,
      locationFields
    })

    analysis.totalRecords += recordCount
    analysis.dateFields = [...new Set([...analysis.dateFields, ...dateFields])]
    analysis.crimeFields = [...new Set([...analysis.crimeFields, ...crimeFields])]
    analysis.locationFields = [...new Set([...analysis.locationFields, ...locationFields])]
  })

  return analysis
}

/**
 * Load data from a local JSON file or API
 * @param {string} source - Path to data file or API endpoint
 * @returns {Promise<Array>} Raw data array
 */
export const loadData = async (source) => {
  try {
    // For local JSON files
    if (source.endsWith('.json')) {
      const response = await fetch(source)
      return await response.json()
    }
    
    // For API endpoints
    const response = await fetch(source)
    return await response.json()
  } catch (error) {
    console.error('Error loading data:', error)
    return []
  }
}

/**
 * Filter data by date range
 * @param {Array} data - Data array
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @param {string} dateField - Field name containing the date
 * @returns {Array} Filtered data
 */
export const filterByDateRange = (data, startDate, endDate, dateField = 'date') => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  return data.filter(item => {
    const itemDate = new Date(item[dateField])
    return itemDate >= start && itemDate <= end
  })
}

/**
 * Group data by a specific field
 * @param {Array} data - Data array
 * @param {string} field - Field to group by
 * @returns {Object} Grouped data object
 */
export const groupBy = (data, field) => {
  return data.reduce((groups, item) => {
    const key = item[field]
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {})
}

/**
 * Calculate percentage change between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}
