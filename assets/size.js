/* Efectos estilo "Studio Size", compartidos por Eiro (blanco) y Gaiteiro (negro).
   - Menú a pantalla completa: se arma solo con los links de la barra (#nav) o de [data-sz-menu].
   - data-sz="lines"   títulos que suben línea por línea al entrar en pantalla (cada <br> es una línea)
   - data-sz="split"   igual, pero lo dispara otra clase (.on), para las escenas de Gaiteiro
   - data-sz="hl"      lista grande en gris: se enciende el renglón que pasa por el centro
   - data-sz="fill"    frase que se llena de color palabra por palabra al bajar
   - data-sz="bubbles" clientes en círculos que caen y se acomodan (se empujan con el dedo o el mouse)
   - data-sz="drift"   fila de proyectos que se corre hacia la derecha mientras bajás
*/
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("sz");
  if (!reduce) root.classList.add("sz-motion");

  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';

  /* La intro de Eiro tapa la portada: lo que está arriba espera a que termine */
  function whenReady(fn) {
    if (!root.classList.contains("intro-on")) return fn();
    var t = setInterval(function () { if (!root.classList.contains("intro-on")) { clearInterval(t); setTimeout(fn, 150); } }, 120);
  }

  /* ---------- Menú a pantalla completa ---------- */
  function buildMenu() {
    var src = document.querySelectorAll("[data-sz-menu] a, #nav a");
    var bar = document.querySelector("[data-sz-bar]") || document.querySelector(".header .wrap");
    if (!src.length || !bar) return;
    var links = [], seen = {};
    [].forEach.call(src, function (a) {
      var label = (a.getAttribute("data-label") || (a.childNodes[0] && a.childNodes[0].textContent) || a.textContent).trim();
      if (!label || seen[label]) return; seen[label] = 1;
      links.push({ href: a.getAttribute("href"), label: label, ext: a.target === "_blank" });
    });
    var extra = document.querySelector("[data-sz-extra]");

    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "sz-burger";
    btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "sz-menu"); btn.setAttribute("aria-label", "Abrir menú");
    btn.innerHTML = "<i></i><i></i>";
    bar.appendChild(btn);

    var menu = document.createElement("div");
    menu.className = "sz-menu"; menu.id = "sz-menu"; menu.hidden = true;
    menu.setAttribute("role", "dialog"); menu.setAttribute("aria-modal", "true"); menu.setAttribute("aria-label", "Menú");
    var html = '<nav class="sz-items">';
    links.forEach(function (l, i) {
      html += '<a href="' + l.href + '" style="--i:' + i + '"' + (l.ext ? ' target="_blank" rel="noopener"' : "") + ">" + l.label + (l.ext ? ' <span class="sz-ext" aria-hidden="true">↗</span>' : "") + "</a>";
    });
    html += "</nav>";
    if (extra) html += '<div class="sz-meta" style="--i:' + links.length + '">' + (extra.innerHTML || "") + "</div>";
    menu.innerHTML = html;
    document.body.appendChild(menu);

    var open = false, closeT;
    function set(o, focusBack) {
      open = o; clearTimeout(closeT);
      btn.setAttribute("aria-expanded", String(o));
      btn.setAttribute("aria-label", o ? "Cerrar menú" : "Abrir menú");
      root.classList.toggle("sz-menu-open", o);
      if (o) {
        menu.hidden = false;
        requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add("on"); }); });
        var first = menu.querySelector("a"); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
      } else {
        menu.classList.remove("on");
        closeT = setTimeout(function () { menu.hidden = true; }, 420);
        if (focusBack) btn.focus();
      }
    }
    btn.addEventListener("click", function () { set(!open, false); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false, false); });
    document.addEventListener("keydown", function (e) {
      if (!open) return;
      if (e.key === "Escape") set(false, true);
      if (e.key === "Tab") { /* el foco no se escapa del menú */
        var f = [btn].concat([].slice.call(menu.querySelectorAll("a")));
        var i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---------- Títulos línea por línea ---------- */
  function split(el) {
    if (el.dataset.szDone) return; el.dataset.szDone = "1";
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (p, i) { return '<span class="sz-l"><span style="--i:' + i + '">' + p.trim() + "</span></span>"; }).join("");
  }

  /* ---------- Frase que se llena de color ---------- */
  function words(el) {
    var w = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = w.map(function (x) { return '<span class="sz-w" aria-hidden="true">' + x + "</span>"; }).join(" ");
    return [].slice.call(el.querySelectorAll(".sz-w"));
  }

  /* ---------- Burbujas de clientes ---------- */
  function bubbles(box) {
    var items = [].slice.call(box.children);
    if (!items.length) return;
    box.classList.add("sz-bub-on");
    var W = 0, H = 0, bs = [], running = false, started = false, px = -999, py = -999, last = 0;
    function measure() { W = box.clientWidth; H = box.clientHeight; }
    function seed() {
      measure();
      var n = items.length;
      var base = Math.sqrt((W * H * 0.5) / (n * Math.PI)); /* que ocupen la mitad de la caja */
      base = Math.max(34, Math.min(base, 96));
      bs = items.map(function (li, i) {
        var r = base * (0.72 + ((i * 7) % 5) * 0.12);
        li.style.width = li.style.height = (2 * r) + "px";
        li.style.fontSize = Math.max(11, r * 0.3) + "px";
        li.classList.toggle("sz-b-alt", i % 3 === 1);
        return { el: li, r: r, x: r + ((i * 97) % 100) / 100 * (W - 2 * r), y: -r - i * r * 0.9, vx: 0, vy: 0 };
      });
    }
    function step() {
      var g = 0.55, damp = 0.985;
      bs.forEach(function (b) {
        b.vy += g; b.vx *= damp; b.vy *= damp;
        /* el puntero empuja */
        var dx = b.x - px, dy = b.y - py, d = Math.sqrt(dx * dx + dy * dy), R = b.r + 40;
        if (d < R && d > 0.1) { var f = (R - d) / R * 2.2; b.vx += dx / d * f; b.vy += dy / d * f; }
        b.x += b.vx; b.y += b.vy;
        if (b.x < b.r) { b.x = b.r; b.vx *= -0.5; }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx *= -0.5; }
        if (b.y > H - b.r) { b.y = H - b.r; b.vy *= -0.35; b.vx *= 0.92; }
      });
      for (var k = 0; k < 3; k++) {
        for (var i = 0; i < bs.length; i++) for (var j = i + 1; j < bs.length; j++) {
          var a = bs[i], c = bs[j], ex = c.x - a.x, ey = c.y - a.y, dist = Math.sqrt(ex * ex + ey * ey) || 0.01, min = a.r + c.r + 2;
          if (dist < min) {
            var o = (min - dist) / 2, nx = ex / dist, ny = ey / dist;
            a.x -= nx * o; a.y -= ny * o; c.x += nx * o; c.y += ny * o;
            var rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
            if (rv < 0) { var imp = rv * 0.6; a.vx += nx * imp; a.vy += ny * imp; c.vx -= nx * imp; c.vy -= ny * imp; }
          }
        }
        /* que nunca queden cortadas contra los bordes */
        bs.forEach(function (b) { b.x = Math.min(W - b.r, Math.max(b.r, b.x)); if (b.y > H - b.r) b.y = H - b.r; });
      }
    }
    function draw() { bs.forEach(function (b) { b.el.style.transform = "translate3d(" + (b.x - b.r).toFixed(1) + "px," + (b.y - b.r).toFixed(1) + "px,0)"; }); }
    function loop(t) {
      if (!running) return;
      step(); draw();
      requestAnimationFrame(loop);
    }
    seed();
    if (reduce) { for (var s = 0; s < 900; s++) step(); draw(); return; }
    draw();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; started = true; requestAnimationFrame(loop); }
        else if (!e.isIntersecting && running) running = false;
      });
    }, { threshold: 0.25 });
    io.observe(box);
    function point(e) { var r = box.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; }
    box.addEventListener("pointermove", point, { passive: true });
    box.addEventListener("pointerdown", point, { passive: true });
    box.addEventListener("pointerleave", function () { px = py = -999; });
    window.addEventListener("resize", function () {
      var w0 = W; measure();
      if (Math.abs(W - w0) > 40) { seed(); if (!started) draw(); }
    });
  }

  function init() {
    buildMenu();

    /* flechas en los botones circulares */
    [].forEach.call(document.querySelectorAll(".sz-c:empty"), function (c) { c.innerHTML = ARROW; });

    [].forEach.call(document.querySelectorAll('[data-sz="lines"], [data-sz="split"]'), split);
    var lineEls = [].slice.call(document.querySelectorAll('[data-sz="lines"]'));
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          var el = e.target;
          whenReady(function () { el.classList.add("sz-in"); });
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
      lineEls.forEach(function (el) { io.observe(el); });
    } else lineEls.forEach(function (el) { el.classList.add("sz-in"); });

    [].forEach.call(document.querySelectorAll('[data-sz="bubbles"]'), bubbles);

    /* logos que pasan: se duplica la fila para que el loop no tenga corte */
    [].forEach.call(document.querySelectorAll(".logo-track"), function (tr) {
      [].slice.call(tr.children).forEach(function (li) { var c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); tr.appendChild(c); });
    });

    var lists = [].slice.call(document.querySelectorAll('[data-sz="hl"]'));
    var fills = [].slice.call(document.querySelectorAll('[data-sz="fill"]')).map(function (el) { return { el: el, words: words(el) }; });
    if (reduce) { fills.forEach(function (f) { f.words.forEach(function (w) { w.classList.add("on"); }); }); fills = []; }
    /* filas que se corren hacia la derecha mientras bajás (data-sz="drift") */
    var drifts = reduce ? [] : [].slice.call(document.querySelectorAll('[data-sz="drift"]'));
    if (!lists.length && !fills.length && !drifts.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var h = window.innerHeight, mid = h * 0.5;
      lists.forEach(function (ul) {
        var best = null, bd = 1e9;
        [].forEach.call(ul.children, function (li) { var r = li.getBoundingClientRect(); var d = Math.abs(r.top + r.height / 2 - mid); if (d < bd) { bd = d; best = li; } });
        if (bd > h * 0.5) best = null;
        [].forEach.call(ul.children, function (li) { li.classList.toggle("on", li === best); });
      });
      fills.forEach(function (f) {
        var r = f.el.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (h * 0.82 - r.top) / (r.height + h * 0.3)));
        var n = Math.round(p * f.words.length);
        f.words.forEach(function (w, i) { w.classList.toggle("on", i < n); });
      });
      drifts.forEach(function (el) {
        var box = el.parentElement, cs = getComputedStyle(box);
        var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        var over = Math.max(0, el.scrollWidth - avail);
        var range = Math.max(over, window.innerWidth * 0.16);
        var r = el.getBoundingClientRect();
        /* si la fila no entra entera (celular), recorre todo mientras está a la vista: primero se ve NERO y termina en CER */
        var p = over > 0 ? (h * 0.92 - r.bottom) / Math.max(1, h * 0.84 - r.height) : (h - r.top) / (h + r.height);
        p = Math.min(1, Math.max(0, p));
        el.style.transform = "translate3d(" + (-over + p * range).toFixed(1) + "px,0,0)";
      });
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
