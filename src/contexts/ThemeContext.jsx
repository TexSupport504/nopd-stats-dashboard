import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to light mode
    const saved = localStorage.getItem('nopd-dashboard-theme')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('nopd-dashboard-theme', JSON.stringify(isDarkMode))
    
    // Apply theme class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Light mode colors
      light: {
        primary: '#000000',
        secondary: '#374151',
        accent: '#6B7280',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        border: '#E5E7EB',
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF'
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      // Dark mode colors
      dark: {
        primary: '#FFFFFF',
        secondary: '#D1D5DB',
        accent: '#9CA3AF',
        background: '#0F0F0F',
        surface: '#1F1F1F',
        border: '#374151',
        text: {
          primary: '#F9FAFB',
          secondary: '#D1D5DB',
          muted: '#9CA3AF'
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      }
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
