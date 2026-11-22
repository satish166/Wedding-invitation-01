import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {Heart,MapPin,CalendarDays,Navigation,Copy,Check,ArrowDown,ArrowRight,Music,Clock,Flower2,Ticket,Sun,Star} from 'lucide-react';

const dateBits=(w)=>({day:new Date(w.isoDate).getDate(),month:new Date(w.isoDate).toLocaleDateString('en-US',{month:'long'}),year:new Date(w.isoDate).getFullYear(),weekday:new Date(w.isoDate).toLocaleDateString('en-US',{weekday:'long'})});
const CountdownBlock=({w})=>{const d=Math.max(0,new Date(w.isoDate)-Date.now());return <div className="edition-countdown">{[['DAYS',Math.floor(d/86400000)],['HRS',Math.floor(d/3600000)%24],['MIN',Math.floor(d/60000)%60]].map(([l,n])=><div key={l}><b>{String(n).padStart(2,'0')}</b><small>{l}</small></div>)}</div>};

function RoseEdition({w,opened,onOpen,onCalendar,mapsUrl,onCopy,copied}) {
 const [expanded,setExpanded]=useState(false); const d=dateBits(w);
 return <div className="edition rose-edition">
 {!opened?<section className="rose-cover"><span className="rose-overline">A PRIVATE VIEWING · 01</span><div className="rose-frame"><span className="rose-seal">A + A</span><p>THE WEDDING OF</p><h1>{w.groom}<i>&</i>{w.bride}</h1><div className="rose-line"/><p>{w.shortDate}</p><button onClick={onOpen}>UNFOLD THE INVITATION <ArrowDown size={15}/></button></div><small className="rose-foot">A DAY TO REMEMBER · CHANDIGARH</small></section>:
 <><section className="rose-editorial"><div className="rose-side">THE CELEBRATION / 2026</div><div className="rose-copy"><small>TOGETHER WITH THEIR FAMILIES</small><h1>{w.groom}<i>&</i>{w.bride}</h1><p>{w.message}</p><div className="rose-date">{d.day} <span>{d.month} {d.year}</span></div></div><div className="rose-stamp">SAVE<br/>THE<br/>DATE</div></section>
 <section className="rose-reveal"><div className="rose-reveal-heading"><small>THE DAY, IN DETAIL</small><h2>A date worth<br/><i>remembering.</i></h2></div><button className="rose-date-card" onClick={()=>setExpanded(!expanded)}><span>{expanded?'YOUR INVITATION':'TAP TO UNFOLD'}</span><b>{d.day}</b><strong>{d.month} · {d.year}</strong><small>{expanded?w.time:'OPEN THE CARD ↗'}</small></button><CountdownBlock w={w}/><button className="edition-text-button" onClick={onCalendar}><CalendarDays/> ADD TO CALENDAR</button></section>
 <section className="rose-events"><div className="rose-events-title"><small>THE PROGRAMME</small><h2>Five moments.<br/><i>One forever.</i></h2></div><div className="rose-event-list">{w.events.map((e,i)=><article key={e.name}><b>0{i+1}</b><div><small>{e.date} · {e.time}</small><h3>{e.name}</h3><p>{e.note}</p></div><ArrowRight/></article>)}</div></section>
 <section className="rose-story"><div className="rose-story-image">A <span>♡</span> A</div><div><small>THE BEGINNING OF US</small><h2>Not a fairytale.<br/><i>Our real story.</i></h2><p>Two lives, one shared direction. With our favourite people around us, a new chapter begins.</p></div></section>
 <section className="rose-venue"><small>THE ADDRESS</small><h2>Meet us<br/><i>right here.</i></h2><div className="rose-address"><MapPin/><div><b>{w.venue}</b><p>{w.address}</p></div></div><a href={mapsUrl}>OPEN MAP <ArrowRight/></a><button onClick={onCopy}>{copied?<Check/>:<Copy/>} COPY ADDRESS</button></section>
 <section className="rose-rsvp"><small>ONE SEAT IS YOURS</small><h2>Will you<br/>be there?</h2><a href={'https://wa.me/?text='+encodeURIComponent('We would love to attend '+w.groom+' & '+w.bride+' wedding!')}>REPLY TO THE COUPLE ↗</a></section></>}
 </div>
}

