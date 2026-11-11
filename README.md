
markdown
# 🕵️‍♂️ SesgoScan | Auditoría Ética de Datos

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![IA Explicable](https://img.shields.io/badge/IA-Explicable-blue)](https://ai.cloudflare.com/)

SesgoScan es una herramienta de auditoría ética que detecta sesgos en decisiones públicas (como becas o contrataciones) usando la Regla del 80%. Utiliza Inteligencia Artificial para explicar los resultados a humanos, garantizando transparencia.

## 🚀 Demo Funcional
Puedes probar la aplicación en vivo aquí:
👉 **[https://sesgo-scan.piloto-sesgo-scan.workers.dev](https://sesgo-scan.piloto-sesgo-scan.workers.dev)**
*(Nota: El enlace se activará tras el despliegue final)*

## ⚙️ Stack Tecnológico
- **Frontend:** HTML5, CSS3, Vanilla JS (Diseño oscuro custom).
- **Backend:** Cloudflare Workers (JavaScript).
- **Base de Datos:** Cloudflare D1 (SQLite Serverless).
- **Inteligencia Artificial:** Llama 3.1 (Workers AI).

## 🛠️ Instalación y Desarrollo Local
1. Clonar el repositorio:
```bash
git clone https://github.com/TU_USUARIO/sesgo-scan.git
```
2. Instalar dependencias:
```bash
    npm install
```
3. Crear la base de datos D1 y la tabla (ver `schema.sql`).

4. Correr en modo desarrollo:
```bash
    npx wrangler dev
```
## 🧠 Filosofía de IA Ética
Este proyecto fue diseñado bajo el principio de **"IA Explicable"**. El cálculo del sesgo es determinista y transparente. La IA actúa únicamente como un traductor de datos complejos a un lenguaje empático y accionable para el tomador de decisiones.
