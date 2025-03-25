const DocumentosPersona = require('../models/documentos_persona.model');

class DocumentosPersonaRepository {
    // Crear un nuevo documento para una persona
    async createDocumentosPersona(documentosPersona) {
        try {
            return await DocumentosPersona.create(documentosPersona);
        } catch (error) {
            throw new Error('Error al crear el documento: ' + error.message);
        }
    }

    // Obtener un documento por su ID
    async getDocumentosPersonaByIdDocumento(id) {
        try {
            return await DocumentosPersona.findOne({ idDocumento: id }); // Usamos 'idDocumento' en lugar de 'documentoId'
        } catch (error) {
            throw new Error('Error al obtener el documento por ID: ' + error.message);
        }
    }

    // Actualizar el estado de un documento por su ID
    async updateStatusDocumentosPersona(documentoId) {
        try {
            const result = await DocumentosPersona.updateOne(
                { idDocumento: documentoId }, // Usamos 'idDocumento' en lugar de 'documentoId'
                { $set: { estado: 'Inactivo' } }
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el estado del documento: ' + error.message);
        }
    }

    // Obtener los documentos de una persona por su ID
    async getDocumentosPersonaById(idUsuario) {
        try {
            return await DocumentosPersona.find({ idUsuario: idUsuario });
        } catch (error) {
            throw new Error('Error al obtener documentos por ID de usuario: ' + error.message);
        }
    }
}

module.exports = new DocumentosPersonaRepository();
