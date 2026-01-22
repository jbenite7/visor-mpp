# Roadmap de Desarrollo: Visor MPP

Este documento define la estrategia de desarrollo incremental ("pequeñas victorias") para el proyecto `visor-mpp`.

## 1. Propósito Central

Crear una herramienta web ligera, rápida y "Mobile First" que permita a usuarios visualizar archivos de Microsoft Project (.mpp) sin licencias costosas ni software instalado, desplegable fácilmente en hosting compartido.

## 2. Nivel de Madurez

**Estado Actual**: 🌱 **Inicial** (Scaffolding completado).
El proyecto cuenta con la estructura base, entorno de desarrollo y documentación inicial. No hay lógica de negocio implementada aún.

## 3. Estrategia de Implementación (3 Meses)

### Fase 1: Núcleo y Parsing (Mes 1)

Objetivo: Lograr que el sistema "lea" un archivo y devuelva datos crudos.

- [x] **Victoria 1: Cimientos Sólidos** (Completado)
  - Scaffolding, Docker, Git, CI básico.
- [ ] **Victoria 2: Endpoint de Recepción**
  - Backend PHP que acepta 'POST' de archivos.
  - Validación de extensiones y manejo de errores.
- [ ] **Victoria 3: El Motor de Parsing**
  - Implementación de librería PHP para leer `.mpp`.
  - Extracción de datos clave: Nombre proyecto, Tareas (Lista plana).
  - _Reto_: Si PHP puro falla, implementar fallback a XML o script Python.
- [ ] **Victoria 4: API JSON Estructurada**
  - Estandarizar la salida del backend (JSON predecible para el front).

### Fase 2: Visualización Básica (Mes 1-2)

Objetivo: Mostrar los datos al usuario de forma legible.

- [ ] **Victoria 5: UI de Carga Robusta**
  - Drag & Drop con feedback visual de progreso.
  - Manejo de errores en interfaz (archivo corrupto, formato inválido).
- [ ] **Victoria 6: La Grilla de Datos (DataGrid)**
  - Tabla responsive para listar tareas.
  - Columnas: ID, Nombre, Duración, Inicio, Fin.
  - Adaptación Mobile: Ocultar columnas menos críticas en pantallas pequeñas.

### Fase 3: Gantt y Experiencia (Mes 2-3)

Objetivo: Valor añadido visual y pulido.

- [ ] **Victoria 7: Gantt Chart Básico**
  - Renderizado visual de barras de tareas en el tiempo.
  - Dependencias simples.
- [ ] **Victoria 8: Navegación Temporal (Zoom/Scroll)**
  - Controles para moverse en el tiempo dentro del Gantt.
- [ ] **Victoria 9: Optimización Mobile**
  - Asegurar que el Gantt sea navegable con touch.

### Fase 4: Producción y Mantenimiento (Continuo)

- [ ] **Victoria 10: Preparación para Hosting**
  - Script de limpieza para producción (eliminar archivos dev).
  - Verificación en entorno tipo cPanel.

## 4. Análisis DOFA Técnico (Snapshot Inicial)

- **Fortalezas**: Stack simple (PHP/JS) ideal para el entorno destino.
- **Oportunidades**: Convertirse en una herramienta "go-to" para PMs sin licencia.
- **Debilidades**: El parsing de `.mpp` propietario es complejo y propenso a errores sin librerías oficiales de MS.
- **Amenazas**: Cambios en formato `.mpp` en nuevas versiones de MS Project.

## 5. Próximos Pasos Inmediatos

1. Investigar y seleccionar librería PHP para parsing.
2. Crear endpoint `POST /upload`.
