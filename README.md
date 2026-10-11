# Teiro

Web de Teiro, estudio creativo. Sitio estático en HTML, CSS y JavaScript, sin instalación ni compilación.

## Archivos

- `index.html`: estructura y textos.
- `styles.css`: diseño. Colores, tipografías, espacios y medidas están como variables al principio del archivo.
- `script.js`: menú móvil, palabra rotativa de la portada, año del pie y canales de contacto.
- `config.js`: datos de contacto editables.
- `assets/`: logo, favicon, fuentes y futuras imágenes.
- `.nojekyll`: hace que GitHub Pages sirva los archivos tal cual.

## Abrir la web

Abrí `index.html` con doble clic. No necesita conexión a internet: las tipografías están incluidas.

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

## Nombre y logo

- El estudio se llama Teiro. Descriptor: "Teiro, estudio creativo"; en inglés, "Teiro Studio". No hay eslogan.
- El logo es el dibujo manuscrito "teiro". Está vectorizado en `assets/logo-teiro.svg` y también incluido dentro de `index.html`, así toma el color del texto de cada fondo.
- En dominio, mails, usuario de Instagram, direcciones y metadatos va siempre sin acento: teiro. Dominio y usuario de Instagram están pendientes.

## Sistema visual

- **Titulares:** Inter Tight en peso extra negrita, mayúsculas, con interlineado y espaciado muy cerrados (clase `heavy`).
- **Todo lo chico:** DM Mono liviana, en mayúsculas y con espaciado abierto (clase `mono`): navegación, etiquetas, tabla de trabajos, botones y datos.
- **Afiches:** la portada y Contacto usan la misma composición: líneas enormes, el logo chico al centro, y otra línea enorme.

Las fuentes son de uso libre (SIL Open Font License) y están alojadas en `assets/fonts/`, recortadas al alfabeto latino, junto con sus licencias. Están definidas en `--font-display` y `--font-mono` dentro de `styles.css`.

Si cambiás `styles.css` o `script.js` y no ves el cambio en la web publicada, subí el número de `?v=` en los enlaces de `index.html` para evitar la caché del navegador.

## Color

Los colores están como variables al principio de `styles.css`: azul noche (`--night` #0D1017), negro, blanco, hielo (`--ice` #ECEEF2), gris frío (`--lilac` #A7A8B4), lima (`--lime` #D9F44C) y cobalto (`--cobalt` #1F3BFF).

Cada sección es un panel y elige su fondo con una clase: `t-night`, `t-black`, `t-white`, `t-ice`, `t-lilac`, `t-lime` o `t-cobalt`. El lima se usa para resaltar (fila de la tabla al pasar, servicio abierto, botón de la barra, placa de Estudio) y el cobalto para Contacto.

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
<div class="ph"><img src="assets/reel.jpg" alt="Descripción de la imagen" loading="lazy"></div>
```

La imagen se recorta sola para llenar el bloque. También podés usar un `<video>` (por ejemplo para el reel). Al poner la imagen, quitá del `div` los atributos `role` y `aria-label`.

En la sección **Trabajos**, cada fila de la tabla (`<tr>`) es un proyecto: cambiá "Nombre del cliente" y "Nombre del proyecto" por los datos reales y ajustá el área. Para sumar o quitar proyectos, copiá o borrá una fila.

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
