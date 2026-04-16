# ANTENAS E INFRAESTRUCTURA DE TELECOMUNICACIONES (ICT)
### Guía técnica para Aurora

---

## ¿QUÉ ES LA ICT?

La **ICT (Infraestructura Común de Telecomunicaciones)** es la instalación que permite a todos los vecinos de un edificio recibir señales de televisión, radio y acceder a servicios de telecomunicaciones. Es **obligatoria** en todos los edificios nuevos de más de una vivienda.

**Marco normativo:** Real Decreto 346/2011 (Reglamento ICT) y sus actualizaciones.

---

## ESTRUCTURA DE LA ICT — DESDE EL TEJADO HASTA EL TELEVISOR

```
ANTENA EN TEJADO (TDT / Satélite)
          ↓
AMPLIFICADOR DE CABECERA (amplifica y procesa señal)
          ↓
RECINTO DE TELECOMUNICACIONES SUPERIOR (RITS)
          ↓
CABLE TRONCAL (baja por el edificio)
          ↓
REGISTROS SECUNDARIOS DE PLANTA
          ↓
PUNTO DE ACCESO AL USUARIO (PAU) — dentro del piso
          ↓
TOMAS DE TELEVISOR en cada habitación
```

### Dimensiones normalizadas de registros secundarios:
- Hasta 20 PAUs: **450 × 450 × 150 mm**
- Más de 20 PAUs: dimensiones mayores según número

### Canalizaciones:
- Tubo de **50 mm** para canalización principal ICT
- Canales y bandejas en los recintos (RITI/RITS)

---

## CAPTACIÓN TDT — ANTENAS UHF Y EL PROBLEMA DEL 5G

### El desafío del 5G

Con el despliegue de las redes 5G en la banda de **700 MHz**, la señal móvil interfiere con la TDT (que opera hasta los 694 MHz). Esto obliga a filtrar activamente las señales de 5G para que no entren en el sistema de distribución del edificio.

**Síntoma de interferencia 5G:** pixelado o desaparición de canales de TDT, especialmente en edificios cercanos a antenas de telefonía.

---

### Tipos de antenas para TDT (UHF)

| Tipo | Tecnología | Ventajas | Limitaciones |
|---|---|---|---|
| **Antena pasiva** (Yagi-Uda clásica) | Solo geometría | Económica, sin alimentación | No se adapta a variaciones de señal, sin protección 5G |
| **Antena inteligente** (dipolo activo) | BOSSTech / AGC | Control automático de ganancia, filtros SAW integrados | Necesita alimentación (corriente por el coaxial) |

### Antenas inteligentes recomendadas:
- **Televés Ellipse** (con BOSSTech)
- **Televés DAT BOSS**
- **Televes Dinova Boss Mix**

**Ventaja clave:** estas antenas con dipolo activo controlan el nivel de salida en tiempo real y pueden **eliminar la necesidad de amplificador de mástil** en muchas instalaciones → menos ruido, mejor calidad.

---

### Filtros LTE/5G — Obligatorios en instalaciones nuevas

Los filtros LTE/5G se instalan **antes del amplificador de cabecera** para evitar la saturación del sistema.

| Tipo de filtro | Rechazo de señal 5G | Colocación |
|---|---|---|
| **Rechazo medio (Medium Rejection)** | ~20 dB | Cuando la señal 5G no es muy intensa |
| **Alto rechazo (High Rejection)** | > 30 dB | Cerca de torres 5G o señal muy intensa |
| **De exterior (chasis Zamak)** | Alto rechazo + blindaje | Instalados en mástil, junto a la antena |
| **De interior enchufable** | Rechazo medio | En cabecera del RITS |

> **Regla técnica:** el filtro siempre va **antes del amplificador** para procesar solo las frecuencias deseadas (hasta canal 48, 694 MHz) y bloquear el 5G (>700 MHz).

---

## CAPTACIÓN POR SATÉLITE — ANTENA PARABÓLICA

### ¿Por qué satélite?
- Mayor número de canales (internacionales, pago)
- Señal independiente de la red terrestre
- Ideal para zonas rurales sin buena cobertura TDT

### Parámetros de instalación:
- **Banda Ku:** 10,7 a 12,75 GHz — necesita apuntamiento exacto
- **Azimut:** ángulo horizontal (Norte → Este → Sur → Oeste) para orientar la parabólica
- **Elevación:** ángulo vertical respecto al horizonte
- **Polarización:** el LNB debe girar al ángulo correcto según el satélite

**Los satélites más usados en España:**
- **Astra 19,2°E** (más canales europeos, plataforma Movistar+ y Canal+)
- **Hispasat 30°O** (canales españoles y latinoamericanos)
- **Eutelsat Hot Bird 13°E** (canales internacionales)

### Componentes de una instalación de satélite:
- **Antena parabólica** (80cm para uso residencial, 120cm+ para profesional)
- **LNB (Low Noise Block):** amplificador de bajo ruido en el foco de la parabólica
  - **Universal Single:** 1 receptor
  - **Quad:** 4 receptores independientes
  - **Quattro:** para distribuir por red (con multiswitch)
- **Multiswitch:** distribuye la señal de satélite a múltiples tomas (necesario en edificios)

---

## COMPONENTES Y MATERIALES DE LA CABECERA ICT

| Componente | Función | Marcas habituales |
|---|---|---|
| **Amplificador de cabecera** | Amplifica la señal de antena antes de distribuirla | Televés, Alcad, Ikusi |
| **Mezclador TDT/SAT** | Combina señal terrestre y satélite en un solo cable | Televés, Alcad |
| **Repartidor/Derivador** | Divide la señal en varias salidas | Televés, Fagor |
| **Cable coaxial** (RG-6 / RG-11) | Transporta la señal RF por el edificio | Televés, Tecatel, Remm |
| **Toma de usuario final** | El conector en la pared del piso | Televés, Schneider, Legrand |
| **Filtro LTE/5G** | Elimina interferencias de telefonía móvil | Televés, Alcad |

---

## DOCUMENTACIÓN OBLIGATORIA AL FINALIZAR UNA INSTALACIÓN ICT

- **Boletín de instalación ICT** (cualquier edificio)
- **Certificado de fin de obra** + **protocolo de pruebas** (edificios > 20 viviendas o con amplificación activa)
- El protocolo de pruebas incluye medidas de señal en cada toma del edificio (niveles dentro de rangos normativos)

---

## PARA GESTIÓN — LO QUE DEBES SABER DE LOS PEDIDOS DE ANTENAS/ICT

| Tipo de pedido | Quién lo pide | Importe habitual |
|---|---|---|
| Kit de antena + amplificador comunitario | Instalador de telecomunicaciones | 200-600€ |
| Material completo ICT edificio nuevo | Empresa instaladora (con proyecto) | 2.000-15.000€ |
| Sustitución de amplificador (avería) | Instalador / comunidad de vecinos | 100-300€ |
| Filtro LTE/5G (retrofit) | Instalador (solución problema de interferencias) | 30-100€ |

> **Tip:** con el despliegue del 5G, los pedidos de **filtros LTE** son uno de los de mayor crecimiento en los últimos años. Es un producto de alto margen y rápida instalación.

---

*Documento elaborado y mejorado para Aurora — Araiz Suministros Eléctricos — Marzo 2026*
