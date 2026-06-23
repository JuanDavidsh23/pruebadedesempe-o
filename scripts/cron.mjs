// Cron job diario: cada día a las 8:00 llama al endpoint que envía el reporte de ventas del mes.
// Se ejecuta con: npm run cron (con el servidor "npm run dev" o "npm start" corriendo).
import cron from "node-cron";

const URL = process.env.APP_URL || "http://localhost:3000";

const enviarReporte = async () => {
  try {
    const res = await fetch(`${URL}/api/cron/sales-report`);
    const json = await res.json();
    console.log("Reporte enviado:", json.data);
  } catch (err) {
    console.error("Error enviando el reporte:", err);
  }
};

// "0 8 * * *" = todos los días a las 08:00.
cron.schedule("0 8 * * *", enviarReporte);

console.log("Cron de reporte de ventas activo (diario 08:00).");
