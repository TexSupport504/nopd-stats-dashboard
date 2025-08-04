import React from 'react'

const TestDashboard = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1e40af' }}>NOPD Dashboard Test</h1>
      <p>If you can see this, React is working!</p>
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>System Status:</h2>
        <ul>
          <li>✅ React app is loading</li>
          <li>✅ Vite dev server is running</li>
          <li>✅ Basic components work</li>
        </ul>
      </div>
    </div>
  )
}

export default TestDashboard
