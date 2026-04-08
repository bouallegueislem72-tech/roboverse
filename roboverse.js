// ============================================================
// ROBOVERSE — shared.js
// Données produits, blog, panier, authentification
// ============================================================

// ---- DONNÉES PRODUITS ----
const products = [
  {id:1,nom:"Arduino Uno R3",categorie:"Cartes",prix:45.00,stock:25,image:"https://via.placeholder.com/300x300/0066ff/FFFFFF?text=Arduino+Uno",description:"Carte de développement Arduino Uno R3 officielle",badge:"new"},
  {id:2,nom:"Raspberry Pi 4 - 4GB",categorie:"Cartes",prix:189.00,stock:15,image:"https://via.placeholder.com/300x300/00c8ff/FFFFFF?text=Raspberry+Pi",description:"Raspberry Pi 4 Model B avec 4GB de RAM",badge:"hot"},
  {id:3,nom:"Capteur Ultrason HC-SR04",categorie:"Capteurs",prix:8.50,stock:50,image:"https://via.placeholder.com/300x300/00b86b/FFFFFF?text=HC-SR04",description:"Capteur de distance à ultrasons pour Arduino",badge:"new"},
  {id:4,nom:"Servo Moteur SG90",categorie:"Moteurs",prix:12.00,stock:40,image:"https://via.placeholder.com/300x300/ff6b00/FFFFFF?text=SG90",description:"Micro servo-moteur 9g pour robotique",badge:""},
  {id:5,nom:"Module WiFi ESP32",categorie:"Modules",prix:35.00,stock:30,image:"https://via.placeholder.com/300x300/7c3aed/FFFFFF?text=ESP32",description:"Module WiFi/Bluetooth ESP32 pour IoT",badge:"hot"},
  {id:6,nom:"Kit Robot 4WD",categorie:"Kits",prix:125.00,stock:10,image:"https://via.placeholder.com/300x300/e53e3e/FFFFFF?text=Robot+4WD",description:"Kit complet de robot 4 roues motrices",badge:"new"},
  {id:7,nom:"Capteur DHT22",categorie:"Capteurs",prix:15.00,stock:35,image:"https://via.placeholder.com/300x300/0ea5e9/FFFFFF?text=DHT22",description:"Capteur de température et humidité numérique",badge:""},
  {id:8,nom:"Moteur DC avec encodeur",categorie:"Moteurs",prix:28.00,stock:20,image:"https://via.placeholder.com/300x300/65a30d/FFFFFF?text=DC+Motor",description:"Moteur DC 12V avec encodeur optique",badge:""},
  {id:9,nom:"Écran LCD 16x2",categorie:"Modules",prix:22.00,stock:25,image:"https://via.placeholder.com/300x300/2563eb/FFFFFF?text=LCD+16x2",description:"Afficheur LCD 16 caractères × 2 lignes",badge:""},
  {id:10,nom:"Kit Arduino Starter",categorie:"Kits",prix:89.00,stock:12,image:"https://via.placeholder.com/300x300/db2777/FFFFFF?text=Starter+Kit",description:"Kit de démarrage Arduino avec composants",badge:"hot"},
  {id:11,nom:"Capteur PIR HC-SR501",categorie:"Capteurs",prix:9.50,stock:45,image:"https://via.placeholder.com/300x300/d97706/FFFFFF?text=PIR",description:"Capteur de mouvement infrarouge passif",badge:""},
  {id:12,nom:"Driver Moteur L298N",categorie:"Modules",prix:18.00,stock:30,image:"https://via.placeholder.com/300x300/4f46e5/FFFFFF?text=L298N",description:"Module driver pour moteurs DC et pas-à-pas",badge:"new"}
];

