# Scaffolding & Arquitectura

## Estructura de Directorios

El proyecto sigue una estructura de monorepo simplificada, optimizada para despliegue en hostings compartidos (tipo SiteGround).

```
/
├── backend/            # Lógica de Negocio (PHP)
│   ├── src/            # Clases y controladores
│   └── uploads/        # Directorio temporal de subidas
├── frontend/           # Capa de Presentación (Web Root)
│   ├── public/         # Raíz pública (index.php, css, js) - ESTO VA A public_html
│   └── templates/      # Fragmentos de HTML (Vistas)
├── docs/               # Documentación del proyecto
└── docker/             # Configuración de contenedores
```

## Architectural Decision Records (ADR)

### 1. Stack Minimalista (Vanilla JS/CSS + PHP)

- **Contexto**: El despliegue final es un hosting compartido. Se busca minimizar la complejidad de build/deploy.
- **Decisión**: No usar frameworks de frontend pesados (React/Vue) ni bundlers (Webpack/Vite) a menos que sea estrictamente necesario.
- **Consecuencia**: El código es directo, ligero y fácil de depurar en producción. Se aprovechan las capacidades nativas de los navegadores modernos.

### 2. Procesamiento de Archivos .mpp

- **Contexto**: Los archivos .mpp son binarios complejos. Java (MPXJ) es el estándar, pero no siempre está disponible en hostings compartidos básicos.
- **Decisión**: Se prioriza una implementación en PHP puro o Python (vía shell_exec si está disponible).
- **Plan B**: Si el parsing nativo es insuficiente, se pedirá al usuario convertir a XML (MSPDI), que PHP maneja nativamente.