function EmeraldEdition({w,opened,onOpen,onCalendar,mapsUrl,onCopy,copied}) {
 const [show,setShow]=useState(false);const d=dateBits(w);
 return <div className="edition emerald-edition">
 {!opened?<section className="emerald-cover"><div className="emerald-mandala">✺</div><small>SHUBH VIVAH</small><h1>{w.groom}<span>संग</span>{w.bride}</h1><p>{w.date} · {w.time}</p><button onClick={onOpen}>आमंत्रण खोलें <span>↓</span></button><div className="emerald-border">✥ ✥ ✥ ✥ ✥</div></section>:
 <><section className="emerald-masthead"><div className="emerald-om">ॐ</div><small>॥ श्री गणेशाय नमः ॥</small><h1>मंगल परिणय</h1><p>With blessings of our elders</p><div className="emerald-couple"><b>{w.groom}</b><span>विवाह</span><b>{w.bride}</b></div><p className="emerald-invite">{w.message}</p></section>
 <section className="emerald-panchang"><div className="emerald-date-seal"><span>{d.weekday}</span><b>{d.day}</b><small>{d.month} {d.year}</small></div><div className="emerald-panchang-copy"><small>शुभ विवाह मुहूर्त</small><h2>{w.date}</h2><p>{w.time}</p><button onClick={onCalendar}>ADD TO CALENDAR</button></div></section>
 <section className="emerald-rituals"><small>मंगल उत्सव</small><h2>Wedding rituals</h2>{w.events.map((e,i)=><article key={e.name}><div className="emerald-ritual-num">{['१','२','३','४','५'][i]}</div><div><h3>{e.name}</h3><p>{e.date} · {e.time}</p><span>{e.note}</span></div></article>)}</section>
 <section className="emerald-family"><div className="emerald-family-mark">शुभ</div><h2>Two families,<br/>one sacred bond.</h2><p>With the blessings of family and the warmth of friends, we begin our forever.</p><div className="emerald-family-rule">❧ ❧ ❧</div></section>
 <section className="emerald-mandir"><div className="emerald-mandir-art">⌂<span>✺</span></div><small>विवाह स्थल</small><h2>{w.venue}</h2><p>{w.address}</p><a href={mapsUrl}><Navigation/> DIRECTIONS</a><button onClick={onCopy}>{copied?<Check/>:<Copy/>} COPY VENUE</button></section>
 <section className="emerald-blessing"><span>॥</span><h2>Your presence<br/>is our blessing.</h2><p>Kindly grace the occasion</p><a href={'https://wa.me/?text='+encodeURIComponent('We will join '+w.groom+' & '+w.bride+' wedding celebration.')}>CONFIRM ATTENDANCE</a></section></>}
 </div>
}

function MidnightEdition({w,opened,onOpen,onCalendar,mapsUrl,onCopy,copied}) {
 const [ticket,setTicket]=useState(false);const d=dateBits(w);
 return <div className="edition midnight-edition">
 {!opened?<section className="midnight-cover"><div className="midnight-stars">✦ · ✧ · ✦</div><small>AN EVENING OF ELEGANCE</small><h1>THE<br/>GRAND<br/><i>CELEBRATION</i></h1><div className="midnight-monogram">{w.groom[0]}<span>&</span>{w.bride[0]}</div><button onClick={onOpen}>ENTER THE EVENING ↗</button></section>:
 <><section className="midnight-hero"><div className="midnight-index">INVITATION NO. 001 — PRIVATE EVENT</div><div className="midnight-title"><small>YOU ARE CORDIALLY INVITED TO</small><h1>{w.groom}<em>&</em>{w.bride}</h1><p>{w.message}</p></div><div className="midnight-bottom"><span>CHANDIGARH / INDIA</span><span>20—12—26</span></div></section>
 <section className="midnight-ticket"><div className="midnight-ticket-info"><small>ADMIT ONE · WEDDING NIGHT</small><h2>{w.date}</h2><p>{w.time}</p><button onClick={()=>setTicket(!ticket)}>{ticket?'CLOSE DETAILS':'REVEAL YOUR PASS'}</button>{ticket&&<p className="ticket-extra">Reserved in your honour. {w.venue}</p>}</div><div className="midnight-ticket-code">W<br/>E<br/>D<br/>D<br/>I<br/>N<br/>G</div></section>
 <section className="midnight-agenda"><div className="midnight-agenda-head"><small>THE RUN OF SHOW</small><h2>Tonight's<br/><i>programme.</i></h2></div>{w.events.map((e,i)=><article key={e.name}><span>0{i+1}</span><div><h3>{e.name}</h3><p>{e.date} / {e.time}</p></div><p>{e.note}</p></article>)}<button onClick={onCalendar}><CalendarDays/> SAVE TO CALENDAR</button></section>
 <section className="midnight-story"><div className="midnight-photo-frame"><span>THE COUPLE</span><b>{w.groom[0]} + {w.bride[0]}</b></div><div><small>THE NEXT CHAPTER</small><h2>One night.<br/>A lifetime.</h2><p>We found our favourite person. Now we get to celebrate with our favourite people.</p></div></section>
 <section className="midnight-location"><small>COORDINATES FOR THE EVENING</small><h2>{w.venue}</h2><p>{w.address}</p><a href={mapsUrl}>NAVIGATE TO VENUE ↗</a><button onClick={onCopy}>{copied?<Check/>:<Copy/>} COPY LOCATION</button></section>
 <section className="midnight-rsvp"><div className="midnight-rsvp-number">01 / RSVP</div><h2>See you<br/><i>under the stars.</i></h2><a href={'https://wa.me/?text='+encodeURIComponent('Count us in for '+w.groom+' & '+w.bride+' wedding!')}>CONFIRM YOUR SEAT ↗</a></section></>}
 </div>
}

function TerracottaEdition({w,opened,onOpen,onCalendar,mapsUrl,onCopy,copied}) {
 const [step,setStep]=useState(0);const d=dateBits(w);const active=w.events[step];
 return <div className="edition terracotta-edition">
 {!opened?<section className="terra-cover"><div className="terra-sun">☼</div><small>PADHARO SA</small><h1>{w.groom}<span>RA</span>{w.bride}</h1><p>Ek nayi kahaani ka aaghaaz</p><button onClick={onOpen}>INVITATION DEKHEIN <ArrowRight/></button><div className="terra-bottom">CHANDIGARH · 2026</div></section>:
 <><section className="terra-hero"><div className="terra-hero-copy"><small>KHAMMA GHANI</small><h1>Celebrating<br/><i>togetherness.</i></h1><p>{w.message}</p></div><div className="terra-sun-disc">शुभ<br/>विवाह</div><div className="terra-names">{w.groom} <span>×</span> {w.bride}</div></section>
 <section className="terra-date"><div className="terra-calendar"><span>{d.month.toUpperCase()}</span><b>{d.day}</b><small>{d.year}</small></div><div><small>MARK YOUR CALENDAR</small><h2>{w.date}</h2><p>{w.time}</p><button onClick={onCalendar}>ADD DATE TO CALENDAR +</button></div></section>
 <section className="terra-itinerary"><small>THE WEDDING TRAIL</small><h2>Choose a celebration</h2><div className="terra-stepper"><div className="terra-step-tabs">{w.events.map((e,i)=><button key={e.name} className={step===i?'selected':''} onClick={()=>setStep(i)}>0{i+1}</button>)}</div><article className="terra-active-event"><div className="terra-event-number">0{step+1}</div><small>{active.date} · {active.time}</small><h3>{active.name}</h3><p>{active.note}</p><span>✦ TRADITION · FAMILY · JOY ✦</span></article></div></section>
 <section className="terra-story"><div className="terra-story-symbol">∞</div><small>OUR FAMILIES, OUR STORY</small><h2>A beautiful union<br/>of two worlds.</h2><p>From the first hello to this forever promise, every step brought us here.</p><div className="terra-story-names">{w.groom} <span>&</span> {w.bride}</div></section>
 <section className="terra-map"><div className="terra-map-top"><small>THE DESTINATION</small><span>04 / 05</span></div><h2>Find your<br/>way to us.</h2><div className="terra-map-card"><MapPin/><b>{w.venue}</b><span>{w.address}</span></div><a href={mapsUrl}>GET DIRECTIONS <ArrowRight/></a><button onClick={onCopy}>{copied?<Check/>:<Copy/>} COPY ADDRESS</button></section>
 <section className="terra-rsvp"><div className="terra-rsvp-seal">RSVP</div><h2>Ram ram sa.<br/>We hope you can come.</h2><a href={'https://wa.me/?text='+encodeURIComponent('We are delighted to attend '+w.groom+' & '+w.bride+' wedding!')}>SEND YOUR REPLY ↗</a></section></>}
 </div>
}

