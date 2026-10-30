(function(){
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const n=new Date();let age=n.getFullYear()-2010;if(n<new Date(n.getFullYear(),6,15))age--;
$('#yr').textContent=n.getFullYear();

// split dream headline into words
const dt=$('#dreamT');dt.innerHTML=dt.textContent.split(' ').map(w=>'<span class="w">'+w+'</span>').join(' ');
const words=$$('.w'),lane=$('.lane'),lb=$('#laneBall'),lf=$('#laneFill'),big=$('#big10'),dream=$('#dream');

function onScroll(){
  const h=document.documentElement,max=h.scrollHeight-innerHeight,p=h.scrollTop/max;
  $('#trackFill').style.width=p*100+'%';
  const tb=$('#trackBall');tb.style.left=p*100+'%';tb.style.transform='rotate('+(scrollY/2)+'deg)';
  $('#nav').classList.toggle('solid',scrollY>50);
  big.style.transform='translateY(calc(-50% + '+(scrollY*.25)+'px))';
  // ball dribbles down the lane
  const r=lane.getBoundingClientRect(),q=Math.min(1,Math.max(0,(innerHeight*.55-r.top)/r.height));
  const y=q*(r.height-38);lb.style.transform='translateY('+y+'px) rotate('+(y*2)+'deg)';lf.style.height=y+19+'px';
  // dream words light up as you scroll
  const d=dream.getBoundingClientRect(),k=Math.min(1,Math.max(0,(innerHeight-d.top)/(innerHeight*.9)));
  words.forEach((w,i)=>w.classList.toggle('on',i<k*words.length*1.15));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;e.target.classList.add('on');io.unobserve(e.target);
  const b=e.target.querySelector('[data-count]');if(b)count(b);
}),{threshold:.3});
$$('.reveal,.stop').forEach(el=>io.observe(el));
function count(el){const t=el.dataset.count==='age'?age:+el.dataset.count,s=performance.now();
  (function f(x){const k=Math.min(1,(x-s)/1300);el.textContent=Math.round(t*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(s)}
$$('.nav-link').forEach(a=>a.addEventListener('click',()=>{const m=$('#menu');if(m.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(m).hide()}));
})();
