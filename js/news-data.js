/* =========================================================
   PRAJA VAARTHALU - Demo news data (JSON-style, ready for backend swap)
   DEMO CONTENT: every story is a fictional sample for design preview.
   Row schema: [id, category, daysAgo, author, districtKey, enTitle, teTitle, enDesc, teDesc]
   ========================================================= */
const BRAND={te:'వార్తలు',en:'VAARTHALU'};
const PAGE_SIZE=6;
const PAGES=4;

const CATS={
  ap:['Andhra Pradesh','ఆంధ్రప్రదేశ్'],telangana:['Telangana','తెలంగాణ'],politics:['Politics','రాజకీయాలు'],
  sports:['Sports','క్రీడలు'],national:['National','జాతీయం'],international:['International','అంతర్జాతీయం'],
  business:['Business','వ్యాపారం'],tech:['Technology','టెక్నాలజీ'],edu:['Education','విద్య'],jobs:['Jobs & Careers','ఉద్యోగాలు'],
  cinema:['Cinema','సినిమా'],health:['Health','ఆరోగ్యం'],agri:['Agriculture','వ్యవసాయం'],crime:['Crime & Law','క్రైమ్ & చట్టం'],
  life:['Lifestyle','జీవనశైలి'],edit:['Editorial','సంపాదకీయం']
};

const DIST={
  vsp:{st:'ap',en:'Visakhapatnam',te:'విశాఖపట్నం'},vjw:{st:'ap',en:'Vijayawada',te:'విజయవాడ'},
  gnt:{st:'ap',en:'Guntur',te:'గుంటూరు'},tpt:{st:'ap',en:'Tirupati',te:'తిరుపతి'},
  knl:{st:'ap',en:'Kurnool',te:'కర్నూలు'},nlr:{st:'ap',en:'Nellore',te:'నెల్లూరు'},
  hyd:{st:'tg',en:'Hyderabad',te:'హైదరాబాద్'},wgl:{st:'tg',en:'Warangal',te:'వరంగల్'},
  krm:{st:'tg',en:'Karimnagar',te:'కరీంనగర్'},nzb:{st:'tg',en:'Nizamabad',te:'నిజామాబాద్'},
  kmm:{st:'tg',en:'Khammam',te:'ఖమ్మం'},rrd:{st:'tg',en:'Rangareddy',te:'రంగారెడ్డి'}
};

const AUTH={'Ravi Kumar':'రవి కుమార్','Lakshmi Prasad':'లక్ష్మి ప్రసాద్','Anil Reddy':'అనిల్ రెడ్డి','Sravya Datla':'శ్రావ్య దత్ల','Mohammed Irfan':'మహమ్మద్ ఇర్ఫాన్','Priya Sharma':'ప్రియ శర్మ','Venkata Rao':'వెంకట రావు','Meghana Iyer':'మేఘన అయ్యర్','Suresh Naidu':'సురేష్ నాయుడు','Divya Chandra':'దివ్య చంద్ర','Kiran Varma':'కిరణ్ వర్మ','Anjali Mehta':'అంజలి మెహతా'};

const TOPICS=[['Assembly Session','అసెంబ్లీ సమావేశాలు'],['IPL 2026','ఐపీఎల్ 2026'],['AI Policy','ఏఐ విధానం'],['Kharif Crop','ఖరీఫ్ పంట'],['Hyderabad Metro','హైదరాబాద్ మెట్రో'],['TET Notification','టెట్ నోటిఫికేషన్']];

const WEATHER={en:'31°C · Hyderabad · Demo',te:'31°C · హైదరాబాద్ · డెమో'};

const NAV=[
 {id:'home',en:'Home',te:'హోమ్',r:'#/home'},
 {id:'breaking',en:'Breaking News',te:'బ్రేకింగ్ న్యూస్',r:'#/cat/breaking'},
 {id:'ap',en:'Andhra Pradesh',te:'ఆంధ్రప్రదేశ్',kids:[['Government','ప్రభుత్వం'],['Assembly','అసెంబ్లీ'],['Development Projects','అభివృద్ధి ప్రాజెక్టులు'],['District News','జిల్లా వార్తలు','#/district/ap'],['Public Issues','ప్రజా సమస్యలు']]},
 {id:'telangana',en:'Telangana',te:'తెలంగాణ',kids:[['Government Updates','ప్రభుత్వ అప్‌డేట్స్'],['Hyderabad','హైదరాబాద్'],['District News','జిల్లా వార్తలు','#/district/tg'],['Political Developments','రాజకీయ పరిణామాలు'],['Public Affairs','ప్రజా వ్యవహారాలు']]},
 {id:'national',en:'National News',te:'జాతీయ వార్తలు',kids:[['Parliament','పార్లమెంట్'],['Central Government','కేంద్ర ప్రభుత్వం'],['Supreme Court','సుప్రీంకోర్టు'],['National Policies','జాతీయ విధానాలు']]},
 {id:'international',en:'International News',te:'అంతర్జాతీయ వార్తలు',kids:[['World Politics','ప్రపంచ రాజకీయాలు'],['International Relations','అంతర్జాతీయ సంబంధాలు'],['Global Economy','ప్రపంచ ఆర్థిక రంగం']]},
 {id:'politics',en:'Politics',te:'రాజకీయాలు',kids:[['AP Politics','ఏపీ రాజకీయాలు'],['Telangana Politics','తెలంగాణ రాజకీయాలు'],['National Politics','జాతీయ రాజకీయాలు'],['Election Updates','ఎన్నికల అప్‌డేట్స్'],['Interviews','ఇంటర్వ్యూలు']]},
 {id:'sports',en:'Sports',te:'క్రీడలు',kids:[['Cricket','క్రికెట్'],['IPL','ఐపీఎల్'],['Football','ఫుట్‌బాల్'],['Badminton','బ్యాడ్మింటన్'],['Hockey','హాకీ'],['Tennis','టెన్నిస్'],['Kabaddi','కబడ్డీ']]},
 {id:'business',en:'Business',te:'వ్యాపారం',kids:[['Stock Market','స్టాక్ మార్కెట్'],['Banking','బ్యాంకింగ్'],['Startups','స్టార్టప్‌లు'],['Companies','కంపెనీలు']]},
 {id:'tech',en:'Technology',te:'టెక్నాలజీ',kids:[['Artificial Intelligence','కృత్రిమ మేధ'],['Cybersecurity','సైబర్ భద్రత'],['Gadgets','గాడ్జెట్లు'],['IT Industry','ఐటీ రంగం']]},
 {id:'edu',en:'Education',te:'విద్య',kids:[['Competitive Exams','పోటీ పరీక్షలు'],['Results','ఫలితాలు'],['Scholarships','స్కాలర్‌షిప్‌లు']]},
 {id:'jobs',en:'Jobs & Careers',te:'ఉద్యోగాలు',kids:[['Government Jobs','ప్రభుత్వ ఉద్యోగాలు'],['Private Jobs','ప్రైవేట్ ఉద్యోగాలు']]},
 {id:'cinema',en:'Cinema',te:'సినిమా',kids:[['Tollywood','టాలీవుడ్'],['Bollywood','బాలీవుడ్'],['Movie Reviews','సినిమా రివ్యూలు'],['OTT Releases','ఓటీటీ విడుదలలు']]},
 {id:'ent',en:'Entertainment',te:'వినోదం',r:'#/cat/cinema'},
 {id:'health',en:'Health',te:'ఆరోగ్యం'},
 {id:'agri',en:'Agriculture',te:'వ్యవసాయం'},
 {id:'crime',en:'Crime & Law',te:'క్రైమ్ & చట్టం'},
 {id:'life',en:'Lifestyle',te:'జీవనశైలి'},
 {id:'edit',en:'Editorial',te:'సంపాదకీయం',kids:[['Opinion','అభిప్రాయం'],['Expert Columns','నిపుణుల కాలమ్'],['Special Reports','ప్రత్యేక కథనాలు','#/cat/special']]},
 {id:'special',en:'Special Stories',te:'ప్రత్యేక కథనాలు'},
 {id:'gallery',en:'Photo Gallery',te:'ఫోటో గ్యాలరీ',r:'#/gallery'},
 {id:'videos',en:'Videos',te:'వీడియోలు',r:'#/videos'},
 {id:'epaper',en:'ePaper',te:'ఈ-పేపర్',r:'#/epaper'}
];

