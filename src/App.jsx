import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, CalendarDays, Sparkles, Flower2, Hand, ArrowDown, Clock3, Music2, Camera, Navigation, ChevronDown } from 'lucide-react';
import { wedding } from './weddingData';

function Countdown() {
  const target = useMemo(() => new Date(wedding.isoDate || '2026-12-20T18:00:00'), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(id); }, []);
  const diff = Math.max(0, target.getTime() - now);
  const units = [
    ['Days', Math.floor(diff / 86400000)],
    ['Hours', Math.floor(diff / 3600000) % 24],
    ['Minutes', Math.floor(diff / 60000) % 60],
    ['Seconds', Math.floor(diff / 1000) % 60]
  ];
  return <div className="countdown">{units.map(([label, value]) => <div className="count-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}</div>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [reveal, setReveal] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const handleOpen = () => {
    if (opening || opened) return;
    setOpening(true);
    window.setTimeout(() => { setOpened(true); setOpening(false); }, 1050);
  };
  const addToCalendar = () => {
    const start = (wedding.isoDate || '2026-12-20T18:00:00').replaceAll('-', '').replaceAll(':', '');
    const end = (wedding.isoEndDate || '2026-12-20T23:00:00').replaceAll('-', '').replaceAll(':', '');
    const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//EN','BEGIN:VEVENT',`DTSTART:${start}`,`DTEND:${end}`,`SUMMARY:${wedding.groom} & ${wedding.bride} — Wedding`,`LOCATION:${wedding.venue}, ${wedding.address}`,'DESCRIPTION:Join us to celebrate a beautiful beginning.','END:VEVENT','END:VCALENDAR'].join('\\r\\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a'); a.href = url; a.download = 'wedding-invitation.ics'; a.click(); URL.revokeObjectURL(url);
  };
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue + ', ' + wedding.address)}`;
  return <main>
    <div className="ambient" aria-hidden="true"><span>✿</span><span>✧</span><span>❀</span><span>✿</span><span>❧</span></div>
    <section className="hero" id="home">
      <div className="topline"><span>THE WEDDING CELEBRATION</span><Heart size={14}/><span>{wedding.shortDate}</span></div>
      
      {!opened ? <motion.div className="envelope-wrap" key="envelope" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.92}}>
        <div className="eyebrow">A little note, sealed with love</div>
        <motion.div className={`envelope ${opening ? 'opening' : ''}`} drag={opening ? false : 'y'} dragConstraints={{top:-100,bottom:0}} dragElastic={0.16} onDragEnd={(_,info)=>{if(info.offset.y < -35 || info.velocity.y < -250) handleOpen();}} onClick={handleOpen} role="button" tabIndex="0" aria-label="Swipe up or tap to open the wedding invitation" onKeyDown={e=>e.key==='Enter'&&handleOpen()}>
          <div className="letter"><span>A SPECIAL INVITATION</span><strong>You're Invited</strong><span>WITH LOVE & JOY</span></div><div className="flap"></div><div className="seal"><Heart fill="currentColor" size={22}/></div>
        </motion.div>
        <div className="swipe-cue"><Hand size={20}/><span>SWIPE UP TO OPEN</span><span className="swipe-arrow">↑</span></div><p className="tap">OR TAP THE WAX SEAL</p>
      </motion.div> : <div className="invitation">
        <div className="ornament">❧</div><div className="eyebrow">Together with our families</div>
        <p className="hero-kicker">JOYFULLY INVITE YOU TO CELEBRATE</p><h1>We're getting<br/><i>married</i></h1>
        <p className="intro">{wedding.message}</p>
        <div className="names"><span>{wedding.groom}</span><b>&</b><span>{wedding.bride}</span></div>
        <div className="date-line"><span></span><p>{wedding.date}</p><span></span></div>
        <a className="scroll-cue" href="#reveal">SCROLL TO EXPLORE <ChevronDown size={15}/></a>
      </motion.div>}
      
      <div className="bottom-note">MADE WITH LOVE <Heart size={12} fill="currentColor"/></div>
    </section>
    {opened && <motion.div className="content" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}}>
      <section className="intro-strip"><Flower2 size={27}/><p>Two hearts, one beautiful journey.<br/><i>A lifetime of love begins here.</i></p><span className="tiny-rule"></span></section>
      <section className="reveal-section" id="reveal">
        <div className="section-label">A MOMENT TO REMEMBER</div><h2>Unveil our <i>special day</i></h2><p className="section-copy">A little golden surprise is waiting for you. Slide to discover the day our forever begins.</p>
        <div className={`reveal-card ${revealed ? 'is-revealed' : ''}`}>
          <div className="reveal-card-inner"><span className="mini-flower">✿</span><p className="reveal-overline">SAVE THIS BEAUTIFUL DATE</p><strong>{wedding.date}</strong><span className="reveal-venue">{wedding.venue}</span><div className="reveal-divider">✧ &nbsp; ❧ &nbsp; ✧</div><Countdown/><span className="reveal-blessing">WE CAN’T WAIT TO CELEBRATE WITH YOU</span></div>
          {!revealed && <div className="reveal-cover"><span className="cover-flower">✿</span><span>THE COUNTDOWN TO FOREVER</span><strong>{wedding.shortDate}</strong><small>SLIDE THE GOLDEN SEAL</small><span className="cover-heart">♡</span></div>}
        </div>
        <div className="slider-wrap"><span>←</span><input aria-label="Slide to reveal wedding date" type="range" min="0" max="100" value={reveal} onChange={e=>{const n=Number(e.target.value);setReveal(n);if(n>94)setRevealed(true);}}/><span>→</span></div>
        <p className="slider-hint"><Hand size={15}/> {revealed ? 'THE DATE IS REVEALED — SAVE IT!' : 'DRAG THE GOLDEN HANDLE TO REVEAL'}</p>
      </section>
      <section className="details">
        <div className="section-label">SAVE THE DATE</div><h2>The day we've<br/><i>been dreaming of</i></h2>
        <div className="info-grid"><article><CalendarDays/><span>WHEN</span><strong>{wedding.date}</strong><small>{wedding.time}</small></article><article><MapPin/><span>WHERE</span><strong>{wedding.venue}</strong><small>{wedding.address}</small></article></div>
        <button className="solid-btn" onClick={addToCalendar}><CalendarDays size={16}/> Add to calendar</button>
      </section>
      <section className="events"><div className="section-label">THE CELEBRATIONS</div><h2>Wedding <i>festivities</i></h2><p className="section-copy">Every ritual, every laugh, every little moment — made special with you.</p>
        <div className="event-list">{wedding.events.map((event,i)=><motion.article className="event" key={event.name} initial={{opacity:0,x:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.1}}><div className="event-number">0{i+1}</div><div><h3>{event.name}</h3><p>{event.note}</p><small>{event.date} · {event.time}</small></div><Sparkles size={18}/></motion.article>)}</div>
      </section>
      <section className="story"><div className="section-label">A TALE OF TWO HEARTS</div><h2>Our <i>story</i></h2><div className="story-art"><div className="story-circle">A <span>♡</span> A</div><div className="story-caption"><span>ONE BEAUTIFUL JOURNEY</span><p>Two families, two hearts, and a promise of forever.</p></div></div><p className="story-note">The best chapters are the ones we write together. We can't wait to begin this new one surrounded by the people we love.</p></section>
      <section className="venue"><div className="section-label">FIND YOUR WAY</div><h2>How to <i>reach us</i></h2><div className="map-card"><div className="map-art"><span className="map-road road-one"></span><span className="map-road road-two"></span><span className="map-pin"><MapPin size={25}/></span><span className="map-label">THE CELEBRATION</span></div><div className="venue-copy"><MapPin size={19}/><h3>{wedding.venue}</h3><p>{wedding.address}</p><a className="solid-btn" href={mapsUrl} target="_blank" rel="noreferrer"><Navigation size={15}/> Get directions</a></div></div></section>
      <section className="closing"><div className="ornament">❧</div><p>We saved you a seat<br/><i>in our forever story.</i></p><div className="footer-names">{wedding.groom} <span>&</span> {wedding.bride}</div><span className="closing-date">{wedding.date} · {wedding.time}</span><Heart size={17} fill="currentColor"/></section>
      <footer><small>WITH LOVE & GRATITUDE</small><p>WE CAN'T WAIT TO CELEBRATE WITH YOU</p><a href="#home">BACK TO TOP ↑</a></footer>
    </motion.div>}
  </main>;
}
export default App;
