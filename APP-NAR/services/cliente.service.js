const ClienteRepository = require("../repositories/cliente.repository");
const Validaciones = require("../utils/validation");
const Utils = require("../utils/utils");

class ClienteService {
    async getAllClientes() {
        return await ClienteRepository.getAllClientes();
    }

    async getClienteById(id) {
        const cliente = await ClienteRepository.getClienteById(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }

        return cliente;
    }

    async getClientesByNombre(nombre) {
        const cliente = await ClienteRepository.getClientesByNombre(nombre);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }

        return cliente;
    }

    async createCliente(cliente) {
        //Validar que todos los campos obligatorios vengan
        if (!cliente.nombre || !cliente.apellidoPaterno || !cliente.apellidoMaterno || !cliente.fechaNacimiento || !cliente.correo || !cliente.rfc || !cliente.telefono) {
            throw new Error('Todos los campos son requeridos');
        }

        //Validar que el formato del RFC y el correo sea válido
        // Validaciones.validarRFC(persona.rfc);

        Validaciones.validarCorreo(cliente.correo);

        Validaciones.validarRFC(cliente.rfc);

        const clienteByCorreo = await ClienteRepository.getClienteByCorreo(cliente.correo);

        const clienteByRFC = await ClienteRepository.getClienteByRFC(cliente.rfc);

        if (clienteByCorreo) {
            throw new Error('El correo ya existe');
        }

        if (clienteByRFC) {
            throw new Error('El RFC ya existe');

        }

        //Validar que la fecha de nacimiento sea válida
        if (Utils.calcularEdad(cliente.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');

        }

        return await ClienteRepository.createCliente(cliente);
    }

}

module.exports = new ClienteService();