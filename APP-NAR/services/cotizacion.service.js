const CotizacionRepository = require("../repositories/cotizacion.repository");
const UsuarioRepository = require("../repositories/usuario.repository");
const EmisionRepository = require("../repositories/emision.repository");
const Validaciones = require("../utils/validation");
const Utils = require("../utils/utils");

class CotizacionService {
    async getAllCotizaciones() {
        return await CotizacionRepository.getAllCotizaciones();
    }

    async getAllCotizacionesPendientes() {
        return await CotizacionRepository.getAllCotizacionesPendientes();
    }

    async getAllCotizacionesPendientesByIdAgente(idUsuario) {
        if (!idUsuario) {
            throw new Error("El ID del usuario es requerido.");
        }
        return await CotizacionRepository.getAllCotizacionesPendientesByIdAgente(idUsuario);
    }    

    async getCotizacionById(id) {
        const cotizacion = await CotizacionRepository.getCotizacionById(id);
        if (!cotizacion) {
            throw new Error('Cotizacion no encontrada');
        }

        return cotizacion;
    }

    async createCotizacion(cotizacion) {
        // Validar que todos los campos obligatorios estén presentes
        if (!cotizacion.idUsuario || !cotizacion.idCliente || !cotizacion.idAsegurado || !cotizacion.idSeguro) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validar entidades relacionadas
        const asegurado = await CotizacionRepository.getAseguradoById(cotizacion.idAsegurado);
        if (!asegurado) {
            throw new Error('El asegurado no existe');
        }

        const seguro = await CotizacionRepository.getSeguroById(cotizacion.idSeguro);
        if (!seguro) {
            throw new Error('El seguro no existe');
        }

        // Calcular la edad del asegurado
        const edad = Utils.calcularEdad(asegurado.fechaNacimiento);

        // Define el precio base y ajusta según la edad
        let precioBase = seguro.precioBase; // Asegúrate de que el seguro tiene un precio base definido
        let incremento = 0;

        if (edad >= 18 && edad <= 25) {
            incremento = 0.20; // 20% más
        } else if (edad >= 26 && edad <= 40) {
            incremento = 0.10; // 10% más
        } else if (edad >= 41 && edad <= 60) {
            incremento = 0.15; // 15% más
        } else if (edad > 60) {
            incremento = 0.25; // 25% más
        }

        cotizacion.precioFinal = precioBase + (precioBase * incremento);
        cotizacion.fechaCotizacion = new Date();
        cotizacion.estado = "pendiente";

        // Incrementar el contador de emisiones del usuario
        const nuevaCotizacion = await CotizacionRepository.createCotizacion(cotizacion);

        // Incrementar el contador de emisiones del usuario
        await UsuarioRepository.incrementCotizaciones(cotizacion.idUsuario);

        return nuevaCotizacion;
    }


    async updateCotizacion(id, cotizacion) {
        // Validar que todos los campos obligatorios estén presentes
        if (!cotizacion.idUsuario || !cotizacion.idCliente || !cotizacion.idAsegurado || !cotizacion.idSeguro ||
            !cotizacion.precioFinal) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validar que la aseguradora exista
        const usuario = await CotizacionRepository.getUsuarioById(cotizacion.idUsuario);
        if (!usuario) {
            throw new Error('El usuario no existe');
        }

        // Validar que la aseguradora exista
        const cliente = await CotizacionRepository.getClienteById(cotizacion.idCliente);
        if (!cliente) {
            throw new Error('El cliente no existe');
        }

        // Validar que la aseguradora exista
        const asegurado = await CotizacionRepository.getAseguradoById(cotizacion.idAsegurado);
        if (!asegurado) {
            throw new Error('El asegurado no existe');
        }

        const seguro = await CotizacionRepository.getSeguroById(cotizacion.idSeguro);
        if (!seguro) {
            throw new Error('El seguro no existe');
        }

        // Validar que el precio base sea un número positivo
        if (typeof cotizacion.precioFinal !== 'number' || cotizacion.precioFinal < 0) {
            throw new Error('El precio final debe ser un número positivo');
        }

        return await CotizacionRepository.updateCotizacion(id, cotizacion);
    }

    async updateCotizacionStatusEmitida(id, emision) {
        // Validar que la cotización exista
        const cotizacion = await CotizacionRepository.getCotizacionById(id);
        if (!cotizacion) {
            throw new Error('Cotización no encontrada');
        }
    
        // Validar que la cotización esté en estado pendiente antes de emitirla
        if (cotizacion.estado !== 'pendiente') {
            throw new Error('La cotización debe estar en estado "pendiente" para ser emitida');
        }
    
        // Cambiar el estado de la cotización a "emitida"
        await CotizacionRepository.updateCotizacionStatusEmitida(id);
    
        // Ahora, creamos la emisión
        // Validamos los campos necesarios de la emisión
        if (!emision.idUsuario || !emision.idCliente || !emision.idAsegurado ||
            !emision.idSeguro || !emision.idCotizacion) {
            throw new Error('Todos los campos son requeridos para la emisión');
        }
    
        // Validar existencia de entidades relacionadas
        const usuario = await EmisionRepository.getUsuarioById(emision.idUsuario);
        if (!usuario) throw new Error('El usuario no existe');
    
        const cliente = await EmisionRepository.getClienteById(emision.idCliente);
        if (!cliente) throw new Error('El cliente no existe');
    
        const asegurado = await EmisionRepository.getAseguradoById(emision.idAsegurado);
        if (!asegurado) throw new Error('El asegurado no existe');
    
        const seguro = await EmisionRepository.getSeguroById(emision.idSeguro);
        if (!seguro) throw new Error('El seguro no existe');
    
        const cotizacionEmitida = await EmisionRepository.getCotizacionById(emision.idCotizacion);
        if (!cotizacionEmitida) throw new Error('La cotización no existe');
    
        // Asignar el precio final de la cotización al monto total de la emisión
        emision.montoTotal = cotizacionEmitida.precioFinal;
    
        // Registrar la emisión
        emision.fechaEmision = new Date();
        const nuevaEmision = await EmisionRepository.createEmision(emision);
    
        // Incrementar el contador de emisiones del usuario
        await UsuarioRepository.incrementEmisiones(emision.idUsuario);
    
        return nuevaEmision;
    }
    

    async getCotizacionByIdUsuario(idUsuario) {
        return await CotizacionRepository.getCotizacionByIdUsuario(idUsuario);
    }

    async getCotizacionByIdCliente(idCliente) {
        return await CotizacionRepository.getCotizacionByIdCliente(idCliente);
    }

    async getCotizacionByIdAsegurado(idAsegurado) {
        return await CotizacionRepository.getCotizacionByIdAsegurado(idAsegurado);
    }

    async getCotizacionByIdSeguro(idSeguro) {
        return await CotizacionRepository.getCotizacionByIdSeguro(idSeguro);
    }
}

module.exports = new CotizacionService();