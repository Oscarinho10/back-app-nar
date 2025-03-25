const DocumentosPersonaRepository = require('../repositories/documentos_persona.repository');
const PersonaRepository = require('../repositories/usuario.repository');

class DocumentosPersonaService {
    // Crear un documento para un usuario
    async createDocumentosPersona(idUsuario, idDocumento, nombreDocumento) {
        if (!idUsuario || !idDocumento || !nombreDocumento) {
            throw new Error('Faltan parámetros necesarios para crear el documento');
        }

        const documentoPersona = {
            idUsuario: idUsuario,
            idDocumento: idDocumento,  // Verifica que el nombre del campo coincida con el modelo
            nombreDocumento: nombreDocumento
        };

        return await DocumentosPersonaRepository.createDocumentosPersona(documentoPersona);
    }

    // Actualizar el estado del documento
    async updateStatusDocumentosPersona(documentoId) {
        if (!documentoId) {
            throw new Error('El id del documento es requerido');
        }

        // Validar que el documento exista
        const documento = await DocumentosPersonaRepository.getDocumentosPersonaByIdDocumento(documentoId);
        if (!documento) {
            throw new Error(`El documento con ID ${documentoId} no existe`);
        }

        return await DocumentosPersonaRepository.updateStatusDocumentosPersona(documentoId);
    }

    // Obtener los documentos de un usuario por su ID
    async getDocumentosPersonaById(idUsuario) {
        if (!idUsuario) {
            throw new Error('El id del usuario es requerido');
        }

        // Validar que el usuario exista
        const usuario = await PersonaRepository.getPersonaById(idUsuario);
        if (!usuario) {
            throw new Error(`El usuario con ID ${idUsuario} no existe`);
        }

        return await DocumentosPersonaRepository.getDocumentosPersonaByIdPersona(idUsuario);
    }
}

module.exports = new DocumentosPersonaService();
