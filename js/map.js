// Portugal AQ WebGIS v4 — OpenLayers + GeoServer WMS (10 layers)
const WMS_URL = GEOSERVER.url;
const WS = GEOSERVER.workspace;
const center = ol.proj.fromLonLat([-8.0,39.5]);

// Basemaps
const osmBase = new ol.layer.Tile({title:'OpenStreetMap',type:'base',visible:true,source:new ol.source.OSM({attributions:'© OSM contributors'})});
const cartoBase = new ol.layer.Tile({title:'CartoDB Dark',type:'base',visible:false,source:new ol.source.XYZ({url:'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',attributions:'© OSM © CARTO',maxZoom:19})});

// WMS factory
function wms(title, layer, visible, opacity){
  return new ol.layer.Tile({title,visible:visible||false,opacity:opacity||0.8,source:new ol.source.TileWMS({url:WMS_URL,params:{'LAYERS':`${WS}:${layer}`,'TILED':true,'FORMAT':'image/png','TRANSPARENT':true},serverType:'geoserver',crossOrigin:'anonymous'})});
}

// All 10 layers
const layers = {
  no2Amac:   wms('NO₂ AMAC', GS_LAYERS.no2Amac, true),
  no2Avg:    wms('NO₂ Annual Avg', GS_LAYERS.no2Avg, false, 0.7),
  no2Conc:   wms('NO₂ Concentration', GS_LAYERS.no2Conc, false, 0.7),
  pm25Amac:  wms('PM₂.₅ AMAC', GS_LAYERS.pm25Amac, true),
  pm25Avg:   wms('PM₂.₅ Annual Avg', GS_LAYERS.pm25Avg, false, 0.7),
  pm25Conc:  wms('PM₂.₅ Concentration', GS_LAYERS.pm25Conc, false, 0.7),
  pm10Amac:  wms('PM₁₀ AMAC', GS_LAYERS.pm10Amac, false),
  pm10Avg:   wms('PM₁₀ Annual Avg', GS_LAYERS.pm10Avg, false, 0.7),
  pm10Conc:  wms('PM₁₀ Concentration', GS_LAYERS.pm10Conc, false, 0.7),
  boundary:  wms('Portugal Boundary', GS_LAYERS.boundary, true, 1),
};

// Map
const map = new ol.Map({
  target:'map',
  layers:[osmBase,cartoBase,...Object.values(layers)],
  view:new ol.View({center,zoom:7}),
  controls:ol.control.defaults.defaults().extend([
    new ol.control.ScaleLine({units:'metric'}),
    new ol.control.FullScreen(),
    new ol.control.MousePosition({coordinateFormat:ol.coordinate.createStringXY(4),projection:'EPSG:4326',className:'mouse-position',placeholder:'Lon, Lat'})
  ])
});

// Basemap switch
document.querySelectorAll('input[name="basemap"]').forEach(r=>{r.addEventListener('change',function(){osmBase.setVisible(this.value==='osm');cartoBase.setVisible(this.value==='carto');});});

// Layer toggle
document.querySelectorAll('input[data-layer]').forEach(cb=>{cb.addEventListener('change',function(){layers[this.dataset.layer].setVisible(this.checked);updateLegend();});});

// Legend
const legendLayers = [
  ['no2Amac','NO₂ AMAC',GS_LAYERS.no2Amac],
  ['no2Avg','NO₂ Annual Avg',GS_LAYERS.no2Avg],
  ['no2Conc','NO₂ Concentration',GS_LAYERS.no2Conc],
  ['pm25Amac','PM₂.₅ AMAC',GS_LAYERS.pm25Amac],
  ['pm25Avg','PM₂.₅ Annual Avg',GS_LAYERS.pm25Avg],
  ['pm25Conc','PM₂.₅ Concentration',GS_LAYERS.pm25Conc],
  ['pm10Amac','PM₁₀ AMAC',GS_LAYERS.pm10Amac],
  ['pm10Avg','PM₁₀ Annual Avg',GS_LAYERS.pm10Avg],
  ['pm10Conc','PM₁₀ Concentration',GS_LAYERS.pm10Conc],
];

function updateLegend(){
  const c=document.getElementById('legend-content');if(!c)return;c.innerHTML='';
  legendLayers.forEach(([k,title,lname])=>{
    if(layers[k].getVisible()){
      const d=document.createElement('div');d.className='legend-item';
      d.innerHTML=`<h4>${title}</h4><img src="${WMS_URL}?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${WS}:${lname}" alt="${title}" onerror="this.style.display='none'">`;
      c.appendChild(d);
    }
  });
}
updateLegend();
