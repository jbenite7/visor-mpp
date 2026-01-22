# GEMINI.md - AI Constitution

Este archivo define las reglas y filosofías que la IA debe seguir al trabajar en este proyecto.

## Filosofía de Código

1.  **Mobile First**: Todo el CSS debe escribirse pensando primero en pantallas pequeñas y escalar con `@media (min-width: ...`.
2.  **Simplicidad**: Evitar sobreingeniería. Para este proyecto, una función limpia es mejor que una clase abstracta compleja.
3.  **Modernidad**: Usar características modernas de PHP (8.2+) y JS (ES6+, async/await, fetch) pero manteniendo compatibilidad.
4.  **Robustez**: Validar siempre la existencia de archivos y manejar errores de parsing con gracia.

## Reglas de Arquitectura

- **Separación de Responsabilidades**: El frontend solo renderiza datos JSON. No debe contener lógica de negocio compleja. El backend solo procesa y devuelve JSON, no HTML.
- **PHP**: Usar `strict_types=1` en archivos de clase.

## Flujo de Trabajo

- Actualizar `CHANGELOG.md` al finalizar funcionalidades grandes.
- Mantener `README.md` actualizado con instrucciones de despliegue.
