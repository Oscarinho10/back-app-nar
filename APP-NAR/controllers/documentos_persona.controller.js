const DocumentosPersonaService = require('../services/documentos_persona.service');
const DocumentosRepository = require('../repositories/documentos_persona.repository');
const PersonaRepository = require('../repositories/usuario.repository');
const EmailService = require("../services/email.service");
const { getGFS } = require('../config/gridfs');
const mongoose = require('mongoose');

class DocumentosPersonaController {

    async createDocumentoPersonaComprobanteDomicilio(req, res) {
        try {
            console.log(req.body);

            // Verificar que se haya enviado el archivo
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No se subieron archivos.');
            }

            const files = req.files.archivo;
            const filesArray = Array.isArray(files) ? files : [files];

            // Validación del idUsuario antes de proceder
            const idUsuario = req.body.idUsuario;
            if (!idUsuario || idUsuario === '' || idUsuario == null) {
                return res.status(400).json({ message: 'El id del usuario es requerido' });
            }

            // Subir archivos y obtener los ids
            const idFiles = await Promise.all(filesArray.map(file => uploadFile(file)));
            const resp = [];

            // Procesar cada archivo subido
            for (const fileX of idFiles) {
                const idDocumentoGuardado = fileX.fileId;
                const nombreDocumentoGuardado = fileX.fileName;

                // Llamar al servicio para crear el documento
                const result = await DocumentosPersonaService.createDocumentoPersonaComprobanteDomicilio(idUsuario, idDocumentoGuardado);

                if (!result.success) {
                    return res.status(400).json({ message: result.message });
                }

                resp.push(result.data);
            }

            // Responder con los documentos creados
            res.json(resp);

        } catch (error) {
            console.error('Error al crear el documento:', error);
            res.status(500).json({ message: 'Hubo un error en el servidor.' });
        }
    }


    async downloadFile(req, res) {
        try {
            const gfs = getGFS(); // Obtener instancia de GridFS
            const fileId = new mongoose.Types.ObjectId(req.params.id);

            const file = await gfs.find({ _id: fileId }).toArray();
            if (!file || file.length === 0) {
                return res.status(404).json({ error: 'Archivo no encontrado' });
            }

            res.set('Content-Type', file[0].metadata.contentType);
            gfs.openDownloadStream(fileId).pipe(res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // documentos_persona.controller.js
    // documentos_persona.controller.js
    async deleteDocumentoPersonaComprobanteDomicilio(req, res) {
        try {
            const documentoId = req.params.id;
            if (!documentoId) {
                throw new Error('El id del documento es requerido');
            }

            const documento = await DocumentosRepository.getDocumentoComprobanteDomicilioById(documentoId);
            if (!documento) {
                throw new Error(`El documento con ID ${documentoId} no existe`);
            }

            const usuarioId = documento.idUsuario;

            const result = await DocumentosPersonaService.deleteDocumentoPersonaComprobanteDomicilio(documentoId);

            const usuario = await PersonaRepository.getUsuarioById(usuarioId);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            await EmailService.enviarCorreo(
                usuario.correo,
                "documentoRechazadoDomicilio",
                { usuario: usuario.nombre }
            );

            res.json({ message: 'Documento eliminado correctamente y correo enviado al usuario', result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateStatusAceptadoDocumentoPersonaDomicilio(req, res) {
        try {
            const documentoId = req.params.id;
            if (!documentoId || documentoId == '' || documentoId == null || documentoId == undefined) {
                throw new Error('El id del documento es requerido');
            }

            const documentoPersona = await DocumentosPersonaService.updateStatusAceptadoDocumentoPersonaDomicilio(documentoId);

            res.json(documentoPersona);

        } catch (error) {
            res.status(400).json({ message: error.message });

        }

    }

    async getDocumentoComprobanteDomicilioByPersonaId(req, res) {
        try {
            const idUsuario = req.params.id;
            if (!idUsuario || idUsuario == '' || idUsuario == null || idUsuario == undefined) {
                throw new Error('El id del usuario es requerido');
            }

            const documentosPersona = await DocumentosPersonaService.getDocumentoComprobanteDomicilioByPersonaId(idUsuario);

            res.json(documentosPersona);
        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }

    async getDocumentoComprobanteDomicilioById(req, res) {
        try {
            const idDocumento = req.params.id;
            if (!idDocumento || idDocumento == '' || idDocumento == null || idDocumento == undefined) {
                throw new Error('El id del usuario es requerido');
            }

            const documentosPersona = await DocumentosPersonaService.getDocumentoComprobanteDomicilioById(idDocumento);

            res.json(documentosPersona);
        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }

    // async updateDocumentoPersonaComprobanteDomicilio(req, res) {
    //     try {
    //         const documentoAnteriorId = req.params.id;
    //         const nuevoDocumentoId = req.body.nuevoIdDocumento;

    //         if (!documentoAnteriorId || !nuevoDocumentoId) {
    //             throw new Error('Se requieren el ID del documento anterior y el nuevo ID del documento');
    //         }

    //         const resultado = await DocumentosPersonaService.updateDocumentoPersonaComprobanteDomicilio(documentoAnteriorId, nuevoDocumentoId);

    //         res.json({ message: 'Documento actualizado correctamente', resultado });
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // }


}

module.exports = new DocumentosPersonaController();
