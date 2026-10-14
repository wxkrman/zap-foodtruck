(async function(){
  const get=(o,p)=>p.split('.').reduce((a,k)=>a&&a[k],o);
  const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  let c;
  try{c=await (await fetch('content.json?t='+Date.now(),{cache:'no-store'})).json();}
  catch(e){console.error('Kunde inte läsa content.json',e);return;}
  document.querySelectorAll('[data-c]').forEach(el=>el.textContent=get(c,el.dataset.c)??'');
  const price=p=>p?`<span class="price">${esc(p)}</span>`:'';
  document.getElementById('cards').innerHTML=c.meny.ratter.map(r=>`
    <article class="card reveal ${r.veg?'veg':''}">${r.veg?'<span class="vtag">Veg</span>':''}${r.tagg?`<span class="tag">${esc(r.tagg)}</span>`:''}
      ${r.bild?`<div class="card-img" style="background-image:url('img/${esc(r.bild)}')"></div>`:`<div class="card-img ph"><span>⚡</span></div>`}
      <div class="card-b"><div><h3>${esc(r.namn)}</h3>${r.beskrivning?`<p>${esc(r.beskrivning)}</p>`:''}</div>${price(r.pris)}</div></article>`).join('');
  const li=r=>`<li><span>${esc(r.namn)}</span>${r.pris?`<b>${esc(r.pris)}</b>`:''}</li>`;
  document.getElementById('green').innerHTML=c.grona_menyn.ratter.map(li).join('');
  document.getElementById('sweets').innerHTML=c.grona_menyn.sotsaker.map(li).join('');
  const days=['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],today=days[new Date().getDay()];
  document.getElementById('sched').innerHTML=c.schema.dagar.map(d=>`<li class="${d.dag===today?'now':''}"><span class="d">${esc(d.dag)}</span><span class="t">${esc(d.tid)}</span><span>${esc(d.plats)}</span></li>`).join('');
  const mq=(c.schema.koordinater||'').replace(/\s/g,'')||encodeURIComponent(c.schema.kartsok);
  document.getElementById('map').src='https://maps.google.com/maps?q='+mq+'&z=15&hl=sv&output=embed';
  document.getElementById('events').innerHTML=c.event.length?c.event.map(e=>`<div class="event reveal ${e.veg?'veg':''}"><div class="date">${esc(e.datum)}</div><div class="grow"><h3>${esc(e.titel)}</h3><p>${esc(e.text)}</p>${e.pris?`<p class="ep">${esc(e.pris)}</p>`:''}</div>${e.bokning?`<a class="btn" href="mailto:${esc(e.bokning)}?subject=${encodeURIComponent('Bokning '+e.titel+' '+e.datum)}">Boka</a>`:''}</div>`).join(''):'<p class="lead">Inga popups inplanerade just nu – håll koll på Instagram!</p>';
  document.getElementById('gallery').innerHTML=c.galleri.map(g=>`<img class="reveal" src="img/${esc(g)}" alt="ZAP" loading="lazy">`).join('');
  const f=c.foretag,m=document.getElementById('mail');m.textContent=f.epost;m.href='mailto:'+f.epost;
  document.getElementById('ig').href=f.instagram;document.getElementById('fb').href=f.facebook;
  document.getElementById('yr').textContent=new Date().getFullYear();
  const t=[c.idag.plats,c.idag.tid,c.meny.rubrik,c.idag.notis,'ZAP ⚡'].map(x=>`<span>⚡ ${esc(x)}</span>`).join('');
  document.getElementById('ticker').innerHTML=t+t;
  // scroll reveals
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  if(location.search.includes('all')){document.documentElement.classList.add('shot');}
  if(location.search.includes('all'))document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  // lightbox
  const lb=document.getElementById('lb');
  document.getElementById('gallery').onclick=e=>{if(e.target.tagName==='IMG'){lb.querySelector('img').src=e.target.src;lb.classList.add('on')}};
  lb.onclick=()=>lb.classList.remove('on');
})();
// Intro
(function(){
  const intro=document.getElementById('intro'),enter=()=>{intro.classList.add('out');document.body.classList.remove('locked');sessionStorage.setItem('zapIn',1);setTimeout(()=>intro.remove(),1100)};
  document.getElementById('enter').onclick=enter;
  if(sessionStorage.getItem('zapIn')||location.hash||location.search.includes('skip')){intro.remove();document.body.classList.remove('locked');}
  // Pausa video om filen saknas (då syns fallback)
  document.querySelectorAll('video').forEach(v=>{v.addEventListener('error',()=>v.style.display='none',true);v.querySelector('source').addEventListener('error',()=>v.style.display='none');});
})();
