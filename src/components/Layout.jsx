import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Home, Clock, MapPin, Database } from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">NOPD Statistics Dashboard</h1>
                <p className="text-blue-200 text-sm">New Orleans Police Department</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-blue-200 text-sm">
                Last Updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-14">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-700 border-b-2 border-blue-700' 
                  : 'text-gray-500 hover:text-blue-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Overview</span>
            </Link>
            <Link 
              to="/shift-analytics" 
              className={`flex items-center space-x-2 px-3 py-2 font-medium transition-colors ${
                isActive('/shift-analytics') 
                  ? 'text-blue-700 border-b-2 border-blue-700' 
                  : 'text-gray-500 hover:text-blue-700'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Security Shifts</span>
            </Link>
            <Link 
              to="/geographic-analytics" 
              className={`flex items-center space-x-2 px-3 py-2 font-medium transition-colors ${
                isActive('/geographic-analytics') 
                  ? 'text-blue-700 border-b-2 border-blue-700' 
                  : 'text-gray-500 hover:text-blue-700'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Geographic Analysis</span>
            </Link>
            <Link 
              to="/data-validator" 
              className={`flex items-center space-x-2 px-3 py-2 font-medium transition-colors ${
                isActive('/data-validator') 
                  ? 'text-blue-700 border-b-2 border-blue-700' 
                  : 'text-gray-500 hover:text-blue-700'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>Data Validator</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2025 New Orleans Police Department Statistics Dashboard
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Data is updated regularly and reflects the most recent available information
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
