/* =========================================================
   PRAJA VAARTHALU - Language, theme, font size and shared helpers
   ========================================================= */

/* ---------- DOM + storage helpers ---------- */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const store={
  get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){console.warn('Storage unavailable',e);}}
};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Fallback image when a remote picture fails (responsive image handling) */
const FALLBACK_IMG="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='%23e2e2e8'/><text x='50%' y='50%' text-anchor='middle' fill='%2362626b' font-family='sans-serif' font-size='26'>Image unavailable</text></svg>";
document.addEventListener('error',e=>{
  if(e.target.tagName==='IMG' && e.target.src!==FALLBACK_IMG){ e.target.src=FALLBACK_IMG; }
},true);

/* ---------- Persistent preferences ---------- */
let lang=store.get('pv-lang','te');
let theme=store.get('pv-theme','light');
let fontScale=store.get('pv-font',1);

/* ---------- UI dictionary (English / Telugu) ---------- */
const UI={
en:{home:'Home',menu:'Menu',readMore:'Read More',viewAll:'View All',loadMore:'Load More',latest:'Latest News',trending:'Trending',recent:'Recently Published',topHeadlines:'Top Headlines',mostRead:'Most Read',trendingTopics:'Trending Topics',ads:'Advertisement',epaper:'ePaper',search:'Search',searchPh:'Search headlines, categories, districts, authors...',noResults:'No matching news found. Try a different keyword or filter.',bookmarks:'Bookmarks',bmEmpty:'No bookmarks yet. Tap the star on any story to save it.',bookmark:'Bookmark',share:'Share',copyLink:'Copy link',linkCopied:'Link copied to clipboard',demo:'DEMO',demoNotice:'DEMO CONTENT: all stories, names, quotes and events on this site are fictional samples for design preview only.',related:'Related News',trendingArt:'Trending Articles',by:'By',subscribe:'Subscribe',subDone:'Thank you! Demo subscription recorded.',badEmail:'Please enter a valid email address.',sent:'Message sent (demo). Our desk will reply soon.',pdfNotice:'Real PDF not uploaded yet. Opening print view so you can save this demo edition as PDF.',breaking:'Breaking News',prev:'Previous',next:'Next',contactUs:'Contact Us',aboutUs:'About Us',tagline:'Truth · Trust · The Voice of the People',footAbout:'Praja Vaarthalu is a bilingual Telugu-English digital newspaper. This website is a demo front-end prepared for future backend integration.',categories:'Important News Categories',company:'Company',legal:'Legal',privacy:'Privacy Policy',terms:'Terms and Conditions',disclaimer:'Disclaimer',editorial:'Editorial Team',advertise:'Advertise With Us',followUs:'Follow Us',emailPh:'Enter your email',copyright:'All rights reserved.',profile:'My Account',signIn:'Sign in (Demo)',recentlyViewed:'Recently Viewed',lightMode:'Light Mode',darkMode:'Dark Mode',minRead:'min read',views:'views',notFound:'Page not found',backHome:'Back to Home',all:'All',district:'District',allDistricts:'All Districts',mandal:'Mandal',constituency:'Constituency',reporter:'Local Reporter',editions:'Editions',prevEditions:'Previous Editions',date:'Date',page:'Page',zoomIn:'Zoom in',zoomOut:'Zoom out',fullscreen:'Full screen',download:'Download PDF',print:'Print',galleryTitle:'Photo Gallery',videosTitle:'Video News',contactTitle:'Contact Us',name:'Name',email:'Email',subject:'Subject',message:'Message',send:'Send Message',bookmarksTitle:'My Bookmarks',categoryLabel:'Category',districtLabel:'District',authorLabel:'Author',searchResults:'Search results',resultsFor:'results for',allCats:'All categories',stateNews:'State news',readerNote:'Reader note',aboutTitle:'About Praja Vaarthalu',edTeam:'Editorial Team',play:'Play',watchDemo:'Demo video placeholder: connect your video source (YouTube, CDN or newsroom player) here.',weather:'31°C · Hyderabad · Demo',copyright2:'Demo website prepared for Praja Vaarthalu. Not an official publication.',menuLabel:'Open menu',latestDistrict:'Latest District Updates',stories:'stories',ePdfNote:'Real PDF editions appear here once uploaded to assets/epaper/',edNote:'DEMO EDITION · fictional content',sign:'Demo sign-in successful',signedOut:'Nothing viewed yet.',accountNote:'Demo account area for preview only.',demoContact:'Demo contact desk',repImage:'Representative image (DEMO)',valuesTitle:'Our Values',valuesText:'Accuracy, balance, independent editorial judgement and accountability to readers form the foundation of our newsroom.',aboutText:'Praja Vaarthalu is a bilingual Telugu-English digital newspaper dedicated to fair, factual and people-first journalism. We cover Andhra Pradesh, Telangana, national and international affairs, sports, business, technology, education, cinema, and editorial opinion.',contactInfo:'Head Office: Hyderabad (demo address) · Phone: +91 00000 00000 · Email: desk@prajavaarthalu.demo',newsletterTxt:'Daily headlines delivered to your inbox.',openEpaper:'Open ePaper',epaperTxt:"Today's editions, district editions and previous issues in one place.",pickEdition:'Demo edition for',pageWord:'Page',editionWord:'Edition',demoPlaceholder:'Demo email input',bookmarkedMsg:'Bookmarked',bookmarkRemoved:'Bookmark removed',fullUnsupported:'Full screen not supported',editionNo:'Edition',sourceNote:'Sample data only'},
te:{home:'హోమ్',menu:'మెనూ',readMore:'మరింత చదవండి',viewAll:'అన్నీ చూడండి',loadMore:'మరిన్ని వార్తలు',latest:'తాజా వార్తలు',trending:'ట్రెండింగ్',recent:'ఇటీవల ప్రచురించినవి',topHeadlines:'ప్రధాన శీర్షికలు',mostRead:'ఎక్కువ చదివినవి',trendingTopics:'ట్రెండింగ్ అంశాలు',ads:'ప్రకటన',epaper:'ఈ-పేపర్',search:'వెతుకు',searchPh:'శీర్షికలు, విభాగాలు, జిల్లాలు, రచయితలు...',noResults:'సరిపోయే వార్తలు కనబడలేదు. వేరే పదం లేదా ఫిల్టర్ ప్రయత్నించండి.',bookmarks:'బుక్‌మార్క్‌లు',bmEmpty:'ఇంకా బుక్‌మార్క్‌లు లేవు. ఏదైనా కథనంపై నక్షత్రం నొక్కండి.',bookmark:'బుక్‌మార్క్',share:'షేర్ చేయండి',copyLink:'లింక్ కాపీ చేయండి',linkCopied:'లింక్ కాపీ అయ్యింది',demo:'డెమో',demoNotice:'డెమో కంటెంట్: ఈ సైట్‌లోని అన్ని కథనాలు, పేర్లు, కోట్స్, ఘటనలు కల్పితమైనవి. ఇవి డిజైన్ ప్రివ్యూ కోసం మాత్రమే.',related:'సంబంధిత వార్తలు',trendingArt:'ట్రెండింగ్ కథనాలు',by:'రచన',subscribe:'సబ్‌స్క్రయిబ్',subDone:'ధన్యవాదాలు! డెమో సబ్‌స్క్రిప్షన్ నమోదైంది.',badEmail:'దయచేసి సరైన ఈమెయిల్ చిరునామా ఇవ్వండి.',sent:'సందేశం పంపబడింది (డెమో). త్వరలో స్పందిస్తాం.',pdfNotice:'అసలు PDF ఇంకా అప్‌లోడ్ కాలేదు. ప్రింట్ వీక్షణ తెరుస్తున్నాం; PDFగా సేవ్ చేయవచ్చు.',breaking:'బ్రేకింగ్ న్యూస్',prev:'వెనుకకు',next:'తదుపరి',contactUs:'మమ్మల్ని సంప్రదించండి',aboutUs:'మా గురించి',tagline:'నిజం · నమ్మకం · ప్రజల గళం',footAbout:'ప్రజా వార్తలు తెలుగు-ఇంగ్లీష్ ద్విభాషా డిజిటల్ దినపత్రిక. ఈ వెబ్‌సైట్ భవిష్యత్ బ్యాకెండ్ అనుసంధానానికి సిద్ధం చేసిన డెమో.',categories:'ముఖ్యమైన వార్తా విభాగాలు',company:'సంస్థ',legal:'చట్టపరమైనవి',privacy:'గోప్యతా విధానం',terms:'నిబంధనలు & షరతులు',disclaimer:'నిరాకరణ',editorial:'సంపాదక బృందం',advertise:'ప్రకటనలు ఇవ్వండి',followUs:'మమ్మల్ని అనుసరించండి',emailPh:'మీ ఈమెయిల్ నమోదు చేయండి',copyright:'అన్ని హక్కులు రక్షితం.',profile:'నా ఖాతా',signIn:'సైన్ ఇన్ (డెమో)',recentlyViewed:'ఇటీవల చూసినవి',lightMode:'లైట్ మోడ్',darkMode:'డార్క్ మోడ్',minRead:'నిమిషాల పఠనం',views:'వీక్షణలు',notFound:'పేజీ కనబడలేదు',backHome:'హోమ్‌కు వెళ్ళండి',all:'అన్నీ',district:'జిల్లా',allDistricts:'అన్ని జిల్లాలు',mandal:'మండలం',constituency:'నియోజకవర్గం',reporter:'స్థానిక విలేకరి',editions:'ఎడిషన్లు',prevEditions:'గత ఎడిషన్లు',date:'తేదీ',page:'పేజీ',zoomIn:'జూమ్ ఇన్',zoomOut:'జూమ్ అవుట్',fullscreen:'ఫుల్ స్క్రీన్',download:'PDF డౌన్‌లోడ్',print:'ప్రింట్',galleryTitle:'ఫోటో గ్యాలరీ',videosTitle:'వీడియో వార్తలు',contactTitle:'మమ్మల్ని సంప్రదించండి',name:'పేరు',email:'ఈమెయిల్',subject:'విషయం',message:'సందేశం',send:'సందేశం పంపండి',bookmarksTitle:'నా బుక్‌మార్క్‌లు',categoryLabel:'విభాగం',districtLabel:'జిల్లా',authorLabel:'రచయిత',searchResults:'శోధన ఫలితాలు',resultsFor:'ఫలితాలు',allCats:'అన్ని విభాగాలు',stateNews:'రాష్ట్ర వార్తలు',readerNote:'పాఠకుల గమనిక',aboutTitle:'ప్రజా వార్తలు గురించి',edTeam:'సంపాదక బృందం',play:'ప్లే',watchDemo:'డెమో వీడియో ప్లేస్‌హోల్డర్: ఇక్కడ మీ వీడియో మూలాన్ని (YouTube, CDN లేదా న్యూస్‌రూమ్ ప్లేయర్) కనెక్ట్ చేయండి.',weather:'31°C · హైదరాబాద్ · డెమో',copyright2:'ప్రజా వార్తలు కోసం సిద్ధం చేసిన డెమో వెబ్‌సైట్. అధికారిక ప్రచురణ కాదు.',menuLabel:'మెనూ తెరవండి',latestDistrict:'తాజా జిల్లా అప్‌డేట్స్',stories:'కథనాలు',ePdfNote:'PDF అప్‌లోడ్ అయిన తర్వాత నిజమైన ఎడిషన్లు ఇక్కడ కనిపిస్తాయి',edNote:'డెమో ఎడిషన్ · కల్పిత కంటెంట్',sign:'డెమో: సైన్ ఇన్ విజయవంతం',signedOut:'ఇంకా ఏమీ చూడలేదు.',accountNote:'డెమో ఖాతా ప్రాంతం - ప్రదర్శన కోసం మాత్రమే.',demoContact:'డెమో సంప్రదింపు డెస్క్',repImage:'ప్రతీకాత్మక చిత్రం (డెమో)',valuesTitle:'మా విలువలు',valuesText:'నిజాయతీ, సమతుల్యత, స్వతంత్ర సంపాదకత్వం మరియు పాఠకుల పట్ల బాధ్యత మా పునాది.',aboutText:'ప్రజా వార్తలు ప్రజల కోసం, ప్రజల గొంతుకగా నిలిచే తెలుగు-ఇంగ్లీష్ ద్విభాషా డిజిటల్ దినపత్రిక. జాతీయ, రాష్ట్ర, జిల్లా, క్రీడలు, వ్యాపారం, సాంకేతికత, విద్య, సినిమా మరియు సంపాదకీయ వార్తలను నిష్పాక్షికంగా అందించడం మా లక్ష్యం.',contactInfo:'హెడ్ ఆఫీస్: హైదరాబాద్ (డెమో చిరునామా) · ఫోన్: +91 00000 00000 · ఈమెయిల్: desk@prajavaarthalu.demo',newsletterTxt:'రోజువారీ ముఖ్యాంశాలు మీ ఇన్‌బాక్స్‌కు.',openEpaper:'ఈ-పేపర్ చూడండి',epaperTxt:'నేటి ఎడిషన్లు, జిల్లా ఎడిషన్లు, గత సంచికలు - అన్నీ ఒకేచోట.',pickEdition:'డెమో ఎడిషన్',pageWord:'పేజీ',editionWord:'సంచిక',demoPlaceholder:'డెమో ఈమెయిల్',bookmarkedMsg:'బుక్‌మార్క్ చేయబడింది',bookmarkRemoved:'బుక్‌మార్క్ తీసివేయబడింది',fullUnsupported:'ఫుల్ స్క్రీన్ మద్దతు లేదు',editionNo:'సంచిక',sourceNote:'నమూనా డేటా మాత్రమే'}
};

