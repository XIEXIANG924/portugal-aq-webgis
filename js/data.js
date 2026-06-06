// Portugal AQ WebGIS v4 — GeoServer + Chart Data
const GEOSERVER = {
  url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_08/wms',
  workspace: 'gisgeoserver_08'
};

// All 10 GeoServer layers (3 pollutants × 3 types + 1 boundary)
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

// Chart data
const EXPOSURE_DATA = {
  pm25: { labels: ['Good (≤5 µg/m³)','Moderate (5–10 µg/m³)'], values: [1006570,7449647], colors: ['#5B8C5A','#C49A4A'] },
  no2:  { labels: ['Good (≤10 µg/m³)','Moderate (10–25 µg/m³)'], values: [5476667,4432811], colors: ['#5B8C5A','#C49A4A'] },
  pm10: { labels: ['Good (≤15 µg/m³)','Moderate (15–31 µg/m³)'], values: [4049972,5859527], colors: ['#5B8C5A','#C49A4A'] }
};
const AMAC_DATA = {
  pm25: { labels: ['Trees Loss','Trees Gain'], values: [-2.03,-1.87], colors: ['#C49A4A','#5B8C5A'] },
  no2:  { labels: ['Built Area Loss','Built Area Gain'], values: [-0.15,-0.16], colors: ['#C49A4A','#5B8C5A'] },
  pm10: { labels: ['Crops Loss','Crops Gain'], values: [-2.81,-2.57], colors: ['#C49A4A','#5B8C5A'] }
};
const LCC_DATA = [
  { class:'Trees', stable:97.84, gain:1.08, loss:1.08, gpx:37636537, lpx:44429920 },
  { class:'Built Area', stable:99.54, gain:0.23, loss:0.23, gpx:8263960, lpx:6894833 },
  { class:'Crops', stable:88.62, gain:10.94, loss:6.89, gpx:25176970, lpx:15837160 },
];
