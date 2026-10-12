(function () {
  "use strict";
  var root = document.documentElement;
  var config = window.EIRO_CONFIG || window.TEIRO_CONFIG || {};
  var motion = root.classList.contains("motion");

  /* Año del pie */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Logos que ocupan todo el ancho (portada y pie) ---------- */
  var fitTargets = [document.getElementById("logo-board"), document.getElementById("logo-foot")].filter(Boolean);
  function fitLogos() {
    fitTargets.forEach(function (el) {
      var box = el.parentElement;
      var cs = window.getComputedStyle(box);
      var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = "100px";
      var w = el.getBoundingClientRect().width;
      if (w > 0 && avail > 0) el.style.fontSize = (100 * avail / w * 0.995) + "px";
    });
  }
  fitLogos();
  window.addEventListener("resize", fitLogos);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLogos);

  /* ---------- Menú móvil ---------- */
  var btn = document.getElementById("menu-btn");
  var nav = document.getElementById("nav");
  var header = document.querySelector(".header");
  if (btn && nav) {
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle("is-open", open);
      if (header) header.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Cerrar" : "Menú";
      if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
      else if (returnFocus) btn.focus();
    };
    btn.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open"), false); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false, false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false, true);
    });
  }

  /* ---------- Barra: se esconde al bajar y vuelve al subir ---------- */
  if (header) {
    var lastY = window.scrollY;
    header.classList.toggle("is-stuck", lastY > 24);
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      header.classList.toggle("is-stuck", y > 24);
      var open = nav && nav.classList.contains("is-open");
      if (!open && y > 240 && y > lastY + 4) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y <= 240) header.classList.remove("is-hidden");
      lastY = y;
    }, { passive: true });
  }

  /* ---------- Canales de contacto ---------- */
  (function channels() {
    var items = [];
    if (config.email) items.push({ name: "Correo", text: config.email, href: "mailto:" + config.email, copy: config.email });
    if (config.instagram) {
      var user = String(config.instagram).replace(/^@/, "");
      items.push({ name: "Instagram", text: "@" + user, href: "https://www.instagram.com/" + encodeURIComponent(user) + "/", external: true });
    }
    if (config.whatsapp) {
      var number = String(config.whatsapp).replace(/\D/g, "");
      var msg = config.whatsappMensaje ? "?text=" + encodeURIComponent(config.whatsappMensaje) : "";
      items.push({ name: "WhatsApp", text: "+" + number, href: "https://wa.me/" + number + msg, external: true });
    }
    if (!items.length) return;
    var list = document.getElementById("channels");
    var foot = document.getElementById("foot-channels");
    items.forEach(function (it) {
      [list, foot].forEach(function (target, idx) {
        if (!target) return;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = it.href;
        a.textContent = idx === 0 ? it.text : it.name;
        if (it.external) { a.target = "_blank"; a.rel = "noopener"; }
        if (idx === 0) { var s = document.createElement("span"); s.className = "mono"; s.textContent = it.name; li.appendChild(s); }
        li.appendChild(a);
        if (idx === 0 && it.copy) {
          var b = document.createElement("button");
          b.type = "button"; b.className = "copy-btn mono"; b.textContent = "Copiar";
          b.addEventListener("click", function () {
            var done = function () { b.textContent = "Copiado"; setTimeout(function () { b.textContent = "Copiar"; }, 2000); };
            var selectText = function () { var r = document.createRange(); r.selectNodeContents(a); var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); };
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(it.copy).then(done, selectText);
            else selectText();
          });
          li.appendChild(b);
        }
        target.appendChild(li);
      });
    });
    if (list) list.hidden = false;
    var empty = document.getElementById("channels-empty");
    if (empty) empty.hidden = true;
    var box = document.getElementById("foot-channels-box");
    if (box) box.hidden = false;
  })();

  /* ---------- Palabra rotativa en la píldora verde ---------- */
  var rot = document.getElementById("rotator");
  var pill = document.getElementById("word-pill");
  if (rot && pill && motion) {
    var words = (rot.getAttribute("data-words") || "").split("|").filter(Boolean);
    var wi = 0;
    var measure = function (word) {
      var probe = rot.cloneNode(false);
      probe.textContent = word;
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;transition:none";
      pill.appendChild(probe);
      var w = probe.getBoundingClientRect().width;
      pill.removeChild(probe);
      var cs = window.getComputedStyle(pill);
      return w + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    };
    var setWidth = function () { pill.style.width = measure(rot.textContent) + "px"; };
    setWidth();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setWidth);
    window.addEventListener("resize", setWidth);
    if (words.length > 1) {
      setInterval(function () {
        if (document.hidden) return;
        wi = (wi + 1) % words.length;
        rot.classList.add("is-out");
        setTimeout(function () {
          rot.textContent = words[wi];
          pill.style.width = measure(words[wi]) + "px";
          rot.classList.remove("is-out");
          rot.classList.add("is-in");
          void rot.offsetWidth;
          rot.classList.remove("is-in");
        }, 380);
      }, 2400);
    }
  }

  if (!motion) return;

  /* ---------- Preparar textos para animar ---------- */
  function wrap(el, splitter, cls) {
    var parts = splitter(el.textContent);
    el.textContent = "";
    parts.forEach(function (p, i) {
      if (p === " ") { el.appendChild(document.createTextNode(" ")); return; }
      var outer = document.createElement("span");
      outer.className = cls;
      var inner = document.createElement("span");
      inner.textContent = p;
      outer.style.setProperty("--i", i);
      outer.appendChild(inner);
      el.appendChild(outer);
    });
  }
  document.querySelectorAll('[data-anim="words"]').forEach(function (el) {
    wrap(el, function (t) { return t.trim().split(/(\s+)/).map(function (x) { return /^\s+$/.test(x) ? " " : x; }); }, "w");
    el.querySelectorAll(".w").forEach(function (w, i) { w.firstChild.style.setProperty("--i", i); });
  });
  document.querySelectorAll('[data-anim="letters"]').forEach(function (el) {
    wrap(el, function (t) { return t.split(""); }, "l");
    el.querySelectorAll(".l").forEach(function (l, i) { l.firstChild.style.setProperty("--i", i); });
  });
  fitLogos();

  /* ---------- Aparición al hacer scroll ---------- */
  var heroBox = document.getElementById("inicio");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  function observe(scope, skipHero) {
    scope.querySelectorAll("[data-anim]").forEach(function (el) {
      if (skipHero && heroBox && heroBox.contains(el)) return;
      io.observe(el);
    });
  }

  /* ---------- Intro: se escribe GAITEIRO, se borra GAIT y queda EIRO ---------- */
  var intro = document.getElementById("intro");
  var introOn = root.classList.contains("intro-on") && intro;
  if (introOn) {
    observe(document, true);
    var letters = intro.querySelectorAll(".intro-word span span");
    var gait = intro.querySelector(".gait");
    var gaitLetters = gait ? gait.querySelectorAll("span") : [];
    var timers = [];
    var later = function (fn, ms) { timers.push(setTimeout(fn, ms)); };
    var t = 350;
    letters.forEach(function (l) { later(function () { l.classList.add("on"); }, t); t += 105; });
    t += 500;
    later(function () { if (gait) gait.classList.add("selected"); }, t);
    t += 520;
    for (var k = gaitLetters.length - 1; k >= 0; k--) {
      (function (el) { later(function () { el.classList.add("gone"); }, t); })(gaitLetters[k]);
      t += 110;
    }
    t += 380;
    later(function () { intro.classList.add("is-done"); }, t);
    t += 750;
    var finish = function () {
      timers.forEach(clearTimeout);
      intro.classList.add("is-leaving");
      try { sessionStorage.setItem("eiro-intro", "1"); } catch (e) {}
      setTimeout(function () {
        root.classList.remove("intro-on");
        intro.remove();
        fitLogos();
        observe(heroBox, false);
      }, 650);
    };
    later(finish, t);
    intro.addEventListener("click", finish, { once: true });
    window.addEventListener("keydown", function skip(e) { window.removeEventListener("keydown", skip); finish(); }, { once: true });
  } else {
    observe(document, false);
  }

  /* ---------- Parallax suave en algunas fotos ---------- */
  var para = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;
  function updateParallax() {
    ticking = false;
    var vh = window.innerHeight;
    para.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var f = parseFloat(el.getAttribute("data-parallax")) || 0;
      var off = (r.top + r.height / 2 - vh / 2) * f;
      el.style.translate = "0 " + off.toFixed(1) + "px";
    });
  }
  if (para.length) {
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); } }, { passive: true });
    updateParallax();
  }

  /* ---------- Cursor "Ver" sobre los trabajos ---------- */
  var cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var cx = -200, cy = -200, tx = -200, ty = -200, running = false;
    var loop = function () {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) requestAnimationFrame(loop); else running = false;
    };
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.querySelectorAll(".work .shot").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-on"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-on"); });
    });
  }
})();
