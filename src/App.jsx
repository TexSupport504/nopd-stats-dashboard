import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import LandingPageNew from './components/LandingPageNew'
import DataTest from './components/DataTest'
import ShiftAnalytics from './components/ShiftAnalytics'
import GeographicAnalytics from './components/GeographicAnalytics'
import DataValidator from './components/DataValidator'
import Settings from './components/Settings'
import ModernLayout from './components/ModernLayout'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ModernLayout>
          <Routes>
            <Route path="/" element={<LandingPageNew />} />
            <Route path="/test" element={<DataTest />} />
            <Route path="/shift-analytics" element={<ShiftAnalytics />} />
            <Route path="/geographic-analytics" element={<GeographicAnalytics />} />
            <Route path="/data-validator" element={<DataValidator />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </ModernLayout>
      </Router>
    </ThemeProvider>
  )
}

export default App
