/* Bugsy: bichón frisé que responde preguntas sobre cada ejercicio */
(function () {
    var P = window.__PF; if (!P) return;
    var tx = P.tx, esc = P.esc;
    function LNG() { return P.lang(); }
    var BSVG = '<svg viewBox="0 0 100 100"><g class="bgy-ears"><circle cx="19" cy="54" r="11" fill="#F3EADF" stroke="#2B1B1E" stroke-width="2.2"/><circle cx="16" cy="64" r="8" fill="#F3EADF" stroke="#2B1B1E" stroke-width="2.2"/><circle cx="81" cy="54" r="11" fill="#F3EADF" stroke="#2B1B1E" stroke-width="2.2"/><circle cx="84" cy="64" r="8" fill="#F3EADF" stroke="#2B1B1E" stroke-width="2.2"/><circle cx="19" cy="54" r="10" fill="#F3EADF"/><circle cx="16" cy="64" r="7" fill="#F3EADF"/><circle cx="81" cy="54" r="10" fill="#F3EADF"/><circle cx="84" cy="64" r="7" fill="#F3EADF"/></g><g stroke="#2B1B1E" stroke-width="2.4" fill="#FFFDF8"><circle cx="50" cy="48" r="26"/><circle cx="31" cy="34" r="12"/><circle cx="42" cy="24" r="12"/><circle cx="58" cy="24" r="12"/><circle cx="69" cy="34" r="12"/><circle cx="27" cy="50" r="11"/><circle cx="73" cy="50" r="11"/><circle cx="34" cy="65" r="12"/><circle cx="50" cy="69" r="13"/><circle cx="66" cy="65" r="12"/></g><g fill="#FFFDF8"><circle cx="50" cy="48" r="26"/><circle cx="31" cy="34" r="11"/><circle cx="42" cy="24" r="11"/><circle cx="58" cy="24" r="11"/><circle cx="69" cy="34" r="11"/><circle cx="27" cy="50" r="10"/><circle cx="73" cy="50" r="10"/><circle cx="34" cy="65" r="11"/><circle cx="50" cy="69" r="12"/><circle cx="66" cy="65" r="11"/></g><path d="M36 30q4-3 8 0M56 30q4-3 8 0M30 44q3-2 6 0M64 44q3-2 6 0" stroke="#D9CFC2" stroke-width="1.4" fill="none" stroke-linecap="round"/><g class="bgy-eyes"><ellipse cx="40.5" cy="49" rx="4.4" ry="4.8" fill="#1E1A1C"/><ellipse cx="59.5" cy="49" rx="4.4" ry="4.8" fill="#1E1A1C"/><circle cx="42.2" cy="47.2" r="1.6" fill="#fff"/><circle cx="61.2" cy="47.2" r="1.6" fill="#fff"/></g><ellipse cx="33" cy="57.5" rx="4" ry="2.4" fill="#F4A9B4" opacity=".8"/><ellipse cx="67" cy="57.5" rx="4" ry="2.4" fill="#F4A9B4" opacity=".8"/><ellipse cx="50" cy="57.6" rx="4.2" ry="3.2" fill="#1E1A1C"/><circle cx="48.8" cy="56.6" r="1" fill="#fff" opacity=".7"/><path class="bgy-tongue" d="M47.6 63.4q2.4 6 4.8 0z" fill="#F28FA0" stroke="#2B1B1E" stroke-width="1.2" stroke-linejoin="round"/><path d="M50 60.8v2.4M44.6 62q2.7 3 5.4 1.2 2.7 1.8 5.4-1.2" stroke="#2B1B1E" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g class="bgy-mo"><path d="M44.4 61.6q5.6 1.6 11.2 0-.4 6.4-5.6 6.6-5.2-.2-5.6-6.6z" fill="#7A1A2A" stroke="#2B1B1E" stroke-width="1.4" stroke-linejoin="round"/><path d="M46.8 66.2q3.2-2.2 6.4 0-1.4 1.8-3.2 1.9-1.8-.1-3.2-1.9z" fill="#F28FA0"/></g><g transform="rotate(-18 34 17)"><g class="bgy-bow"><path d="M34 17l-10-6v12zM34 17l10-6v12z" fill="#8A1C2C" stroke="#2B1B1E" stroke-width="1.6" stroke-linejoin="round"/><circle cx="34" cy="17" r="3" fill="#6E1426" stroke="#2B1B1E" stroke-width="1.4"/></g></g><g class="bgy-paws" stroke="#2B1B1E" stroke-width="2.2" fill="#FFFDF8"><ellipse cx="33" cy="82" rx="9" ry="6.5"/><ellipse cx="54" cy="83" rx="9" ry="6.5"/><path d="M30 80v4M34 80v4M51 81v4M55 81v4" stroke-width="1.3" fill="none"/></g></svg>';
    function L(es, en) { return LNG() === 'es' ? es : en; }
    function strip(s) { return String(s || '').replace(/<h4>.*?<\/h4>/, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
    function cut(s, n) { return s.length > n ? s.slice(0, n - 4).replace(/\s\S*$/, '') + '…' : s; }
    function two(n) { return (n < 10 ? '0' : '') + n; }
    function cleanLab(sl) { return strip(tx(sl, 'label')).replace(/^\s*(\d+(\.\d+)*[).]?|\d+-\d+\.)\s+/, ''); }
    function slideText(sl) {
      var b = strip(tx(sl, 'html'));
      var extra = [];
      (sl.cards || []).forEach(function (c) { extra.push(strip(tx(c, 'title')) + (tx(c, 'text') ? ': ' + strip(tx(c, 'text')) : '')); });
      (sl.steps || []).forEach(function (c) { extra.push(strip(tx(c, 'title')) + (tx(c, 'text') ? ': ' + strip(tx(c, 'text')) : '')); });
      var tb = (LNG() !== 'es' && sl.en && sl.en.table) || sl.table;
      if (tb && tb.rows) tb.rows.slice(0, 5).forEach(function (r) { extra.push(r.map(strip).filter(Boolean).join(' — ')); });
      if (sl.persona) extra.push(strip(tx(sl.persona, 'tag')));
      if (b.length < 60 && extra.length) b = (b ? b + ' ' : '') + extra.join(' · ');
      return b;
    }
    var TOOLS = ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Perplexity', 'Midjourney', 'DALL·E', 'Relume', 'Figma', 'Canva', 'Notion', 'Excel', 'Google Sheets', 'Google Ads', 'Google Analytics', 'Google Trends', 'Meta Ads', 'Meta Business Suite', 'Mailchimp', 'HubSpot', 'Semrush', 'WordPress', 'Shopify', 'Wix', 'Framer', 'CapCut', 'Higgsfield', 'Runway', 'ElevenLabs'];
    var DATA = null, WORKS = null;
    function data() {
      if (DATA) return DATA;
      try { DATA = JSON.parse(document.getElementById('portfolio-data').textContent); } catch (e) { DATA = {}; }
      return DATA;
    }
    function works() {
      if (WORKS) return WORKS;
      WORKS = []; var seen = {};
      (function walk(o, depth) {
        if (!o || typeof o !== 'object' || depth > 6) return;
        if (Array.isArray(o)) { o.forEach(function (x) { walk(x, depth + 1); }); return; }
        if (Array.isArray(o.works)) {
          o.works.forEach(function (w) {
            if (!w || !w.id || seen[w.id] || !Array.isArray(w.slides) || !w.slides.length) return;
            seen[w.id] = 1; WORKS.push({ w: w, sec: o });
          });
          return;
        }
        Object.keys(o).forEach(function (k) { if (k !== 'images') walk(o[k], depth + 1); });
      })(data(), 0);
      return WORKS;
    }
    function secLabel(sec) {
      if (sec.num) return L('Sesión ', 'Session ') + sec.num;
      return strip(tx(sec, 'title') || tx(sec, 'name') || '');
    }
    function questions(w) {
      var Q = [], title = strip(tx(w, 'title')), n = w.slides.length, labs = w.slides.map(cleanLab);
      var lead = strip(tx(w, 'lead')) || cut(slideText(w.slides[0]), 320);
      Q.push({ q: L('¿De qué va este ejercicio?', 'What is this exercise about?'), a: L('¡Guau! Te lo resumo: ', 'Woof! Here it is in short: ') + lead });
      var lst = labs.map(function (l, i) { return two(i + 1) + ' ' + l; });
      Q.push({ q: L('¿Cómo está organizado?', 'How is it organised?'), a: L('Son ' + n + ' capítulos: ', 'It has ' + n + ' chapters: ') + lst.join(' · ') + '.' });
      if (w.kpis && w.kpis.length) {
        var k = w.kpis.map(function (kp) { return (kp.pre || '') + kp.n + (kp.suf || '') + ' ' + strip(tx(kp, 'l')); });
        Q.push({ q: L('¿Qué resultados sacó?', 'What results did she get?'), a: L('Los números que más me gustan: ', 'My favourite numbers: ') + k.join(' · ') + '.' });
      }
      var blob = JSON.stringify(w.slides) + ' ' + title + ' ' + lead, tl = TOOLS.filter(function (x) { return new RegExp('\\b' + x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s/g, '\\s*'), 'i').test(blob); });
      if (tl.length) Q.push({ q: L('¿Qué herramientas usó?', 'Which tools did she use?'), a: L('Aquí Elena tiró de ', 'Here Elena used ') + (tl.length > 1 ? tl.slice(0, -1).join(', ') + L(' y ', ' and ') + tl[tl.length - 1] : tl[0]) + L('. Yo solo uso el olfato.', '. I just use my nose.') });
      var concl = -1;
      w.slides.forEach(function (sl, i) { if (concl < 0 && /conclus|aprend|reflex|lecci|learn|takeaway|valoraci/i.test(labs[i] + ' ' + strip(tx(sl, 'html')).slice(0, 80))) concl = i; });
      if (concl >= 0) Q.push({ q: L('¿Qué aprendió con esto?', 'What did she learn?'), a: cut(slideText(w.slides[concl]), 360), li: concl });
      var cand = w.slides.map(function (sl, i) { return { i: i, len: slideText(sl).length }; }).filter(function (c) { return c.i !== 0 && c.i !== concl && c.len > 40; }).sort(function (a, b) { return b.len - a.len; }).slice(0, 3).sort(function (a, b) { return a.i - b.i; });
      cand.forEach(function (c) { Q.push({ q: L('Cuéntame lo de «', 'Tell me about “') + cut(labs[c.i], 48) + L('»', '”'), a: cut(slideText(w.slides[c.i]), 360), li: c.i }); });
      Q.push({ q: L('¿Puedo hablar con Elena?', 'Can I talk to Elena?'), a: L('¡Claro! Tienes su contacto al final de la página. Te llevo yo, que sé el camino.', 'Of course! Her contact is at the bottom of the page. I know the way, follow me.'), go: 'end' });
      return Q;
    }
    // interfaz
    var peek = document.createElement('button'); peek.type = 'button'; peek.className = 'bgy-peek';
    peek.setAttribute('aria-label', L('Pregúntale a Bugsy sobre los ejercicios', 'Ask Bugsy about the exercises'));
    peek.innerHTML = '<span class="bgy-bub">' + L('¿Alguna pregunta?', 'Any questions?') + '</span><span class="bgy-dog">' + BSVG + '</span>';
    var pan = document.createElement('aside'); pan.className = 'bgy-panel'; pan.hidden = true;
    pan.setAttribute('role', 'dialog'); pan.setAttribute('aria-label', L('Preguntas para Bugsy', 'Questions for Bugsy'));
    pan.innerHTML = '<header class="bgy-head"><span class="bgy-av">' + BSVG + '</span><div><b>Bugsy</b><small>' + L('bichón frisé · guía del portafolio', 'bichon frisé · portfolio guide') + '</small></div><button type="button" class="bgy-x" aria-label="' + L('Cerrar', 'Close') + '">×</button></header>' +
      '<label class="bgy-pick"><small>' + L('Ejercicio', 'Exercise') + '</small><select></select></label>' +
      '<div class="bgy-chat" aria-live="polite"></div>' +
      '<div class="bgy-qs"><small>' + L('Elige una pregunta', 'Pick a question') + '</small><div class="bgy-ql"></div></div>';
    document.body.appendChild(peek); document.body.appendChild(pan);
    var lastLang = null;
    function applyLang() {
      peek.setAttribute('aria-label', L('Pregúntale a Bugsy sobre los ejercicios', 'Ask Bugsy about the exercises'));
      peek.querySelector('.bgy-bub').textContent = L('¿Alguna pregunta?', 'Any questions?');
      pan.setAttribute('aria-label', L('Preguntas para Bugsy', 'Questions for Bugsy'));
      pan.querySelector('.bgy-head small').textContent = L('bichón frisé · guía del portafolio', 'bichon frisé · portfolio guide');
      pan.querySelector('.bgy-x').setAttribute('aria-label', L('Cerrar', 'Close'));
      pan.querySelector('.bgy-pick small').textContent = L('Ejercicio', 'Exercise');
      pan.querySelector('.bgy-qs small').textContent = L('Elige una pregunta', 'Pick a question');
    }
    var sel = pan.querySelector('select'), chat = pan.querySelector('.bgy-chat'), ql = pan.querySelector('.bgy-ql'), curW = null, busy = false;
    function curDeckWork() { var d = document.getElementById('deck'); return d && d.getAttribute('data-work'); }
    function fill() {
      var ws = works(), now = curDeckWork(), h = '', last = '';
      ws.forEach(function (o) {
        var g = secLabel(o.sec);
        if (g !== last) { if (last) h += '</optgroup>'; h += '<optgroup label="' + esc(g) + '">'; last = g; }
        h += '<option value="' + esc(o.w.id) + '"' + (o.w.id === now ? ' selected' : '') + '>' + esc(cut(strip(tx(o.w, 'title')), 70)) + '</option>';
      });
      if (last) h += '</optgroup>';
      sel.innerHTML = h;
      if (!now && ws.length && curW) sel.value = curW.id;
    }
    function bubble(who, html) {
      var b = document.createElement('div'); b.className = 'bgy-m ' + who; b.innerHTML = html; chat.appendChild(b);
      chat.scrollTop = chat.scrollHeight; return b;
    }
    function load(id) {
      var o = works().filter(function (x) { return x.w.id === id; })[0]; if (!o) return;
      curW = o.w; chat.innerHTML = ''; ql.innerHTML = '';
      var hi = bubble('dog', ''); typeOut(hi, L('¡Hola! Soy Bugsy y me sé este portafolio de memoria. Pregúntame lo que quieras sobre «', 'Hi! I’m Bugsy and I know this portfolio by heart. Ask me anything about “') + strip(tx(o.w, 'title')) + L('».', '”.'), function () {});
      questions(o.w).forEach(function (q, i) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'bgy-q'; b.textContent = q.q;
        b.onclick = function () { ask(q, b); }; ql.appendChild(b);
      });
    }
    var RED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches, skip = null;
    function typeOut(el, text, done) {
      if (RED) { el.textContent = text; done(); return; }
      var i = 0, step = Math.max(1, Math.ceil(text.length / 170)), cur = document.createElement('span'), caret = document.createElement('i');
      cur.className = 'bgy-tx'; caret.className = 'bgy-caret'; el.appendChild(cur); el.appendChild(caret);
      pan.classList.add('talk');
      function finish() { clearInterval(tm); skip = null; cur.textContent = text; caret.remove(); pan.classList.remove('talk'); done(); }
      var tm = setInterval(function () {
        i = Math.min(text.length, i + step); cur.textContent = text.slice(0, i);
        chat.scrollTop = chat.scrollHeight;
        if (i >= text.length) finish();
      }, 22);
      skip = finish;
    }
    function ask(q, btn) {
      if (busy) return; busy = true; btn.classList.add('used');
      bubble('me', esc(q.q));
      var dots = bubble('dog typing', '<i></i><i></i><i></i>');
      setTimeout(function () {
        dots.remove();
        var extra = '';
        if (q.li != null && curW && curDeckWork() === curW.id) extra = '<button type="button" class="bgy-go" data-li="' + q.li + '">' + L('Abrir este capítulo', 'Open this chapter') + ' →</button>';
        if (q.go === 'end') extra = '<button type="button" class="bgy-go" data-end="1">' + L('Llévame', 'Take me there') + ' ↓</button>';
        var b = bubble('dog', '');
        typeOut(b, q.a, function () { if (extra) b.insertAdjacentHTML('beforeend', extra); chat.scrollTop = chat.scrollHeight; busy = false; });
      }, 550);
    }
    chat.addEventListener('click', function (e) {
      if (skip && e.target.closest('.bgy-m.dog')) { skip(); return; }
      var g = e.target.closest('.bgy-go'); if (!g) return;
      if (g.dataset.end) { close(); var f = document.querySelector('footer') || document.body.lastElementChild; f.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      var opens = [].slice.call(document.querySelectorAll('#deck [data-open]'));
      var base = Math.min.apply(null, opens.map(function (x) { return +x.getAttribute('data-open'); }).filter(function (n) { return !isNaN(n); }));
      var el = document.querySelector('#deck [data-open="' + (base + (+g.dataset.li)) + '"]');
      close(); if (el) el.click();
    });
    function open() {
      applyLang(); if (lastLang !== LNG()) { lastLang = LNG(); curW = null; }
      fill(); var id = curDeckWork() || (curW && curW.id) || (works()[0] && works()[0].w.id);
      if (id) { sel.value = id; if (!curW || curW.id !== id) load(id); }
      pan.hidden = false; requestAnimationFrame(function () { pan.classList.add('on'); }); peek.classList.add('hide');
      var f = pan.querySelector('.bgy-q:not(.used)') || pan.querySelector('select'); if (f) f.focus({ preventScroll: true });
    }
    function close() { pan.classList.remove('on'); peek.classList.remove('hide'); setTimeout(function () { if (!pan.classList.contains('on')) pan.hidden = true; }, 380); }

    // ladrido cuqui generado en el navegador (sin archivo de audio)
    var actx = null, lastBark = 0;
    function bark() {
      var now = Date.now(); if (now - lastBark < 450) return; lastBark = now;
      try {
        var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        actx = actx || new AC(); if (actx.state === 'suspended') actx.resume();
        var out = actx.createGain(); out.gain.value = 0.42; out.connect(actx.destination);
        function yip(t0, p) {
          var bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 0.9;
          var g = actx.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.9, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
          bp.connect(g); g.connect(out);
          [['sawtooth', 1, 1], ['triangle', 2, 0.5]].forEach(function (o) {
            var osc = actx.createOscillator(), og = actx.createGain(); osc.type = o[0]; og.gain.value = o[2];
            osc.frequency.setValueAtTime(p * 1.3 * o[1], t0); osc.frequency.exponentialRampToValueAtTime(p * 1.65 * o[1], t0 + 0.03); osc.frequency.exponentialRampToValueAtTime(p * 0.7 * o[1], t0 + 0.18);
            osc.connect(og); og.connect(bp); osc.start(t0); osc.stop(t0 + 0.2);
          });
          var len = Math.floor(actx.sampleRate * 0.07), buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
          for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
          var ns = actx.createBufferSource(), hp = actx.createBiquadFilter(), ng = actx.createGain();
          ns.buffer = buf; hp.type = 'highpass'; hp.frequency.value = 1400; ng.gain.value = 0.1;
          ns.connect(hp); hp.connect(ng); ng.connect(out); ns.start(t0);
        }
        var t = actx.currentTime + 0.01; yip(t, 330); yip(t + 0.21, 370);
      } catch (e) {}
    }
    // la pegatina de Bugsy del Conóceme (esquina de la ficha de idiomas)
    function onSticker(e) {
      var c = e.target.closest && e.target.closest('.ab-card.c4'); if (!c) return false;
      var r = c.getBoundingClientRect(); return e.clientX > r.right - 125 && e.clientY > r.bottom - 150;
    }
    document.addEventListener('click', function (e) { if (onSticker(e) || (e.target.closest && e.target.closest('.ab3-bugsy'))) bark(); });
    document.addEventListener('mousemove', function (e) { var c = e.target.closest && e.target.closest('.ab-card.c4'); if (c) c.style.cursor = onSticker(e) ? 'pointer' : ''; }, { passive: true });

    // timbre del teléfono de la portada: suena cada vez que empieza a agitarse
    var unlocked = false;
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
      document.addEventListener(ev, function () {
        unlocked = true;
        try { var AC = window.AudioContext || window.webkitAudioContext; if (AC) { actx = actx || new AC(); if (actx.state === 'suspended') actx.resume(); } } catch (e) {}
      }, { passive: true });
    });
    function ring() {
      try {
        var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        actx = actx || new AC(); if (actx.state === 'suspended') actx.resume();
        var t = actx.currentTime + 0.01, dur = 0.8;
        var out = actx.createGain(); out.gain.setValueAtTime(0.0001, t); out.gain.exponentialRampToValueAtTime(0.14, t + 0.02); out.gain.setValueAtTime(0.14, t + dur - 0.1); out.gain.exponentialRampToValueAtTime(0.0001, t + dur); out.connect(actx.destination);
        var trem = actx.createGain(); trem.gain.value = 0.5; trem.connect(out);
        var lfo = actx.createOscillator(), lg = actx.createGain(); lfo.type = 'square'; lfo.frequency.value = 22; lg.gain.value = 0.5; lfo.connect(lg); lg.connect(trem.gain); lfo.start(t); lfo.stop(t + dur);
        [1180, 1480].forEach(function (f) { var o = actx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(trem); o.start(t); o.stop(t + dur); });
      } catch (e) {}
    }
    function rotOf(el) {
      var cs = getComputedStyle(el), r = 0, m = cs.transform;
      if (m && m !== 'none') { var v = m.match(/matrix\(([^)]+)\)/); if (v) { var p = v[1].split(',').map(parseFloat); r += Math.atan2(p[1], p[0]) * 180 / Math.PI; } }
      if (cs.rotate && cs.rotate !== 'none') r += parseFloat(cs.rotate) || 0;
      return r;
    }
    var prevR = null, still = 99, shaking = false, lastRing = 0;
    function tickRing() {
      var sec = document.querySelector('.call');
      if (sec) {
        var rc = sec.getBoundingClientRect();
        if (rc.bottom > 0 && rc.top < innerHeight) {
          var els = sec.querySelectorAll('.phone-link, .phone, .phone img, .handset, .ph-down, .ph-up'), r = 0;
          for (var i = 0; i < els.length; i++) r += rotOf(els[i]);
          var mv = prevR !== null && Math.abs(r - prevR) > 0.25; prevR = r;
          if (mv) {
            if (!shaking && still > 10 && unlocked && Date.now() - lastRing > 700) { ring(); lastRing = Date.now(); }
            shaking = true; still = 0;
          } else if (++still > 6) shaking = false;
        } else { prevR = null; still = 99; shaking = false; }
      }
      // timbre desactivado
    }
    requestAnimationFrame(tickRing);

    // los ojos del chibi del Conóceme siguen al cursor
    var chibiTxt = null, eyeRaf = 0, mx = -1, my = -1;
    function inlineChibi() {
      var im = document.querySelector('.ab3-peek img'); if (!im) return;
      var box = im.parentNode;
      function put(t) { if (!box.isConnected || !box.querySelector('img')) return; box.innerHTML = t.replace(/<\?xml[^>]*>/, ''); var sv = box.querySelector('svg'); if (sv) { sv.style.display = 'block'; sv.style.width = '100%'; sv.style.height = 'auto'; sv.setAttribute('aria-hidden', 'true'); } }
      if (chibiTxt) put(chibiTxt); else fetch(im.currentSrc || im.src).then(function (r) { return r.text(); }).then(function (t) { chibiTxt = t; put(t); }).catch(function () {});
    }
    function lookAt() {
      eyeRaf = 0;
      var sv = document.querySelector('.ab3-peek svg'), gs = sv ? sv.querySelectorAll('.pupil') : []; if (!gs.length) return;
      var r = sv.getBoundingClientRect(), vb = sv.viewBox.baseVal, sx = r.width / vb.width, sy = r.height / vb.height;
      var ex = r.left + (21.1 - vb.x) * sx, ey = r.top + (19.4 - vb.y) * sy, dx = mx - ex, dy = my - ey, d = Math.sqrt(dx * dx + dy * dy) || 1, k = Math.min(1, d / 220);
      var tr = 'translate(' + (dx / d * 1.0 * k).toFixed(2) + ' ' + (dy / d * 0.7 * k).toFixed(2) + ')'; for (var i = 0; i < gs.length; i++) gs[i].setAttribute('transform', tr);
    }
    document.addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; if (!eyeRaf) eyeRaf = requestAnimationFrame(lookAt); }, { passive: true });
    new MutationObserver(function () { if (document.querySelector('.ab3-peek img')) inlineChibi(); }).observe(document.body, { childList: true, subtree: true });
    inlineChibi();
    peek.onclick = function () { bark(); open(); };
    pan.querySelector('.bgy-av').addEventListener('click', bark);
    peek.addEventListener('pointerenter', applyLang); peek.addEventListener('focus', applyLang);
    pan.querySelector('.bgy-x').onclick = close;
    sel.onchange = function () { load(sel.value); };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pan.hidden) close(); });
    setTimeout(function () { applyLang(); peek.classList.add('hint'); setTimeout(function () { peek.classList.remove('hint'); }, 3200); }, 5000);
  })();
