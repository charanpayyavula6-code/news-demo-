/* =========================================================
   PRAJA VAARTHALU - Main application: state, article model,
   page renderers (home, category, district, article, gallery,
   videos, bookmarks, about, contact), events and start-up.
   ========================================================= */

/* ---------- Persistent user data ---------- */
let bookmarks=store.get('pv-bookmarks',[]);
let recent=store.get('pv-recent',[]);

/* ---------- Transient UI state ---------- */
const state={catKey:'',shown:PAGE_SIZE+1,ep:'te',epDate:todayISO(),epPage:1,zoom:1,mandal:'',cons:''};

const sorted=()=>ARTS.slice().sort((a,b)=>b.date-a.date);
const isBm=id=>bookmarks.includes(id);

/* Language-specific view of one article */
function getA(a){
  const te=lang==='te', d=DIST[a.dist];
  const cn=catName(a.cat);
  const body=[te?a.te.s:a.en.s];
  if(te){
    body.push(`ఇది ${cn} విభాగం కోసం రూపొందించిన డెమో కథనం. ఈ వార్తలోని వ్యక్తులు, ప్రదేశాలు, కోట్స్ మరియు ఘటనలు అన్నీ కల్పితమైనవి; ఇవి డిజైన్ మరియు రీడింగ్ ఫీచర్ల ప్రదర్శన కోసం మాత్రమే ఉపయోగించబడ్డాయి.`);
    if(d) body.push(`${d.te} ప్రాంతం నుండి వచ్చిన ఈ అప్‌డేట్‌ను మా స్థానిక విలేకరి బృందం పర్యవేక్షిస్తోంది. అధికారిక ప్రకటనలు వచ్చిన తర్వాత మరిన్ని వివరాలు నవీకరించబడతాయి.`);
    body.push(`ప్రజా వార్తలు సంపాదకీయ బృందం ఈ అంశాన్ని నిశితంగా పరిశీలిస్తోంది. పాఠకులు తమ అభిప్రాయాలను వార్తాలేఖ లేదా సంప్రదింపు పేజీ ద్వారా పంచుకోవచ్చు.`);
  }else{
    body.push(`This is a fictional DEMO story prepared for the ${cn} desk of Praja Vaarthalu to demonstrate layout, typography and reading features. All names, quotes and events are invented.`);
    if(d) body.push(`Coverage from ${d.en} is being followed closely by our local reporting team. Details will be updated as official information becomes available to the newsroom.`);
    body.push(`The Praja Vaarthalu editorial desk will continue to monitor this topic and publish verified follow-up reports. Readers can share their views through the newsletter or the contact page.`);
  }
  return {
    id:a.id,cat:a.cat,catName:cn,
    title:te?a.te.t:a.en.t,desc:te?a.te.s:a.en.s,body,
    author:te?(AUTH[a.author]||a.author):a.author,rawAuthor:a.author,
    date:a.date,img:a.img,views:a.views,dist:a.dist,
    distName:d?(te?d.te:d.en):'',distState:d?d.st:''
  };
}

