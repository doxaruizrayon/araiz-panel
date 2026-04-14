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

**Total cuadros escritos: 206**

### Subfamilias completadas:
- Autómatas programables y robots industriales — 56 cuadros (Lotes A/B/C/D...)
- Aparellaje eléctrico — todos los grupos completados (26 grupos, ~116 cuadros)
- Material de conexión eléctrica — todos los grupos completados (11 grupos, ~19 cuadros)
- **Automáticos y diferenciales — todos los grupos completados (5 grupos, 13 cuadros) ← ÚLTIMA SESIÓN**

### Cuadros de Automáticos y diferenciales (13 cuadros, ~46.000 art.):
- Interruptor automático (MCCB/ACB): `mccb_siemens_3va.txt`, `mccb_abb_tmax_emax.txt`, `mccb_eaton_nzm_schneider_nsx.txt`, `mccb_hager_legrand_otros.txt`
- Accesorios MCCB: `accesorios_mccb_bobinas_manetas.txt`, `accesorios_mccb_contactos_peines.txt`
- Magnetotérmico: `magnetotermico_residencial_1p2p.txt`, `magnetotermico_residencial_3p4p.txt`, `magnetotermico_industrial_especial.txt`, `rcbo_y_accesorios_magnetotermico.txt`
- Diferencial: `diferencial_residencial_2p4p.txt`, `diferencial_clase_a_selectivo_toroidal.txt`, `bloque_diferencial_addon.txt`

## SIGUIENTE SUBFAMILIA A HACER

**Envolventes, armarios y cajas** (~43.400 art.)
API filter: `classification_l2: 'Envolventes, armarios y cajas'`

Para ver los grupos disponibles:
  facets: { classification_l3: [{ type: 'value', size: 30 }] }
  filters: { all: [{ classification_l2: 'Envolventes, armarios y cajas' }] }

Grupos esperados (aproximados):
- Armarios metálicos
- Cajas de distribución
- Envolventes de plástico
- Accesorios para armarios
- Cuadros de vivienda (empotrar/superficie)
- Racks y armarios de telecomunicaciones

## REGLAS DE TRABAJO (NO CAMBIAR)
- NO borrar archivos .txt de la base de conocimiento
- NO mostrar código mientras se trabaja
- NO reiniciar el panel a mitad de trabajo — solo al terminar una subfamilia completa
- Consultar la API antes de escribir cada grupo nuevo
- 2-3 cuadros por grupo grande (>2.000 art.), 1 cuadro para grupos pequeños (<500 art.)
- Los cuadros van en: C:\PROYECTOS IA\ARAIZ\BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ\

## CÓMO CONSULTAR LA API (para retomar)

Host: my-deployment-22c579.ent.northeurope.azure.elastic-cloud.com
Path: /api/as/v1/engines/araiz-articulos-prod/search.json
Key:  search-r7e1j8xyqi5nhnr44tgiqqhf
Auth: Bearer [KEY]

Filtros para un grupo:
  classification_l2: 'Automáticos y diferenciales'
  classification_l3: 'NOMBRE DEL GRUPO'

Facets útiles: brand_name (size:20), etim_class_name (size:20)

## SUBFAMILIAS PENDIENTES (en orden de tamaño)
1. ~~Automáticos y diferenciales~~ ✅ COMPLETADO
2. Envolventes, armarios y cajas (~43.400 art.) ← SIGUIENTE
3. Pequeño material (mecanismos) (~24.400 art.)
4. Hilos y cables (~19.700 art.)
5. Equipo de seguridad y almacenamiento de energía (~16.900 art.)
6. Alumbrado de interior (~12.800 art.)
7. Bandejas, canales y tubos conducción cables (~10.700 art.)
... (ver lista completa con facets en classification_l2)
