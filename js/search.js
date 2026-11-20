/* =========================================================
   PRAJA VAARTHALU - Search (headline, category, district, author; Telugu + English)
   ========================================================= */

/* Returns matching articles. Every word typed must match somewhere. */
function searchArts(q,cat,dist){
  const toks=String(q||'').toLowerCase().trim().split(/\s+/).filter(Boolean);
  return sorted().filter(a=>{
    if(cat && a.cat!==cat) return false;
    if(dist && a.dist!==dist) return false;
    if(!toks.length) return !!(cat||dist);
    const d=DIST[a.dist]||{};
    const hay=[
      a.en.t,a.en.s,a.te.t,a.te.s,            /* headline + description, both languages */
      a.author,AUTH[a.author]||'',              /* author in English and Telugu */
      a.cat,(CATS[a.cat]||[]).join(' '),        /* category names */
      d.en||'',d.te||'',                        /* district names */
      d.st==='ap'?'andhra pradesh':d.st==='tg'?'telangana':''
    ].join(' ').toLowerCase();
    return toks.every(tk=>hay.includes(tk));
  });
}

/* Search results page (index.html#/search?q=...&cat=...&dist=...) */
function renderSearch(q,cat,dist){
  const results=searchArts(q,cat,dist);
  document.title=(q||t('search'))+' | '+BRAND[lang];
  const catOpts=`<option value="">${t('allCats')}</option>`+Object.keys(CATS).map(k=>`<option value="${k}" ${k===cat?'selected':''}>${catName(k)}</option>`).join('');
  const distOpts=`<option value="">${t('allDistricts')}</option>`+Object.keys(DIST).map(k=>`<option value="${k}" ${k===dist?'selected':''}>${lang==='te'?DIST[k].te:DIST[k].en}</option>`).join('');
  return `<div class="container page-pad">
    ${crumbs([[t('home'),'#/home'],[t('search')]])}
    <div class="sec-head"><h1>${t('search')}</h1></div>
    <form data-form="search" class="filters" role="search">
      <label style="flex:1;min-width:220px">${t('search')}
        <input class="input" type="search" name="q" value="${esc(q)}" placeholder="${esc(t('searchPh'))}"></label>
      <label>${t('categoryLabel')}<select name="cat">${catOpts}</select></label>
      <label>${t('districtLabel')}<select name="dist">${distOpts}</select></label>
      <button class="btn btn-solid" type="submit">${t('search')}</button>
    </form>
    <p class="muted" style="margin-bottom:16px">${results.length} ${t('resultsFor')} “${esc(q||'')}”</p>
    ${results.length?`<div class="card-grid">${results.slice(0,PAGE_SIZE*2).map(a=>card(a)).join('')}</div>`:emptyState()}
  </div>`;
}

/* Quick search overlay opened from the header search icon */
function openSearch(){
  const chips=TOPICS.map(([en,te])=>`<a class="chip" style="margin:3px" href="#/search?q=${encodeURIComponent(en)}" data-close="1">${lang==='te'?te:en}</a>`).join(' ');
  openModal(`<h3>${t('search')}</h3>
    <form data-form="search-modal" class="form-row" role="search">
      <input class="input" type="search" name="q" placeholder="${esc(t('searchPh'))}" aria-label="${t('search')}">
      <button class="btn btn-solid" type="submit">${t('search')}</button>
    </form>
    <p class="muted" style="margin-top:12px;font-size:.85rem">${chips}</p>`);
  setTimeout(()=>{const i=$('#modal input[name=q]');if(i)i.focus();},50);
}