/* ---------- Reusable components ---------- */
function bmBtn(id){
  const on=isBm(id);
  return `<button class="bm${on?' on':''}" data-action="bm" data-id="${id}" aria-pressed="${on}" aria-label="${t('bookmark')}" title="${t('bookmark')}">${on?'&#9733;':'&#9734;'}</button>`;
}
function card(raw,o={}){
  const x=getA(raw);
  return `<article class="card">
    <a class="card-img" href="#/article/${x.id}" tabindex="-1" aria-hidden="true"><img loading="lazy" decoding="async" src="${x.img}" alt="${esc(x.title)}" width="960" height="600"></a>
    <div class="card-body">
      <div class="card-top"><span class="kicker">${esc(x.catName)}</span><span class="demo-tag">${t('demo')}</span></div>
      <h3 class="card-title"><a href="#/article/${x.id}">${esc(x.title)}</a></h3>
      ${o.desc?`<p class="card-desc">${esc(x.desc)}</p>`:''}
      <div class="meta"><span>${t('by')} ${esc(x.author)}</span><span>${fmtDate(x.date)}</span></div>
      <div class="card-foot"><a class="readmore" href="#/article/${x.id}">${t('readMore')} &rarr;</a>${bmBtn(x.id)}</div>
    </div>
  </article>`;
}
function miniRow(raw){
  const x=getA(raw);
  return `<a class="mini" href="#/article/${x.id}">
    <img loading="lazy" decoding="async" src="${x.img}" alt="" width="112" height="76">
    <div><span class="kicker">${esc(x.catName)}</span><h4>${esc(x.title)}</h4><small>${fmtDate(x.date)}</small></div></a>`;
}
function numRow(raw,n){
  const x=getA(raw);
  return `<a class="numrow" href="#/article/${x.id}"><span class="num">${n}</span><div><h4>${esc(x.title)}</h4><small>${x.views.toLocaleString(L())} ${t('views')}</small></div></a>`;
}
function headlineList(list){
  return `<ol class="headline-list">${list.map(raw=>{const x=getA(raw);return `<li><a href="#/article/${x.id}">${esc(x.title)}</a></li>`;}).join('')}</ol>`;
}
function box(title,inner){
  return `<section class="box"><h2 class="box-title">${title}</h2>${inner}</section>`;
}
function crumbs(items){
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((c,i)=>i<items.length-1?`<li><a href="${c[1]}">${esc(c[0])}</a></li>`:`<li aria-current="page">${esc(c[0])}</li>`).join('')}</ol></nav>`;
}
function emptyState(){
  return `<div class="empty"><h2>${t('noResults')}</h2><p class="muted"><a class="btn" href="#/home">${t('backHome')}</a></p></div>`;
}
function getList(k){
  const s=sorted();
  if(k==='breaking') return s.slice(0,12);
  if(k==='special') return s.filter(a=>['edit','agri','health'].includes(a.cat));
  if(k==='ent') return s.filter(a=>a.cat==='cinema');
  return s.filter(a=>a.cat===k);
}
function addRecent(id){
  recent=[id].concat(recent.filter(x=>x!==id)).slice(0,8);
  store.set('pv-recent',recent);
}

/* ---------- Homepage ---------- */
function renderHome(){
  const all=sorted();
  const lead=getA(all[0]);
  const trend=all.slice().sort((a,b)=>b.views-a.views).slice(0,5);
  const recentArts=recent.map(id=>ARTS.find(a=>a.id===id)).filter(Boolean).slice(0,3);
  const sections=['ap','telangana','politics','sports','national','international','business','tech','edu','cinema','edit'];
  const topics=TOPICS.map(([en,te])=>`<a class="chip" href="#/search?q=${encodeURIComponent(en)}">${lang==='te'?te:en}</a>`).join('');
  document.title=BRAND[lang]+' | '+t('home');
  return `<div class="container home-grid">
    <aside class="col-left" aria-label="Latest and trending">
      ${recentArts.length?box(t('recentlyViewed'),headlineList(recentArts)):''}
      ${box(t('latest'),all.slice(0,5).map(miniRow).join(''))}
      ${box(t('trending'),trend.slice(0,4).map((a,i)=>numRow(a,i+1)).join(''))}
      ${box(t('recent'),all.slice(5,9).map(miniRow).join(''))}
    </aside>
    <section class="col-center" id="centre" aria-label="Main news">
      <article class="lead">
        <a href="#/article/${lead.id}"><img src="${lead.img}" alt="${esc(lead.title)}" fetchpriority="high" width="960" height="600"></a>
        <div>
          <div class="card-top"><span class="kicker">${esc(lead.catName)}</span><span class="demo-tag">${t('demo')}</span></div>
          <h2><a href="#/article/${lead.id}">${esc(lead.title)}</a></h2>
          <p class="lead-desc">${esc(lead.desc)}</p>
          <div class="meta"><span>${t('by')} ${esc(lead.author)}</span><span>${fmtDate(lead.date)}</span></div>
          <div class="card-foot" style="justify-content:flex-start;gap:14px"><a class="btn btn-solid" href="#/article/${lead.id}">${t('readMore')}</a>${bmBtn(lead.id)}</div>
        </div>
      </article>
      <div class="sub-grid">${all.slice(1,5).map(a=>card(a)).join('')}</div>
      ${sections.map(catSection).join('')}
    </section>
    <aside class="col-right" aria-label="Headlines and advertisements">
      <div class="ad">${t('ads')} · 300×250</div>
      ${box(t('topHeadlines'),headlineList(all.slice(0,6)))}
      ${box(t('mostRead'),trend.map((a,i)=>numRow(a,i+1)).join(''))}
      ${box(t('trendingTopics'),`<div class="chips">${topics}</div>`)}
      <div class="ad">${t('ads')} · 300×600</div>
      <div class="epaper-teaser">
        <h3>${t('epaper')}</h3>
        <p>${t('epaperTxt')}</p>
        <a class="btn" href="#/epaper">${t('openEpaper')}</a>
      </div>
      <div class="side-panel">
        <h3 class="box-title" style="font-size:1.05rem">${t('subscribe')}</h3>
        <p>${t('newsletterTxt')}</p>
        <form data-form="newsletter" novalidate class="form-row">
          <input class="input" type="email" name="email" aria-label="Email" placeholder="${lang==='te'?t('demoPlaceholder'):'you@example.com'}">
          <button class="btn btn-solid" type="submit">${t('subscribe')}</button>
        </form>
      </div>
    </aside>
  </div>`;
}

/* One category block on the homepage */
function catSection(k){
  const list=ARTS.filter(a=>a.cat===k).sort((a,b)=>b.date-a.date);
  if(!list.length) return '';
  return `<section class="cat-section" aria-labelledby="h-${k}">
    <div class="sec-head"><h2 id="h-${k}">${navLabel(k)}</h2><a class="btn" href="#/cat/${k}">${t('viewAll')}</a></div>
    <div class="cat-body">
      ${card(list[0],{desc:true})}
      <div class="cat-list">${list.slice(1,4).map(miniRow).join('')}</div>
    </div>
  </section>`;
}

/* ---------- Category page ---------- */
function renderCategory(k){
  state.catKey=k; state.shown=PAGE_SIZE+1;
  const list=getList(k);
  const kids=(navItem(k)||{}).kids||[];
  const kidsHtml=kids.length?`<div class="kids">${kids.map(c=>`<a class="chip" href="${c[2]||'#/cat/'+k}">${lang==='te'?c[1]:c[0]}</a>`).join('')}</div>`:'';
  const body=list.length?`
    <div class="cat-feature">${card(list[0],{desc:true})}</div>
    <div class="card-grid" id="catGrid">${list.slice(1,state.shown).map(a=>card(a)).join('')}</div>
    <div class="load-wrap" id="loadWrap">${list.length>state.shown?`<button class="btn btn-solid" data-action="load-more">${t('loadMore')}</button>`:''}</div>`:emptyState();
  document.title=navLabel(k)+' | '+BRAND[lang];
  return `<div class="container page-pad">
    ${crumbs([[t('home'),'#/home'],[navLabel(k)]])}
    <div class="sec-head"><h1>${navLabel(k)}</h1><span class="muted">${list.length} ${t('stories')}</span></div>
    ${kidsHtml}
    ${body}
  </div>`;
}

/* ---------- District news (Andhra Pradesh + Telangana) ---------- */
function renderDistrict(st,dk){
  const stateKey=st==='tg'?'tg':'ap';
  const stCat=stateKey==='tg'?'telangana':'ap';
  const keys=Object.keys(DIST).filter(k=>DIST[k].st===stateKey);
  const d=keys.includes(dk)?dk:keys[0];
  let arts=sorted().filter(a=>a.dist===d);
  let note='';
  if(!arts.length){arts=sorted().filter(a=>a.cat===stCat);note=`<p class="muted">${t('stateNews')} (DEMO)</p>`;}
  const beforeFilter=arts;
  if(state.mandal) arts=arts.filter((a,i)=>i%3===(+state.mandal-1));
  if(state.cons) arts=arts.filter((a,i)=>i%2===(+state.cons-1));
  if(!arts.length) arts=beforeFilter;
  const rep=getA(arts[0]);
  const dn=lang==='te'?DIST[d].te:DIST[d].en;
  const stName=stateKey==='tg'?(lang==='te'?'తెలంగాణ':'Telangana'):(lang==='te'?'ఆంధ్రప్రదేశ్':'Andhra Pradesh');
  const mandals=lang==='te'?['కేంద్ర మండలం','ఉత్తర మండలం','దక్షిణ మండలం']:['Central Mandal','North Mandal','South Mandal'];
  const cons=lang==='te'?['నియోజకవర్గం A','నియోజకవర్గం B']:['Constituency A','Constituency B'];
  document.title=dn+' | '+BRAND[lang];
  return `<div class="container page-pad">
    ${crumbs([[t('home'),'#/home'],[stName,'#/district/'+stateKey],[dn]])}
    <div class="tabs">
      <a href="#/district/ap" class="${stateKey==='ap'?'on':''}">${lang==='te'?'ఆంధ్రప్రదేశ్':'Andhra Pradesh'}</a>
      <a href="#/district/tg" class="${stateKey==='tg'?'on':''}">${lang==='te'?'తెలంగాణ':'Telangana'}</a>
    </div>
    <div class="sec-head"><h1>${stName} · ${t('district')}: ${dn}</h1></div>
    <div class="filters">
      <label>${t('district')}
        <select data-change="district-nav" data-st="${stateKey}">
          ${keys.map(k=>`<option value="${k}" ${k===d?'selected':''}>${lang==='te'?DIST[k].te:DIST[k].en}</option>`).join('')}
        </select></label>
      <label>${t('mandal')} (DEMO)
        <select data-change="district-filter" data-f="mandal">
          <option value="">${t('all')}</option>${mandals.map((m,i)=>`<option value="${i+1}" ${state.mandal==String(i+1)?'selected':''}>${m}</option>`).join('')}
        </select></label>
      <label>${t('constituency')} (DEMO)
        <select data-change="district-filter" data-f="cons">
          <option value="">${t('all')}</option>${cons.map((m,i)=>`<option value="${i+1}" ${state.cons==String(i+1)?'selected':''}>${m}</option>`).join('')}
        </select></label>
    </div>
    <div class="reporter">
      <div class="reporter-avatar">${esc(rep.author.charAt(0))}</div>
      <div><strong>${t('reporter')}:</strong> ${esc(rep.author)}<br><small class="muted">${dn} · ${t('demoContact')}</small></div>
    </div>
    ${note}
    <h2 class="box-title" style="margin-bottom:14px">${t('latestDistrict')}</h2>
    ${arts.length?`<div class="card-grid">${arts.slice(0,9).map(a=>card(a)).join('')}</div>`:emptyState()}
  </div>`;
}

/* ---------- Article page (article.html?id=N) ---------- */
function renderArticle(id){
  const raw=ARTS.find(a=>a.id===id);
  if(!raw) return renderNotFound();
  const x=getA(raw);
  addRecent(id);
  const related=sorted().filter(a=>a.cat===raw.cat&&a.id!==id).slice(0,3);
  const trending=sorted().slice().sort((a,b)=>b.views-a.views).filter(a=>a.id!==id).slice(0,5);
  const recentArts=recent.filter(r=>r!==id).map(r=>ARTS.find(a=>a.id===r)).filter(Boolean).slice(0,4);
  const url=location.href.split('#')[0].split('?')[0]+'?id='+id;
  const u=encodeURIComponent(url), tx=encodeURIComponent(x.title);
  const words=x.body.join(' ').split(/\s+/).length;
  const mins=Math.max(1,Math.round(words/190));
  document.title=x.title+' | '+BRAND[lang];
  return `<div class="container article-page">
    ${crumbs([[t('home'),'index.html'],[x.catName,'index.html#/cat/'+x.cat],[x.title.length>48?x.title.slice(0,46)+'…':x.title]])}
    <div class="article-layout">
      <article class="article-main" aria-labelledby="art-title">
        <div class="a-kicker"><span class="kicker">${esc(x.catName)}</span>${x.distName?`<span class="chip" style="padding:2px 8px">${esc(x.distName)}</span>`:''}<span class="demo-tag">${t('demo')}</span></div>
        <h1 class="a-title" id="art-title">${esc(x.title)}</h1>
        <p class="a-dek">${esc(x.desc)}</p>
        <div class="a-byline">
          <div class="who"><span class="a-avatar">${esc(x.author.charAt(0))}</span><div><strong>${t('by')} ${esc(x.author)}</strong><div class="muted" style="font-size:.82rem">${fmtTime(x.date)} · ${mins} ${t('minRead')}</div></div></div>
          <div class="lang-toggle" role="group" aria-label="Article language">
            <button data-lang="te" class="${lang==='te'?'on':''}">తెలుగు</button>
            <button data-lang="en" class="${lang==='en'?'on':''}">English</button>
          </div>
        </div>
        <figure class="a-figure"><img src="${x.img}" alt="${esc(x.title)}" width="960" height="600" fetchpriority="high"><figcaption>${t('repImage')}</figcaption></figure>
        <div class="a-body">${x.body.map(p=>`<p>${esc(p)}</p>`).join('')}</div>
        <div class="demo-note"><strong>${t('readerNote')}:</strong> ${t('demoNotice')}</div>
        <div class="share" aria-label="${t('share')}">
          <span>${t('share')}:</span>
          <a class="wa" href="https://wa.me/?text=${tx}%20${u}" target="_blank" rel="noopener">WhatsApp</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">Facebook</a>
          <a href="https://twitter.com/intent/tweet?text=${tx}&url=${u}" target="_blank" rel="noopener">X</a>
          <a href="mailto:?subject=${tx}&body=${u}">Email</a>
          <button data-action="copy" data-url="${esc(url)}">${t('copyLink')}</button>
          <button data-action="bm" data-id="${id}" class="${isBm(id)?'on':''}">${isBm(id)?'&#9733; ':'&#9734; '}${t('bookmark')}</button>
        </div>
        <h2 class="related-title">${t('related')}</h2>
        <div class="card-grid">${related.map(a=>card(a)).join('')}</div>
      </article>
      <aside class="article-side" aria-label="Related and trending">
        <div>${box(t('trendingArt'),trending.map((a,i)=>numRow(a,i+1)).join(''))}</div>
        <div>
          ${recentArts.length?box(t('recentlyViewed'),headlineList(recentArts)):''}
          <div class="ad">${t('ads')} · 300×250</div>
        </div>
      </aside>
    </div>
  </div>`;
}

/* ---------- Gallery, videos, bookmarks ---------- */
function renderGallery(){
  const items=sorted().slice(0,12);
  document.title=t('galleryTitle')+' | '+BRAND[lang];
  return `<div class="container page-pad">
    ${crumbs([[t('home'),'#/home'],[t('galleryTitle')]])}
    <div class="sec-head"><h1>${t('galleryTitle')}</h1></div>
    <div class="gal-grid">${items.map(a=>{const x=getA(a);return `<figure data-action="zoom-img" data-src="${x.img}" data-cap="${esc(x.title)}" role="button" tabindex="0"><img loading="lazy" decoding="async" src="${x.img}" alt="${esc(x.title)}"><figcaption>${esc(x.title)}</figcaption></figure>`;}).join('')}</div>
  </div>`;
}
function renderVideos(){
  const items=sorted().slice(10,16);
  const durs=['02:14','04:38','01:52','06:05','03:21','05:47'];
  document.title=t('videosTitle')+' | '+BRAND[lang];
  return `<div class="container page-pad">
    ${crumbs([[t('home'),'#/home'],[t('videosTitle')]])}
    <div class="sec-head"><h1>${t('videosTitle')}</h1></div>
    <div class="card-grid">${items.map((a,i)=>{const x=getA(a);return `<article class="card"><div class="card-img vid-card" data-action="video" data-title="${esc(x.title)}" role="button" tabindex="0"><img loading="lazy" src="${x.img}" alt="${esc(x.title)}"><span class="play" aria-hidden="true">&#9654;</span><span class="dur">${durs[i%durs.length]}</span></div><div class="card-body"><span class="kicker">${esc(x.catName)}</span><h3 class="card-title">${esc(x.title)}</h3><div class="meta"><span>${fmtDate(x.date)}</span></div></div></article>`;}).join('')}</div>
  </div>`;
}
function renderBookmarks(){
  const arts=bookmarks.map(id=>ARTS.find(a=>a.id===id)).filter(Boolean);
  document.title=t('bookmarksTitle')+' | '+BRAND[lang];
  return `<div class="container page-pad">
    ${crumbs([[t('home'),'#/home'],[t('bookmarksTitle')]])}
    <div class="sec-head"><h1>${t('bookmarksTitle')}</h1></div>
    ${arts.length?`<div class="card-grid">${arts.map(a=>card(a)).join('')}</div>`:`<div class="empty"><p class="muted">${t('bmEmpty')}</p><a class="btn" href="#/home">${t('backHome')}</a></div>`}
  </div>`;
}

/* ---------- About, contact, not found ---------- */
function renderAbout(){
  document.title=t('aboutTitle')+' | '+BRAND[lang];
  const team=lang==='te'
   ?[['సంపాదకుడు (డెమో)','రవి కుమార్'],['రాజకీయ విభాగం అధిపతి (డెమో)','లక్ష్మి ప్రసాద్'],['క్రీడా ఎడిటర్ (డెమో)','అనిల్ రెడ్డి'],['టెక్/బిజినెస్ ఎడిటర్ (డెమో)','మేఘన అయ్యర్']]
   :[['Editor-in-Chief (Demo)','Ravi Kumar'],['Political Desk Head (Demo)','Lakshmi Prasad'],['Sports Editor (Demo)','Anil Reddy'],['Tech & Business Editor (Demo)','Meghana Iyer']];
  return `<div class="container page-pad prose" style="max-width:900px">
    ${crumbs([[t('home'),'index.html'],[t('aboutTitle')]])}
    <h1>${t('aboutTitle')}</h1>
    <p>${t('aboutText')}</p>
    <h2>${t('valuesTitle')}</h2>
    <p>${t('valuesText')}</p>
    <h2>${t('edTeam')}</h2>
    <div class="team">${team.map(([r,n])=>`<div><strong>${n}</strong><br><small>${r}</small></div>`).join('')}</div>
    <div class="demo-note">${t('demoNotice')}</div>
  </div>`;
}
function renderContact(){
  document.title=t('contactTitle')+' | '+BRAND[lang];
  return `<div class="container page-pad" style="max-width:900px">
    ${crumbs([[t('home'),'index.html'],[t('contactTitle')]])}
    <div class="sec-head"><h1>${t('contactTitle')}</h1></div>
    <p class="muted">${t('contactInfo')}</p>
    <form data-form="contact" novalidate class="form-grid" style="margin-top:18px">
      <label>${t('name')}<input class="input" name="name" required></label>
      <label>${t('email')}<input class="input" type="email" name="email" required></label>
      <label class="full">${t('subject')}<input class="input" name="subject" required></label>
      <label class="full">${t('message')}<textarea name="message" required></textarea></label>
      <div class="full"><button class="btn btn-solid" type="submit">${t('send')}</button></div>
    </form>
  </div>`;
}
function renderNotFound(){
  document.title=t('notFound')+' | '+BRAND[lang];
  return `<div class="container not-found"><h1>404</h1><p class="muted">${t('notFound')}</p><a class="btn btn-solid" href="#/home">${t('backHome')}</a></div>`;
}

/* ---------- Bookmarks + profile ---------- */
function toggleBm(id){
  id=+id;
  if(isBm(id)) bookmarks=bookmarks.filter(x=>x!==id); else bookmarks.push(id);
  store.set('pv-bookmarks',bookmarks);
  const on=isBm(id);
  $$('[data-action="bm"][data-id="'+id+'"]').forEach(b=>{
    b.classList.toggle('on',on);
    b.setAttribute('aria-pressed',on);
    if(b.closest('.share')) b.innerHTML=(on?'&#9733; ':'&#9734; ')+t('bookmark');
    else b.innerHTML=on?'&#9733;':'&#9734;';
  });
  toast(on?t('bookmarkedMsg'):t('bookmarkRemoved'));
}
function openProfile(){
  const recs=recent.map(id=>ARTS.find(a=>a.id===id)).filter(Boolean).slice(0,5);
  openModal(`<h3>${t('profile')}</h3>
    <p class="muted">${t('accountNote')}</p>
    <p><button class="btn btn-solid" data-action="demo-signin">${t('signIn')}</button></p>
    <a class="mrow" href="#/bookmarks" data-close="1">&#9733; ${t('bookmarksTitle')} (${bookmarks.length})</a>
    <h4 style="margin:16px 0 6px">${t('recentlyViewed')}</h4>
    ${recs.length?recs.map(a=>{const x=getA(a);return `<a class="mrow" href="#/article/${x.id}" data-close="1">${esc(x.title)}</a>`;}).join(''):`<p class="muted">${t('signedOut')}</p>`}`);
}

/* ---------- Router: one function renders whichever page is open ---------- */
let routeTimer=null;
function renderRoute(){
  const page=document.body.dataset.page||'home';
  const main=$('#main');
  main.innerHTML='<div class="loader" aria-label="Loading"><span></span><span></span><span></span></div>';
  clearTimeout(routeTimer);
  routeTimer=setTimeout(()=>{
    let html;
    try{
      if(page==='article'){
        const id=parseInt(new URLSearchParams(location.search).get('id'),10);
        html=renderArticle(id);
      }else if(page==='epaper') html=renderEpaper();
      else if(page==='about') html=renderAbout();
      else if(page==='contact') html=renderContact();
      else html=renderHomeRoute();
      main.innerHTML=html;
      fixLinks(main);
    }catch(err){
      console.error('Render error:',err);
      main.innerHTML=`<div class="container empty"><h2>${t('notFound')}</h2><p class="muted">${esc(err.message)}</p><a class="btn" href="#/home">${t('backHome')}</a></div>`;
      fixLinks(main);
    }
    updateActiveNav();
    updateProgress();
    window.scrollTo({top:0,behavior:'auto'});
    $('#mainNav').classList.remove('open');
    $('.hamburger').setAttribute('aria-expanded','false');
  },140);
}
/* Home page sections are selected by the URL hash */
function renderHomeRoute(){
  const raw=(location.hash.replace(/^#\/?/,'')||'home');
  const [path,qs='']=raw.split('?');
  const p=path.split('/').map(s=>{try{return decodeURIComponent(s);}catch(e){return s;}});
  const params=new URLSearchParams(qs);
  switch(p[0]){
    case '': case 'home': return renderHome();
    case 'cat': return renderCategory(p[1]||'breaking');
    case 'district': return renderDistrict(p[1],p[2]);
    case 'search': return renderSearch(params.get('q')||'',params.get('cat')||'',params.get('dist')||'');
    case 'gallery': return renderGallery();
    case 'videos': return renderVideos();
    case 'bookmarks': return renderBookmarks();
    case 'article': case 'epaper': case 'about': case 'contact':
      location.replace(resolveHref('#/'+p[0]+(p[1]?'/'+p[1]:'')));
      return '';
    default: return renderNotFound();
  }
}
function reRender(){ renderRoute(); }
function updateProgress(){
  if(!$('.article-page')) $('#progress').style.width='0';
}

/* ---------- Event handling (delegated) ---------- */
function bindEvents(){
  document.addEventListener('click',e=>{
    /* mobile accordion for menus with sub-items */
    const nl=e.target.closest('#navList>li.has-mega>.nl');
    if(nl && window.matchMedia('(max-width:900px)').matches){
      e.preventDefault();
      nl.parentElement.classList.toggle('open');
      return;
    }
    if(e.target.closest('[data-close]')) closeModal();

    /* language buttons on the article page */
    const langBtn=e.target.closest('[data-lang]');
    if(langBtn && !langBtn.closest('#langSelect')){ setLang(langBtn.dataset.lang); return; }

    const el=e.target.closest('[data-action]');
    if(!el) return;
    switch(el.dataset.action){
      case 'theme': toggleTheme(); break;
      case 'font-up': fontScale+=0.1; applyFont(); break;
      case 'font-down': fontScale-=0.1; applyFont(); break;
      case 'font-reset': fontScale=1; applyFont(); break;
      case 'menu': { const o=$('#mainNav').classList.toggle('open'); el.setAttribute('aria-expanded',o); break; }
      case 'menu-open': $('#mainNav').classList.add('open'); $('.hamburger').setAttribute('aria-expanded','true'); window.scrollTo({top:0,behavior:'smooth'}); break;
      case 'search-open': openSearch(); break;
      case 'profile': openProfile(); break;
      case 'close-modal': closeModal(); break;
      case 'demo-signin': toast(t('sign')); closeModal(); break;
      case 'bm': toggleBm(el.dataset.id); break;
      case 'copy': {
        const url=el.dataset.url;
        if(navigator.clipboard&&navigator.clipboard.writeText){
          navigator.clipboard.writeText(url).then(()=>toast(t('linkCopied'))).catch(()=>prompt('Copy link:',url));
        }else prompt('Copy link:',url);
        break;
      }
      case 'load-more': {
        const list=getList(state.catKey);
        const next=list.slice(state.shown,state.shown+PAGE_SIZE);
        const grid=$('#catGrid');
        if(grid){ grid.insertAdjacentHTML('beforeend',next.map(a=>card(a)).join('')); fixLinks(grid); }
        state.shown+=next.length;
        const wrap=$('#loadWrap');
        if(wrap) wrap.innerHTML=list.length>state.shown?`<button class="btn btn-solid" data-action="load-more">${t('loadMore')}</button>`:'';
        break;
      }
      case 'tk-prev': tkStep(-1); break;
      case 'tk-next': tkStep(1); break;
      case 'tk-pause': TK.paused=!TK.paused; $('#tkPause').innerHTML=TK.paused?'&#9654;':'&#10074;&#10074;'; break;
      case 'top': window.scrollTo({top:0,behavior:'smooth'}); break;
      case 'ep-ed': state.ep=el.dataset.id; state.epPage=1; refreshEpaper(); break;
      case 'ep-date': state.epDate=el.dataset.date; state.epPage=1; refreshEpaper(); break;
      case 'ep-prev': state.epPage=state.epPage>1?state.epPage-1:PAGES; refreshEpaper(); break;
      case 'ep-next': state.epPage=state.epPage<PAGES?state.epPage+1:1; refreshEpaper(); break;
      case 'ep-zin': setZoom(state.zoom+0.1); break;
      case 'ep-zout': setZoom(state.zoom-0.1); break;
      case 'ep-zreset': setZoom(1); break;
      case 'ep-full': toggleFullscreen(); break;
      case 'ep-print': window.print(); break;
      case 'ep-pdf': downloadPdf(); break;
      case 'zoom-img': openModal(`<img src="${el.dataset.src}" alt="${esc(el.dataset.cap)}" style="width:100%;aspect-ratio:16/10;object-fit:cover"><p style="margin-top:10px;font-weight:600">${esc(el.dataset.cap)}</p>`); break;
      case 'video': openModal(`<div class="video-ph"><div><div style="font-size:2.4rem">&#9654;</div><p>${t('watchDemo')}</p><p style="font-weight:700">${esc(el.dataset.title)}</p></div></div>`); break;
    }
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') closeModal();
    if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-action="video"],[data-action="zoom-img"]')){
      e.preventDefault(); e.target.click();
    }
  });

  document.addEventListener('submit',e=>{
    const f=e.target.closest('form[data-form]');
    if(!f) return;
    e.preventDefault();
    const kind=f.dataset.form;
    if(kind==='search'||kind==='search-modal'){
      const p=new URLSearchParams({q:f.q.value.trim()});
      if(f.cat&&f.cat.value) p.set('cat',f.cat.value);
      if(f.dist&&f.dist.value) p.set('dist',f.dist.value);
      closeModal();
      const h='#/search?'+p.toString();
      if(document.body.dataset.page==='home'&&location.hash===h) renderRoute();
      else go(h);
    }else if(kind==='newsletter'){
      const email=f.email.value.trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ toast(t('badEmail')); return; }
      f.reset(); toast(t('subDone'));
    }else if(kind==='contact'){
      if(!f.checkValidity()){ f.reportValidity(); return; }
      f.reset(); toast(t('sent'));
    }
  });

  document.addEventListener('change',e=>{
    const c=e.target.dataset.change;
    if(!c) return;
    if(c==='district-nav') go('#/district/'+e.target.dataset.st+'/'+e.target.value);
    else if(c==='district-filter'){ state[e.target.dataset.f]=e.target.value; renderRoute(); }
    else if(c==='ep-date'){ if(e.target.value){ state.epDate=e.target.value; state.epPage=1; refreshEpaper(); } }
  });

  $('#langSelect').addEventListener('change',e=>setLang(e.target.value));
  $('#tkView').addEventListener('mouseenter',()=>{TK.paused=true;});
  $('#tkView').addEventListener('mouseleave',()=>{TK.paused=false;});
  $('#modal').addEventListener('click',e=>{ if(e.target.id==='modal') closeModal(); });
  window.addEventListener('hashchange',()=>{
    if((document.body.dataset.page||'home')==='home'){ updateActiveNav(); renderRoute(); }
  });
  window.addEventListener('resize',tkMeasure);
  window.addEventListener('scroll',()=>{
    $('#toTop').classList.toggle('show',window.scrollY>500);
    if($('.article-page')){
      const h=document.documentElement.scrollHeight-window.innerHeight;
      $('#progress').style.width=(h>0?Math.min(100,window.scrollY/h*100):0)+'%';
    }else $('#progress').style.width='0';
  },{passive:true});
}

/* ---------- Start-up ---------- */
function init(){
  document.documentElement.dataset.theme=theme;
  document.documentElement.style.setProperty('--fs',fontScale);
  document.documentElement.lang=lang;
  renderShell();
  if((document.body.dataset.page||'home')==='home' && !location.hash){
    history.replaceState(null,'',location.pathname+location.search+'#/home');
  }
  applyStatic();
  buildNav();
  buildFooterCats();
  buildTicker();
  bindEvents();
  requestAnimationFrame(tkLoop);
  renderRoute();
}
init();
