# Siguiente sesión

## Dónde lo dejamos

**Base de conocimiento COMPLETA — 296 cuadros — todas las familias del catálogo escritas**
**Catálogo completo conectado al panel local — 354.931 artículos buscables en http://localhost:5192**

Familias completadas:
- Electricidad: 252 cuadros ✓
- Iluminación: 20 cuadros ✓
- Comunicaciones: 5 cuadros ✓
- Climatización: 3 cuadros ✓
- Neumática: 2 cuadros ✓
- Renovables: 1 cuadro ✓
- Herramientas: 2 cuadros ✓
- Ferretería: 1 cuadro ✓
- Seguridad: 2 cuadros ✓

---

## TAREA PENDIENTE: Llevar el catálogo completo a la URL pública de Vercel

**El problema:**
El catálogo completo (354.931 artículos, 86 MB) no se puede servir como archivo estático en Vercel
porque el navegador tendría que descargar 86 MB antes de poder buscar — unos 30-60 segundos.
Inusable. En local funciona porque el servidor carga el archivo en memoria al arrancar.

**Por qué Vercel Pro solo no basta:**
Vercel Pro añade funciones serverless (mini-servidores en la nube). Podrías tener
un `/api/catalogo?q=...` igual al que tienes en local, PERO las funciones serverless
son efímeras — no pueden cargar 86 MB en memoria entre peticiones. Necesitas una
base de datos donde vivan los artículos.

**Las 3 opciones para resolverlo, de más fácil a más cara:**

### Opción 1 — Elastic Search que ya tienes (LA MÁS RÁPIDA) ⭐ RECOMENDADA
El ninja usó una API de Elastic Search para extraer el catálogo. Si esa instancia
sigue activa, podrías conectar el panel de Vercel directamente a ella.
- API: `my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com`
- Token: `search-r7e1j8xyqi5nhnr44tgiqqhf`
- Coste adicional: probablemente ninguno (ya está pagada o es gratuita)
- Complejidad: baja — solo cambiar el panel para que llame a Elastic en vez de a la API local
- Pasos: verificar que la instancia sigue activa → añadir función serverless en Vercel
  que haga de proxy entre el navegador y Elastic → listo

### Opción 2 — Vercel Pro + Vercel Postgres (~20€/mes)
- Importar los 354k artículos a una base de datos Postgres en Vercel
- Crear una función serverless `/api/catalogo?q=...` que haga la búsqueda en Postgres
- Coste: ~20€/mes (plan Pro de Vercel incluye Postgres)
- Complejidad: media — hay que importar los datos una vez y escribir la función

### Opción 3 — Vercel Pro + Vercel KV (clave-valor, más barato)
- Similar a Postgres pero usando almacenamiento clave-valor (Redis)
- Algo más barato pero menos flexible para búsquedas complejas

**Lo que hay que hacer cuando se retome esta tarea:**
1. Comprobar si la instancia Elastic Search sigue activa:
   `curl -s -H "Authorization: Bearer search-r7e1j8xyqi5nhnr44tgiqqhf" https://my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com`
2. Si responde → conectar el panel de Vercel a Elastic directamente (Opción 1)
3. Si no responde → decidir entre Opción 2 o 3 según presupuesto

---

## Los 3 próximos pasos al arrancar

1. **Retomar la tarea pendiente del catálogo público** (ver arriba) — verificar si Elastic sigue activa

2. **Plan de estudio Fase 1** — Pendiente de empezar:
   Cables y conductores, protecciones (magnetotérmicos, diferenciales), cajas y cuadros, mecanismos.
   Son los grupos más importantes para hacer presupuestos del día a día.

3. **Usar el panel en el trabajo real** — Con 296 cuadros y 354k artículos buscables ya hay
   suficiente base. Probar en situación real y ajustar lo que falte.

---

## Estado del servidor

- Panel conocimiento: `node servidor_conocimiento.js` → localhost:5192
- 296 cuadros + 354.931 artículos del catálogo completo
- Vercel: https://araiz-panel.vercel.app (296 cuadros + 2.747 artículos estáticos)
