var U=i=>{throw TypeError(i)};var x=(i,e,t)=>e.has(i)||U("Cannot "+t);var a=(i,e,t)=>(x(i,e,"read from private field"),t?t.call(i):e.get(i)),s=(i,e,t)=>e.has(i)?U("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),c=(i,e,t,n)=>(x(i,e,"write to private field"),n?n.call(i,t):e.set(i,t),t),B=(i,e,t)=>(x(i,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const f={BASE_URL:"https://story-api.dicoding.dev/v1",VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"},R={GET_ALL_STORIES:`${f.BASE_URL}/stories?location=1`,LOGIN:`${f.BASE_URL}/login`,REGISTER:`${f.BASE_URL}/register`,SUBSCRIBE:`${f.BASE_URL}/notifications/subscribe`};async function $(i){return(await(await fetch(R.GET_ALL_STORIES,{headers:{Authorization:`Bearer ${i}`}})).json()).listStory}async function j(i,e){const n=await(await fetch(R.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,password:e})})).json();if(n.error)throw new Error(n.message);return n}async function F(i,e,t){const r=await(await fetch(R.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i,email:e,password:t})})).json();if(r.error)throw new Error(r.message);return r}async function G(i,e){const t=await fetch(`${f.BASE_URL}/stories`,{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),n=await t.json();if(!t.ok)throw new Error(n.message||"Gagal mengirim cerita.");return n}async function H({endpoint:i,keys:e},t){const n=await fetch(R.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({endpoint:i,keys:e})}),r=await n.json();if(!n.ok)throw new Error(r.message||"Gagal berlangganan notifikasi");return r}async function z({endpoint:i},e){const t=await fetch(R.SUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({endpoint:i})}),n=await t.json();if(!t.ok)throw new Error(n.message||"Gagal berhenti langganan notifikasi");return n}var h,I;class V{constructor({view:e,token:t}){s(this,h);s(this,I);c(this,h,e),c(this,I,t)}async showStories(){try{const e=await $(a(this,I));if(!e||!Array.isArray(e)||e.length===0){a(this,h).showEmptyState();return}a(this,h).showStoriesOnList(e),a(this,h).showStoriesOnMap(e)}catch(e){console.error("Gagal mengambil cerita:",e),a(this,h).showErrorState()}}}h=new WeakMap,I=new WeakMap;var T;class K{constructor(){s(this,T)}async render(){return`
      <section class="container">
        <h1>Beranda Cerita</h1>
        <div id="story-list" class="story-list">Memuat cerita...</div>

        <h2 style="margin-top: 40px;">Peta Cerita</h2>
        <div id="map" style="height: 400px; margin-top: 16px; border-radius: 8px;"></div>
      </section>
    `}async afterRender(){const e=localStorage.getItem("authToken");if(!e){const t=document.querySelector("#story-list");t.innerHTML='<p>Anda belum login. Silakan <a href="#/login">login</a> terlebih dahulu.</p>';return}c(this,T,new V({view:this,token:e})),await a(this,T).showStories()}showStoriesOnList(e){const t=document.querySelector("#story-list");t.innerHTML=e.map(n=>`
      <article class="story-item">
        <img src="${n.photoUrl}" alt="Foto cerita oleh ${n.name}" class="story-image" />
        <h2>${n.name}</h2>
        <p>${n.description}</p>
        <small>Dibuat pada: ${new Date(n.createdAt).toLocaleDateString()}</small>
      </article>
    `).join("")}showStoriesOnMap(e){const t=document.getElementById("map");t._leaflet_id&&(t._leaflet_id=null,t.innerHTML="");const n=L.map("map").setView([-2.5489,118.0149],4);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(n),e.forEach(r=>{r.lat&&r.lon&&L.marker([r.lat,r.lon]).addTo(n).bindPopup(`<strong>${r.name}</strong><br>${r.description}`)})}showEmptyState(){const e=document.querySelector("#story-list");e.innerHTML="<p>Tidak ada cerita ditemukan.</p>"}showErrorState(){const e=document.querySelector("#story-list");e.innerHTML="<p>Gagal memuat cerita. Silakan coba lagi nanti.</p>"}}T=new WeakMap;class W{async render(){return`
      <section class="container">
        <h1>About Page</h1>
      </section>
    `}async afterRender(){}}var b;class J{constructor(e){s(this,b);c(this,b,e)}async login(e,t){try{const n=await j(e,t);a(this,b).onLoginSuccess(n)}catch(n){a(this,b).onLoginError(n.message)}}}b=new WeakMap;var P;class Y{constructor(){s(this,P)}async render(){return`
      <section class="container">
        <h1>Login</h1>
        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" required minlength="8" />

          <button type="submit">Masuk</button>
        </form>
        <div id="login-message"></div>
        <p style="margin-top: 10px;">Belum punya akun? <a href="#/register">Daftar di sini</a>.</p>
      </section>
    `}async afterRender(){c(this,P,new J(this));const e=document.querySelector("#login-form");e.addEventListener("submit",t=>{t.preventDefault();const n=e.email.value,r=e.password.value;a(this,P).login(n,r)})}onLoginSuccess(e){localStorage.setItem("authToken",e.loginResult.token),document.getElementById("login-message").textContent="Login berhasil!",setTimeout(()=>{window.updateNav(),location.hash="#/"},1e3)}onLoginError(e){document.getElementById("login-message").textContent="Login gagal: "+e}}P=new WeakMap;var l,A,w,d,v,y,D,O;class Q{constructor({view:e,token:t}){s(this,y);s(this,l);s(this,A);s(this,w,null);s(this,d,null);s(this,v,null);c(this,l,e),c(this,A,t)}async initialize(){B(this,y,D).call(this),await B(this,y,O).call(this)}capturePhoto(){const{canvas:e,ctx:t}=a(this,l).getCanvasContext(),n=document.getElementById("camera-video");e.width=n.videoWidth,e.height=n.videoHeight,t.drawImage(n,0,0),e.toBlob(r=>{if(!r){a(this,l).showMessage("Gagal menangkap gambar.","error");return}c(this,w,r);const o=URL.createObjectURL(r);a(this,l).showCapturedImage(o),a(this,d)&&a(this,d).getTracks().forEach(u=>u.stop())},"image/jpeg")}async submitForm(e,t,n){if(!a(this,w)||!e){a(this,l).showMessage("Foto dan deskripsi wajib diisi.","error");return}const r=new File([a(this,w)],"snapshot.jpg",{type:"image/jpeg"}),o=new FormData;o.append("description",e),o.append("photo",r),t&&n&&(o.append("lat",t),o.append("lon",n));try{const u=await G(a(this,A),o);a(this,l).showMessage(u.message||"Cerita berhasil dikirim!"),a(this,l).resetFormUI(),setTimeout(()=>{location.hash="#/"},1e3)}catch(u){console.error(u),a(this,l).showMessage(u.message||"Gagal mengirim cerita.","error")}}async restartCamera(){a(this,d)&&a(this,d).getTracks().forEach(e=>e.stop()),await B(this,y,O).call(this)}destroy(){a(this,d)&&(a(this,d).getTracks().forEach(e=>e.stop()),c(this,d,null))}}l=new WeakMap,A=new WeakMap,w=new WeakMap,d=new WeakMap,v=new WeakMap,y=new WeakSet,D=function(){const e=L.map(a(this,l).getMapContainer()).setView([-2.5,118],4);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(e);const t=L.icon({iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34]});e.on("click",n=>{const{lat:r,lng:o}=n.latlng;a(this,l).setLatLon(r,o),a(this,v)&&a(this,v).remove(),c(this,v,L.marker([r,o],{icon:t}).addTo(e).bindPopup(`<strong>Lokasi dipilih:</strong><br>${r.toFixed(5)}, ${o.toFixed(5)}`).openPopup())})},O=async function(){try{c(this,d,await navigator.mediaDevices.getUserMedia({video:!0})),a(this,l).setVideoStream(a(this,d))}catch(e){console.error("Tidak dapat mengakses kamera:",e),a(this,l).showMessage("Tidak dapat mengakses kamera.","error")}};var m;class X{constructor(){s(this,m)}async render(){return`
      <section class="container">
        <h1>Tambah Cerita Baru</h1>
  
        <form id="add-story-form">
          <label for="description">Deskripsi</label>
          <textarea id="description" rows="4" required></textarea>
  
          <label>Ambil Foto dari Kamera</label>
          <video id="camera-video" autoplay playsinline style="width: 100%; max-width: 400px; border-radius: 8px;"></video>
          <p style="font-size: 0.9rem; color: #555; margin-top: 6px;">Cukup 1 klik untuk ambil foto.</p>
          <button type="button" id="capture-btn">Ambil Foto</button>
          <button type="button" id="retake-btn">Ambil Ulang Foto</button>
          
          <canvas id="snapshot-canvas" style="display: none;"></canvas>
          <img id="preview-image" style="display: none; width: 100%; margin-top: 1rem; border-radius: 8px;" />
  
          <label>Lokasi</label>
          <div id="map" style="height: 300px; margin-bottom: 1rem;"></div>
          <input type="hidden" id="lat" />
          <input type="hidden" id="lon" />
  
          <button type="submit">Kirim Cerita</button>
        </form>
  
        <div id="submit-message"></div>
      </section>
    `}async afterRender(){const e=localStorage.getItem("authToken");if(!e){const t=document.querySelector(".container");t.innerHTML='<p>Anda belum login. Silakan <a href="#/login">login</a> terlebih dahulu.</p>';return}c(this,m,new Q({view:this,token:e})),await a(this,m).initialize(),document.getElementById("capture-btn").addEventListener("click",()=>a(this,m).capturePhoto()),document.getElementById("retake-btn").addEventListener("click",()=>a(this,m).restartCamera()),document.getElementById("add-story-form").addEventListener("submit",t=>{t.preventDefault();const n=document.getElementById("description").value,r=document.getElementById("lat").value,o=document.getElementById("lon").value;a(this,m).submitForm(n,r,o)})}unmount(){var e;(e=a(this,m))!=null&&e.destroy&&a(this,m).destroy()}setVideoStream(e){const t=document.getElementById("camera-video");t.srcObject=e}showCapturedImage(e){const t=document.getElementById("preview-image");t.src=e,t.style.display="block"}getCanvasContext(){const e=document.getElementById("snapshot-canvas"),t=e.getContext("2d");return{canvas:e,ctx:t}}resetFormUI(){const e=document.getElementById("add-story-form"),t=document.getElementById("preview-image");e.reset(),t.src="",t.style.display="none",document.getElementById("lat").value="",document.getElementById("lon").value=""}showMessage(e,t="success"){const n=document.getElementById("submit-message");n.style.color=t==="success"?"green":"red",n.textContent=e}setLatLon(e,t){document.getElementById("lat").value=e,document.getElementById("lon").value=t}getMapContainer(){return document.getElementById("map")}}m=new WeakMap;var k;class Z{constructor(e){s(this,k);c(this,k,e)}async register(e,t,n){try{await F(e,t,n),a(this,k).onRegisterSuccess()}catch(r){a(this,k).onRegisterError(r.message)}}}k=new WeakMap;var C;class ee{constructor(){s(this,C)}async render(){return`
      <section class="container">
        <h1>Register</h1>
        <form id="register-form">
          <label for="name">Nama</label>
          <input type="text" id="name" required />

          <label for="email">Email</label>
          <input type="email" id="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" required minlength="8" />

          <button type="submit">Daftar</button>
        </form>
        <div id="register-message"></div>
      </section>
    `}async afterRender(){c(this,C,new Z(this));const e=document.querySelector("#register-form");e.addEventListener("submit",t=>{t.preventDefault();const n=e.name.value,r=e.email.value,o=e.password.value;a(this,C).register(n,r,o)})}onRegisterSuccess(){const e=document.getElementById("register-message");e.style.color="green",e.textContent="Registrasi berhasil! Silakan login.",location.hash="#/login"}onRegisterError(e){const t=document.getElementById("register-message");t.style.color="red",t.textContent="Gagal daftar: "+e}}C=new WeakMap;const te={"/":new K,"/about":new W,"/register":new ee,"/login":new Y,"/add":new X};function ne(i){const e=i.split("/");return{resource:e[1]||null,id:e[2]||null}}function ie(i){let e="";return i.resource&&(e=e.concat(`/${i.resource}`)),i.id&&(e=e.concat("/:id")),e||"/"}function re(){return location.hash.replace("#","")||"/"}function ae(){const i=re(),e=ne(i);return ie(e)}var S,E,g,p,M,_;class oe{constructor({navigationDrawer:e,drawerButton:t,content:n}){s(this,M);s(this,S,null);s(this,E,null);s(this,g,null);s(this,p,null);c(this,S,n),c(this,E,t),c(this,g,e),B(this,M,_).call(this)}async renderPage(){const e=ae(),t=te[e];a(this,p)&&typeof a(this,p).unmount=="function"&&a(this,p).unmount(),document.startViewTransition?await document.startViewTransition(async()=>{a(this,S).innerHTML=await t.render(),await t.afterRender()}):(a(this,S).innerHTML=await t.render(),await t.afterRender()),c(this,p,t)}}S=new WeakMap,E=new WeakMap,g=new WeakMap,p=new WeakMap,M=new WeakSet,_=function(){a(this,E).addEventListener("click",()=>{a(this,g).classList.toggle("open")}),document.body.addEventListener("click",e=>{!a(this,g).contains(e.target)&&!a(this,E).contains(e.target)&&a(this,g).classList.remove("open"),a(this,g).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&a(this,g).classList.remove("open")})})};function se(i){const e="=".repeat((4-i.length%4)%4),t=(i+e).replace(/-/g,"+").replace(/_/g,"/"),n=atob(t);return new Uint8Array([...n].map(r=>r.charCodeAt(0)))}async function ce(){if("serviceWorker"in navigator)try{await navigator.serviceWorker.register("/sw.js"),console.log("✅ Service worker berhasil terdaftar")}catch(i){console.error("❌ Gagal registrasi service worker:",i)}}async function q(){return!!await(await navigator.serviceWorker.ready).pushManager.getSubscription()}async function le(i){if(await Notification.requestPermission()!=="granted"){alert("❌ Izin notifikasi tidak diberikan.");return}const n=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:se(f.VAPID_PUBLIC_KEY)}),{endpoint:r,keys:o}=n.toJSON();await H({endpoint:r,keys:o},i),alert("✅ Notifikasi berhasil diaktifkan.")}async function de(i){const t=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(!t){alert("ℹ️ Anda belum berlangganan notifikasi.");return}const{endpoint:n}=t;await z({endpoint:n},i),await t.unsubscribe(),alert("🔕 Notifikasi berhasil dinonaktifkan.")}function N(){const i=localStorage.getItem("authToken"),e=document.querySelector("#nav-list");if(!e)return;e.innerHTML="",i?e.innerHTML=`
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/add">Tambah Cerita</a></li>
      <li><button id="push-btn" class="nav-button">Cek Notifikasi...</button></li>
      <li><a href="#" id="logout-link">Keluar</a></li>
    `:e.innerHTML=`
      <li><a href="#/login">Masuk</a></li>
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
    `;const t=document.querySelector("#logout-link");t&&t.addEventListener("click",()=>{localStorage.removeItem("authToken"),location.hash="#/login",N()});const n=document.querySelector("#push-btn");n&&i&&(q().then(r=>{n.textContent=r?"Unsubscribe Notifikasi":"Subscribe Notifikasi"}),n.addEventListener("click",async()=>{await q()?await de(i):await le(i),N()}))}window.updateNav=N;document.addEventListener("DOMContentLoaded",async()=>{var n;const i=localStorage.getItem("authToken"),e=location.hash==="#/login";if(!i&&!e){location.hash="#/login";return}const t=new oe({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});window.updateNav(),await t.renderPage(),(n=document.querySelector(".skip-link"))==null||n.addEventListener("click",r=>{var o;r.preventDefault(),(o=document.querySelector("#main-content"))==null||o.focus()}),window.addEventListener("hashchange",async()=>{if(!localStorage.getItem("authToken")&&!["#/login","#/register"].includes(location.hash)){location.hash="#/login";return}await t.renderPage(),window.updateNav()}),await ce()});
