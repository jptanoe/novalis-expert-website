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
function Navbar({ active, onNav }) 
