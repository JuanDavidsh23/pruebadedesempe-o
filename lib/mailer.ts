import nodemailer from "nodemailer"
import { email } from "@/types/email"

// Crea el transporte de Gmail (reutilizado por todos los envíos).
const createTransporter = () => nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
})

export const sendEmail = async({nombre, email, password}: email)  =>{
    const transporter = createTransporter()
    await transporter.sendMail({
        from: `"Todo App" <${process.env.MAIL_USER}>`,
        to: email,
        subject: `¡Bienvenido, ${nombre}!`,
        html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;">
            <h2 style="color:#4f46e5;margin:0 0 12px;">¡Bienvenido, ${nombre}!</h2>
            <p style="color:#475569;">Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales:</p>
            <div style="background:#f1f5f9;border-radius:10px;padding:20px;margin:20px 0;">
            <p style="margin:0 0 8px;font-size:15px;"><strong>Email:</strong> ${email}</p>
            <p style="margin:0;font-size:15px;"><strong>Contraseña:</strong> ${password}</p>
            </div>
            <p style="color:#94a3b8;font-size:13px;">Te recomendamos cambiar tu contraseña después de iniciar sesión.</p>
        </div>
        `,
    });
}

// Envía el reporte de ventas del mes en curso a la dirección configurada (REPORT_EMAIL).
export const sendSalesReport = async ({ mes, total, count }: { mes: string; total: number; count: number }) => {
    const transporter = createTransporter()
    await transporter.sendMail({
        from: `"Todo App" <${process.env.MAIL_USER}>`,
        to: process.env.REPORT_EMAIL,
        subject: `Reporte de ventas — ${mes}`,
        html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;">
            <h2 style="color:#4f46e5;margin:0 0 12px;">Reporte de ventas de ${mes}</h2>
            <div style="background:#f1f5f9;border-radius:10px;padding:20px;margin:20px 0;">
            <p style="margin:0 0 8px;font-size:15px;"><strong>Ventas realizadas:</strong> ${count}</p>
            <p style="margin:0;font-size:15px;"><strong>Total facturado:</strong> $${total.toLocaleString()}</p>
            </div>
        </div>
        `,
    });
}