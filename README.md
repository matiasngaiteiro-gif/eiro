# ORENSIA

Web de ORENSIA, estudio creativo y agencia de comunicación integral. Sitio estático en HTML, CSS y JavaScript, sin instalación ni compilación.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño. Colores, tipografías, espacios y medidas están como variables al principio del archivo.
- `script.js`: menú móvil, palabra rotativa de la portada, año del pie y canales de contacto.
- `config.js`: datos de contacto editables.
- `assets/`: favicon y futuros recursos.
- `.nojekyll`: hace que GitHub Pages sirva los archivos tal cual.

## Abrir la web

Abrí `index.html` con doble clic. Las tipografías se cargan desde Adobe Fonts, así que hace falta conexión a internet.

## Configurar el contacto

Editá `config.js` y completá los canales que tengas:

```js
window.ORENSIA_CONFIG = {
  email: "hola@tudominio.com",
  instagram: "orensia",
  whatsapp: "5491100000000",
  whatsappMensaje: "Hola ORENSIA, quiero contarles sobre mi marca."
};
```

- Los canales que queden vacíos (`""`) no se muestran.
- Si los tres están vacíos, la sección Contacto muestra un aviso de que los canales están en configuración.
- `whatsapp` va con código de país y solo dígitos. `instagram` va sin `@`.
- La web no tiene formulario. Para sumar uno hace falta un servicio real de envío.

## Tipografía

El kit de Adobe Fonts `https://use.typekit.net/lgv5pfx.css` trae dos familias:

- `trust-3a` (pesos 200, 300, 400, 500, 700): títulos y marca.
- `trust-1a` (pesos 400, 500, 700): textos.

Están definidas en `--font-display` y `--font-body` dentro de `styles.css`. Las etiquetas, la numeración y los datos chicos usan Roboto Mono (`--font-mono`), cargada desde Google Fonts.

Si cambiás `styles.css` o `script.js` y no ves el cambio en la web publicada, subí el número de `?v=` en los enlaces de `index.html` para evitar la caché del navegador. Si el kit no carga, se usan Georgia y Helvetica/Arial.

Si en la web publicada ves las tipografías alternativas, revisá en Adobe Fonts que el proyecto web siga activo y que el dominio de la web esté permitido.

## Color

Los colores están como variables al principio de `styles.css`. Negro (`--ink`) y marfil (`--ivory`) son la base; el verde inglés (`--green`) es el color de marca y ocupa secciones enteras (Estudio y Contacto); el latón (`--brass`) se usa solo en detalles. Cada sección elige su fondo con una clase: `tone-dark`, `tone-light` o `tone-brand`.

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

En la sección **Trabajos**, cada `<li class="work">` es un proyecto: cambiá "Nombre del proyecto" y "Categoría" por los datos reales. Para sumar o quitar proyectos, copiá o borrá un `<li>`. Las clases `w-7`, `w-5` y `w-12` definen el ancho (sobre 12 columnas) y `r-4x3`, `r-4x5`, `r-21x9` la proporción.

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
