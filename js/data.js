// Portugal AQ WebGIS v4 — GeoServer + Chart Data (from group results)
const GEOSERVER = {
  url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_08/wms',
  workspace: 'gisgeoserver_08'
};

const GS_LAYERS = {
  no2Amac:    'Portugal_no2_2021_2023_AMAC_map',
  no2Avg:     'Portugal_average_no2_2023',
  no2Conc:    'Portugal_no2_concentration_map_2023',
  pm25Amac:   'Portugal_pm2p5_2021_2023_AMAC_map',
  pm25Avg:    'Portugal_average_pm2p5_2023',
  pm25Conc:   'Portugal_pm2p5_concentration_map_2023',
  pm10Amac:   'Portugal_pm10_2021_2023_AMAC_map',
  pm10Avg:    'Portugal_average_pm10_2023',
  pm10Conc:   'Portugal_pm10_concentration_map_2023',
  boundary:   'Portugal_bound'
};

// Exposure pie data (from zonal statistics CSV)
const EXPOSURE_DATA = {
  pm25: { labels: ['Good (≤5 µg/m³)','Moderate (5–10 µg/m³)'], values: [1006570,7449647], colors: ['#5B8C5A','#C49A4A'] },
  no2:  { labels: ['Good (≤10 µg/m³)','Moderate (10–25 µg/m³)'], values: [5476667,4432811], colors: ['#5B8C5A','#C49A4A'] },
  pm10: { labels: ['Good (≤15 µg/m³)','Moderate (15–31 µg/m³)'], values: [4049972,5859527], colors: ['#5B8C5A','#C49A4A'] }
};

// AMAC bar chart data (from LC cross-analysis tables)
const AMAC_DATA = {
  pm25: { labels: ['Crops Loss','Crops Gain'], values: [-1.52,-1.48], colors: ['#C49A4A','#5B8C5A'] },
  no2:  { labels: ['Built Area Loss','Built Area Gain'], values: [-0.16,-0.17], colors: ['#C49A4A','#5B8C5A'] },
  pm10: { labels: ['Trees Loss','Trees Gain'], values: [-3.12,-3.02], colors: ['#C49A4A','#5B8C5A'] }
};

// LC Change Detection table (from group detection xlsx)
const LCC_DATA = [
  { class:'Trees (YIRAN LI)',       stable:71.52, gain:12.75, loss:15.73, gpx:38424196, lpx:47423414 },
  { class:'Built Area (PENGYI)',    stable:88.32, gain:5.52,  loss:6.16,  gpx:6296831,  lpx:7027920 },
  { class:'Crops (XIANG XIE)',      stable:75.12, gain:15.25, loss:9.64,  gpx:25713132, lpx:16248608 },
];
