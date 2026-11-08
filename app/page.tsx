"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import OriginMap from "../components/OriginMapLoader";
import BoxScene from "../components/BoxScene";

type Product = {
  id: number;
  name: string;
  species: string;
  scientificName: string;
  region: string;
  rarity: "Vulnerable" | "Endangered" | "Critically endangered" | "Not evaluated";
  image: string;
  color: string;
  accent: string;
  fact: string;
  badge?: string;
};

const products: Product[] = [
  { id: 1, name: "Redsy", species: "Red handfish", scientificName: "Thymichthys politus", region: "Oceania", rarity: "Critically endangered", image: "/cards/red-handfish.png", color: "#9f352d", accent: "#ffffff", fact: "Red handfish walk across the seafloor on hand-shaped fins.", badge: "Rare find" },
  { id: 2, name: "Moss", species: "Kākāpō", scientificName: "Strigops habroptilus", region: "Oceania", rarity: "Critically endangered", image: "/cards/kakapo.png", color: "#476f2e", accent: "#ffffff", fact: "Kākāpō are the world’s only flightless, nocturnal parrots.", badge: "New" },
  { id: 3, name: "Wrinkle", species: "Chinese giant salamander", scientificName: "Andrias davidianus", region: "Asia", rarity: "Critically endangered", image: "/cards/chinese-giant-salamander.png", color: "#584636", accent: "#ffffff", fact: "This ancient amphibian breathes partly through its wrinkled skin." },
];

const heroCards = [
  { name: "Redsy", species: "Red handfish", card: "/cards/red-handfish.png", wild: "/references/red-handfish-wild.jpg" },
  { name: "Moss", species: "Kākāpō", card: "/cards/kakapo.png", wild: "/references/kakapo-wild.jpg" },
  { name: "Wrinkle", species: "Chinese giant salamander", card: "/cards/chinese-giant-salamander.png", wild: "/references/chinese-giant-salamander-wild.jpg" },
];

// Cards are sold in habitat-themed packs.
const CARD_PACK_PRICE = 5.99;

const filters = ["All", "Oceania", "Asia"];

type MythCheck = {
  id: string;
  animal: string;
  image: string;
  color: string;
  claim: string;
  verdict: string;
  fact: string;
  source: string;
  url: string;
};

const mythChecks: MythCheck[] = [
  {
    id: "handfish",
    animal: "Red handfish",
    image: "/cards/red-handfish.png",
    color: "#9f352d",
    claim: "A fish this strange must be common somewhere.",
    verdict: "False",
    fact: "Red handfish live on just two small patches of reef in southeast Tasmania. A 2020 survey estimated about 101 adults in total.",
    source: "Journal of Fish Biology, 2024",
    url: "https://reeflifesurvey.com/publications/population-parameters-and-conservation-implications-for-one-of-the-worlds-rarest-marine-fishes-the-red-handfish-thymichthys-politus/",
  },
  {
    id: "kakapo",
    animal: "Kākāpō",
    image: "/cards/kakapo.png",
    color: "#476f2e",
    claim: "A parrot that cannot fly is a lost cause.",
    verdict: "False",
    fact: "The kākāpō count fell to 51 birds in 1995. Intensive, hands-on conservation has since lifted the official population to 325.",
    source: "NZ Department of Conservation, 2026",
    url: "https://www.doc.govt.nz/news/media-releases/2026-media-releases/kakapo-population-reaches-new-milestone/",
  },
  {
    id: "salamander",
    animal: "Chinese giant salamander",
    image: "/cards/chinese-giant-salamander.png",
    color: "#584636",
    claim: "Millions are farmed in China, so the species is safe.",
    verdict: "Misleading",
    fact: "Farms hold millions, but a four-year survey of 97 sites found only 24 wild individuals, and those may be escaped or released farm animals. The species is critically endangered.",
    source: "Turvey et al., Current Biology, 2018",
    url: "https://news.mongabay.com/2018/05/chinese-giant-salamander-is-at-least-five-species-all-nearly-extinct/",
  },
];

type WildlifeReference = {
  name: string;
  scientificName: string;
  place: string;
  image: string;
  imagePosition?: string;
  sourceUrl: string;
  credit: string;
};

