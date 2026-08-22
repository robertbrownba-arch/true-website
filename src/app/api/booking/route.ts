import {NextResponse} from 'next/server';

const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX=4000;

export async function POST(request:Request){
 try{
  const body=await request.json() as Record<string,unknown>;
  const name=String(body.name??'').trim();
  const email=String(body.email??'').trim();
  const phone=String(body.phone??'').trim();
  const service=String(body.service??'').trim();
  const device=String(body.device??'').trim();
  const date=String(body.date??'').trim();
  const message=String(body.message??'').trim();
  const website=String(body.website??'').trim();

  if(website) return NextResponse.json({ok:true},{status:200});
  if(!name||!email||!phone||!service||!message) return NextResponse.json({error:'Please complete all required fields.'},{status:400});
  if(!EMAIL_RE.test(email)) return NextResponse.json({error:'Please enter a valid email address.'},{status:400});
  if(message.length>MAX||name.length>200||service.length>200||device.length>200) return NextResponse.json({error:'One or more fields are too long.'},{status:400});

  const apiKey=process.env.RESEND_API_KEY;
  const to=process.env.LEADS_TO_EMAIL||'robert@onyxtechsolutions.info';
  const from=process.env.LEADS_FROM_EMAIL||'OnyxTech Website <onboarding@resend.dev>';
  if(!apiKey) return NextResponse.json({error:'Lead service is not configured. Please call 203-819-8645.'},{status:503});

  const emailResponse=await fetch('https://api.resend.com/emails',{
   method:'POST',
   headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
   body:JSON.stringify({
    from,
    to:[to],
    reply_to:email,
    subject:`New OnyxTech Service Request — ${service}`,
    text:[`Name: ${name}`,`Email: ${email}`,`Phone: ${phone}`,`Service: ${service}`,`Device: ${device||'Not provided'}`,`Preferred date: ${date||'Not provided'}`,'',`Problem / symptoms:\n${message}`].join('\n')
   })
  });
  if(!emailResponse.ok) return NextResponse.json({error:'We could not submit your request right now. Please call 203-819-8645.'},{status:502});
  return NextResponse.json({ok:true},{status:200});
 }catch{return NextResponse.json({error:'Invalid request. Please call 203-819-8645.'},{status:400});}
}
