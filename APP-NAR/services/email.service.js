const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nar.multiaseguradora@gmail.com",
                pass: "zvjp rctt easz yiuo",
            },
        });
    }

    // Método para enviar correos en texto plano y HTML
    async enviarCorreo(destinatario, asunto, mensajeTexto, mensajeHTML = null) {
        const opcionesCorreo = {
            from: `"Multi Aseguradora NAR" <nar.multiaseguradora@gmail.com>`, 
            to: destinatario,
            subject: asunto,
            text: mensajeTexto,   // Contenido en texto plano
            ...(mensajeHTML && { html: mensajeHTML })  // Si hay HTML, lo agrega
        };

        try {
            await this.transporter.sendMail(opcionesCorreo);
        } catch (error) {
            throw new Error("Error al enviar el correo: " + error.message);
        }
    }
}

module.exports = new EmailService();
