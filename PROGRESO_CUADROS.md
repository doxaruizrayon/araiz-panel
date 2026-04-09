# Plan y Progreso — Cuadros Resumen Base de Conocimiento Araiz
Iniciado: 2026-04-07
Última actualización: 2026-04-07

## Estado actual
- **Total cuadros en panel: 178**
- **Última actualización:** 2026-04-09
- **Grupo Autómatas programables:** 56 cuadros ✅ COMPLETO
- **Grupo Contactores:** 11 cuadros ✅ COMPLETO (2026-04-07)
- **Grupo Reles:** 11 cuadros ✅ COMPLETO (2026-04-07)
- **Grupo Accesorios:** 9 cuadros ✅ COMPLETO (2026-04-08)
- **Grupo Portafusibles y fusibles industriales:** 7 cuadros ✅ COMPLETO (2026-04-08)
- **Grupo Pulseteria:** 8 cuadros ✅ COMPLETO (2026-04-08)
- **Grupo Detectores proximidad y fotocelulas:** 6 cuadros ✅ COMPLETO (2026-04-08)
- **Grupo Interruptor y conmutador manual:** 6 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Arrancadores e inversores:** 5 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Final de carrera (interruptor de posición):** 4 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Seccionador y manipulador manual:** 3 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Otros aparatos:** 3 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Disyuntores y guardamotores:** 2 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Equipos de medida (panel o carril DIN):** 2 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Temporizador, contador de horas, totalizador y minutero:** 2 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Encoders - sensores:** 2 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Otros aparatos manuales:** 2 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Interruptor horario e interruptor crepuscular:** 2 cuadros ✅ COMPLETO (2026-04-09)
- **Grupo Microrruptores:** 1 cuadro ✅ COMPLETO (2026-04-09)
- **Grupo OTROS (Omron sin ETIM):** 1 cuadro ✅ COMPLETO (2026-04-09)
- **Grupo Telerruptores:** 1 cuadro ✅ COMPLETO (2026-04-09)
- **Grupo Visualizador de datos de gran formato:** 1 cuadro ✅ COMPLETO (2026-04-09)
- **Grupo Material antideflagrante:** 1 cuadro ✅ COMPLETO (2026-04-09)
- **Grupo Programador enchufable:** 1 cuadro ✅ COMPLETO (2026-04-09)
- **Grupo Interruptor de pedal:** 1 cuadro ✅ COMPLETO (2026-04-09)
- **Grupo Autómatas programables (sub-grupo Aparellaje):** cubierto por los lotes A/B/C de Autómatas (56 cuadros) ✅
- **⭐ SUBFAMILIA APARELLAJE ELÉCTRICO: TODOS LOS GRUPOS COMPLETADOS (2026-04-09)**

---
## SUBFAMILIA ACTUAL: Material de conexión eléctrica (93.473 art. totales en Araiz)

### Grupos de esta subfamilia (orden por tamaño):
| # | Grupo | Art. | Estado |
|---|-------|------|--------|
| 1 | Conectores | 50.412 | ✅ COMPLETO (2026-04-09) — 3 cuadros |
| 2 | Bornas | 25.237 | ✅ COMPLETO (2026-04-09) — 3 cuadros |
| 3 | Prensaestopas, racores y otros accesorios | 4.843 | ⏳ PENDIENTE |
| 4 | Etiquetas e identificadores para bornes y circuitos | 3.643 | ⏳ PENDIENTE |
| 5 | Terminales | 3.248 | ⏳ PENDIENTE |
| 6 | Tomas de corriente industriales | 3.148 | ⏳ PENDIENTE |
| 7 | Pletinas y embarrados | 937 | ⏳ PENDIENTE |
| 8 | Terminaciones y empalmes | 572 | ⏳ PENDIENTE |
| 9 | Regletas y PDU | 519 | ⏳ PENDIENTE |
| 10 | Repartidores | 518 | ⏳ PENDIENTE |
| 11 | Material para puesta a tierra | 396 | ⏳ PENDIENTE |

