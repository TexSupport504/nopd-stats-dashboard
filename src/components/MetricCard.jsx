import React from 'react'
import { TrendingUp, TrendingDown, Minus, MoreHorizontal, Info } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'number', // 'number', 'percentage'
  trend, // 'up', 'down', 'neutral'
  icon: Icon,
  description,
  size = 'normal', // 'small', 'normal', 'large'
  variant = 'default', // 'default', 'featured'
  sparklineData = null, // Array of values for mini sparkline
  actionLabel = "Show more →",
  threshold = null, // For gauge-like progress indicators
  unit = '' // Unit label (%, $, etc.)
}) => {
  const { isDarkMode } = useTheme()

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />
      case 'down':
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return isDarkMode ? 'text-gray-400' : 'text-gray-500'
    }
  }

  const getCardStyle = () => {
    if (variant === 'featured') {
      return isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-black border-gray-700 shadow-2xl' 
        : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-xl'
    }
    return isDarkMode 
      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
      : 'bg-white border-gray-200 hover:bg-gray-50'
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'p-4'
      case 'large':
        return 'p-8'
      default:
        return 'p-6'
    }
  }

  const getValueSize = () => {
    switch (size) {
      case 'small':
        return 'text-xl'
      case 'large':
        return 'text-4xl'
      default:
        return 'text-3xl'
    }
  }

  // Simple sparkline SVG generator
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null
    
    const width = 60
    const height = 20
    const max = Math.max(...sparklineData)
    const min = Math.min(...sparklineData)
    const range = max - min || 1
    
    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width={width} height={height} className="ml-2">
        <polyline
          points={points}
          fill="none"
          stroke={getTrendColor().includes('green') ? '#10B981' : getTrendColor().includes('red') ? '#EF4444' : isDarkMode ? '#9CA3AF' : '#6B7280'}
          strokeWidth="1.5"
          className="opacity-70"
        />
      </svg>
    )
  }

  // Progress bar for threshold-based metrics
  const renderProgressBar = () => {
    if (!threshold || typeof value !== 'number') return null
    
    const percentage = (value / threshold.max) * 100
    const isWarning = percentage > threshold.warning
    const isDanger = percentage > threshold.danger
    
    return (
      <div className="mt-3">
        <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isDanger ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {value}{unit} of {threshold.max}{unit} target
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border transition-all duration-300 hover:shadow-lg group ${getCardStyle()} ${getSizeClasses()}`}>
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          {Icon && (
            <div className={`p-2 rounded-lg transition-all duration-200 ${
              variant === 'featured'
                ? isDarkMode ? 'bg-white text-black group-hover:scale-110' : 'bg-black text-white group-hover:scale-110'
                : isDarkMode ? 'bg-gray-700 text-gray-300 group-hover:bg-gray-600' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
            }`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className={`text-sm font-medium tracking-wide uppercase ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {title}
              </h3>
              {description && (
                <div className="group/tooltip relative">
                  <Info className={`h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} hover:text-current cursor-help`} />
                  <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 ${
                    isDarkMode ? 'bg-gray-900 text-white border border-gray-700' : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    {description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
            {description && !threshold && (
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {description}
              </p>
            )}
          </div>
        </div>
        
        {/* Actions Menu */}
        <button className={`p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
          isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
        }`}>
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Main Value Row */}
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <div className={`font-display font-bold tracking-tight ${getValueSize()} ${
            variant === 'featured'
              ? isDarkMode ? 'text-white' : 'text-gray-900'
              : isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {value}
          </div>
          {unit && (
            <span className={`text-lg font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {unit}
            </span>
          )}
          {sparklineData && renderSparkline()}
        </div>
      </div>

      {/* Progress Bar (if threshold provided) */}
      {renderProgressBar()}

      {/* Change Indicator & Action */}
      <div className="flex items-center justify-between">
        {change !== undefined && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>
                {changeType === 'percentage' ? `${Math.abs(change)}%` : Math.abs(change)}
              </span>
            </div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              vs last period
            </span>
          </div>
        )}
        
        {actionLabel && (
          <button className={`text-sm font-medium transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export default MetricCard
