# Teiro

Web de Teiro, estudio creativo. Sitio estático en HTML, CSS y JavaScript, sin instalación ni compilación.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño. Colores, tipografías, espacios y medidas están como variables al principio del archivo.
- `script.js`: menú móvil, palabra rotativa de la portada, año del pie y canales de contacto.
- `config.js`: datos de contacto editables.
- `assets/`: favicon y futuros recursos.
- `.nojekyll`: hace que GitHub Pages sirva los archivos tal cual.

## Abrir la web

Abrí `index.html` con doble clic. En equipos sin Helvética, la tipografía de reemplazo se carga desde Google Fonts y necesita conexión a internet.

## Configurar el contacto

Editá `config.js` y completá los canales que tengas:

```js
window.TEIRO_CONFIG = {
  email: "",
  instagram: "",
  whatsapp: "",
  whatsappMensaje: "Hola Teiro, quiero contarles sobre mi marca."
};
```

- Los canales que queden vacíos (`""`) no se muestran.
- Si los tres están vacíos, la sección Contacto muestra un aviso de que los canales están en configuración.
- `whatsapp` va con código de país y solo dígitos. `instagram` va sin `@`.
- La web no tiene formulario. Para sumar uno hace falta un servicio real de envío.

## Nombre

- El estudio se llama Teiro (se pronuncia "téi-ro"). Descriptor: "Teiro, estudio creativo"; en inglés, "Teiro Studio".
- En el logo y en los títulos se escribe con acento: téiro o TÉIRO. En la web el logo va en minúsculas, con la tilde en cobalto.
- En dominio, mails, usuario de Instagram, direcciones y metadatos va siempre sin acento: teiro.
- Dominio y usuario de Instagram están pendientes. No hay eslogan.

## Tipografía

Toda la web, incluido el logo, usa dos familias: Helvética para logo, títulos, textos, navegación y botones, y Roboto Mono para etiquetas y numeración. En Mac y iPhone la Helvética es la del sistema; en Windows y Android se carga Inter desde Google Fonts como equivalente. Están definidas en `--font-logo`, `--font-display`, `--font-body` y `--font-mono` dentro de `styles.css`.

Si cambiás `styles.css` o `script.js` y no ves el cambio en la web publicada, subí el número de `?v=` en los enlaces de `index.html` para evitar la caché del navegador.

## Color

Los colores están como variables al principio de `styles.css`: negro (`--black` #0B0B0B), grafito (`--graphite` #2A2A28), piedra (`--stone` #8C8A84), hueso (`--bone` #F2EFE8), blanco (`--white`) y cobalto (`--cobalt` #1F3BFF).

- 90% neutros, 10% cobalto como máximo. El cobalto va en la tilde del logo, el botón principal, los subrayados de enlaces y algún dato destacado. Nunca como fondo de una sección.
- Cada sección elige su fondo con una clase: `tone-dark` (negro), `tone-brand` (grafito) o `tone-light` (hueso).
- El cobalto como texto solo se usa sobre hueso; sobre negro o grafito no alcanza el contraste necesario.
- Para que el texto secundario se lea, sobre fondos oscuros se usa una piedra más clara (`--stone-light`) y sobre hueso una más oscura (`--stone-deep`).

## Publicar en GitHub Pages

1. En el repositorio, entrá a **Settings > Pages**.
2. En **Source** elegí **Deploy from a branch**.
3. Elegí la rama `main` y la carpeta `/ (root)`. Guardá.
4. En uno o dos minutos la web queda en `https://USUARIO.github.io/REPOSITORIO/`.

Todas las rutas son relativas, así que funciona en un subdirectorio.

## Imágenes y portfolio

Los bloques grises son espacios reservados para imágenes. Cada uno indica su proporción recomendada.

1. Guardá la imagen en `assets/` (JPG o WebP, hasta unos 2000 px de ancho).
2. En `index.html` buscá el bloque `<div class="ph ...">` y reemplazá el `<span>` de adentro por la imagen:

```html
<div class="ph r-4x3"><img src="assets/proyecto-01.jpg" alt="Descripción de la imagen" loading="lazy"></div>
```

La imagen se recorta sola para llenar el bloque. También podés usar un `<video>` (por ejemplo para el reel). Al poner la imagen, quitá del `div` los atributos `role` y `aria-label`.

En la sección **Trabajos**, cada `<li class="work">` es un proyecto: cambiá "Nombre del cliente", "Año, categoría" y la línea de resumen por los datos reales. Para sumar o quitar proyectos, copiá o borrá un `<li>`. La clase `work-wide` hace que un proyecto ocupe todo el ancho, y `r-4x3`, `r-4x5`, `r-21x9` definen la proporción de la imagen.

## Cuando haya dominio propio

Agregá en el `<head>` de `index.html`, con la URL real:

```html
<link rel="canonical" href="https://tudominio.com/">
<meta property="og:url" content="https://tudominio.com/">
<meta property="og:image" content="https://tudominio.com/assets/og.jpg">
```

La imagen social recomendada es de 1200 × 630 px, guardada en `assets/`. Con la imagen lista, cambiá `twitter:card` a `summary_large_image`.

## Contenido

No hay clientes, testimonios, cifras, equipo ni proyectos inventados. La sección Trabajos tiene espacios reservados sin datos: completala con proyectos reales antes de difundir la web.
