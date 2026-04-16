# DOMÓTICA — SISTEMAS DE CONTROL INTELIGENTE DE EDIFICIOS
### Guía técnica para Aurora

---

## ¿QUÉ ES LA DOMÓTICA?

La domótica es el conjunto de sistemas que permiten controlar y automatizar una vivienda o edificio: luces, persianas, climatización, seguridad, riego, electrodomésticos...

**Analogía de gestión:** es como el ERP de un edificio — integra todos los sistemas bajo una misma plataforma de control.

---

## COMPONENTES BÁSICOS DE UN SISTEMA DOMÓTICO

| Componente | Función | Ejemplo |
|---|---|---|
| **Controlador / Gateway** | Centralita que comunica todos los dispositivos | Hub KNX, pasarela Zigbee |
| **Actuadores** | Ejecutan las órdenes (encender luz, subir persiana) | Relé inteligente, actuador de persiana |
| **Sensores** | Detectan condiciones del entorno | Sensor de presencia, temperatura, humo, inundación |
| **Interfaces** | Permiten al usuario dar órdenes | Pulsador inteligente, pantalla táctil, app móvil |

---

## PROTOCOLOS DE COMUNICACIÓN — LA "LENGUA" DE LOS DISPOSITIVOS

### KNX — El estándar profesional (cableado)

**Para obra nueva y proyectos de alta gama.** Es el rey de la domótica profesional en España y Europa.

| Característica | Valor técnico |
|---|---|
| Tipo de cable | 2x2x0,8mm (par trenzado apantallado) |
| Tensión de alimentación | 29V DC (margen operativo 21-30V) |
| Protocolo | EIB/KNX (estándar abierto europeo) |
| Vida útil estimada | > 20 años |
| Topología | Bus / árbol |

**Ventaja clave:** es **descentralizado** — si un dispositivo falla, el resto sigue funcionando. No depende de una centralita única.

**Marcas que trabajan con KNX:** Siemens, ABB, Schneider, Hager (tebis), Jung, Gira, Legrand.

---

### Protocolos inalámbricos — Para reformas (sin obra)

Cuando no es posible pasar cable nuevo, los sistemas inalámbricos son la solución.

| Protocolo | Frecuencia | Topología | Ventajas | Limitaciones |
|---|---|---|---|---|
| **Zigbee 3.0** | 2,4 GHz | Mesh (malla) | Bajo consumo, muy económico, mesh = buena cobertura | Puede interferir con WiFi doméstico |
| **Z-Wave** | < 1 GHz | Mesh | Penetra mejor paredes, muy fiable | Coste de dispositivos más alto |
| **Wi-Fi** | 2,4 / 5 GHz | Estrella | Fácil instalación, sin hub extra | Alto consumo energético, colapsa con muchos dispositivos |
| **Matter** | IP (variable) | Híbrida | Interoperabilidad entre marcas (Apple, Google, Amazon) | Protocolo emergente, aún en maduración |

> **Matter** no reemplaza a Zigbee ni Z-Wave: actúa como **capa de lenguaje común** para que dispositivos de diferentes marcas hablen entre sí sin puentes propietarios.

---

## COMPARATIVA RÁPIDA

| Sistema | Medio | Ideal para | Coste instalación |
|---|---|---|---|
| **KNX** | Cable | Obra nueva, lujo, edificios | Alto |
| **Zigbee** | Inalámbrico | Reformas, bajo presupuesto | Bajo-Medio |
| **Z-Wave** | Inalámbrico | Reformas con fiabilidad | Medio |
| **WiFi** | Inalámbrico | Dispositivos individuales | Bajo |
| **Matter** | Inalámbrico | Ecosistemas mixtos (futuro) | Variable |

---

## INFRAESTRUCTURA FÍSICA — LO QUE NADIE CUENTA

### El problema del conductor neutro

Este es el error más frecuente en instalaciones domóticas en viviendas existentes:

**El problema:** Los interruptores tradicionales solo tienen cable de **fase** (para interrumpir la corriente). Los interruptores inteligentes necesitan estar **siempre alimentados** (necesitan fase + neutro) para mantener la conectividad Zigbee/WiFi.

**Síntoma:** Si no hay neutro → **parpadeos en LEDs** y desconexiones intermitentes del sistema domótico.

**Soluciones:**
1. Pasar un cable de neutro desde el registro más cercano
2. Instalar un "bypass" (carga ficticia que permite paso de corriente mínima)

### Dimensionamiento de cajas — Más profundidad de lo normal

| Tipo de instalación | Profundidad de caja necesaria |
|---|---|
| Instalación eléctrica estándar | 40 mm |
| Instalación domótica profesional | Mínimo **47 mm**, recomendado **67 mm** |

Los micromódulos domóticos ocupan más espacio que un interruptor convencional.

---

## MATERIALES ESPECÍFICOS PARA DOMÓTICA (Lo que vende Araiz)

### Para KNX:
- **Cable bus KNX** (YCYM 2x2x0,8mm o equivalente)
- **Fuentes de alimentación KNX** (29V DC)
- **Actuadores de persiana, calefacción, iluminación** (Siemens, ABB, Hager)
- **Pulsadores KNX** (Gira, Jung, Berker, Siemens)
- **Interfaces KNX-IP** (para control desde app)
- **Interruptores crepusculares y sensores de presencia KNX**

### Para sistemas inalámbricos:
- **Hubs/Gateways** (Zigbee2MQTT, Philips Hue Bridge, Samsung SmartThings)
- **Actuadores de relé inalámbricos** (Sonoff, Shelly, Aqara)
- **Sensores de presencia, temperatura, inundación**
- **Bombillas inteligentes** (Philips Hue, IKEA Tradfri)
- **Tomas de corriente inteligentes**

---

## SISTEMAS DOMÓTICOS POR FABRICANTE (Lo que distribuye Araiz)

| Fabricante | Sistema | Nivel | Protocolo |
|---|---|---|---|
| **Schneider** | Wiser | Residencial medio | Zigbee |
| **Siemens** | LOGO! + KNX | Industrial/residencial | KNX / propietario |
| **ABB** | ABB-free@home | Residencial profesional | Propietario / KNX |
| **Hager** | tebis KNX | Profesional | KNX |
| **Legrand** | BTicino MyHOME | Profesional | Propietario / KNX |
| **Simon** | Simon iO | Residencial | Inalámbrico propio |

---

## PARA GESTIÓN — CLAVES DE UN PEDIDO DOMÓTICO

**Preguntas antes de presupuestar:**

1. ¿Obra nueva o reforma (hay cableado o no)?
2. ¿Cuántos puntos de control? (interruptores, persianas, enchufes)
3. ¿Sistema centralizado (KNX) o dispositivos individuales?
4. ¿Presupuesto estimado? (KNX puede suponer 3.000-10.000€ en una vivienda)
5. ¿Necesita integración con alarma, calefacción, cámaras?

> **Tip de gestión:** la domótica KNX es uno de los segmentos de mayor margen en material eléctrico. Un proyecto KNX completo para vivienda puede llegar a 15.000-30.000€ en materiales. Los instaladores especializados son clientes de alto valor para Araiz.

---

*Documento elaborado y mejorado para Aurora — Araiz Suministros Eléctricos — Marzo 2026*
