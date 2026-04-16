# AEROTERMIA — BOMBAS DE CALOR AIRE-AGUA
### Guía técnica y de gestión para Aurora

---

## ¿QUÉ ES LA AEROTERMIA?

La aerotermia es una tecnología que obtiene energía térmica del aire exterior para generar calefacción, refrigeración y agua caliente sanitaria (ACS). No quema combustible: "extrae" calor del aire (incluso con temperaturas negativas).

**Analogía:** funciona como un frigorífico al revés — en lugar de expulsar calor al exterior, lo capta y lo lleva al interior.

**Por qué es relevante para Araiz:** la aerotermia es una de las tecnologías de mayor crecimiento en España. El material eléctrico asociado (protecciones, cable, cuadros) representa una oportunidad comercial importante.

---

## TIPOS DE SISTEMAS — Y SUS IMPLICACIONES ELÉCTRICAS

### Sistemas MONOBLOC

Todos los componentes del ciclo frigorífico están en **una sola unidad exterior**.

| Característica | Detalle |
|---|---|
| Ubicación | Solo unidad exterior (junto al edificio) |
| Conexión interior | Solo hidráulica (tuberías de agua) |
| Ventaja | No requiere certificación F-Gas para mantenimiento del circuito frigorífico |
| Electricidad | Todo el consumo eléctrico en el exterior → cable resistente a intemperie |

**Implicación eléctrica:** el cuadro de protección se instala cerca de la unidad exterior. El cable de alimentación debe ser **RZ1-K** o similar con cubierta resistente al exterior.

---

### Sistemas BIBLOC (Split)

La máquina está dividida en **unidad exterior** (compresor) e **unidad interior** (hydrokit — intercambiador de calor y bomba de circulación).

| Característica | Detalle |
|---|---|
| Conexión | Circuito frigorífico entre exterior e interior (requiere certificación F-Gas) |
| Electricidad | Dos puntos de alimentación eléctrica diferenciados |
| Bus de comunicación | Cable de baja tensión entre unidad exterior e interior (señal de control) |
| Complejidad | Mayor que monobloc |

**Implicación eléctrica:** hay que planificar **dos circuitos eléctricos** independientes y un cable de señal/comunicación entre las unidades.

---

## REQUISITOS ELÉCTRICOS DE LA INSTALACIÓN

### Marco normativo:
- **REBT** (RD 842/2002) — instalación eléctrica
- **RITE** (Reglamento de Instalaciones Térmicas en Edificios) — eficiencia
- **CTE** (Código Técnico de la Edificación) — exigencias de eficiencia energética
- **RD 115/2017** — regulación de gases fluorados (F-Gas)

### Potencias habituales:
- **Doméstico residencial:** 3 kW a 16 kW de potencia eléctrica absorbida
- **Terciario / industrial:** desde 16 kW hasta cientos de kW

### Tecnología Inverter
Los equipos modernos usan **tecnología inverter** en el compresor, que:
- Reduce el pico de arranque (a diferencia de los sistemas on/off tradicionales)
- Regula la velocidad según la demanda (ahorro energético)
- Requiere electrónica de control sensible → necesita **protección contra sobretensiones**

---

## ESQUEMA ELÉCTRICO TIPO DE UNA INSTALACIÓN DE AEROTERMIA

```
CUADRO GENERAL DEL EDIFICIO
          ↓
INTERRUPTOR DIFERENCIAL (30mA o 300mA según instalación)
          ↓
MAGNETOTÉRMICO DEDICADO para la aerotermia
          ↓
LIMITADOR DE SOBRETENSIÓN (SPD) — PROTEGE LA ELECTRÓNICA
          ↓
UNIDAD EXTERIOR (compresor + ventilador)
          |
          └── Cable de señal (bus de comunicación)
          |
UNIDAD INTERIOR / HYDROKIT (en sistemas bibloc)
          ↓
VÁLVULAS + BOMBA CIRCULACIÓN + TERMOSTATO
```

---

## MATERIALES ELÉCTRICOS QUE NECESITA UNA INSTALACIÓN DE AEROTERMIA

