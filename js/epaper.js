/* =========================================================
   PRAJA VAARTHALU - ePaper: editions, dates, pages, zoom, full screen, PDF
   Real PDFs: place files at assets/epaper/<edition-id>-<YYYY-MM-DD>.pdf
   ========================================================= */

/* Articles that belong to an edition */
function edArticles(ed){
  let base=sorted();
  if(ed.scope==='ap') base=base.filter(a=>a.cat==='ap'||(DIST[a.dist]||{}).st==='ap');
  if(ed.scope==='tg') base=base.filter(a=>a.cat==='telangana'||(DIST[a.dist]||{}).st==='tg');
  if(ed.scope==='dist') base=base.filter(a=>a.dist===ed.dist);
  return base.length>=3?base:sorted();
}

/* Full ePaper page */
function renderEpaper(){
  const prev=[1,2,3,4,5,6].map(n=>{
    const d=new Date(Date.now()-n*864e5);
    const iso=isoDate(d);
    return `<button data-action="ep-date" data-date="${iso}" class="${state.epDate===iso?'on':''}">${d.toLocaleDateString(L(),{weekday:'short',day:'numeric',month:'short'})}</button>`;
  }).join('');
  document.title=t('epaper')+' | '+BRAND[lang];
  return `<div class="container page-pad">
    ${crumbs([[t('home'),'#/home'],[t('epaper')]])}
    <div class="sec-head"><h1>${t('epaper')}</h1><span class="muted">${t('ePdfNote')}</span></div>
    <div class="ep-layout">
      <aside class="ep-side" aria-label="${t('editions')}">
        <h3>${t('editions')}</h3>
        ${EDITIONS.map(e=>`<button data-action="ep-ed" data-id="${e.id}" class="${state.ep===e.id?'on':''}">${lang==='te'?e.te:e.en}</button>`).join('')}
        <h3>${t('prevEditions')}</h3>
        ${prev}
      </aside>
      <div id="epBody">${epBodyHtml()}</div>
    </div>
  </div>`;
}

/* Viewer + toolbar (re-rendered when the edition, date or page changes) */
function epBodyHtml(){
  const ed=EDITIONS.find(e=>e.id===state.ep)||EDITIONS[0];
  const list=edArticles(ed);
  const dt=new Date(state.epDate+'T00:00:00');
  const dateTxt=dt.toLocaleDateString(L(),{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const edNo=Math.floor(dt.getTime()/864e5)%10000;
  const p=state.epPage;
  const dname=lang==='te'?ed.te:ed.en;
  const head=`<div class="ep-mast"><b>${BRAND.te}</b><span>PRAJA VAARTHALU</span></div>
    <div class="ep-meta"><span>${dateTxt}</span><span>${t('editionWord')} #${edNo} · ${dname}</span></div>`;
  let inner;
  if(p===1){
    const lead=getA(list[0]);
    inner=`${head}
      <div class="ep-lead"><div><img src="${lead.img}" alt=""><h2 style="margin-top:8px">${esc(lead.title)}</h2><p style="font-size:.9rem">${esc(lead.desc)}</p></div>
      <div>${list.slice(1,5).map(a=>{const x=getA(a);return `<h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p><hr style="border:0;border-top:1px solid #ccc;margin:8px 0">`;}).join('')}</div></div>
      <div class="ep-list">${list.slice(5,9).map(a=>{const x=getA(a);return `<div><h3>${esc(x.title)}</h3><p>${esc(x.author)} · ${esc(x.catName)}</p></div>`;}).join('')}</div>`;
  }else{
    let arr=list.filter(a=>PAGE_CATS[p].includes(a.cat));
    if(!arr.length) arr=list.slice(0,6);
    inner=`${head}<h2 style="margin-bottom:10px">${t('pageWord')} ${p}</h2>
      <div class="ep-list">${arr.slice(0,8).map(a=>{const x=getA(a);return `<div><span class="kicker">${esc(x.catName)}</span><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>`;}).join('')}</div>`;
  }
  return `
    <div class="ep-toolbar" role="toolbar" aria-label="ePaper controls">
      <div class="grp"><label class="sr-only" for="epDate">${t('date')}</label><input type="date" id="epDate" data-change="ep-date" value="${state.epDate}" max="${todayISO()}"></div>
      <div class="grp">
        <button data-action="ep-prev" aria-label="${t('prev')}">&#8249;</button>
        <span>${t('page')} ${p} / ${PAGES}</span>
        <button data-action="ep-next" aria-label="${t('next')}">&#8250;</button>
      </div>
      <div class="grp">
        <button data-action="ep-zout" aria-label="${t('zoomOut')}">A−</button>
        <span>${Math.round(state.zoom*100)}%</span>
        <button data-action="ep-zin" aria-label="${t('zoomIn')}">A+</button>
        <button data-action="ep-zreset">100%</button>
      </div>
      <div class="grp">
        <button data-action="ep-full">${t('fullscreen')}</button>
        <button data-action="ep-print">${t('print')}</button>
        <button data-action="ep-pdf">${t('download')}</button>
      </div>
    </div>
    <div class="ep-viewer" id="epViewer"><article class="ep-page" style="zoom:${state.zoom}">${inner}<div class="ep-foot">${t('edNote')} <span class="demo-stamp">DEMO</span></div></article></div>
    <div class="ep-pager"><button class="btn" data-action="ep-prev">${t('prev')}</button><button class="btn" data-action="ep-next">${t('next')}</button></div>`;
}

/* Re-render only the ePaper body */
function refreshEpaper(){
  const b=$('#epBody');
  if(b){ b.innerHTML=epBodyHtml(); fixLinks(b); }
}

/* PDF: use the real file if uploaded, otherwise open the print view */
async function downloadPdf(){
  const ed=EDITIONS.find(e=>e.id===state.ep)||EDITIONS[0];
  const url=`assets/epaper/${ed.id}-${state.epDate}.pdf`;
  try{
    const res=await fetch(url,{method:'HEAD'});
    if(res.ok){ window.open(url,'_blank','noopener'); return; }
    throw new Error('PDF not found');
  }catch(err){
    toast(t('pdfNotice'));
    setTimeout(()=>window.print(),700);
  }
}

/* Full-screen reading of the viewer */
function toggleFullscreen(){
  const v=$('#epViewer');
  if(!v) return;
  if(!document.fullscreenElement){
    if(v.requestFullscreen) v.requestFullscreen().catch(()=>toast(t('fullUnsupported')));
    else toast(t('fullUnsupported'));
  }else if(document.exitFullscreen){
    document.exitFullscreen();
  }
}

/* Zoom between 60% and 200% */
function setZoom(z){
  state.zoom=Math.min(2,Math.max(0.6,Math.round(z*10)/10));
  const pg=$('.ep-page');
  if(pg) pg.style.zoom=state.zoom;
  const lbl=$('#epBody .ep-toolbar .grp:nth-child(3) span');
  if(lbl) lbl.textContent=Math.round(state.zoom*100)+'%';
}
