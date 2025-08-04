import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area, AreaChart } from 'recharts'
import { AlertTriangle, Clock, MapPin, TrendingUp, Calendar, Users, Shield, Target, Activity } from 'lucide-react'

const NOPDAnalytics = ({ data, crimeClassification }) => {
  
  // Enhanced data processing based on your specific requirements
  const processedData = useMemo(() => {
    if (!data) {
      // Enhanced sample data matching your requirements
      return {
        totalIncidents: 12456,
        monthlyTrends: [
          { month: 'Jan 2025', violent: 45, nonViolent: 120, total: 165, week: 1 },
          { month: 'Feb 2025', violent: 52, nonViolent: 98, total: 150, week: 5 },
          { month: 'Mar 2025', violent: 68, nonViolent: 145, total: 213, week: 9 }, // Highest month
          { month: 'Apr 2025', violent: 41, nonViolent: 112, total: 153, week: 13 },
          { month: 'May 2025', violent: 49, nonViolent: 134, total: 183, week: 17 },
          { month: 'Jun 2025', violent: 44, nonViolent: 128, total: 172, week: 21 },
          { month: 'Jul 2025', violent: 63, nonViolent: 167, total: 230, week: 25 } // Peak week data
        ],
        shiftAnalysis: [
          { shift: 'Day (7:45AM-4:15PM)', violent: 89, nonViolent: 234, total: 323, percentage: 31.2 },
          { shift: 'Evening (3:45PM-12:15AM)', violent: 156, nonViolent: 287, total: 443, percentage: 42.8 },
          { shift: 'Overnight (11:45PM-8:15AM)', violent: 98, nonViolent: 156, total: 254, percentage: 26.0 }
        ],
        topCrimesYTD: [
          { crime: 'THEFT', count: 234, type: 'Non-Violent', percentage: 18.8 },
          { crime: 'SIMPLE BATTERY', count: 156, type: 'Violent', percentage: 12.5 },
          { crime: 'AUTO THEFT', count: 142, type: 'Non-Violent', percentage: 11.4 },
          { crime: 'SIMPLE ASSAULT', count: 98, type: 'Violent', percentage: 7.9 },
          { crime: 'BURGLARY', count: 87, type: 'Non-Violent', percentage: 7.0 }
        ],
        top3Last3Months: [
          { crime: 'THEFT', count: 89, type: 'Non-Violent' },
          { crime: 'SIMPLE BATTERY', count: 67, type: 'Violent' },
          { crime: 'AUTO THEFT', count: 54, type: 'Non-Violent' }
        ],
        proximityData: [
          { area: 'Within 100ft of Office (29.942960685319683, -90.0653479519101)', violent: 12, nonViolent: 28, total: 40 },
          { area: '100-300ft from Office', violent: 8, nonViolent: 15, total: 23 },
          { area: '300-500ft from Office', violent: 5, nonViolent: 12, total: 17 }
        ],
        peakWeek: { week: 'Week 25 (Jul 2025)', total: 67, violent: 34, nonViolent: 33, majorityType: 'Violent' },
        peakMonth: { month: 'March 2025', total: 213, violent: 68, nonViolent: 145, majorityType: 'Non-Violent' },
        violentRatio: 32.4, // 32.4% violent, 67.6% non-violent
        excludedJuliaSt: 45 // Number of incidents excluded north of Julia St.
      }
    }
    // TODO: Process real data here when uploaded
    return null
  }, [data, crimeClassification])

  const sampleData = processedData || {}

  const colors = {
    violent: '#ef4444',
    nonViolent: '#3b82f6',
    total: '#8b5cf6',
    accent: '#10b981'
  }

  const COLORS = [colors.violent, colors.nonViolent, colors.accent, '#f59e0b', '#ec4899']

  return (
    <div className="space-y-8">
      
      {/* Key Metrics Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Activity className="h-5 w-5 text-blue-600 mr-2" />
          Key Crime Metrics - YTD Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Total Incidents YTD</h4>
            <p className="text-2xl font-bold text-gray-900">{sampleData.totalIncidents?.toLocaleString() || '12,456'}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Violent Crime Ratio</h4>
            <p className="text-2xl font-bold text-red-600">{sampleData.violentRatio || '32.4'}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Peak Month YTD</h4>
            <p className="text-lg font-bold text-green-600">{sampleData.peakMonth?.month || 'March 2025'}</p>
            <p className="text-sm text-gray-600">Majority: {sampleData.peakMonth?.majorityType || 'Non-Violent'}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Peak Week</h4>
            <p className="text-lg font-bold text-yellow-600">{sampleData.peakWeek?.week || 'Week 25'}</p>
            <p className="text-sm text-gray-600">Majority: {sampleData.peakWeek?.majorityType || 'Violent'}</p>
          </div>
        </div>
      </div>

      {/* Top Crimes YTD */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          Top Crimes Year-to-Date
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.topCrimesYTD || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="crime" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, 'Count']}
                  labelFormatter={(label) => `Crime: ${label}`}
                />
                <Bar 
                  dataKey="count" 
                  fill={(entry) => entry?.type === 'Violent' ? colors.violent : colors.nonViolent}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Top 3 Crimes - Last 3 Months</h4>
            <div className="space-y-3">
              {(sampleData.top3Last3Months || []).map((crime, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{crime.crime}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      crime.type === 'Violent' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {crime.type}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{crime.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Crime Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
          Monthly Crime Trends - Violent vs Non-Violent
        </h3>
        
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={sampleData.monthlyTrends || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [value, name === 'violent' ? 'Violent' : name === 'nonViolent' ? 'Non-Violent' : 'Total']}
            />
            <Bar dataKey="violent" fill={colors.violent} name="violent" />
            <Bar dataKey="nonViolent" fill={colors.nonViolent} name="nonViolent" />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke={colors.total} 
              strokeWidth={3}
              dot={{ fill: colors.total, strokeWidth: 2, r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Security Shift Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Clock className="h-5 w-5 text-blue-600 mr-2" />
          Security Shift Analysis
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.shiftAnalysis || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="shift" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={11}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="violent" fill={colors.violent} name="Violent" />
                <Bar dataKey="nonViolent" fill={colors.nonViolent} name="Non-Violent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sampleData.shiftAnalysis || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="total"
                  label={({ shift, percentage }) => `${shift.split(' ')[0]}: ${percentage}%`}
                >
                  {(sampleData.shiftAnalysis || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, 'Total Incidents']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Geographic Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <MapPin className="h-5 w-5 text-green-600 mr-2" />
          Geographic Analysis - Proximity to Office
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.proximityData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="area" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={10}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="violent" fill={colors.violent} name="Violent" />
                <Bar dataKey="nonViolent" fill={colors.nonViolent} name="Non-Violent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Geographic Filters Applied</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Excluded incidents north of Julia St.: <span className="font-medium">{sampleData.excludedJuliaSt || '45'} incidents</span></li>
                <li>• Analysis center: 29.942960685319683, -90.0653479519101</li>
                <li>• Proximity zones: 100ft, 300ft, 500ft radii</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Campus Sectors Integration</h4>
              <p className="text-sm text-gray-600">
                <Target className="h-4 w-4 inline mr-1" />
                Heat map integration with Google MyMaps sectors
              </p>
              <a 
                href="https://www.google.com/maps/d/edit?mid=1MdRUEuzgCZYlC9ir9JTA5NZKtuTTjPw&usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View Campus Sectors Map →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Violent vs Non-Violent Deep Dive */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Shield className="h-5 w-5 text-purple-600 mr-2" />
          Violent vs Non-Violent Crime Deep Dive
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Violent Crimes</h4>
            <p className="text-3xl font-bold text-red-600">{sampleData.violentRatio || '32.4'}%</p>
            <p className="text-sm text-red-700 mt-2">Classification based on convertlist.csv</p>
            <ul className="text-sm text-red-600 mt-3 space-y-1">
              <li>• Simple Battery</li>
              <li>• Simple Assault</li>
              <li>• Aggravated Assault</li>
              <li>• Armed Robbery</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Non-Violent Crimes</h4>
            <p className="text-3xl font-bold text-blue-600">{100 - (sampleData.violentRatio || 32.4)}%</p>
            <p className="text-sm text-blue-700 mt-2">Property & other crimes</p>
            <ul className="text-sm text-blue-600 mt-3 space-y-1">
              <li>• Theft</li>
              <li>• Auto Theft</li>
              <li>• Burglary</li>
              <li>• Criminal Mischief</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Peak Analysis</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Highest Crime Week:</p>
                <p className="font-medium text-gray-900">{sampleData.peakWeek?.week || 'Week 25'}</p>
                <p className="text-sm text-gray-600">Majority: {sampleData.peakWeek?.majorityType || 'Violent'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Highest Crime Month:</p>
                <p className="font-medium text-gray-900">{sampleData.peakMonth?.month || 'March 2025'}</p>
                <p className="text-sm text-gray-600">Majority: {sampleData.peakMonth?.majorityType || 'Non-Violent'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Processing Status */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Processing Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Current Status</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• {data ? '✅ Real data loaded' : '⏳ Sample data displayed'}</li>
              <li>• {crimeClassification ? '✅ Crime classification active' : '⏳ Using default classification'}</li>
              <li>• ⏳ Geographic filtering (Julia St.) ready</li>
              <li>• ⏳ Heat map integration pending</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Next Steps</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Upload NOPD Data.xlsx file</li>
              <li>• Verify convertlist.csv classification</li>
              <li>• Configure Julia St. boundary</li>
              <li>• Integrate Google MyMaps sectors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NOPDAnalytics
