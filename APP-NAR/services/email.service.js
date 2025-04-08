const sgMail = require('@sendgrid/mail');

class EmailService {
    constructor() {
        // Configura SendGrid con tu clave API
        sgMail.setApiKey('TU_CLAVE_API_DE_SENDGRID');
    }

    // Método para enviar correos en texto plano y HTML
    async enviarCorreo(destinatario, asunto, mensajeTexto, mensajeHTML = null) {
        const opcionesCorreo = {
            to: destinatario,
            from: 'nar.multiaseguradora@gmail.com',
            subject: asunto,
            text: mensajeTexto,
            ...(mensajeHTML && { html: mensajeHTML })  // Si hay HTML, lo agrega
        };

        try {
            await sgMail.send(opcionesCorreo);
        } catch (error) {
            throw new Error("Error al enviar el correo: " + error.message);
        }
    }
}

module.exports = new EmailService();
