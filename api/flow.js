export default async function handler(req, res) {
  // 1. Solo aceptamos avisos por método POST (que es el que usa Flow)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Solo se aceptan peticiones POST desde Flow" });
  }

  try {
    // 2. Capturamos los datos que nos manda Flow (ej: el email del pagador)
    // Nota: Flow manda un "token" que luego se canjea, pero para mantener 
    // tu MVP simple y funcional hoy, simularemos la captura directa del correo.
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ error: "Falta el correo del alumno" });
    }

    // 3. El cálculo matemático: Hoy + 30 días
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 30);
    const nuevaFechaVencimiento = fechaActual.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // 4. (Aquí irá la conexión a Firebase para guardar la 'nuevaFechaVencimiento')
    // Por ahora le diremos a Flow que recibimos el mensaje con éxito
    
    console.log(`Pago recibido de: ${email}. Nuevo vencimiento: ${nuevaFechaVencimiento}`);
    
    return res.status(200).json({ 
      status: "Éxito", 
      mensaje: "Membresía actualizada a 30 días",
      alumno: email,
      vence: nuevaFechaVencimiento
    });

  } catch (error) {
    console.error("Error en el puente de pago:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
