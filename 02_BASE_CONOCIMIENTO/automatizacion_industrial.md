# AUTOMATIZACIÓN INDUSTRIAL — GUÍA PARA AURORA

> Explicado desde la perspectiva de gestión y administración, sin jerga técnica innecesaria.

---

## ¿QUÉ ES LA AUTOMATIZACIÓN INDUSTRIAL?

Imagina una fábrica donde las máquinas trabajan solas, o casi solas, sin que un operario tenga que pulsar un botón cada vez. Eso es la automatización industrial: usar tecnología (electrónica, informática y neumática) para que los procesos de producción funcionen solos, de forma controlada y segura.

Araiz es uno de los distribuidores españoles más fuertes en este segmento. Es su "joya de la corona" y donde hay más valor añadido (y más margen).

---

## LOS COMPONENTES CLAVE — Y QUÉ SON EN LENGUAJE SENCILLO

### PLC — "El cerebro de la máquina"
**¿Qué es?** Un ordenador industrial muy robusto que controla una máquina o proceso.
**Analogía de gestión:** Es como el ERP de una fábrica: recibe información, toma decisiones y da órdenes.
**Lo que hace:** Enciende y apaga motores, abre y cierra válvulas, lee sensores. Todo en milisegundos.
**Marcas principales:** Siemens (SIMATIC S7), Schneider Electric (Modicon), ABB, Mitsubishi, Omron.
**Precio orientativo:** Desde 300€ (pequeños) hasta miles de euros (grandes instalaciones).
**Referencia tipo Siemens:** 6ES7214-1AG40-0XB0 (CPU S7-1214C)

---

### HMI — "La pantalla táctil del operario"
**¿Qué es?** Una pantalla (normalmente táctil) instalada en la máquina o cuadro eléctrico.
**Analogía de gestión:** Es el "dashboard" o panel de control del proceso. El operario ve lo que pasa y puede dar órdenes.
**Lo que hace:** Muestra temperaturas, velocidades, alarmas. Permite al operario arrancar/parar procesos.
**Marcas principales:** Siemens (KTP, TP), Schneider (Magelis), Weintek, Pro-face.
**Precio orientativo:** Desde 200€ (pequeñas) hasta 3.000€+ (grandes y sofisticadas).

---

### VARIADOR DE FRECUENCIA — "El acelerador del motor"
**¿Qué es?** Un equipo que controla la velocidad de un motor eléctrico.
**Analogía de gestión:** Como el pedal del acelerador de un coche: puedes ir despacio o rápido según necesites.
**Lo que hace:** Arranca el motor suavemente (ahorra energía y evita golpes mecánicos), regula la velocidad exacta.
**Beneficio económico:** Ahorro de hasta un 50% en consumo eléctrico en aplicaciones como bombas y ventiladores.
**Marcas principales:** Siemens (SINAMICS), Schneider (Altivar), ABB (ACS), Danfoss, Omron.
**Precio orientativo:** Desde 150€ (pequeños motores) hasta varios miles (grandes potencias).

---

### CONTACTOR — "El interruptor industrial de potencia"
**¿Qué es?** Un interruptor eléctrico de gran tamaño que se activa con una pequeña señal eléctrica.
**Analogía de gestión:** Como un portero que abre o cierra una gran puerta (el circuito de potencia) cuando recibe una orden (señal de control).
**Lo que hace:** Conecta y desconecta motores u otras cargas grandes de forma segura y repetitiva.
**Se vende siempre con:** Relé térmico (protección contra sobrecalentamiento del motor).
**Marcas principales:** Schneider (TeSys), ABB (AF), Siemens (3RT), Lovato, Eaton.
**Precio orientativo:** Desde 20€ (pequeños) hasta 300€+ (grandes potencias).

---

### GUARDAMOTOR — "El guardián del motor"
**¿Qué es?** Un dispositivo que protege el motor eléctrico de sobrecargas y cortocircuitos.
**Analogía de gestión:** Es el "seguro" del motor: si algo va mal, lo desconecta antes de que se queme (y nos ahorra el coste de reparar o sustituir un motor).
**Combina en un solo aparato:** Interruptor + protección térmica + ajuste de intensidad.
**Marcas principales:** Siemens (3RV), Schneider (GV), ABB, Eaton.
**Precio orientativo:** Desde 30€ hasta 200€.

---

