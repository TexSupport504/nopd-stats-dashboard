import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Sample data for charts
const sampleBarData = [
  { month: 'Jan', incidents: 980, arrests: 456 },
  { month: 'Feb', incidents: 1120, arrests: 523 },
  { month: 'Mar', incidents: 890, arrests: 445 },
  { month: 'Apr', incidents: 1050, arrests: 612 },
  { month: 'May', incidents: 1180, arrests: 578 },
  { month: 'Jun', incidents: 1090, arrests: 534 },
]

const samplePieData = [
  { name: 'Property Crime', value: 45, color: '#3b82f6' },
  { name: 'Violent Crime', value: 25, color: '#ef4444' },
  { name: 'Drug Offenses', value: 15, color: '#f59e0b' },
  { name: 'Traffic Violations', value: 10, color: '#10b981' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
]

const ChartContainer = ({ title, description, type = 'bar' }) => {
  const renderChart = () => {
    if (type === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={samplePieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {samplePieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sampleBarData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="incidents" fill="#3b82f6" name="Incidents" radius={[4, 4, 0, 0]} />
          <Bar dataKey="arrests" fill="#10b981" name="Arrests" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="w-full">
        {renderChart()}
      </div>
      {type === 'pie' && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {samplePieData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChartContainer
