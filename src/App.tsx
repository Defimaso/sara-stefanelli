import { useEffect, useRef, useState } from 'react'
import './App.css'

// Hook per intersection observer
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const LANGS = [
  { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'AR', name: 'العربية', flag: '🇦🇪' },
]

const EVENTS = [
  {
    title: 'MILAN FASHION WEEK',
    loc: 'Milano, Italy',
    tag: 'Fashion',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
  },
  {
    title: 'DUBAI WORLD CUP',
    loc: 'Dubai, UAE',
    tag: 'Sport & Luxury',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop',
  },
  {
    title: 'CANNES FILM FESTIVAL',
    loc: 'Cannes, France',
    tag: 'Cinema & Arts',
    img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80&fit=crop',
  },
  {
    title: 'MALDIVES RETREAT',
    loc: 'Maldives',
    tag: 'Luxury Travel',
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80&fit=crop',
  },
  {
    title: 'MONACO GRAND PRIX',
    loc: 'Monaco',
    tag: 'Motorsport',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
  },
  {
    title: 'VENICE BIENNALE',
    loc: 'Venezia, Italy',
    tag: 'Art & Culture',
    img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80&fit=crop',
  },
]

const PILLARS = [
  {
    num: '01',
    title: 'EVENTS',
    sub: 'Luxury & Exclusive',
    body: 'From fashion weeks to royal galas — front row access to the world\'s most coveted events. Documented. Felt. Shared.',
  },
  {
    num: '02',
    title: 'TRAVEL',
    sub: 'Uncharted & Refined',
    body: 'Private villas, hidden gems, five-star wilderness. Every destination tells a story worth living — and worth telling.',
  },
  {
    num: '03',
    title: 'STORYTELLING',
    sub: '5 Languages · Global Reach',
    body: 'Content that crosses borders. Authentic narratives crafted in Italian, English, Spanish, French, and Arabic.',
  },
]

const MARQUEE_ITEMS = [
  'EVENT BLOGGER', '✦', 'TRAVEL CREATOR', '✦', 'LUXURY LIFESTYLE', '✦',
  '50+ COUNTRIES', '✦', '5 LANGUAGES', '✦', 'BRAND COLLABORATIONS', '✦',
  'EVENT BLOGGER', '✦', 'TRAVEL CREATOR', '✦', 'LUXURY LIFESTYLE', '✦',
  '50+ COUNTRIES', '✦', '5 LANGUAGES', '✦', 'BRAND COLLABORATIONS', '✦',
]

