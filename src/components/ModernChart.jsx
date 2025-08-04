import React, { useState } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ReferenceLine } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'
import { MoreHorizontal, Download, Maximize2, TrendingUp } from 'lucide-react'

const ModernChart = ({ 
  type = 'line', // 'line', 'area', 'bar', 'pie'
  data, 
  dataKey, 
  xAxisKey = 'name',
  title,
  subtitle,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  gradient = false,
  multiple = false, // For multiple data series
  colors = ['#000000', '#374151', '#6B7280', '#9CA3AF'],
  threshold = null, // Reference line value
  thresholdLabel = 'Target',
  interactive = true,
  showActions = true
}) => {
  const { isDarkMode } = useTheme()
  const [selectedSeries, setSelectedSeries] = useState(new Set())

  const getAxisColor = () => isDarkMode ? '#9CA3AF' : '#6B7280'
  const getGridColor = () => isDarkMode ? '#374151' : '#E5E7EB'
  const getTextColor = () => isDarkMode ? '#D1D5DB' : '#374151'

  const getThemeColors = () => {
    return isDarkMode 
      ? ['#FFFFFF', '#D1D5DB', '#9CA3AF', '#6B7280', '#374151']
      : ['#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB']
  }

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-lg shadow-xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-900/90 border-gray-700 text-white' 
            : 'bg-white/90 border-gray-200 text-gray-900'
        }`}>
          <p className="font-semibold mb-2 text-sm">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium">{entry.name}:</span>
              </div>
              <span className="font-bold">{entry.value?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const customLegend = (props) => {
    const { payload } = props
    return (
      <div className="flex items-center justify-center space-x-6 mt-4">
        {payload.map((entry, index) => {
          const isSelected = selectedSeries.has(entry.dataKey) || selectedSeries.size === 0
          return (
            <button
              key={index}
              onClick={() => {
                const newSelected = new Set(selectedSeries)
                if (newSelected.has(entry.dataKey)) {
                  newSelected.delete(entry.dataKey)
                } else {
                  newSelected.add(entry.dataKey)
                }
                setSelectedSeries(newSelected)
              }}
              className={`flex items-center space-x-2 text-sm transition-opacity ${
                isSelected ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {entry.value}
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  const renderChart = () => {
    const commonProps = {
      data,
      height,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    }

    const activeColors = getThemeColors()

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={getGridColor()} opacity={0.3} />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }}
              dx={-10}
            />
            {threshold && (
              <ReferenceLine 
                y={threshold} 
                stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}
                strokeDasharray="5 5"
                label={{ value: thresholdLabel, position: 'topRight' }}
              />
            )}
            {showTooltip && <Tooltip content={customTooltip} />}
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeColors[0]} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={activeColors[0]} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={activeColors[0]} 
              fill={gradient ? "url(#colorGradient)" : activeColors[0]}
              fillOpacity={gradient ? 1 : 0.1}
              strokeWidth={3}
              dot={{ fill: activeColors[0], strokeWidth: 2, r: 5, opacity: 0 }}
              activeDot={{ r: 6, stroke: activeColors[0], strokeWidth: 2, fill: isDarkMode ? '#1F1F1F' : '#FFFFFF' }}
            />
          </AreaChart>
        )

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={getGridColor()} opacity={0.3} />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }}
              dx={-10}
            />
            {threshold && (
              <ReferenceLine 
                y={threshold} 
                stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}
                strokeDasharray="5 5"
                label={{ value: thresholdLabel, position: 'topRight' }}
              />
            )}
            {showTooltip && <Tooltip content={customTooltip} />}
            <Bar 
              dataKey={dataKey} 
              fill={activeColors[0]} 
              radius={[6, 6, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        )

      case 'pie':
        return (
          <PieChart {...commonProps}>
            {showTooltip && <Tooltip content={customTooltip} />}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              fill="#8884d8"
              dataKey={dataKey}
              stroke={isDarkMode ? '#1F1F1F' : '#FFFFFF'}
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={activeColors[index % activeColors.length]} />
              ))}
            </Pie>
            {showLegend && <Legend content={customLegend} />}
          </PieChart>
        )

      default: // line
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={getGridColor()} opacity={0.3} />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: getTextColor(), fontSize: 12 }}
              dx={-10}
            />
            {threshold && (
              <ReferenceLine 
                y={threshold} 
                stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}
                strokeDasharray="5 5"
                label={{ value: thresholdLabel, position: 'topRight' }}
              />
            )}
            {showTooltip && <Tooltip content={customTooltip} />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={activeColors[0]} 
              strokeWidth={3}
              dot={{ fill: activeColors[0], strokeWidth: 2, r: 5, opacity: 0 }}
              activeDot={{ r: 7, stroke: activeColors[0], strokeWidth: 3, fill: isDarkMode ? '#1F1F1F' : '#FFFFFF' }}
            />
          </LineChart>
        )
    }
  }

  return (
    <div className={`rounded-xl border transition-all duration-300 hover:shadow-lg group ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Chart Header */}
      {(title || showActions) && (
        <div className="flex items-center justify-between p-6 pb-2">
          <div>
            {title && (
              <div className="flex items-center space-x-2">
                <h3 className={`text-lg font-display font-semibold tracking-tight ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {title}
                </h3>
                <TrendingUp className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            )}
            {subtitle && (
              <p className={`text-sm mt-1 font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {subtitle}
              </p>
            )}
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}>
                <Download className="h-4 w-4" />
              </button>
              <button className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}>
                <Maximize2 className="h-4 w-4" />
              </button>
              <button className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}>
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chart Content */}
      <div className="px-6 pb-6">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
        
        {/* Custom Legend */}
        {showLegend && type !== 'pie' && (
          <div className="mt-4 pt-4 border-t border-inherit">
            {customLegend({ payload: [{ dataKey, value: dataKey, color: getThemeColors()[0] }] })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModernChart
