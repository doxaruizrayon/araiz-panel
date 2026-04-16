# MATERIAL ELÉCTRICO BÁSICO — GUÍA PARA AURORA

> Todo lo que necesitas saber sobre el material eléctrico más habitual, explicado sin tecnicismos.

---

## 1. PROTECCIÓN ELÉCTRICA — "Los guardas de la instalación"

### Interruptor Magnetotérmico (IGA / ICP / PIA)
**¿Qué es?** El "automático" que salta cuando hay sobrecarga o cortocircuito.
**En casa:** El cuadro de la vivienda tiene varios de estos.
**En industria:** Los hay desde 1A hasta miles de amperios.
**Se identifica por:** Número de amperios (ej: 16A, 25A, 63A) y número de polos (1P, 2P, 3P, 4P).
**Marcas:** Legrand, Hager, Schneider, ABB, Siemens.
**Precio:** Desde 5€ (pequeños domésticos) hasta cientos de euros (industriales grandes).

---

### Interruptor Diferencial (ID)
**¿Qué es?** Protege a las personas contra electrocución.
**Cómo funciona:** Si detecta que "se escapa" corriente (por ejemplo, a través de una persona), corta el suministro en milisegundos.
**Se identifica por:** Sensibilidad en mA (30mA para uso doméstico, 300mA para uso industrial) y amperios.
**Marcas:** Legrand, Hager, Schneider, ABB.
**Precio:** Desde 20€ hasta 150€.

---

### Fusible
**¿Qué es?** El más sencillo de los dispositivos de protección: un hilo que se funde si pasa demasiada corriente.
**Ventaja sobre el magneto:** Reacciona más rápido. Se usa mucho en armarios industriales.
**Se identifica por:** Amperios, tipo (gG, aM, gR...) y tamaño (NH00, NH1, cilíndrico 10x38...).
**Marcas:** ETI, Legrand, Schneider, Siemens.
**Precio:** Desde céntimos (pequeños) hasta 50€ (grandes).

---

### Limitador de Sobretensiones (SPD / Descargador)
**¿Qué es?** Protege los equipos electrónicos contra rayos o picos de tensión de la red.
**Analogía:** Como un paraguas electrónico: absorbe el golpe antes de que llegue a los equipos.
**Obligatorio en:** Edificios con pararrayos, instalaciones con equipos sensibles.
**Marcas:** Schneider, ABB, OBO Bettermann, Dehn.

---

## 2. CABLEADO — "Las venas de la instalación"

### Tipos de cable más habituales

| Tipo | Uso | Color habitual |
|---|---|---|
| H07V-K (hilo flexible) | Interior de cuadros, conexionado | Varios colores |
| RZ1-K (libre halógenos) | Instalaciones donde la seguridad ante incendios es crítica | Gris/verde |
| RV-K | Instalación fija en interior/exterior | Negro |
| SZ1-K | Edificios públicos, hospitales, túneles | Naranja |
| AFUMEX | Marca Prysmian, libre halógenos, muy usado | Gris/verde |
| Cable apantallado (LiYCY) | Señales de automatización, evita interferencias | Gris |
| Cable solar (ZZ-F) | Instalaciones fotovoltaicas | Rojo/negro |

**Se identifica por:** Sección (mm²) — ej: 1,5mm², 2,5mm², 6mm², 16mm², 95mm²...
A mayor sección, más corriente soporta (y más caro).

---

## 3. CANALIZACIONES — "El esqueleto que ordena los cables"

### Bandeja de Cable
**¿Qué es?** Como una "canaleta grande" por donde van los cables en naves industriales y edificios.
**Tipos:** De escalera (para cables de potencia), perforada (uso general), ciega (zonas especiales).
**Material:** Acero (normal o galvanizado), acero inoxidable (alimentación/farmacia), fibra de vidrio (zonas químicas).
**Marcas:** Pemsa, Unex, Legrand, Schneider.

### Tubo Corrugado / Rígido / Flexible
- **Corrugado:** Para proteger cables en rozas de pared (instalación doméstica y terciaria).
- **Rígido:** Instalaciones vistas en exteriores o industriales.
- **Flexible metálico:** Conexión final a maquinaria (absorbe vibraciones).

### Canaleta
**¿Qué es?** Perfil plástico o metálico con tapa que recoge cables en superficies vistas.
**Se usa en:** Oficinas, cuadros eléctricos (organización interior).

---

## 4. ARMARIOS Y CUADROS — "La caja fuerte de la electrónica"

### Armario de Distribución
**¿Qué es?** Caja metálica o de plástico donde se alojan los elementos de protección y control.
**Tipos:**
- **Doméstico:** La caja de fusibles de casa.
- **Industrial:** Armario grande de acero, con puerta y cerradura.
- **Para automatización:** Armario con placa de montaje para PLC, variadores, etc.

**Fabricantes principales:** Rittal (referencia mundial), Schneider (Prisma), Legrand (Atlantic/XL3), ABB (Triline).

**Grado IP:** Cuanto mayor el número, más protegido contra polvo y agua.
- IP20: Interior, sin polvo especial
- IP55: Protección contra chorros de agua (industria)
- IP65: Totalmente estanco al polvo y chorros (exteriores)
- IP66/67: Inmersión temporal (muy exigentes)

---

## 5. TOMAS DE CORRIENTE INDUSTRIALES — "Los enchufes de fábrica"

### Cetac (CEE/IEC 60309)
**¿Qué es?** El "enchufe industrial" redondo con espiga de referencia. Estándar europeo.
**Se identifica por:**
- **Color azul:** 230V monofásico
- **Color rojo:** 400V trifásico
- **Amperios:** 16A, 32A, 63A, 125A

**Marcas:** Mennekes (líder), Legrand (P17), Schneider, ABB.

---

## 6. BORNES Y CONEXIONADO — "Las juntas de todo el sistema"

### Regleta de Bornes
**¿Qué es?** Pequeños bloques de plástico que permiten conectar y desconectar cables de forma ordenada.
**Son clave en los cuadros eléctricos:** Cada cable exterior entra por una borna numerada.
**Marcas:** Phoenix Contact (referencia mundial), Weidmüller, ABB, Legrand.

---

## CÓMO LEER UNA REFERENCIA DE PRODUCTO

Las referencias de material eléctrico parecen un código sin sentido, pero tienen lógica:

**Ejemplo: Schneider A9F74216**
- A9 = Gama Acti9 (doméstica/terciaria)
- F = iC60N (el modelo específico)
- 7 = curva C (tipo de disparo)
- 4 = 4 polos
- 216 = 16 amperios

**Ejemplo: Siemens 3RT2016-1AP01**
- 3RT = contactor de la gama 3RT
- 2016 = tamaño y versión
- 1AP = bobina 230V AC
- 01 = sin auxiliar

No tienes que memorizar los códigos, pero saber que "tienen lógica" te ayudará a entender por qué no se pueden intercambiar referencias de diferentes gamas o fabricantes.

---

## LO QUE MÁS SE VENDE EN UNA DISTRIBUIDORA ELÉCTRICA

Por volumen de operaciones:

1. **Cable** (el producto más vendido por metros/kg)
2. **Magnetotérmicos y diferenciales** (muy alta rotación)
3. **Contactores y variadores** (alto valor por unidad)
4. **Luminarias LED** (gran demanda desde la transición energética)
5. **Cargadores para vehículo eléctrico** (en fuerte crecimiento)
6. **Equipos fotovoltaicos** (boom renovable)
7. **Canalizaciones** (constante en obras)

---

*Documento elaborado para Aurora — Araiz Suministros Eléctricos — Marzo 2026*