const wildlifeReferences: WildlifeReference[] = [
  { name: "Yangtze giant softshell turtle", scientificName: "Rafetus swinhoei", place: "Yangtze and Red River basins", image: "/references/yangtze-giant-softshell-turtle-wild.jpg", sourceUrl: "https://commons.wikimedia.org/wiki/File:Rafetus_swinhoei.jpg", credit: "Johnleung2000s · Public domain" },
  { name: "Titicaca water frog", scientificName: "Telmatobius culeus", place: "Lake Titicaca, Andes", image: "/references/titicaca-water-frog-wild.jpg", imagePosition: "center 70%", sourceUrl: "https://commons.wikimedia.org/wiki/File:Lake_Titicaca_Frog_(49693722948).jpg", credit: "Dana Shellhorn / USFWS · Public domain" },
  { name: "Pink land iguana", scientificName: "Conolophus marthae", place: "Wolf Volcano, Galápagos", image: "/references/pink-land-iguana-wild.png", sourceUrl: "https://commons.wikimedia.org/wiki/File:Foto_de_Iguana_terrestre_rosada_(Conolophus_marthae).png", credit: "ZOOVANCHO180 · CC BY-SA" },
  { name: "Dumbo octopus", scientificName: "Opisthoteuthis agassizii", place: "Deep Atlantic Ocean", image: "/references/dumbo-octopus-wild.jpg", sourceUrl: "https://commons.wikimedia.org/wiki/File:Dumbo_Octopus_(49203817176).jpg", credit: "NOAA Ocean Exploration · Public domain" },
];

type HabitatBox = {
  id: string;
  name: string;
  habitat: string;
  copy: string;
  productIds: number[];
  color: string;
  side: string;
  accent: string;
  glyph: string;
};

const habitatBoxes: HabitatBox[] = [
  { id: "ocean", name: "Ocean Depths", habitat: "Shallow rocky reef", copy: "A tiny walking fish with hand-shaped fins, a monumental frown, and an extremely limited wild range.", productIds: [1], color: "#0b5375", side: "#083a53", accent: "#d8b633", glyph: "≈" },
  { id: "forest", name: "Night Forest", habitat: "Island canopy", copy: "Mossy feathers, an owl-like face, and the world’s only flightless nocturnal parrot.", productIds: [2], color: "#27613c", side: "#17452b", accent: "#b3cf35", glyph: "✦" },
  { id: "hidden", name: "Hidden Waters", habitat: "Mountain river", copy: "A wrinkled river giant with a pancake head and an ancient amphibian silhouette.", productIds: [3], color: "#6a3b2b", side: "#49271d", accent: "#e2a72d", glyph: "≋" },
];

type AnimalRecord = {
  code: string;
  name: string;
  species: string;
  place: string;
  habitat: string;
  image: string;
  lat: number;
  lng: number;
  marker: string;
  color: string;
};

const animalRecords: AnimalRecord[] = [
  { code: "OD-REDSY-104", name: "Redsy", species: "Red handfish", place: "Frederick Henry Bay, Tasmania", habitat: "Shallow rocky reef", image: "/cards/red-handfish.png", lat: -42.96, lng: 147.53, marker: "HF", color: "#9f352d" },
  { code: "OD-MOSS-208", name: "Moss", species: "Kākāpō", place: "Whenua Hou, Aotearoa New Zealand", habitat: "Predator-free island forest", image: "/cards/kakapo.png", lat: -46.77, lng: 167.64, marker: "KP", color: "#476f2e" },
  { code: "OD-WRINKLE-311", name: "Wrinkle", species: "Chinese giant salamander", place: "Central and southern China", habitat: "Cool, fast-flowing mountain rivers", image: "/cards/chinese-giant-salamander.png", lat: 30.55, lng: 110.48, marker: "GS", color: "#584636" },
  { code: "OD-FLAP-419", name: "Flap", species: "Dumbo octopus", place: "North Atlantic deep sea", habitat: "Cold abyssal plains, roughly 3,000–4,000 m deep", image: "/plushies/dumbo-octopus-ugly.png", lat: 38.2, lng: -31.1, marker: "DO", color: "#164f74" },
  { code: "OD-TRUFFLE-526", name: "Truffle", species: "Purple frog", place: "Western Ghats, India", habitat: "Underground in tropical forest soil", image: "/plushies/purple-frog-ugly.png", lat: 10.18, lng: 76.5, marker: "PF", color: "#4d2b50" },
  { code: "OD-KNUCKLES-637", name: "Knuckles", species: "Aye-aye", place: "Eastern Madagascar", habitat: "Tropical rainforest canopy", image: "/plushies/aye-aye-ugly.png", lat: -18.8, lng: 48.45, marker: "AA", color: "#3d362f" },
];

