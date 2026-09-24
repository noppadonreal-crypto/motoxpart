const PRODUCTS = [
{id:'exhaust',cat:'ท่อไอเสีย',name:'MOTOX Performance Exhaust',price:5000,qty:8,img:'assets/exhaust.png',desc:'ท่อแต่งทรงสปอร์ต เน้นดีไซน์ดุดันและความโดดเด่นสำหรับรถมอเตอร์ไซค์',fit:'PCX / Click / NMAX / Aerox',material:'เหล็ก + อะลูมิเนียม / ปลายแต่ง',brand:'KOIT Racing',stock:'มีสินค้า · ตรวจสอบรุ่นก่อนสั่ง',warranty:'ตามเงื่อนไขร้าน',details:['ดีไซน์สปอร์ตสำหรับรถแต่ง','มีอุปกรณ์ยึดตามชุดสินค้า','ควรตรวจสอบรุ่นรถก่อนสั่ง','แนะนำติดตั้งโดยช่างผู้ชำนาญ']},
{id:'suspension',cat:'ช่วงล่าง',name:'STAGE 6 Racing Shock',price:33500,qty:3,img:'assets/suspension.png',desc:'โช้คอัพแต่งสำหรับอัปเกรดช่วงล่างและเพิ่มความสปอร์ตให้รถ',fit:'PCX / NMAX / Aerox / Forza',material:'อะลูมิเนียม + สปริงปรับระดับ',brand:'R/T Stage 6',stock:'มีสินค้า · สั่งล่วงหน้าได้',warranty:'ตามเงื่อนไขร้าน',details:['ปรับลุคช่วงล่างให้สปอร์ต','เหมาะกับรถใช้งานและรถแต่ง','ควรตั้งค่าให้เหมาะกับรุ่นรถ','แนะนำติดตั้งโดยช่าง']},
{id:'wheels',cat:'ล้อ',name:'MOTOX Alloy Racing Wheel',price:42900,qty:12,img:'assets/wheels.png',desc:'ล้อแต่งทรงสปอร์ต ดีไซน์ก้านหลายก้าน เพิ่มความโดดเด่นให้รถ',fit:'รถมอเตอร์ไซค์ที่รองรับขนาดล้อ',material:'อัลลอย',brand:'Racing Style',stock:'เช็กสีและขนาดก่อนสั่ง',warranty:'ตามเงื่อนไขร้าน',details:['ดีไซน์ก้านสปอร์ต','มีหลายสี/ขนาดตามรุ่นที่มี','ต้องตรวจสอบขนาดก่อนติดตั้ง','แนะนำตรวจตั้งศูนย์หลังติดตั้ง']},
{id:'brakes',cat:'ปั้มเบรก',name:'MOTOX Racing Caliper',price:5000,qty:2,img:'assets/brakes.png',desc:'ปั้มเบรกแต่งทรง Racing สำหรับเพิ่มความสปอร์ตและอัปเกรดระบบเบรกตามสเปกรถ',fit:'ตรวจขนาดจานและจุดยึดก่อนสั่ง',material:'อะลูมิเนียม CNC',brand:'MFZ Racing',stock:'มีสินค้า · เช็กสีได้',warranty:'ตามเงื่อนไขร้าน',details:['ทรง Racing','ต้องใช้กับระบบที่ตรงสเปก','ตรวจขนาดและจุดยึดก่อนติดตั้ง','แนะนำให้ช่างติดตั้ง']},
{id:'bodykit',cat:'ชุดแต่ง',name:'MOTOX Body Kit / Accessories',price:9999,qty:20,img:'assets/bodykit.png',desc:'ชุดแต่งและอุปกรณ์ตกแต่งโทนสปอร์ต สำหรับเพิ่มความโดดเด่นให้รถ',fit:'เลือกชุดตามรุ่นรถ',material:'ABS / พลาสติกแต่ง / อุปกรณ์ยึด',brand:'MOTOX Custom',stock:'เช็กชุดและสีก่อนสั่ง',warranty:'ตามเงื่อนไขร้าน',details:['มีหลายชิ้นส่วนให้เลือก','เหมาะสำหรับตกแต่งรถ','ควรเทียบรูปและขนาดก่อนสั่ง','ราคาอาจต่างกันตามชิ้นส่วน']},
{id:'lights',cat:'ไฟ LED',name:'MOTOX LED Styling Light',price:2000,qty:0,img:'assets/lights.png',desc:'ไฟแต่ง LED สำหรับเพิ่มความโดดเด่นให้ด้านหน้ารถและสร้างลุคสปอร์ต',fit:'รถที่รองรับระบบไฟและขนาดสินค้า',material:'LED + Housing',brand:'MOTOX LED',stock:'มีสินค้า',warranty:'ตามเงื่อนไขร้าน',details:['ดีไซน์ไฟสปอร์ต','ช่วยเพิ่มความโดดเด่น','ตรวจระบบไฟก่อนติดตั้ง','แนะนำติดตั้งโดยช่าง']}
];
const LOW_STOCK_THRESHOLD=5;
const fmt=n=>new Intl.NumberFormat('th-TH').format(n);

