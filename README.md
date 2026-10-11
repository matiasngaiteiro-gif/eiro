# ORENSIA — Estudio creativo

Web institucional estática en español, adaptable a móviles y escritorio. Sin dependencias, compilación, servicios externos ni instalación. Abrí `index.html` para verla en tu computadora.

## Archivos

- `index.html`: estructura y textos editables.
- `styles.css`: identidad visual, tamaños y diseño adaptable.
- `script.js`: navegación móvil y preparación de consultas.
- `config.js`: correo de contacto.
- `assets/favicon.svg`: icono del navegador.
- `.nojekyll`: permite servir los archivos estáticos sin procesamiento Jekyll.

## Antes de publicar

1. Agregá el correo real en `config.js`, dentro de las comillas de `email`.
2. Revisá los servicios y confirmá que todos estén disponibles dentro de tu oferta. Los textos son una propuesta comercial, no una acreditación de servicios ya prestados.
3. No se incluyeron clientes, testimonios, resultados, equipo ni proyectos ficticios. Podés incorporar un portfolio cuando tengas los casos y permisos correspondientes.
4. La tipografía es Georgia (con alternativas del sistema), una aproximación editorial. Para usar la fuente exacta de tu logo, exportá el logotipo como SVG y reemplazá las marcas tipográficas. Para una fuente web propia, verificá su licencia.

## Publicar en GitHub Pages

Subí **el contenido de esta carpeta** a la raíz del repositorio (no el ZIP). El archivo `index.html` debe quedar en el nivel principal. En la configuración del repositorio, activá Pages y seleccioná la publicación desde la rama que contenga estos archivos, carpeta raíz. Los nombres de los controles pueden cambiar según la interfaz de GitHub.

Todos los recursos usan rutas relativas, compatibles tanto con sitios de usuario como con repositorios dentro de una subruta. No hace falta ejecutar npm ni configurar un build.

## Contacto: comportamiento real

Con `email` vacío, el formulario valida los campos y descarga `consulta-orensia.txt`. Explica al visitante que la consulta no fue enviada. Con un email válido, abre la aplicación de correo mediante `mailto:` con el texto preparado; el visitante debe enviar el mensaje. No existe un backend, no se guardan datos y no se simula un envío exitoso. Para recepción directa sin cliente de correo hace falta integrar un proveedor de formularios o un backend.

## Identidad

- Bordó frambuesa: #591A35
- Rojo rosáceo: #F53058
- Blanco pétalo: #F7F1F3
- Rosa empolvado: #DDBCC8

El rojo sobre bordó se reserva al logotipo y titulares grandes. Los textos corrientes usan combinaciones de mayor contraste. Incluye navegación por teclado, enlace para saltar al contenido, estados de foco, etiquetas en formularios y respeto por la preferencia de movimiento reducido.
