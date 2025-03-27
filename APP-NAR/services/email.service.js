const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "multiaseguradoranar@gmail.com",  // Aquí pones tu correo directamente
                pass: "wlcn hldh dmro kujr",        // Aquí pones tu contraseña directamente
            },
        });
    }

    // Método para enviar correo
    async enviarCorreo(destinatario, asunto, mensaje) {
        const opcionesCorreo = {
            from: `"Multiaseguradoras" multiaseguradoranar@gmail.com`,  // Asegúrate de poner el correo aquí también
            to: destinatario,
            subject: asunto,
            text: mensaje,
        };

        try {
            await this.transporter.sendMail(opcionesCorreo);
        } catch (error) {
            throw new Error("Error al enviar el correo: " + error.message);
        }
    }
}

module.exports = new EmailService();
