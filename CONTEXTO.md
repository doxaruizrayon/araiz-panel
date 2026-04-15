# CONTEXTO — Estado del proyecto Araiz
Actualizado: 2026-04-14

## QUÉ ESTAMOS HACIENDO

Construyendo una Base de Conocimiento sobre el catálogo Araiz Suministros Eléctricos.
Cada "cuadro resumen" es un archivo .txt en `BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ/`
que explica qué es un producto, para qué sirve, qué marcas hay en Araiz,
qué preguntar al cliente y consejos prácticos. Aurora no es electricista — los
cuadros deben ser comprensibles para alguien con perfil comercial/admin.

Los cuadros se leen desde el panel local en **http://localhost:5192**
(arrancar con: `node servidor_conocimiento.js` desde C:\PROYECTOS IA\ARAIZ\)

## DÓNDE ESTAMOS AHORA

**Total cuadros escritos: 280**

### Familia Electricidad — COMPLETADA AL 100%

| Subfamilia | Cuadros | Grupos |
|---|---|---|
| Aparellaje eléctrico | 172 | 26 |
| Material de conexión eléctrica | 13 | 11 |
| Automáticos y diferenciales | 13 | 5 |
| Bandejas, canales y tubos | 13 | 20 |
| Envolventes, armarios y cajas | 10 | 10 |
| Hilos y cables | 11 | 11 |
| Equipo de seguridad y energía | 8 | 10 |
| Pequeño material (mecanismos) | 5 | 5 |
| Vehículo eléctrico | 4 | 5 |
| Media y alta tensión | 3 | 3 |
| **TOTAL** | **252** | **106** |

### Familia Iluminación — COMPLETADA AL 100%

| Subfamilia | Cuadros |
|---|---|
| Alumbrado de interior | 8 |
| Alumbrado industrial y de seguridad | 4 |
| Equipos, linternas, pilas y otros | 2 |
| Lámparas y bombillas | 3 |
| Alumbrado público | 1 |
| Alumbrado festivo | 1 |
| Domótica (iluminación) | 1 |
| **TOTAL** | **20** |

### Familias pendientes (sin ningún cuadro aún)
- Comunicaciones, Domótica, Climatización, Neumática, Renovables,
  Herramientas, Ferretería, Seguridad

## PANEL VERCEL — LISTO PARA PUBLICAR

La Opción A (panel estático sin servidor) está preparada en `panel_vercel/`.

**Archivos:**
- `panel_vercel/generar.js` — genera `base_conocimiento.json` desde los .txt
- `panel_vercel/index.html` — el panel completo (búsqueda, catálogo, alfabético)
- `panel_vercel/.gitignore` — excluye los JSON generados de git

**Flujo de publicación (cuando se tengan las cuentas):**
```
node panel_vercel/generar.js   ← genera el JSON (ejecutar cada vez que se añadan cuadros)
npx vercel --prod              ← sube el panel a internet
```

**Pendiente:**
1. Crear cuenta GitHub
2. Crear cuenta Vercel (se vincula con GitHub)
3. Primera publicación — Aurora necesita guía paso a paso

## REGLAS DE TRABAJO (NO CAMBIAR)
- NO borrar archivos .txt de la base de conocimiento
- NO mostrar código mientras se trabaja
- NO reiniciar el panel a mitad de trabajo — solo al terminar una subfamilia completa
- 1 cuadro por grupo (metodología simplificada acordada con Aurora)
- Los cuadros van en: `C:\PROYECTOS IA\ARAIZ\BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ\`

## CÓMO CONSULTAR LA API (para retomar)

Host: my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com
Path: /api/as/v1/engines/araiz-articulos-prod/search.json
Key:  search-r7e1j8xyqi5nhnr44tgiqqhf
Auth: Bearer [KEY]

Filtros para un grupo:
  classification_l2: 'nombre de subfamilia'
  classification_l3: 'nombre del grupo'

## ESTRUCTURA DEL PROYECTO

| Carpeta/Archivo | Para qué |
|---|---|
| `BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ/` | 260 cuadros .txt |
| `panel_vercel/` | Panel listo para Vercel |
| `servidor_conocimiento.js` | Panel local puerto 5192 |
| `catalogo_completo.json` | 2.747 artículos de muestra (9/grupo) |
| `araiz_ninja_v4.js` | Scraper del catálogo completo (regenera catalogo_total_v4.json) |
| `_archivo/` | Versiones antiguas y catalogo_total_v4.json (2 GB) |