const EDITIONS=[
 {id:'te',en:'Telugu Edition',te:'తెలుగు ఎడిషన్',scope:'lang'},
 {id:'en',en:'English Edition',te:'ఇంగ్లీష్ ఎడిషన్',scope:'all'},
 {id:'ap',en:'Andhra Pradesh Edition',te:'ఆంధ్రప్రదేశ్ ఎడిషన్',scope:'ap'},
 {id:'tg',en:'Telangana Edition',te:'తెలంగాణ ఎడిషన్',scope:'tg'},
 {id:'vsp',en:'Visakhapatnam District',te:'విశాఖపట్నం జిల్లా',scope:'dist',dist:'vsp'},
 {id:'gnt',en:'Guntur District',te:'గుంటూరు జిల్లా',scope:'dist',dist:'gnt'},
 {id:'hyd',en:'Hyderabad District',te:'హైదరాబాద్ జిల్లా',scope:'dist',dist:'hyd'},
 {id:'wgl',en:'Warangal District',te:'వరంగల్ జిల్లా',scope:'dist',dist:'wgl'}
];

const PAGE_CATS=[null,['national','international','business'],['sports','cinema','tech'],['ap','telangana','politics','edit']];

const RAW=[
[1,"ap",0,"Ravi Kumar","vsp","Port-led industrial corridor plan gets cabinet nod","పోర్టు ఆధారిత పారిశ్రామిక కారిడార్ ప్రణాళికకు ఆమోదం","Demo story: the plan links logistics parks and new jobs to the expansion of the port.","డెమో కథనం: పోర్టు విస్తరణతో ముడిపడిన లాజిస్టిక్స్ పార్కులు, ఉద్యోగావకాశాలకు ప్రణాళిక."],
[2,"ap",1,"Lakshmi Prasad","vjw","Krishna riverfront housing project enters second phase","కృష్ణా నదీతీర గృహ ప్రాజెక్టు రెండో దశలోకి","Demo story: the second phase will add affordable flats and a public walkway.","డెమో కథనం: రెండో దశలో అందుబాటు ధరల ఫ్లాట్లు, ప్రజల నడక మార్గం చేరుతున్నాయి."],
[3,"ap",1,"Anil Reddy","gnt","Guntur chilli market to get modern cold storage units","గుంటూరు మిర్చి మార్కెట్‌కు ఆధునిక కోల్డ్ స్టోరేజీ","Demo story: traders say new storage will reduce post-harvest losses for farmers.","డెమో కథనం: కొత్త స్టోరేజీతో పంట నష్టాలు తగ్గుతాయని వ్యాపారులు చెబుతున్నారు."],
[4,"ap",2,"Sravya Datla","tpt","Tirupati traffic plan goes live from Monday","తిరుపతి ట్రాఫిక్ ప్రణాళిక సోమవారం నుంచి అమలు","Demo story: one-way zones and new parking bays are planned near the temple town core.","డెమో కథనం: ఆలయ పట్టణ కేంద్రం చుట్టూ వన్-వే జోన్లు, కొత్త పార్కింగ్ బేలు."],
[5,"ap",2,"Mohammed Irfan","knl","Kurnool pipelines to reach 40 new colonies","కర్నూలులో 40 కొత్త కాలనీలకు తాగునీటి పైపులైన్లు","Demo story: the water board has listed colonies where pipe laying will begin this month.","డెమో కథనం: ఈ నెలలో పైపులైన్ పనులు మొదలయ్యే కాలనీల జాబితాను అధికారులు విడుదల చేశారు."],
[6,"ap",3,"Priya Sharma","nlr","Nellore aquaculture farmers seek faster export clearances","నెల్లూరు ఆక్వా రైతుల ఎగుమతి అనుమతులపై డిమాండ్","Demo story: farmers want single-window clearances for shrimp exports.","డెమో కథనం: రొయ్యల ఎగుమతులకు సింగిల్ విండో అనుమతులు కావాలని రైతులు కోరుతున్నారు."],
[7,"ap",3,"Venkata Rao","vsp","Assembly committee reviews fishing harbour upgrade","విశాఖ ఫిషింగ్ హార్బర్ ఆధునీకరణపై కమిటీ సమీక్ష","Demo story: the committee visited the harbour and checked cold chain facilities.","డెమో కథనం: కమిటీ హార్బర్‌ను సందర్శించి కోల్డ్ చైన్ సౌకర్యాలను పరిశీలించింది."],
[8,"ap",4,"Meghana Iyer","vjw","Vijayawada metro feeder bus routes to be expanded","విజయవాడ మెట్రో ఫీడర్ బస్సు మార్గాల విస్తరణ","Demo story: five new feeder routes will connect residential areas to metro stations.","డెమో కథనం: ఐదు కొత్త ఫీడర్ మార్గాలతో నివాస ప్రాంతాలు మెట్రో స్టేషన్లకు చేరతాయి."],
[9,"ap",5,"Suresh Naidu","gnt","District hospitals in Guntur to add 200 dialysis beds","గుంటూరు ఆసుపత్రుల్లో 200 డయాలసిస్ పడకలు","Demo story: the plan aims to reduce waiting time for kidney patients.","డెమో కథనం: కిడ్నీ రోగుల నిరీక్షణ సమయం తగ్గించడమే ఈ ప్రణాళిక లక్ష్యం."],
[10,"ap",6,"Divya Chandra","tpt","Srikalahasti weavers seek fresh design training","శ్రీకాళహస్తి చేనేత కార్మికులకు కొత్త డిజైన్ శిక్షణ","Demo story: weavers want modern design workshops for export-quality sarees.","డెమో కథనం: ఎగుమతి నాణ్యత చీరల కోసం ఆధునిక డిజైన్ వర్క్‌షాప్‌లు కావాలని నేతన్నలు అడుగుతున్నారు."],
[11,"telangana",0,"Ravi Kumar","hyd","Outer ring road land acquisition gets fast-track review","ఔటర్ రింగ్ రోడ్ భూసేకరణపై వేగవంతమైన సమీక్ష","Demo story: officials will review pending compensation files district by district.","డెమో కథనం: పెండింగ్ పరిహారం ఫైళ్లను జిల్లాల వారీగా అధికారులు సమీక్షించనున్నారు."],
[12,"telangana",1,"Kiran Varma","wgl","Warangal textile park land allotment list to be published","వరంగల్ టెక్స్‌టైల్ పార్క్ భూ కేటాయింపు జాబితా విడుదల","Demo story: the list will show allotted plots and timelines for units.","డెమో కథనం: కేటాయించిన ప్లాట్లు, యూనిట్ల గడువుల వివరాలతో జాబితా విడుదల కానుంది."],
[13,"telangana",1,"Anjali Mehta","krm","Karimnagar students get new sports hostel facility","కరీంనగర్ విద్యార్థులకు కొత్త క్రీడా హాస్టల్ సౌకర్యం","Demo story: the hostel will host athletes training in athletics and kabaddi.","డెమో కథనం: అథ్లెటిక్స్, కబడ్డీ శిక్షణ పొందే క్రీడాకారులకు హాస్టల్ అందుబాటులోకి."],
[14,"telangana",2,"Suresh Naidu","nzb","Turmeric growers demand better market pricing","పసుపు రైతుల మార్కెట్ ధరల డిమాండ్","Demo story: growers ask for a minimum support price review for turmeric.","డెమో కథనం: పసుపుకు కనీస మద్దతు ధరను సమీక్షించాలని రైతులు కోరుతున్నారు."],
[15,"telangana",2,"Lakshmi Prasad","kmm","Flood-protection works reviewed ahead of monsoon","వర్షాకాలానికి ముందు వరద నివారణ పనుల సమీక్ష","Demo story: engineers listed embankment repairs and drainage clearance tasks.","డెమో కథనం: కట్టల మరమ్మతులు, డ్రైనేజీ శుభ్రత పనులను ఇంజనీర్లు జాబితా చేశారు."],
[16,"telangana",3,"Sravya Datla","rrd","IT corridor sees new bus connectivity plan","ఐటీ కారిడార్‌కు కొత్త బస్సు కనెక్టివిటీ ప్రణాళిక","Demo story: additional night services are proposed for office commuters.","డెమో కథనం: ఆఫీస్ ప్రయాణికుల కోసం అదనపు రాత్రి బస్సు సర్వీసులు ప్రతిపాదించారు."],
[17,"telangana",3,"Mohammed Irfan","hyd","Old city heritage lanes to get lighting upgrades","పాత నగర వారసత్వ వీధులకు లైటింగ్, ఫుట్‌పాత్ అభివృద్ధి","Demo story: the plan includes footpath repairs and heritage-style street lamps.","డెమో కథనం: ఫుట్‌పాత్ మరమ్మతులు, వారసత్వ శైలి వీధి దీపాలు ఈ ప్రణాళికలో ఉన్నాయి."],
[18,"telangana",4,"Priya Sharma","wgl","Warangal fort precinct tourism plan presented","వరంగల్ కోట ప్రాంత పర్యాటక ప్రణాళిక సమర్పణ","Demo story: the proposal adds guided walks, signage and a visitor centre.","డెమో కథనం: గైడెడ్ నడకలు, సైనేజీ, విజిటర్ సెంటర్ ప్రతిపాదనలో ఉన్నాయి."],
[19,"telangana",5,"Venkata Rao","krm","Handloom cluster seeks digital marketing support","చేనేత క్లస్టర్‌కు డిజిటల్ మార్కెటింగ్ మద్దతు","Demo story: weavers want training in online sales and product photography.","డెమో కథనం: ఆన్‌లైన్ అమ్మకాలు, ఉత్పత్తుల ఫోటోగ్రఫీపై శిక్షణ కావాలని నేతన్నలు అడుగుతున్నారు."],
[20,"telangana",6,"Divya Chandra","nzb","Rural schools begin digital learning labs","గ్రామీణ పాఠశాలల్లో డిజిటల్ లెర్నింగ్ ల్యాబ్‌లు","Demo story: each school will receive tablets and a monitored learning room.","డెమో కథనం: ప్రతి పాఠశాలకు ట్యాబ్లెట్లు, పర్యవేక్షిత అభ్యాస గది అందుతాయి."],
[21,"politics",0,"Ravi Kumar","","Assembly session agenda lists urban governance bills","అసెంబ్లీ సమావేశాల అజెండా: పట్టణ పాలన బిల్లులు","Demo story: the agenda includes draft bills on municipal finance and transparency.","డెమో కథనం: మునిసిపల్ ఆర్థికం, పారదర్శకతపై ముసాయిదా బిల్లులు అజెండాలో ఉన్నాయి."],
[22,"politics",1,"Lakshmi Prasad","","Opposition plans joint strategy on water-sharing debate","నీటి పంపకాల చర్చపై ప్రతిపక్షాల ఉమ్మడి వ్యూహం","Demo story: parties will raise questions on reservoir allocation in the house.","డెమో కథనం: జలాశయ కేటాయింపులపై సభలో ప్రశ్నలు లేవనెత్తే యోచనలో పార్టీలు ఉన్నాయి."],
[23,"politics",1,"Anil Reddy","","Party leaders hold meeting on booth-level planning","బూత్ స్థాయి ప్రణాళికపై పార్టీ నేతల సమావేశం","Demo story: the meeting discussed volunteer networks and local outreach.","డెమో కథనం: వాలంటీర్ నెట్‌వర్క్‌లు, స్థానిక ప్రజాసంబంధాలు సమావేశంలో చర్చకు వచ్చాయి."],
[24,"politics",2,"Kiran Varma","","Analysis: why district alliances matter in 2026","విశ్లేషణ: 2026లో జిల్లా స్థాయి పొత్తులు ఎందుకు కీలకం","Demo analysis: local equations often decide outcomes more than state-level slogans.","డెమో విశ్లేషణ: రాష్ట్రస్థాయి నినాదాల కన్నా స్థానిక లెక్కలే ఫలితాలను నిర్ణయిస్తాయి."],
[25,"politics",2,"Meghana Iyer","","Interview: former minister on governance reforms","ఇంటర్వ్యూ: పాలనా సంస్కరణలపై మాజీ మంత్రి","Demo interview: the former minister discusses e-governance and grievance redressal.","డెమో ఇంటర్వ్యూ: ఈ-గవర్నెన్స్, ఫిర్యాదుల పరిష్కారంపై మాజీ మంత్రి అభిప్రాయాలు."],
[26,"politics",3,"Suresh Naidu","","Parties review election commission guidelines","ఎన్నికల సంఘం మార్గదర్శకాలపై పార్టీల సమీక్ష","Demo story: parties sought clarity on campaign expense reporting.","డెమో కథనం: ప్రచార ఖర్చుల నివేదికపై స్పష్టత కావాలని పార్టీలు కోరాయి."],
[27,"politics",3,"Divya Chandra","","Draft policy on women entrepreneurs released","మహిళా పారిశ్రామికవేత్తల కోసం ముసాయిదా విధానం విడుదల","Demo story: the draft offers collateral support and subsidised power tariffs.","డెమో కథనం: తనఖా మద్దతు, సబ్సిడీ విద్యుత్ ఛార్జీలు ముసాయిదా విధానంలో ఉన్నాయి."],
[28,"politics",4,"Sravya Datla","","Panchayat leaders seek clarity on welfare guidelines","కొత్త సంక్షేమ మార్గదర్శకాలపై పంచాయతీ నేతల స్పష్టత కోరిక","Demo story: village heads want simple checklists for eligibility.","డెమో కథనం: అర్హతపై సరళమైన చెక్‌లిస్టులు కావాలని గ్రామ నేతలు అడుగుతున్నారు."],
[29,"politics",5,"Mohammed Irfan","","States raise questions in parliamentary consultation","పార్లమెంటరీ సంప్రదింపుల్లో రాష్ట్రాల ప్రశ్నలు","Demo story: states asked for detailed data before final decisions.","డెమో కథనం: తుది నిర్ణయాలకు ముందు వివరణాత్మక డేటా కావాలని రాష్ట్రాలు కోరాయి."],
[30,"politics",6,"Priya Sharma","","Analysis: coalition arithmetic in the state assembly","విశ్లేషణ: అసెంబ్లీలో కూటమి లెక్కలు","Demo analysis: small parties may influence votes on key bills.","డెమో విశ్లేషణ: కీలక బిల్లుల ఓటింగ్‌లో చిన్న పార్టీలు ప్రభావం చూపవచ్చు."],
[31,"sports",0,"Venkata Rao","","IPL 2026 squads: fan favourites and emerging picks","ఐపీఎల్ 2026 జట్లు: అభిమాన ఆటగాళ్లు, కొత్త ప్రతిభ","Demo sports feature: a look at squad balance and young players to watch.","డెమో క్రీడా కథనం: జట్ల సమతుల్యత, గమనించాల్సిన యువ ఆటగాళ్ల విశ్లేషణ."],
[32,"sports",1,"Priya Sharma","","Hyderabad openers set up strong domestic win","హైదరాబాద్ ఓపెనర్ల దేశవాళీ విజయం","Demo match report: a solid opening stand led the side to a comfortable total.","డెమో మ్యాచ్ నివేదిక: బలమైన ఓపెనింగ్ భాగస్వామ్యంతో జట్టుకు సౌకర్యవంతమైన స్కోరు."],
[33,"sports",1,"Mohammed Irfan","","International series schedule announced for summer","వేసవిలో అంతర్జాతీయ సిరీస్ షెడ్యూల్ ప్రకటన","Demo sports note: venues and dates are sample placeholders for this preview.","డెమో క్రీడా గమనిక: ఈ ప్రివ్యూ కోసం వేదికలు, తేదీలు నమూనా మాత్రమే."],
[34,"sports",2,"Meghana Iyer","","Telugu club eyes league promotion push","ఫుట్‌బాల్: తెలుగు క్లబ్ లీగ్ ప్రమోషన్ లక్ష్యం","Demo sports story: the club plans youth training and new scouting camps.","డెమో క్రీడా కథనం: యువ శిక్షణ, కొత్త స్కౌటింగ్ క్యాంపులు క్లబ్ ప్రణాళికలో ఉన్నాయి."],
[35,"sports",2,"Suresh Naidu","","Badminton academy produces new prospects","బ్యాడ్మింటన్: అకాడమీ నుంచి కొత్త ఆశాకిరణాలు","Demo sports story: coaches highlight junior players with strong footwork.","డెమో క్రీడా కథనం: బలమైన ఫుట్‌వర్క్ చూపుతున్న జూనియర్ ఆటగాళ్లను కోచ్‌లు ప్రస్తావించారు."],
[36,"sports",3,"Divya Chandra","","Hockey league: side on six-match winning streak","హాకీ లీగ్: ఆరు మ్యాచ్‌ల విజయ పరంపర","Demo sports report: defence and set-piece strategy drove the streak.","డెమో క్రీడా నివేదిక: డిఫెన్స్, సెట్-పీస్ వ్యూహంతో విజయాల పరంపర."],
[37,"sports",4,"Anil Reddy","","Tennis: doubles pair reaches semifinal in open event","టెన్నిస్: డబుల్స్ జోడీకి సెమీఫైనల్ బెర్త్","Demo sports story: the pair won a tight tie-break in the quarterfinal.","డెమో క్రీడా కథనం: క్వార్టర్ ఫైనల్‌లో టైబ్రేక్ విజయంతో జోడీ సెమీస్‌కు చేరింది."],
[38,"sports",4,"Kiran Varma","","Kabaddi franchise plans youth academy","కబడ్డీ: యువ అకాడమీ ప్రణాళికతో ఫ్రాంచైజీ","Demo sports story: the academy will scout talent from district tournaments.","డెమో క్రీడా కథనం: జిల్లా టోర్నమెంట్ల నుంచి ప్రతిభను అకాడమీ గుర్తించనుంది."],
[39,"sports",5,"Lakshmi Prasad","","Sports ministry approves funds for stadium upgrades","జిల్లా స్టేడియాల ఆధునీకరణకు క్రీడా శాఖ నిధులు","Demo sports story: lighting, seating and track repairs are included.","డెమో క్రీడా కథనం: లైటింగ్, సీటింగ్, ట్రాక్ మరమ్మతులు ఈ పనుల్లో ఉన్నాయి."],
[40,"sports",6,"Ravi Kumar","","Women's cricket league draws record ticket demand","మహిళల క్రికెట్ లీగ్‌కు రికార్డు టికెట్ డిమాండ్","Demo sports story: organisers say ticket requests crossed expected numbers.","డెమో క్రీడా కథనం: ఊహించిన దానికన్నా ఎక్కువ టికెట్ అభ్యర్థనలు వచ్చాయని నిర్వాహకులు చెప్పారు."],
[41,"national",0,"Ravi Kumar","","Monsoon session dates and bills listed for Parliament","పార్లమెంట్: వర్షాకాల సమావేశాల తేదీలు, బిల్లులు","Demo story: the session calendar lists sample bills on digital governance.","డెమో కథనం: సమావేశాల క్యాలెండర్‌లో డిజిటల్ పాలనపై నమూనా బిల్లులు ఉన్నాయి."],
[42,"national",1,"Lakshmi Prasad","","Supreme Court hears petitions on digital privacy norms","డిజిటల్ గోప్యత నిబంధనలపై సుప్రీంకోర్టు విచారణ","Demo court report: petitioners seek clearer consent rules for apps.","డెమో కోర్టు నివేదిక: యాప్‌ల కోసం స్పష్టమైన సమ్మతి నిబంధనలు కావాలని పిటిషనర్లు కోరారు."],
[43,"national",1,"Anil Reddy","","Central government unveils rural road programme","కేంద్రం కొత్త గ్రామీణ రోడ్ల పథకం ప్రకటన","Demo story: the programme targets villages without all-weather roads.","డెమో కథనం: అన్ని వాతావరణాలకు తగిన రోడ్లు లేని గ్రామాలే ఈ పథకం లక్ష్యం."],
[44,"national",2,"Kiran Varma","","Critical minerals policy draft released for comments","కీలక ఖనిజాలపై జాతీయ విధాన ముసాయిదా విడుదల","Demo story: the draft seeks public comments within 30 days.","డెమో కథనం: ప్రజాభిప్రాయానికి 30 రోజుల గడువుతో ముసాయిదా విడుదలైంది."],
[45,"national",2,"Meghana Iyer","","Railway projects in southern states get revised timelines","దక్షిణ రాష్ట్రాల రైల్వే ప్రాజెక్టులకు సవరించిన గడువులు","Demo story: revised deadlines were issued for three track-doubling works.","డెమో కథనం: మూడు ట్రాక్ డబ్లింగ్ పనులకు సవరించిన గడువులు ప్రకటించారు."],
[46,"national",3,"Suresh Naidu","","Health ministry launches expanded screening drive","ఆరోగ్య శాఖ విస్తృత పరీక్షల కార్యక్రమం","Demo story: screening camps will cover diabetes and blood pressure.","డెమో కథనం: మధుమేహం, రక్తపోటు పరీక్షలు శిబిరాల్లో అందుబాటులో ఉంటాయి."],
[47,"national",3,"Divya Chandra","","Finance panel reviews tax compliance for MSMEs","ఎంఎస్ఎంఈల పన్ను నిబంధనలపై ఆర్థిక కమిటీ సమీక్ష","Demo story: the panel will simplify return filing for small units.","డెమో కథనం: చిన్న యూనిట్ల రిటర్న్ దాఖలును సరళం చేయాలని కమిటీ యోచిస్తోంది."],
[48,"national",4,"Sravya Datla","","Supreme Court asks states to report on prison reforms","జైలు సంస్కరణలపై రాష్ట్రాల నివేదికలు కోరిన సుప్రీంకోర్టు","Demo court story: states must submit status updates within eight weeks.","డెమో కోర్టు కథనం: ఎనిమిది వారాల్లో రాష్ట్రాలు స్థితి నివేదికలు సమర్పించాలి."],
[49,"national",5,"Mohammed Irfan","","Housing scheme gets revised eligibility rules","గృహ పథకానికి సవరించిన అర్హత నిబంధనలు","Demo story: income limits and documentation steps were updated.","డెమో కథనం: ఆదాయ పరిమితులు, డాక్యుమెంటేషన్ దశలు నవీకరించారు."],
[50,"national",6,"Priya Sharma","","Census data tools to be piloted in three states","జనగణన డేటా సాధనాల పైలట్ మూడు రాష్ట్రాల్లో","Demo story: pilot dashboards will test data quality checks.","డెమో కథనం: డేటా నాణ్యత తనిఖీ కోసం పైలట్ డ్యాష్‌బోర్డులు పరీక్షించబడతాయి."],
[51,"international",0,"Venkata Rao","","Climate finance summit ends with new pledges","వాతావరణ ఫైనాన్స్ శిఖరాగ్ర సమావేశంలో కొత్త హామీలు","Demo world report: pledges focus on adaptation funds for vulnerable regions.","డెమో ప్రపంచ నివేదిక: బలహీన ప్రాంతాల అనుకూలత నిధులపై హామీలు."],
[52,"international",1,"Meghana Iyer","","Trade talks between regional blocs enter technical round","ప్రాంతీయ కూటముల వాణిజ్య చర్చలు సాంకేతిక దశలోకి","Demo world story: negotiators will focus on customs and rules of origin.","డెమో ప్రపంచ కథనం: కస్టమ్స్, మూల నిబంధనలపై చర్చలు కేంద్రీకరించనున్నాయి."],
[53,"international",1,"Anil Reddy","","Energy prices rise as shipping routes face delays","షిప్పింగ్ మార్గాల ఆలస్యంతో ఇంధన ధరలు పెరుగుదల","Demo world story: analysts expect price volatility over the coming weeks.","డెమో ప్రపంచ కథనం: రాబోయే వారాల్లో ధరల హెచ్చుతగ్గులు ఉండవచ్చని విశ్లేషకులు అంచనా."],
[54,"international",2,"Kiran Varma","","Space agencies plan joint satellite mission","వాతావరణ డేటా కోసం ఉమ్మడి ఉపగ్రహ ప్రయోగం","Demo science story: the mission would improve monsoon forecasts.","డెమో సైన్స్ కథనం: ఈ ప్రయోగం వర్షాకాల అంచనాలను మెరుగుపరుస్తుంది."],
[55,"international",2,"Priya Sharma","","Diplomatic visit to focus on education exchange","విద్య, సాంకేతిక మార్పిడిపై దౌత్య పర్యటన","Demo world story: scholarships and joint research labs are on the agenda.","డెమో ప్రపంచ కథనం: స్కాలర్‌షిప్‌లు, ఉమ్మడి పరిశోధన ల్యాబ్‌లు అజెండాలో ఉన్నాయి."],
[56,"international",3,"Suresh Naidu","","Global markets react to central bank commentary","కేంద్ర బ్యాంకు వ్యాఖ్యలకు ప్రపంచ మార్కెట్ల స్పందన","Demo world business note: bond yields moved after the comments.","డెమో ప్రపంచ వ్యాపార గమనిక: వ్యాఖ్యల తర్వాత బాండ్ రాబడులు మారాయి."],
[57,"international",3,"Divya Chandra","","Energy producers discuss output balance","చమురు ఉత్పత్తి దేశాల వర్చువల్ సమావేశం","Demo world story: members reviewed supply and demand outlook.","డెమో ప్రపంచ కథనం: సరఫరా, డిమాండ్ దృక్పథాన్ని సభ్య దేశాలు సమీక్షించాయి."],
[58,"international",4,"Sravya Datla","","Migrant worker rights draft agreement under discussion","వలస కార్మికుల హక్కుల ముసాయిదా ఒప్పందంపై చర్చ","Demo world story: the draft proposes portable social security benefits.","డెమో ప్రపంచ కథనం: పోర్టబుల్ సామాజిక భద్రతా ప్రయోజనాలు ముసాయిదాలో ప్రతిపాదించారు."],
[59,"international",5,"Mohammed Irfan","","World heritage committee adds new sites","ప్రపంచ వారసత్వ కమిటీ కొత్త ప్రదేశాలు జాబితాకు","Demo world culture story: sample sites were added after a closed session.","డెమో ప్రపంచ సంస్కృతి కథనం: మూసివేసిన సమావేశం తర్వాత నమూనా ప్రదేశాలు చేరాయి."],
[60,"international",6,"Lakshmi Prasad","","Semiconductor supply chain shifts to new hubs","సెమీకండక్టర్ సరఫరా గొలుసు కొత్త కేంద్రాలకు","Demo world business story: firms diversify factories across three regions.","డెమో ప్రపంచ వ్యాపార కథనం: కంపెనీలు మూడు ప్రాంతాల్లో ఫ్యాక్టరీలను విస్తరిస్తున్నాయి."],
[61,"business",0,"Anil Reddy","","Markets close higher on banking gains","బ్యాంకింగ్ లాభాలతో మార్కెట్ల పెరుగుదల","Demo market note: banking stocks led the rise in this sample session.","డెమో మార్కెట్ గమనిక: ఈ నమూనా సెషన్‌లో బ్యాంకింగ్ షేర్లు ముందున్నాయి."],
[62,"business",1,"Lakshmi Prasad","","Regional banks expand digital lending for small traders","చిన్న వ్యాపారుల కోసం డిజిటల్ రుణాలు విస్తరణ","Demo business story: loans will be approved with simplified documentation.","డెమో వ్యాపార కథనం: సరళీకృత డాక్యుమెంట్లతో రుణాలు ఆమోదించబడతాయి."],
[63,"business",1,"Kiran Varma","","Hyderabad startup raises seed round for rural logistics","గ్రామీణ లాజిస్టిక్స్ స్టార్టప్‌కు సీడ్ ఫండింగ్","Demo startup story: the company plans micro-warehouses in district towns.","డెమో స్టార్టప్ కథనం: జిల్లా పట్టణాల్లో మైక్రో-గిడ్డంగులు ప్రణాళికలో ఉన్నాయి."],
[64,"business",2,"Meghana Iyer","","Economy outlook: inflation easing, consumption steady","ఆర్థిక దృక్పథం: ద్రవ్యోల్బణం తగ్గుదల, వినియోగం స్థిరం","Demo analysis: the outlook is a sample scenario for dashboard testing.","డెమో విశ్లేషణ: ఇది డ్యాష్‌బోర్డ్ పరీక్ష కోసం నమూనా దృక్పథం మాత్రమే."],
[65,"business",2,"Suresh Naidu","","Auto component makers plan new Andhra plant","ఆటో విడిభాగాల తయారీదారుల కొత్త ప్లాంట్ ప్రణాళిక","Demo business story: the plant could create 1,200 jobs in phase one.","డెమో వ్యాపార కథనం: మొదటి దశలో 1,200 ఉద్యోగాలు సృష్టించే అవకాశం ఉంది."],
[66,"business",3,"Divya Chandra","","Startup report shows rise in women founders","స్టార్టప్ నివేదిక: మహిళా వ్యవస్థాపకుల పెరుగుదల","Demo report: women-led ventures grew in sectors like food and education.","డెమో నివేదిక: ఆహారం, విద్య రంగాల్లో మహిళా నేతృత్వ సంస్థలు పెరిగాయి."],
[67,"business",3,"Sravya Datla","","Mid-size IT firms announce hiring targets","మధ్యస్థ ఐటీ సంస్థల నియామక లక్ష్యాలు","Demo business story: targets focus on cloud and cybersecurity roles.","డెమో వ్యాపార కథనం: క్లౌడ్, సైబర్ భద్రత ఉద్యోగాలపై లక్ష్యాలు కేంద్రీకృతం."],
[68,"business",4,"Mohammed Irfan","","Pharma companies seek incentives for export expansion","ఎగుమతి విస్తరణకు ఫార్మా కంపెనీల ప్రోత్సాహకాల కోరిక","Demo business story: firms ask for faster approvals and lower compliance costs.","డెమో వ్యాపార కథనం: వేగవంతమైన ఆమోదాలు, తక్కువ నియంత్రణ ఖర్చులు కంపెనీల డిమాండ్."],
[69,"business",5,"Priya Sharma","","Bootcamp selects 40 founders from Telugu states","తెలుగు రాష్ట్రాల నుంచి 40 మంది వ్యవస్థాపకుల ఎంపిక","Demo business story: founders will receive mentoring and pilot funding.","డెమో వ్యాపార కథనం: వ్యవస్థాపకులకు మెంటరింగ్, పైలట్ నిధులు అందుతాయి."],
[70,"business",6,"Venkata Rao","","Stock market beginners guide: what to check first","స్టాక్ మార్కెట్ ప్రారంభకుల మార్గదర్శి","Demo explainer: a sample guide on risk, diversification and research.","డెమో వివరణ: రిస్క్, వైవిధ్యీకరణ, పరిశోధనపై నమూనా మార్గదర్శి."],
[71,"tech",0,"Meghana Iyer","","Generative AI tools reshape newsroom workflows","జెనరేటివ్ ఏఐ వార్తా గదుల పనితీరును మారుస్తోంది","Demo analysis: editors use AI for transcription while humans verify facts.","డెమో విశ్లేషణ: ఎడిటర్లు ట్రాన్స్‌క్రిప్షన్‌కు ఏఐ వాడుతూ వాస్తవాలను మనుషులు ధృవీకరిస్తారు."],
[72,"tech",1,"Ravi Kumar","","Machine learning course for farmers launched in Telugu","రైతుల కోసం తెలుగులో మెషీన్ లెర్నింగ్ కోర్సు","Demo tech story: lessons explain crop data in simple language.","డెమో టెక్ కథనం: పంట డేటాను సరళమైన భాషలో వివరించే పాఠాలు ఈ కోర్సులో ఉన్నాయి."],
[73,"tech",1,"Kiran Varma","","Phishing scams target bank customers","సైబర్ హెచ్చరిక: బ్యాంకు ఖాతాదారులపై ఫిషింగ్ మోసాలు","Demo cyber alert: never share OTP or passwords on unknown calls.","డెమో సైబర్ హెచ్చరిక: తెలియని కాల్స్‌లో ఓటీపీ, పాస్‌వర్డ్ ఎప్పుడూ పంచుకోవద్దు."],
[74,"tech",2,"Lakshmi Prasad","","Company unveils budget foldable phone model","బడ్జెట్ ఫోల్డబుల్ ఫోన్‌ను విడుదల చేసిన కంపెనీ","Demo gadget news: this is a sample product preview for layout testing.","డెమో గాడ్జెట్ వార్త: ఇది లేఅవుట్ పరీక్ష కోసం నమూనా ఉత్పత్తి ప్రివ్యూ."],
[75,"tech",2,"Anil Reddy","","IT industry reports rise in AI skilling enrolments","ఏఐ నైపుణ్య శిక్షణలో నమోదు పెరిగిందన్న ఐటీ రంగం","Demo report: skilling programmes saw more enrolments from tier-two cities.","డెమో నివేదిక: రెండో శ్రేణి నగరాల నుంచి శిక్షణ నమోదు పెరిగింది."],
[76,"tech",3,"Sravya Datla","","Open-source tools for newsroom security","వార్తా గదుల భద్రత కోసం ఓపెన్-సోర్స్ సాధనాలు","Demo software story: tools help teams protect drafts and source data.","డెమో సాఫ్ట్‌వేర్ కథనం: డ్రాఫ్ట్‌లు, సోర్స్ డేటాను రక్షించడానికి సాధనాలు సహాయపడతాయి."],
[77,"tech",3,"Suresh Naidu","","AI chip research hub announced for Hyderabad","హైదరాబాద్ క్యాంపస్‌లో ఏఐ చిప్ పరిశోధన కేంద్రం","Demo tech story: the hub plans student internships and industry labs.","డెమో టెక్ కథనం: విద్యార్థుల ఇంటర్న్‌షిప్, పరిశ్రమ ల్యాబ్‌లు ఈ కేంద్ర ప్రణాళికలో ఉన్నాయి."],
[78,"tech",4,"Divya Chandra","","Five budget earbuds tested for call quality","బడ్జెట్ ఇయర్‌బడ్స్ కాల్ నాణ్యత పరీక్ష","Demo gadget review: sample test results are for layout and reading preview.","డెమో గాడ్జెట్ రివ్యూ: ఇవి లేఅవుట్ ప్రివ్యూ కోసం నమూనా ఫలితాలు మాత్రమే."],
[79,"tech",5,"Mohammed Irfan","","Data privacy rules: what app users should know","డేటా గోప్యత నియమాలు: యాప్ వినియోగదారులకు సూచనలు","Demo explainer: check permissions, backups and consent screens regularly.","డెమో వివరణ: అనుమతులు, బ్యాకప్‌లు, సమ్మతి తెరలను క్రమం తప్పకుండా తనిఖీ చేయండి."],
[80,"tech",6,"Priya Sharma","","Telugu voice assistant for government services in pilot","ప్రభుత్వ సేవల కోసం తెలుగు వాయిస్ అసిస్టెంట్ పైలట్","Demo tech story: the pilot tests voice queries for certificates and forms.","డెమో టెక్ కథనం: ధృవపత్రాలు, ఫారాల కోసం వాయిస్ ప్రశ్నలను పైలట్ పరీక్షిస్తోంది."],
[81,"edu",0,"Ravi Kumar","","State TET result date announced for candidates","రాష్ట్ర టెట్ ఫలితాల తేదీ ప్రకటన","Demo education notice: check the official website for the final schedule.","డెమో విద్యా నోటీసు: తుది షెడ్యూల్ కోసం అధికారిక వెబ్‌సైట్ చూడండి."],
[82,"edu",1,"Lakshmi Prasad","","Degree course admissions open this week","డిగ్రీ కోర్సుల ప్రవేశాలు ఈ వారం ప్రారంభం","Demo education story: colleges will publish seat matrix and fee details.","డెమో విద్యా కథనం: కళాశాలలు సీట్ల వివరాలు, ఫీజులను ప్రచురిస్తాయి."],
[83,"edu",1,"Anil Reddy","","Scholarship deadline extended for students","విద్యార్థుల కోసం స్కాలర్‌షిప్ గడువు పొడిగింపు","Demo education notice: students should verify documents before submitting.","డెమో విద్యా నోటీసు: సమర్పించే ముందు డాక్యుమెంట్లు సరిచూసుకోవాలి."],
[84,"edu",2,"Kiran Varma","","Exam centre list released for entrance test","ప్రవేశ పరీక్ష కేంద్రాల జాబితా విడుదల","Demo education update: centres are listed by district for convenience.","డెమో విద్యా అప్‌డేట్: సౌలభ్యం కోసం జిల్లాల వారీగా కేంద్రాలు ఇచ్చారు."],
[85,"edu",3,"Meghana Iyer","","Model question papers published for intermediate students","ఇంటర్ విద్యార్థుల కోసం మోడల్ ప్రశ్నపత్రాలు","Demo education story: sample papers cover all major subjects.","డెమో విద్యా కథనం: నమూనా ప్రశ్నపత్రాలు అన్ని ప్రధాన సబ్జెక్టులను కవర్ చేస్తాయి."],
[86,"edu",4,"Suresh Naidu","","Universities to offer AI and data skill certificates","ఏఐ, డేటాలో నైపుణ్య ధృవపత్రాలు అందించనున్న వర్సిటీలు","Demo education story: short certificate courses will be open to all students.","డెమో విద్యా కథనం: చిన్న ధృవపత్ర కోర్సులు విద్యార్థులందరికీ అందుబాటులో ఉంటాయి."],
[87,"edu",5,"Divya Chandra","","Study tips for a three-hour exam","మూడు గంటల పరీక్షకు సిద్ధమయ్యే చిట్కాలు","Demo education guide: time planning and revision schedules help students.","డెమో విద్యా మార్గదర్శి: సమయ ప్రణాళిక, పునశ్చరణ షెడ్యూల్ విద్యార్థులకు సహాయపడతాయి."],
[88,"jobs",0,"Sravya Datla","","Junior assistant job notification released","జూనియర్ అసిస్టెంట్ ఉద్యోగాల నోటిఫికేషన్ విడుదల","Demo job notice: eligibility, fee and dates are sample details.","డెమో ఉద్యోగ నోటీసు: అర్హత, ఫీజు, తేదీలు నమూనా వివరాలు మాత్రమే."],
[89,"jobs",2,"Mohammed Irfan","","Private sector hiring rises in logistics and retail","లాజిస్టిక్స్, రిటైల్ రంగాల్లో నియామకాలు పెరుగుదల","Demo career report: warehouse and delivery roles see steady demand.","డెమో కెరీర్ నివేదిక: గిడ్డంగి, డెలివరీ ఉద్యోగాలకు స్థిరమైన డిమాండ్."],
[90,"jobs",4,"Priya Sharma","","Resume tips for first-time job seekers","తొలి ఉద్యోగ అన్వేషకులకు రెజ్యూమే చిట్కాలు","Demo career guide: highlight projects, internships and clear achievements.","డెమో కెరీర్ మార్గదర్శి: ప్రాజెక్టులు, ఇంటర్న్‌షిప్‌లు, స్పష్టమైన విజయాలు హైలైట్ చేయండి."],
[91,"cinema",0,"Venkata Rao","","Fantasy drama draws strong opening weekend","ఫాంటసీ డ్రామాకు బలమైన ఓపెనింగ్ వారాంతం","Demo cinema report: a fictional film's box-office story for preview only.","డెమో సినిమా నివేదిక: ప్రివ్యూ కోసం మాత్రమే కల్పిత సినిమా బాక్సాఫీస్ కథనం."],
[92,"cinema",1,"Meghana Iyer","","Movie review: a village romance with sharp dialogues","సినిమా రివ్యూ: పదునైన సంభాషణలతో పల్లె ప్రేమకథ","Demo review: a fictional film praised for music and performances.","డెమో రివ్యూ: సంగీతం, నటన ప్రశంసలు అందుకున్న కల్పిత సినిమా."],
[93,"cinema",1,"Suresh Naidu","","Action sequel announces new release window","యాక్షన్ సీక్వెల్ కొత్త విడుదల తేదీ","Demo Bollywood story: the sequel's release date is a sample placeholder.","డెమో బాలీవుడ్ కథనం: సీక్వెల్ విడుదల తేదీ నమూనా మాత్రమే."],
[94,"cinema",2,"Divya Chandra","","OTT releases this week: thrillers, comedies, documentaries","ఈ వారం ఓటీటీ విడుదలలు: థ్రిల్లర్లు, కామెడీ, డాక్యుమెంటరీలు","Demo OTT list: sample titles arranged for layout preview.","డెమో ఓటీటీ జాబితా: లేఅవుట్ ప్రివ్యూ కోసం నమూనా టైటిళ్లు."],
[95,"cinema",2,"Sravya Datla","","Music director on regional sound in new films","ప్రాంతీయ సంగీతంపై సంగీత దర్శకుడి ఇంటర్వ్యూ","Demo interview: a fictional composer discusses folk influences.","డెమో ఇంటర్వ్యూ: జానపద ప్రభావాలపై కల్పిత సంగీత దర్శకుడి అభిప్రాయాలు."],
[96,"cinema",3,"Mohammed Irfan","","Film festival lineup includes Telugu short films","ఫిల్మ్ ఫెస్టివల్ జాబితాలో తెలుగు షార్ట్ ఫిల్మ్స్","Demo festival note: sample short films listed for demonstration.","డెమో ఫెస్టివల్ గమనిక: ప్రదర్శన కోసం నమూనా షార్ట్ ఫిల్మ్స్ జాబితా."],
[97,"cinema",4,"Priya Sharma","","Producers discuss ticket pricing and multiplex access","టికెట్ ధరలు, మల్టీప్లెక్స్ అంశాలపై నిర్మాతల చర్చ","Demo cinema business story: a fictional meeting on exhibition terms.","డెమో సినిమా వ్యాపార కథనం: ప్రదర్శన నిబంధనలపై కల్పిత సమావేశం."],
[98,"cinema",4,"Kiran Varma","","Music album crosses streaming milestone","మ్యూజిక్ ఆల్బమ్ స్ట్రీమింగ్ మైలురాయి","Demo entertainment story: streaming figures are sample numbers.","డెమో వినోద కథనం: స్ట్రీమింగ్ సంఖ్యలు నమూనా మాత్రమే."],
[99,"cinema",5,"Lakshmi Prasad","","Classic re-release celebrates 50 years of a film","క్లాసిక్ సినిమా 50 ఏళ్ల వేడుక, రీ-రిలీజ్","Demo retrospective: a fictional classic is being celebrated in theatres.","డెమో రెట్రోస్పెక్టివ్: థియేటర్లలో కల్పిత క్లాసిక్ సినిమా వేడుక జరుగుతోంది."],
[100,"cinema",6,"Anjali Mehta","","Three new releases in short review takes","కొత్త సినిమాల రివ్యూ సారాంశం","Demo roundup: short takes on three fictional releases.","డెమో రౌండప్: మూడు కల్పిత విడుదలలపై చిన్న రివ్యూలు."],
[101,"health",1,"Anjali Mehta","","Monsoon health advisory: prevention tips for families","వర్షాకాల ఆరోగ్య సూచనలు: కుటుంబాల కోసం జాగ్రత్తలు","Demo health guide: hydration, hygiene and fever checks.","డెమో ఆరోగ్య మార్గదర్శి: నీరు, పరిశుభ్రత, జ్వర పరీక్షలు."],
[102,"health",3,"Divya Chandra","","Hospitals expand free screening camps in rural mandals","గ్రామీణ మండలాల్లో ఉచిత పరీక్షా శిబిరాల విస్తరణ","Demo health story: camps offer basic checks and referrals.","డెమో ఆరోగ్య కథనం: శిబిరాల్లో ప్రాథమిక పరీక్షలు, రెఫరల్ సేవలు ఉంటాయి."],
[103,"agri",1,"Venkata Rao","","Kharif sowing picks up with drip irrigation","డ్రిప్ ఇరిగేషన్‌తో ఖరీఫ్ విత్తనాలు ఊపందుకున్నాయి","Demo farm story: farmers report better water use in sample districts.","డెమో వ్యవసాయ కథనం: నమూనా జిల్లాల్లో నీటి వినియోగం మెరుగైందని రైతులు చెబుతున్నారు."],
[104,"agri",3,"Priya Sharma","","Chilli and cotton prices steady in regional markets","ప్రాంతీయ మార్కెట్లలో మిర్చి, పత్తి ధరలు స్థిరం","Demo market report: prices are sample figures for layout testing.","డెమో మార్కెట్ నివేదిక: ధరలు లేఅవుట్ పరీక్ష కోసం నమూనా సంఖ్యలు."],
[105,"crime",2,"Mohammed Irfan","","Cyber fraud cases: police urge caution on OTP calls","సైబర్ మోసాలు: ఓటీపీ కాల్స్ పట్ల జాగ్రత్త","Demo crime story: a sample advisory on phishing and fake helpline calls.","డెమో క్రైమ్ కథనం: ఫిషింగ్, నకిలీ హెల్ప్‌లైన్ కాల్స్‌పై నమూనా హెచ్చరిక."],
[106,"crime",4,"Suresh Naidu","","Court directs fast-track hearing in property dispute","ఆస్తి వివాద కేసులో వేగవంతమైన విచారణకు కోర్టు ఆదేశం","Demo legal story: a fictional case used to demonstrate court reporting.","డెమో న్యాయ కథనం: కోర్టు రిపోర్టింగ్ ప్రదర్శనకు ఉపయోగించిన కల్పిత కేసు."],
[107,"life",2,"Divya Chandra","","Weekend guide: heritage walks and food trails","వారాంతపు గైడ్: వారసత్వ నడకలు, ఆహార ప్రయాణం","Demo lifestyle guide: sample routes for a relaxed weekend.","డెమో జీవనశైలి గైడ్: వారాంతానికి నమూనా మార్గాలు."],
[108,"life",4,"Sravya Datla","","Home gardening ideas for small city balconies","చిన్న నగర బాల్కనీల కోసం ఇంటి తోట ఆలోచనలు","Demo lifestyle story: container plants and vertical planters explained.","డెమో జీవనశైలి కథనం: కుండీ మొక్కలు, వర్టికల్ ప్లాంటర్ల వివరాలు."],
[109,"edit",1,"Kiran Varma","","Public trust in local journalism must be earned daily","స్థానిక జర్నలిజంపై నమ్మకం రోజురోజుకూ సంపాదించాలి","Demo editorial: a sample column on accuracy and accountability.","డెమో సంపాదకీయం: ఖచ్చితత్వం, జవాబుదారీతనంపై నమూనా కాలమ్."],
[110,"edit",3,"Meghana Iyer","","Why district stories matter more than headlines","జిల్లా కథనాలు ఎందుకు ముఖ్యం","Demo opinion: a sample piece on the value of grounded reporting.","డెమో అభిప్రాయం: క్షేత్రస్థాయి రిపోర్టింగ్ విలువపై నమూనా వ్యాసం."]
];

/* Normalised article objects used by the whole app */
const ARTS=RAW.map(r=>({
  id:r[0],cat:r[1],days:r[2],author:r[3],dist:r[4],
  en:{t:r[5],s:r[7]},te:{t:r[6],s:r[8]},
  date:new Date(Date.now()-r[2]*864e5-(r[0]%11)*36e5),
  views:(r[0]*37)%900+120,
  img:'https://picsum.photos/seed/praja'+r[0]+'/960/600'
}));