/* ---------- Product overrides / custom products (Admin CRUD) ---------- */
function getProductOverrides(){try{return JSON.parse(localStorage.getItem('motox_product_overrides')||'{}')}catch{return{}}}
function saveProductOverride(id,patch){const o=getProductOverrides();o[id]={...(o[id]||{}),...patch};localStorage.setItem('motox_product_overrides',JSON.stringify(o))}
function getCustomProducts(){try{return JSON.parse(localStorage.getItem('motox_custom_products')||'[]')}catch{return[]}}
function setCustomProducts(list){localStorage.setItem('motox_custom_products',JSON.stringify(list))}
function addCustomProduct(p){const list=getCustomProducts();list.push(p);setCustomProducts(list)}
function updateCustomProduct(id,patch){setCustomProducts(getCustomProducts().map(p=>p.id===id?{...p,...patch}:p))}
function deleteCustomProduct(id){setCustomProducts(getCustomProducts().filter(p=>p.id!==id))}
function getAllProducts(){
  const overrides=getProductOverrides();
  const base=PRODUCTS.map(p=>overrides[p.id]?{...p,...overrides[p.id]}:p);
  return [...base,...getCustomProducts()];
}
function isCustomProduct(id){return getCustomProducts().some(p=>p.id===id)}
function decrementStock(items){
  items.forEach(i=>{
    const p=getAllProducts().find(x=>x.id===i.id);
    if(!p)return;
    const newQty=Math.max(0,(p.qty||0)-i.qty);
    if(isCustomProduct(p.id))updateCustomProduct(p.id,{qty:newQty});
    else saveProductOverride(p.id,{qty:newQty});
  });
}

/* ---------- Cart ---------- */
function getCart(){try{return JSON.parse(localStorage.getItem('motox_cart')||'[]')}catch{return[]}}
function setCart(c){localStorage.setItem('motox_cart',JSON.stringify(c));updateCartCount();renderDrawer()}
function updateCartCount(){const n=getCart().reduce((s,i)=>s+i.qty,0);document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=n)}
function addToCart(id,qty=1,go=false){
  const p=productById(id);
  if(p&&(p.qty||0)<=0){toast('สินค้านี้หมดสต็อกแล้ว');return}
  const c=getCart(),x=c.find(i=>i.id===id);if(x)x.qty+=qty;else c.push({id,qty});setCart(c);toast('เพิ่มสินค้าเข้าตะกร้าแล้ว');if(go)location.href='cart.html'
}
function changeQty(id,delta){const c=getCart(),x=c.find(i=>i.id===id);if(!x)return;x.qty=Math.max(1,x.qty+delta);setCart(c)}
function removeItem(id){setCart(getCart().filter(i=>i.id!==id))}
function cartTotal(){return getCart().reduce((sum,i)=>{const p=productById(i.id);return sum+(p?p.price*i.qty:0)},0)}
function productById(id){return getAllProducts().find(p=>p.id===id)}
function toast(msg){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove('show'),1800)}
function openDrawer(){document.getElementById('drawer')?.classList.add('open');document.getElementById('drawerShade')?.classList.add('show');renderDrawer()}
function closeDrawer(){document.getElementById('drawer')?.classList.remove('open');document.getElementById('drawerShade')?.classList.remove('show')}
function renderDrawer(){const el=document.getElementById('drawerItems'),total=document.getElementById('drawerTotal');if(!el)return;const c=getCart();if(!c.length){el.innerHTML='<div class="empty">🛒<br><b>ตะกร้ายังว่าง</b><br><span>เลือกสินค้าที่ต้องการแล้วเพิ่มลงตะกร้าได้เลย</span></div>';total.textContent='฿0';return}el.innerHTML=c.map(i=>{const p=productById(i.id);if(!p)return'';return `<div class="drawer-item"><img src="${p.img}"><div><b>${p.name}</b><small>฿${fmt(p.price)} × ${i.qty}</small><div class="mini-qty"><button onclick="changeQty('${p.id}',-1)">−</button><span>${i.qty}</span><button onclick="changeQty('${p.id}',1)">+</button><button class="del" onclick="removeItem('${p.id}')">ลบ</button></div></div></div>`}).join('');total.textContent='฿'+fmt(cartTotal())}
function buyNow(id){addToCart(id,1);location.href='checkout.html'}
function setupGlobal(){updateCartCount();document.querySelector('[data-open-cart]')?.addEventListener('click',e=>{e.preventDefault();openDrawer()});document.querySelector('[data-close-cart]')?.addEventListener('click',closeDrawer);document.getElementById('drawerShade')?.addEventListener('click',closeDrawer);renderDrawer()}

/* ---------- Customer accounts (demo, client-side only) ---------- */
function getCustomers(){try{return JSON.parse(localStorage.getItem('motox_customers')||'[]')}catch{return[]}}
function saveCustomers(list){localStorage.setItem('motox_customers',JSON.stringify(list))}
function currentCustomer(){try{return JSON.parse(sessionStorage.getItem('motox_customer_session')||'null')}catch{return null}}
function registerCustomer(name,phone,password){
  name=name.trim();phone=phone.trim();
  if(!name||!phone||!password)return{ok:false,msg:'กรุณากรอกข้อมูลให้ครบ'};
  const list=getCustomers();
  if(list.some(c=>c.phone===phone))return{ok:false,msg:'เบอร์นี้เคยสมัครสมาชิกแล้ว กรุณาเข้าสู่ระบบ'};
  list.push({name,phone,password});
  saveCustomers(list);
  sessionStorage.setItem('motox_customer_session',JSON.stringify({name,phone}));
  return{ok:true};
}
function loginCustomer(phone,password){
  const c=getCustomers().find(x=>x.phone===phone.trim()&&x.password===password);
  if(!c)return{ok:false,msg:'เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง'};
  sessionStorage.setItem('motox_customer_session',JSON.stringify({name:c.name,phone:c.phone}));
  return{ok:true};
}
function logoutCustomer(){sessionStorage.removeItem('motox_customer_session');location.reload()}
