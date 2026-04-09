# CONTEXTO — Estado del proyecto Araiz
Actualizado: 2026-04-09

## QUÉ ESTAMOS HACIENDO

Construyendo una Base de Conocimiento sobre el catálogo Araiz Suministros Eléctricos.
Cada "cuadro resumen" es un archivo .txt en `BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ/`
que explica qué es un producto, para qué sirve, qué marcas hay en Araiz,
qué preguntar al cliente y consejos prácticos. Aurora no es electricista — los
cuadros deben ser comprensibles para alguien con perfil comercial/admin.

Los cuadros se leen desde el panel local en **http://localhost:5192**
(arrancar con: `node servidor_conocimiento.js` desde C:\PROYECTOS IA\ARAIZ\)

## DÓNDE ESTAMOS AHORA

**Total cuadros escritos: 178**

### Subfamilias completadas:
- Autómatas programables y robots industriales — 56 cuadros (Lotes A/B/C/D...)
- Aparellaje eléctrico — todos los grupos completados (26 grupos, ~116 cuadros)

### Subfamilia en curso: Material de conexión eléctrica
API filter: `classification_l2: 'Material de conexión eléctrica'`
Total artículos en esta subfamilia: 93.473

**Grupos completados:**
- Conectores (50.412 art.) — 3 cuadros:
  - `conectores_regleta_pcb.txt`
  - `conectores_industriales_circulares.txt`
  - `cables_sensor_actuador_m12.txt`

- Bornas (25.237 art.) — 3 cuadros:
  - `bornas_carril_din_phoenix.txt`
  - `bornas_especiales_funcionales.txt`
  - `accesorios_bornas_carril.txt`

**SIGUIENTE GRUPO A HACER:**
Prensaestopas, racores y otros accesorios (4.843 art.)
  API filter: classification_l3 = 'Prensaestopas, racores y otros accesorios'
  Marcas esperadas: Gaestopas, Phoenix Contact, Weidmuller, Roxtec
  Tipos esperados: prensaestopas métricos, PG, racores, tapones ciegos, pasamuros

**Grupos pendientes después (en orden):**
3. Etiquetas e identificadores para bornes y circuitos (3.643 art.)
4. Terminales (3.248 art.)
5. Tomas de corriente industriales (3.148 art.)
6. Pletinas y embarrados (937 art.)
7. Terminaciones y empalmes (572 art.)
8. Regletas y PDU (519 art.)
9. Repartidores (518 art.)
10. Material para puesta a tierra (396 art.)

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
  classification_l2: 'Material de conexión eléctrica'
  classification_l3: 'NOMBRE DEL GRUPO'

Facets útiles: brand_name (size:20), etim_class_name (size:20)

## SUBFAMILIAS PENDIENTES (después de Material de conexión eléctrica)
1. Automáticos y diferenciales (45.884 art.)
2. Envolventes, armarios y cajas (43.399 art.)
3. Pequeño material (mecanismos) (24.387 art.)
4. Hilos y cables (19.670 art.)
5. Equipo de seguridad y almacenamiento de energía (16.897 art.)
6. Alumbrado de interior (12.823 art.)
7. Bandejas, canales y tubos conducción cables (10.655 art.)
... (ver lista completa con facets en classification_l2)
