import React, { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { 
  Moon, 
  Sun, 
  Monitor, 
  Palette, 
  Database, 
  Bell, 
  Shield, 
  Download, 
  RotateCcw,
  Check,
  Info,
  ChevronRight,
  BarChart3,
  Map,
  Clock,
  Eye,
  Save
} from 'lucide-react'

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    autoRefresh: true,
    refreshInterval: 5,
    notifications: true,
    compactMode: false,
    dataRetention: 90,
    chartAnimation: true,
    defaultView: 'overview',
    timezone: 'America/Chicago',
    colorBlindMode: false,
    highContrast: false
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState('idle') // 'idle', 'saving', 'saved', 'error'

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('nopdDashboardSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const saveSettings = async () => {
    setSaveStatus('saving')
    try {
      localStorage.setItem('nopdDashboardSettings', JSON.stringify(settings))
      setTimeout(() => {
        setSaveStatus('saved')
        setHasChanges(false)
        setTimeout(() => setSaveStatus('idle'), 2000)
      }, 500)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }
  }

  const resetSettings = () => {
    const defaultSettings = {
      autoRefresh: true,
      refreshInterval: 5,
      notifications: true,
      compactMode: false,
      dataRetention: 90,
      chartAnimation: true,
      defaultView: 'overview',
      timezone: 'America/Chicago',
      colorBlindMode: false,
      highContrast: false
    }
    setSettings(defaultSettings)
    setHasChanges(true)
  }

  const SettingCard = ({ icon: Icon, title, description, children, warning = false }) => (
    <div className={`rounded-xl border p-6 transition-all duration-200 hover:shadow-md ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-lg ${
          warning 
            ? (isDarkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600')
            : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600')
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-base font-semibold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {title}
              </h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {description}
              </p>
            </div>
            <div className="ml-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        checked 
          ? (isDarkMode ? 'bg-blue-600 focus:ring-blue-500' : 'bg-blue-600 focus:ring-blue-500')
          : (isDarkMode ? 'bg-gray-600 focus:ring-gray-500' : 'bg-gray-300 focus:ring-gray-400')
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  const SelectField = ({ value, onChange, options, className = '' }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500' 
          : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
      } ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Settings
          </h1>
          <p className={`text-lg mt-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Customize your NOPD Dashboard experience
          </p>
        </div>

        {/* Save Banner */}
        {hasChanges && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 ${
            isDarkMode 
              ? 'bg-blue-900/20 border-blue-500 text-blue-400' 
              : 'bg-blue-50 border-blue-500 text-blue-700'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span className="font-medium">You have unsaved changes</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={resetSettings}
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
                  }`}
                >
                  Reset
                </button>
                <button
                  onClick={saveSettings}
                  disabled={saveStatus === 'saving'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    saveStatus === 'saved'
                      ? (isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-700')
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>Saving...</span>
                    </>
                  ) : saveStatus === 'saved' ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Appearance Section */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Appearance
            </h2>
            
            <div className="space-y-4">
              <SettingCard
                icon={isDarkMode ? Moon : Sun}
                title="Theme"
                description="Choose between light and dark mode"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <ToggleSwitch checked={isDarkMode} onChange={toggleTheme} />
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </SettingCard>

              <SettingCard
                icon={Eye}
                title="Compact Mode"
                description="Reduce spacing and component sizes for denser information display"
              >
                <ToggleSwitch 
                  checked={settings.compactMode} 
                  onChange={(value) => updateSetting('compactMode', value)} 
                />
              </SettingCard>

              <SettingCard
                icon={Palette}
                title="High Contrast"
                description="Increase contrast for better accessibility"
              >
                <ToggleSwitch 
                  checked={settings.highContrast} 
                  onChange={(value) => updateSetting('highContrast', value)} 
                />
              </SettingCard>

              <SettingCard
                icon={BarChart3}
                title="Chart Animations"
                description="Enable smooth transitions and animations in charts"
              >
                <ToggleSwitch 
                  checked={settings.chartAnimation} 
                  onChange={(value) => updateSetting('chartAnimation', value)} 
                />
              </SettingCard>
            </div>
          </div>

          {/* Data & Refresh Section */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Data & Refresh
            </h2>
            
            <div className="space-y-4">
              <SettingCard
                icon={RotateCcw}
                title="Auto Refresh"
                description="Automatically refresh data at regular intervals"
              >
                <ToggleSwitch 
                  checked={settings.autoRefresh} 
                  onChange={(value) => updateSetting('autoRefresh', value)} 
                />
              </SettingCard>

              <SettingCard
                icon={Clock}
                title="Refresh Interval"
                description="How often to refresh data when auto-refresh is enabled"
              >
                <SelectField
                  value={settings.refreshInterval}
                  onChange={(value) => updateSetting('refreshInterval', parseInt(value))}
                  options={[
                    { value: 1, label: '1 minute' },
                    { value: 5, label: '5 minutes' },
                    { value: 10, label: '10 minutes' },
                    { value: 30, label: '30 minutes' },
                    { value: 60, label: '1 hour' }
                  ]}
                  className="w-32"
                />
              </SettingCard>

              <SettingCard
                icon={Database}
                title="Data Retention"
                description="How long to keep cached data before refreshing"
                warning={settings.dataRetention < 30}
              >
                <SelectField
                  value={settings.dataRetention}
                  onChange={(value) => updateSetting('dataRetention', parseInt(value))}
                  options={[
                    { value: 7, label: '7 days' },
                    { value: 30, label: '30 days' },
                    { value: 90, label: '90 days' },
                    { value: 180, label: '180 days' },
                    { value: 365, label: '1 year' }
                  ]}
                  className="w-32"
                />
              </SettingCard>
            </div>
          </div>

          {/* Navigation & Display Section */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Navigation & Display
            </h2>
            
            <div className="space-y-4">
              <SettingCard
                icon={Map}
                title="Default View"
                description="Which page to show when the dashboard loads"
              >
                <SelectField
                  value={settings.defaultView}
                  onChange={(value) => updateSetting('defaultView', value)}
                  options={[
                    { value: 'overview', label: 'Overview' },
                    { value: 'analytics', label: 'Analytics' },
                    { value: 'geographic', label: 'Geographic' },
                    { value: 'shift', label: 'Shift Analysis' }
                  ]}
                  className="w-40"
                />
              </SettingCard>

              <SettingCard
                icon={Clock}
                title="Timezone"
                description="Display times in your preferred timezone"
              >
                <SelectField
                  value={settings.timezone}
                  onChange={(value) => updateSetting('timezone', value)}
                  options={[
                    { value: 'America/Chicago', label: 'Central Time' },
                    { value: 'America/New_York', label: 'Eastern Time' },
                    { value: 'America/Denver', label: 'Mountain Time' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time' },
                    { value: 'UTC', label: 'UTC' }
                  ]}
                  className="w-40"
                />
              </SettingCard>

              <SettingCard
                icon={Bell}
                title="Notifications"
                description="Receive alerts for important updates and changes"
              >
                <ToggleSwitch 
                  checked={settings.notifications} 
                  onChange={(value) => updateSetting('notifications', value)} 
                />
              </SettingCard>
            </div>
          </div>

          {/* Actions Section */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className={`p-4 rounded-xl border text-left transition-all hover:shadow-md group ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Download className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Export Data
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Download current data as CSV or Excel
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </button>

              <button 
                onClick={resetSettings}
                className={`p-4 rounded-xl border text-left transition-all hover:shadow-md group ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <RotateCcw className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Reset Settings
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Restore all settings to defaults
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
