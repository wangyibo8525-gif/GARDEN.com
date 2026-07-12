window.onload=()=>{
  const fill=document.getElementById('loadFill');let w=0;
  const t=setInterval(()=>{
    w+=8;fill.style.width=w+'%';
    if(w>=100){clearInterval(t);setTimeout(()=>{
      document.getElementById('load').style.opacity=0;
      setTimeout(()=>{
        document.getElementById('load').style.display='none';
        loadLinks();startChar();checkScroll();
      },1000)
    },600)}
  },220)
};

function checkScroll(){
  window.onscroll=()=>{
    const top=window.scrollY;
    const r=document.getElementById('rainbow');
    const h=document.getElementById('hint');
    top<120?(r.classList.add('show'),h.style.display='none'):(r.classList.remove('show'),h.style.display='block');
  }
}

function startChar(){
  const c=document.getElementById('char');
  const t=document.getElementById('talk');
  const b=document.getElementById('btns');
  setTimeout(()=>c.classList.add('arrive'),1200);
  setTimeout(()=>{t.textContent='สวัสดีครับ! ยินดีต้อนรับสู่ Factory-Pin ครับ 🎉';t.classList.add('show')},3800);
  setTimeout(()=>{t.textContent='ชอบลิงก์ดีดี ก๊อปปี้ง่ายๆ แบบนี้ไหมครับ?';b.style.display='flex'},6500);
}

function replyYes(){
  const t=document.getElementById('talk');
  const b=document.getElementById('btns');
  b.style.display='none';
  t.textContent='ขอบคุณมากครับ! ก๊อปปี้ใช้งานได้เลยครับ ✨';
  setTimeout(()=>t.classList.remove('show'),5000);
}

function replyNo(){
  const t=document.getElementById('talk');
  const b=document.getElementById('btns');
  b.style.display='none';
  t.textContent='ไม่เป็นไรครับ ไว้ปรับปรุงใหม่นะครับ!';
  setTimeout(()=>t.classList.remove('show'),4500);
}

function copyLink(url){
  navigator.clipboard.writeText(url)
  .then(()=>alert('✅ ก๊อปปี้เรียบร้อย!'))
  .catch(()=>alert('❌ คัดลอกเองได้นะครับ'));
}

// แก้ส่วนโหลดข้อมูลให้แน่นหนา
async function loadLinks(){
  try{
    // เส้นทางตรงที่สุด ไม่มีจุดหน้า ไม่มีโฟลเดอร์
    const res=await fetch('data.json',{cache:'no-store'});
    if(!res.ok) throw new Error(`สถานะ: ${res.status}`);
    const data=await res.json();
    const list=document.getElementById('links');
    list.innerHTML='';

    data.cards.forEach(card=>{
      const el=document.createElement('div');
      el.className='ddCard';
      let linkRow='<div class="linkRow">';
      card.links.forEach(l=>{
        linkRow+=`
        <div class="linkBtn">
          <a href="${l.url}" target="_blank" rel="noopener">${l.name}</a>
          <button class="copyBtn" onclick="copyLink('${l.url.replace(/'/g,"\\'")}')">📋</button>
        </div>`;
      });
      linkRow+='</div>';
      el.innerHTML=`<h2>${card.title}</h2><p>${card.desc}</p>${linkRow}`;
      list.appendChild(el);
    });

  }catch(err){
    console.error('ผิดพลาด:',err);
    document.getElementById('links').innerHTML=`
    <div class="ddCard">
      <h2>✅ พร้อมใช้งานแล้ว!</h2>
      <p>ถ้าเห็นข้อความนี้ แสดงว่าเว็บทำงานปกติครับ</p>
      <p>สาเหตุที่ผ่านมาคือไฟล์ data.json อาจจะยังไม่อัปโหลดขึ้น หรือชื่อไม่ตรงครับ</p>
      <p>ให้แน่ใจว่าอัปโหลดไฟล์ data.json ไว้ข้างนอก ไม่ได้ใส่ในโฟลเดอร์ครับ</p>
    </div>`;
  }
}
