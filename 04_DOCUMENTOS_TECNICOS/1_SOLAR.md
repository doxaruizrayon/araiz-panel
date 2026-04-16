# ENERGÍA SOLAR FOTOVOLTAICA — CÁLCULOS Y DIMENSIONADO
### Guía técnica y de gestión para Aurora

---

## COMPONENTES DE UNA INSTALACIÓN SOLAR

| Componente | Función | Analogía de gestión |
|---|---|---|
| **Placas solares (paneles)** | Captan la luz solar y la convierten en electricidad DC | Los "productores" de energía |
| **Inversor** | Convierte la electricidad DC a AC (230V/400V usable) | El "transformador" que hace la energía utilizable |
| **Baterías** | Almacenan la energía sobrante para usarla de noche | El "almacén" de energía |
| **Cuadro de protección CC** | Protege el tramo de corriente continua (placas→inversor) | "El seguro" del lado solar |
| **Cuadro de protección CA** | Protege el tramo de corriente alterna (inversor→red/consumo) | "El seguro" del lado eléctrico |
| **Contador bidireccional** | Mide lo que consumes y lo que viertes a la red | El "contador" del negocio |

---

## PARÁMETROS CLAVE PARA EL CÁLCULO

| Término | Definición simple | Valor típico España |
|---|---|---|
| **HSP** (Horas Solar Pico) | Horas equivalentes de sol pleno al día | 3,5h (invierno) / 4,5h (media) / 5,5h (verano) |
| **kWp** (kilovatios pico) | Potencia máxima que puede generar la instalación solar | Lo que dimensionamos |
| **kWh** (kilovatios hora) | Energía real generada o consumida | Lo que medimos |
| **DoD** (Profundidad de descarga) | Cuánto se puede vaciar la batería de forma segura | 90% litio / 50% plomo-ácido |
| **C-rate** | Velocidad de descarga de la batería | < 1C ideal (sin calentamiento) |
| **SCOP/SEER** | Eficiencia estacional de equipos de climatización | Cuanto mayor, mejor |

---

## FÓRMULAS DE DIMENSIONADO — PASO A PASO

### PASO 1 — Necesidad de producción de las placas (kWp)

```
Energía consumida (kWh/día) × 1,20 (factor pérdidas 20%)
kWp necesarios = ─────────────────────────────────────────
                 HSP × 0,80 (rendimiento del sistema)
```

### PASO 2 — Número de placas

```
Número de placas = kWp necesarios / Potencia de cada placa (kWp)
```

### PASO 3 — Baterías de Litio (DoD = 90%)

```
Capacidad necesaria (kWh) = Energía a almacenar / 0,90
Número de baterías = Capacidad necesaria / Capacidad por batería (kWh)
```

### PASO 4 — Baterías de Plomo-Ácido (DoD = 50%)

```
Capacidad necesaria (kWh) = Energía a almacenar / 0,50
Número de baterías = Capacidad necesaria / Capacidad por batería (kWh)
```

### PASO 5 — Amperios de las baterías

```
Capacidad de descarga (A) = Potencia del sistema (W) / Voltaje del sistema (V)
Capacidad total (Ah) = Energía total (Wh) / Voltaje del sistema (V)
```

### PASO 6 — C-rate (tasa de descarga)

```
C-rate = Potencia del consumo (kW) / Capacidad total de baterías (kWh)
```
> **Importante:** C-rate > 1 genera calor y reduce la vida útil de las baterías. Mantener siempre < 1.

### PASO 7 — Inversor

```
Potencia del inversor = Potencia del consumo × 1,25 (factor de sobrecarga)
```
> **Notas importantes del inversor:**
> - Tener en cuenta el **pico de arranque** de motores (puede ser 3-6x la potencia nominal durante unos segundos)
> - Arquitectura de **Alto Voltaje (HV):** para bancos grandes de baterías (ejemplo: 180 kWh necesita oscilar entre 160V y 700V)
> - Protección mínima: **IP65** para instalaciones en exterior

---

## EJEMPLO PRÁCTICO COMPLETO — HORNO INDUSTRIAL 20kW / 8h

**Datos del cliente:** Horno industrial de 20 kW que necesita funcionar 8 horas diarias.