// ---- DONNÉES BLOG ----
const blogPosts = [
  {id:1,tag:"IA",emoji:"🤖",title:"ChatGPT intégré dans les robots humanoïdes : la nouvelle ère commence",date:"28 Nov 2025",readTime:"5 min",excerpt:"Les derniers robots humanoïdes de Boston Dynamics et Figure AI intègrent désormais des LLMs pour des interactions naturelles. On vous explique comment ça marche.",tags:["IA","Humanoïdes","LLM"],featured:true},
  {id:2,tag:"Arduino",emoji:"🔌",title:"ESP32-S3 : le successeur ultime pour vos projets IoT en 2025",date:"20 Nov 2025",readTime:"4 min",excerpt:"L'ESP32-S3 monte en puissance avec son support USB-OTG natif et ses capacités de machine learning embarqué. Découvrez pourquoi il s'impose comme le microcontrôleur de référence.",tags:["ESP32","IoT","Embarqué"],featured:false},
  {id:3,tag:"Robots",emoji:"🦾",title:"Drone autonome open-source : construire son quadcopter sous ROS2",date:"15 Nov 2025",readTime:"8 min",excerpt:"ROS2 Jazzy Jalisco est sorti — et avec lui, tout un écosystème de packages pour la navigation autonome. Notre guide complet pour débuter avec les drones DIY.",tags:["ROS2","Drone","Open-source"],featured:false},
  {id:4,tag:"IoT",emoji:"🌐",title:"Matter 1.3 : le standard qui va unifier la maison connectée",date:"10 Nov 2025",readTime:"3 min",excerpt:"Le protocole Matter continue de s'imposer avec sa version 1.3, ajoutant le support des caméras et des appareils électroménagers. Compatible ESP32, Arduino et Raspberry Pi.",tags:["Matter","Smart Home","IoT"],featured:false},
  {id:5,tag:"Arduino",emoji:"⚡",title:"Arduino Uno R4 WiFi : notre test complet après 3 mois d'utilisation",date:"5 Nov 2025",readTime:"6 min",excerpt:"On a testé l'Arduino Uno R4 WiFi en long et en large : connectivité WiFi, matrice LED, nouveaux timers… Voici notre verdict pour savoir si ça vaut l'upgrade.",tags:["Arduino","Test","WiFi"],featured:false},
  {id:6,tag:"Robots",emoji:"🏭",title:"Bras robotique DIY : un cobot à 6 axes pour moins de 500 DT",date:"1 Nov 2025",readTime:"10 min",excerpt:"Les servomoteurs haute précision ont baissé de prix. On vous guide pas-à-pas pour construire un bras robotique à 6 degrés de liberté avec Arduino et Python.",tags:["Bras robotique","DIY","Servo"],featured:false}
];

// ---- PANIER ----
let cart = [];

function loadCart(){
  const s = localStorage.getItem('roboverse_cart');
  if(s){ cart = JSON.parse(s); updateCartUI(); }
}
function saveCart(){ localStorage.setItem('roboverse_cart', JSON.stringify(cart)); updateCartUI(); }

function addToCart(id){
  const p = products.find(x => x.id === id); if(!p) return;
  const ex = cart.find(i => i.id === id);
  if(ex) ex.quantity++;
  else cart.push({id:p.id,nom:p.nom,prix:p.prix,image:p.image,quantity:1});
  saveCart();
  showNotification(`<i class="fas fa-check-circle me-2"></i>${p.nom} ajouté !`, 'success');
}
function removeFromCart(id){ cart = cart.filter(i => i.id !== id); saveCart(); }
function changeQty(id, delta){
  const item = cart.find(i => i.id === id); if(!item) return;
  item.quantity += delta;
  if(item.quantity <= 0) removeFromCart(id); else saveCart();
}

function updateCartUI(){
  const count = cart.reduce((s,i) => s + i.quantity, 0);
  const total = cart.reduce((s,i) => s + i.prix * i.quantity, 0);
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');
  const totalFooterEl = document.getElementById('cart-total-footer');
  if(countEl) countEl.textContent = count;
  if(totalEl) totalEl.textContent = total.toFixed(2) + ' DT';
  if(totalFooterEl) totalFooterEl.textContent = total.toFixed(2) + ' DT';
  const el = document.getElementById('cart-items');
  if(!el) return;
  if(!cart.length){
    el.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Votre panier est vide</p></div>`;
    return;
  }
  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.nom}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nom}</div>
        <div class="cart-item-price">${item.prix.toFixed(2)} DT</div>
        <div class="cart-qty-control">
          <button class="cart-qty-btn" onclick="changeQty(${item.id},-1)"><i class="fas fa-minus"></i></button>
          <span class="cart-qty-num">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="changeQty(${item.id},1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
    </div>`).join('');
}

