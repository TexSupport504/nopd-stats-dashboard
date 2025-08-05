# NOPD Statistics Dashboard - Implementation Metrics
*Based on NOPD_ANALYTICS_REQUIREMENTS.md*

## Overview
This document outlines the specific metrics and analytics to be implemented in the NOPD Statistics Dashboard based on the official requirements. The dashboard focuses on crime trends, geographic analysis, temporal patterns, and security shift analytics.

---

## 1. Landing Page - Primary Statistics

### Key Crime Metrics
- **Total Crime Incidents** - All reported incidents from NOPD Data.xlsx
- **Crime Trends** - Monthly and yearly trend analysis
- **Top Crimes by Count YTD** - Ranking of most frequent crime types this year
- **Top 3 Crimes (Last 3 Months)** - Recent crime type priorities
- **Week with Highest Crime Count** - Peak week identification + violent vs non-violent breakdown
- **Month YTD with Highest Crime Count** - Peak month identification + violent vs non-violent composition

### Violence Classification Stats
- **Violent vs Non-Violent Crime Ratio** - Using convertlist.csv mapping
- **Violent Crime Deep Dive** - Detailed violent crime statistics
- **Non-Violent Crime Deep Dive** - Detailed non-violent crime statistics

---

## 2. Shift Level Temporal Analytics

### Security Shift Performance Metrics
#### Day Shift (7:45AM - 4:15PM)
- Crime incident count during day shift
- Violent vs non-violent breakdown
- Crime type distribution
- Temporal patterns within shift

#### Evening Shift (3:45PM - 12:15AM)
- Crime incident count during evening shift
- Violent vs non-violent breakdown
- Crime type distribution
- Temporal patterns within shift

#### Overnight Shift (11:45PM - 8:15AM)
- Crime incident count during overnight shift
- Violent vs non-violent breakdown
- Crime type distribution
- Temporal patterns within shift

### Temporal Pattern Analysis
- **Day of Week Analysis** - Crime patterns by weekday
- **Hour of Day Analysis** - 24-hour crime distribution
- **Seasonal Patterns** - Monthly and quarterly trends
- **Shift Overlap Analysis** - Crime patterns during shift changes

---

## 3. Geographic Analysis & Filtering

### Geographic Filtering Requirements
- **Julia Street Exclusion** - Exclude all addresses on north side of Julia St.
- **Proximity Analysis** - 100 ft radius around coordinates: 29.942960685319683, -90.0653479519101
- **Campus Sectors** - Based on Google MyMaps: https://www.google.com/maps/d/edit?mid=1MdRUEuzgCZYlC9ir9JTA5NZKtuTTjPw&usp=sharing

### Visualization Requirements
- **Heat Maps** - Incident location density visualization
- **Geographic Distribution** - Crime spread by sector
- **Proximity Analysis** - Crime incidents within specified radius of key locations
- **Sector-Based Analysis** - Campus sector crime distribution

---

## 4. Crime Classification & Analysis

### Violence Classification (Using convertlist.csv)
- **Violent Crime Categories** - Mapping from convertlist.csv
- **Non-Violent Crime Categories** - Mapping from convertlist.csv
- **Violence Ratio Analysis** - Percentage violent vs non-violent
- **Trend Analysis** - Violence ratio changes over time

### Crime Type Deep Dive
- **Specific Crime Types** - Theft, assault, burglary, etc.
- **Crime Severity Levels** - Classification by impact
- **Frequency Analysis** - Most common crime types
- **Trend Analysis** - Crime type changes over time

---

## 5. Data Sources & Technical Requirements

### Primary Data Sources
- **NOPD Data.xlsx** - Main crime incident data
- **convertlist.csv** - Violent vs non-violent crime mapping
- **Geographic Boundaries** - Julia St. exclusion rules
- **Google MyMaps** - Campus sector definitions

### Implementation Priority (As Specified)
1. **Data Upload and Processing** - NOPD Data.xlsx integration
2. **Violent vs Non-Violent Classification** - convertlist.csv implementation
3. **Geographic Filtering** - Julia St. boundary exclusion
4. **Security Shift Analysis** - Custom shift time analysis
5. **Proximity Analysis** - 100ft radius calculations
6. **Time-Based Analytics** - Temporal pattern analysis
7. **Heat Map Visualization** - Geographic density mapping
8. **Campus Sector Integration** - Google MyMaps sector analysis

### Key Performance Indicators
- **Total Crime Incidents** - Raw count from NOPD data
- **Violence Percentage** - % of crimes classified as violent
- **Peak Crime Periods** - Highest activity times/dates
- **Geographic Concentration** - Crime density by area
- **Shift Performance** - Crime distribution across security shifts

---

## 6. Dashboard Page Structure

### Landing Page Focus
- Primary crime statistics and trends
- Violent vs non-violent ratio
- Top crime types YTD and last 3 months
- Peak week/month identification

### Shift Analytics Focus
- Security shift performance comparison
- Temporal crime patterns
- Day/hour analysis
- Shift-specific insights

### Geographic Analytics Focus
- Heat map visualization
- Campus sector analysis
- Julia St. boundary compliance
- Proximity analysis around key coordinates

---

*Based on NOPD_ANALYTICS_REQUIREMENTS.md*
*Last Updated: August 4, 2025*
*Version: 2.0 - Aligned with Official Requirements*
