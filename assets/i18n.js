/* Idioma ES / EN para Eiro y Gaiteiro.
   El castellano vive en el HTML; el inglés, en assets/i18n-eiro.js y assets/i18n-gaiteiro.js.
   - data-i18n="clave"               cambia el contenido del elemento
   - data-i18n-attr="placeholder:clave, aria-label:clave"   cambia atributos
   - window.t("clave", "texto en castellano")   para los textos que arma el JavaScript
   El botón ES / EN guarda la elección y recarga en el mismo lugar de la página. */
(function () {
  var root = document.documentElement;
  var D = (window.I18N_DICT && window.I18N_DICT.en) || {};
  var lang = "es";
  try { if (localStorage.getItem("eiro-lang") === "en") lang = "en"; } catch (e) {}
  window.EIRO_LANG = lang;
  window.t = function (k, es) { return lang === "en" && D[k] != null ? D[k] : es; };

  function apply(scope) {
    var els = scope.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) { var v = D[els[i].getAttribute("data-i18n")]; if (v != null) els[i].innerHTML = v; }
    var at = scope.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < at.length; j++) {
      at[j].getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var p = pair.split(":"), v2 = D[(p[1] || "").trim()];
        if (v2 != null) at[j].setAttribute(p[0].trim(), v2);
      });
    }
  }
  if (lang === "en") {
    root.lang = "en";
    apply(document);
    var tpl = document.querySelectorAll("template");
    for (var k = 0; k < tpl.length; k++) apply(tpl[k].content);
    var tk = root.getAttribute("data-title-key") || "title";
    if (D[tk]) document.title = D[tk];
    var md = document.querySelector('meta[name="description"]');
    if (md && D.description) md.setAttribute("content", D.description);
  }
  root.setAttribute("data-lang", lang);
  root.classList.remove("i18n-wait");

  /* botones ES / EN */
  var btns = document.querySelectorAll("[data-lang-btn]");
  for (var b = 0; b < btns.length; b++) {
    var on = btns[b].getAttribute("data-lang-btn") === lang;
    btns[b].setAttribute("aria-pressed", String(on));
    btns[b].addEventListener("click", function () {
      var want = this.getAttribute("data-lang-btn");
      if (want === lang) return;
      try { localStorage.setItem("eiro-lang", want); sessionStorage.setItem("eiro-scroll", String(window.scrollY)); sessionStorage.setItem("eiro-intro", "1"); } catch (e) {}
      location.reload();
    });
  }
  /* volver al mismo lugar después de cambiar de idioma */
  try {
    var y = sessionStorage.getItem("eiro-scroll");
    if (y !== null) { sessionStorage.removeItem("eiro-scroll"); window.addEventListener("load", function () { window.scrollTo(0, parseInt(y, 10) || 0); }); }
  } catch (e) {}
})();
