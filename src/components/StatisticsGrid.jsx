import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const StatisticsGrid = ({ title, data = [], className = "" }) => {
  const { isDarkMode } = useTheme()

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const formatPercentage = (value) => {
    return typeof value === 'number' ? `${value}%` : value
  }

  return (
    <div className={`rounded-xl border transition-all duration-300 hover:shadow-md ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } ${className}`}>
      {/* Header */}
      {title && (
        <div className="px-6 py-4 border-b border-inherit">
          <h3 className={`text-sm font-medium tracking-wide uppercase ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {title}
          </h3>
        </div>
      )}

      {/* Statistics List */}
      <div className="p-6 space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {item.color && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {item.label}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-mono ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.count?.toLocaleString()}
              </span>
              
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatPercentage(item.percentage)}
                </span>
                {item.trend && getTrendIcon(item.trend)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bars for visual representation */}
      <div className="px-6 pb-6">
        {data.map((item, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {item.label}
              </span>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {formatPercentage(item.percentage)}
              </span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-2 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundColor: item.color || (isDarkMode ? '#9CA3AF' : '#6B7280')
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsGrid
