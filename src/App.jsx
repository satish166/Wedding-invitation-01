import React,{useEffect,useState} from 'react';
import InvitationEditions from './InvitationEditions';
import {wedding} from './weddingData';
export default function App(){
 const [theme,setTheme]=useState(()=>localStorage.getItem('wedding-theme')||'rose');
 const [opened,setOpened]=useState(false),[copied,setCopied]=useState(false);
 useEffect(()=>{localStorage.setItem('wedding-theme',theme)},[theme]);
 const address=wedding.venue+', '+wedding.address;
 const mapsUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address);
 const onCalendar=()=>{const start=wedding.isoDate.replaceAll('-','').replaceAll(':',''),end=wedding.isoEndDate.replaceAll('-','').replaceAll(':','');const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//EN','BEGIN:VEVENT','DTSTART:'+start,'DTEND:'+end,'SUMMARY:'+wedding.groom+' & '+wedding.bride+' — Wedding','LOCATION:'+address,'END:VEVENT','END:VCALENDAR'].join('\\r\\n');const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));const a=document.createElement('a');a.href=url;a.download='wedding-invitation.ics';a.click();URL.revokeObjectURL(url)};
 const onCopy=async()=>{try{await navigator.clipboard.writeText(address);setCopied(true);setTimeout(()=>setCopied(false),1600)}catch{}};
 const switchTheme=value=>{setTheme(value);setOpened(false)};
 return <main className={'site-shell edition-shell theme-'+theme}>
  <header className="edition-header"><a href="#top" className="edition-brand">SANDHU <span>· WEDDING STUDIO</span></a><label><small>SELECT AN EDITION</small><select value={theme} onChange={e=>switchTheme(e.target.value)} aria-label="Choose invitation design"><option value="rose">01 / The Editorial</option><option value="emerald">02 / The Sacred</option><option value="midnight">03 / The After Dark</option><option value="terracotta">04 / The Heritage Trail</option><option value="lavender">05 / The Garden</option></select></label></header>
  <div id="top"><InvitationEditions theme={theme} w={wedding} opened={opened} onOpen={()=>setOpened(true)} onCalendar={onCalendar} mapsUrl={mapsUrl} onCopy={onCopy} copied={copied}/></div>
  <footer className="edition-footer"><span>MADE FOR THE MOMENTS THAT MATTER</span><b>DESIGN BY SANDHU</b><small>© 2026 · WEDDING STUDIO</small></footer>
 </main>
}