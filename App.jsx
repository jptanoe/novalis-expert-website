import { useState, useEffect, useRef } from "react";

/* ============================================================
   NOVALIS EXPERT — Site Web v2
   Architecture validée — Sans tarifs, témoignages fictifs,
   clients inventés ou chiffres non vérifiés
   ============================================================ */

// ── CONFIG — REMPLACER CES 3 VALEURS AVANT MISE EN LIGNE ─────
const CONFIG = {
  FORMSPREE_ID: "YOUR_FORMSPREE_ID",  // 1. Créer compte sur formspree.io → obtenir ID ex: xpzgkrqw
  CALENDLY_URL: "YOUR_CALENDLY_URL",   // 2. Créer compte sur calendly.com → copier votre URL
  GA_ID:        "YOUR_GA_ID",           // 3. Google Analytics → ex: G-XXXXXXXXXX
  WA_NUMBER:    "2250703373738",
};
const WA_NUMBER = CONFIG.WA_NUMBER;
// ── HOOK FORMSPREE RÉEL ────────────────────────────────────────
function useFormspree() {
  const [state, setState] = useState({ sending:false, sent:false, error:null });
  const submit = async (formId, data) => {
    setState({ sending:true, sent:false, error:null });
    try {
      const res = await fetch('https://formspree.io/f/' + formId, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setState({ sending:false, sent:true, error:null });
      else setState({ sending:false, sent:false, error:'Erreur. Contactez-nous par WhatsApp.' });
    } catch {
      setState({ sending:false, sent:false, error:'Problème de connexion. Réessayez.' });
    }
  };
  return [state, submit];
}

const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

const NAV = [
  { id: "accueil",    label: "Accueil" },
  { id: "cabinet",    label: "Le Cabinet" },
  { id: "expertises", label: "Nos Expertises" },
  { id: "formations", label: "Formations" },
  { id: "entreprises",label: "Entreprises" },
  { id: "fdfp",       label: "Financement FDFP" },
  { id: "actualites", label: "Actualités" },
  { id: "contact",    label: "Contact" },
];

const FORMATIONS = [
  {
    phase:1, id:"ia-generative", icon:"🤖", tag:"Formation phare",
    title:"IA Générative pour le Travail & le Business",
    duree:"3 jours", mode:"Présentiel / Hybride", niveau:"Tous niveaux",
    public:"Dirigeants, managers, commerciaux, entrepreneurs",
    objectifs:[
      "Maîtriser ChatGPT, Gemini et Claude pour automatiser ses tâches quotidiennes",
      "Produire des textes, présentations et analyses avec l'IA en quelques minutes",
      "Intégrer l'IA dans la gestion et le pilotage de son activité",
      "Gagner significativement en productivité et qualité de production",
    ],
    programme:[
      "Jour 1 — Comprendre l'IA : fondamentaux, outils clés, prompting efficace",
      "Jour 2 — Applications business : rédaction, analyse, automatisation",
      "Jour 3 — Cas pratiques sectoriels et plan d'action personnel",
    ],
    competences:["Prompting avancé","Automatisation","Productivité IA","Veille intelligente"],
  },
  {
    phase:1, id:"facebook-wa", icon:"📱", tag:"Bestseller",
    title:"Marketing Facebook & WhatsApp Business",
    duree:"2 jours", mode:"Présentiel / En ligne", niveau:"Débutant à intermédiaire",
    public:"Commerçants, entrepreneurs, responsables marketing, PME",
    objectifs:[
      "Créer et optimiser une page Facebook professionnelle à fort impact",
      "Lancer des campagnes publicitaires ciblées et rentables",
      "Utiliser WhatsApp Business pour convertir et fidéliser ses clients",
      "Mesurer, analyser et optimiser ses performances digitales",
    ],
    programme:[
      "Jour 1 — Facebook Business : page, contenu, publicité ciblée",
      "Jour 2 — WhatsApp Business : catalogue, automatisation, scripts de vente",
    ],
    competences:["Facebook Ads","WhatsApp Business","Création de contenu","Analytics"],
  },
  {
    phase:1, id:"tresorerie", icon:"💰", tag:"",
    title:"Gestion de Trésorerie PME",
    duree:"2 jours", mode:"Présentiel", niveau:"Intermédiaire",
    public:"Dirigeants PME, DAF, comptables, gérants",
    objectifs:[
      "Construire un tableau de bord de trésorerie opérationnel",
      "Anticiper et prévenir les tensions de liquidité",
      "Optimiser les flux financiers entrants et sortants",
      "Négocier avec sa banque en position de force",
    ],
    programme:[
      "Jour 1 — Diagnostic financier, lecture des flux, outils de pilotage",
      "Jour 2 — Prévisions, plan de trésorerie, relation bancaire",
    ],
    competences:["Budget prévisionnel","Pilotage trésorerie","Analyse financière","Relation bancaire"],
  },
  {
    phase:1, id:"vente-closing", icon:"🤝", tag:"Très demandé",
    title:"Techniques de Vente, Négociation & Closing",
    duree:"3 jours", mode:"Présentiel / Hybride", niveau:"Tous niveaux",
    public:"Commerciaux, entrepreneurs, managers, indépendants",
    objectifs:[
      "Maîtriser les étapes d'un cycle de vente performant",
      "Conclure davantage de ventes grâce aux techniques de closing",
      "Négocier avec assurance face à tous les profils d'acheteurs",
      "Construire une relation client durable",
    ],
    programme:[
      "Jour 1 — Psychologie de l'acheteur, prospection, premier contact",
      "Jour 2 — Argumentation structurée, traitement des objections",
      "Jour 3 — Closing, fidélisation et suivi commercial",
    ],
    competences:["Closing","Négociation","Prospection","Fidélisation client"],
  },
  {
    phase:1, id:"importation", icon:"🌍", tag:"",
    title:"Importation Chine – Turquie – Dubaï",
    duree:"2 jours", mode:"Présentiel", niveau:"Débutant à intermédiaire",
    public:"Entrepreneurs, commerçants, importateurs débutants",
    objectifs:[
      "Identifier les bons fournisseurs et sécuriser ses achats",
      "Comprendre les Incoterms et les procédures douanières",
      "Calculer la rentabilité réelle d'une opération d'importation",
      "Structurer et lancer son activité d'importation-revente",
    ],
    programme:[
      "Jour 1 — Sourcing, sélection fournisseurs, Alibaba, gestion des risques",
      "Jour 2 — Logistique, procédures douanières, calcul de rentabilité",
    ],
    competences:["Sourcing international","Incoterms","Dédouanement","Rentabilité"],
  },
  {
    phase:2, id:"tiktok", icon:"🎵", tag:"Nouveau",
    title:"TikTok Business & Monétisation",
    duree:"2 jours", mode:"Présentiel / En ligne", niveau:"Débutant",
    public:"Entrepreneurs, créateurs de contenu, responsables marketing",
    objectifs:[
      "Créer du contenu viral au service de son business",
      "Développer rapidement une audience qualifiée sur TikTok",
      "Monétiser sa présence et générer des ventes via TikTok",
      "Maîtriser TikTok Ads pour accélérer sa croissance",
    ],
    programme:[
      "Jour 1 — Algorithme TikTok, création de contenu, tendances",
      "Jour 2 — TikTok for Business, Ads, monétisation, analytics",
    ],
    competences:["Création vidéo","TikTok Ads","Monétisation","Community building"],
  },
  {
    phase:2, id:"canva-capcut", icon:"🎨", tag:"",
    title:"Canva & CapCut : Visuels & Vidéos Professionnels",
    duree:"2 jours", mode:"Présentiel / En ligne", niveau:"Débutant",
    public:"Entrepreneurs, community managers, assistantes, PME",
    objectifs:[
      "Créer des visuels professionnels sans être graphiste",
      "Produire des vidéos engageantes pour les réseaux sociaux",
      "Construire une identité visuelle cohérente",
      "Gagner du temps grâce aux templates et aux fonctionnalités IA",
    ],
    programme:[
      "Jour 1 — Canva Pro : templates, brand kit, présentations, posts réseaux",
      "Jour 2 — CapCut : montage vidéo, sous-titres automatiques, effets",
    ],
    competences:["Design graphique","Montage vidéo","Brand identity","Réseaux sociaux"],
  },
  {
    phase:2, id:"community-mgt", icon:"📣", tag:"Populaire",
    title:"Community Management Professionnel",
    duree:"3 jours", mode:"Présentiel / Hybride", niveau:"Intermédiaire",
    public:"CM en poste, entrepreneurs, agences, responsables marketing",
    objectifs:[
      "Gérer professionnellement les réseaux sociaux d'une marque",
      "Concevoir une ligne éditoriale cohérente",
      "Engager et développer une communauté active",
      "Mesurer le retour sur investissement des actions social media",
    ],
    programme:[
      "Jour 1 — Stratégie social media, ligne éditoriale, outils",
      "Jour 2 — Création de contenu, planification, modération",
      "Jour 3 — Analytics, reporting, campagnes publicitaires",
    ],
    competences:["Social media strategy","Content creation","Analytics","Ads management"],
  },
  {
    phase:2, id:"recouvrement", icon:"📋", tag:"",
    title:"Recouvrement de Créances & Relance Client",
    duree:"2 jours", mode:"Présentiel", niveau:"Intermédiaire",
    public:"DAF, comptables, dirigeants, responsables commerciaux",
    objectifs:[
      "Mettre en place un processus de relance structuré et efficace",
      "Négocier le recouvrement à l'amiable",
      "Connaître les recours juridiques applicables selon le cadre légal local",
      "Réduire le délai moyen de paiement",
    ],
    programme:[
      "Jour 1 — Prévention des impayés, processus de relance, scripts",
      "Jour 2 — Négociation, mise en demeure, recours juridiques",
    ],
    competences:["Relance client","Négociation","Procédures juridiques","Cash management"],
  },
  {
    phase:2, id:"compta-caisse", icon:"🗂️", tag:"",
    title:"Comptabilité de Caisse & Gestion des Stocks",
    duree:"2 jours", mode:"Présentiel", niveau:"Débutant à intermédiaire",
    public:"Gérants de commerce, caissiers, comptables débutants",
    objectifs:[
      "Tenir une comptabilité de caisse rigoureuse au quotidien",
      "Gérer les stocks pour éviter pertes et ruptures",
      "Produire des états financiers simples",
      "Mettre en place un contrôle interne adapté",
    ],
    programme:[
      "Jour 1 — Journal de caisse, livres comptables, clôture journalière",
      "Jour 2 — Gestion des stocks, inventaire, ratios de gestion",
    ],
    competences:["Tenue de caisse","Gestion de stocks","États financiers","Contrôle interne"],
  },
];

const FDFP_DOMAINS = [
  {
    icon:"🏢", color:"#002B6B",
    title:"Management & Entrepreneuriat",
    subs:["Organisation, gestion des coopératives et groupements","Assurance qualité, normes","Audit interne, analyse et résolution de problèmes","Encadrement et animation des hommes, coaching","Conception, gestion, conduite de projet","Organisation, gestion unité ou ligne de production","Autres domaines administration d'entreprise"],
  },
  {
    icon:"👥", color:"#1a4a8a",
    title:"Spécialités GRH",
    subs:["Administration du personnel","Gestion du personnel","Condition de travail, ergonomie","Gestion de la formation continue","Hygiène et sécurité au travail","Code du travail, conventions collectives","Relations sociales, gestion des conflits","Analyse sociale, audit social"],
  },
  {
    icon:"💻", color:"#003d99",
    title:"Spécialités Informatique",
    subs:["Généralités et logiciels de base","Analyse, conduite de projet informatique","Langages et programmation","Modes et systèmes d'exploitation","Bases de données","Informatique de gestion","Réseaux","Web, internet, nouvelles technologies"],
  },
  {
    icon:"📊", color:"#8B6914",
    title:"Échanges & Gestion",
    subs:["Commerce, marketing et ventes","Finances, banques, assurances","Comptabilité, gestion financière, fiscalité","Autres échanges et gestion"],
  },
  {
    icon:"⚡", color:"#B8860B",
    title:"Électricité & Électronique",
    subs:["Électricité, électronique, bases et applications","Production d'électricité, distribution, lignes","Électrotechnique, électromécanique","Lecture schémas, métrologie","Montage, câblage, dépannage","Microélectronique","Télécom et téléphonie, réseaux, transmission"],
  },
];

const EXPERTISES = [
  { icon:"🎓", title:"Formation Professionnelle", target:"formations",
    desc:"Programmes animés par des praticiens. Intra, inter, sur mesure, présentiel ou digital. Contenus directement applicables sur le terrain.", cta:"Voir le catalogue" },
  { icon:"🧭", title:"Conseil Stratégique", target:"contact",
    desc:"Accompagnement des dirigeants dans la définition de leur stratégie, l'analyse de leur environnement et la mise en œuvre de leur plan de développement.", cta:"Nous consulter" },
  { icon:"🔍", title:"Audit & Diagnostic", target:"contact",
    desc:"Diagnostic organisationnel, audit des compétences, analyse des processus. Un regard externe rigoureux pour identifier les leviers de performance.", cta:"Demander un audit" },
  { icon:"📐", title:"Études & Recherche Appliquée", target:"contact",
    desc:"Études sectorielles, analyses de marché et rapports thématiques pour éclairer vos décisions stratégiques avec des données structurées.", cta:"Nous solliciter" },
  { icon:"⚙️", title:"Ingénierie des Compétences", target:"contact",
    desc:"Conception de référentiels de compétences, élaboration de plans de formation pluriannuels, ingénierie pédagogique sur mesure.", cta:"En savoir plus" },
  { icon:"📋", title:"Accompagnement FDFP", target:"fdfp",
    desc:"Montage et dépôt complet des dossiers FDFP. Identification des formations éligibles, constitution du dossier et suivi de la prise en charge.", cta:"Être accompagné" },
  { icon:"🔄", title:"Transformation Organisationnelle", target:"contact",
    desc:"Accompagnement en période de mutation : restructuration, changement de culture, digitalisation des pratiques, conduite du changement.", cta:"Discuter de votre projet" },
  { icon:"📈", title:"Développement des Compétences", target:"contact",
    desc:"Dispositifs de développement des compétences individuelles et collectives. Coaching de managers, co-développement, mentorat professionnel.", cta:"Obtenir une proposition" },
];

const ARTICLES = [
  { cat:"Intelligence Artificielle", catColor:"#002B6B", icon:"🤖", date:"Mai 2025", readTime:"6 min",
    title:"ChatGPT, Gemini, Claude : quel outil IA choisir pour votre entreprise ?",
    excerpt:"L'IA générative s'impose dans les pratiques professionnelles. Comment choisir l'outil adapté à votre activité et en tirer un avantage concret dès aujourd'hui ?" },
  { cat:"Entrepreneuriat", catColor:"#D4A017", icon:"🚀", date:"Avril 2025", readTime:"8 min",
    title:"Erreurs fréquentes dans la gestion d'une PME",
    excerpt:"Financement insuffisant, mauvaise gestion de trésorerie, absence de stratégie commerciale : certains pièges sont récurrents. Les identifier, c'est déjà les éviter." },
  { cat:"RH & Management", catColor:"#003580", icon:"👥", date:"Avril 2025", readTime:"7 min",
    title:"Guide : comment utiliser le FDFP pour financer vos formations ?",
    excerpt:"Le Fonds de Développement de la Formation Professionnelle est un levier stratégique sous-exploité par de nombreuses entreprises." },
  { cat:"Vente & Négociation", catColor:"#1a4a8a", icon:"🤝", date:"Mars 2025", readTime:"9 min",
    title:"Les techniques de closing qui convertissent vraiment",
    excerpt:"Derrière chaque vente réussie, une méthode. Psychologie de l'acheteur, gestion des objections, closing : les approches qui fonctionnent réellement sur le terrain." },
  { cat:"Marketing Digital", catColor:"#B8860B", icon:"📱", date:"Mars 2025", readTime:"5 min",
    title:"WhatsApp Business : transformer ses contacts en clients",
    excerpt:"WhatsApp est devenu l'un des premiers canaux de communication commerciale. Voici comment en faire un véritable outil de croissance pour votre activité." },
  { cat:"Gestion & Trésorerie", catColor:"#8B6914", icon:"💰", date:"Février 2025", readTime:"7 min",
    title:"Trésorerie PME : pourquoi des entreprises rentables traversent des crises de liquidité",
    excerpt:"Une entreprise peut afficher des bénéfices comptables et traverser simultanément une crise de trésorerie. Ce paradoxe se comprend et se prévient." },
];

// ── COMPOSANTS UI ──────────────────────────────────────────────

function Logo({ size = 44, light = true }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
      <svg width={size} height={size*1.15} viewBox="0 0 100 115" fill="none">
        <path d="M50 4 L92 20 L92 68 C92 90 72 106 50 114 C28 106 8 90 8 68 L8 20 Z" fill="#002B6B"/>
        <path d="M50 4 L92 20 L92 68 C92 90 72 106 50 114 L50 4 Z" fill="#D4A017"/>
        <text x="16" y="76" fill="white" fontSize="44" fontWeight="900" fontFamily="Georgia,serif">N</text>
        <text x="53" y="76" fill="white" fontSize="44" fontWeight="900" fontFamily="Georgia,serif">E</text>
      </svg>
      <div>
        <div style={{ fontSize:size*0.36, fontWeight:900, color:light?"white":"#002B6B", letterSpacing:3, lineHeight:1, fontFamily:"Georgia,serif" }}>NOVALIS</div>
        <div style={{ fontSize:size*0.21, fontWeight:700, color:"#D4A017", letterSpacing:4, lineHeight:1.5 }}>— EXPERT —</div>
      </div>
    </div>
  );
}