| Material | Especificación técnica | Por qué |
|---|---|---|
| **Cable de alimentación** | RZ1-K (AS), libre halógenos | Exterior + alta seguridad antiincendio |
| **Cable de señal/bus** | Cable apantallado 2x0,75mm² o 4x0,5mm² | Para comunicación entre unidades (bibloc) |
| **Magnetotérmico** | Curva C, calibrado según potencia | Protección contra sobrecarga y cortocircuito |
| **Diferencial** | 30mA (residencial) / 300mA (industrial) | Protección de personas |
| **Limitador de sobretensión (SPD)** | Clase 2 (mínimo) | Protege la electrónica del inverter |
| **Tubo o canaleta** | PVC o metálico según ubicación | Canalización del cableado exterior |
| **Caja estanca (IP55/IP65)** | Para conexiones en exterior | Protección contra agua y polvo |

---

## CÁLCULO DE LA PROTECCIÓN ELÉCTRICA

### Para dimensionar el magnetotérmico:
```
Intensidad nominal = Potencia (W) / (Tensión × cos φ)
```

**Ejemplo para una bomba de calor monofásica de 5 kW:**
```
I = 5.000W / (230V × 0,85) = 25,6A → Magnetotérmico de 32A curva C
```

**Ejemplo para trifásica de 12 kW:**
```
I = 12.000W / (400V × √3 × 0,85) = 20,4A → Magnetotérmico trifásico 25A curva C
```

> **Nota:** siempre consultar el manual del equipo — el fabricante especifica la protección recomendada.

---

## COEFICIENTES DE RENDIMIENTO — LO QUE DICE LA OFERTA

Los equipos de aerotermia se venden con estos parámetros de eficiencia:

| Parámetro | Qué mide | Cuándo se aplica |
|---|---|---|
| **COP** | Eficiencia en calefacción en un momento dado | Datos de catálogo |
| **EER** | Eficiencia en refrigeración en un momento dado | Datos de catálogo |
| **SCOP** | Eficiencia estacional en calefacción (todo el año) | Etiqueta energética |
| **SEER** | Eficiencia estacional en refrigeración | Etiqueta energética |

> **Para gestión:** cuando el cliente compara equipos, el **SCOP** y el **SEER** son los datos relevantes (reflejan el rendimiento real anual, no solo en condiciones óptimas de laboratorio).

Un SCOP de 4 significa que por cada 1 kWh eléctrico consumido, se generan 4 kWh de calor. La factura eléctrica es 4 veces menor que con calefacción eléctrica directa.

---

## MARCAS PRINCIPALES DE AEROTERMIA

| Marca | Origen | Posicionamiento | Distribuye Araiz |
|---|---|---|---|
| **Mitsubishi Electric** | Japón | Alta gama | Posiblemente |
| **Daikin** | Japón | Alta gama | A consultar |
| **Hitachi** | Japón | Gama media-alta | A consultar |
| **Panasonic** | Japón | Gama media | A consultar |
| **LG** | Corea | Gama media | A consultar |
| **Vaillant** | Alemania | Calefacción profesional | A consultar |
| **Viessmann** | Alemania | Calefacción profesional | A consultar |
| **Deye** | China | Gama media, solar+aerotermia | Sí (ver presupuestos) |

> **Nota para Aurora:** Araiz tiene presupuestos con **inversores Deye** (fabricante chino que combina inversor solar + bomba de calor en un solo equipo). Es una gama emergente en el segmento solar + aerotermia integrada.

---

## PARA GESTIÓN — LO QUE DEBES SABER

**Quién compra material de aerotermia a Araiz:**
- **Instaladores de climatización** (fontaneros/calefactores con certificado F-Gas)
- **Instaladores eléctricos** (solo el tramo eléctrico)
- **Constructoras** (en obra nueva)

**Preguntas clave antes de un pedido:**
1. ¿Monobloc o bibloc?
2. ¿Potencia del equipo? (kW)
3. ¿Monofásico (230V) o trifásico (400V)?
4. ¿Interior o exterior (necesita cable resistente a intemperie)?
5. ¿Hay proyecto o es instalación directa?

---

*Documento elaborado y mejorado para Aurora — Araiz Suministros Eléctricos — Marzo 2026*