### RELÉ — "El interruptor de señal"
**¿Qué es?** Un componente pequeño que hace de intermediario entre señales de control y cargas eléctricas.
**Analogía de gestión:** Como un mensajero que lleva una orden pequeña y activa algo grande.
**Lo que hace:** Aisla circuitos, multiplica señales, actúa como interfaz entre el PLC y el mundo real.
**Marcas principales:** Finder, Phoenix Contact, Weidmüller, Schneider, Siemens.
**Precio orientativo:** Desde 3€ hasta 50€.

---

### SENSOR INDUSTRIAL — "Los ojos y oídos de la máquina"
**¿Qué es?** Un dispositivo que detecta presencia, posición, temperatura, presión, etc.
**Tipos más comunes:**
- **Inductivo:** Detecta metales (sin contacto). Ej: saber si una pieza metálica está en su sitio.
- **Fotoeléctrico:** Detecta objetos por luz (como una barrera de seguridad).
- **Capacitivo:** Detecta cualquier material, incluidos líquidos.
- **De temperatura:** Termostatos industriales, PT100, termopares.
**Marcas principales:** Sick, Omron, Balluff, IFM, Pepperl+Fuchs, Telemecanique (Schneider).
**Precio orientativo:** Desde 15€ (simples) hasta 500€+ (especiales).

---

### SCADA — "El gran cuadro de mando de la fábrica"
**¿Qué es?** Software de supervisión que monitoriza toda una planta de producción desde un ordenador.
**Analogía de gestión:** Como el BI (Business Intelligence) de una empresa pero para máquinas: ves todos los KPIs de producción en tiempo real y registras históricos.
**Lo que hace:** Muestra alarmas, registra datos de producción, permite control remoto.
**Marcas principales:** Siemens (WinCC), Schneider (Wonderware), Ignition, Inductive Automation.

---

### NEUMÁTICA — "Las máquinas que trabajan con aire"
**¿Qué es?** Tecnología que usa aire comprimido para generar movimiento y fuerza.
**Analogía de gestión:** Es como la hidráulica pero con aire en lugar de aceite. Más limpia y rápida.
**Dónde se usa:** Brazos robóticos, pinzas, prensas, empujadores, sistemas de embalaje.
**Componentes clave:** Cilindros (generan movimiento), válvulas (controlan el aire), FRL (filtran y regulan el aire).
**Marcas principales:** SMC (líder mundial, distribuida por Araiz), Festo, Parker, Norgren.
**Precio orientativo:** Cilindros desde 20€, válvulas desde 30€, islas de válvulas desde 200€.

---

## CÓMO SE ESTRUCTURAN LOS PEDIDOS DE AUTOMATIZACIÓN

En automatización los pedidos suelen ser:
1. **Proyectos nuevos:** Cuadros eléctricos completos para una nueva máquina o instalación.
2. **Mantenimiento correctivo:** Repuestos urgentes cuando algo se avería (hay presión de tiempo).
3. **Mantenimiento preventivo:** Repuestos programados antes de que fallen.
4. **Ampliaciones:** El cliente quiere añadir más capacidad a una instalación existente.

**Para gestión:** los proyectos de automatización suelen tener:
- Plazos de entrega críticos (una línea parada cuesta miles de euros/hora).
- Referencias muy específicas (no sirve cualquier referencia, sino la exacta).
- Clientes con alta recurrencia y fidelidad.
- Márgenes mejores que el material eléctrico estándar.

---

## TÉRMINOS CLAVE DEL SECTOR (GLOSARIO)

| Término | Significado simple |
|---|---|
| PLC | Ordenador industrial que controla máquinas |
| HMI | Pantalla táctil de operación |
| VFD / Variador | Controla la velocidad del motor |
| Contactor | Interruptor industrial para grandes corrientes |
| Guardamotor | Protección del motor eléctrico |
| Relé | Interruptor de señal pequeño |
| Sensor inductivo | Detecta metales sin contacto |
| Actuador | Elemento que produce movimiento (cilindro, motor) |
| Borna / Bornes | Regletas donde se conectan los cables en los cuadros |
| Cuadro eléctrico | Armario metálico donde van todos los componentes |
| BT / AT | Baja tensión / Alta tensión |
| Fase / Neutro / Tierra | Los 3 conductores básicos de cualquier instalación |
| Intensidad (A) | Amperios — "cuánta corriente pasa" |
| Potencia (W/kW) | Vatios — "cuánta energía consume" |
| Tensión (V) | Voltios — "la presión del circuito" |
| IP | Grado de protección contra polvo y agua (IP65 = muy protegido) |
| ATEX | Certificación para zonas con riesgo de explosión |
| CE | Marcado de conformidad europea (obligatorio) |

---

*Documento elaborado para Aurora — Araiz Suministros Eléctricos — Marzo 2026*
