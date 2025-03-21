const CotizacionRepository = require("../repositories/cotizacion.repository");
const Validaciones = require("../utils/validation");
const Utils = require("../utils/utils");

class CotizacionService {
    async getAllCotizaciones() {
        return await CotizacionRepository.getAllCotizaciones();
    }

    async getAllCotizacionesPendientes() {
        return await CotizacionRepository.getAllCotizacionesPendientes();
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

        cotizacion.fechaCotizacion = new Date();

        // Asegurar que el estado sea "activo" por defecto
        cotizacion.estado = "pendiente";

        // Crear el seguro en la base de datos
        return await CotizacionRepository.createCotizacion(cotizacion);
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

    async updateCotizacionStatusEmitida(id) {
        //Validar que la aseguradora exista
        const cotizacion = await CotizacionRepository.getCotizacionById(id);
        if (!cotizacion) {
            throw new Error('Cotizacion no encontrada')
        }
        return await CotizacionRepository.updateCotizacionStatusEmitida(id)

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