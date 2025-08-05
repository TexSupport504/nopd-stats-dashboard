# NOPD Dashboard Analytics Requirements

## 📊 Key Metrics

### Primary Statistics
- **Total crime incidents**
- **Crime trends** (monthly/yearly)
- **Top crimes by count, YTD**
- **Top 3 crimes by count in the last 3 months**
- **Week with highest crime count** + did Violent or Non-Violent compose the majority of this number?
- **Month, YTD, with highest crime count** + did Violent or Non-Violent compose the majority of this number?

## 🗺️ Geographic Analysis

### Location Filtering
- **Exclude any addresses on north side of Julia St.**

### Predefined Areas Analysis
- **100 ft radius of coordinates: 29.942960685319683, -90.0653479519101** (people service off-site office suite)
- **Campus sectors** based on Google MyMaps: https://www.google.com/maps/d/edit?mid=1MdRUEuzgCZYlC9ir9JTA5NZKtuTTjPw&usp=sharing

### Visualization Requirements
- Heat maps of incident locations
- Geographic distributions by sector
- Proximity analysis to key locations

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

### Crime Type Analysis
- **Specific crime types** (theft, assault, etc.)
- **Crime severity levels**

## 📁 Data Sources
- **Primary:** NOPD Data.xlsx
- **Classification:** convertlist.csv (violent vs non-violent mapping)
- **Geographic:** Julia St. boundary exclusion
- **Campus Sectors:** Google MyMaps integration

## 🎯 Implementation Priority
1. Data upload and processing
2. Violent vs non-violent classification system
3. Geographic filtering (Julia St. exclusion)
4. Security shift analysis
5. Proximity analysis around key coordinates
6. Time-based analytics
7. Heat map visualization
8. Campus sector integration

---
*Created: August 4, 2025*
*Last Updated: August 4, 2025*
