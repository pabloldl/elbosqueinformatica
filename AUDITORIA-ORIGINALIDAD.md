# Auditoría de originalidad

Fecha: 22 de octubre de 2026.

## Revisión previa de fuentes

Se inspeccionaron los HTML y CSS disponibles en las 13 landings anteriores: estructura de secciones, navegación, familias tipográficas, controles y pies. No se reutilizó código de sus componentes. Se excluyeron perfiles de Chrome y carpetas internas de pruebas de la búsqueda de fuentes.

| Proyecto revisado | Rasgos observados | Decisión para El Bosque Informática |
| --- | --- | --- |
| Realty Canoe | Rail lateral, índice de lectura, portada editorial, Bodoni y Manrope, contraportada | Barra superior de aplicación, módulos simultáneos, tipografía geométrica y ventana de contacto. |
| José Antonio Vázquez Sánchez | Pestañas de capítulos, bandas de texto, Archivo Narrow / Literata / Source Sans / DM Mono, acciones documentales | Sin índice documental, sin bandas ni códigos de acción entre corchetes. |
| Fontanería Londro | Gran titular, navegación horizontal, Arial, fotografía panorámica, naranja | Retícula con tres proporciones, fotografía vertical, azul digital y controles con esquina inferior diferenciada. |
| Club Deportivo S'tilos | Hero fotográfico, Barlow Condensed, bloques deportivos oscuros, acentos rojos | Fondo nube, fotografía contenida en módulo, titulares Chakra y contacto blanco. |
| Café-Pub Andalucía | Hero, sobre nosotros, carta, galería, contacto y menú de cinco enlaces | Presentación simultánea de identidad, teléfono y dirección; sin catálogo ni galería. |
| Restaurante Hotel Puerta del Parque | Hero, introducción, cocina, entorno, secuencia fotográfica y contacto | Dos fotografías técnicas y ficha digital de dirección. |
| La Casa del Muro | Hero, historia, estancias, comodidades, reservas y navegación de secciones | Sin relato turístico, listado de prestaciones ni acciones de reserva. |
| La Casita de El Bosque | Hero dividido, fotografía arqueada, bloques de alojamiento y reserva | Rectángulos modulares con trazos técnicos, sin arcos ni tarjetas turísticas. |
| Miel El Bosque | Composición de producto, variedad, oficio, origen y tipografía editorial | Panel de información sin productos, precios ni variedades. |
| Panadería El Rescoldo | Hero, productos, oficio, galería, ubicación y contacto | Sin rejilla de productos; universo tecnológico abstracto y breve. |
| Peluquería Mari Carmen | Space Grotesk y Plex Sans, manifiesto, servicios, oficio y proceso | Chakra Petch, Geist y Geist Mono; sin manifiesto ni proceso de servicios. |
| Pintor José Luis Gracia Pavón | Newsreader y Manrope, oficio, proceso y espacios | Tipografía geométrica, datos alineados e imágenes de componentes. |
| El Bosque Vending 24h | Hero dividido, tarjetas de productos, pasos, sección de horarios, verde lima | Sin mensajes de disponibilidad, contadores, pasos de compra ni productos. |

## Sistema propio

- Arquitectura: workspace → universo tecnológico → ficha local → ventana de contacto. Los datos de contacto ya están presentes en la primera pantalla.
- Navegación: marca y referencia de sección en barra superior; destinos Ubicación y Contacto. En móvil, tres destinos fijos inferiores, sin hamburguesa.
- Retícula: escritorio con módulo principal ancho, imagen vertical y módulos inferiores de diferentes anchuras; tablet 2 × 2; móvil con título de ancho completo y fotografía que abarca dos filas junto al teléfono y dirección.
- Tipografía: Chakra Petch Bold / Geist / Geist Mono, sin repetir las familias identificadas en las otras webs. Los metadatos emplean mono; el texto corriente, sans de interfaz.
- Controles: borde fino, radio inferior asimétrico, cambio de borde y franja interior al pasar el puntero. Copiar tiene confirmación menta y alternativa manual.
- Iconografía: símbolos SVG lineales dibujados para este proyecto, sin biblioteca de iconos.
- Movimiento: recorte horizontal escalonado solo en los módulos iniciales; cambios de estado inmediatos en navegación y portapapeles. Sin fade-up de secciones.
- Ubicación: ficha de datos blanca, código postal y marcador simbólico; sin mapa ficticio ni coordenadas.
- Contacto: ventana con cabecera, teléfono en una línea, controles y dirección integrada. Sin formulario, WhatsApp ni bloque oscuro.
- Footer: barra compacta de datos, sin columnas ni llamada comercial final.

## Comparación visual y comprobaciones finales

Se generaron y examinaron capturas completas propias en los cuatro tamaños solicitados y una lámina comparativa de las portadas de los cuatro proyectos destacados en el encargo. Evidencias: `.qa/comparison.png`, `.qa/full-*.png` y `.qa/results.json`.

La comparación respalda una identidad y una arquitectura diferenciadas. No constituye una garantía de que ningún recurso elemental —líneas, flechas, rectángulos o enlaces— tenga semejanzas con otras interfaces. La composición y el sistema visual se han creado para este negocio.

Los datos comerciales se limitan a nombre, actividad, dirección y teléfono confirmados. No se han modificado otros proyectos ni añadido configuración de hosting.