function toggleCart(){
  document.getElementById('cart-modal').classList.toggle('active');
  document.getElementById('cart-overlay').classList.toggle('active');
}

// ---- COMMANDE ----
let currentOrderStep = 1;
const TOTAL_STEPS = 4;

function checkout(){
  if(!cart.length){ showNotification('Votre panier est vide !','error'); return; }
  const user = localStorage.getItem('roboverse_user');
  if(user){
    const u = JSON.parse(user);
    if(u.loggedIn){
      if(u.name){ const p = u.name.split(' '); const pe = document.getElementById('order-prenom'); const ne = document.getElementById('order-nom'); if(pe) pe.value = p[0]||''; if(ne) ne.value = p.slice(1).join(' ')||''; }
      if(u.email){ const ee = document.getElementById('order-email'); if(ee) ee.value = u.email; }
    }
  }
  currentOrderStep = 1; showOrderStep(1);
  document.getElementById('order-modal-overlay').classList.add('active');
  if(document.getElementById('cart-modal').classList.contains('active')) toggleCart();
}
function closeOrderModal(){ document.getElementById('order-modal-overlay').classList.remove('active'); }
function showOrderStep(step){
  for(let i=1;i<=TOTAL_STEPS;i++){
    document.getElementById('panel-'+i).classList.remove('active');
    const ind = document.getElementById('step-indicator-'+i);
    ind.classList.remove('active','done');
    if(i<step) ind.classList.add('done'); else if(i===step) ind.classList.add('active');
  }
  document.getElementById('panel-success').classList.remove('active');
  document.getElementById('panel-'+step).classList.add('active');
  const bb = document.getElementById('btn-back'), bn = document.getElementById('btn-next');
  bb.style.visibility = step > 1 ? 'visible' : 'hidden';
  if(step===TOTAL_STEPS){ bn.innerHTML='<i class="fas fa-check me-2"></i>Confirmer'; bn.className='btn-order-confirm'; buildRecap(); }
  else{ bn.innerHTML='Suivant <i class="fas fa-arrow-right ms-2"></i>'; bn.className='btn-order-next'; }
  document.getElementById('order-nav').style.display='flex';
}
function orderNext(){ if(!validateOrderStep(currentOrderStep)) return; if(currentOrderStep<TOTAL_STEPS){ currentOrderStep++; showOrderStep(currentOrderStep); } else submitOrder(); }
function orderPrev(){ if(currentOrderStep>1){ currentOrderStep--; showOrderStep(currentOrderStep); } }
function validateOrderStep(step){
  let valid=true, required=[];
  if(step===1) required=[{id:'order-prenom'},{id:'order-nom'},{id:'order-email'},{id:'order-tel'}];
  else if(step===2) required=[{id:'order-adresse'},{id:'order-ville'}];
  required.forEach(f=>{ const el=document.getElementById(f.id); if(!el||!el.value.trim()){ if(el)el.classList.add('error'); valid=false; } else if(el) el.classList.remove('error'); });
  if(!valid){ showNotification('Veuillez remplir tous les champs obligatoires.','error'); return false; }
  if(step===1){ const e=document.getElementById('order-email'); if(e&&e.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value)){ e.classList.add('error'); showNotification('Email invalide.','error'); return false; } }
  return true;
}
function selectPayment(label){ document.querySelectorAll('.payment-option').forEach(el=>el.classList.remove('selected')); label.classList.add('selected'); }
function getSelectedPayment(){ const c=document.querySelector('input[name="payment"]:checked'); return c?c.value:'cod'; }
function getPaymentLabel(v){ return{cod:'Paiement à la livraison',virement:'Virement bancaire',carte:'Carte bancaire'}[v]||v; }
function buildRecap(){
  const pr=document.getElementById('order-prenom').value, nm=document.getElementById('order-nom').value;
  const em=document.getElementById('order-email').value, tel=document.getElementById('order-tel').value;
  const ad=document.getElementById('order-adresse').value, vi=document.getElementById('order-ville').value;
  const cp=document.getElementById('order-cp').value, nt=document.getElementById('order-note').value;
  const pay=getPaymentLabel(getSelectedPayment());
  document.getElementById('recap-client').innerHTML=`<h6><i class="fas fa-user me-2"></i>Client</h6><p>${pr} ${nm}<br>${em}<br>${tel}</p>`;
  document.getElementById('recap-livraison').innerHTML=`<h6><i class="fas fa-truck me-2"></i>Livraison</h6><p>${ad}<br>${cp?cp+' ':''}${vi}${nt?'<br><em>'+nt+'</em>':''}</p>`;
  document.getElementById('recap-paiement').innerHTML=`<h6><i class="fas fa-credit-card me-2"></i>Paiement</h6><p>${pay}</p>`;
  const sub=cart.reduce((s,i)=>s+i.prix*i.quantity,0);
  const sh=sub>=200?0:7; const tot=sub+sh;
  document.getElementById('recap-items').innerHTML=cart.map(item=>`<div class="order-summary-item"><img src="${item.image}" alt="${item.nom}"><div class="order-summary-item-name">${item.nom}<br><small>x${item.quantity}</small></div><div class="order-summary-item-price">${(item.prix*item.quantity).toFixed(2)} DT</div></div>`).join('');
  document.getElementById('recap-totals').innerHTML=`<div class="order-summary-row"><span>Sous-total</span><span>${sub.toFixed(2)} DT</span></div><div class="order-summary-row"><span>Livraison</span><span>${sh===0?'<span style="color:var(--success)">Gratuite</span>':sh.toFixed(2)+' DT'}</span></div><div class="order-summary-row grand-total"><span>Total</span><span>${tot.toFixed(2)} DT</span></div>`;
}
function submitOrder(){
  const num='RBV-'+Date.now().toString().slice(-6);
  const orders=JSON.parse(localStorage.getItem('roboverse_orders')||'[]');
  orders.push({numero:num,date:new Date().toLocaleDateString('fr-FR'),client:{prenom:document.getElementById('order-prenom').value,nom:document.getElementById('order-nom').value,email:document.getElementById('order-email').value,tel:document.getElementById('order-tel').value},livraison:{adresse:document.getElementById('order-adresse').value,ville:document.getElementById('order-ville').value,cp:document.getElementById('order-cp').value,note:document.getElementById('order-note').value},paiement:getSelectedPayment(),items:[...cart],total:cart.reduce((s,i)=>s+i.prix*i.quantity,0)+(cart.reduce((s,i)=>s+i.prix*i.quantity,0)>=200?0:7),statut:'En attente'});
  localStorage.setItem('roboverse_orders',JSON.stringify(orders));
  cart=[]; saveCart();
  document.getElementById('order-number-display').textContent='Numéro de commande : '+num;
  for(let i=1;i<=TOTAL_STEPS;i++){ document.getElementById('panel-'+i).classList.remove('active'); document.getElementById('step-indicator-'+i).classList.remove('active'); document.getElementById('step-indicator-'+i).classList.add('done'); }
  document.getElementById('panel-success').classList.add('active');
  document.getElementById('order-nav').style.display='none';
}

