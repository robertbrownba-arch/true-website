document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.menu');
  if(toggle&&menu){
    toggle.addEventListener('click',()=>{
      const open=menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  const estimate=document.querySelector('#serviceEstimate');
  const output=document.querySelector('#estimateOutput');
  if(estimate&&output){
    estimate.addEventListener('change',()=>{
      output.textContent=estimate.value?`Starting estimate: $${estimate.value}+`:'Select a service to see a starting estimate.';
    });
  }

  const date=document.querySelector('#preferredDate');
  if(date){
    const d=new Date();
    d.setDate(d.getDate()+1);
    date.min=d.toISOString().slice(0,10);
  }

  document.querySelectorAll('a[data-conversion]').forEach(link=>{
    link.addEventListener('click',()=>{
      const type=link.dataset.conversion;
      if(window.gtag) window.gtag('event','generate_lead',{method:type});
    });
  });

  const service=document.querySelector('#service');
  if(service){
    const params=new URLSearchParams(window.location.search);
    const requested=params.get('service');
    if(requested){
      const option=[...service.options].find(o=>o.text.toLowerCase().includes(requested.toLowerCase()));
      if(option) service.value=option.value;
    }
  }
});
