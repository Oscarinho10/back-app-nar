class Validaciones {
    constructor() {

    }

    validarRFC(rfc) {
        let regexRFC = /^[A-ZÑ]{4}[0-9]{6}[A-Z0-9]{3}$/;
        if (!regexRFC.test(rfc)) {
            throw new Error('El RFC no tiene el formato correcto')
        }
    }

    validarCorreo(correo) {
        let regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexCorreo.test(correo)) {
            throw new Error('El correo no tiene el formato correcto')
        }
    }

    esFechaValida(fecha) {
        const regexFecha = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (!regexFecha.test(fecha)) return false;

        // Validar que la fecha sea real usando Date()
        const date = new Date(fecha);
        return date.toISOString().split('T')[0] === fecha;
    }
}

module.exports = new Validaciones();