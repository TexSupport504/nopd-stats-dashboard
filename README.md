# NOPD Statistics Dashboard

A modern React-based dashboard for displaying New Orleans Police Department statistics and analytics.

## Overview

The NOPD Statistics Dashboard provides a comprehensive, data-driven view of crime statistics for the New Orleans Police Department. Built with modern web technologies, it offers intuitive visualization tools and robust data analysis capabilities.

![NOPD Dashboard](https://github.com/TexSupport504/nopd-stats-dashboard/raw/master/public/dashboard-preview.png)

## Features

- 📊 **Smart Data Analysis** - Automatically detects and parses Excel data formats
- 🕒 **Time-Based Filtering** - Filter data by last 7 days, 30 days, 90 days, 6 months, 1 year, or all time
- 📈 **Interactive Charts** - Visualize crime trends, patterns, and distributions
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark/Light Themes** - User-selectable interface theme
- 🔍 **District & Location Analytics** - Break down crime data by police district and location
- 📝 **Type Classification** - Automatic categorization of violent vs. non-violent crimes
- 🛠️ **Robust Error Handling** - Intelligent recovery from data issues with helpful error messages

## Project Structure

```
nopd-stats-dashboard/
├── public/                    # Static assets and data files
│   ├── NOPD Data.xlsx         # Crime statistics data
│   └── [other assets]
├── src/
│   ├── components/            # React components
│   │   ├── LandingPageNew.jsx # Main dashboard view with analytics
│   │   ├── ModernLayout.jsx   # App layout with navigation
│   │   ├── MetricCard.jsx     # Enhanced metric display cards
│   │   └── ModernChart.jsx    # Chart visualization component
│   ├── contexts/
│   │   └── ThemeContext.jsx   # Dark/light theme management
│   ├── utils/
│   │   └── dataUtils.js       # Data processing utilities
│   ├── App.jsx                # Main application router
│   └── main.jsx               # App entry point
├── package.json               # Project dependencies
├── vite.config.js             # Vite build configuration
└── tailwind.config.js         # UI design system configuration
```

## Recent Improvements

### Added
- Enhanced time frame filtering with intelligent date handling
- Support for multiple Excel date formats
- Detailed record count visibility for each time frame
- Smart data reference point detection for historical data
- Fallback mechanisms to prevent empty views

### Fixed
- Time frame dropdown selections now show accurate record counts
- Empty data handling with helpful user guidance
- Date parsing for various format types
- Console debugging for data validation
- Error recovery options with "View All Historical Data" button

### Technical
- Used newest date in dataset as reference point for filtering
- Added year-by-year data distribution analysis
- Added detailed logging for time frame record counts
- Improved date parsing to handle Excel serial dates
- Enhanced user interface feedback for filter changes

## Usage

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

## Data Requirements

The dashboard expects an Excel file with crime data containing at least:

1. A date column (detected automatically)
2. Crime type/category column
3. Optional district and location columns

The system will automatically detect appropriate columns and handle common date formats, including Excel serial dates, MM/DD/YYYY, YYYY-MM-DD, and other standard formats.

## Configuration

### Time Frame Options

Time frames are configured in `LandingPageNew.jsx` and can be customized:

```jsx
const timeFrameOptions = [
  { value: '7d', label: '7 Days', days: 7 },
  { value: '30d', label: '30 Days', days: 30 },
  // Add more options as needed
]
```
- 🔧 **Easy Data Integration** - Utilities for processing your data files
- ⚡ **Fast Development** - Vite for quick builds and hot reload

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Adding Your Data

1. **Place your data file** in the `public/` folder (e.g., `public/nopd-data.json`)

2. **Update the data utilities** in `src/utils/dataUtils.js` to process your specific data format

3. **Modify the components** to use your processed data instead of the sample data

## Data Format Expected

The dashboard is designed to work with various data formats. Common fields include:

- Date/timestamp fields
- Incident types
- Geographic data (districts, neighborhoods)
- Crime categories
- Response times
- Arrest information
- Clearance rates

## Customization

### Colors and Styling
- Edit `tailwind.config.js` to modify the color scheme
- Update the police-themed colors in the config
- Modify component styles in individual `.jsx` files

### Charts and Visualizations
- Add new chart types in `ChartContainer.jsx`
- Create new visualization components as needed
- Use Recharts library for additional chart types

### Layout and Navigation
- Modify `Layout.jsx` for header/footer changes
- Update navigation items and routing in `App.jsx`
- Add new pages/routes as needed

## Dependencies

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Lucide React** - Modern icon library
- **React Router** - Client-side routing

## Development

- The project uses modern JavaScript/ES6+ features
- Components are functional components with hooks
- Tailwind CSS for styling with custom design system
- Responsive design principles throughout

## Next Steps

1. Share your data file format and requirements
2. Customize the data processing functions
3. Add specific chart types for your data
4. Configure any additional features needed

The dashboard is ready to run with sample data and can be easily customized for your specific NOPD statistics requirements!
