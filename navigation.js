(function(){
 const slides=[...document.querySelectorAll('.slide')], canvas=document.getElementById('canvas'), counter=document.getElementById('counter');
 const prev=document.getElementById('prev'), next=document.getElementById('next'); let current=0, timer, startX=0, startY=0;
 function show(i){current=Math.max(0,Math.min(slides.length-1,i));slides.forEach((s,n)=>{s.classList.toggle('active',n===current);s.setAttribute('aria-hidden',n===current?'false':'true')});prev.disabled=current===0;next.disabled=current===slides.length-1;counter.textContent=(current+1)+' / '+slides.length;location.hash='slide-'+String(current+1).padStart(2,'0')}
 function controls(){canvas.classList.add('show-controls');clearTimeout(timer);timer=setTimeout(()=>canvas.classList.remove('show-controls'),1600)}
 prev.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current+1));
 document.getElementById('dosage-hotspot').addEventListener('click',()=>show(2));document.getElementById('close-hotspot').addEventListener('click',()=>show(1));
 addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(current+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1)}if(e.key==='Escape'&&current===2)show(1);controls()});
 canvas.addEventListener('pointermove',controls);canvas.addEventListener('pointerdown',e=>{startX=e.clientX;startY=e.clientY;controls()});canvas.addEventListener('pointerup',e=>{let dx=e.clientX-startX,dy=e.clientY-startY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.4)show(current+(dx<0?1:-1))});
 const hash=parseInt((location.hash.match(/slide-(\d+)/)||[])[1]||'1',10)-1;show(hash);controls();
})();