export default function App() {
  const [navVisible, setNavVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const statsRef = useInView()
  const aboutRef = useInView(0.1)
  const pillarsRef = useInView(0.1)
  const eventsRef = useInView(0.05)
  const langRef = useInView(0.2)
  const ctaRef = useInView(0.3)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-ink min-h-screen">

      {/* ─── NAVBAR ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-ink/95 backdrop-blur-md border-b border-gold-700/20' : 'py-7'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="font-display font-bold text-cream text-sm tracking-widest uppercase">
            Sara<span className="text-gold-500">.</span>Stefanelli
          </span>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {['About', 'Events', 'Media Kit', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="nav-link">{l}</a>
            ))}
          </div>
          {/* CTA */}
          <a href="#contact" className="hidden md:block btn-luxury text-xs py-3 px-6">
            Collaborate
          </a>
          {/* Mobile menu */}
          <button
            onClick={() => setNavVisible(!navVisible)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-px bg-cream transition-all ${navVisible ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-px bg-cream transition-all ml-auto ${navVisible ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-cream transition-all ${navVisible ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
        {/* Mobile drawer */}
        {navVisible && (
          <div className="md:hidden bg-ink/98 backdrop-blur-lg px-6 py-8 flex flex-col gap-6 border-t border-gold-700/20">
            {['About', 'Events', 'Media Kit', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} onClick={() => setNavVisible(false)}
                className="nav-link text-base">{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=1800&q=85&fit=crop"
            alt="Sara Stefanelli Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32">
          <div className="gold-line mb-8 animate-fade-in" />
          <p className="text-gold-500 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-6 animate-fade-up delay-100 opacity-0">
            Event & Travel Blogger
          </p>
          <h1 className="font-display font-black text-cream leading-none mb-6">
            <span className="block text-[clamp(3.5rem,10vw,9rem)] animate-fade-up delay-200 opacity-0">
              SARA
            </span>
            <span className="block text-[clamp(3.5rem,10vw,9rem)] text-gold-gradient animate-glow animate-fade-up delay-300 opacity-0">
              STEFANELLI
            </span>
          </h1>
          <p className="text-cream/60 font-body font-light text-lg md:text-xl max-w-xl leading-relaxed mb-12 animate-fade-up delay-400 opacity-0">
            The world is a stage —<br />
            <em className="font-display italic text-cream/80">and she's always in the front row.</em>
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up delay-500 opacity-0">
            <a href="#about" className="btn-luxury">Discover More</a>
            <a href="#contact" className="btn-luxury border-cream/30 text-cream/60 hover:text-ink">
              Work With Me
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 animate-fade-in delay-800 opacity-0">
          <span className="text-cream/30 text-xs font-body tracking-widest uppercase rotate-90 origin-center mb-4">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold-500 to-transparent" />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="overflow-hidden py-5 border-y border-gold-700/20 bg-ink">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-cream/40">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section ref={statsRef.ref} className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gold-700/20">
          {[
            { n: '50+', label: 'Countries' },
            { n: '5', label: 'Languages' },
            { n: '200+', label: 'Luxury Events' },
            { n: '10+', label: 'Years on the Road' },
          ].map((s, i) => (
            <div key={s.label}
              className={`px-8 py-8 text-center transition-all duration-700 ${statsRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="font-display font-black text-gold-500 text-5xl md:text-6xl mb-2">{s.n}</div>
              <div className="text-cream/40 font-body text-xs tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── ABOUT ─── */}
      <section id="about" ref={aboutRef.ref} className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className={`img-zoom relative transition-all duration-1000 ${aboutRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&fit=crop"
              alt="Sara Stefanelli"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold-500/30" />
            <div className="absolute -top-6 -left-6 w-48 h-48 border border-gold-500/10" />
            {/* Badge */}
            <div className="absolute top-6 right-6 bg-ink/80 backdrop-blur border border-gold-700/30 px-4 py-3 text-center">
              <div className="text-gold-500 font-display font-black text-2xl">10+</div>
              <div className="text-cream/50 text-xs font-body tracking-widest uppercase">Years</div>
            </div>
          </div>

          {/* Text */}
          <div className={`transition-all duration-1000 delay-300 ${aboutRef.inView ? 'animate-slide-left opacity-100' : 'opacity-0'}`}>
            <div className="gold-line mb-8" />
            <p className="text-gold-500 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-4">
              About Sara
            </p>
            <h2 className="font-display font-black text-cream text-4xl md:text-5xl leading-tight mb-8">
              NOT JUST A<br />
              <span className="italic text-gold-gradient">TRAVELER.</span><br />
              AN EXPERIENCE.
            </h2>
            <p className="text-cream/60 font-body font-light text-base leading-relaxed mb-6">
              Sara Stefanelli moves through the world with an eye for the extraordinary.
              From the haute couture runways of Paris to the desert galas of the Gulf,
              she captures what most only dream of attending.
            </p>
            <p className="text-cream/60 font-body font-light text-base leading-relaxed mb-10">
              Fluent in <span className="text-gold-400 font-medium">five languages</span>, she doesn't just visit cultures —
              she speaks them. Her content bridges continents, connecting luxury brands
              with audiences across Europe, the Middle East, and beyond.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Luxury Travel', 'Events Coverage', 'Brand Strategy', 'Multi-Language Content'].map(tag => (
                <span key={tag} className="border border-gold-700/40 text-gold-500/80 text-xs font-body font-medium tracking-wider px-4 py-2 uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── PILLARS ─── */}
      <section ref={pillarsRef.ref} className="py-32 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${pillarsRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <p className="text-gold-500 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-4">What I Do</p>
          <h2 className="font-display font-black text-cream text-4xl md:text-6xl leading-tight">
            THE THREE<br />
            <span className="italic text-gold-gradient">UNIVERSES</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-gold-700/10">
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              className={`bg-ink p-10 md:p-14 group hover:bg-dark-700 transition-all duration-500 ${pillarsRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="text-gold-700/40 font-display font-black text-6xl mb-6 group-hover:text-gold-500/20 transition-colors">{p.num}</div>
              <div className="gold-line mb-6 group-hover:w-24 transition-all duration-500" />
              <h3 className="font-display font-black text-cream text-2xl md:text-3xl mb-2">{p.title}</h3>
              <p className="text-gold-500 text-xs font-body font-semibold tracking-widest uppercase mb-6">{p.sub}</p>
              <p className="text-cream/50 font-body font-light text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EVENTS GALLERY ─── */}
      <section id="events" ref={eventsRef.ref} className="py-32 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 transition-all duration-700 ${eventsRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
            <div>
              <p className="text-gold-500 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-4">Selected Moments</p>
              <h2 className="font-display font-black text-cream text-4xl md:text-6xl leading-tight">
                BEEN THERE.<br />
                <span className="italic text-gold-gradient">LIVED THAT.</span>
              </h2>
            </div>
            <p className="text-cream/40 font-body text-sm max-w-xs leading-relaxed">
              A glimpse into the events and destinations that define the Sara Stefanelli experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold-700/10">
            {EVENTS.map((ev, i) => (
              <div
                key={ev.title}
                className={`img-zoom relative group overflow-hidden transition-all duration-700 ${eventsRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <img src={ev.img} alt={ev.title} className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <span className="text-gold-500 text-xs font-body font-semibold tracking-widest uppercase mb-2 block">{ev.tag}</span>
                  <h3 className="font-display font-black text-cream text-xl mb-1">{ev.title}</h3>
                  <p className="text-cream/50 text-xs font-body font-medium tracking-wider uppercase">{ev.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LANGUAGES ─── */}
      <section id="languages" ref={langRef.ref} className="py-32 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${langRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <p className="text-gold-500 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-4">
            Global Voice
          </p>
          <h2 className="font-display font-black text-cream text-4xl md:text-6xl leading-tight">
            5 LANGUAGES.<br />
            <span className="italic text-gold-gradient">ONE VOICE.</span>
          </h2>
          <p className="text-cream/40 font-body font-light text-base mt-8 max-w-lg mx-auto leading-relaxed">
            Content that doesn't translate — it transforms. Authentic storytelling
            crafted natively in each language, for each culture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-gold-700/10">
          {LANGS.map((lang, i) => (
            <div
              key={lang.code}
              className={`bg-ink hover:bg-dark-700 transition-all duration-500 p-8 text-center group cursor-default ${langRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{lang.flag}</div>
              <div className="font-display font-black text-cream text-2xl mb-1 group-hover:text-gold-400 transition-colors">{lang.code}</div>
              <div className="text-cream/40 font-body text-xs tracking-widest uppercase">{lang.name}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── MEDIA KIT CTA ─── */}
      <section id="media-kit" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80&fit=crop"
            alt="Luxury"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-ink/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="gold-line mx-auto mb-8" />
          <p className="text-gold-500 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-6">
            Brand Collaborations
          </p>
          <h2 className="font-display font-black text-cream text-4xl md:text-6xl leading-tight mb-8">
            YOUR BRAND.<br />
            HER <span className="italic text-gold-gradient">WORLD.</span>
          </h2>
          <p className="text-cream/60 font-body font-light text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether it's a product launch in Paris, an exclusive resort in the Maldives,
            or a high-end event in Dubai — Sara brings her global audience along for the experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold-700/20 mb-12">
            {[
              { title: 'Luxury Hotels', sub: 'Resort & Hospitality' },
              { title: 'Fashion Brands', sub: 'Haute Couture & Ready-to-Wear' },
              { title: 'Events & Galas', sub: 'Exclusive Access Coverage' },
            ].map(item => (
              <div key={item.title} className="bg-ink/80 px-8 py-8">
                <div className="font-display font-bold text-cream text-lg mb-1">{item.title}</div>
                <div className="text-cream/40 font-body text-xs tracking-widest uppercase">{item.sub}</div>
              </div>
            ))}
          </div>
          <a href="#contact" className="btn-luxury inline-block">
            Request Media Kit
          </a>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" ref={ctaRef.ref} className="py-32 max-w-4xl mx-auto px-6 text-center">
        <div className={`transition-all duration-700 ${ctaRef.inView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <div className="gold-line mx-auto mb-8" />
          <p className="text-gold-500 text-xs font-body font-semibold tracking-[0.4em] uppercase mb-6">
            Let's Create Together
          </p>
          <h2 className="font-display font-black text-cream text-4xl md:text-6xl leading-tight mb-8">
            READY TO<br />
            <span className="italic text-gold-gradient">GO SOMEWHERE?</span>
          </h2>
          <p className="text-cream/50 font-body font-light text-base leading-relaxed mb-12 max-w-lg mx-auto">
            Collaborations, press trips, event coverage, brand ambassadorships —
            let's build something extraordinary together.
          </p>
          <a
            href="mailto:hello@sarastefanelli.com"
            className="btn-luxury inline-block text-sm"
          >
            hello@sarastefanelli.com
          </a>
          {/* Social */}
          <div className="flex justify-center gap-8 mt-16">
            {[
              { name: 'Instagram', href: 'https://instagram.com/personah' },
              { name: 'TikTok', href: '#' },
              { name: 'YouTube', href: '#' },
            ].map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                className="text-cream/30 font-body text-xs font-semibold tracking-widest uppercase hover:text-gold-500 transition-colors duration-300">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gold-700/20 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-cream/40 text-sm tracking-widest uppercase">
            Sara<span className="text-gold-700">.</span>Stefanelli
          </span>
          <span className="text-cream/20 font-body text-xs tracking-wider">
            © 2024 Sara Stefanelli. All rights reserved.
          </span>
          <a href="https://symplo.ai" target="_blank" rel="noreferrer"
            className="text-cream/20 font-body text-xs tracking-wider hover:text-cream/40 transition-colors">
            Made with Symplo.ai
          </a>
        </div>
      </footer>

    </div>
  )
}
