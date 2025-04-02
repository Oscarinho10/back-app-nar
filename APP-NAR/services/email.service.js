const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "multiaseguradoranar@gmail.com",  // Aquí pones tu correo directamente
                pass: "bnst bkho jphr yqnz",        // Aquí pones tu contraseña directamente
            },
        });
    }

    // Método para enviar correo
    async enviarCorreo(destinatario, asunto, mensaje) {
        const opcionesCorreo = {
            from: `"Multi aseguradora NAR" multiaseguradoranar@gmail.com`, 
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