### Paso 1 — Energía diaria necesaria
```
20 kW × 8 h = 160 kWh/día
```

### Paso 2 — Producción necesaria de placas (kWp)
```
160 kWh × 1,20 = 192 kWh/día (con factor pérdidas)
192 / (4,5 HSP × 0,80) = 53,3 kWp → redondeamos a 54 kWp
```

### Paso 3 — Número de placas (de 5 kWp cada una)
```
54 kWp / 5 kWp = 10,8 → redondeamos a 11 placas
```

### Paso 4 — Baterías de Litio (10 kWh por batería, DoD=90%)
```
160 kWh / 0,90 = 177,7 kWh → redondeamos a 178 kWh
178 / 10 kWh = 17,8 → redondeamos a 18 baterías
```

### Cobertura según irradiación:
| Escenario | HSP | Energía generada | Cobertura |
|---|---|---|---|
| Baja (invierno) | 3,5h | 151 kWh | 94% |
| Media (primavera/otoño) | 4,5h | 194 kWh | 121% |
| Alta (verano) | 5,5h | 238 kWh | 149% |

### Paso 5 — Amperios (sistema a 400V)
```
Capacidad de descarga: 20.000W / 400V = 50 A
Capacidad total: 160.000 Wh / 400V = 400 Ah
```

### Paso 6 — C-rate
```
C-rate = 20 kW / 180 kWh = 0,11 C → Excelente (muy por debajo de 1C)
```
Las baterías no se calentarán y durarán más (>6.000 ciclos).

### Paso 7 — Inversor necesario
```
20 kW × 1,25 = 25 kW de potencia nominal
```

---

## CÁLCULO SIMPLIFICADO CON BATERÍAS DE 5,1 kWh Y PLACAS DE 5,95 kWp

Este método más sencillo lo usa tu compañero como referencia rápida, **pero tiene errores importantes:**

### Versión del compañero (incorrecta):
- Baterías: 160 / 5,1 = **32 unidades** ❌
- Placas: 160 / 5,95 = **27 unidades** ❌

### Por qué están mal:

**Error en baterías:** no aplica DoD ni factor de eficiencia del sistema (15-20%).
```
Cálculo correcto:
160 kWh / (0,90 DoD × 0,85 eficiencia) = 209 kWh necesarios
209 / 5,1 kWh = 41 baterías ✓
```
Instalar solo 32 baterías obliga a descargas profundas → vida útil cae de 10 años a menos de 5.

**Error en placas:** dividir kWh entre kWp es un error conceptual. Una placa de 5,95 kWp solo genera esa potencia durante las HSP.
```
Cálculo correcto:
54 kWp / 5,95 kWp por placa = 9,07 → 10 placas ✓
```

---

## OPTIMIZACIÓN — VARIABLES QUE PUEDES AJUSTAR

Una vez calculada la instalación base, es posible optimizar:

| Si cambias... | Efecto |
|---|---|
| Más HSP (orientación sur, inclinación óptima 30-35°) | Menos placas necesarias |
| Mayor DoD de batería | Menos baterías (pero más desgaste) |
| Voltaje del sistema más alto (HV) | Menos amperios, cables más finos → ahorro |
| Inversor con gestión inteligente de carga | Mayor aprovechamiento |

---

## PARA GESTIÓN — LO QUE DEBES SABER DE UNA OFERTA SOLAR

Cuando llegue un presupuesto solar a tu mesa:

| Línea del presupuesto | Qué es |
|---|---|
| **kWp instalados** | Potencia total de las placas |
| **Capacidad de almacenamiento (kWh)** | Total de energía que guardan las baterías |
| **Inversor (kW)** | Debe ser ≥ consumo máximo × 1,25 |
| **Tiempo de retorno** | Años hasta recuperar la inversión. Hoy: 5-8 años en industria |
| **Producción anual estimada (kWh/año)** | Base para calcular el ahorro en factura |

> **Importante para presupuestos:** los cálculos solares deben ser revisados por un técnico habilitado. Este documento sirve para entender y verificar las propuestas, no para firmarlas sin validación técnica.

---

*Documento elaborado y mejorado para Aurora — Araiz Suministros Eléctricos — Marzo 2026*
