# REBT — REGLAMENTO ELECTROTÉCNICO DE BAJA TENSIÓN
### Conceptos básicos para Aurora

---

## CONCEPTOS FUNDAMENTALES

| Magnitud | Unidad | Descripción simple | Protección relacionada |
|---|---|---|---|
| **Tensión** | Voltios (V) | "La presión" con la que circula la corriente | Dispositivo de sobretensión (SPD) |
| **Intensidad** | Amperios (A) | "El caudal" de corriente que circula | IGA / Magnetotérmico |
| **Potencia** | Vatios (W) | El consumo real del aparato | — |
| **Frecuencia** | Hercios (Hz) | Ritmo al que la corriente alterna cambia de dirección (50 Hz en España) | — |

**Tensiones habituales en España:**
- **230V** = fase-neutro (enchufes domésticos, aparatos monofásicos)
- **400V** = fase-fase (motores industriales, trifásico)

---

## TUBOS Y CANALIZACIONES

### 1. Tubo Corrugado Reforzado (Forroplast)
- **Uso:** rozas en paredes de viviendas y edificios
- **Métricas exteriores:** 16, 20, 25, 32, 40 y 50 mm
- **Presentación:** rollos de 100m (M16/M20), 75m (M25), 50m (M32), 25m (M40/M50)
- **Código de clasificación:** 4421 (Fuerte/Fuerte/-5°C/+60°C)

### 2. Tubo Corrugado ALH Gris (Libre de Halógenos)
- **Diferencia clave vs. PVC:** fabricado con poliolefinas ignífugas sin halógenos
- **Marcado:** FKHF (Free from Halogen)
- **Uso obligatorio en:** hospitales, centros comerciales, túneles, colegios

### 3. Tubo de Acero
- **EMT** (Electric Metallic Tubing): pared delgada, no roscado, uso en interior
- **IMC** (Intermediate Metallic Conduit): más grueso, roscado, uso en exterior
- **Métricas:** 16 a 63 mm

### 4. Tubo CAFSA / Metálico Flexible ("Traqueado")
- **Uso:** conexión final a motores y maquinaria (absorbe vibraciones)
- **"Sin chapa":** solo espiral metálica galvanizada
- **Con PVC (Ecoflex):** añade estanqueidad frente a líquidos y aceites
- **Presentación:** rollos de 25 metros

### 5. Tubo Decaplast (Subterráneo)
- **Uso:** canalización bajo tierra para cables eléctricos
- **Métricas:** 40, 50, 63, 75, 90, 110, 125, 160 y 200 mm
- **Profundidad mínima:** 45 cm bajo aceras / 60 cm en otros casos
- **Regla importante:** no instalar más de un circuito eléctrico por tubo

### 6. Bandejas (Metálica lisa, rejilla o chapa perforada)
- **Uso:** naves industriales y edificios para grandes grupos de cables
- **Cable recomendado en bandejas:** RZ1-K (0,6/1 kV con cubierta protectora)

### 7. Canaletas de Superficie (Plástico o metal)
- **Uso:** instalaciones vistas en oficinas, locales, interior de cuadros

---

## CÓDIGO DE CLASIFICACIÓN DE TUBOS (4 dígitos)

| Posición | Característica | Ejemplo: código **4421** |
|---|---|---|
| 1er dígito | Resistencia a la compresión (1=muy ligero, 5=muy fuerte) | **4** = Fuerte (1.250 N) |
| 2º dígito | Resistencia al impacto (1=muy ligero, 5=muy fuerte) | **4** = Fuerte (6 Julios) |
| 3er dígito | Temperatura mínima de instalación | **2** = -5°C |
| 4º dígito | Temperatura máxima de instalación | **1** = +60°C |

---

## CUADRO ELÉCTRICO BÁSICO DE VIVIENDA (REBT ITC-BT-25)

