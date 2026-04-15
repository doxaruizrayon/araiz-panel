# Protocolo de inicio de sesión

Sigue estos pasos en orden antes de empezar cualquier tarea:

## 1. Retomar contexto
- Lee `CONTEXTO.md` y resume en 3-5 líneas qué se hizo en la última sesión y cuál es el próximo paso
- Lee `ARQUITECTURA.md` para recordar cómo está organizado el proyecto antes de tocar nada
- Activa el agente adecuado según la tarea del día:
  - Si vamos a decidir qué construir o priorizar → lee `AGENTE_PM.md`
  - Si vamos a construir o modificar código → lee `AGENTE_DEV.md`

## 2. Limpieza de archivos — preguntar siempre antes de borrar
- Busca logs acumulados, archivos temporales o de caché que no sean necesarios
- Busca código muerto (funciones, variables, imports sin usar)
- Busca tareas a medias o archivos incompletos
- Revisa que el .gitignore incluye archivos pesados (JSON grandes, imágenes, carpetas de caché) antes de hacer cualquier git add
- **Para cada cosa que encuentres, pregúntame si quiero eliminarlo o conservarlo**

## 3. Estado de tareas
- Lista las tareas que quedaron abiertas o a medias
- Pregúntame cómo quiero continuar con cada una antes de tocar nada

## 4. Seguimiento de tokens y coste
- Cada 5 mensajes dime:
  - Cuántos tokens llevamos usados en esta sesión
  - Cuánto dinero aproximado es
  - Cómo va la memoria
- Avísame cuando lleguemos a 80k tokens para hacer /compact
- Avísame cuando lleguemos a 130k tokens para hacer commit y /clear

## 5. Reglas durante la sesión
- Usa `/compact` cuando el contexto supere 80k tokens
- Sé específico al leer archivos — solo abre lo que sea necesario para la tarea actual
- Si necesitas explorar el proyecto, pregúntame qué área es relevante antes de leer todo
- Avísame cuando los tokens estén cerca del límite para que pueda guardar progreso

## 6. Cierre de sesión
Antes de terminar, actualiza `CONTEXTO.md` con:
- Qué se hizo en esta sesión
- Qué decisiones importantes se tomaron
- Cuál es el próximo paso exacto
- Qué archivos se modificaron
- Antes de hacer commit, confirma que no hay archivos pesados sin proteger en .gitignore
- Si se añadió algo nuevo o cambió algo estructural, actualiza también `ARQUITECTURA.md`