// ---- NOTIFICATION ----
function showNotification(msg, type='success'){
  const n=document.createElement('div'); n.className=`notification ${type}`; n.innerHTML=msg;
  document.body.appendChild(n);
  setTimeout(()=>{ n.style.opacity='0'; n.style.transform='translateX(30px)'; n.style.transition='.3s'; setTimeout(()=>n.remove(),300); },3000);
}

// ---- AUTHENTIFICATION ----
function getCurrentUser(){
  const s = localStorage.getItem('roboverse_user');
  return s ? JSON.parse(s) : null;
}

function updateAuthUI(){
  const user = getCurrentUser();
  const monCompteLink = document.getElementById('monCompte');
  const logoutLink = document.getElementById('logoutLink');
  const userNameDisplay = document.getElementById('userNameDisplay');
  if(user && user.loggedIn){
    if(monCompteLink){ monCompteLink.textContent = ''; monCompteLink.innerHTML = `<i class="fas fa-user-check"></i> ${user.name||user.email}`; monCompteLink.href='#'; }
    if(logoutLink) logoutLink.style.display='inline';
    if(userNameDisplay) userNameDisplay.textContent = user.name || user.email;
  } else {
    if(monCompteLink){ monCompteLink.innerHTML='<i class="fas fa-user"></i> Mon Compte'; monCompteLink.href='login.html'; }
    if(logoutLink) logoutLink.style.display='none';
  }
}