function Label({ text }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div style={{ width:26, height:2, background:"#D4A017" }}/>
      <span style={{ color:"#D4A017", fontSize:12, fontWeight:700, letterSpacing:2.5, textTransform:"uppercase" }}>{text}</span>
      <div style={{ width:26, height:2, background:"#D4A017" }}/>
    </div>
  );
}

function H2({ children, light=false }) {
  return <h2 style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:800, lineHeight:1.2, color:light?"white":"#002B6B", fontFamily:"Georgia,serif", marginBottom:16 }}>{children}</h2>;
}

function GoldBtn({ children, onClick }) {
  const [h,setH]=useState(false);
  return <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick} style={{ padding:"14px 30px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", border:"none", background:h?"#b8891a":"#D4A017", color:"white", transition:"all 0.2s", boxShadow:"0 4px 18px rgba(212,160,23,0.35)", whiteSpace:"nowrap" }}>{children}</button>;
}

function OutlineBtn({ children, onClick, dark=false }) {
  const [h,setH]=useState(false);
  return <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick} style={{ padding:"14px 30px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", background:h?(dark?"#002B6B":"rgba(255,255,255,0.12)"):"transparent", border:dark?"2px solid #002B6B":"2px solid rgba(255,255,255,0.42)", color:dark?(h?"white":"#002B6B"):"white", transition:"all 0.2s", whiteSpace:"nowrap" }}>{children}</button>;
}

