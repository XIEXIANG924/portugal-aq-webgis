Chart.defaults.color='#6B7F6A';Chart.defaults.borderColor='rgba(91,140,90,0.1)';Chart.defaults.font.family="'Inter',sans-serif";

// Value label plugin for bar charts
const barLabelPlugin = {
  id: 'barLabels',
  afterDatasetsDraw(chart) {
    const {ctx} = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const val = dataset.data[index];
        ctx.fillStyle = '#3D5A3C';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(val.toFixed(2), bar.x, bar.y - 4);
      });
    });
  }
};

// LC Table
(function(){
  const t=document.getElementById('lcc-tbody');if(!t)return;
  LCC_DATA.forEach(r=>{
    const sc=r.stable>97?'color:var(--sage);font-weight:700':r.stable>90?'color:var(--gold)':'';
    t.innerHTML+=`<tr><td style="font-weight:600;color:var(--sage-dark)">${r.class}</td><td style="${sc}">${r.stable.toFixed(2)}%</td><td>${r.gain.toFixed(2)}%</td><td>${r.loss.toFixed(2)}%</td><td>${r.gpx.toLocaleString()}</td><td>${r.lpx.toLocaleString()}</td><td>${(r.gain-r.loss).toFixed(2)}%</td></tr>`;
  });
})();

// Doughnut center text plugin
const doughnutCenterPlugin = {
  id: 'doughnutCenter',
  afterDatasetsDraw(chart) {
    if (chart.config.type !== 'doughnut') return;
    const {ctx, data} = chart;
    const meta = chart.getDatasetMeta(0);
    const total = data.datasets[0].data.reduce((a,b)=>a+b,0);
    meta.data.forEach((arc, i) => {
      const val = data.datasets[0].data[i];
      const pct = ((val/total)*100).toFixed(1);
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const r = (arc.innerRadius + arc.outerRadius) / 2;
      const x = arc.x + Math.cos(angle) * r;
      const y = arc.y + Math.sin(angle) * r;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${pct}%`, x, y);
    });
  }
};

// AMAC Bar Charts
function amacBar(id,data){
  const c=document.getElementById(id);if(!c)return;
  new Chart(c,{plugins:[barLabelPlugin],type:'bar',data:{labels:data.labels,datasets:[{data:data.values,backgroundColor:data.colors.map(c=>c+'B3'),borderColor:data.colors,borderWidth:1.5,borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#FAFAF7',titleColor:'#3D5A3C',bodyColor:'#2C3A2B',borderColor:'#5B8C5A',borderWidth:1.5,callbacks:{label:ctx=>` ${ctx.parsed.y.toFixed(2)} µg/m³`}}},scales:{x:{grid:{display:false},ticks:{font:{size:11,weight:600},color:'#6B7F6A'}},y:{grid:{color:'rgba(91,140,90,0.08)'},ticks:{callback:v=>v.toFixed(2),color:'#6B7F6A'}}}}});
}
amacBar('pm25-amac',AMAC_DATA.pm25);amacBar('no2-amac',AMAC_DATA.no2);amacBar('pm10-amac',AMAC_DATA.pm10);

// Exposure Doughnuts
function expoPie(id,data){
  const c=document.getElementById(id);if(!c)return;
  const t=data.values.reduce((a,b)=>a+b,0);
  new Chart(c,{plugins:[doughnutCenterPlugin],type:'doughnut',data:{labels:data.labels,datasets:[{data:data.values,backgroundColor:['#5B8C5ABB','#C49A4ABB'],borderColor:['#5B8C5A','#C49A4A'],borderWidth:2,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'bottom',labels:{padding:14,font:{size:11},color:'#6B7F6A',usePointStyle:true,pointStyleWidth:10}},tooltip:{backgroundColor:'#FAFAF7',titleColor:'#3D5A3C',bodyColor:'#2C3A2B',borderColor:'#5B8C5A',borderWidth:1.5,callbacks:{label:ctx=>{const p=(ctx.parsed/t*100).toFixed(1);return` ${p}% (${ctx.parsed.toLocaleString()}ppl)`;}}}}}});
}
expoPie('pm25-pie',EXPOSURE_DATA.pm25);expoPie('no2-pie',EXPOSURE_DATA.no2);expoPie('pm10-pie',EXPOSURE_DATA.pm10);