### Cuadros escritos para esta subfamilia:
- `conectores_regleta_pcb.txt` — Phoenix Contact MSTB/MC/FMC, Weidmuller BCZ — conectores para PCB
- `conectores_industriales_circulares.txt` — M12/M8, Harting Han, ILME/Gaestopas multipolares
- `cables_sensor_actuador_m12.txt` — Cables SAC pre-ensamblados Phoenix Contact + Murrelektronik
- `bornas_carril_din_phoenix.txt` — UK/SAK/PTFIX Phoenix Contact, WDU Weidmuller, Viking3 Legrand, 8WH Siemens
- `bornas_especiales_funcionales.txt` — Bornas seccionables, con fusible, de tierra, sensor/actuador
- `accesorios_bornas_carril.txt` — Tapas, puentes/peines, carril DIN Omega, marcadores, identificación

### SIGUIENTE PASO: Grupo "Prensaestopas, racores y otros accesorios" (4.843 art.)

- **Panel:** activo en localhost:5192

---

## Lote A — PLCs + Fuente + Temperatura ✅ COMPLETO (10 cuadros)

1. [x] `plc_compacto_cp1.txt` — PLC compacto CP1L
2. [x] `plc_modular_cj1m.txt` — PLC modular CJ1M / CS1
3. [x] `plc_sysmac_nj.txt` — CPU Sysmac NJ
4. [x] `plc_sysmac_nx1p.txt` — CPU Sysmac NX1P2/NX102
5. [x] `fuente_alimentacion_24v.txt` — Fuente carril DIN 24V DC
6. [x] `regulador_temperatura_e5cc.txt` — Regulador temperatura E5CC
7. [x] `variador_frecuencia_omron.txt` — Variador de frecuencia
8. [x] `encoder_rotativo_e6b2.txt` — Encoder incremental E6B2
9. [x] `sensor_proximidad_e2e.txt` — Sensor proximidad inductivo E2E
10. [x] `sensor_fotoelectrico_e3fa.txt` — Sensor fotoeléctrico E3FA/E3Z

---

## Lote B — Visión + Lectores + Robots + Periféricos ✅ COMPLETO (10 cuadros)

11. [x] `camara_sistema_vision_fh.txt` — Sistema visión FH + cámaras
12. [x] `lector_codigos_microhawk.txt` — Lector MicroHAWK / V430
13. [x] `robot_industrial_omron.txt` — Robot Viper/Cobra/Delta/SCARA
14. [x] `rfid_sistema_v680.txt` — Sistema RFID V680
15. [x] `medidor_energia_km.txt` — Medidor energía KM-N2/N3
16. [x] `display_medidor_panel_k3hb.txt` — Display/medidor panel K3HB
17. [x] `gateway_router_industrial.txt` — Gateway protocolo + router 4G
18. [x] `pantalla_hmi_ns.txt` — Pantalla HMI NS5/8/10/12/15
19. [x] `panel_pc_industrial.txt` — Panel PC industrial / controlador AI (NY)
20. [x] `controlador_temperatura_e5an.txt` — Controlador temperatura E5GC/E5AN compacto

---

## Lote C — Complementos y periféricos avanzados ✅ COMPLETO (6 cuadros)

21. [x] `pantalla_hmi_na.txt` — Pantalla HMI NA (nueva generación Sysmac, táctil capacitivo)
22. [x] `controlador_movimiento_cj1nc.txt` — Módulo control movimiento CJ1W-NC (multi-eje)
23. [x] `anyfeeder_sistema.txt` — Sistema AnyFeeder (alimentador vibratorio flexible)
24. [x] `cable_programacion_plc.txt` — Cables de programación PLC (USB CS1W-CIF31, RS232C)
25. [x] `modulo_es_remota_ethercat.txt` — Módulos E/S remota EtherCAT serie GX
26. [x] `controlador_seguridad_nx.txt` — Controlador de seguridad NX-SL safety controller

---

