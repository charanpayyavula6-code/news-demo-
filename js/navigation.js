/* =========================================================
   PRAJA VAARTHALU - Navigation, shared layout, ticker, modal, toast
   Multi-page links: index.html (home + hash sections), article.html,
   epaper.html, about.html, contact.html
   ========================================================= */

/* ---------- Lookups ---------- */
const navItem=id=>NAV.find(n=>n.id===id);
const navLabel=id=>{
  const n=navItem(id); if(n) return lang==='te'?n.te:n.en;
  const c=CATS[id]; return c?(lang==='te'?c[1]:c[0]):id;
};
const catName=id=>{const c=CATS[id];return c?(lang==='te'?c[1]:c[0]):'';};

/* ---------- Link resolution (works from any page) ---------- */
function resolveHref(h){
  const page=document.body.dataset.page||'home';
  const art=h.match(/^#\/article\/(\d+)/);
  if(art) return 'article.html?id='+art[1];
  if(h.indexOf('#/epaper')===0) return 'epaper.html';
  if(h.indexOf('#/about')===0) return 'about.html';
  if(h.indexOf('#/contact')===0) return 'contact.html';
  if(page==='home') return h;
  return 'index.html'+h;
}
/* Rewrite every hash-route link inside a container */
function fixLinks(root){
  (root||document).querySelectorAll('a[href^="#/"]').forEach(a=>{
    a.setAttribute('href',resolveHref(a.getAttribute('href')));
  });
}
/* Navigate to a route such as '#/cat/ap' from any page */
function go(h){
  const target=resolveHref(h);
  if(target.charAt(0)==='#') location.hash=target;
  else location.href=target;
}
/* Which top-level route is active (used for highlighting) */
function currentRoute(){
  const p=document.body.dataset.page||'home';
  if(p==='epaper') return '#/epaper';
  if(p==='about') return '#/about';
  if(p==='contact') return '#/contact';
  if(p==='article') return '';
  return (location.hash.split('?')[0])||'#/home';
}

/* ---------- Shared shell: header, footer, bottom nav, overlays ---------- */
const HEADER_HTML=`
<a href="#main" class="sr-only">Skip to content</a>
<div class="demo-bar"><div class="container" data-i18n="demoNotice"></div></div>
<header>
  <div class="topbar">
    <div class="container">
      <div class="group">
        <span id="todayText"></span>
        <span id="weatherText"></span>
      </div>
      <div class="group">
        <span class="social" aria-label="Social media">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="X">X</a>
          <a href="#" aria-label="YouTube">&#9654;</a>
          <a href="#" aria-label="Instagram">ig</a>
        </span>
        <a href="#/contact" data-i18n="contactUs"></a>
        <a href="#/about" data-i18n="aboutUs"></a>
        <button class="ghost" data-action="theme" id="themeBtn"></button>
        <button class="ghost" data-action="font-down" aria-label="Decrease text size">A-</button>
        <button class="ghost" data-action="font-reset" aria-label="Reset text size">A</button>
        <button class="ghost" data-action="font-up" aria-label="Increase text size">A+</button>
      </div>
    </div>
  </div>

  <div class="masthead">
    <div class="container">
      <a href="#/home" class="logo" aria-label="VAARTHALU home">
        <img src="assets/logos/logo.svg" width="62" height="62" alt="" aria-hidden="true">
      </a>
      <div class="mast-center">
        <div class="mast-te">వార్తలు</div>
        <div class="mast-en">VAARTHALU</div>
        <div class="mast-tag" data-i18n="tagline"></div>
      </div>
      <div class="mast-actions">
        <button class="icon-btn" data-action="search-open" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        </button>
        <button class="icon-btn" data-action="profile" aria-label="User profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>
        </button>
        <select id="langSelect" class="lang-select" aria-label="Language">
          <option value="te">తెలుగు</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  </div>

  <nav class="mainnav" id="mainNav" aria-label="Main navigation">
    <div class="container nav-row">
      <button class="hamburger" data-action="menu" aria-label="Open menu" aria-expanded="false">&#9776;</button>
      <ul id="navList"></ul>
    </div>
  </nav>

  <div class="ticker" aria-label="Breaking news ticker">
    <div class="container">
      <span class="tk-label" data-i18n="breaking"></span>
      <div class="tk-view" id="tkView"><div class="tk-track" id="tkTrack"></div></div>
      <div class="tk-ctrl">
        <button data-action="tk-prev" aria-label="Previous headline">&#8249;</button>
        <button data-action="tk-pause" id="tkPause" aria-label="Pause ticker">&#10074;&#10074;</button>
        <button data-action="tk-next" aria-label="Next headline">&#8250;</button>
      </div>
    </div>
  </div>
</header>`;

const FOOTER_HTML=`
<div class="container">
  <div class="foot-grid">
    <div>
      <div class="foot-logo">
        <img src="assets/logos/logo.svg" width="46" height="46" alt="" aria-hidden="true">
        <div><b>వార్తలు</b><div style="font-family:'Playfair Display',serif;letter-spacing:.25em;font-size:.72rem;color:#fff">VAARTHALU</div></div>
      </div>
      <p data-i18n="footAbout"></p>
      <div class="foot-news">
        <strong style="color:#fff" data-i18n="subscribe"></strong>
        <form data-form="newsletter" novalidate class="form-row" style="margin-top:0">
          <input class="input" type="email" name="email" aria-label="Email" data-i18n-ph="emailPh">
          <button class="btn btn-solid" type="submit" data-i18n="subscribe"></button>
        </form>
      </div>
    </div>
    <div>
      <h4 data-i18n="categories"></h4>
      <ul id="footCats"></ul>
    </div>
    <div>
      <h4 data-i18n="company"></h4>
      <ul>
        <li><a href="#/about" data-i18n="aboutUs"></a></li>
        <li><a href="#/contact" data-i18n="contactUs"></a></li>
        <li><a href="#/about" data-i18n="editorial"></a></li>
        <li><a href="#/contact" data-i18n="advertise"></a></li>
        <li><a href="#/epaper" data-i18n="epaper"></a></li>
      </ul>
    </div>
    <div>
      <h4 data-i18n="legal"></h4>
      <ul>
        <li><a href="#/about" data-i18n="privacy"></a></li>
        <li><a href="#/about" data-i18n="terms"></a></li>
        <li><a href="#/about" data-i18n="disclaimer"></a></li>
      </ul>
      <h4 style="margin-top:20px" data-i18n="followUs"></h4>
      <ul><li><a href="#">Facebook</a></li><li><a href="#">X / Twitter</a></li><li><a href="#">YouTube</a></li><li><a href="#">Instagram</a></li></ul>
    </div>
  </div>
  <div class="foot-bottom">
    <span id="copyText"></span>
    <span><a href="#/about" data-i18n="privacy"></a><a href="#/about" data-i18n="disclaimer"></a></span>
  </div>
</div>`;

const EXTRAS_HTML=`
<nav class="bottom-nav" aria-label="Mobile navigation">
  <a class="bn-item" href="#/home" data-bn="home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z"/></svg><span data-i18n="home"></span></a>
  <button class="bn-item" data-action="search-open"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><span data-i18n="search"></span></button>
  <a class="bn-item" href="#/bookmarks" data-bn="bookmarks"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg><span data-i18n="bookmarks"></span></a>
  <a class="bn-item" href="#/epaper" data-bn="epaper"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16"/><path d="M7 8h10M7 12h10M7 16h6"/></svg><span data-i18n="epaper"></span></a>
  <button class="bn-item" data-action="menu-open"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg><span data-i18n="menu"></span></button>
</nav>
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-hidden="true">
  <div class="modal-box">
    <button class="modal-close" data-action="close-modal" aria-label="Close">&times;</button>
    <div id="modalBody"></div>
  </div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<div class="progress" id="progress"></div>
<button class="to-top" id="toTop" data-action="top" aria-label="Back to top">&#8593;</button>`;

/* Build header, footer and overlays into the page */
function renderShell(){
  $('#site-header').innerHTML=HEADER_HTML;
  $('#site-footer').innerHTML=FOOTER_HTML;
  document.body.insertAdjacentHTML('beforeend',EXTRAS_HTML);
}

/* ---------- Main menu (desktop mega menus + mobile accordion) ---------- */
function buildNav(){
  $('#navList').innerHTML=NAV.map((n,i)=>{
    const r=n.r||('#/cat/'+n.id);
    const label=lang==='te'?n.te:n.en;
    const kids=n.kids?`<div class="mega${i>=9?' mega-r':''}" role="menu"><div class="mega-head">${label}</div>${n.kids.map(k=>{const kr=k[2]||r;return `<a href="${kr}" data-r="${kr}">${lang==='te'?k[1]:k[0]}</a>`;}).join('')}</div>`:'';
    return `<li class="${n.kids?'has-mega':''}"><a class="nl" data-r="${r}" href="${r}">${label}${n.kids?' <span class="caret">&#9662;</span>':''}</a>${kids}</li>`;
  }).join('');
  fixLinks($('#navList'));
  updateActiveNav();
}
function updateActiveNav(){
  const h=currentRoute();
  $$('#navList>li').forEach(li=>{
    const a=li.querySelector('.nl');
    let on=a.dataset.r===h;
    if(!on&&li.classList.contains('has-mega')) on=$$('.mega a',li).some(x=>x.dataset.r===h);
    a.classList.toggle('active',on);
    if(!on) li.classList.remove('open');
  });
  $$('[data-bn]').forEach(b=>{
    const k=b.dataset.bn;
    b.classList.toggle('on',(k==='home'&&h==='#/home')||(k==='bookmarks'&&h==='#/bookmarks')||(k==='epaper'&&h==='#/epaper'));
  });
}
function buildFooterCats(){
  $('#footCats').innerHTML=['breaking','ap','telangana','politics','sports','national','international','business','tech','edu','cinema','health','agri','edit'].map(id=>{
    const n=navItem(id);const r=(n&&n.r)||('#/cat/'+id);
    return `<li><a href="${r}">${navLabel(id)}</a></li>`;
  }).join('');
  fixLinks($('#footCats'));
}

/* ---------- Breaking news ticker ---------- */
const TK={x:0,target:null,idx:0,paused:false,offsets:[],w:0,n:0};
function buildTicker(){
  const items=sorted().slice(0,12);
  const html=items.map(a=>{const x=getA(a);return `<a class="tk-item" href="#/article/${x.id}">${esc(x.title)}</a>`;}).join('');
  $('#tkTrack').innerHTML=html+html;
  fixLinks($('#tkTrack'));
  TK.n=items.length; TK.idx=0; TK.x=0; TK.target=null;
  requestAnimationFrame(tkMeasure);
}
function tkMeasure(){
  const track=$('#tkTrack'); if(!track) return;
  const kids=$$('.tk-item',track).slice(0,TK.n);
  TK.offsets=kids.map(k=>k.offsetLeft);
  TK.w=track.scrollWidth/2;
}
function tkStep(d){
  const n=TK.offsets.length; if(!n||!TK.w) return;
  TK.idx=(TK.idx+d+n)%n;
  let tg=-TK.offsets[TK.idx];
  if(tg-TK.x>TK.w/2) tg-=TK.w;
  if(TK.x-tg>TK.w/2) tg+=TK.w;
  TK.target=tg;
}
function tkLoop(){
  const track=$('#tkTrack');
  if(track){
    if(TK.target!==null){
      TK.x+=(TK.target-TK.x)*0.12;
      if(Math.abs(TK.target-TK.x)<0.5){TK.x=TK.target;TK.target=null;}
    }else if(!TK.paused){ TK.x-=0.8; }
    if(TK.w){
      if(-TK.x>=TK.w) TK.x+=TK.w;
      if(TK.x>0) TK.x-=TK.w;
    }
    track.style.transform='translate3d('+TK.x+'px,0,0)';
  }
  requestAnimationFrame(tkLoop);
}

/* ---------- Toast + modal ---------- */
let toastTimer=null;
function toast(msg){
  const el=$('#toast');
  el.textContent=msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}
function openModal(html){
  $('#modalBody').innerHTML=html;
  fixLinks($('#modalBody'));
  $('#modal').classList.add('open');
  $('#modal').setAttribute('aria-hidden','false');
}
function closeModal(){
  $('#modal').classList.remove('open');
  $('#modal').setAttribute('aria-hidden','true');
}
