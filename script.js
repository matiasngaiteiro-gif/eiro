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
  /* El logo grande ocupa todo el ancho y su tinta queda alineada con el margen (sin el aire propio de la letra) */
  var measureCtx = document.createElement("canvas").getContext("2d");
  function fitLogos() {
    fitTargets.forEach(function (el) {
      var box = el.parentElement;
      var cs = window.getComputedStyle(box);
      var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (!(avail > 0)) return;
      var es = window.getComputedStyle(el);
      var ls = parseFloat(es.letterSpacing) / parseFloat(es.fontSize) || 0;
      measureCtx.font = es.fontWeight + " 100px " + es.fontFamily;
      if ("letterSpacing" in measureCtx) measureCtx.letterSpacing = (ls * 100) + "px";
      var txt = (el.textContent || "Eiro").trim();
      if (es.textTransform === "uppercase") txt = txt.toUpperCase();
      var m = measureCtx.measureText(txt);
      var kern = (parseFloat(el.getAttribute("data-kern")) || 0) + (parseFloat(el.getAttribute("data-dot")) || 0);
      var inkLeft = -m.actualBoundingBoxLeft;              /* aire antes de la E */
      var inkW = m.actualBoundingBoxRight + m.actualBoundingBoxLeft + kern * 100;
      if (!(inkW > 0)) { el.style.fontSize = "21vw"; return; }
      var size = 100 * avail / inkW;
      el.style.fontSize = size + "px";
      el.style.marginLeft = (-inkLeft * size / 100) + "px";
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
        if (idx === 0 && it.name === "WhatsApp") return; /* en Contacto ya está el botón */
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
    if (list) list.hidden = !list.children.length;
    var empty = document.getElementById("channels-empty");
    if (empty) empty.hidden = true;
    var box = document.getElementById("foot-channels-box");
    if (box) box.hidden = false;
  })();

  /* ---------- Bola de boliche: pide un código y abre Gaiteiro (acceso directo a Matías) ---------- */
  (function ball() {
    var inCase = document.body.classList.contains("case-page") || /\/trabajos\//.test(location.pathname);
    var dest = inCase ? "../gaiteiro/" : "gaiteiro/";
    var code = String(config.codigoGaiteiro || "gaiteiro3").toLowerCase().replace(/\s+/g, "");
    var BALL = '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><clipPath id="bb"><circle cx="32" cy="32" r="29"/></clipPath></defs>' +
      '<g clip-path="url(#bb)" fill="currentColor"><rect x="24.6" y="3.0" width="5.6" height="5.6" opacity="0.64"/><rect x="31.8" y="3.0" width="5.6" height="5.6" opacity="0.57"/><rect x="39.0" y="3.0" width="5.6" height="5.6" opacity="0.45"/><rect x="10.2" y="10.2" width="5.6" height="5.6" opacity="0.69"/><rect x="17.4" y="10.2" width="5.6" height="5.6" opacity="0.81"/><rect x="24.6" y="10.2" width="5.6" height="5.6" opacity="0.81"/><rect x="31.8" y="10.2" width="5.6" height="5.6" opacity="0.70"/><rect x="39.0" y="10.2" width="5.6" height="5.6" opacity="0.55"/><rect x="46.2" y="10.2" width="5.6" height="5.6" opacity="0.39"/><rect x="10.2" y="17.4" width="5.6" height="5.6" opacity="0.77"/><rect x="17.4" y="17.4" width="5.6" height="5.6" opacity="0.94"/><rect x="24.6" y="17.4" width="5.6" height="5.6" opacity="0.95"/><rect x="31.8" y="17.4" width="5.6" height="5.6" opacity="0.78"/><rect x="39.0" y="17.4" width="5.6" height="5.6" opacity="0.60"/><rect x="46.2" y="17.4" width="5.6" height="5.6" opacity="0.42"/><rect x="53.4" y="17.4" width="5.6" height="5.6" opacity="0.28"/><rect x="3.0" y="24.6" width="5.6" height="5.6" opacity="0.58"/><rect x="10.2" y="24.6" width="5.6" height="5.6" opacity="0.74"/><rect x="17.4" y="24.6" width="5.6" height="5.6" opacity="0.88"/><rect x="24.6" y="24.6" width="5.6" height="5.6" opacity="0.89"/><rect x="31.8" y="24.6" width="5.6" height="5.6" opacity="0.75"/><rect x="39.0" y="24.6" width="5.6" height="5.6" opacity="0.58"/><rect x="46.2" y="24.6" width="5.6" height="5.6" opacity="0.41"/><rect x="53.4" y="24.6" width="5.6" height="5.6" opacity="0.28"/><rect x="3.0" y="31.8" width="5.6" height="5.6" opacity="0.50"/><rect x="10.2" y="31.8" width="5.6" height="5.6" opacity="0.63"/><rect x="17.4" y="31.8" width="5.6" height="5.6" opacity="0.72"/><rect x="24.6" y="31.8" width="5.6" height="5.6" opacity="0.72"/><rect x="31.8" y="31.8" width="5.6" height="5.6" opacity="0.64"/><rect x="39.0" y="31.8" width="5.6" height="5.6" opacity="0.50"/><rect x="46.2" y="31.8" width="5.6" height="5.6" opacity="0.35"/><rect x="53.4" y="31.8" width="5.6" height="5.6" opacity="0.28"/><rect x="3.0" y="39.0" width="5.6" height="5.6" opacity="0.38"/><rect x="10.2" y="39.0" width="5.6" height="5.6" opacity="0.48"/><rect x="17.4" y="39.0" width="5.6" height="5.6" opacity="0.55"/><rect x="24.6" y="39.0" width="5.6" height="5.6" opacity="0.55"/><rect x="31.8" y="39.0" width="5.6" height="5.6" opacity="0.49"/><rect x="39.0" y="39.0" width="5.6" height="5.6" opacity="0.38"/><rect x="46.2" y="39.0" width="5.6" height="5.6" opacity="0.28"/><rect x="53.4" y="39.0" width="5.6" height="5.6" opacity="0.28"/><rect x="10.2" y="46.2" width="5.6" height="5.6" opacity="0.32"/><rect x="17.4" y="46.2" width="5.6" height="5.6" opacity="0.37"/><rect x="24.6" y="46.2" width="5.6" height="5.6" opacity="0.37"/><rect x="31.8" y="46.2" width="5.6" height="5.6" opacity="0.32"/><rect x="39.0" y="46.2" width="5.6" height="5.6" opacity="0.28"/><rect x="46.2" y="46.2" width="5.6" height="5.6" opacity="0.28"/><rect x="17.4" y="53.4" width="5.6" height="5.6" opacity="0.28"/><rect x="24.6" y="53.4" width="5.6" height="5.6" opacity="0.28"/><rect x="31.8" y="53.4" width="5.6" height="5.6" opacity="0.28"/><rect x="39.0" y="53.4" width="5.6" height="5.6" opacity="0.28"/></g>' +
      '<circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".5"/>' +
      '<rect x="19" y="17" width="6" height="6" fill="currentColor" class="ball-glint" transform="rotate(45 22 20)"/></svg>';
    var b = document.createElement("button");
    b.type = "button"; b.className = "talk ball"; b.setAttribute("aria-label", "Acceso privado"); b.innerHTML = BALL;
    document.body.appendChild(b);

    var m = document.createElement("div");
    m.className = "gate"; m.hidden = true;
    m.innerHTML = '<div class="gate-box" role="dialog" aria-modal="true" aria-labelledby="gate-t">' +
      '<button type="button" class="gate-x" aria-label="Cerrar">×</button>' +
      '<div class="gate-ball">' + BALL + '</div>' +
      '<p class="gate-k">Private access</p><h2 id="gate-t">Ingresá tu código</h2>' +
      '<form class="gate-f"><input type="text" name="c" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Código" aria-label="Código"><button type="submit">Entrar</button></form>' +
      '<p class="gate-msg" aria-live="polite"></p></div>';
    document.body.appendChild(m);
    var input = m.querySelector("input"), msg = m.querySelector(".gate-msg"), box = m.querySelector(".gate-box");
    var open = function () { m.hidden = false; requestAnimationFrame(function () { m.classList.add("on"); input.focus(); }); };
    var close = function () { m.classList.remove("on"); setTimeout(function () { m.hidden = true; input.value = ""; msg.textContent = ""; }, 250); };
    b.addEventListener("click", open);
    m.querySelector(".gate-x").addEventListener("click", close);
    m.addEventListener("click", function (e) { if (e.target === m) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !m.hidden) close(); });
    m.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value.toLowerCase().replace(/\s+/g, "") === code) {
        try { sessionStorage.setItem("gaiteiro", "1"); } catch (err) {}
        msg.textContent = "Adelante.";
        box.classList.add("ok");
        setTimeout(function () { location.href = dest; }, 450);
      } else {
        msg.textContent = "Código incorrecto. El acceso es solo por invitación.";
        box.classList.remove("no"); void box.offsetWidth; box.classList.add("no");
      }
    });

    var shown = false;
    var update = function () {
      var h = window.innerHeight;
      var contact = document.getElementById("contacto");
      var atContact = contact && contact.getBoundingClientRect().top < h * 0.6;
      var show = !atContact && !document.documentElement.classList.contains("intro-on");
      if (show !== shown) { shown = show; b.classList.toggle("is-on", show); }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    var introWatch = setInterval(function () { update(); if (!document.documentElement.classList.contains("intro-on")) clearInterval(introWatch); }, 300);
  })();

  /* ---------- Contacto: botón de WhatsApp y formulario que arma el mensaje ---------- */
  (function contactForm() {
    var number = String(config.whatsapp || "").replace(/\D/g, "");
    var wa = document.getElementById("ct-wa");
    if (wa && number) {
      wa.href = "https://wa.me/" + number + (config.whatsappMensaje ? "?text=" + encodeURIComponent(config.whatsappMensaje) : "");
      wa.target = "_blank"; wa.rel = "noopener";
    }
    var form = document.getElementById("ct-form");
    if (!form) return;
    var msg = document.getElementById("ct-msg");
    /* Ideas listas: un toque las suma al texto, otro toque las saca */
    var area = form.querySelector("textarea[name=detalle]");
    form.querySelectorAll(".ct-ideas button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () {
        var t = btn.textContent.trim();
        var on = btn.getAttribute("aria-pressed") === "true";
        var lines = area.value.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
        if (on) lines = lines.filter(function (l) { return l !== t; }); else lines.push(t);
        area.value = lines.join("\n");
        btn.setAttribute("aria-pressed", String(!on));
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nombre = String(d.get("nombre") || "").trim();
      if (!nombre) { msg.textContent = "Contanos tu nombre para poder responderte."; msg.classList.add("is-error"); form.nombre.focus(); return; }
      msg.classList.remove("is-error");
      var lines = ["Hola Eiro, soy " + nombre + (d.get("marca") ? " de " + d.get("marca") : "") + "."];
      var serv = d.getAll("servicio"); if (serv.length) lines.push("Necesito: " + serv.join(", ") + ".");
      if (d.get("cuando")) lines.push("Quiero arrancar: " + String(d.get("cuando")).toLowerCase() + ".");
      if (String(d.get("detalle") || "").trim()) lines.push(String(d.get("detalle")).trim());
      var text = lines.join("\n");
      if (number) { window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(text), "_blank", "noopener"); msg.textContent = "Listo, se abrió WhatsApp con tu mensaje."; }
      else if (config.email) { window.location.href = "mailto:" + config.email + "?subject=" + encodeURIComponent("Proyecto: " + nombre) + "&body=" + encodeURIComponent(text); msg.textContent = "Listo, se abrió tu correo con el mensaje."; }
      else { msg.textContent = "Muy pronto vas a poder enviarnos tu proyecto desde acá."; }
    });
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
    var dot = el.querySelector(".dot");
    wrap(el, function (t) { return t.split(""); }, "l");
    if (dot) { var o = document.createElement("span"); o.className = "l"; o.appendChild(dot); el.appendChild(o); }
    el.querySelectorAll(".l").forEach(function (l, i) { l.firstChild.style.setProperty("--i", i); });
  });
  fitLogos();

  /* El chat de contacto se "escribe" cuando entra en pantalla */
  (function () {
    var chat = document.querySelector(".chat");
    if (!chat || !("IntersectionObserver" in window)) { if (chat) chat.classList.add("in"); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { chat.classList.add("in"); o.disconnect(); } }); }, { threshold: .35 });
    o.observe(chat);
  })();

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

  /* ---------- Intro: se tipea "gaiteiro", el cursor vuelve 4 lugares y borra "gait" ---------- */
  var intro = document.getElementById("intro");
  var introOn = root.classList.contains("intro-on") && intro;
  if (introOn) {
    observe(document, true);
    var word = intro.querySelector(".intro-word");
    var caret = word.querySelector(".caret");
    var full = word.getAttribute("data-word") || "gaiteiro";
    var cut = parseInt(word.getAttribute("data-cut"), 10) || 4;
    word.innerHTML = "";
    word.appendChild(caret);
    var chars = [];
    var timers = [];
    var later = function (fn, ms) { timers.push(setTimeout(fn, ms)); };
    var hold = function () { caret.classList.add("hold"); clearTimeout(caret._r); caret._r = setTimeout(function () { caret.classList.remove("hold"); }, 520); };
    var t = 600;
    /* Tipeo con ritmo humano: cada tecla tarda un poco distinto */
    var gaps = [0, 120, 95, 140, 105, 90, 125, 100];
    full.split("").forEach(function (ch, i) {
      t += gaps[i % gaps.length] + 20;
      later(function () {
        var s = document.createElement("span");
        s.textContent = ch;
        word.insertBefore(s, caret);
        chars.push(s);
        hold();
      }, t);
    });
    /* Pausa, y el cursor vuelve con la flecha hasta antes de "iro" */
    var keep = parseInt(word.getAttribute("data-keep"), 10) || (full.length - cut);
    var retype = word.getAttribute("data-type") || "";
    t += 650;
    for (var a = 1; a <= keep; a++) {
      (function (n) {
        later(function () { word.insertBefore(caret, chars[full.length - n]); hold(); }, t);
      })(a);
      t += 85;
    }
    /* Borra con la tecla de retroceso, una letra por vez */
    t += 380;
    for (var b = 1; b <= cut; b++) {
      (function (n) {
        later(function () { var el = chars[full.length - keep - n]; if (el && el.parentNode) el.parentNode.removeChild(el); hold(); }, t);
      })(b);
      t += 95;
    }
    /* Escribe la nueva inicial: queda "Eiro" */
    if (retype) {
      t += 260;
      later(function () { var s = document.createElement("span"); s.className = "ek"; s.textContent = retype; word.insertBefore(s, caret); hold(); }, t);
      t += 120;
    }
    /* El cursor salta al final y queda "eiro" */
    t += 420;
    later(function () { word.appendChild(caret); hold(); }, t);
    /* Última tecla: el punto verde */
    var endChar = word.getAttribute("data-end");
    if (endChar) {
      t += 420;
      later(function () { var s = document.createElement("span"); s.className = "dot"; word.insertBefore(s, caret); hold(); }, t);
    }
    t += 300;
    later(function () { intro.classList.add("is-done"); }, t);
    t += 900;
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
  /* Solo en pantallas anchas: en el celular el desplazamiento tapaba el texto de abajo */
  var wide = window.matchMedia("(min-width: 901px)");
  function resetParallax() { para.forEach(function (el) { el.style.translate = ""; }); }
  if (para.length) {
    window.addEventListener("scroll", function () {
      if (!wide.matches) return;
      if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); }
    }, { passive: true });
    if (wide.addEventListener) wide.addEventListener("change", function () { if (wide.matches) updateParallax(); else resetParallax(); });
    if (wide.matches) updateParallax();
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