## Ya cubiertos en sesiones anteriores (no duplicar)
- servo_drive, servomotor, cable_servo — sistema servo Accurax G5
- software_sysmac_studio — programación NJ/NX
- software_cxone_cxprogrammer.txt — CX-One + CX-Programmer legacy
- switch_ethernet_industrial — redes industriales
- pantalla_hmi_nb.txt — pantalla HMI serie NB (gama básica)
- robot_colaborativo_tm.txt — robots colaborativos TM series
- tarjeta_comunicacion_serie, unidad_comunicacion_nx — puertos serie RS232/RS485
- temporizador_h3cr — temporizadores hardware
- transformador_corriente, ups, ventilador_panel
- módulos inline, bornes, cables varios, convertidores, interfaces

---

---

## GRUPO CONTACTORES ✅ COMPLETO (11 cuadros — 2026-04-07)
Familia: Electricidad > Aparellaje eléctrico > Contactores
Total artículos Araiz: 9.662

### Lote 1 — Producto principal + accesorios eléctricos
1. [x] `contactor_potencia_ca.txt` — Contactor 3 polos CA (3RT/LC1D/A-series/DILM) — 5.300 art.
2. [x] `rele_auxiliar.txt` — Relé auxiliar / contactor auxiliar (3RH/CAD/CA/DILA) — 1.079 art.
3. [x] `bloque_contactos_auxiliares.txt` — Bloques NA/NC lateral y frontal — 509 art.
4. [x] `bobina_contactor.txt` — Bobinas de repuesto para todas las marcas — 373 art.

### Lote 2 — Variantes especiales
5. [x] `contactor_instalacion_carril.txt` — Contactor modular DIN doméstico/terciario — 343 art.
6. [x] `contactor_condensadores.txt` — Contactor especial compensación reactiva — 365 art.
7. [x] `rele_estado_solido.txt` — SSR Siemens 3RF2 calefacción/temperatura — 95 art.
8. [x] `contactor_corriente_continua.txt` — Contactor DC solar/baterías/EV — 34 art.

### Lote 3 — Módulos adicionales y accesorios
9. [x] `modulo_supresion_transitorios.txt` — RC/varistor/diodo protección bobina — 97 art.
10. [x] `bloque_temporizador_contactor.txt` — Bloques temporizadores ON/OFF delay — 25 art.
11. [x] `accesorios_contactor.txt` — Kits contactos, enclavamientos, adaptadores, tapas — 420+ art.

---

---

## GRUPO RELES ✅ COMPLETO (11 cuadros — 2026-04-07)
Familia: Electricidad > Aparellaje eléctrico > Reles
Total artículos Araiz: 7.811 (7.928 en catálogo, diferencia por duplicados)
Marcas principales: Weidmuller (1.545), ABB (1.353), Omron (1.199), Siemens (943), Schneider (939), Phoenix Contact (489), FINDER (369), Eaton (315)

### Lote 1 — Los más grandes
1. [x] `rele_enchufable_conmutacion.txt` — FINDER/Omron MY-G2R/Weidmuller/Releco/ABB CR (~2.800 art.)
2. [x] `rele_termico_motor.txt` — Schneider LRD/Siemens 3RU2/ABB TA/Eaton ZB (~700 art.)
3. [x] `rele_sobrecarga_electronico.txt` — Siemens 3RB/Schneider LR9D/Eaton PKE (~205 art.)

### Lote 2 — Relés especiales
4. [x] `rele_estado_solido_reles.txt` — Carlo Gavazzi/Omron G3/FINDER 34/Weidmuller TOS (~450 art.)
5. [x] `rele_temporizador.txt` — FINDER 80/81/Omron H3CR/Siemens 3RP (~130 art.)
6. [x] `rele_seguridad.txt` — Siemens 3SK/Omron G9SX/Murrelektronik MIRO SAFE/Rockwell 440R (~170 art.)
7. [x] `rele_monitorizacion_red.txt` — fase+tensión+corriente+nivel+alternancia bombas (~500 art.)