/* Translate a UI key for the current language (falls back to English) */
const t=k=>(UI[lang]&&UI[lang][k])||UI.en[k]||k;

/* Locale helpers for dates */
const L=()=>lang==='te'?'te-IN':'en-IN';
const fmtDate=d=>d.toLocaleDateString(L(),{day:'numeric',month:'short',year:'numeric'});
const fmtTime=d=>d.toLocaleString(L(),{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
function isoDate(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function todayISO(){return isoDate(new Date());}

/* Apply every translatable label on the page */
function applyStatic(){
  document.documentElement.lang=lang;
  document.documentElement.setAttribute('dir','ltr');
  $$('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
  $$('[data-i18n-ph]').forEach(el=>{el.setAttribute('placeholder',t(el.dataset.i18nPh));});
  $('#langSelect').value=lang;
  $('#copyText').textContent='© 2026 '+BRAND[lang]+'. '+t('copyright')+' '+t('copyright2');
  $('#todayText').textContent=new Date().toLocaleDateString(L(),{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  $('#weatherText').textContent=WEATHER[lang];
  $('.hamburger').setAttribute('aria-label',t('menuLabel'));
  applyTheme();
}

/* Change language, persist it and re-render the current page */
function setLang(l){
  lang=l==='en'?'en':'te';
  store.set('pv-lang',lang);
  applyStatic();
  buildNav();
  buildFooterCats();
  buildTicker();
  if(typeof reRender==='function') reRender();
}

/* Theme (light / dark) */
function applyTheme(){
  document.documentElement.dataset.theme=theme;
  const btn=$('#themeBtn');
  if(btn){
    btn.textContent=theme==='dark'?t('lightMode'):t('darkMode');
    btn.setAttribute('aria-label',btn.textContent);
  }
}
function toggleTheme(){
  theme=theme==='dark'?'light':'dark';
  store.set('pv-theme',theme);
  applyTheme();
}

/* Font size: 90% to 130% */
function applyFont(){
  fontScale=Math.min(1.3,Math.max(0.9,Math.round(fontScale*10)/10));
  document.documentElement.style.setProperty('--fs',fontScale);
  store.set('pv-font',fontScale);
}
