// Portugal AQ WebGIS v4 — GeoServer + Chart Data (from group results)
const GEOSERVER = {
  url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_08/wms',
  workspace: 'gisgeoserver_08'
};

const GS_LAYERS = {
  no2Amac:    'Portugal_no2_2021_2023_AMAC_map',
  no2Avg:     'Portugal_average_no2_2023',
  no2Avg21:   'Portugal_average_no2_2021',
  no2Conc:    'Portugal_no2_concentration_map_2023',
  pm25Amac:   'Portugal_pm2p5_2021_2023_AMAC_map',
  pm25Avg:    'Portugal_average_pm2p5_2023',
  pm25Avg21:  'Portugal_average_pm2p5_2021',
  pm25Conc:   'Portugal_pm2p5_concentration_map_2023',
  pm10Amac:   'Portugal_pm10_2021_2023_AMAC_map',
  pm10Avg:    'Portugal_average_pm10_2023',
  pm10Avg21:  'Portugal_average_pm10_2021',
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
  { class:'Trees',      stable:82.59, gain:8.67, loss:8.74, gpx:38424196, lpx:47423414, note:'Tree cover remained fairly stable, with 82.59% persistence. Most gains came from rangeland, while most losses also became rangeland, suggesting vegetation degradation/recovery rather than urban conversion.' },
  { class:'Built Area', stable:93.46, gain:3.27, loss:3.27, gpx:6296831,  lpx:7027920,  note:'The most stable class at 93.46% persistence. New built-up areas mainly came from trees, rangeland, and crops, showing urban expansion affected both natural and agricultural land.' },
  { class:'Crops',      stable:88.62, gain:5.68, loss:5.70, gpx:25713132, lpx:16248608, note:'High stability at 88.62%. Most crop gains came from rangeland, while most losses returned to rangeland, indicating strong exchange between agricultural land and open vegetation.' },
];
