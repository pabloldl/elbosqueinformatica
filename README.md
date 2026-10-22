# El Bosque Informática

Web estática independiente en HTML5, CSS3 y JavaScript vanilla. Abrir `index.html` con Live Server de VS Code. No necesita instalación, compilación ni dependencias. Todos los recursos visuales y fuentes se sirven localmente mediante rutas relativas.

## Datos y contenido

- El Bosque Informática. Actividad: informática.
- Plaza La Clavellina, 1, 11670 El Bosque, Cádiz.
- Teléfono: 657 375 902. Enlaces: `tel:+34657375902`.
- Copiar escribe exactamente `657375902`.
- Google Maps abre una búsqueda de la dirección confirmada; no se proporcionan coordenadas ni un mapa simulado.

No se publican servicios específicos, productos, precios, horarios, reseñas, garantías, WhatsApp ni disponibilidad. Las dos fotografías son ilustrativas y están identificadas como tales. No representan el negocio ni productos a la venta.

## Diseño y funcionamiento

Workspace modular con barra superior de aplicación, composición de hardware, ficha local y ventana de contacto. En móvil, los módulos se reorganizan y aparece navegación inferior Inicio / Ubicación / Contacto. La barra tiene espacio reservado y respeta el área segura del dispositivo.

Las entradas de módulos emplean un recorte horizontal escalonado. `prefers-reduced-motion` desactiva animaciones, transiciones y desplazamiento suave. El contenido no depende de animaciones ni de JavaScript para ser visible. Sin JavaScript funcionan los enlaces telefónicos, las anclas y los enlaces de ubicación; se oculta el botón de copiar.

El portapapeles utiliza la API del navegador en contexto seguro (localhost/HTTPS). Si falla, intenta copiar desde un campo seleccionado; si tampoco se permite, mantiene el campo visible para copiar manualmente. Solo confirma el copiado cuando una de las operaciones devuelve éxito.

## Fotografías: fuentes y licencias

Descargadas el 22 de octubre de 2026. Archivos WebP optimizados, alojados en `img/`. No se utilizan servicios de imágenes durante la navegación.

| Archivo | Autor y original | Licencia | Tratamiento |
| --- | --- | --- | --- |
| `img/circuito.webp` | Miguel Á. Padriñán, [Grayscale Photo of Motherboard](https://www.pexels.com/photo/grayscale-photo-of-motherboard-3520694/) | [Licencia Pexels](https://www.pexels.com/license/) | Redimensionado a 1400 px y convertido a WebP; recorte CSS vertical y contraste suave. |
| `img/teclado.webp` | Christian Zimmermann, [Keyboard on White Background](https://www.pexels.com/photo/keyboard-on-white-background-18114576/) | [Licencia Pexels](https://www.pexels.com/license/) | Redimensionado a 1000 px y convertido a WebP; recorte CSS adaptable. |

La licencia permite uso comercial y modificaciones. No se implica que los autores o las marcas fotografiadas estén vinculados al negocio.

## Tipografías y recursos propios

- Chakra Petch Bold: titulares geométricos. [Google Fonts](https://fonts.google.com/specimen/Chakra+Petch).
- Geist Regular y SemiBold: textos de interfaz. [Google Fonts](https://fonts.google.com/specimen/Geist).
- Geist Mono Regular: metadatos breves. [Google Fonts](https://fonts.google.com/specimen/Geist+Mono).

Fuentes locales con `font-display: swap`. Licencias SIL OFL incluidas en `fonts/OFL-*.txt`. `fonts/source.css` registra la correspondencia de los archivos descargados; la web carga únicamente los cuatro pesos utilizados. El símbolo de marca, favicon, iconos SVG y diagrama de conexiones son geometría creada para este proyecto. El diagrama es abstracto, no un mapa ni una representación de infraestructura del negocio.

## SEO

Título, descripción, Open Graph, idioma español, un único H1, HTML semántico y JSON-LD `LocalBusiness` con datos confirmados. No hay dominio confirmado: no se inventan canonical ni `og:url`. La imagen Open Graph usa una ruta relativa; la resolución de esa imagen en plataformas sociales depende de que exista una URL pública absoluta, fuera del alcance local solicitado.

## Verificación

El script `.qa/check.cjs` usa Node.js 24 y Chrome local mediante Chrome DevTools Protocol, sin librerías externas. Ejecución: `node .qa/check.cjs` desde esta carpeta. Arranca un servidor de pruebas temporal, genera capturas y lo cierra al terminar.

Resultados y capturas en `.qa/`:

- `results.json`: tamaños 375, 768, 1440 y 1920, imágenes, fuentes, anclas, desbordamientos, portapapeles, navegación y reducción de movimiento.
- `screen-*.png` y `full-*.png`: capturas de viewport y página completa.
- `comparison.png`: comparación de las portadas de Realty Canoe, abogado, Londro, S'tilos y esta web.

La comprobación valida el destino de los enlaces de teléfono y Maps. No realiza llamadas ni acredita la precisión de la ficha de Google Maps. La prueba de teclado comprueba foco visible; no equivale a una auditoría completa con lectores de pantalla. Las capturas completas pueden situar la navegación fija en la posición del viewport inicial; las capturas `screen-*` representan su posición normal.

Consultar `AUDITORIA-ORIGINALIDAD.md` para la revisión de los proyectos anteriores y las decisiones de diseño. No se han editado sus archivos. No hay configuraciones de Netlify ni se ha realizado ningún despliegue.
