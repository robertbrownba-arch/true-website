import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {services,getService} from '@/lib/services';
import {ServicePage} from '@/components/ServicePage';

export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const s=getService(slug);if(!s)return{};return{title:s.title,description:s.description,alternates:{canonical:`/services/${s.slug}`},openGraph:{title:s.title,description:s.description}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=getService(slug);if(!service)notFound();return <ServicePage service={service}/>;}
