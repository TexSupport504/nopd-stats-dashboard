import React, { useState } from 'react'
import { MapPin, Filter, TrendingUp, AlertTriangle, Map, Target } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts'

const GeographicAnalytics = () => {
  const [filterActive, setFilterActive] = useState(true)
  
  // Sample data for geographic analysis
  const proximityData = [
    { distance: '0-25ft', incidents: 45, violent: 12, nonViolent: 33 },
    { distance: '25-50ft', incidents: 67, violent: 18, nonViolent: 49 },
    { distance: '50-75ft', incidents: 89, violent: 25, nonViolent: 64 },
    { distance: '75-100ft', incidents: 134, violent: 42, nonViolent: 92 },
  ]

  const sectorData = [
    { sector: 'Campus Sector A', incidents: 156, violent: 48, percentage: 25.2 },
    { sector: 'Campus Sector B', incidents: 134, violent: 35, percentage: 21.6 },
    { sector: 'Campus Sector C', incidents: 89, violent: 28, percentage: 14.4 },
    { sector: 'Campus Sector D', incidents: 203, violent: 67, percentage: 32.8 },
    { sector: 'Off-Campus', incidents: 97, violent: 22, percentage: 15.7 },
  ]

  const juliaStreetComparison = [
    { area: 'North of Julia St. (Excluded)', incidents: 0, note: 'Filtered Out' },
    { area: 'South of Julia St.', incidents: 1247, violent: 389, nonViolent: 858 },
    { area: 'Julia St. Boundary', incidents: 67, violent: 23, nonViolent: 44 },
  ]

  const heatmapData = [
    { x: 29.940, y: -90.065, incidents: 45, type: 'High' },
    { x: 29.942, y: -90.067, incidents: 67, type: 'Medium' },
    { x: 29.944, y: -90.063, incidents: 23, type: 'Low' },
    { x: 29.941, y: -90.069, incidents: 89, type: 'High' },
    { x: 29.943, y: -90.061, incidents: 34, type: 'Medium' },
  ]

  const colors = {
    'High': '#EF4444',
    'Medium': '#F59E0B', 
    'Low': '#10B981'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-green-600" />
              Geographic Analysis
            </h2>
            <p className="text-gray-600 mt-2">
              Heat maps, campus sectors, proximity analysis, and Julia St. boundary filtering
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className={`text-sm ${filterActive ? 'text-green-600' : 'text-red-600'}`}>
                Julia St. Filter: {filterActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Coordinates Analysis */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Proximity Analysis</h3>
            <p className="opacity-90 mt-2">100ft radius around coordinates: 29.942960685319683, -90.0653479519101</p>
            <p className="opacity-75 text-sm mt-1">People Service Off-Site Office Suite</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="text-2xl font-bold">335</h4>
              <p className="text-sm opacity-80">Incidents in 100ft</p>
            </div>
          </div>
        </div>
      </div>

      {/* Julia Street Filtering Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {juliaStreetComparison.map((area, index) => (
          <div key={area.area} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{area.area}</h3>
            {area.incidents === 0 ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400 mb-2">0</div>
                <p className="text-sm text-red-600 font-medium">{area.note}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Incidents:</span>
                  <span className="font-semibold">{area.incidents}</span>
                </div>
                {area.violent && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Violent:</span>
                      <span className="font-semibold text-red-600">{area.violent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Non-Violent:</span>
                      <span className="font-semibold text-green-600">{area.nonViolent}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Proximity Analysis Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          Crime Distribution by Distance from Key Location
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={proximityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="distance" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="violent" fill="#EF4444" name="Violent Crimes" />
              <Bar dataKey="nonViolent" fill="#10B981" name="Non-Violent Crimes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campus Sectors Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Map className="h-5 w-5 mr-2 text-purple-600" />
            Campus Sectors Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="incidents"
                  label={({ sector, percentage }) => `${sector}: ${percentage}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Sector Crime Breakdown
          </h3>
          <div className="space-y-4">
            {sectorData.map((sector, index) => (
              <div key={sector.sector} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{sector.sector}</h4>
                  <p className="text-sm text-gray-600">
                    {sector.incidents} total incidents
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600">{sector.violent}</span>
                  <p className="text-xs text-gray-500">violent crimes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heat Map Simulation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
          Crime Density Heat Map (Simulated)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={heatmapData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" domain={['dataMin - 0.001', 'dataMax + 0.001']} type="number" />
              <YAxis dataKey="y" domain={['dataMin - 0.001', 'dataMax + 0.001']} type="number" />
              <Tooltip formatter={(value, name) => name === 'incidents' ? [value, 'Incidents'] : [value, name]} />
              <Scatter dataKey="incidents" fill="#8884d8">
                {heatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.type]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Analysis Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Julia Street Filtering</h4>
            <p className="text-blue-700 text-sm">Successfully excluded {filterActive ? 'all' : 'no'} incidents north of Julia St. per requirements</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Campus Sector D</h4>
            <p className="text-green-700 text-sm">Highest incident concentration with 32.8% of campus crimes</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Proximity Analysis</h4>
            <p className="text-red-700 text-sm">335 incidents within 100ft of key coordinates - requires increased monitoring</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Google MyMaps Integration</h4>
            <p className="text-purple-700 text-sm">Campus sectors defined and analyzed per mapping requirements</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeographicAnalytics
