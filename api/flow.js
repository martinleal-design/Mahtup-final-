export default function handler(req, res) {
  // Si alguien entra a este link, Vercel responderá esto:
  res.status(200).json({ mensaje: "¡El puente de MATHUP está vivo y esperando a Flow!" });
}
