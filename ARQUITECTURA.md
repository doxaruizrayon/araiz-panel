# Arquitectura del Proyecto — Panel Araiz

## Qué es este proyecto

Panel de conocimiento y catálogo de material eléctrico para Araiz Suministros Eléctricos.
260 cuadros resumen escritos (perfil comercial/admin, no electricista).
Uso futuro previsto: herramienta interna para el equipo comercial de Araiz.

## Objetivo principal

Permitir buscar, filtrar y consultar fichas de producto organizadas por familias,
subfamilias y grupos, con explicación de para qué sirve cada cosa, qué marcas
hay en Araiz y qué preguntar al cliente.

## Estructura de carpetas

```
ARAIZ/
├── BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ/   → 260 cuadros .txt (no tocar)
├── panel_vercel/          → panel estático listo para publicar en Vercel
│   ├── generar.js         → genera base_conocimiento.json y catalogo.json desde los .txt
│   ├── index.html         → el panel completo (búsqueda, catálogo, alfabético)
│   ├── base_conocimiento.json  → generado, no va a git
│   └── catalogo.json          → generado, no va a git
├── 01_CATALOGO/           → familias_productos.md (índice del catálogo)
├── 02_BASE_CONOCIMIENTO/  → 3 docs de referencia: automatización, marcas, material básico
├── 03_TELEMATEL/          → guía onboarding Telematel (ERP de Araiz)
├── 04_DOCUMENTOS_TECNICOS/→ 10 docs técnicos: REBT, Solar, Domótica, Antenas, Aerotermia...
├── _archivo/              → versiones antiguas del scraper y JSONs históricos (no va a git)
├── logs/                  → un log .md por sesión de trabajo
├── node_modules/          → dependencias Node (no va a git)
├── plantillas/            → plantillas de presupuestos HTML/PDF
│
├── servidor_conocimiento.js  → servidor local → localhost:5192
├── araiz_ninja_v4.js         → scraper principal del catálogo Araiz (API Elastic)
├── araiz_rescate.js          → scraper alternativo / recuperación
├── buscar_en_v4.js           → búsqueda en el catálogo local
├── catalogo_araiz.js         → utilidad del catálogo
│
├── extraer_arrancadores.js           → extracción específica por subfamilia
├── extraer_disyuntores_guardamotores.js
├── extraer_equipos_medida.js
├── extraer_finales_carrera.js
├── extraer_grupo_automatas.js
├── extraer_interruptores.js
├── extraer_otros_aparatos.js
├── extraer_seccionador_manipulador.js
├── extraer_temporizadores.js
│
├── catalogo_completo.json            → 2.747 artículos de muestra (9/grupo, 703 KB)
├── arrancadores_completo.json        → extracciones por grupo (varios MB cada uno)
├── automatas_completo.json
├── disyuntores_guardamotores_completo.json
├── electricidad_completa.json
├── equipos_medida_completo.json
├── finales_carrera_completo.json
├── interruptores_completo.json
├── otros_aparatos_completo.json
├── seccionador_manipulador_completo.json
├── temporizadores_completo.json
│
├── INICIO.md       → protocolo de inicio y cierre de sesión
├── CONTEXTO.md     → estado actual y próximo paso
├── ARQUITECTURA.md → este archivo
├── AGENTE_PM.md    → agente para decisiones y prioridades
└── AGENTE_DEV.md   → agente para construcción y mantenimiento de código
```

## Cómo funciona el panel local

```bash
node servidor_conocimiento.js   # arranca en localhost:5192
```

- El catálogo se organiza por familias → subfamilias → grupos → artículos
- El panel tiene 3 pestañas: Base de Conocimiento, Catálogo Araiz y Por Letra
- La búsqueda funciona por nombre, código de referencia y categoría

## Flujo de publicación en Vercel

```bash
node panel_vercel/generar.js   # genera los JSON (ejecutar al añadir cuadros)
npx vercel --prod              # publica en internet
```

**Estado:** panel listo. Pendiente crear cuentas GitHub + Vercel para primera publicación.

## Estado del contenido (15/04/2026)

| Familia | Cuadros | Estado |
|---------|---------|--------|
| Electricidad (10 subfamilias) | 260 | **COMPLETA** |
| Iluminación | 0 | Pendiente |
| Comunicaciones | 0 | Pendiente |
| Domótica | 0 | Pendiente |
| Climatización | 0 | Pendiente |
| Neumática | 0 | Pendiente |
| Renovables | 0 | Pendiente |
| Herramientas | 0 | Pendiente |
| Ferretería | 0 | Pendiente |
| Seguridad | 0 | Pendiente |

## Reglas que hay que respetar siempre

- Los JSON grandes nunca van a git (están en .gitignore)
- NO borrar cuadros .txt de la base de conocimiento
- NO mostrar código mientras se trabaja en cuadros
- NO reiniciar el panel a mitad de trabajo — solo al terminar una subfamilia completa
- Hacer commit al terminar cada familia de artículos
- Actualizar CONTEXTO.md y este archivo si cambia algo estructural
