// Endpoint del cron: calcula las ventas del mes en curso y envía el reporte por email.
import { Sale } from "@/database/model";
import conection from "@/lib/db";
import { sendSalesReport } from "@/lib/mailer";

export async function GET() {
    await conection();

    // Rango: desde el día 1 del mes actual hasta hoy.
    const now = new Date();
    const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1);

    const sales = await Sale.find({ createdAt: { $gte: inicioMes } });
    const total = sales.reduce((sum, s) => sum + s.total, 0);
    const mes = now.toLocaleDateString("es", { month: "long", year: "numeric" });

    await sendSalesReport({ mes, total, count: sales.length });

    return Response.json({ data: { mes, count: sales.length, total }, code: 200 });
}