function LavenderEdition({w,opened,onOpen,onCalendar,mapsUrl,onCopy,copied}) {
 const [bloom,setBloom]=useState(false);const d=dateBits(w);
 return <div className="edition lavender-edition">
 {!opened?<section className="lav-cover"><div className="lav-orbit lav-orbit-one"/><div className="lav-orbit lav-orbit-two"/><div className="lav-cover-flower">✿</div><small>A GARDEN GATHERING</small><h1>{w.groom}<i>+</i>{w.bride}</h1><p>Love is in full bloom</p><button onClick={onOpen}>LET THE STORY BLOOM <Flower2/></button></section>:
 <><section className="lav-hero"><div className="lav-hero-flower">✿</div><small>THE DAY WE HAVE BEEN DREAMING OF</small><h1>{w.groom}<span>and</span>{w.bride}</h1><p>{w.message}</p><div className="lav-hero-date">{w.shortDate} · {w.time}</div></section>
 <section className="lav-bloom"><div className="lav-bloom-art"><div className="lav-flower-center">♡</div><i>✿</i><i>✿</i><i>✿</i></div><div><small>A LITTLE REVEAL</small><h2>Our day is<br/><i>in bloom.</i></h2><button onClick={()=>setBloom(!bloom)}>{bloom?'HIDE DETAILS':'REVEAL THE DATE'} <ArrowDown/></button>{bloom&&<p>{d.weekday}, {d.day} {d.month} {d.year}<br/>{w.time}</p>}<CountdownBlock w={w}/><button className="lav-calendar" onClick={onCalendar}><CalendarDays/> ADD TO CALENDAR</button></div></section>
 <section className="lav-events"><small>GATHER · CELEBRATE · REPEAT</small><h2>A garden full<br/>of <i>memories.</i></h2><div className="lav-event-grid">{w.events.map((e,i)=><article key={e.name}><div className="lav-event-flower">{['✿','❀','❁','✾','❋'][i]}</div><small>DAY 0{i+1} · {e.time}</small><h3>{e.name}</h3><p>{e.date}</p><span>{e.note}</span></article>)}</div></section>
 <section className="lav-story"><div className="lav-story-art"><span>{w.groom[0]}</span><i>♡</i><span>{w.bride[0]}</span></div><div><small>GROWN WITH LOVE</small><h2>Two souls,<br/><i>one garden.</i></h2><p>Our favourite story is the one we get to write together, surrounded by everyone we love.</p></div></section>
 <section className="lav-venue"><small>FOLLOW THE PETALS</small><h2>Our little<br/>corner of joy</h2><div className="lav-venue-card"><div className="lav-map-flower">✿</div><b>{w.venue}</b><p>{w.address}</p><a href={mapsUrl}>FIND THE VENUE ↗</a><button onClick={onCopy}>{copied?<Check/>:<Copy/>} COPY ADDRESS</button></div></section>
 <section className="lav-rsvp"><div className="lav-rsvp-flower">❀</div><small>WE SAVED YOU A PLACE</small><h2>Come celebrate<br/>with us.</h2><a href={'https://wa.me/?text='+encodeURIComponent('We would love to celebrate '+w.groom+' & '+w.bride+' wedding with you!')}>RSVP WITH LOVE ♥</a></section></>}
 </div>
}

export default function InvitationEditions(props) {
 const editions={rose:RoseEdition,emerald:EmeraldEdition,midnight:MidnightEdition,terracotta:TerracottaEdition,lavender:LavenderEdition};
 const Edition=editions[props.theme]||RoseEdition;
 return <Edition {...props}/>;
}
