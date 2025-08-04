# NOPD Statistics Dashboard

A modern React-based dashboard for displaying New Orleans Police Department statistics and analytics.

## Project Structure

```
nopd-stats-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.jsx  # Main dashboard view
│   │   ├── Layout.jsx     # App layout with header/footer
│   │   ├── StatCard.jsx   # Individual statistic cards
│   │   └── ChartContainer.jsx # Chart wrapper component
│   ├── utils/
│   │   └── dataUtils.js   # Data processing utilities
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── package.json          # Project dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Features

- 📊 **Interactive Charts** - Built with Recharts for data visualization
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean design with Tailwind CSS
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
