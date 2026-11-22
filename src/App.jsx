import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, CalendarDays, Clock, Sparkles, Music2, Flower2, ArrowDown } from 'lucide-react';
import { wedding } from './weddingData';

function App() {
  const [opened, setOpened] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const date = new Date('2026-12-20T18:00:00');
  const addToCalendar = () => {
    const ics = ['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','DTSTART:20261220T123000Z','DTEND:20261220T160000Z','SUMMARY:Aarav & Ananya — Wedding','LOCATION:The Celebration Garden, Chandigarh, India','DESCRIPTION:Join us to celebrate the wedding of Aarav and Ananya.','END:VEVENT','END:VCALENDAR'].join('\\r\\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a'); a.href = url; a.download = 'aarav-ananya-wedding.ics'; a.click(); URL.revokeObjectURL(url);
  };
  return <main>
    <div className="ambient"><span>✿</span><span>✧</span><span>❀</span><span>✿</span></div>
    <section className="hero">
      <div className="topline"><span>THE WEDDING CELEBRATION</span><Heart size={15}/><span>20 · 12 · 2026</span></div>
      <AnimatePresence mode="wait">
      {!opened ? <motion.div className="envelope-wrap" key="envelope" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.92}}>
        <div className="eyebrow">A little note for you</div>
        <div className="envelope" onClick={()=>setOpened(true)} role="button" tabIndex="0" onKeyDown={e=>e.key==='Enter'&&setOpened(true)}>
          <div className="letter"><span>YOU ARE</span><strong>Invited</strong><span>WITH LOVE</span></div>
          <div className="flap"></div><div className="seal"><Heart fill="currentColor" size={22}/></div>
        </div>
        <p className="tap">TAP THE SEAL TO OPEN</p>
      </motion.div> : <motion.div className="invitation" key="invite" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
        <div className="ornament">❧</div>
        <div className="eyebrow">Together with our families</div>
        <h1>We're getting<br/><i>married</i></h1>
        <p className="intro">{wedding.message}</p>
        <div className="names"><span>{wedding.groom}</span><b>&</b><span>{wedding.bride}</span></div>
        <div className="date-line"><span></span><p>{wedding.date}</p><span></span></div>
        <button className="outline-btn" onClick={()=>setShowDetails(true)}>Explore invitation <ArrowDown size={15}/></button>
      </motion.div>}
      </AnimatePresence>
      <div className="bottom-note">MADE WITH LOVE <Heart size={12} fill="currentColor"/></div>
    </section>
    {opened && <motion.div className="content" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.25}}>
      <section className="quote-section"><Flower2 className="flower" size={30}/><p>Two hearts, one beautiful journey.<br/><i>A lifetime of love begins here.</i></p><div className="tiny-rule"></div></section>
      <section className="details" id="details">
        <div className="section-label">SAVE THE DATE</div><h2>The day we've<br/><i>been dreaming of</i></h2>
        <div className="info-grid">
          <article><CalendarDays/><span>WHEN</span><strong>{wedding.date}</strong><small>{wedding.time}</small></article>
          <article><MapPin/><span>WHERE</span><strong>{wedding.venue}</strong><small>{wedding.address}</small></article>
        </div>
        <button className="solid-btn" onClick={addToCalendar}> <CalendarDays size={16}/> Add to calendar</button>
      </section>
      <section className="events"><div className="section-label">THE CELEBRATIONS</div><h2>Wedding <i>festivities</i></h2><div className="event-list">{wedding.events.map((event,i)=><motion.article className="event" key={event.name} initial={{opacity:0,x:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.12}}><div className="event-number">0{i+1}</div><div><h3>{event.name}</h3><p>{event.note}</p><small>{event.date} · {event.time}</small></div><Sparkles size={18}/></motion.article>)}</div></section>
      <section className="venue"><div className="section-label">FIND YOUR WAY</div><h2>We can't wait<br/><i>to see you</i></h2><p>{wedding.venue}<br/>{wedding.address}</p><a className="outline-btn link-btn" href="https://www.google.com/maps/search/?api=1&query=The+Celebration+Garden+Chandigarh" target="_blank" rel="noreferrer"><MapPin size={15}/> View location</a></section>
      <footer><div className="ornament">❧</div><p>With love,</p><div className="footer-names">{wedding.groom} & {wedding.bride}</div><small>WE CAN'T WAIT TO CELEBRATE WITH YOU</small><Heart size={16} fill="currentColor"/></footer>
    </motion.div>}
  </main>;
}
export default App;