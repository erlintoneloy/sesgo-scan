export default {
  async fetch(request, env) {
    // Manejo de CORS para que el frontend pueda comunicarse
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Ruta principal: Analizar datos
    if (url.pathname === '/api/analizar' && request.method === 'POST') {
      try {
        const body = await request.json();
        const grupoAaprobados = Number(body.a_aprobados ?? 0);
        const grupoAtotal = Number(body.a_total ?? 0);
        const grupoBaprobados = Number(body.b_aprobados ?? 0);
        const grupoBtotal = Number(body.b_total ?? 0);

        const tasaA = grupoAtotal > 0 ? grupoAaprobados / grupoAtotal : 0;
        const tasaB = grupoBtotal > 0 ? grupoBaprobados / grupoBtotal : 0;
        const minTasa = Math.min(tasaA, tasaB);
        const maxTasa = Math.max(tasaA, tasaB);
        const ratio = maxTasa === 0 ? 1 : minTasa / maxTasa;
        const haySesgo = ratio < 0.8;
        
        // 2. Usar Workers AI para explicar el resultado
        const promptSistema = "Eres un auditor experto en ética de datos. Redacta un veredicto breve (máximo 3 oraciones) explicando si los datos muestran sesgo y por qué.";
        const promptUsuario = `Tasa Grupo A: ${(tasaA * 100).toFixed(1)}%. Tasa Grupo B: ${(tasaB * 100).toFixed(1)}%. ¿Hay sesgo crítico según la regla del 80%? ${haySesgo ? "SÍ" : "NO"}. Explica esto a un funcionario público de forma empática y clara.`;

        let explicacionIA = `La regla del 80% indica que la relación entre tasas es ${ratio.toFixed(2)}. ${haySesgo ? "Se detecta una alerta de sesgo crítico." : "No se detecta una alerta de sesgo crítico."}`;

        if (env?.AI?.run) {
          const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
            messages: [
              { role: "system", content: promptSistema },
              { role: "user", content: promptUsuario },
            ],
          });

          explicacionIA = aiResponse?.response ?? explicacionIA;
        }

        if (env?.db_sesgo?.prepare) {
          await env.db_sesgo
            .prepare(
              `INSERT INTO auditorias (grupo_a_aprobados, grupo_a_total, grupo_b_aprobados, grupo_b_total, veredicto_ia) VALUES (?, ?, ?, ?, ?)`
            )
            .bind(grupoAaprobados, grupoAtotal, grupoBaprobados, grupoBtotal, explicacionIA)
            .run();
        }

        return Response.json(
          {
            exito: true,
            metricas: {
              tasa_a: `${(tasaA * 100).toFixed(1)}%`,
              tasa_b: `${(tasaB * 100).toFixed(1)}%`,
              ratio: ratio.toFixed(2),
              alerta_sesgo: haySesgo,
            },
            veredicto: explicacionIA,
          },
          { headers: corsHeaders }
        );
      } catch (error) {
        return Response.json(
          { exito: false, error: error instanceof Error ? error.message : "Unknown error" },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    if (env?.ASSETS?.fetch) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};