### Lote 3 — Módulos y especialidades
8. [x] `modulo_interfaz_optoacoplador.txt` — Weidmuller/Murrelektronik/Omron G3RV (~330 art.)
9. [x] `rele_proteccion_proceso.txt` — Lazo 4-20mA / monitorización corriente proceso (~306 art.)
10. [x] `rele_enclavamiento.txt` — FINDER 26/27 latching / Arteche basculante (~72 art.)
11. [x] `rele_proteccion_distribucion.txt` — Schneider Easergy/P1F/P5F / Arteche / ABB RC (~191 art.) [NUEVO vs plan inicial]

---

## GRUPO ACCESORIOS ✅ COMPLETO (9 cuadros — 2026-04-07)
Familia: Electricidad > Aparellaje eléctrico > Accesorios
Total artículos Araiz: 9.858 (14.814 en catálogo, diferencia por cruce con otros grupos)
Marcas principales: Schneider, ABB, Phoenix Contact, Siemens, Eaton, Hager, Legrand, Sick, Weidmuller, Murrelektronik

1. [x] `accesorios_interruptores_disyuntores.txt` — Manetas, bobinas MN, rating plugs, kits contactos, cubrebornes, LOTO (~2.400 art.)
2. [x] `accesorios_conexion_bornes_conectores.txt` — Bornes DIN, conectores multipolares, pletinas, conectores PCB, punteras (~780 art.)
3. [x] `accesorios_armarios_envolventes.txt` — Carcasas, tapas/puertas, perfiles, ventilación, racks, carriles DIN (~700 art.)
4. [x] `accesorios_sensores_cables_campo.txt` — Soportes sensor, reflectores, cables M8/M12, Ethernet industrial (~460 art.)
5. [x] `accesorios_distribucion_peines.txt` — Peines distribución, barras puente, repartidores, barras neutro/tierra (~310 art.)
6. [x] `accesorios_senalizacion_balizas.txt` — Balizas LED, pilotos, pictogramas emergencia, zumbadores (~170 art.)
7. [x] `accesorios_variador_filtro.txt` — Filtros EMC, resistencias frenado, reactancias, tarjetas comunicación (~140 art.)
8. [x] `accesorios_alarma_deteccion.txt` — Detectores incendio/intrusión, centrales alarma, AFDD (~82 art.)
9. [x] `transformador_corriente_medida.txt` — TI pasante/partido/barra para medición (~43 art.)

Artículos cruzados con otros grupos (~1.500): accesorios de contactores, relés, PLCs ya cubiertos en sus grupos respectivos.
Artículos misceláneos sin cuadro propio (~3.273): accesorios genéricos, etiquetado, tornillería, pequeño material sin entidad suficiente.

---

## GRUPO DETECTORES PROXIMIDAD Y FOTOCELULAS ✅ COMPLETO (6 cuadros — 2026-04-08)
Familia: Electricidad > Aparellaje eléctrico > Detectores proximidad y fotocelulas
Total artículos Araiz: 9.156 (8.606 en catálogo)
Marcas principales: Omron (6.143), Telemecanique (2.470), Eaton (242), Carlo Gavazzi (100), ABB (79)

1. [x] `sensor_inductivo_capacitivo.txt` — Sensores inductivos proximidad + capacitivos (~3.620 art.)
2. [x] `fotocelula_sensor_optico.txt` — Fotocélulas: barrera, réflex, proximidad, horquilla, analógicas (~1.320 art.)
3. [x] `barrera_fotoelectrica.txt` — Barreras fotoeléctrica multihaz + cortinas seguridad Tipo 2/4 (~725 art.)
4. [x] `sensor_fibra_optica.txt` — Amplificadores fibra óptica + cabezas de fibra (~280 art.)
5. [x] `sensor_ultrasonidos_distancia.txt` — Sensores ultrasónicos + telémetros láser (~230 art.)
6. [x] `accesorios_sensores_detectores.txt` — Cables M8/M12, reflectores, soportes, conectores (~900 art.)

Cruce con otros grupos (~450): encoders, módulos E/S, cables PLC → cubiertos en Autómatas.
Mal clasificados (~500): parada emergencia cable, accesorios interruptores posición, accesorios motor.
Sin clase (~1.104): Omron(491), Telemecanique(405), Carlo Gavazzi(100) — sensores sin ETIM.

---

