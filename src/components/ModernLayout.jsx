import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  Clock, 
  MapPin, 
  Settings, 
  Database,
  Menu,
  X,
  Sun,
  Moon,
  Shield,
  TrendingUp,
  Users
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ModernLayout = ({ children }) => {
  const location = useLocation()
  const { isDarkMode, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const isActive = (path) => location.pathname === path

  const navigationItems = [
    {
      name: 'Overview',
      href: '/',
      icon: BarChart3,
      description: 'Crime statistics overview'
    },
    {
      name: 'Security Shifts',
      href: '/shift-analytics',
      icon: Clock,
      description: 'Temporal analysis by shifts'
    },
    {
      name: 'Geographic Analysis',
      href: '/geographic-analytics',
      icon: MapPin,
      description: 'Location-based insights'
    },
    {
      name: 'Data Validator',
      href: '/data-validator',
      icon: Database,
      description: 'Data quality & validation'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Dashboard preferences'
    }
  ]

  const stats = [
    { label: 'Last Updated', value: new Date().toLocaleDateString() },
    { label: 'Data Period', value: '2022-2023' },
    { label: 'Coverage', value: 'NOPD District' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-r`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-inherit">
          <Link to="/" className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">NOPD Analytics</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Crime Intelligence Platform
              </p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  active
                    ? isDarkMode
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-black text-white shadow-sm'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 flex-shrink-0 transition-colors ${
                  active 
                    ? 'text-current' 
                    : isDarkMode 
                      ? 'text-gray-400 group-hover:text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className={`text-xs mt-0.5 ${
                    active 
                      ? isDarkMode ? 'text-gray-600' : 'text-gray-300'
                      : isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Theme Toggle & Stats */}
        <div className="px-4 py-4 border-t border-inherit">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 mb-4 ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Switch to Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2" />
                Switch to Dark Mode
              </>
            )}
          </button>

          {/* Quick Stats */}
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Bar */}
        <header className={`h-16 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-6`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              New Orleans Police Department • Crime Analytics Dashboard
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default ModernLayout
