import type {Metadata} from 'next';
import './globals.css';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';

export const metadata: Metadata={metadataBase:new URL('https://www.onyxtechsolutions.info'),title:{default:'Computer Repair Waterbury CT | OnyxTech Solutions',template:'%s | OnyxTech Solutions'},description:'Computer, phone, gaming, data recovery, networking, POS, printer, electronics and business IT services in Waterbury CT and surrounding Connecticut communities.',robots:{index:true,follow:true},openGraph:{type:'website',siteName:'OnyxTech Solutions L.L.C.',locale:'en_US'}};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>}
