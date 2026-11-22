(() => {
  const menu = document.querySelector('.mobile-menu');
  const summary = menu.querySelector('summary');
  const pageTop = document.querySelector('.page-top');
  document.getElementById('header').tabIndex = -1;
  const desktopLinks = [...document.querySelectorAll('#menu a')];
  const mobileLinks = [...menu.querySelectorAll('nav a')];
  const pagePath = path => path.endsWith('/') ? path + 'index.html' : path;
  const local = a => pagePath(a.pathname) === pagePath(location.pathname) && !!a.hash;
  const anchors = [...desktopLinks, ...mobileLinks].filter(local);
  const targets = [...new Set(anchors.map(a => document.getElementById(a.hash.slice(1))).filter(Boolean))];
  function mark(){
    pageTop.classList.toggle('is-floating', scrollY > 320);
    if (!targets.length) return;
    const last = [...targets].reverse().find(el => el.getBoundingClientRect().top <= Math.min(160, innerHeight * .28));
    const cover = document.body.classList.contains('cover-page');
    const current = cover && scrollY < 5 ? targets[0] : Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2 ? targets.at(-1) : last || (cover ? targets[0] : null);
    for (const link of anchors) {
      if (link.hash === '#' + current?.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }
  }
  let pending = false;
  function schedule(){ if(!pending){pending=true;requestAnimationFrame(()=>{mark();pending=false;});} }
  function close(restore){if(!menu.open)return;menu.open=false;if(restore)summary.focus({preventScroll:true});}
  menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if(!link)return;
    if(local(link)){
      const target=document.getElementById(link.hash.slice(1));
      if(target) {
        target.tabIndex=-1;
        target.focus({preventScroll:true});
      }
    }
    close(false);
  });
  document.addEventListener('keydown', event=>{if(event.key==='Escape' && menu.open){event.preventDefault();close(true);}});
  document.addEventListener('pointerdown', event=>{if(!menu.contains(event.target))close(false);});
  document.addEventListener('focusin', event=>{if(!menu.contains(event.target))close(false);});
  addEventListener('resize',()=>{if(getComputedStyle(menu).display==='none')close(false);schedule();});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('hashchange',schedule);
  addEventListener('pageshow',schedule);
  mark();
})();
