INSERT INTO students (full_name, email) VALUES
  ('Ana Torres', 'ana@example.test'),
  ('Diego López', 'diego@example.test'),
  ('María González', 'maria@example.test'),
  ('Luis Pérez', 'luis@example.test')
ON CONFLICT (email) DO NOTHING;

INSERT INTO courses (code, title) VALUES
  ('NUBE-101', 'Cómputo en la Nube'),
  ('BD-201', 'Bases de Datos'),
  ('WEB-301', 'Desarrollo Web')
ON CONFLICT (code) DO NOTHING;

INSERT INTO grades (student_id, course_id, score)
SELECT s.id, c.id, input.score
FROM (VALUES
  ('ana@example.test', 'NUBE-101', 94.00),
  ('ana@example.test', 'BD-201', 88.00),
  ('diego@example.test', 'NUBE-101', 79.00),
  ('maria@example.test', 'WEB-301', 91.00),
  ('luis@example.test', 'BD-201', 85.00)
) AS input(email, code, score)
JOIN students s ON s.email = input.email
JOIN courses c ON c.code = input.code
WHERE TRUE
ON CONFLICT (student_id, course_id) DO NOTHING;