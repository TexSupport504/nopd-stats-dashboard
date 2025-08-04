import React, { useState, useEffect } from 'react'
import { Clock, Users, TrendingUp, Calendar, BarChart2, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const ShiftAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  
  // Sample data for security shift analytics (using actual NOPD shift times)
  const shiftData = [
    { shift: 'Day (7:45AM-4:15PM)', incidents: 245, violent: 89, nonViolent: 156, topCrime: 'Theft' },
    { shift: 'Evening (3:45PM-12:15AM)', incidents: 378, violent: 142, nonViolent: 236, topCrime: 'Assault' },
    { shift: 'Overnight (11:45PM-8:15AM)', incidents: 456, violent: 203, nonViolent: 253, topCrime: 'Burglary' },
  ]

  const hourlyData = [
    { hour: '00:00', incidents: 45, arrests: 18 },
    { hour: '02:00', incidents: 32, arrests: 12 },
    { hour: '04:00', incidents: 18, arrests: 7 },
    { hour: '06:00', incidents: 25, arrests: 9 },
    { hour: '08:00', incidents: 42, arrests: 15 },
    { hour: '10:00', incidents: 38, arrests: 14 },
    { hour: '12:00', incidents: 55, arrests: 22 },
    { hour: '14:00', incidents: 62, arrests: 25 },
    { hour: '16:00', incidents: 68, arrests: 28 },
    { hour: '18:00', incidents: 75, arrests: 32 },
    { hour: '20:00', incidents: 82, arrests: 35 },
    { hour: '22:00', incidents: 89, arrests: 38 },
  ]

  const weeklyTrends = [
    { day: 'Monday', incidents: 156, arrests: 62 },
    { day: 'Tuesday', incidents: 134, arrests: 51 },
    { day: 'Wednesday', incidents: 142, arrests: 58 },
    { day: 'Thursday', incidents: 168, arrests: 67 },
    { day: 'Friday', incidents: 203, arrests: 89 },
    { day: 'Saturday', incidents: 245, arrests: 112 },
    { day: 'Sunday', incidents: 198, arrests: 85 },
  ]

  const shiftColors = ['#3B82F6', '#EF4444', '#10B981']

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-blue-600" />
              Security Shift Analytics
            </h2>
            <p className="text-gray-600 mt-2">
              Analyze crime patterns by NOPD security shifts and temporal trends
            </p>
          </div>
          <div className="flex space-x-2">
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shift Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shiftData.map((shift, index) => (
          <div key={shift.shift} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{shift.shift}</h3>
              <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: shiftColors[index] }}></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Incidents:</span>
                <span className="font-semibold">{shift.incidents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Violent:</span>
                <span className="font-semibold text-red-600">{shift.violent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Non-Violent:</span>
                <span className="font-semibold text-green-600">{shift.nonViolent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Top Crime:</span>
                <span className="font-semibold">{shift.topCrime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          24-Hour Crime Distribution
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="incidents" fill="#3B82F6" name="Incidents" />
              <Bar dataKey="arrests" fill="#EF4444" name="Arrests" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Weekly Crime Trends
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="incidents" stroke="#3B82F6" strokeWidth={3} name="Incidents" />
              <Line type="monotone" dataKey="arrests" stroke="#EF4444" strokeWidth={3} name="Arrests" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shift Distribution Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-purple-600" />
            Incidents by Shift
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={shiftData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="incidents"
                  label={({ shift, incidents }) => `${shift.split(' ')[0]}: ${incidents}`}
                >
                  {shiftData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={shiftColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-600" />
            Temporal Insights
          </h3>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Peak Activity Period</h4>
              <p className="text-red-700 text-sm">Night shift (10PM-6AM) has 42% of all incidents</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Best Response Time</h4>
              <p className="text-blue-700 text-sm">Day shift maintains 7.2 min average response</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Highest Clearance</h4>
              <p className="text-green-700 text-sm">Day shift achieves 72% case clearance rate</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Weekend Pattern</h4>
              <p className="text-purple-700 text-sm">Friday-Saturday show 25% spike in incidents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShiftAnalytics
