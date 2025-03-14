const Usuario = require('../models/usuario.model');

class UsuarioRepository {
    // Obtener todas las aseguradoras
    async getAllUsuarios() {
        return await Usuario.find();
    }

    // Obtener aseguradora por ID
    async getUsuarioById(id) {
        return await Usuario.findById(id);
    }

    // Crear una nueva aseguradora
    async createUsuario(usuario) {
        return await Usuario.create(usuario);
    }

    // Actualizar aseguradora
    async updateUsuario(id, usuario) {
        return await Usuario.findByIdAndUpdate(id, usuario, { new: true });
    }

    // Habilitar o deshabilitar aseguradora
    async toggleEstadoUsuario(id, estado) {
        return await Usuario.findByIdAndUpdate(id, { estado: estado }, { new: true });
    }

    // Buscar aseguradoras por nombre
    async getUsuariosByNombre(nombre) {
        return await Usuario.find({ nombre: new RegExp(nombre, 'i') });
    }

    // Buscar aseguradora por correo de contacto
    async getUsuarioByCorreo(correo) {
        return await Usuario.findOne({ correo: correo });
    }

    async getUsuarioByCURP(curp) {
        return await Usuario.findOne({ curp: curp });
    }

    async getUsuarioByRFC(rfc) {
        return await Usuario.findOne({ rfc: rfc });
    }

    // Buscar aseguradora por teléfono de contacto
    async getUsuarioByTelefono(telefono) {
        return await Usuario.findOne({ telefono: telefono });
    }

    // Verificar si existe otro correo en otra aseguradora
    async getUsuarioByCorreoAndNotId(id, correo) {
        return await Usuario.findOne({ _id: { $ne: id }, correo: correo });
    }

    async getUsuarioByCURPAndNotId(id, curp) {
        return await Usuario.findOne({ _id: { $ne: id }, curp: curp });
    }

    async getUsuarioByRFCAndNotId(id, rfc) {
        return await Usuario.findOne({ _id: { $ne: id }, rfc: rfc });
    }

    // Verificar si existe otro teléfono en otra aseguradora
    async getUsuarioByTelefonoAndNotId(id, telefono) {
        return await Usuario.findOne({ _id: { $ne: id }, telefono: telefono });
    }

    async updateUsuarioStatusInactive(id) {
        // new: true -> devuelve el producto actualizado
        return await Usuario.findByIdAndUpdate(id, { estado: 'inactivo' }, { new: true });
    }

    async updateUsuarioStatusActive(id) {
        // new: true -> devuelve el producto actualizado
        return await Usuario.findByIdAndUpdate(id, { estado: 'activo' }, { new: true });
    }
}

module.exports = new UsuarioRepository();
