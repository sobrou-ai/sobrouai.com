(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  window.dataLayer = window.dataLayer || [];
  const analyticsLog = JSON.parse(localStorage.getItem('sobrouAnalyticsLog') || '[]');

  function track(event, data = {}) {
    const payload = { event, ts: new Date().toISOString(), ...data };
    window.dataLayer.push(payload);
    analyticsLog.push(payload);
    localStorage.setItem('sobrouAnalyticsLog', JSON.stringify(analyticsLog.slice(-100)));
  }

  window.sobrouTrack = track;

  const defaultHeadline = 'O desperdício da sua cozinha, em <em>reais</em>. E o ajuste pro próximo turno.';
  $('#heroHeadline').innerHTML = defaultHeadline;
  track('page_view', { path: location.pathname, title: document.title });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
        track('section_view', { id: entry.target.id || entry.target.className });
      }
    });
  }, { threshold: .12 });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  window.addEventListener('mousemove', (e) => {
    const panel = $('[data-parallax]');
    if (!panel) return;
    const x = (e.clientX / innerWidth - .5) * 16;
    const y = (e.clientY / innerHeight - .5) * 10;
    panel.style.transform = `rotateY(${-6 + x * .12}deg) rotateX(${3 - y * .12}deg) translate3d(${x}px, ${y}px, 0)`;
  }, { passive: true });

  $$('[data-track]').forEach(el => el.addEventListener('click', () => {
    track('click', { label: el.dataset.track, text: el.textContent.trim().slice(0, 80) });
  }));

  const dashBars = $('#dashBars');
  if (dashBars) {
    [38, 54, 94, 61, 45, 31, 24].forEach(h => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = h + '%';
      dashBars.appendChild(bar);
    });
  }

  const categoryArt = {
    arroz: {
      img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20440%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fff9ed%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23f1ead5%22/%3E%3C/linearGradient%3E%3ClinearGradient%20id%3D%22bowl%22%20x1%3D%220%22%20x2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23c88344%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%238b5723%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22440%22%20height%3D%22300%22%20rx%3D%2230%22%20fill%3D%22url%28%23bg%29%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22232%22%20rx%3D%22118%22%20ry%3D%2228%22%20fill%3D%22%23d9d0b8%22%20opacity%3D%22.55%22/%3E%3Cpath%20d%3D%22M120%20174c9%2042%2039%2070%20100%2070s92-28%20100-70H120z%22%20fill%3D%22url%28%23bowl%29%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22170%22%20rx%3D%22112%22%20ry%3D%2234%22%20fill%3D%22%23b16e35%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22164%22%20rx%3D%2298%22%20ry%3D%2228%22%20fill%3D%22%23faf6e8%22/%3E%3Cg%20fill%3D%22%23fffdf7%22%3E%3Cellipse%20cx%3D%22174%22%20cy%3D%22154%22%20rx%3D%2218%22%20ry%3D%229%22/%3E%3Cellipse%20cx%3D%22195%22%20cy%3D%22162%22%20rx%3D%2216%22%20ry%3D%228%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22152%22%20rx%3D%2220%22%20ry%3D%2210%22/%3E%3Cellipse%20cx%3D%22246%22%20cy%3D%22161%22%20rx%3D%2217%22%20ry%3D%228%22/%3E%3Cellipse%20cx%3D%22270%22%20cy%3D%22154%22%20rx%3D%2218%22%20ry%3D%229%22/%3E%3C/g%3E%3Cpath%20d%3D%22M275%20132c18%200%2030%209%2033%2024-19%200-31-8-33-24z%22%20fill%3D%22%231f5e3b%22/%3E%3Cpath%20d%3D%22M282%20138c12-15%2024-22%2038-22-2%2014-12%2023-29%2028%22%20fill%3D%22%23a7e34b%22/%3E%3C/svg%3E',
      title: 'Arroz',
      text: 'Imagem ilustrativa de uma das categorias mais comuns em buffets por kg e operações de alto volume.'
    },
    feijao: {
      img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20440%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fff7ef%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23f0e7d7%22/%3E%3C/linearGradient%3E%3ClinearGradient%20id%3D%22bowl%22%20x1%3D%220%22%20x2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23be7a47%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237f4c23%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22440%22%20height%3D%22300%22%20rx%3D%2230%22%20fill%3D%22url%28%23bg%29%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22232%22%20rx%3D%22118%22%20ry%3D%2228%22%20fill%3D%22%23d9d0b8%22%20opacity%3D%22.55%22/%3E%3Cpath%20d%3D%22M120%20174c9%2042%2039%2070%20100%2070s92-28%20100-70H120z%22%20fill%3D%22url%28%23bowl%29%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22170%22%20rx%3D%22112%22%20ry%3D%2234%22%20fill%3D%22%23b16e35%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22164%22%20rx%3D%2298%22%20ry%3D%2228%22%20fill%3D%22%236e4228%22/%3E%3Cg%20fill%3D%22%23432617%22%3E%3Cellipse%20cx%3D%22170%22%20cy%3D%22157%22%20rx%3D%2216%22%20ry%3D%2210%22/%3E%3Cellipse%20cx%3D%22194%22%20cy%3D%22166%22%20rx%3D%2215%22%20ry%3D%229%22/%3E%3Cellipse%20cx%3D%22218%22%20cy%3D%22154%22%20rx%3D%2216%22%20ry%3D%2210%22/%3E%3Cellipse%20cx%3D%22242%22%20cy%3D%22165%22%20rx%3D%2215%22%20ry%3D%229%22/%3E%3Cellipse%20cx%3D%22268%22%20cy%3D%22156%22%20rx%3D%2217%22%20ry%3D%2210%22/%3E%3C/g%3E%3Cpath%20d%3D%22M135%20110c23%200%2038%2010%2042%2029-24%200-39-10-42-29z%22%20fill%3D%22%231f5e3b%22/%3E%3C/svg%3E',
      title: 'Feijão',
      text: 'Bom exemplo para operações brasileiras em que a sobra recorrente vem de bases muito repetidas.'
    },
    salada: {
      img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20440%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23f8ffe9%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9f6da%22/%3E%3C/linearGradient%3E%3ClinearGradient%20id%3D%22plate%22%20x1%3D%220%22%20x2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fefefe%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23f5f1e8%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22440%22%20height%3D%22300%22%20rx%3D%2230%22%20fill%3D%22url%28%23bg%29%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22222%22%20rx%3D%22110%22%20ry%3D%2282%22%20fill%3D%22url%28%23plate%29%22%20stroke%3D%22%23d9d2c3%22%20stroke-width%3D%228%22/%3E%3Cg%3E%3Cellipse%20cx%3D%22170%22%20cy%3D%22168%22%20rx%3D%2234%22%20ry%3D%2224%22%20fill%3D%22%237cc75a%22/%3E%3Cellipse%20cx%3D%22210%22%20cy%3D%22156%22%20rx%3D%2240%22%20ry%3D%2227%22%20fill%3D%22%235da93e%22/%3E%3Cellipse%20cx%3D%22256%22%20cy%3D%22168%22%20rx%3D%2236%22%20ry%3D%2224%22%20fill%3D%22%2382d765%22/%3E%3Cellipse%20cx%3D%22204%22%20cy%3D%22190%22%20rx%3D%2238%22%20ry%3D%2226%22%20fill%3D%22%236aba4a%22/%3E%3C/g%3E%3Cg%20fill%3D%22%23ef4b3f%22%3E%3Ccircle%20cx%3D%22168%22%20cy%3D%22182%22%20r%3D%2212%22/%3E%3Ccircle%20cx%3D%22246%22%20cy%3D%22186%22%20r%3D%2212%22/%3E%3Ccircle%20cx%3D%22220%22%20cy%3D%22167%22%20r%3D%2210%22/%3E%3C/g%3E%3Cg%20fill%3D%22%23f5d46f%22%3E%3Cellipse%20cx%3D%22198%22%20cy%3D%22176%22%20rx%3D%228%22%20ry%3D%226%22/%3E%3Cellipse%20cx%3D%22232%22%20cy%3D%22194%22%20rx%3D%228%22%20ry%3D%226%22/%3E%3Cellipse%20cx%3D%22258%22%20cy%3D%22160%22%20rx%3D%228%22%20ry%3D%226%22/%3E%3C/g%3E%3C/svg%3E',
      title: 'Salada',
      text: 'Útil para mostrar perdas em itens de buffet com alta perecibilidade e reposição frequente.'
    },
    proteina: {
      img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20440%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fff7ea%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23f1ead8%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22440%22%20height%3D%22300%22%20rx%3D%2230%22%20fill%3D%22url%28%23bg%29%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22220%22%20rx%3D%22122%22%20ry%3D%2286%22%20fill%3D%22%23fefefe%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%228%22/%3E%3Cpath%20d%3D%22M165%20180c0-28%2030-48%2068-48%2027%200%2049%2010%2064%2028%2010%2013%2012%2035%200%2050-14%2018-39%2028-67%2028-41%200-65-25-65-58z%22%20fill%3D%22%23ca8a48%22/%3E%3Cpath%20d%3D%22M188%20165c17-16%2048-26%2076-22%22%20stroke%3D%22%239f5c2f%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20opacity%3D%22.65%22/%3E%3Cpath%20d%3D%22M170%20214c20%2020%2043%2030%2075%2028%22%20stroke%3D%22%239f5c2f%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20opacity%3D%22.55%22/%3E%3Cg%20fill%3D%22%2379bf57%22%3E%3Cellipse%20cx%3D%22155%22%20cy%3D%22190%22%20rx%3D%2218%22%20ry%3D%2214%22/%3E%3Cellipse%20cx%3D%22142%22%20cy%3D%22205%22%20rx%3D%2218%22%20ry%3D%2214%22/%3E%3C/g%3E%3C/svg%3E',
      title: 'Proteína',
      text: 'Ajuda a tangibilizar categorias com maior impacto em CMV e desperdício financeiro.'
    },
    cafe: {
      img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20440%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fff8ee%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23efe3ca%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22440%22%20height%3D%22300%22%20rx%3D%2230%22%20fill%3D%22url%28%23bg%29%22/%3E%3Cellipse%20cx%3D%22150%22%20cy%3D%22190%22%20rx%3D%2288%22%20ry%3D%2260%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%228%22/%3E%3Cpath%20d%3D%22M110%20190c10-34%2028-56%2058-56s50%2024%2064%2056c-16%2014-39%2024-64%2024s-45-8-58-24z%22%20fill%3D%22%23e5b55b%22/%3E%3Cpath%20d%3D%22M94%20180c16-16%2028-27%2048-30%22%20stroke%3D%22%23d3953f%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22/%3E%3Cg%20transform%3D%22translate%28248%20120%29%22%3E%3Crect%20x%3D%220%22%20y%3D%2230%22%20width%3D%2290%22%20height%3D%2274%22%20rx%3D%2214%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%228%22/%3E%3Cpath%20d%3D%22M88%2044c22%200%2038%2014%2038%2034s-16%2034-38%2034%22%20fill%3D%22none%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%228%22/%3E%3Crect%20x%3D%2210%22%20y%3D%2240%22%20width%3D%2270%22%20height%3D%2252%22%20rx%3D%2210%22%20fill%3D%22%237b4a2a%22/%3E%3Cpath%20d%3D%22M22%2020c-8-12-8-24%200-36M48%2020c-8-12-8-24%200-36M74%2020c-8-12-8-24%200-36%22%20fill%3D%22none%22%20stroke%3D%22%23c7b59b%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22/%3E%3C/g%3E%3C/svg%3E',
      title: 'Café da manhã',
      text: 'Perfeito para hotelaria e buffets matinais, onde sobra visual e custo andam juntos.'
    },
    padaria: {
      img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20440%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23fff8ee%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23f0e6d6%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22440%22%20height%3D%22300%22%20rx%3D%2230%22%20fill%3D%22url%28%23bg%29%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22232%22%20rx%3D%22118%22%20ry%3D%2228%22%20fill%3D%22%23d9d0b8%22%20opacity%3D%22.55%22/%3E%3Cg%3E%3Cellipse%20cx%3D%22172%22%20cy%3D%22170%22%20rx%3D%2254%22%20ry%3D%2242%22%20fill%3D%22%23d79246%22/%3E%3Cellipse%20cx%3D%22258%22%20cy%3D%22170%22%20rx%3D%2262%22%20ry%3D%2246%22%20fill%3D%22%23c68039%22/%3E%3Cpath%20d%3D%22M138%20162c12-10%2024-16%2038-18M161%20154c18-12%2038-17%2054-16M228%20152c18-12%2040-17%2058-16M248%20162c18-11%2036-15%2052-14%22%20stroke%3D%22%23a15f22%22%20stroke-width%3D%228%22%20stroke-linecap%3D%22round%22%20opacity%3D%22.6%22/%3E%3C/g%3E%3Cpath%20d%3D%22M99%20110c16%200%2028%208%2032%2020-18%200-30-7-32-20z%22%20fill%3D%22%231f5e3b%22/%3E%3C/svg%3E',
      title: 'Padaria / rotisseria',
      text: 'Boa referência para supermercados e operações com produção própria ao longo do dia.'
    },
    misto: {
      img: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20440%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23f8f5ea%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23efe8d6%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22440%22%20height%3D%22300%22%20rx%3D%2230%22%20fill%3D%22url%28%23bg%29%22/%3E%3Crect%20x%3D%2278%22%20y%3D%2288%22%20width%3D%22284%22%20height%3D%22138%22%20rx%3D%2222%22%20fill%3D%22%23fbfaf6%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%228%22/%3E%3Cline%20x1%3D%22172%22%20y1%3D%2294%22%20x2%3D%22172%22%20y2%3D%22220%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%226%22/%3E%3Cline%20x1%3D%22268%22%20y1%3D%2294%22%20x2%3D%22268%22%20y2%3D%22220%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%226%22/%3E%3Cline%20x1%3D%2284%22%20y1%3D%22156%22%20x2%3D%22356%22%20y2%3D%22156%22%20stroke%3D%22%23ddd4c5%22%20stroke-width%3D%226%22/%3E%3Cellipse%20cx%3D%22126%22%20cy%3D%22124%22%20rx%3D%2228%22%20ry%3D%2218%22%20fill%3D%22%23faf6e8%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22124%22%20rx%3D%2228%22%20ry%3D%2218%22%20fill%3D%22%236e4228%22/%3E%3Cellipse%20cx%3D%22314%22%20cy%3D%22124%22%20rx%3D%2228%22%20ry%3D%2218%22%20fill%3D%22%237cc75a%22/%3E%3Cellipse%20cx%3D%22126%22%20cy%3D%22188%22%20rx%3D%2228%22%20ry%3D%2218%22%20fill%3D%22%23ca8a48%22/%3E%3Cellipse%20cx%3D%22220%22%20cy%3D%22188%22%20rx%3D%2228%22%20ry%3D%2218%22%20fill%3D%22%23e5b55b%22/%3E%3Cellipse%20cx%3D%22314%22%20cy%3D%22188%22%20rx%3D%2228%22%20ry%3D%2218%22%20fill%3D%22%23d79246%22/%3E%3C/svg%3E',
      title: 'Misto / buffet',
      text: 'Visão mais ampla para quando a operação ainda não sabe exatamente qual categoria mais pesa.'
    }
  };

  function calcROI() {
    const meals = +$('#meals').value || 0;
    const days = +$('#days').value || 0;
    const costMeal = +$('#costMeal').value || 0;
    const wastePct = (+$('#wastePct').value || 0) / 100;
    const wasteCategory = $('#wasteCategory').value || 'arroz';
    const reductionPct = (+$('#reductionPct').value || 0) / 100;
    const fee = +$('#monthlyFee').value || 0;

    const monthlyFoodCost = meals * days * costMeal;
    const monthlyWaste = monthlyFoodCost * wastePct;
    const saving = monthlyWaste * reductionPct;
    const annualWaste = monthlyWaste * 12;
    const annualSaving = saving * 12;
    const payback = saving > 0 ? Math.max(fee / saving, 0) : 0;
    const roi = fee > 0 ? saving / fee : 0;
    const art = categoryArt[wasteCategory] || categoryArt.arroz;

    $('#reductionLabel').textContent = Math.round(reductionPct * 100) + '%';
    $('#monthlyWaste').textContent = money(monthlyWaste);
    $('#monthlySaving').textContent = money(saving);
    $('#annualWaste').textContent = money(annualWaste);
    $('#annualSaving').textContent = money(annualSaving);
    $('#payback').textContent = payback < 1 ? 'Menos de 1 mês' : payback.toFixed(1).replace('.', ',') + ' meses';
    $('#roiMultiple').textContent = roi.toFixed(1).replace('.', ',') + 'x';
    $('#roiArtImage').src = art.img;
    $('#roiArtImage').alt = 'Ilustração da categoria ' + art.title;
    $('#roiArtTitle').textContent = art.title;
    $('#roiArtText').textContent = art.text;
  }

  const roiInputIds = ['meals', 'days', 'costMeal', 'wastePct', 'wasteCategory', 'reductionPct', 'monthlyFee'];
  roiInputIds.forEach(id => {
    const inp = $('#' + id);
    const handler = () => {
      calcROI();
      track('roi_change', { field: id, value: inp.value });
    };
    inp.addEventListener('input', handler);
    inp.addEventListener('change', handler);
  });
  calcROI();

  const demoData = [
    { title: 'Registrar sobra', text: 'Aponte para o recipiente. A Sobrou AI captura a imagem e prepara a sugestão.', cat: 'Arroz branco', weight: '6,8 kg', cost: 'R$ 74,80', trust: '87%' },
    { title: 'IA sugeriu categoria', text: 'A IA sugere o alimento/categoria. O operador só confirma ou corrige em um toque.', cat: 'Guarnição / arroz', weight: '6,8 kg', cost: 'R$ 74,80', trust: '91%' },
    { title: 'Evento salvo', text: 'O evento entra no dashboard com turno, origem, custo e foto para auditoria.', cat: 'Arroz branco confirmado', weight: '6,8 kg', cost: 'R$ 74,80', trust: 'Validado' }
  ];

  function setDemo(i) {
    const d = demoData[i];
    $('#demoTitle').textContent = d.title;
    $('#demoText').textContent = d.text;
    $('#demoCategory').textContent = d.cat;
    $('#demoWeight').textContent = d.weight;
    $('#demoCost').textContent = d.cost;
    $('#demoTrust').textContent = d.trust;
    $$('.demo-step').forEach((btn, idx) => btn.classList.toggle('active', idx === i));
    track('demo_step', { step: i + 1 });
  }

  $$('.demo-step').forEach(btn => btn.addEventListener('click', () => setDemo(+btn.dataset.demo)));

  $$('.faq-item').forEach(item => {
    const answer = $('.faq-a', item);
    if (item.classList.contains('open')) answer.style.maxHeight = answer.scrollHeight + 'px';
    $('.faq-q', item).addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : 0;
      track('faq_toggle', { question: $('.faq-q span', item).textContent, open: isOpen });
    });
  });

  const leadForm = $('#leadForm');
  const validationMessages = {
    valueMissing: 'Campo obrigatório.',
    typeMismatch: 'Digite um e-mail válido.',
    patternMismatch: 'Digite um WhatsApp válido.',
    tooShort: 'Preencha com mais detalhes.',
    rangeUnderflow: 'Valor abaixo do mínimo.'
  };

  function validateField(field) {
    const hint = field.closest('.field').querySelector('.hint');
    field.setCustomValidity('');
    if (!field.validity.valid) {
      const key = Object.keys(validationMessages).find(k => field.validity[k]);
      hint.textContent = validationMessages[key] || 'Revise este campo.';
      hint.classList.add('error');
      field.style.borderColor = 'var(--vermelho)';
      return false;
    }
    hint.textContent = 'Ok';
    hint.classList.remove('error');
    field.style.borderColor = 'rgba(167,227,75,.65)';
    return true;
  }

  $$('input, select, textarea', leadForm).forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => field.closest('.field').querySelector('.hint').textContent = '');
  });

  leadForm.addEventListener('submit', e => {
    e.preventDefault();
    const fields = $$('input, select, textarea', leadForm);
    const valid = fields.every(validateField);
    if (!valid) { track('lead_form_error'); return; }
    const lead = Object.fromEntries(new FormData(leadForm).entries());
    localStorage.setItem('sobrouLeadDemo', JSON.stringify({ ...lead, ts: new Date().toISOString() }));
    $('#formSuccess').style.display = 'block';
    track('lead_form_success', lead);
    leadForm.reset();
  });

  const chatWindow = $('#chatWindow');
  const chatBody = $('#chatBody');
  const chatForm = $('#chatForm');
  const chatInput = $('#chatInput');

  function openChat() {
    chatWindow.classList.add('open');
    chatInput.focus();
    track('chat_open');
  }

  $$('[data-open-chat]').forEach(btn => btn.addEventListener('click', openChat));
  $('.chat-button').addEventListener('click', () => chatWindow.classList.toggle('open'));

  function addMessage(text, who = 'bot') {
    const div = document.createElement('div');
    div.className = 'msg ' + who;
    div.innerHTML = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function botTyping(next) {
    const typingEl = document.createElement('div');
    typingEl.className = 'msg bot';
    typingEl.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    chatBody.appendChild(typingEl);
    chatBody.scrollTop = chatBody.scrollHeight;
    setTimeout(() => { typingEl.remove(); next(); }, 900 + Math.random() * 700);
  }

  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    track('chat_message', { text });
    botTyping(() => addMessage('Um momento, vou conferir com nosso time qual o melhor caminho para sua operação. Enquanto isso: você roda restaurante por kg, hotel ou cozinha industrial?'));
    setTimeout(() => {
      botTyping(() => addMessage('Pelo que você descreveu, faz sentido começar pela calculadora de ROI e depois marcar um piloto de 30 dias. Posso te direcionar para o formulário?'));
    }, 2400);
  });
})();
