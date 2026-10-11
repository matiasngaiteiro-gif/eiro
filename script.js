'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navegacion');
function closeMenu(){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(nav.contains(document.activeElement))menu.focus();}});
window.matchMedia('(min-width: 601px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
const email=(window.ORENSIA_CONFIG?.email||'').trim();
const hasEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
if(hasEmail){document.querySelector('#submit-label').textContent='Escribir al estudio';document.querySelector('#form-note').textContent='Se abrirá tu aplicación de correo con la consulta preparada. Revisala y enviála desde allí. No almacenamos tus datos en esta web.';}
document.querySelector('#brief-form').addEventListener('submit',e=>{
 e.preventDefault();const values=new FormData(e.currentTarget);
 const brief=`CONSULTA — ORENSIA\n\nNombre: ${values.get('nombre')}\nEmail: ${values.get('email')}\nMarca: ${values.get('marca')||'Por definir'}\nServicio: ${values.get('servicio')}\n\n${values.get('mensaje')}\n`;
 const status=document.querySelector('#form-status');
 if(hasEmail){window.location.href=`mailto:${email}?subject=${encodeURIComponent('Consulta ORENSIA — '+(values.get('marca')||values.get('nombre')))}&body=${encodeURIComponent(brief)}`;status.textContent='Consulta preparada. Completá el envío desde tu aplicación de correo.';}
 else{const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='consulta-orensia.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);status.textContent='Consulta descargada. No fue enviada. Conservá el archivo para compartirlo con el estudio.';}
});
