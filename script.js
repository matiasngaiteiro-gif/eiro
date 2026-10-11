(function () {
  "use strict";
  var config = window.ORENSIA_CONFIG || {};
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Año del pie */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Menú móvil */
  var btn = document.getElementById("menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Cerrar" : "Menú";
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      } else if (returnFocus) {
        btn.focus();
      }
    };
    btn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"), false);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false, false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false, true);
    });
  }

  /* Palabra rotativa de la portada. Sin JavaScript o con movimiento reducido queda fija. */
  var rot = document.getElementById("rotator");
  if (rot && !reduceMotion) {
    var words = (rot.getAttribute("data-words") || "").split("|").filter(Boolean);
    var i = 0;
    if (words.length > 1) {
      setInterval(function () {
        if (document.hidden) return;
        i = (i + 1) % words.length;
        rot.classList.add("is-out");
        setTimeout(function () {
          rot.textContent = words[i];
          rot.classList.remove("is-out");
        }, 220);
      }, 2200);
    }
  }

  /* Canales de contacto */
  var items = [];
  if (config.email) {
    items.push({ name: "Correo", text: config.email, href: "mailto:" + config.email });
  }
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
      if (idx === 0) {
        var s = document.createElement("span");
        s.className = "label";
        s.textContent = it.name;
        li.appendChild(s);
      }
      li.appendChild(a);
      target.appendChild(li);
    });
  });
  if (list) list.hidden = false;
  var empty = document.getElementById("channels-empty");
  if (empty) empty.hidden = true;
  var box = document.getElementById("foot-channels-box");
  if (box) box.hidden = false;
})();
