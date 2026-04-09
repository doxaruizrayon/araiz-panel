# Contexto — Última actualización: 2026-04-09

## Qué se hizo en esta sesión
- Completado el **Grupo Interruptor y conmutador manual** — 6 cuadros (132→138)
- Completado el **Grupo Arrancadores e inversores** — 5 cuadros (138→143)
- Total grupos completados: **9 de 26**
- Modelo cambiado a Sonnet 4.6 al inicio de sesión
- Reglas de flujo actualizadas en memoria: no borrar, no reiniciar panel hasta terminar Aparellaje completo, no mostrar código

## Cuadros escritos hoy — Arrancadores e inversores
- `arrancador_directo_combinado.txt` — DOL y combinado en caja (Siemens 3RA, Eaton xStart)
- `arrancador_suave_progresivo.txt` — Soft starter 3RW/PSR/DS7/ATS + ATS01 progresivo
- `combinacion_contactores_arranque.txt` — Kits E-Δ e inversores (LC3D, 3RA3)
- `variador_frecuencia_aparellaje.txt` — PowerXL Eaton + Omron
- `accesorios_arrancadores.txt` — Bloques disparo MN/MX, contactos aux, peines

## Cuadros escritos hoy — Interruptores
- `seccionador_manual.txt`, `conmutador_carga_red.txt`, `interruptor_leva_control.txt`
- `magnetotermico_diferencial_modular.txt`, `disyuntor_guardamotor.txt`, `accesorios_interruptores_manuales.txt`

## Decisiones importantes
- No reiniciar el panel hasta terminar TODOS los grupos de Aparellaje eléctrico
- No borrar archivos temporales sin que Aurora lo pida
- No mostrar código durante el trabajo

## Próximo paso exacto
1. **Continuar con el siguiente grupo de Aparellaje eléctrico**
   — Consultar la tabla de 26 grupos para saber cuál es el grupo 10
   — Extraer datos con API Araiz
   — Planificar cuadros y escribirlos
2. El orden de los 26 grupos está en el log de sesión 2026-04-08

## Archivos temporales en disco (no borrar hasta que Aurora lo diga)
- `extraer_interruptores.js` + `interruptores_completo.json`
- `extraer_arrancadores.js` + `arrancadores_completo.json`
