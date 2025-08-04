import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatCard = ({ title, value, trend, icon: Icon, color = 'blue' }) => {
  const isPositive = trend > 0
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-900',
    red: 'from-red-50 to-red-100 border-red-200 text-red-900',
    green: 'from-green-50 to-green-100 border-green-200 text-green-900',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-900',
  }

  const iconColorClasses = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  }

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-lg p-6 border`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white ${iconColorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-75">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center space-x-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(trend)}%
            </span>
          </div>
          <p className="text-xs opacity-75 mt-1">vs last month</p>
        </div>
      </div>
    </div>
  )
}

export default StatCard
