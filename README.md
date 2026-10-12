# Eiro

Web de Eiro, estudio creativo. Sitio estático en HTML, CSS y JavaScript, sin instalación ni compilación.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño. Colores, tipografías, espacios y medidas están como variables al principio del archivo.
- `script.js`: menú móvil, palabra rotativa de la portada, año del pie y canales de contacto.
- `config.js`: datos de contacto editables.
- `assets/`: favicon e imágenes.
- `.nojekyll`: hace que GitHub Pages sirva los archivos tal cual.

## Abrir la web

Abrí `index.html` con doble clic. Las tipografías se cargan desde Google Fonts, así que sin conexión se ven con la tipografía de respaldo.

## Configurar el contacto

Editá `config.js` y completá los canales que tengas:

```js
window.EIRO_CONFIG = {
  email: "",
  instagram: "",
  whatsapp: "",
  whatsappMensaje: "Hola Eiro, quiero contarles sobre mi marca."
};
```

- Los canales que queden vacíos (`""`) no se muestran.
- Si los tres están vacíos, la sección Contacto muestra un aviso de que los canales están en configuración.
- `whatsapp` va con código de país y solo dígitos. `instagram` va sin `@`.
- La web no tiene formulario. Para sumar uno hace falta un servicio real de envío.

## Nombre y logo

- El estudio se llama Eiro. Descriptor: "Eiro, estudio creativo". No hay eslogan.
- El logo es **EIRO** en mayúsculas, en **Vinila Extended Black**. En la web está escrito como texto (clase `logo`), así toma el color de cada fondo, y en la portada un script lo agranda hasta ocupar todo el ancho.
- Vinila es una tipografía comercial, así que no está incluida. Mientras no esté cargada, el logo se ve en **Archivo Expanded Black** (gratis, Google Fonts), que tiene un ancho y un peso parecidos. Para usar Vinila de verdad hay dos caminos:
  1. Si la tenés en Adobe Fonts, agregala a un proyecto web y pegá en el `<head>` el `<link>` que te da Adobe. La variable `--font-logo` de `styles.css` ya busca `vinila-extended`; si Adobe le da otro nombre, cambialo ahí.
  2. O exportá el logo desde Illustrator como SVG (texto convertido a trazado) y reemplazá el texto `EIRO` por ese SVG.
- Dominio y usuario de Instagram están pendientes.

## Sistema visual

- **Fondos blancos o negros.** Van en negro la barra, la portada, Servicios, Contacto y el pie; el resto es blanco. La clase `on-dark` pone cualquier zona en negro e invierte sola botones, líneas y textos.
- **Verde #6CE26F solo como acento:** botones sobre negro, etiquetas sobre las imágenes, la barrita (clase `chip`), el óvalo de la palabra rotativa y el ícono abierto de Servicios. Nunca como fondo de una sección. Sobre blanco los botones van en negro.
- **Tipografía:** Plus Jakarta Sans. Títulos en ExtraBold con poco espacio entre letras (clase `title`); textos en Regular y Medium; etiquetas en SemiBold, mayúscula y espaciadas (clase `mono`).
- **Formas redondeadas:** imágenes en tarjetas de esquinas redondeadas (clase `shot`) y botones y etiquetas en píldora.
- **Óvalo a mano:** una palabra puede ir rodeada por un óvalo verde (clase `circled`). Se usa en la palabra rotativa de la portada y en "hola" de Contacto.
- **Fotografía:** cálida, con color tipo película Kodak y grano; luz dura de sol o flash, destellos en el metal.

Los colores, tipografías y medidas están como variables al principio de `styles.css`.

Si cambiás `styles.css` o `script.js` y no ves el cambio en la web publicada, subí el número de `?v=` en los enlaces de `index.html` para evitar la caché del navegador.

## Publicar en GitHub Pages

1. En el repositorio, entrá a **Settings > Pages**.
2. En **Source** elegí **Deploy from a branch**.
3. Elegí la rama `main` y la carpeta `/ (root)`. Guardá.
4. En uno o dos minutos la web queda en `https://USUARIO.github.io/REPOSITORIO/`.

Todas las rutas son relativas, así que funciona en un subdirectorio.

## Imágenes y portfolio

Las imágenes de `assets/muestras/` son de muestra: fondos cálidos con grano, para que la página tenga el tono de la marca mientras no están las fotos. Cada una lleva la etiqueta "Muestra". No son trabajos de clientes.

Para la portada (`reel.jpg`), los trabajos (`proyecto-01` a `04`), el estudio (`estudio.jpg`, vertical 4:5) y la imagen ancha (`ancho.jpg`) se pueden usar las fotos generadas en Magnific con el estilo de la marca.

Para reemplazar una:

1. Guardá la imagen real en `assets/` (JPG o WebP, hasta unos 1600 px de ancho).
2. En `index.html`, cambiá el `src` del `<img>` y escribí un `alt` que la describa.
3. Borrá el `<span class="tag mono">Muestra</span>` de ese bloque.

La imagen se recorta sola para llenar la tarjeta. Las clases `r-4x3`, `r-4x5` y `r-21x9` definen la proporción; sin clase es 16:9. También podés usar un `<video>` en lugar del `<img>`.

En la sección **Trabajos**, cada `<li class="work">` es un proyecto: cambiá la imagen, "Nombre del cliente", "Año, área" y la línea de resumen. Para sumar o quitar proyectos, copiá o borrá un `<li>`.

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
