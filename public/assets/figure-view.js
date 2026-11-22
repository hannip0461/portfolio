/* 프로젝트 자료를 본문 위치에서 열고, 닫을 때 읽던 자리로 돌아간다. */
(() => {
  'use strict';
  if (!('HTMLDialogElement' in window) || !HTMLDialogElement.prototype.showModal) return;
  const links = [...document.querySelectorAll('main figure a[href]')].filter(a => {
    const address = new URL(a.href);
    return a.querySelector('img') && !a.hasAttribute('download') && address.origin === location.origin &&
      /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(address.pathname);
  });
  if (!links.length) return;
  const items = [...new Map(links.map(a => [a.href, a])).values()];
  let lastFocus, index = 0, zoomed = false;
  const view = document.createElement('dialog');
  view.className = 'mj-view';
  view.setAttribute('aria-label', '프로젝트 자료 크게 보기');
  view.innerHTML = `<div class="mj-view-shell">
    <div class="mj-view-bar"><span class="mj-view-label">프로젝트 자료</span><span class="mj-view-number"></span><div class="mj-view-tools"><button type="button" data-action="zoom" aria-pressed="false">확대</button><button type="button" data-action="close" autofocus>닫기</button></div></div>
    <div class="mj-view-stage" tabindex="0" aria-label="이미지. 확대한 다음 방향키로 이동할 수 있습니다."><img alt="" draggable="false"></div>
    <div class="mj-view-foot"><p class="mj-view-caption" aria-live="polite" aria-atomic="true"></p><div class="mj-view-paging"><button type="button" data-action="prev" aria-label="이전 자료">이전</button><button type="button" data-action="next" aria-label="다음 자료">다음</button></div></div>
  </div>`;
  document.body.append(view);
  const stage = view.querySelector('.mj-view-stage'), img = stage.querySelector('img'), cap = view.querySelector('.mj-view-caption');
  const ctrl = key => view.querySelector('[data-action="' + key + '"]');
  for (const a of links) {
    a.setAttribute('aria-haspopup', 'dialog');
    a.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      lastFocus = a;
      view.showModal();
      document.documentElement.classList.add('mj-view-lock');
      setImage(items.findIndex(it => it.href === a.href));
      ctrl('close').focus({preventScroll:true});
    });
  }
  function resetZoom() {
    zoomed = false;
    view.classList.remove('mj-view-enlarged');
    img.style.removeProperty('width');
    ctrl('zoom').textContent = '확대';
    ctrl('zoom').setAttribute('aria-pressed','false');
    stage.scrollTo(0,0);
  }
  function setImage(n) {
    if (n < 0 || n >= items.length) return;
    index = n;
    resetZoom();
    const a = items[n], thumb = a.querySelector('img');
    img.alt = thumb.alt || '프로젝트 자료';
    img.src = a.href;
    cap.textContent = a.closest('figure')?.querySelector('figcaption')?.textContent.trim() || img.alt;
    view.querySelector('.mj-view-number').textContent = (n + 1) + ' / ' + items.length;
    ctrl('prev').disabled = n === 0;
    ctrl('next').disabled = n === items.length-1;
    view.querySelector('.mj-view-paging').hidden = items.length < 2;
  }
  function toggleZoom(point) {
    if (zoomed) {resetZoom();return;}
    if (!img.naturalWidth) return;
    const bounds = img.getBoundingClientRect(), rect = stage.getBoundingClientRect();
    const x = point ? (point.clientX - bounds.left)/bounds.width : .5;
    const y = point ? (point.clientY - bounds.top)/bounds.height : .5;
    const sx = point ? point.clientX - rect.left : stage.clientWidth/2;
    const sy = point ? point.clientY - rect.top : stage.clientHeight/2;
    zoomed = true;
    view.classList.add('mj-view-enlarged');
    img.style.width = Math.ceil(Math.max(img.naturalWidth,bounds.width * 2)) + 'px';
    ctrl('zoom').textContent = '화면에 맞춤';
    ctrl('zoom').setAttribute('aria-pressed','true');
    const enlarged = img.getBoundingClientRect();
    stage.scrollTo(stage.scrollLeft + enlarged.left - rect.left + x * enlarged.width - sx,
      stage.scrollTop + enlarged.top - rect.top + y * enlarged.height - sy);
  }
  img.addEventListener('click',event=>toggleZoom(event));
  ctrl('zoom').addEventListener('click',()=>toggleZoom());
  function finishClose() {
    if (view.open || !lastFocus) return;
    document.documentElement.classList.remove('mj-view-lock');
    resetZoom();
    img.removeAttribute('src');
    const target = lastFocus;
    lastFocus = null;
    if (target.isConnected) target.focus({preventScroll:true});
  }
  function closeView() {
    if (view.open) view.close();
    finishClose();
  }
  ctrl('close').addEventListener('click',closeView);
  ctrl('prev').addEventListener('click',()=>setImage(index-1));
  ctrl('next').addEventListener('click',()=>setImage(index+1));
  view.addEventListener('click',e=>{if(e.target===view)closeView()});
  view.addEventListener('keydown',e=>{
    if (e.key==='Escape') {e.stopPropagation();return;}
    if (!zoomed && !e.altKey && !e.metaKey && !e.ctrlKey && ['ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault();setImage(index+(e.key==='ArrowRight'?1:-1));
    }
  });
  view.addEventListener('cancel',e=>{e.preventDefault();closeView()});
  view.addEventListener('close',finishClose);
})();