function WABtn() {
  return (
    <a href={waLink("Bonjour NOVALIS EXPERT, je souhaite des informations sur vos services.")} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ position:"fixed", bottom:28, right:28, zIndex:9999, width:62, height:62, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 24px rgba(37,211,102,0.55)", textDecoration:"none", animation:"waPulse 2.5s infinite" }}>
      <svg viewBox="0 0 32 32" width="30" height="30" fill="white"><path d="M16 2C8.27 2 2 8.27 2 16c0 2.42.64 4.68 1.75 6.64L2 30l7.56-1.73C11.39 29.38 13.64 30 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.3 19.78c-.32.9-1.88 1.71-2.6 1.82-.66.1-1.48.14-2.39-.15-.55-.18-1.27-.41-2.18-.8-3.83-1.65-6.32-5.52-6.51-5.78-.19-.26-1.53-2.03-1.53-3.88s.97-2.74 1.32-3.12c.34-.37.75-.47 1-.47s.5.003.71.013c.23.01.54-.087.84.643.315.754 1.07 2.607 1.163 2.795.09.19.155.41.03.66-.12.25-.186.403-.372.62-.186.22-.393.49-.56.658-.186.185-.38.387-.163.758.217.373.966 1.592 2.075 2.58 1.424 1.27 2.625 1.663 2.997 1.85.37.188.585.157.802-.094.217-.25.93-1.085 1.178-1.458.247-.374.495-.313.836-.188.34.126 2.17 1.022 2.54 1.208.37.188.618.28.71.435.093.157.093.907-.225 1.805z"/></svg>
    </a>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────
function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useIsMobile();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, background:scrolled||menuOpen?"rgba(0,20,60,0.97)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid rgba(212,160,23,0.2)":"none", transition:"all 0.3s" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <div onClick={()=>{onNav("accueil");setMenuOpen(false);}}><Logo size={34} light/></div>
        {mobile ? (
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", color:"white", fontSize:26, cursor:"pointer", padding:8, lineHeight:1 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        ) : (
          <div style={{ display:"flex", alignItems:"center", gap:2 }}>
            {NAV.slice(0,7).map(n=>(
              <button key={n.id} onClick={()=>onNav(n.id)} style={{ background:"none", border:"none", color:active===n.id?"#D4A017":"rgba(255,255,255,0.82)", fontSize:13, fontWeight:active===n.id?700:500, cursor:"pointer", padding:"8px 11px", borderRadius:6, borderBottom:active===n.id?"2px solid #D4A017":"2px solid transparent", transition:"color 0.2s" }}>{n.label}</button>
            ))}
            <button onClick={()=>onNav("contact")} style={{ marginLeft:12, background:"#D4A017", color:"white", border:"none", padding:"10px 22px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>Nous contacter</button>
          </div>
        )}
      </div>
      {mobile && menuOpen && (
        <div style={{ background:"rgba(0,15,46,0.98)", padding:"8px 0 20px", borderTop:"1px solid rgba(212,160,23,0.2)" }}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>{onNav(n.id);setMenuOpen(false);}} style={{ display:"block", width:"100%", background:"none", border:"none", color:active===n.id?"#D4A017":"rgba(255,255,255,0.85)", fontSize:15, fontWeight:active===n.id?700:500, cursor:"pointer", padding:"13px 24px", textAlign:"left", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{n.label}</button>
          ))}
          <div style={{ padding:"14px 20px 0" }}>
            <button onClick={()=>{onNav("contact");setMenuOpen(false);}} style={{ width:"100%", background:"#D4A017", color:"white", border:"none", padding:"13px", borderRadius:8, fontSize:15, fontWeight:700, cursor:"pointer" }}>Nous contacter</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── HERO ───────────────────────────────────────────────────────
function Hero({ onNav }) {
  const mobile = useIsMobile();
  return (
    <section id="accueil" style={{ minHeight:"100vh", background:"linear-gradient(145deg,#000f2e 0%,#001d52 40%,#002B6B 70%,#003580 100%)", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"8%", right:"4%", width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,160,23,0.1) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-10%", left:"-5%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,160,23,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:0, right:0, width:5, height:"100%", background:"linear-gradient(to bottom,#D4A017 0%,transparent 100%)", pointerEvents:"none" }}/>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:mobile?"90px 20px 60px":"110px 28px 80px", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1.1fr 0.9fr", gap:mobile?32:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(212,160,23,0.12)", border:"1px solid rgba(212,160,23,0.35)", borderRadius:100, padding:"7px 18px", marginBottom:28 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#D4A017", display:"inline-block" }}/>
              <span style={{ color:"#D4A017", fontSize:12.5, fontWeight:600, letterSpacing:0.5 }}>Accréditation FDFP en cours — Formation & Conseil</span>
            </div>

            <h1 style={{ fontSize:"clamp(2.1rem,4.2vw,3.5rem)", fontWeight:900, lineHeight:1.12, color:"white", marginBottom:22, fontFamily:"Georgia,serif" }}>
              Conseil. Formation.<br/><span style={{ color:"#D4A017" }}>Expertise</span> au service<br/>de vos organisations.
            </h1>

            <p style={{ color:"rgba(255,255,255,0.78)", fontSize:"1.07rem", lineHeight:1.78, marginBottom:38, maxWidth:540 }}>
              NOVALIS EXPERT est un cabinet de conseil, de formation professionnelle et d'ingénierie des compétences. 
              Né de plus de quinze années d'expérience terrain au sein d'ARYAMA, nous concentrons dans une structure 
              dédiée une expertise reconnue au service des organisations.
            </p>

            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:46 }}>
              <GoldBtn onClick={()=>onNav("expertises")}>Découvrir le cabinet →</GoldBtn>
              <OutlineBtn onClick={()=>onNav("contact")}>Nous contacter</OutlineBtn>
            </div>

            <div style={{ display:"flex", gap:30, flexWrap:"wrap" }}>
              {[{icon:"🏅",text:"Accréditation FDFP en cours"},{icon:"⏱",text:"+15 ans d'expérience terrain"},{icon:"🎯",text:"Formations orientées résultats"}].map((b,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:18 }}>{b.icon}</span>
                  <span style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:500 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ color:"rgba(255,255,255,0.45)", fontSize:11, letterSpacing:2, textTransform:"uppercase", fontWeight:600, marginBottom:4 }}>Domaines d'intervention</div>
            {[
              {icon:"🎓",label:"Formation professionnelle",sub:"Intra, inter, sur mesure, digital"},
              {icon:"🧭",label:"Conseil stratégique",sub:"Accompagnement des dirigeants"},
              {icon:"🔍",label:"Audit & diagnostic",sub:"Analyse organisationnelle et des compétences"},
              {icon:"⚙️",label:"Ingénierie des compétences",sub:"Référentiels, parcours, pédagogie"},
              {icon:"📋",label:"Accompagnement FDFP",sub:"Montage et suivi de dossiers"},
            ].map((c,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.055)", border:"1px solid rgba(255,255,255,0.1)", borderLeft:"3px solid #D4A017", borderRadius:10, padding:"13px 18px", display:"flex", alignItems:"center", gap:14, backdropFilter:"blur(8px)" }}>
                <span style={{ fontSize:24, flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ color:"white", fontWeight:700, fontSize:13.5 }}>{c.label}</div>
                  <div style={{ color:"rgba(255,255,255,0.55)", fontSize:11.5, marginTop:2 }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── RÉASSURANCE ────────────────────────────────────────────────
function ReassuranceBand() {
  const mobile = useIsMobile();
  return (
    <div style={{ background:"#D4A017", padding:"36px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(4,1fr)", gap:20 }}>
        {[
          {icon:"⏱",label:"+15 ans",sub:"d'expérience terrain"},
          {icon:"🏅",label:"Accréditation FDFP",sub:"Démarche en cours"},
          {icon:"🎯",label:"Accompagnement sur mesure",sub:"Chaque mission est unique"},
          {icon:"📈",label:"Orienté résultats",sub:"Applicable dès la formation"},
        ].map((item,i)=>(
          <div key={i} style={{ textAlign:"center" }}>
            <div style={{ fontSize:30, marginBottom:6 }}>{item.icon}</div>
            <div style={{ fontWeight:800, color:"white", fontSize:16, marginBottom:3 }}>{item.label}</div>
            <div style={{ color:"rgba(255,255,255,0.82)", fontSize:13 }}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CABINET ────────────────────────────────────────────────────
function CabinetSection({ onNav }) {
  const mobile = useIsMobile();
  return (
    <section id="cabinet" style={{ background:"white", padding:"90px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:70, alignItems:"center" }}>
          <div>
            <Label text="Le Cabinet"/>
            <H2>Une expertise terrain concentrée dans une structure dédiée</H2>
            <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:18, fontSize:15 }}>
              NOVALIS EXPERT est un cabinet de conseil, de formation professionnelle et d'ingénierie des compétences, 
              créé pour spécialiser et structurer une activité déjà portée depuis plusieurs années par <strong style={{ color:"#002B6B" }}>ARYAMA</strong>.
            </p>
            <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:18, fontSize:15 }}>
              Au fil de son développement, ARYAMA — active depuis plus de quinze ans dans les télécommunications, 
              l'énergie, l'informatique et l'ingénierie — a conduit de nombreuses actions de formation, de transfert 
              de compétences et de conseil auprès d'entreprises et d'équipes opérationnelles.
            </p>
            <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:32, fontSize:15 }}>
              La création de NOVALIS EXPERT concentre cette expertise dans une structure entièrement dédiée, 
              orientée vers la formation, le conseil, l'audit, les études et l'accompagnement des organisations.
            </p>
            <OutlineBtn dark onClick={()=>onNav("expertises")}>Nos expertises →</OutlineBtn>
          </div>

          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:15, marginBottom:22 }}>
              {[
                {icon:"🔭",title:"Notre Vision",text:"Devenir le cabinet de référence en formation, conseil et développement des compétences, au service des organisations de toutes tailles et de tous horizons."},
                {icon:"🎯",title:"Notre Mission",text:"Développer des compétences opérationnelles immédiatement applicables, au service de la performance durable des organisations."},
                {icon:"💎",title:"Nos Valeurs",text:"Excellence, rigueur, pragmatisme terrain, adaptation culturelle, intégrité et orientation résultats."},
              ].map((v,i)=>(
                <div key={i} style={{ background:"#F5F7FA", borderRadius:12, padding:"18px 22px", borderLeft:"4px solid #D4A017", display:"flex", gap:16, alignItems:"flex-start" }}>
                  <span style={{ fontSize:26, flexShrink:0 }}>{v.icon}</span>
                  <div>
                    <div style={{ fontWeight:800, color:"#002B6B", fontSize:14, marginBottom:5 }}>{v.title}</div>
                    <div style={{ color:"#4a5568", fontSize:13.5, lineHeight:1.65 }}>{v.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:"linear-gradient(135deg,#002B6B,#003d99)", borderRadius:12, padding:"22px 24px" }}>
              <div style={{ fontWeight:800, color:"white", marginBottom:12, fontSize:14 }}>🏛️ Notre approche pédagogique</div>
              {["Formateurs praticiens avec expérience terrain réelle","Cas d'usage concrets tirés de situations réelles","Pédagogie active : exercices, mises en situation","Supports opérationnels fournis à chaque participant","Accompagnement post-formation disponible sur demande"].map((e,i)=>(
                <div key={i} style={{ display:"flex", gap:10, marginBottom:9, alignItems:"flex-start" }}>
                  <span style={{ color:"#D4A017", fontWeight:700, flexShrink:0, fontSize:15 }}>✓</span>
                  <span style={{ color:"rgba(255,255,255,0.85)", fontSize:13, lineHeight:1.5 }}>{e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── EXPERTISES ────────────────────────────────────────────────
function ExpertisesSection({ onNav }) {
  const mobile = useIsMobile();
  const [hov, setHov] = useState(null);
  return (
    <section id="expertises" style={{ background:"#F5F7FA", padding:"90px 28px" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:54 }}>
          <Label text="Nos expertises"/>
          <H2>Un cabinet multi-expertises au service des organisations</H2>
          <p style={{ color:"#4a5568", maxWidth:640, margin:"0 auto", fontSize:15, lineHeight:1.78 }}>
            La formation professionnelle est notre activité phare — mais NOVALIS EXPERT est avant tout 
            un cabinet de conseil et d'ingénierie au spectre d'intervention plus large.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(4,1fr)", gap:20 }}>
          {EXPERTISES.map((e,i)=>(
            <div key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{ background:hov===i?"#002B6B":"white", borderRadius:14, padding:"26px 22px", border:hov===i?"2px solid #D4A017":"2px solid transparent", boxShadow:hov===i?"0 12px 40px rgba(0,43,107,0.25)":"0 2px 14px rgba(0,0,0,0.06)", transition:"all 0.25s", cursor:"default" }}>
              <div style={{ fontSize:38, marginBottom:14 }}>{e.icon}</div>
              <div style={{ fontWeight:800, color:hov===i?"white":"#002B6B", fontSize:15, marginBottom:10, lineHeight:1.3 }}>{e.title}</div>
              <p style={{ color:hov===i?"rgba(255,255,255,0.75)":"#4a5568", fontSize:13, lineHeight:1.7, marginBottom:18 }}>{e.desc}</p>
              <button onClick={()=>onNav(e.target)} style={{ background:"none", border:`1px solid ${hov===i?"#D4A017":"#002B6B"}`, color:hov===i?"#D4A017":"#002B6B", padding:"7px 14px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}>{e.cta} →</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:48 }}>
          <button onClick={()=>onNav("contact")} style={{ background:"#002B6B", color:"white", border:"none", padding:"16px 36px", borderRadius:10, fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px rgba(0,43,107,0.25)" }}>
            Nous consulter pour votre besoin spécifique →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── FORMATIONS ─────────────────────────────────────────────────
function FormationsSection({ onNav }) {
  const mobile = useIsMobile();
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const filtered = filter==="all" ? FORMATIONS : FORMATIONS.filter(f=>String(f.phase)===filter);

  return (
    <section id="formations" style={{ background:"white", padding:"90px 28px" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:46 }}>
          <Label text="Catalogue"/>
          <H2>Nos formations</H2>
          <p style={{ color:"#4a5568", maxWidth:580, margin:"0 auto", fontSize:15, lineHeight:1.78 }}>
            Des formations concrètes, animées par des praticiens, directement applicables. 
            Toutes nos formations sont éligibles aux dispositifs de financement FDFP.
          </p>
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:40, flexWrap:"wrap" }}>
          {[["all","Toutes les formations"],["1","Phase 1 — Lancement"],["2","Phase 2 — Développement"]].map(([val,label])=>(
            <button key={val} onClick={()=>setFilter(val)} style={{ padding:"10px 24px", borderRadius:100, border:filter===val?"none":"2px solid #e2e8f0", background:filter===val?"#002B6B":"white", color:filter===val?"white":"#4a5568", fontWeight:600, fontSize:13, cursor:"pointer", transition:"all 0.2s" }}>{label}</button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"repeat(3,1fr)", gap:22 }}>
          {filtered.map(f=>{
            const open = expanded===f.id;
            return (
              <div key={f.id} style={{ background:"white", borderRadius:14, border:"1px solid #e2e8f0", overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,0.05)", transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 10px 36px rgba(0,43,107,0.13)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,0.05)"}}>
                <div style={{ background:"linear-gradient(140deg,#001d52,#002B6B)", padding:"24px 22px 20px", position:"relative" }}>
                  {f.tag&&<span style={{ position:"absolute", top:14, right:14, background:"#D4A017", color:"white", fontSize:10.5, fontWeight:700, padding:"3px 10px", borderRadius:100 }}>{f.tag}</span>}
                  <div style={{ fontSize:34, marginBottom:10 }}>{f.icon}</div>
                  <div style={{ color:"white", fontWeight:800, fontSize:15, lineHeight:1.35 }}>{f.title}</div>
                  <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
                    {[f.duree,f.mode].map((tag,j)=>(
                      <span key={j} style={{ background:"rgba(255,255,255,0.14)", color:"rgba(255,255,255,0.9)", fontSize:11, padding:"3px 10px", borderRadius:100 }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding:"20px 22px" }}>
                  <div style={{ fontSize:13, color:"#4a5568", marginBottom:14, lineHeight:1.6 }}>
                    <span style={{ fontWeight:700, color:"#002B6B" }}>Public visé : </span>{f.public}
                  </div>
                  {open&&(
                    <div style={{ marginBottom:16 }}>
                      <div style={{ fontWeight:700, color:"#002B6B", fontSize:13, marginBottom:8 }}>Objectifs pédagogiques</div>
                      {f.objectifs.map((o,j)=>(
                        <div key={j} style={{ display:"flex", gap:7, marginBottom:5 }}>
                          <span style={{ color:"#D4A017", fontWeight:700, flexShrink:0 }}>✓</span>
                          <span style={{ fontSize:12.5, color:"#4a5568", lineHeight:1.55 }}>{o}</span>
                        </div>
                      ))}
                      <div style={{ fontWeight:700, color:"#002B6B", fontSize:13, margin:"14px 0 8px" }}>Programme</div>
                      {f.programme.map((p,j)=>(
                        <div key={j} style={{ fontSize:12.5, color:"#4a5568", marginBottom:5, lineHeight:1.5 }}>• {p}</div>
                      ))}
                      <div style={{ fontWeight:700, color:"#002B6B", fontSize:13, margin:"14px 0 8px" }}>Compétences acquises</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {f.competences.map((c,j)=>(
                          <span key={j} style={{ background:"#F5F7FA", color:"#002B6B", fontSize:11.5, padding:"4px 12px", borderRadius:100, border:"1px solid #e2e8f0", fontWeight:600 }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button onClick={()=>setExpanded(open?null:f.id)} style={{ background:"none", border:"none", color:"#D4A017", fontSize:12.5, fontWeight:700, cursor:"pointer", padding:0, marginBottom:14 }}>
                    {open?"▲ Réduire":"▼ Voir le détail complet"}
                  </button>
                  <div style={{ display:"flex", gap:9 }}>
                    <button onClick={()=>window.open(waLink(`Bonjour, je souhaite m'inscrire à la formation : ${f.title}`))} style={{ flex:1, background:"#002B6B", color:"white", border:"none", padding:"10px 8px", borderRadius:7, fontSize:12.5, fontWeight:700, cursor:"pointer" }}>S'inscrire</button>
                    <button onClick={()=>window.open(waLink(`Bonjour, je souhaite un devis pour la formation : ${f.title}`))} style={{ flex:1, background:"transparent", color:"#002B6B", border:"2px solid #002B6B", padding:"10px 8px", borderRadius:7, fontSize:12.5, fontWeight:700, cursor:"pointer" }}>Demander un devis</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background:"#F5F7FA", border:"2px solid #D4A017", borderRadius:14, padding:"24px 32px", marginTop:44, display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontWeight:800, color:"#002B6B", marginBottom:5, fontSize:15 }}>🏅 Toutes nos formations sont éligibles au financement FDFP</div>
            <div style={{ color:"#4a5568", fontSize:13.5 }}>Votre entreprise cotise au FDFP ? Utilisez vos droits à la formation. Nous montons votre dossier.</div>
          </div>
          <button onClick={()=>onNav("fdfp")} style={{ background:"#D4A017", color:"white", border:"none", padding:"13px 26px", borderRadius:8, fontWeight:700, fontSize:13.5, cursor:"pointer", whiteSpace:"nowrap" }}>En savoir sur le financement FDFP →</button>
        </div>
      </div>
    </section>
  );
}

// ── ENTREPRISES ────────────────────────────────────────────────
function EntreprisesSection({ onNav }) {
  const mobile = useIsMobile();
  return (
    <section id="entreprises" style={{ background:"#F5F7FA", padding:"90px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:54 }}>
          <Label text="Solutions entreprises"/>
          <H2>Nous accompagnons vos équipes, vous récoltez les résultats</H2>
          <p style={{ color:"#4a5568", maxWidth:580, margin:"0 auto", fontSize:15, lineHeight:1.78 }}>
            NOVALIS EXPERT intervient auprès des entreprises de toute taille — PME, grandes entreprises, 
            institutions — avec une approche toujours personnalisée.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"repeat(3,1fr)", gap:22, marginBottom:46 }}>
          {[
            {icon:"🏢",title:"Formation intra-entreprise",tag:"Le plus demandé",desc:"Nos formateurs se déplacent dans vos locaux. Planning adapté à votre activité. Programme ajusté à vos équipes."},
            {icon:"🌐",title:"Formation inter-entreprises",tag:"",desc:"Sessions ouvertes en présentiel. Échanges enrichissants avec des professionnels issus d'autres secteurs et d'autres horizons."},
            {icon:"🎨",title:"Formation sur mesure",tag:"Sur devis",desc:"Programme entièrement conçu depuis un audit de vos besoins. Contenus, durée et pédagogie entièrement personnalisés."},
            {icon:"🔍",title:"Audit des besoins en formation",tag:"",desc:"Diagnostic complet de vos besoins en compétences. Plan de formation annuel structuré, priorisé et budgété."},
            {icon:"🤝",title:"Coaching & accompagnement",tag:"",desc:"Suivi individuel ou collectif de vos managers et équipes. Ancrage des apprentissages dans la durée."},
            {icon:"📋",title:"Ingénierie pédagogique",tag:"",desc:"Conception de parcours complets : référentiels de compétences, modules, évaluations et dispositifs de capitalisation."},
          ].map((s,i)=>(
            <div key={i} style={{ background:"white", borderRadius:14, padding:"26px 22px", border:"1px solid #e2e8f0", position:"relative", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
              {s.tag&&<span style={{ position:"absolute", top:16, right:16, background:s.tag==="Sur devis"?"#D4A017":"#002B6B", color:"white", fontSize:10.5, fontWeight:700, padding:"3px 10px", borderRadius:100 }}>{s.tag}</span>}
              <div style={{ fontSize:36, marginBottom:12 }}>{s.icon}</div>
              <div style={{ fontWeight:800, color:"#002B6B", fontSize:15, marginBottom:10 }}>{s.title}</div>
              <div style={{ color:"#4a5568", fontSize:13.5, lineHeight:1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"white", borderRadius:16, padding:"34px 38px", marginBottom:34, border:"1px solid #e2e8f0" }}>
          <div style={{ fontWeight:800, color:"#002B6B", fontSize:16, marginBottom:24, textAlign:"center" }}>Notre processus d'intervention en 4 étapes</div>
          <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(4,1fr)", gap:16 }}>
            {[
              {n:"01",title:"Prise de contact",desc:"Échange initial pour qualifier votre besoin et votre contexte"},
              {n:"02",title:"Diagnostic",desc:"Audit rapide de vos besoins, équipes et contraintes"},
              {n:"03",title:"Proposition",desc:"Programme, planning, budget et modalités FDFP"},
              {n:"04",title:"Déploiement",desc:"Formation, évaluation et bilan post-formation"},
            ].map((step,i)=>(
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:"#002B6B", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18, margin:"0 auto 12px" }}>{step.n}</div>
                <div style={{ fontWeight:700, color:"#002B6B", fontSize:14, marginBottom:6 }}>{step.title}</div>
                <div style={{ color:"#4a5568", fontSize:12.5, lineHeight:1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:"linear-gradient(135deg,#001d52,#002B6B)", borderRadius:16, padding:"38px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
          <div>
            <div style={{ fontWeight:800, color:"white", fontSize:18, marginBottom:8, fontFamily:"Georgia,serif" }}>Prêt à former vos équipes ?</div>
            <div style={{ color:"rgba(255,255,255,0.75)", fontSize:14 }}>Devis gratuit et sans engagement — réponse sous 24h ouvrées.</div>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <GoldBtn onClick={()=>window.open(waLink("Bonjour, je souhaite un devis formation pour mon entreprise."))}>💬 WhatsApp Entreprises</GoldBtn>
            <OutlineBtn onClick={()=>onNav("contact")}>Formulaire de contact</OutlineBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FDFP ──────────────────────────────────────────────────────
function FDFPSection() {
  const mobile = useIsMobile();
  const [activeD, setActiveD] = useState(null);
  return (
    <section id="fdfp" style={{ background:"white", padding:"90px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:62, alignItems:"flex-start" }}>
          <div>
            <Label text="Financement FDFP"/>
            <H2>Le FDFP finance vos formations</H2>
            <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:18, fontSize:15 }}>
              Le <strong style={{ color:"#002B6B" }}>Fonds de Développement de la Formation Professionnelle (FDFP)</strong> est 
              l'organisme paritaire qui collecte et redistribue la taxe de formation professionnelle 
              auprès des entreprises cotisantes.
            </p>
            <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:18, fontSize:15 }}>
              Toute entreprise cotisante verse une contribution obligatoire sur sa masse salariale. Ces fonds 
              ont vocation à financer la formation de vos collaborateurs — <strong style={{ color:"#D4A017" }}>ils vous appartiennent.</strong>
            </p>
            <a href={waLink("Bonjour, je souhaite recevoir le Guide Pratique du financement FDFP.")} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#F5F7FA", border:"1px solid #D4A017", borderRadius:10, padding:"11px 18px", marginBottom:24, textDecoration:"none" }}>
              <span style={{ fontSize:20 }}>📘</span>
              <span style={{ color:"#D4A017", fontWeight:700, fontSize:13 }}>Recevoir le guide gratuit du financement FDFP →</span>
            </a>
            <div style={{ background:"#F5F7FA", borderRadius:12, padding:"20px 24px", marginBottom:28 }}>
              <div style={{ fontWeight:800, color:"#002B6B", marginBottom:12, fontSize:14 }}>Qui peut bénéficier du FDFP ?</div>
              {["Toute entreprise cotisante (salariés déclarés)","PME, ETI et grandes entreprises","Artisans et professions libérales employeurs","Associations disposant de salariés"].map((e,i)=>(
                <div key={i} style={{ display:"flex", gap:9, marginBottom:8, alignItems:"flex-start" }}>
                  <span style={{ color:"#D4A017", fontWeight:700, flexShrink:0 }}>✓</span>
                  <span style={{ color:"#4a5568", fontSize:13.5, lineHeight:1.5 }}>{e}</span>
                </div>
              ))}
            </div>
            <div style={{ fontWeight:800, color:"#002B6B", marginBottom:16, fontSize:14 }}>Les 6 étapes avec NOVALIS EXPERT</div>
            {[
              {n:"1",t:"Audit de vos besoins",d:"Identification des formations prioritaires"},
              {n:"2",t:"Sélection des formations agréées",d:"Dans notre catalogue habilité FDFP"},
              {n:"3",t:"Constitution du dossier",d:"Nous préparons et déposons votre demande"},
              {n:"4",t:"Validation et financement",d:"Le FDFP valide et prend en charge les coûts"},
              {n:"5",t:"Réalisation de la formation",d:"Selon le planning et le programme validés"},
              {n:"6",t:"Remboursement direct",d:"Le FDFP rembourse NOVALIS EXPERT — zéro avance pour vous"},
            ].map((step,i)=>(
              <div key={i} style={{ display:"flex", gap:14, marginBottom:13, alignItems:"flex-start" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:"#D4A017", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, flexShrink:0 }}>{step.n}</div>
                <div>
                  <div style={{ fontWeight:700, color:"#002B6B", fontSize:13.5 }}>{step.t}</div>
                  <div style={{ color:"#4a5568", fontSize:12.5, lineHeight:1.5 }}>{step.d}</div>
                </div>
              </div>
            ))}
            <button onClick={()=>window.open(waLink("Bonjour, je souhaite être accompagné pour mon dossier FDFP."))} style={{ width:"100%", background:"#D4A017", color:"white", border:"none", padding:"15px", borderRadius:10, fontWeight:700, fontSize:14.5, cursor:"pointer", marginTop:14, boxShadow:"0 4px 18px rgba(212,160,23,0.35)" }}>
              Je souhaite être accompagné pour mon dossier FDFP →
            </button>
          </div>

          <div>
            <div style={{ background:"#F5F7FA", borderRadius:16, padding:"30px", marginBottom:22 }}>
              <div style={{ fontWeight:800, color:"#002B6B", marginBottom:6, fontSize:16 }}>🏅 Nos domaines agréés FDFP</div>
              <div style={{ color:"#4a5568", fontSize:13, marginBottom:18, lineHeight:1.6 }}>Cliquez sur un domaine pour voir les spécialités couvertes.</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {FDFP_DOMAINS.map((d,i)=>(
                  <div key={i}>
                    <div onClick={()=>setActiveD(activeD===i?null:i)} style={{ background:activeD===i?d.color:"white", color:activeD===i?"white":"#002B6B", borderRadius:10, padding:"13px 18px", cursor:"pointer", border:`2px solid ${activeD===i?d.color:"#e2e8f0"}`, display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.2s" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <span style={{ fontSize:22 }}>{d.icon}</span>
                        <span style={{ fontWeight:700, fontSize:13.5 }}>{d.title}</span>
                      </div>
                      <span style={{ fontWeight:700, fontSize:16 }}>{activeD===i?"▲":"▼"}</span>
                    </div>
                    {activeD===i&&(
                      <div style={{ background:"white", border:`2px solid ${d.color}`, borderTop:"none", borderRadius:"0 0 10px 10px", padding:"16px 18px" }}>
                        {d.subs.map((s,j)=>(
                          <div key={j} style={{ display:"flex", gap:8, marginBottom:6, fontSize:12.5, color:"#4a5568" }}>
                            <span style={{ color:d.color, flexShrink:0 }}>›</span><span>{s}</span>
                          </div>
                        ))}
                        <button onClick={()=>window.open(waLink(`Bonjour, je souhaite le programme des formations : ${d.title}`))} style={{ marginTop:12, background:d.color, color:"white", border:"none", padding:"9px 16px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>Demander le programme →</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"linear-gradient(135deg,#001d52,#002B6B)", borderRadius:16, padding:"26px", color:"white" }}>
              <div style={{ fontWeight:800, fontSize:14, marginBottom:14 }}>📄 Documents généralement nécessaires</div>
              {["Registre de commerce de l'entreprise","Attestation de cotisation FDFP à jour","Plan de formation de l'exercice","Convention de formation avec NOVALIS EXPERT","Feuilles de présence et documents pédagogiques"].map((doc,i)=>(
                <div key={i} style={{ display:"flex", gap:9, marginBottom:8 }}>
                  <span style={{ color:"#D4A017", fontWeight:700, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:13, lineHeight:1.5 }}>{doc}</span>
                </div>
              ))}
              <div style={{ marginTop:14, padding:"12px 16px", background:"rgba(212,160,23,0.15)", borderRadius:8, border:"1px solid rgba(212,160,23,0.3)", fontSize:12.5, lineHeight:1.6, color:"rgba(255,255,255,0.85)" }}>
                💡 NOVALIS EXPERT vous accompagne dans la constitution complète de votre dossier, de A à Z.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── POURQUOI ──────────────────────────────────────────────────
function WhySection() {
  const mobile = useIsMobile();
  return (
    <section style={{ background:"#002B6B", padding:"90px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <Label text="Notre différence"/>
          <H2 light>Pourquoi choisir NOVALIS EXPERT ?</H2>
        </div>
        <div style={{ borderRadius:14, overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", marginBottom:50 }}>
          <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1.8fr 1fr 1fr" }}>
            {[{label:"Critère de choix",bg:"rgba(255,255,255,0.05)"},{label:"NOVALIS EXPERT",bg:"rgba(212,160,23,0.18)"},{label:"Formation classique",bg:"rgba(255,255,255,0.05)"}].map((h,i)=>(
              <div key={i} style={{ padding:"16px 22px", background:h.bg, fontWeight:700, fontSize:13, color:"white", borderBottom:"1px solid rgba(255,255,255,0.12)" }}>{h.label}</div>
            ))}
          </div>
          {[
            ["Expérience terrain","✅ +15 ans d'expérience opérationnelle","⚠️ Variable selon l'organisme"],
            ["Adaptation au contexte terrain","✅ Contenus pensés pour vos réalités","❌ Souvent hors contexte"],
            ["Financement FDFP","✅ Dossier monté par nos soins","⚠️ À votre charge"],
            ["Profil des formateurs","✅ Praticiens actifs en entreprise","⚠️ Souvent académiques"],
            ["Flexibilité d'intervention","✅ Intra, inter, mesure, digital","❌ Format souvent rigide"],
            ["Approche pédagogique","✅ Active, cas concrets, terrain","⚠️ Souvent théorique"],
            ["Suivi post-formation","✅ Disponible sur demande","❌ Absent dans la plupart des cas"],
            ["Délai de réponse","✅ Sous 24h garanties","⚠️ Souvent plusieurs jours"],
          ].map((row,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1.8fr 1fr 1fr", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              {row.map((cell,j)=>(
                <div key={j} style={{ padding:"13px 22px", fontSize:13, color:j===0?"rgba(255,255,255,0.75)":"white", background:j===1?"rgba(212,160,23,0.08)":"transparent", fontWeight:j===0?500:400 }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(4,1fr)", gap:18 }}>
          {[
            {icon:"🌍",title:"Expertise terrain",desc:"Nos formations sont conçues à partir de situations réelles, applicables immédiatement dans votre contexte opérationnel."},
            {icon:"🔧",title:"Praticiens, pas théoriciens",desc:"Nos formateurs exercent leur métier. Ils transmettent des compétences qu'ils appliquent eux-mêmes."},
            {icon:"⚡",title:"Réponse rapide",desc:"Devis et proposition sous 24h ouvrées. Interlocution directe, sans lourdeurs administratives."},
            {icon:"🎯",title:"Orienté résultats",desc:"Chaque formation est évaluée sur les compétences réellement acquises et leur applicabilité immédiate."},
          ].map((d,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderTop:"3px solid #D4A017", borderRadius:12, padding:"24px 20px" }}>
              <div style={{ fontSize:34, marginBottom:12 }}>{d.icon}</div>
              <div style={{ fontWeight:800, color:"white", fontSize:14, marginBottom:8 }}>{d.title}</div>
              <div style={{ color:"rgba(255,255,255,0.68)", fontSize:13, lineHeight:1.65 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TÉMOIGNAGES PLACEHOLDER ────────────────────────────────────
function TestimonialsPlaceholder() {
  return (
    <section style={{ background:"#F5F7FA", padding:"70px 28px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <Label text="Témoignages clients"/>
        <H2>Ce que disent nos clients</H2>
        <div style={{ background:"white", border:"2px dashed #D4A017", borderRadius:16, padding:"52px 40px", marginTop:32 }}>
          <div style={{ fontSize:48, marginBottom:16, opacity:0.35 }}>💬</div>
          <p style={{ color:"#a0aec0", fontSize:15, lineHeight:1.78, maxWidth:480, margin:"0 auto" }}>
            Les témoignages de nos clients seront publiés ici dès leur collecte.<br/>
            <span style={{ fontSize:13 }}>Cette section sera activée avec de vrais retours d'expérience.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── BLOG ──────────────────────────────────────────────────────
function BlogSection() {
  const mobile = useIsMobile();
  const [hov, setHov] = useState(null);
  return (
    <section id="actualites" style={{ background:"white", padding:"90px 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <Label text="Actualités & ressources"/>
          <H2>Le blog NOVALIS EXPERT</H2>
          <p style={{ color:"#4a5568", maxWidth:560, margin:"0 auto", fontSize:15, lineHeight:1.78 }}>
            Analyses, guides pratiques et ressources pour les professionnels, les entreprises 
            et les acteurs du développement des compétences.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"repeat(3,1fr)", gap:24 }}>
          {ARTICLES.map((a,i)=>(
            <div key={a.title} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{ borderRadius:14, border:"1px solid #e2e8f0", overflow:"hidden", cursor:"pointer", transform:hov===i?"translateY(-5px)":"none", boxShadow:hov===i?"0 10px 36px rgba(0,43,107,0.12)":"0 2px 12px rgba(0,0,0,0.04)", transition:"all 0.25s" }}>
              <div style={{ background:`linear-gradient(140deg,${a.catColor}ee,${a.catColor}bb)`, padding:"32px 26px 24px", display:"flex", alignItems:"flex-end", minHeight:110, position:"relative" }}>
                <span style={{ fontSize:48, position:"absolute", top:20, right:20, opacity:0.85 }}>{a.icon}</span>
                <span style={{ background:"rgba(255,255,255,0.2)", color:"white", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:100 }}>{a.cat}</span>
              </div>
              <div style={{ padding:"22px 22px 24px" }}>
                <div style={{ display:"flex", gap:14, marginBottom:12 }}>
                  <span style={{ color:"#a0aec0", fontSize:11.5 }}>📅 {a.date}</span>
                  <span style={{ color:"#a0aec0", fontSize:11.5 }}>⏱ {a.readTime}</span>
                </div>
                <h3 style={{ fontWeight:800, color:"#002B6B", fontSize:14.5, lineHeight:1.45, marginBottom:10 }}>{a.title}</h3>
                <p style={{ color:"#4a5568", fontSize:13, lineHeight:1.7, marginBottom:16 }}>{a.excerpt}</p>
                <span style={{ color:"#D4A017", fontWeight:700, fontSize:13 }}>Lire l'article →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FORMATEURS ────────────────────────────────────────────────
function FormateursSection() {
  const mobile = useIsMobile();
  return (
    <section style={{ background:"#F5F7FA", padding:"90px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <Label text="Rejoignez-nous"/>
            <H2>Devenez formateur partenaire</H2>
            <p style={{ color:"#4a5568", lineHeight:1.85, marginBottom:24, fontSize:15 }}>
              NOVALIS EXPERT constitue un réseau de formateurs et consultants praticiens de haut niveau. 
              Si vous êtes expert dans votre domaine, nous vous invitons à rejoindre notre réseau.
            </p>
            {["Honoraires attractifs et paiements dans les délais convenus","Missions régulières selon vos disponibilités","Support logistique, administratif et pédagogique","Intégration dans un réseau professionnel reconnu","Liberté totale de maintenir vos autres activités","Collaboration long terme pour les profils sélectionnés"].map((e,i)=>(
              <div key={i} style={{ display:"flex", gap:10, marginBottom:12, alignItems:"flex-start" }}>
                <span style={{ color:"#D4A017", fontSize:18, flexShrink:0, lineHeight:1.3 }}>✓</span>
                <span style={{ color:"#4a5568", fontSize:14, lineHeight:1.55 }}>{e}</span>
              </div>
            ))}
            <div style={{ background:"white", border:"2px dashed #e2e8f0", borderRadius:12, padding:"22px", marginTop:24, textAlign:"center" }}>
              <span style={{ fontSize:28, display:"block", marginBottom:8, opacity:0.35 }}>👤</span>
              <div style={{ color:"#a0aec0", fontSize:13, lineHeight:1.7 }}>Les profils de nos formateurs partenaires seront présentés ici.</div>
            </div>
          </div>
          <div style={{ background:"linear-gradient(140deg,#001d52,#002B6B)", borderRadius:16, padding:"36px" }}>
            <div style={{ fontWeight:800, color:"white", fontSize:17, marginBottom:6 }}>📝 Formulaire de candidature</div>
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:24 }}>Traitement confidentiel de votre candidature.</div>
            {[{label:"Nom & Prénom *",type:"text",ph:"Votre nom complet"},{label:"Email *",type:"email",ph:"votre@email.com"},{label:"Téléphone (WhatsApp) *",type:"tel",ph:"+225 XX XX XX XX"},{label:"Domaine(s) d'expertise *",type:"text",ph:"RH, Informatique, Électricité…"},{label:"Années d'expérience",type:"text",ph:"Ex : 8 ans"}].map((f,i)=>(
              <div key={i} style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:12, color:"rgba(255,255,255,0.65)", marginBottom:5, fontWeight:600 }}>{f.label}</label>
                <input type={f.type} placeholder={f.ph} style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.18)", background:"rgba(255,255,255,0.09)", color:"white", fontSize:13, outline:"none", boxSizing:"border-box" }}/>
              </div>
            ))}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block", fontSize:12, color:"rgba(255,255,255,0.65)", marginBottom:5, fontWeight:600 }}>Présentation & expériences clés *</label>
              <textarea rows={4} placeholder="Parcours, certifications, formations déjà animées…" style={{ width:"100%", padding:"11px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.18)", background:"rgba(255,255,255,0.09)", color:"white", fontSize:13, outline:"none", resize:"vertical", boxSizing:"border-box" }}/>
            </div>
            <button style={{ width:"100%", background:"#D4A017", color:"white", border:"none", padding:"14px", borderRadius:9, fontWeight:700, fontSize:14.5, cursor:"pointer" }}>Envoyer ma candidature →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── BANDEAU CONVERSION ─────────────────────────────────────────
function ConversionBand({ onNav }) {
  return (
    <section style={{ background:"linear-gradient(135deg,#000f2e,#001d52,#002B6B)", padding:"90px 28px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,160,23,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:13, letterSpacing:3, color:"#D4A017", fontWeight:700, textTransform:"uppercase", marginBottom:14 }}>Parlons de votre projet</div>
        <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.8rem)", fontWeight:900, color:"white", lineHeight:1.2, fontFamily:"Georgia,serif", marginBottom:18 }}>
          Votre prochain projet de formation<br/>ou de conseil commence ici.
        </h2>
        <p style={{ color:"rgba(255,255,255,0.72)", fontSize:15.5, lineHeight:1.78, marginBottom:40, maxWidth:560, margin:"0 auto 40px" }}>
          Quel que soit votre besoin — formation, conseil, audit, accompagnement FDFP ou ingénierie des compétences — 
          nous vous répondons sous 24h ouvrées avec une proposition concrète.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <GoldBtn onClick={()=>onNav("contact")}>Demander un devis →</GoldBtn>
          <OutlineBtn onClick={()=>onNav("contact")}>Prendre rendez-vous</OutlineBtn>
          <button onClick={()=>window.open(waLink("Bonjour NOVALIS EXPERT, je souhaite échanger sur un projet."))} style={{ background:"#25D366", color:"white", border:"none", padding:"14px 30px", borderRadius:8, fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 6px 24px rgba(37,211,102,0.35)", whiteSpace:"nowrap" }}>💬 WhatsApp direct</button>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────
// ── LEAD MAGNET MODAL ─────────────────────────────────────────

// ── CALENDLY MODAL ─────────────────────────────────────────────
// Rendez-vous — lien direct sans popup
const openRdv = () => {
  if (CONFIG.CALENDLY_URL !== "YOUR_CALENDLY_URL") {
    window.open(CONFIG.CALENDLY_URL, "_blank");
  } else {
    window.open(waLink("Bonjour NOVALIS EXPERT, je souhaite prendre un rendez-vous de découverte."), "_blank");
  }
};

// ── CONTACT (FORMSPREE RÉEL) ───────────────────────────────────
// ── CALENDLY MODAL ─────────────────────────────────────────────
function CalendlyModal({ onClose }) {
  const configured = CONFIG.CALENDLY_URL && CONFIG.CALENDLY_URL !== "YOUR_CALENDLY_URL";
  useEffect(() => {
    if (!configured) return;
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: CONFIG.CALENDLY_URL,
          parentElement: document.getElementById("cal-inline"),
        });
      }
    };
    document.head.appendChild(s);
  }, []);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:10000, background:"rgba(0,0,0,0.65)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"white", borderRadius:16, maxWidth:680, width:"100%", maxHeight:"90vh", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>
        <div style={{ background:"linear-gradient(135deg,#002B6B,#003d99)", padding:"18px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontWeight:800, color:"white", fontSize:16 }}>📅 Prendre un rendez-vous</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginTop:2 }}>Entretien de découverte gratuit — 30 minutes</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"white", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:20, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        <div style={{ padding:24, overflowY:"auto", flex:1 }}>
          {configured ? (
            <div id="cal-inline" style={{ minHeight:480 }}/>
          ) : (
            <div style={{ textAlign:"center", padding:"32px 16px" }}>
              <div style={{ fontSize:44, marginBottom:14 }}>📅</div>
              <div style={{ fontWeight:800, color:"#002B6B", fontSize:16, marginBottom:10 }}>Planifiez votre entretien</div>
              <p style={{ color:"#4a5568", fontSize:14, lineHeight:1.75, marginBottom:22 }}>
                Contactez-nous directement pour fixer un rendez-vous de découverte gratuit.
              </p>
              <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={() => { window.open(waLink("Bonjour, je souhaite prendre un rendez-vous de découverte avec NOVALIS EXPERT.")); onClose(); }}
                  style={{ background:"#25D366", color:"white", border:"none", padding:"12px 22px", borderRadius:8, fontWeight:700, cursor:"pointer", fontSize:14 }}>
                  💬 WhatsApp
                </button>
                <button onClick={() => { window.location.href = "tel:+2250703373738"; onClose(); }}
                  style={{ background:"#002B6B", color:"white", border:"none", padding:"12px 22px", borderRadius:8, fontWeight:700, cursor:"pointer", fontSize:14 }}>
                  📞 Appeler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactSection({ onRdv }) {
  const mobile = useIsMobile();
  const [fs, submitFs] = useFormspree();
  const [f, setF] = useState({ prenom:"", nom:"", entreprise:"", fonction:"", telephone:"", email:"", type:"", formation:"", message:"", rgpd:false });
  const send = () => {
    if (!f.prenom || !f.email || !f.rgpd) return;
    submitFs(CONFIG.FORMSPREE_ID, { ...f, _subject:`Contact NOVALIS EXPERT — ${f.type||"Général"}`, _replyto: f.email });
  };
  return (
    <section id="contact" style={{ background:"white", padding:"90px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <Label text="Contact"/>
          <H2>Parlons de votre projet</H2>
          <p style={{ color:"#4a5568", maxWidth:500, margin:"0 auto", fontSize:15, lineHeight:1.78 }}>
            Réponse garantie sous 24h ouvrées. Devis gratuit, sans engagement.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1.5fr", gap:50 }}>
          <div>
            <div style={{ background:"linear-gradient(140deg,#001d52,#002B6B)", borderRadius:16, padding:"36px", color:"white", marginBottom:14 }}>
              <div style={{ fontWeight:800, fontSize:16, marginBottom:22 }}>📍 Nos coordonnées</div>
              {[
                {icon:"📍",label:"Adresse",val:"Groupement 4000 C\nCocody Angré Château\nAbidjan, Côte d'Ivoire"},
                {icon:"📞",label:"Téléphone",val:"+225 07 03 37 37 38"},
                {icon:"💬",label:"WhatsApp",val:"+225 07 03 37 37 38"},
                {icon:"🕐",label:"Horaires",val:"Lun – Ven : 8h00 – 18h00\nSamedi : 9h00 – 13h00"},
                {icon:"⚡",label:"Engagement",val:"Réponse sous 24h ouvrées"},
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex", gap:14, marginBottom:16, paddingBottom:16, borderBottom:i<4?"1px solid rgba(255,255,255,0.1)":"none" }}>
                  <span style={{ fontSize:20, flexShrink:0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginBottom:2, fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{c.label}</div>
                    <div style={{ fontSize:13.5, lineHeight:1.6, whiteSpace:"pre-line" }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onRdv} style={{ width:"100%", background:"#002B6B", color:"white", border:"none", padding:"14px", borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", marginBottom:10 }}>📅 Prendre rendez-vous en ligne</button>
            <button onClick={()=>window.open(waLink("Bonjour NOVALIS EXPERT, je souhaite vous contacter."))} style={{ width:"100%", background:"#25D366", color:"white", border:"none", padding:"14px", borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              <svg viewBox="0 0 32 32" width="20" height="20" fill="white"><path d="M16 2C8.27 2 2 8.27 2 16c0 2.42.64 4.68 1.75 6.64L2 30l7.56-1.73C11.39 29.38 13.64 30 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.3 19.78c-.32.9-1.88 1.71-2.6 1.82-.66.1-1.48.14-2.39-.15-.55-.18-1.27-.41-2.18-.8-3.83-1.65-6.32-5.52-6.51-5.78-.19-.26-1.53-2.03-1.53-3.88s.97-2.74 1.32-3.12c.34-.37.75-.47 1-.47s.5.003.71.013c.23.01.54-.087.84.643.315.754 1.07 2.607 1.163 2.795.09.19.155.41.03.66-.12.25-.186.403-.372.62-.186.22-.393.49-.56.658-.186.185-.38.387-.163.758.217.373.966 1.592 2.075 2.58 1.424 1.27 2.625 1.663 2.997 1.85.37.188.585.157.802-.094.217-.25.93-1.085 1.178-1.458.247-.374.495-.313.836-.188.34.126 2.17 1.022 2.54 1.208.37.188.618.28.71.435.093.157.093.907-.225 1.805z"/></svg>
              Écrire sur WhatsApp
            </button>
          </div>
          <div style={{ background:"#F5F7FA", borderRadius:16, padding:"36px" }}>
            {fs.sent ? (
              <div style={{ textAlign:"center", padding:"40px 20px" }}>
                <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
                <div style={{ fontWeight:800, color:"#002B6B", fontSize:18, marginBottom:10 }}>Message envoyé !</div>
                <p style={{ color:"#4a5568", fontSize:14, lineHeight:1.7 }}>Nous avons bien reçu votre demande.<br/>Réponse sous 24h ouvrées.</p>
              </div>
            ) : (
              <>
                <div style={{ fontWeight:800, color:"#002B6B", fontSize:17, marginBottom:22 }}>📋 Formulaire de contact</div>
                <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:13, marginBottom:13 }}>
                  {[{k:"prenom",l:"Prénom *",p:"Votre prénom"},{k:"nom",l:"Nom *",p:"Votre nom"},{k:"entreprise",l:"Entreprise",p:"Votre entreprise"},{k:"fonction",l:"Fonction",p:"Votre poste"},{k:"telephone",l:"Téléphone *",p:"+225 XX XX XX XX"},{k:"email",l:"Email *",p:"votre@email.com",t:"email"}].map(x=>(
                    <div key={x.k}>
                      <label style={{ display:"block", fontSize:12, color:"#4a5568", fontWeight:700, marginBottom:4 }}>{x.l}</label>
                      <input type={x.t||"text"} placeholder={x.p} value={f[x.k]} onChange={e=>setF({...f,[x.k]:e.target.value})}
                        style={{ width:"100%", padding:"11px 13px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", fontSize:13, outline:"none", boxSizing:"border-box" }}/>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:13 }}>
                  <label style={{ display:"block", fontSize:12, color:"#4a5568", fontWeight:700, marginBottom:4 }}>Type de demande *</label>
                  <select value={f.type} onChange={e=>setF({...f,type:e.target.value})} style={{ width:"100%", padding:"11px 13px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", fontSize:13, outline:"none", boxSizing:"border-box", color:"#4a5568" }}>
                    <option value="">Sélectionner…</option>
                    <option>Demande de devis formation</option>
                    <option>Information sur une formation</option>
                    <option>Demande de conseil ou d'audit</option>
                    <option>Accompagnement dossier FDFP</option>
                    <option>Formation sur mesure entreprise</option>
                    <option>Prise de rendez-vous</option>
                    <option>Autre demande</option>
                  </select>
                </div>
                <div style={{ marginBottom:13 }}>
                  <label style={{ display:"block", fontSize:12, color:"#4a5568", fontWeight:700, marginBottom:4 }}>Formation souhaitée (si applicable)</label>
                  <select value={f.formation} onChange={e=>setF({...f,formation:e.target.value})} style={{ width:"100%", padding:"11px 13px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", fontSize:13, outline:"none", boxSizing:"border-box", color:"#4a5568" }}>
                    <option value="">Sélectionner…</option>
                    {FORMATIONS.map(x=><option key={x.id}>{x.title}</option>)}
                    <option>Formation sur mesure / autre</option>
                  </select>
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:"block", fontSize:12, color:"#4a5568", fontWeight:700, marginBottom:4 }}>Message</label>
                  <textarea rows={4} placeholder="Décrivez votre besoin, nombre de participants, contraintes de planning…" value={f.message} onChange={e=>setF({...f,message:e.target.value})}
                    style={{ width:"100%", padding:"11px 13px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", fontSize:13, outline:"none", resize:"vertical", boxSizing:"border-box" }}/>
                </div>
                <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:20 }}>
                  <input type="checkbox" id="rgpd" checked={f.rgpd} onChange={e=>setF({...f,rgpd:e.target.checked})} style={{ marginTop:3, flexShrink:0 }}/>
                  <label htmlFor="rgpd" style={{ fontSize:12, color:"#718096", lineHeight:1.6 }}>J'accepte que NOVALIS EXPERT utilise mes données pour traiter ma demande, conformément à notre politique de confidentialité. *</label>
                </div>
                {fs.error && <div style={{ color:"#e53e3e", fontSize:12.5, marginBottom:12 }}>{fs.error}</div>}
                <button onClick={send} disabled={fs.sending}
                  style={{ width:"100%", background:fs.sending?"#a0aec0":"#002B6B", color:"white", border:"none", padding:"15px", borderRadius:9, fontWeight:700, fontSize:15, cursor:fs.sending?"not-allowed":"pointer", boxShadow:"0 4px 18px rgba(0,43,107,0.25)" }}>
                  {fs.sending ? "Envoi en cours…" : "Envoyer ma demande →"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer({ onNav }) {
  const mobile = useIsMobile();
  return (
    <footer style={{ background:"#000d28", color:"white", padding:"62px 28px 26px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"2fr 1fr 1fr 1fr", gap:44, marginBottom:50 }}>
          <div>
            <div onClick={()=>onNav("accueil")} style={{ cursor:"pointer", marginBottom:18 }}><Logo size={40} light/></div>
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:13.5, lineHeight:1.78, maxWidth:280, marginBottom:22 }}>
              Cabinet de conseil, formation professionnelle et d'ingénierie des compétences. Accréditation FDFP en cours.
            </p>
            <div style={{ fontWeight:700, color:"rgba(255,255,255,0.35)", fontSize:11, letterSpacing:1.5, marginBottom:12 }}>UNE STRUCTURE DU GROUPE ARYAMA</div>
            <div style={{ display:"flex", gap:10, marginTop:14 }}>
              <a href="https://www.facebook.com/share/1bixdSH5SN/" target="_blank" rel="noopener noreferrer"
                style={{ width:36, height:36, borderRadius:"50%", background:"#1877F2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, textDecoration:"none", border:"1px solid rgba(255,255,255,0.1)" }} title="Facebook NOVALIS EXPERT">f</a>
              <a href="https://www.tiktok.com/@novalis.expert" target="_blank" rel="noopener noreferrer"
                style={{ width:36, height:36, borderRadius:"50%", background:"#010101", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, textDecoration:"none", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontWeight:700 }} title="TikTok NOVALIS EXPERT">TT</a>
            </div>
          </div>
          <div>
            <div style={{ fontWeight:700, color:"#D4A017", marginBottom:18, fontSize:12, letterSpacing:1.5 }}>NAVIGATION</div>
            {NAV.map(l=>(
              <div key={l.id} onClick={()=>onNav(l.id)} style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:11, cursor:"pointer" }}
                onMouseEnter={e=>e.target.style.color="#D4A017"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.6)"}>{l.label}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight:700, color:"#D4A017", marginBottom:18, fontSize:12, letterSpacing:1.5 }}>EXPERTISES</div>
            {["Formation professionnelle","Conseil stratégique","Audit & diagnostic","Études & recherche","Ingénierie des compétences","Accompagnement FDFP","Transformation organisationnelle"].map((e,i)=>(
              <div key={i} style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:11 }}>{e}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight:700, color:"#D4A017", marginBottom:18, fontSize:12, letterSpacing:1.5 }}>CONTACT</div>
            {["📍 Angré Château, Abidjan","📞 +225 07 03 37 37 38","💬 WhatsApp : 07 03 37 37 38","🕐 Lun–Ven : 8h–18h","🕐 Samedi : 9h–13h"].map((c,i)=>(
              <div key={i} style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginBottom:11 }}>{c}</div>
            ))}
            <button onClick={()=>window.open(waLink("Bonjour NOVALIS EXPERT."))} style={{ background:"#25D366", color:"white", border:"none", padding:"10px 18px", borderRadius:8, fontWeight:700, fontSize:12.5, cursor:"pointer", marginTop:6 }}>💬 Nous écrire</button>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:26, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ color:"rgba(255,255,255,0.38)", fontSize:12 }}>© 2025 NOVALIS EXPERT — Tous droits réservés</div>
          <div style={{ display:"flex", gap:24 }}>
            {["Mentions légales","Politique de confidentialité","Cookies"].map(l=>(
              <span key={l} style={{ color:"rgba(255,255,255,0.38)", fontSize:12, cursor:"pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────

export default function NovalisExpert() {
  const [active, setActive] = useState("accueil");
  const [cookieDone, setCookieDone] = useState(false);
  const [showCal, setShowCal] = useState(false);

  useEffect(() => {
    const sections = NAV.map(n=>document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id); }),
      { threshold:0.3 }
    );
    sections.forEach(s=>obs.observe(s));
    return ()=>obs.disconnect();
  }, []);

  useEffect(() => {
    document.title = "NOVALIS EXPERT — Cabinet de Formation Professionnelle & Conseil | Abidjan";
    const m = (n,c,p=false) => {
      const s = p?`meta[property="${n}"]`:`meta[name="${n}"]`;
      let el = document.querySelector(s);
      if(!el){el=document.createElement("meta");p?el.setAttribute("property",n):el.setAttribute("name",n);document.head.appendChild(el);}
      el.content=c;
    };
    m("description","NOVALIS EXPERT, cabinet de conseil et formation professionnelle à Abidjan, accréditation FDFP en cours. Formation professionnelle Abidjan, formation FDFP Côte d'Ivoire, cabinet de formation, conseil stratégique.");
    m("keywords","formation professionnelle Abidjan, cabinet formation Côte d'Ivoire, formation FDFP, formation IA Abidjan, NOVALIS EXPERT, ingénierie compétences, formation management Abidjan");
    m("og:title","NOVALIS EXPERT — Formation & Conseil",true);
    m("og:description","Cabinet de conseil et formation professionnelle à Abidjan. Accréditation FDFP en cours. Côte d'Ivoire.",true);
    m("og:type","website",true);
  }, []);



  const navTo = (id) => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:"smooth"});
  };

  return (
    <div style={{fontFamily:"'Trebuchet MS','Gill Sans',Georgia,serif"}}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{overflow-x:hidden}
        input,textarea,select{font-family:inherit}
        input::placeholder,textarea::placeholder{color:#c0c8d8}
        @keyframes waPulse{
          0%,100%{box-shadow:0 4px 24px rgba(37,211,102,0.55)}
          50%{box-shadow:0 4px 32px rgba(37,211,102,0.85),0 0 0 10px rgba(37,211,102,0.12)}
        }
      `}</style>

      <Navbar active={active} onNav={navTo} onRdv={()=>setShowCal(true)}/>

      <main>
        <Hero onNav={navTo} onRdv={()=>setShowCal(true)}/>
        <ReassuranceBand/>
        <CabinetSection onNav={navTo}/>
        <ExpertisesSection onNav={navTo}/>
        <FormationsSection onNav={navTo}/>
        <EntreprisesSection onNav={navTo} onRdv={()=>setShowCal(true)}/>
        <FDFPSection/>
        <WhySection/>
        <TestimonialsPlaceholder/>
        <BlogSection/>
        <FormateursSection/>
        <ConversionBand onNav={navTo} onRdv={()=>setShowCal(true)}/>
        <ContactSection onRdv={()=>setShowCal(true)}/>
      </main>

      <Footer onNav={navTo} onRdv={()=>setShowCal(true)}/>
      <WABtn/>

      {showCal && <CalendlyModal onClose={()=>setShowCal(false)}/>}

      {!cookieDone&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:9990,background:"#001a45",borderTop:"2px solid #D4A017",padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
          <span style={{color:"rgba(255,255,255,0.78)",fontSize:13,maxWidth:720,lineHeight:1.6}}>
            🍪 Ce site utilise des cookies pour améliorer votre expérience, conformément à notre politique de confidentialité.
          </span>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setCookieDone(true)} style={{background:"#D4A017",color:"white",border:"none",padding:"9px 22px",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer"}}>Accepter</button>
            <button onClick={()=>setCookieDone(true)} style={{background:"transparent",color:"rgba(255,255,255,0.7)",border:"1px solid rgba(255,255,255,0.25)",padding:"9px 22px",borderRadius:8,fontSize:13,cursor:"pointer"}}>Refuser</button>
          </div>
        </div>
      )}
    </div>
  );
}