## GRUPO PULSETERIA ✅ COMPLETO (8 cuadros — 2026-04-08)
Familia: Electricidad > Aparellaje eléctrico > Pulseteria
Total artículos Araiz: 10.955 (10.462 en catálogo, diferencia por marcas compartidas)
Marcas principales: Schneider (4.149), Siemens (2.567), Eaton (1.954), ABB (911), Omron (567), Delecsa (263)

1. [x] `pulsador_cabezal_bloque.txt` — Cabezales pulsador + bloques contactos NA/NC + pulsadores completos 22mm (~3.400 art.)
2. [x] `selector_joystick.txt` — Selectores rotativos 2/3 posiciones + con llave + joysticks (~1.950 art.)
3. [x] `piloto_indicador_lampara.txt` — Pilotos luminosos LED + bases portapilotos + tapas/lentes + lámparas (~1.330 art.)
4. [x] `seta_emergencia.txt` — Pulsadores seta + parada emergencia completa + pupitres dos manos (~530 art.)
5. [x] `baliza_torre_modular.txt` — Torres señalización Eaton SL + Siemens 8WD4 + Gave modulares (~360 art.)
6. [x] `botonera_colgante.txt` — Botoneras colgantes grúa + cajas pulsadores montadas/vacías (~350 art.)
7. [x] `etiqueta_placa_rotulacion.txt` — Etiquetas, placas inscripción, portaetiquetas, rotulación (~1.190 art.)
8. [x] `accesorios_pulseteria.txt` — Adaptadores, cubiertas protectoras, tapas ciegas, potenciómetros, zumbadores (~550 art.)

Artículos mal clasificados (~475): finales de carrera, sensores, interruptores seguridad Omron — se cubrirán en sus grupos.
Sin clase (~784): Delecsa(263), Schneider(123), Siemens(94), Rockwell(75), ABB EPIS(54) — pulsatería sin ETIM.

---

## GRUPO PORTAFUSIBLES Y FUSIBLES INDUSTRIALES ✅ COMPLETO (7 cuadros — 2026-04-08)
Familia: Electricidad > Aparellaje eléctrico > Portafusibles y fusibles industriales
Total artículos Araiz: 11.371 (11.208 en catálogo, diferencia por marcas compartidas)
Marcas principales: Eaton/Bussmann (7.207), Siemens (1.585), Ferraz Shawmut/Mersen (1.560), DF (186), Schneider (176)

1. [x] `fusible_nh.txt` — Fusible NH cuchilla gG/aM + bases + cuchillas seccionadoras + accesorios (~4.200 art.)
2. [x] `fusible_cilindrico.txt` — Fusible cilíndrico 10x38/14x51/22x58 + portafusibles cilíndricos (~1.600 art.)
3. [x] `fusible_media_alta_tension.txt` — Cartuchos MT/AT 3,6kV-36kV protección transformadores (~1.100 art.)
4. [x] `fusible_semiconductor.txt` — Fusibles ultrarrápidos aR para semiconductores de potencia (~800 art.)
5. [x] `fusible_diazed_neozed.txt` — Sistemas Diazed (D) y Neozed (D0) completos (~350 art.)
6. [x] `fusible_miniatura_especial.txt` — Vidrio 5x20, cuchilla automoción, fotovoltaica gPV (~280 art.)
7. [x] `portafusible_base_seccionador.txt` — Portafusibles genéricos, seccionadores-fusible, bornes fusibleados (~450 art.)

Artículos mal clasificados (~350): finales de carrera Siemens, alarmas Eaton, pedales — se cubrirán en sus grupos correspondientes.

---

## GRUPO INTERRUPTOR Y CONMUTADOR MANUAL ✅ COMPLETO (6 cuadros — 2026-04-09)
Familia: Electricidad > Aparellaje eléctrico > Interruptor y conmutador manual
Total artículos Araiz: 8.262
Marcas principales: Eaton (dominante), ABB, Telergon, Telemecanique, Rockwell, Schneider, Hager, Siemens

