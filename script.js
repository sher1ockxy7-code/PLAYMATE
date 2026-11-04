const places = [
 {id:1,category:'football',type:'ФУТБОЛ',name:'Baku Football Arena',location:'Баку · Низами',price:35,rating:'4.9',badge:'Популярное',image:'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80'},
 {id:2,category:'shooting',type:'ТИР',name:'Target Zone Baku',location:'Баку · Бинагади',price:45,rating:'4.8',badge:'Новое',image:'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'},
 {id:3,category:'tennis',type:'ТЕННИС',name:'Green Court Club',location:'Баку · Белый город',price:25,rating:'4.7',badge:'−15% сегодня',image:'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80'},
 {id:4,category:'rest',type:'ОТДЫХ',name:'Forest Escape',location:'Абшерон · Загородная зона',price:90,rating:'5.0',badge:'Для компании',image:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80'},
 {id:5,category:'basketball',type:'БАСКЕТБОЛ',name:'Urban Basketball',location:'Баку · Ясамал',price:20,rating:'4.6',badge:'В центре',image:'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80'},
 {id:6,category:'football',type:'ФУТБОЛ',name:'City 5×5',location:'Баку · Нариманов',price:30,rating:'4.8',badge:'5×5',image:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'},
 {id:7,category:'rest',type:'ОТДЫХ',name:'Lake House',location:'Масазыр · У озера',price:120,rating:'4.9',badge:'Для выходных',image:'https://images.unsplash.com/photo-1449158743715-0a90dd0b3d5?auto=format&fit=crop&w=800&q=80'},
 {id:8,category:'shooting',type:'ТИР',name:'Precision Shooting',location:'Баку · Сураханы',price:50,rating:'4.9',badge:'Инструктор',image:'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80'}
];
const events=[
 {day:'04',month:'НОЯ',title:'Вечерний футбол 5×5',meta:'Сегодня · 19:30 · Низами',category:'football'},
 {day:'05',month:'НОЯ',title:'Теннис для начинающих',meta:'Завтра · 17:00 · Белый город',category:'tennis'},
 {day:'06',month:'НОЯ',title:'Выезд на природу',meta:'Пятница · 10:00 · Абшерон',category:'rest'}
];
const grid=document.getElementById('placeGrid');
function renderPlaces(filter='all'){
 const filtered=places.filter(p=>filter==='all'||p.category===filter);
 grid.innerHTML=filtered.length?filtered.map(p=>`<article class="place-card"><div class="place-img" style="background-image:url('${p.image}')"><span class="place-badge">${p.badge}</span><button class="heart" data-heart="${p.id}">♡</button></div><div class="place-body"><div class="place-type">${p.type}</div><h3>${p.name}</h3><div class="place-location">⌖ ${p.location}</div><div class="place-bottom"><div class="price">${p.price} AZN <small>/ час</small></div><div class="rating">★ <b>${p.rating}</b></div></div><button class="btn btn-primary book-btn" data-book="${p.name}" style="width:100%;margin-top:12px">Забронировать ↗</button></div></article>`).join(''):'<div class="empty">Пока нет локаций в этой категории.</div>';
}
function renderEvents(){document.getElementById('eventList').innerHTML=events.map(e=>`<div class="event-row"><div class="event-datebox"><b>${e.day}</b><small>${e.month}</small></div><div><h4>${e.title}</h4><p>${e.meta}</p><span class="place-type">${e.category.toUpperCase()}</span></div><button class="mini-join" data-join="${e.title}">＋</button></div>`).join('')}
renderPlaces();renderEvents();
document.addEventListener('click',e=>{
 const f=e.target.closest('[data-filter]'); if(f){const filter=f.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===filter));renderPlaces(filter)}
 const book=e.target.closest('[data-book]');if(book)openModal('Бронирование',`Вы выбрали: ${book.dataset.book}`);
 const join=e.target.closest('[data-join]');if(join)openModal('Присоединиться',`Событие: ${join.dataset.join}`);
 const heart=e.target.closest('[data-heart]');if(heart){heart.textContent=heart.textContent==='♡'?'♥':'♡';heart.style.color=heart.textContent==='♥'?'#e84c4c':''}
});
document.getElementById('searchBtn').onclick=()=>{renderPlaces(document.getElementById('heroCategory').value);document.getElementById('places').scrollIntoView({behavior:'smooth'})};
document.getElementById('heroCategory').onchange=e=>renderPlaces(e.target.value);
document.querySelectorAll('.hero-tags button').forEach(b=>b.onclick=()=>{renderPlaces(b.dataset.filter);document.getElementById('places').scrollIntoView({behavior:'smooth'})});
function openModal(title,subtitle){document.getElementById('modalTitle').textContent=title;document.getElementById('modalSubtitle').textContent=subtitle+' — демо, данные не отправляются.';document.getElementById('modalBackdrop').classList.add('show')}
function closeModal(){document.getElementById('modalBackdrop').classList.remove('show')}
document.getElementById('modalClose').onclick=closeModal;document.getElementById('modalBackdrop').onclick=e=>{if(e.target.id==='modalBackdrop')closeModal()};
document.getElementById('createEventBtn').onclick=()=>openModal('Создать мероприятие','Заполни данные события');document.getElementById('createEventTop').onclick=()=>openModal('Создать мероприятие','Заполни данные события');document.getElementById('loginBtn').onclick=()=>openModal('Вход','Авторизация будет добавлена позже');
document.getElementById('demoForm').onsubmit=e=>{e.preventDefault();closeModal();showToast('Готово! Это демонстрационный интерфейс 🎉')};
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800)}
document.getElementById('mobileMenu').onclick=()=>showToast('Мобильное меню — демо');
document.getElementById('dateInput').valueAsDate=new Date();
document.getElementById('modalDate').valueAsDate=new Date();
