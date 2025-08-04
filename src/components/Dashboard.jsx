import React, { useState, useEffect } from 'react'
import StatCard from './StatCard'
import DataAnalyzer from './DataAnalyzer'
import NOPDAnalytics from './NOPDAnalytics'
import { TrendingUp, TrendingDown, Users, Shield, AlertTriangle, CheckCircle, Database } from 'lucide-react'
import { processStatsData, processChartData, loadExcelFile } from '../utils/dataUtils'

// Sample data - you'll replace this with your actual data
const sampleStats = {
  totalCrimes: 12456,
  crimeTrend: -5.2,
  totalArrests: 8943,
  arrestTrend: 3.1,
  responseTime: 8.5,
  responseTrend: -12.3,
  clearanceRate: 68.7,
  clearanceTrend: 2.8
}

const Dashboard = () => {
  const [nopdData, setNopdData] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [stats, setStats] = useState(null)

  const handleDataLoaded = (excelData, dataAnalysis) => {
    setNopdData(excelData)
    setAnalysis(dataAnalysis)
    
    // Process the first sheet of data for statistics
    if (excelData.sheets && excelData.sheetNames.length > 0) {
      const firstSheet = excelData.sheets[excelData.sheetNames[0]]
      const processedStats = processStatsData(firstSheet.slice(1)) // Skip header row
      setStats(processedStats)
    }
  }

  // Use processed stats if available, otherwise fall back to sample data
  const displayStats = stats || {
    totalIncidents: 12456,
    incidentTrend: -5.2,
    totalArrests: 8943,
    arrestTrend: 3.1,
    responseTime: 8.5,
    responseTrend: -12.3,
    clearanceRate: 68.7,
    clearanceTrend: 2.8
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Department Statistics Overview
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive analysis of police department operations, crime statistics, 
          and community safety metrics for the greater New Orleans area.
        </p>
      </div>

      {/* Data Analysis Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="h-6 w-6 text-police-600" />
          <h3 className="text-lg font-semibold text-gray-900">Data Source Analysis</h3>
        </div>
        <DataAnalyzer onDataLoaded={handleDataLoaded} />
      </div>

      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Incidents"
          value={displayStats.totalIncidents.toLocaleString()}
          trend={displayStats.incidentTrend}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Total Arrests"
          value={displayStats.totalArrests.toLocaleString()}
          trend={displayStats.arrestTrend}
          icon={Shield}
          color="blue"
        />
        <StatCard
          title="Avg Response Time"
          value={`${displayStats.responseTime} min`}
          trend={displayStats.responseTrend}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Clearance Rate"
          value={`${displayStats.clearanceRate}%`}
          trend={displayStats.clearanceTrend}
          icon={CheckCircle}
          color="purple"
        />
      </div>

      {/* NOPD-Specific Analytics */}
      <NOPDAnalytics data={nopdData} crimeClassification={analysis} />

      {/* Data Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Reporting Period</h4>
            <p className="text-gray-600">January 1, 2025 - Present</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Data Sources</h4>
            <p className="text-gray-600">NOPD Records Management System</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Last Updated</h4>
            <p className="text-gray-600">{new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
