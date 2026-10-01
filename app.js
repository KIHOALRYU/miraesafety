(function(){
  const defaults={
    notice:[
      {id:'n1',category:'notice',title:'위험성평가 컨설팅 안내',content:'미래안전연구원의 위험성평가 컨설팅 안내입니다.',created_at:'2026-09-30T09:00:00+09:00',published:true},
      {id:'n2',category:'notice',title:'제조업 유해위험방지계획서 컨설팅 안내',content:'제조업 유해위험방지계획서 작성 및 대응을 지원합니다.',created_at:'2026-09-25T09:00:00+09:00',published:true},
      {id:'n3',category:'notice',title:'PSM 컨설팅 안내',content:'공정안전관리(PSM) 구축 및 이행을 지원합니다.',created_at:'2026-09-18T09:00:00+09:00',published:true},
      {id:'n4',category:'notice',title:'근골격계부담작업 유해요인조사 안내',content:'사업장 근골격계부담작업 유해요인조사를 지원합니다.',created_at:'2026-09-12T09:00:00+09:00',published:true}
    ],
    resource:[
      {id:'r1',category:'resource',title:'위험성평가 관련 자료',content:'위험성평가 관련 참고 자료입니다.',created_at:'2026-09-30T09:00:00+09:00',published:true},
      {id:'r2',category:'resource',title:'제조업 유해위험방지계획서 관련 자료',content:'제조업 유해위험방지계획서 관련 참고 자료입니다.',created_at:'2026-09-25T09:00:00+09:00',published:true},
      {id:'r3',category:'resource',title:'공정안전관리(PSM) 관련 자료',content:'PSM 관련 참고 자료입니다.',created_at:'2026-09-18T09:00:00+09:00',published:true},
      {id:'r4',category:'resource',title:'근골격계질환 관련 자료',content:'근골격계 관련 참고 자료입니다.',created_at:'2026-09-12T09:00:00+09:00',published:true}
    ]
  };
  const configured=window.MIRAE_SUPABASE_URL && !window.MIRAE_SUPABASE_URL.includes('YOUR_') && window.MIRAE_SUPABASE_ANON_KEY && !window.MIRAE_SUPABASE_ANON_KEY.includes('YOUR_');
  const client=configured && window.supabase ? window.supabase.createClient(window.MIRAE_SUPABASE_URL,window.MIRAE_SUPABASE_ANON_KEY):null;
  window.MiraeData={configured,client};
  function fmt(d){const x=new Date(d); if(isNaN(x)) return ''; return `${x.getFullYear()}.${String(x.getMonth()+1).padStart(2,'0')}.${String(x.getDate()).padStart(2,'0')}`}
  function localAll(){try{return JSON.parse(localStorage.getItem('mirae_posts')||'[]')}catch(e){return []}}
  function mergedLocal(cat){const custom=localAll().filter(x=>x.category===cat && x.published!==false); const ids=new Set(custom.map(x=>x.id)); return [...custom,...defaults[cat].filter(x=>!ids.has(x.id))].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));}
  async function getPosts(cat,limit){
    if(client){let q=client.from('posts').select('*').eq('category',cat).eq('published',true).order('created_at',{ascending:false}); if(limit)q=q.limit(limit); const {data,error}=await q; if(!error)return data||[]; console.error(error)}
    const data=mergedLocal(cat); return limit?data.slice(0,limit):data;
  }
  function esc(s=''){return String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]))}
  async function renderHome(){
    for(const [cat,id,label] of [['notice','home-notices',''],['resource','home-resources','자료']]){
      const el=document.getElementById(id); if(!el)continue; const data=await getPosts(cat,4);
      el.innerHTML=data.length?data.map(p=>`<a class="list-row" href="post.html?id=${encodeURIComponent(p.id)}&category=${cat}"><span>${esc(p.title)}</span><span>${cat==='notice'?fmt(p.created_at):label}</span></a>`).join(''):`<div class="list-row"><span>등록된 글이 없습니다.</span><span></span></div>`;
    }
  }
  window.MiraeData.getPosts=getPosts; window.MiraeData.formatDate=fmt; window.MiraeData.escapeHtml=esc; window.MiraeData.defaults=defaults; window.MiraeData.localAll=localAll;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',renderHome);else renderHome();
})();