function logout(){
  const user = getCurrentUser();
  if(user){ user.loggedIn = false; localStorage.setItem('roboverse_user', JSON.stringify(user)); }
  showNotification('<i class="fas fa-sign-out-alt me-2"></i>Déconnecté avec succès', 'success');
  setTimeout(()=>{ updateAuthUI(); }, 500);
}

// ---- RECHERCHE (dropdown) ----
function initSearch(){
  const searchEl = document.getElementById('main-search');
  if(!searchEl) return;
  searchEl.addEventListener('input', function(){
    updateSearchDropdown(this.value.trim());
  });
  searchEl.addEventListener('blur', function(){ setTimeout(()=>{ const dd=document.getElementById('search-dropdown'); if(dd) dd.classList.remove('show'); },200); });
  searchEl.addEventListener('focus', function(){ if(this.value.trim()) updateSearchDropdown(this.value.trim()); });
  document.addEventListener('click', function(e){ if(!e.target.closest('.search-wrap')){ const dd=document.getElementById('search-dropdown'); if(dd) dd.classList.remove('show'); } });
}

function updateSearchDropdown(q){
  const dd = document.getElementById('search-dropdown'); if(!dd) return;
  if(!q){ dd.classList.remove('show'); return; }
  const matches = products.filter(p=>p.nom.toLowerCase().includes(q.toLowerCase())||p.categorie.toLowerCase().includes(q.toLowerCase())).slice(0,6);
  if(!matches.length) dd.innerHTML=`<div class="search-no-result"><i class="fas fa-search-minus me-2"></i>Aucun résultat pour "${q}"</div>`;
  else dd.innerHTML=matches.map(p=>`<div class="search-result-item" onclick="quickAddFromSearch(${p.id})"><img src="${p.image}" alt="${p.nom}"><div style="flex:1"><div class="search-result-name">${hl(p.nom,q)}</div><div class="search-result-cat">${p.categorie}</div></div><div class="search-result-price">${p.prix.toFixed(2)} DT</div></div>`).join('');
  dd.classList.add('show');
}
function hl(t,q){ return t.replace(new RegExp(`(${q})`,'gi'),'<mark style="background:rgba(0,102,255,.15);color:var(--accent);border-radius:3px;padding:0 2px">$1</mark>'); }
function quickAddFromSearch(id){ const dd=document.getElementById('search-dropdown'); if(dd) dd.classList.remove('show'); const s=document.getElementById('main-search'); if(s){s.value='';} addToCart(id); }

// ---- FAQ ----
function toggleFaq(item){
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!wasOpen) item.classList.add('open');
}

// ---- NEWSLETTER ----
function subscribeNewsletter(btn){
  const inp = btn.previousElementSibling;
  if(!inp.value||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)){ showNotification('Veuillez entrer un email valide.','error'); return; }
  inp.value=''; showNotification('Merci ! Vous êtes abonné(e) à notre newsletter. 🎉','success');
}

// ---- CONTACT FORM ----
function submitContactForm(){
  const prenom=document.getElementById('c-prenom').value.trim();
  const nom=document.getElementById('c-nom').value.trim();
  const email=document.getElementById('c-email').value.trim();
  const sujet=document.getElementById('c-sujet').value;
  const msg=document.getElementById('c-message').value.trim();
  if(!prenom||!nom||!email||!sujet||!msg){ showNotification('Veuillez remplir tous les champs obligatoires.','error'); return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showNotification('Adresse email invalide.','error'); return; }
  ['c-prenom','c-nom','c-email','c-tel','c-message'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('c-sujet').value='';
  showNotification('Message envoyé avec succès ! On vous répond sous 24h. ✅','success');
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', function(){
  loadCart();
  initSearch();
  updateAuthUI();
});
