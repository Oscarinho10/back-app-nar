const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "multiaseguradoras.nar@gmail.com",  // Aquí pones tu correo directamente
                pass: "kylq bvxy fqfc ufzz",        // Aquí pones tu contraseña directamente
            },
        });
    }

    // Método para enviar correo
    async enviarCorreo(destinatario, asunto, mensaje) {
        const opcionesCorreo = {
            from: `"Multi aseguradora NAR" multiaseguradoras.nar@gmail.com`, 
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