function TrackerForm({ code, setCode, onSubmit, compact = false }: { code: string; setCode: (value: string) => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; compact?: boolean }) {
  return (
    <form className={`tracker-form ${compact ? "compact" : ""}`} onSubmit={onSubmit}>
      <label htmlFor={compact ? "animal-id-bottom" : "animal-id-top"}>{compact ? "Enter your animal or mystery-box ID" : "Already adopted? Find your animal"}</label>
      <div>
        <input id={compact ? "animal-id-bottom" : "animal-id-top"} value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="Try OD-REDSY-104" aria-label="Animal ID" autoCapitalize="characters" autoCorrect="off" autoComplete="off" spellCheck={false} enterKeyHint="search" />
        <button type="submit">Find origin <Icon name="arrow" /></button>
      </div>
    </form>
  );
}

function Icon({ name }: { name: "bag" | "heart" | "menu" | "arrow" | "close" | "leaf" | "check" }) {
  const paths = {
    bag: <><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    leaf: <><path d="M20 4c-8 0-14 4-14 11 0 2 1 4 3 5"/><path d="M4 20c3-5 7-8 13-11"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<HabitatBox[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [selectedBoxId, setSelectedBoxId] = useState(habitatBoxes[0].id);
  const [creatureIndex, setCreatureIndex] = useState(0);
  const [animalCode, setAnimalCode] = useState("");
  const [openMyths, setOpenMyths] = useState<string[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalRecord>(animalRecords[0]);
  const [lookupMessage, setLookupMessage] = useState("Try a sample ID to reveal its home.");
  const visibleProducts = useMemo(() => filter === "All" ? products : products.filter((p) => p.region === filter), [filter]);
  const total = cart.length * CARD_PACK_PRICE;
  const selectedBox = habitatBoxes.find((box) => box.id === selectedBoxId) ?? habitatBoxes[0];
  const selectedCard = products.find((product) => selectedBox.productIds.includes(product.id)) ?? products[0];
  const creature = products[creatureIndex];
  const creatureRecord = animalRecords[creatureIndex];

  useEffect(() => {
    const locked = cartOpen || menuOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    if (!locked) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setCartOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [cartOpen, menuOpen]);

  const addToCart = (box: HabitatBox) => {
    setCart((items) => [...items, box]);
    setCartOpen(true);
  };

  const findAnimal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const record = animalRecords.find((animal) => animal.code === animalCode.trim().toUpperCase());
    if (!record) {
      setLookupMessage("We couldn’t find that ID. Check the tag and try again.");
      return;
    }
    setSelectedAnimal(record);
    setLookupMessage(`${record.name} found. Map pin updated.`);
    window.setTimeout(() => document.getElementById("origin-map")?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  };

  return (
    <main>
      <div className="announcement"><span>Habitat card packs are open</span><span>•</span><span>10 cards in every pack</span></div>
      <header className="nav-wrap">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="logo" href="#top" aria-label="Oddkin home"><span className="logo-mark">O</span> oddkin</a>
          <div id="main-menu" className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#blind-boxes" onClick={() => setMenuOpen(false)}>Card packs</a>
            <a href="#shop" onClick={() => setMenuOpen(false)}>Meet the pulls</a>
            <a href="#myths" onClick={() => setMenuOpen(false)}>Spot the myth</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How it helps</a>
            <a href="#sticker-cards" onClick={() => setMenuOpen(false)}>Peelable cards</a>
            <a href="#origin-map" onClick={() => setMenuOpen(false)}>Track your friend</a>
          </div>
          <div className="nav-actions">
            <button className="icon-button mobile-menu" aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name="menu" /></button>
            <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag with ${cart.length} card pack${cart.length === 1 ? "" : "s"}`}><Icon name="bag" /><span>Bag</span><b>{cart.length}</b></button>
          </div>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="shell hero-layout">
          <div className="hero-content">
            <span className="eyebrow"><Icon name="leaf" /> Habitat series · drop 01</span>
            <h1>Ugly by nature.<br/><em>Hidden by design.</em></h1>
            <p>Pick a habitat, open a card pack, and collect a magnificently strange animal. The card is a surprise. The efforts for conservation are not.</p>
            <div className="hero-actions">
              <a className="button primary" href="#blind-boxes">Choose a card pack <Icon name="arrow" /></a>
              <a className="text-link" href="#shop">See possible pulls</a>
            </div>
            <TrackerForm code={animalCode} setCode={setAnimalCode} onSubmit={findAnimal} />
          </div>
          <div className="hero-template" aria-label="Endangered animals and their collector cards">
            <div className="template-sun" />
            <div className="template-hill hill-one" /><div className="template-hill hill-two" />
            {heroCards.map((card, index) => (
              <figure className={`hero-card hero-card-${index + 1}`} key={card.name}>
                <div className="hero-card-media">
                  <div className="hero-card-photo"><Image src={card.card} alt={`${card.species} collector card`} fill sizes="(max-width: 600px) 150px, 230px" priority={index === 0} /></div>
                  <span className="hero-wild"><Image src={card.wild} alt={`${card.species} in the wild`} fill sizes="90px" /></span>
                  <span className="hero-wild-tag">In the wild</span>
                </div>
                <figcaption><b>{card.name}</b><small>{card.species}</small></figcaption>
              </figure>
            ))}
            <div className="hero-blind-box" aria-hidden="true"><BoxScene id="ocean" /><span>ODDKIN</span><b>OCEAN<br/>DEPTHS</b><i>?</i><small>Habitat card pack · 01</small></div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Brand qualities">
        {['Habitat card packs','Myth-busting species cards','One strange pull inside','Every claim has a source'].map((item) => <span key={item}>{item}<i>✿</i></span>)}
      </section>

      <section className="blind-box-section" id="blind-boxes">
        <div className="shell">
          <div className="section-heading split blind-box-heading">
            <div><span className="kicker light">Choose your ecosystem</span><h2>Three habitats.<br/>Zero normal faces.</h2></div>
            <p>Each solid-cardboard box is themed to the animals’ wild homes. The seal carries the ID you can enter on the map after opening. Inside, a peelable collector card turns the animal into a sticker.</p>
          </div>
          <div className="box-grid">
            {habitatBoxes.map((box, index) => {
              const boxAnimal = products.find((product) => box.productIds.includes(product.id));
              return (
              <button
                type="button"
                key={box.id}
                className={`box-card ${selectedBoxId === box.id ? "selected" : ""}`}
                onClick={() => setSelectedBoxId(box.id)}
                aria-pressed={selectedBoxId === box.id}
                style={{ "--box-color": box.color, "--box-side": box.side, "--box-accent": box.accent } as React.CSSProperties}
              >
                <span className="box-number">0{index + 1}</span>
                <span className="box-object" aria-hidden="true">
                  <span className="box-top" />
                  <span className="box-side" />
                  <span className="box-front"><BoxScene id={box.id as "ocean" | "forest" | "hidden"} /><small>ODDKIN</small><b>{box.name}</b><em>HABITAT CARD PACK</em></span>
                  {boxAnimal && <span className="box-peek"><Image src={boxAnimal.image} alt="" fill sizes="110px" /></span>}
                </span>
                <span className="box-copy"><small>{box.habitat}</small><b>{box.name}</b><span>{box.copy}</span>{boxAnimal && <span className="box-inside"><i>Example pull</i> {boxAnimal.name} · {boxAnimal.species}</span>}</span>
              </button>
              );
            })}
          </div>
          <div className="purchase-panel">
            <div className="purchase-copy"><span className="kicker">Selected card pack</span><h3>{selectedBox.name}</h3><p>10 peelable collector cards from this habitat series, packed at random and ready to collect, trade, or stick.</p><button type="button" className="button buy-pack" onClick={() => addToCart(selectedBox)}>Add card pack to bag · ${CARD_PACK_PRICE.toFixed(2)} <span aria-hidden="true">+</span></button></div>
            <div className="pack-preview" style={{ background: selectedBox.color }} aria-label={`${selectedBox.name} collector card pack`}>
              <div className="pack-preview-card"><Image src={selectedCard.image} alt={`${selectedCard.species} collector card`} fill sizes="210px" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" id="shop">
        <div className="section-heading split">
          <div><span className="kicker">Example pulls · series 01</span><h2>Meet the faces hiding inside</h2></div>
          <p>10 cards per pack. 10 different possibilities of ugly-cute animals.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter example pulls by habitat">
          {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-art" style={{ background: product.color, color: product.accent }}>
                {product.badge && <span className="badge">{product.badge}</span>}
                <button className={`favorite ${favorites.includes(product.id) ? "saved" : ""}`} aria-label={`Save ${product.name}`} onClick={() => setFavorites((items) => items.includes(product.id) ? items.filter((id) => id !== product.id) : [...items, product.id])}><Icon name="heart" /></button>
                <Image className="product-photo" src={product.image} alt={`${product.species} collector card artwork`} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
                <span className="habitat-ring one"/><span className="habitat-ring two"/>
              </div>
              <div className="product-info">
                <div><span className="species">{product.species}</span><h3>{product.name}</h3></div>
              </div>
              <div className="product-meta"><span className={`status ${product.rarity.startsWith("Critically") ? "critical" : ""}`}>{product.rarity}</span><span>{product.region}</span></div>
              {(() => {
                const sourceBox = habitatBoxes.find((box) => box.productIds.includes(product.id));
                return sourceBox ? <a className="add-button" href="#blind-boxes" onClick={() => setSelectedBoxId(sourceBox.id)}>Only in the {sourceBox.name} pack <span>→</span></a> : null;
              })()}
            </article>
          ))}
        </div>
        <div className="wildlife-heading">
          <div><span className="kicker">Coming up next</span><h2>Future card waitlist</h2></div>
          <p>Four wonderfully strange animals we’re considering for future card packs.</p>
        </div>
        <div className="wildlife-grid">
          {wildlifeReferences.map((animal) => (
            <article className="wildlife-card" key={animal.name}>
              <div className="wildlife-photo">
                <Image src={animal.image} alt={`${animal.name} in the wild`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ objectPosition: animal.imagePosition ?? "center" }} />
                <span>Real animal</span>
              </div>
              <div className="wildlife-copy"><small>{animal.scientificName}</small><h3>{animal.name}</h3><p>{animal.place}</p><a href={animal.sourceUrl} target="_blank" rel="noreferrer">Photo: {animal.credit} <Icon name="arrow" /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="myth-section" id="myths">
        <div className="shell">
          <div className="section-heading split">
            <div><span className="kicker">Misinformation check</span><h2>Spot the myth before it spreads</h2></div>
            <p>Strange animals attract strange claims. Every card pack carries a peelable card that busts one of them. Here are three, with the evidence behind each answer.</p>
          </div>
          <div className="myth-grid">
            {mythChecks.map((myth) => {
              const open = openMyths.includes(myth.id);
              return (
                <article className={`myth-card ${open ? "open" : ""}`} key={myth.id}>
                  <div className="myth-photo" style={{ background: myth.color }}>
                    <Image src={myth.image} alt={`${myth.animal} card artwork`} fill sizes="(max-width: 900px) 100vw, 33vw" />
                    <span className="myth-animal">{myth.animal}</span>
                  </div>
                  <div className="myth-body">
                    <span className="myth-label claim">Claim going around</span>
                    <p className="myth-claim">&ldquo;{myth.claim}&rdquo;</p>
                    <button type="button" className="myth-toggle" aria-expanded={open} onClick={() => setOpenMyths((items) => open ? items.filter((id) => id !== myth.id) : [...items, myth.id])}>
                      {open ? "Hide the fact-check" : "Fact-check this"} <Icon name={open ? "close" : "arrow"} />
                    </button>
                    {open && (
                      <div className="myth-fact" aria-live="polite">
                        <span className="myth-verdict">Verdict: {myth.verdict}</span>
                        <p>{myth.fact}</p>
                        <a href={myth.url} target="_blank" rel="noreferrer">{myth.source} <Icon name="arrow" /></a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="impact-section" id="how">
        <div className="shell impact-grid">
          <div className="impact-copy">
            <span className="kicker light">Soft on you. Gentle on Earth.</span>
            <h2>A cuddle with a conservation story.</h2>
            <p>Oddkin turns curiosity into care. Every friend introduces its real-life species, its wild home, and one simple action your family can take.</p>
            <div className="impact-list">
              <div><span>01</span><p><b>Pick a habitat</b>Choose the card pack that matches the wild home you love.</p></div>
              <div><span>02</span><p><b>Keep it or peel it</b>Collect the card intact or stick the animal somewhere loud.</p></div>
              <div><span>03</span><p><b>Help their habitat</b>Part of every purchase supports field conservation.</p></div>
            </div>
          </div>
          <div className="impact-card">
            <div className="impact-orbit"><span className="big-leaf"><Icon name="leaf" /></span><strong>100%</strong><small>of each purchase<br/>supports wildlife</small></div>
            <p>Built around recycled fill, reduced-plastic packaging, and stories that make conservation feel hopeful.</p>
            <a href="#donate">Explore the mission <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <section className="truth-section" id="truth">
        <div className="shell truth-layout">
          <div className="truth-intro">
            <span className="kicker">Mystery toy. Verified story.</span>
            <h2>The internet moves fast.<br/>We’d rather get it right.</h2>
            <dl className="truth-define">
              <div><dt>Misinformation</dt><dd>False information shared by mistake, like passing along an AI-made animal video that looks real.</dd></div>
              <div><dt>Disinformation</dt><dd>False information spread on purpose, like selling wild-caught animals as captive-bred.</dd></div>
            </dl>
          </div>
          <div className="stat-grid">
            <article><strong>292%</strong><p>rise in wildlife selfies posted on Instagram from 2014 to 2017. About 4 in 10 showed someone holding, hugging, or otherwise handling a wild animal.</p><a href="https://www.newswire.ca/news-releases/iconic-wild-animals-suffering-for-selfies-649260263.html" target="_blank" rel="noreferrer">World Animal Protection, 2017 <Icon name="arrow" /></a></article>
            <article><strong>4%</strong><p>of the roughly 14,000 tweets about one viral lemur video said the poster wanted a pet lemur, a species it is illegal to keep as a pet in most of the US.</p><a href="https://doi.org/10.1371/journal.pone.0208577" target="_blank" rel="noreferrer">PLOS ONE, 2019 <Icon name="arrow" /></a></article>
            <article><strong>≈10%</strong><p>of the roughly 2 million known species on Earth have ever been formally assessed for extinction risk, so for most animals, their status is still an open question.</p><a href="https://www.iucnredlist.org/resources/summary-statistics" target="_blank" rel="noreferrer">IUCN Red List <Icon name="arrow" /></a></article>
            <article className="biodiversity-stat"><strong>≈1M</strong><p>animal and plant species face extinction, which is exactly why clear, sourced biodiversity information matters.</p><a href="https://www.ipbes.net/system/files/2021-06/2020%20IPBES%20GLOBAL%20REPORT%20%28CHAPTER%202.2%29_V3_SINGLE_0.pdf" target="_blank" rel="noreferrer">IPBES Global Assessment <Icon name="arrow" /></a></article>
          </div>
        </div>
        <div className="shell fact-check-strip"><span><b>MYTH</b> Weird animals are less worth saving.</span><span><b>CHECK</b> Find the original source.</span><span><b>SHARE</b> Lead with evidence, not virality.</span></div>
      </section>

      <section className="map-section" id="origin-map">
        <div className="shell map-heading">
          <div><span className="kicker light">Every card has a place</span><h2>Trace your friend back to the wild.</h2></div>
          <div className="lookup-status" role="status"><span className={lookupMessage.startsWith("We") ? "status-dot error" : "status-dot"}/>{lookupMessage}</div>
        </div>
        <div className="shell map-layout">
          <OriginMap animals={animalRecords} selectedCode={selectedAnimal.code} onSelect={(code) => { const animal = animalRecords.find((record) => record.code === code); if (!animal) return; setSelectedAnimal(animal); setAnimalCode(animal.code); setLookupMessage(`${animal.name} selected. Now showing ${animal.place}.`); }} />
          <aside className="origin-card" style={{ borderColor: selectedAnimal.color }}>
            <div className="origin-code"><span>SPECIMEN ID</span><b>{selectedAnimal.code}</b></div>
            <div className="origin-plush" style={{ background: selectedAnimal.color }}><Image src={selectedAnimal.image} alt={`${selectedAnimal.species} card artwork`} fill sizes="92px" /></div>
            <span className="kicker">Origin unlocked</span>
            <h3>{selectedAnimal.name}</h3>
            <p className="origin-species">{selectedAnimal.species}</p>
            <dl><div><dt>Wild home</dt><dd>{selectedAnimal.place}</dd></div><div><dt>Habitat</dt><dd>{selectedAnimal.habitat}</dd></div></dl>
            <button type="button" onClick={() => document.getElementById("creature-lab")?.scrollIntoView({ behavior: "smooth" })}>Visit the creature lab <Icon name="arrow" /></button>
          </aside>
        </div>
        <div className="shell sample-codes"><span>Sample IDs:</span>{animalRecords.slice(0, 4).map((animal) => <button key={animal.code} onClick={() => setAnimalCode(animal.code)}>{animal.code}</button>)}</div>
      </section>

      <section className="creature-section" id="creature-lab">
        <div className="shell creature-layout">
          <div className="creature-copy">
            <span className="kicker">Card specimen · {creature.scientificName}</span>
            <h2>Meet the {creature.species.toLowerCase()}.<br/>Strange is worth saving.</h2>
            <p>{mythChecks[creatureIndex].fact}</p>
            <div className="creature-facts"><div><span>Habitat</span><b>{creatureRecord.habitat}</b></div><div><span>Status</span><b>{creature.rarity}</b></div><div><span>Wild home</span><b>{creatureRecord.place}</b></div></div>
            <p className="drag-note">Designed as bold, peelable card art with species details that turn curiosity into real conservation knowledge.</p>
            <div className="creature-controls" aria-label="Choose an animal card">
              <button type="button" className="creature-step previous" onClick={() => setCreatureIndex((creatureIndex + products.length - 1) % products.length)} aria-label="Previous animal"><Icon name="arrow" /></button>
              <div>{products.map((product, index) => <button type="button" key={product.id} className={index === creatureIndex ? "active" : ""} aria-pressed={index === creatureIndex} onClick={() => setCreatureIndex(index)}>{product.species}</button>)}</div>
              <button type="button" className="creature-step" onClick={() => setCreatureIndex((creatureIndex + 1) % products.length)} aria-label="Next animal"><Icon name="arrow" /></button>
            </div>
          </div>
          <div className="plush-showcase" key={creature.id}><Image src={creature.image} alt={`${creature.species} collector card`} fill sizes="(max-width: 900px) 100vw, 58vw" priority /></div>
        </div>
      </section>

      <section className="donation-section" id="donate">
        <div className="shell donation-heading"><div><span className="kicker light">Direct support, no middleman</span><h2>Help the real animals,<br/>not just the ones on the cards.</h2></div><p>Oddkin does not collect these donations. Each button opens the conservation program’s own secure donation page so you can see exactly who receives your support.</p></div>
        <div className="shell donation-grid">
          <article><div className="donation-plush"><Image src="/cards/red-handfish.png" alt="Red handfish collector card" fill sizes="160px" /></div><span>Australia · marine recovery</span><h3>Handfish Conservation Project</h3><p>Support surveys, habitat restoration, captive breeding, and reintroduction for Tasmania’s rare handfish.</p><a href="https://handfish.org.au/donate/" target="_blank" rel="noreferrer">Donate to handfish <Icon name="arrow"/></a></article>
          <article><div className="donation-plush"><Image src="/cards/kakapo.png" alt="Kākāpō collector card" fill sizes="160px" /></div><span>Aotearoa New Zealand · species recovery</span><h3>Kākāpō Recovery</h3><p>Fund monitoring, research, health checks, predator control, and management of breeding seasons.</p><a href="https://www.doc.govt.nz/kakapo-donate" target="_blank" rel="noreferrer">Donate to kākāpō <Icon name="arrow"/></a></article>
          <article><div className="donation-plush"><Image src="/cards/chinese-giant-salamander.png" alt="Chinese giant salamander collector card" fill sizes="160px" /></div><span>China · amphibian conservation</span><h3>Giant salamander conservation</h3><p>Learn about the field work protecting fragmented river populations and support ZSL conservation programs.</p><a href="https://www.zsl.org/what-we-do/projects/chinese-giant-salamander-conservation" target="_blank" rel="noreferrer">Visit the program <Icon name="arrow"/></a></article>
        </div>
      </section>

      <section className="sticker-section shell" id="sticker-cards">
        <div className="finished-card-stack" aria-label="The Red Handfish, Kākāpō, and Chinese giant salamander collector cards">
          <div className="finished-card card-red"><Image src="/cards/red-handfish.png" alt="Red Handfish collector card" fill sizes="260px" /></div>
          <div className="finished-card card-kakapo"><Image src="/cards/kakapo.png" alt="Kākāpō collector card" fill sizes="260px" /></div>
          <div className="finished-card card-salamander"><Image src="/cards/chinese-giant-salamander.png" alt="Chinese giant salamander collector card" fill sizes="260px" /></div>
        </div>
        <div className="sticker-copy">
          <span className="kicker">Your card, your call</span>
          <h2>Pull your card. Do whatever you want with it.</h2>
          <p>Keep it, trade it, stick it somewhere, or frame it. It’s your own little piece of art.</p>
          <ul><li><Icon name="check" /> Trading-card size and numbered by series</li><li><Icon name="check" /> Durable animal sticker on every card</li><li><Icon name="check" /> Hidden artwork stays behind after the peel</li></ul>
          <a className="button dark" href="#blind-boxes">Pull your first card <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="bottom-tracker">
        <div className="shell bottom-tracker-grid">
          <div><span className="kicker light">One last thing</span><h2>Where did your wild friend begin?</h2><p>The ID is printed on the adoption card or mystery-box seal.</p></div>
          <TrackerForm code={animalCode} setCode={setAnimalCode} onSubmit={findAnimal} compact />
        </div>
      </section>

      <section className="newsletter shell">
        <div><span className="kicker">Join the field notes</span><h2>New creatures. Real sources. Zero rumors.</h2></div>
        {newsletter ? <div className="newsletter-success"><Icon name="check" /><span><b>You’re on the trail!</b> Watch your inbox for the next field note.</span></div> : <form onSubmit={(e) => { e.preventDefault(); setNewsletter(true); }}><label className="sr-only" htmlFor="email">Email address</label><input required type="email" id="email" placeholder="Your email address" autoComplete="email" inputMode="email" enterKeyHint="send"/><button type="submit">Join the club <Icon name="arrow" /></button><small>By joining, you agree to receive occasional wild news. Unsubscribe anytime.</small></form>}
      </section>

      <footer>
        <div className="shell footer-grid"><div><a className="logo footer-logo" href="#top"><span className="logo-mark">O</span> oddkin</a><p>Cards with a purpose.<br/>Made for curious minds and wild hearts.</p></div><div><b>Explore</b><a href="#shop">Shop all</a><a href="#sticker-cards">Peelable cards</a></div><div><b>Help</b><a href="#top">Shipping & returns</a><a href="#top">Care guide</a><a href="#top">Contact</a></div><div><b>Our promise</b><a href="#how">Giving back</a><a href="#how">Materials</a><a href="#how">Conservation</a></div></div>
        <div className="shell footer-bottom"><span>© 2026 Oddkin. Concept storefront.</span><span>Made with care for the wonderfully wild.</span></div>
      </footer>

      {cartOpen && <><button className="drawer-backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)}/><aside className="cart-drawer" aria-label="Shopping bag"><div className="drawer-title"><div><span>Your field bag</span><h2>{cart.length ? `${cart.length} card pack${cart.length > 1 ? "s" : ""}` : "Ready for an adventure"}</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><Icon name="close" /></button></div>{cart.length === 0 ? <div className="empty-cart"><span><Icon name="leaf"/></span><h3>Your bag is feeling light</h3><p>Pick a habitat card pack and a mystery friend will travel home with you.</p><button className="button dark" onClick={() => { setCartOpen(false); document.getElementById("blind-boxes")?.scrollIntoView({ behavior: "smooth" }); }}>Choose a card pack</button></div> : <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><span className="cart-box" style={{background:item.color}} aria-hidden="true">{item.glyph}</span><div><small>10 mystery cards inside</small><b>{item.name} pack</b><button onClick={() => setCart(items => items.filter((_, i) => i !== index))}>Remove</button></div><strong>${CARD_PACK_PRICE.toFixed(2)}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>${total.toFixed(2)}</b></div><small>Shipping calculated at checkout. 100% supports wildlife.</small><button className="checkout">Checkout · ${total.toFixed(2)}</button></div></>}</aside></>}
    </main>
  );
}
