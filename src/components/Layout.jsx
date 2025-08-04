import React from 'react'
import { Shield, BarChart3, Users, AlertTriangle } from 'lucide-react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-police-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">NOPD Statistics Dashboard</h1>
                <p className="text-police-200 text-sm">New Orleans Police Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-police-200 text-sm">
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
            <button className="flex items-center space-x-2 px-3 py-2 text-police-700 border-b-2 border-police-700 font-medium">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-police-700 font-medium">
              <Users className="h-4 w-4" />
              <span>Demographics</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-police-700 font-medium">
              <AlertTriangle className="h-4 w-4" />
              <span>Incidents</span>
            </button>
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