1. [x] `seccionador_manual.txt` — Seccionador rotativo + seccionador con fusible (Eaton P-series, ABB OT/OS, Schneider Vario) (~2.255 art.)
2. [x] `conmutador_carga_red.txt` — Conmutador de carga (I-TS), conmutador de red (COS), Telergon, carril DIN (~1.330 art.)
3. [x] `interruptor_leva_control.txt` — Interruptor de control Eaton P-series + Telergon/Telemecanique sin clase ETIM (~1.877 art.)
4. [x] `magnetotermico_diferencial_modular.txt` — RCBO combinado (Eaton xPole/ABB DS201), MCB puro, RCCB diferencial (~1.284 art.)
5. [x] `disyuntor_guardamotor.txt` — MCCB caja moldeada (ABB Tmax/Eaton NZM) + guardamotor PKZM/3RV2 (~685 art.)
6. [x] `accesorios_interruptores_manuales.txt` — Manetas, motorizaciones, contactos aux, ejes, LOTO (~462 art.)

Artículos cruzados/mal clasificados: interruptores de flotador, finales de carrera, mecanismos domésticos Simon — se cubrirán en sus grupos.

---

## GRUPO ARRANCADORES E INVERSORES ✅ COMPLETO (5 cuadros — 2026-04-09)
Familia: Electricidad > Aparellaje eléctrico > Arrancadores e inversores
Total artículos Araiz: 5.090
Marcas principales: Siemens (2.508), Eaton (1.111), Schneider (1.041), ABB (282), Omron (74)

1. [x] `arrancador_directo_combinado.txt` — Arrancador DOL y combinado en caja (Siemens 3RA2/3RA6, Eaton xStart, Schneider TeSys U) (~1.672 art.)
2. [x] `arrancador_suave_progresivo.txt` — Soft starter (Siemens 3RW, ABB PSR/PSE, Eaton DS7, Schneider ATS) + progresivo ATS01 (~1.214 art.)
3. [x] `combinacion_contactores_arranque.txt` — Kits estrella-triángulo e inversores (Schneider LC3D/LC2D, Siemens 3RA3, ABB) (~768 art.)
4. [x] `variador_frecuencia_aparellaje.txt` — Variadores Eaton PowerXL + Omron sin clase (~712 art.)
5. [x] `accesorios_arrancadores.txt` — Accesorios BT, bloques disparo MN/MX, contactos aux, peines, software (~500 art.)

Artículos cruzados: variadores Omron también en grupo Autómatas; guardamotores ABB también en grupo anterior.

---

## GRUPO FINAL DE CARRERA (INTERRUPTOR DE POSICIÓN) ✅ COMPLETO (4 cuadros — 2026-04-09)
Familia: Electricidad > Aparellaje eléctrico > Final de carrera (interruptor de posición)
Total artículos Araiz: 4.469
Marcas principales: Telemecanique (1.927), Omron (1.526), Siemens (756), ABB (93), Eaton (86)

1. [x] `final_carrera_mecanico.txt` — Finales estándar (Telemecanique XCM/XCK, Omron D4N, Siemens 3SE5) (~2.452 art.)
2. [x] `final_carrera_seguridad.txt` — Con bloqueo/enclavamiento + parada emergencia por cable (D4GS, XCSR, 3SE2, Pilz) (~693 art.)
3. [x] `cabezal_actuador_final_carrera.txt` — Cabezales intercambiables ZCY, D4N-GK, rodillo/palanca/muelle (~733 art.)
4. [x] `accesorios_final_carrera.txt` — Magnéticos, RFID codificado, bloques contactos, cables preconectados (~543 art.)

Artículos cruzados: cabezales de pulsatería Omron A22 clasificados aquí; accesorios BT Omron.

---

## Reglas de reanudación (si se corta el contexto)
1. Leer este archivo primero
2. Ver estado: todos los lotes marcados como COMPLETO = trabajo terminado
3. Verificar con: `ls "BASE CONOCIMIENTO SOBRE CATALOGO ARAIZ/"` cuántos .txt hay (debe ser ~147)
4. El panel siempre refleja todos los .txt de esa carpeta tras reiniciar servidor (puerto 5192)