### Protecciones obligatorias en el cuadro:
- **ICP** (Interruptor de Control de Potencia): lo pone la compañía eléctrica
- **IGA** (Interruptor General Automático): mínimo 25A — protege toda la instalación
- **Dispositivo de Sobretensión (SPD)**: protege los equipos de picos de tensión (rayos, etc.)
- **ID** (Interruptor Diferencial): igual o mayor que el IGA, sensibilidad máxima 30mA — protege personas

### Circuitos interiores estándar:

| Circuito | Amperios | Para qué sirve |
|---|---|---|
| C1 | 10A | Iluminación (1 circuito por cada 30 puntos de luz) |
| C2 | 16A | Tomas de uso general (1 por cada 20 tomas) |
| C3 | 25A | Cocina y horno |
| C4 | 20A | Lavadora, lavavajillas, termo eléctrico |
| C5 | 16A | Tomas de baño y cocina |
| C8 | 25A | Calefacción eléctrica (adicional) |
| C9 | 25A | Aire acondicionado (adicional) |
| C10 | 16A | Secadora (adicional) |
| C11 | 10A | Domótica (adicional) |

---

## LOS TRES PROTECTORES DEL CUADRO — DIFERENCIAS CLAVE

### IGA (Magnetotérmico General)
- **Vigila:** Amperios (intensidad)
- **Actúa ante:** sobrecargas (demasiados aparatos) y cortocircuitos
- **Protege:** la instalación eléctrica y los cables

### Dispositivo de Sobretensión (SPD)
- **Vigila:** Voltios (tensión)
- **Actúa ante:** subidas de tensión (rayos, fallos de red)
- **Protege:** los aparatos electrónicos (TV, ordenadores, electrodomésticos)

### Diferencial (ID)
- **Vigila:** fugas de corriente (en mA — miliamperios)
- **Actúa ante:** corriente que "se escapa" por un defecto o contacto eléctrico
- **Protege:** las personas contra electrocución (corta en <30ms)

---

## CURVAS DE DISPARO DE LOS MAGNETOTÉRMICOS

| Curva | Uso típico | Característica |
|---|---|---|
| **Curva B** | Viviendas, alumbrado | Dispara con poca sobreintensidad (3-5x In) |
| **Curva C** | Uso general, motores pequeños | Dispara con sobreintensidad media (5-10x In) — la más común |
| **Curva D** | Motores industriales, transformadores | Aguanta grandes picos de arranque (10-20x In) |

> **Regla práctica:** en viviendas y oficinas casi siempre Curva C. En industria con motores grandes, Curva D.

---

## FUNCIÓN DEL NEUTRO

El conductor neutro tiene dos funciones esenciales:

1. **Obtener 230V para uso doméstico:** en redes trifásicas de 400V, tomando una fase y el neutro se obtienen los 230V que necesitan enchufes y aparatos.

2. **Cerrar el circuito eléctrico:** la corriente necesita un camino de ida (fase) y uno de vuelta (neutro) para que el circuito funcione.

> **Regla de colores (obligatorio en España):**
> - **Marrón / Negro / Gris** = Fases (L1, L2, L3)
> - **Azul** = Neutro
> - **Amarillo/Verde** = Tierra (protección)

---

## FUSIBLES — TIPOS PRINCIPALES

| Tipo | Uso | Característica |
|---|---|---|
| **gG** | Protección general de cables | Fundición lenta — absorbe sobrecargas |
| **aM** | Protección de motores | Solo corta cortocircuitos — aguanta arranques |
| **gR** | Semiconductores y electrónica sensible | Muy rápido — protege componentes delicados |

> **Para gestión:** los fusibles gG son los más vendidos en distribuidoras. Los aM van siempre asociados a motores. Los gR son de nicho pero caros.

---

*Documento elaborado y mejorado para Aurora — Araiz Suministros Eléctricos — Marzo 2026*
*Basado en el documento original de Aurora + REBT (RD 842/2002)*
