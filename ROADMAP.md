# Roadmap: Visor MPP Web

## Estado Actual: Preparando Fase 7 (Implementación Vision 2026) 🚀

### ✅ Fase 1: Fundación (Completada)

- Scaffolding completo (Docker, docs, git).
- Backend PHP con parser XML (MSPDI).
- Frontend con upload y tabla de tareas.
- Simplificado a XML-only (sin Java).

### ✅ Fase 2: Visualización Gantt (Completada)

- Integración de Frappe Gantt librerías.
- Estructura basica de visualización.

### ✅ Fase 3: Gestión de Proyectos (Completada)

- Sistema de Archivos: CRUD completo en backend (`ProjectStorage.php`).
- Persistencia: Detección automática de duplicados y manejo de IDs.
- API: Endpoints para renombrar, duplicar y eliminar.

### ✅ Fase 4: Control de Versiones (Completada)

- Agrupación Inteligente: Proyectos se agrupan por `versionGroup`.
- Detección de Similitud: Algoritmo >70% match sugiere versionamiento.
- Flujo de Carga: Opciones para "Nuevo", "Versión" o "Sobreescribir".

### ✅ Fase 5: UI/UX & Mejoras (Completada)

- Interfaz Compacta: Diseño optimizado para evitar scroll excesivo.
- Botones de Acción: Renombrar, Duplicar (Copia/Versión), Eliminar.
- Acciones de Grupo: Duplicar última versión y eliminar grupo completo.
- Internacionalización: Fechas y horas adaptadas a la región del usuario.

### ✅ Fase 6: Visión Futura (Completada)

- Diseño Conceptual UI 2026 "Project Hyper-View".
- Diseño Conceptual UI 2026 "Project Hyper-View".
- Integración de identidad corporativa AIA (Colores y Tipografía) desde `manual-de-marca-aia.json`.

## Próximos Pasos (Fase 7)

1.  **Migración a UI 2026**: Implementar el "Bento Grid" y "Dynamic Island".
2.  **Transiciones**: Integrar animaciones fluidas (Framer Motion / CSS View Transitions).
3.  **Refactor CSS**: Reemplazar estilos actuales con la nueva paleta y glassmorphism.

## ✅ Fase 9: Refinamiento Visual Gantt

- [x] Contraste mejorado en barras estándar (verde claro con borde oscuro).
- [x] Barra de progreso oscura y visible dentro de la tarea.
- [x] Hitos con forma de diamante (Rombo) color ámbar.
- [x] Línea de Fecha de Corte (Dashed Red) con evaluación de progreso teórico.
- [x] Pantalla completa real y altura dinámica.

## ✅ Fase 10: Limpieza y Estandarización

- [x] Organización de directorios (`test_data`, `_experimental`).
- [x] Adopción completa de `manual-de-marca-aia.json` en CSS.
- [x] Corrección de UX en Gantt (Scroll inicial al inicio del proyecto).

## Fase 8: Funcionalidades de Datos (Completada) ✅

1.  **Exportación XLSX**: Descargar tabla con columnas activas (Soporte de tipos: Texto para EDT, Fechas dd/mm/yyyy, Booleanos Sí/No).
2.  **Reordenamiento**: Drag & Drop para ordenar columnas (SortableJS).
