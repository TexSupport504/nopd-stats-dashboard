# NOPD Dashboard Analytics Requirements

## 📊 Key Metrics

### Primary Statistics
- **Total crime incidents**
- **Crime trends (monthly/yearly)**
- **Top crimes by count, YTD**
- **Top 3 crimes by count in the last 3 months**

### Peak Analysis
- **Week with highest crime count** + did Violent or Non-Violent compose the majority of this number?
- **Month, YTD, with highest crime count** + did Violent or Non-Violent compose the majority of this number?

## 🗺️ Geographic Analysis

### Exclusions
- **Exclude any addresses on north side of Julia St.**

### Proximity Analysis
- **Crimes nearest to predefined areas:**
  - **100 ft of coordinates:** `29.942960685319683, -90.0653479519101` (people service off-site office suite)

### Heat Maps
- **Incident location heat maps** based on campus sectors
- **Reference map:** https://www.google.com/maps/d/edit?mid=1MdRUEuzgCZYlC9ir9JTA5NZKtuTTjPw&usp=sharing

## 📈 Time Analysis

### Temporal Patterns
- **Crime trends over time**
- **Seasonal patterns**
- **Day of week/hour analysis**

### Security Shift Analysis
- **Day Shift:** 7:45AM - 4:15PM
- **Evening Shift:** 3:45PM - 12:15AM  
- **Overnight Shift:** 11:45PM - 8:15AM

## 🏷️ Crime Categories

### Violence Classification
- **Violent crimes vs. non-violent crimes**
- **Ratio of violent vs non-violent** (using convertlist.csv)
- **Deep dive into both violent and non-violent statistics**

### Crime Types
- **Specific crime types** (theft, assault, etc.)
- **Crime severity levels**

## 📁 Data Sources
- **Primary:** NOPD Data.xlsx
- **Classification:** convertlist.csv
- **Geographic:** Campus sector maps

## 🎯 Implementation Priority
1. Data ingestion and processing
2. Violent/Non-violent classification system
3. Geographic filtering (Julia St. exclusion)
4. Key metrics dashboard
5. Time-based analytics
6. Proximity analysis
7. Heat mapping integration

## 📝 Notes
- Dashboard framework already implemented
- Ready for real data integration
- Modular component architecture allows easy iteration
