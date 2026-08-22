'use client';
import Link from 'next/link';
import {useState} from 'react';

export function Header(){
 const [open,setOpen]=useState(false);
 const close=()=>setOpen(false);
 return <>
  <div className="topbar"><div className="container"><a href="tel:+12038198645">☎ 203-819-8645</a><a href="mailto:robert@onyxtechsolutions.info">✉ robert@onyxtechsolutions.info</a></div></div>
  <header className="nav"><div className="container nav-inner">
   <Link className="brand" href="/" onClick={close}><img className="brand-logo" src="/assets/brand/onyxtech-mark.svg" alt="OnyxTech Solutions logo"/><span>ONYXTECH SOLUTIONS L.L.C.</span></Link>
   <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="site-menu">Menu</button>
   <nav id="site-menu" className={`menu ${open?'open':''}`}><Link href="/services" onClick={close}>Services</Link><Link href="/services-catalog" onClick={close}>Catalog</Link><Link href="/about" onClick={close}>About</Link><Link href="/booking" onClick={close}>Book Service</Link><Link href="/contact" onClick={close}>Contact</Link><Link href="/faq" onClick={close}>FAQ</Link></nav>
  </div></header>
 </>;
}
