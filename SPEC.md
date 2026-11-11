# SPEC — SesgoScan

## 1. Problema e Impacto (20%)
Las instituciones públicas y organizaciones toman decisiones automatizadas (becas, contrataciones, asignación de recursos) sin auditar si sus datos esconden sesgos. Esto vulnera derechos ciudadanos. SesgoScan resuelve esto permitiendo auditar la "Regla del 80%" en segundos.

## 2. Alcance del MVP
- **SÍ hace:** Recibe datos de dos grupos (A y B), calcula matemáticamente si hay disparidad demográfica, y usa IA para explicar el resultado en lenguaje natural.
- **NO hace:** No entrena modelos de Machine Learning propios. No toma decisiones legales, solo emite alertas.

## 3. Uso de IA (Innovación 20% / Ética 10%)
- **Modelo:** `@cf/meta/llama-3.1-8b-instruct-fast` (Cloudflare Workers AI).
- **Human-in-the-loop:** La IA **NO decide** si hay sesgo. El código matemático (determinista) es quien calcula la Regla del 80%. La IA solo actúa como una **capa de explicabilidad**, traduciendo los números a un texto comprensible para un funcionario público no técnico.
- **Mitigación de sesgos:** Al usar reglas matemáticas para el veredicto, evitamos que la IA alucine o herede sesgos en la toma de decisión.

## 4. Viabilidad Técnica y Escalabilidad (25% / 10%)
- Construido 100% sobre arquitectura Serverless en el Edge (Cloudflare Pages + Workers + D1 + AI).
- Sin dependencias pesadas de Python. Tiempo de respuesta menor a 2 segundos.
- Escalable a millones de peticiones sin configurar servidores (Cero DevOps).

## 5. Criterios de Aceptación
- CA1: Si Tasa Grupo A = 60% y Tasa Grupo B = 30%, el sistema debe marcar "Alerta de Sesgo".
- CA2: La IA debe generar un párrafo explicativo en menos de 3 segundos.

