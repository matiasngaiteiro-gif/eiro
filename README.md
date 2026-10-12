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
- El logo es **EIRO** en **Vinila Extended Black**, cargada desde Adobe Fonts (`https://use.typekit.net/wlo1uwr.css`, familia `vinila-extended`). Está escrito como texto (clase `logo`), así toma el color de cada fondo. En la portada y en el pie un script lo agranda hasta ocupar todo el ancho.
- Si Adobe Fonts no carga (por ejemplo, abriendo el archivo sin conexión o desde un dominio que no esté en el proyecto web), el logo se ve en Archivo Expanded Black. **En Adobe Fonts, agregá el dominio de la web al proyecto** (`matiasngaiteiro-gif.github.io` y, cuando lo tengas, el dominio propio).
- Dominio y usuario de Instagram están pendientes.

## Sistema visual (el mismo de las piezas de Illustrator)

- **Fondos blancos o negros.** Van en negro la barra, la portada, la cinta, Servicios, Contacto y el pie.
- **Verde #6CE26F solo como acento:** la píldora de la palabra rotativa, botones sobre negro, etiquetas sobre las fotos, la cinta, el cursor "Ver" y detalles. Sobre blanco los botones van en negro.
- **Tipografía:** títulos en Plus Jakarta Sans ExtraBold, apretados (clase `title`); textos en Regular y Medium; etiquetas en mayúscula (clase `mono`).
- **Fotos** cálidas con grano, en tarjetas redondeadas (clase `shot`) con etiqueta verde en píldora (clase `tag`).
- **Frase resaltada:** renglones con recuadro negro detrás, sobre una grilla, como en los flyers (sección después de Trabajos).

## Animaciones

- **Intro:** al entrar se escribe GAITEIRO, se selecciona y se borra GAIT y queda EIRO; después la pantalla negra sube. Se muestra una vez por visita (se puede saltear con un clic o una tecla).
- Los títulos suben palabra por palabra; el logo, letra por letra; las fotos se abren con un recorte y un zoom suave; los recuadros de la frase se pintan de izquierda a derecha.
- Palabra rotativa en la píldora verde, cinta de servicios en movimiento, parallax suave en algunas fotos, botones con el texto que sube y un círculo verde "Ver" que sigue al mouse sobre los trabajos.
- Todo se apaga si el sistema tiene activado "reducir movimiento", y sin JavaScript la página se ve completa y quieta.
- Atributos: `data-anim="words"`, `"letters"`, `"fade"`, `"shot"`, `"mark"`, y `data-parallax="0.05"` (intensidad).

Si cambiás `styles.css` o `script.js` y no ves el cambio en la web publicada, subí el número de `?v=` en los enlaces de `index.html` para evitar la caché del navegador.

## Publicar en GitHub Pages

1. En el repositorio, entrá a **Settings > Pages**.
2. En **Source** elegí **Deploy from a branch**.
3. Elegí la rama `main` y la carpeta `/ (root)`. Guardá.
4. En uno o dos minutos la web queda en `https://USUARIO.github.io/REPOSITORIO/`.

Todas las rutas son relativas, así que funciona en un subdirectorio.

## Imágenes y portfolio

Las fotos de `assets/fotos/` son de muestra, generadas con el estilo de la marca (la de Matías es un retrato de él). En los trabajos llevan la etiqueta "Muestra". No son trabajos de clientes.

- Portada: `fiesta.jpg` y `pasto.jpg`.
- Trabajos: `dj.jpg`, `perfume.jpg`, `cadenas.jpg`, `paletas.jpg`.
- Estudio: `matias.jpg`. Método: `amigas.jpg` (con el titular encima).

Para reemplazar una: guardá la imagen en `assets/fotos/` (JPG o WebP, vertical 4:5, hasta unos 1600 px de ancho), cambiá el `src` y el `alt` en `index.html` y, en los trabajos reales, cambiá el texto de la etiqueta (`<figcaption class="tag">`) por el nombre del cliente.

En la sección **Trabajos**, cada `<li class="work">` es un proyecto: cambiá la imagen, "Nombre del cliente", "Año, área" y la línea de resumen.

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
