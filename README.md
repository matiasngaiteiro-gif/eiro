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
- El logo es "teiro" en trazo uniforme, con la r unida a la o. Está en `assets/logo-teiro.svg` y también dibujado dentro de `index.html`, así toma el color del texto de cada fondo. Es una propuesta hecha en código: conviene que un diseñador de letras la revise antes de registrarla o imprimirla.
- En dominio, mails, usuario de Instagram, direcciones y metadatos va siempre sin acento: teiro. Dominio y usuario de Instagram están pendientes.

## Sistema visual

- **Carbón cálido y blanco.** El carbón (`--char` #2B2927) se usa en la portada, Servicios y Contacto; el resto es blanco.
- **El logo como cartel:** en la portada ocupa todo el ancho, con la barrita de degradado abajo a la izquierda y la frase abajo a la derecha.
- **Tipografía:** Figtree, una sans geométrica, en pesos livianos (300 y 400) y con mucho aire entre palabras en la frase de portada. DM Mono para etiquetas y datos. Clases: `title` y `mono`.
- **Color:** un solo degradado (`--grad`), siempre como barrita chica (clase `chip`). Nunca como fondo.
- **Óvalo a mano:** una palabra puede ir rodeada por un óvalo dibujado (clase `circled`). Se usa en la palabra rotativa de la portada y en "hola" de Contacto.
- **Imágenes** en tarjetas de esquinas muy redondeadas (clase `shot`).

Las fuentes son de uso libre (SIL Open Font License) y están alojadas en `assets/fonts/`, recortadas al alfabeto latino, junto con sus licencias.

Si cambiás `styles.css` o `script.js` y no ves el cambio en la web publicada, subí el número de `?v=` en los enlaces de `index.html` para evitar la caché del navegador.

## Publicar en GitHub Pages

1. En el repositorio, entrá a **Settings > Pages**.
2. En **Source** elegí **Deploy from a branch**.
3. Elegí la rama `main` y la carpeta `/ (root)`. Guardá.
4. En uno o dos minutos la web queda en `https://USUARIO.github.io/REPOSITORIO/`.

Todas las rutas son relativas, así que funciona en un subdirectorio.

## Imágenes y portfolio

Las imágenes de `assets/muestras/` son de muestra: las generé para que la página tenga vida mientras no están las reales, y cada una lleva la etiqueta "Muestra". No son trabajos de clientes.

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
