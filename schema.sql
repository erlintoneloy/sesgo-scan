DROP TABLE IF EXISTS auditorias;

CREATE TABLE IF NOT EXISTS auditorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grupo_a_aprobados INTEGER,
  grupo_a_total INTEGER,
  grupo_b_aprobados INTEGER,
  grupo_b_total INTEGER,
  veredicto_ia TEXT,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);
