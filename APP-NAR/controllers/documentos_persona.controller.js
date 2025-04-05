const DocumentosPersonaService = require('../services/documentos_persona.service');
const DocumentosRepository = require('../repositories/documentos_persona.repository');
const PersonaRepository = require('../repositories/usuario.repository');
const EmailService = require("../services/email.service");
const { getGFS } = require('../config/gridfs');
const mongoose = require('mongoose');

class DocumentosPersonaController {

    async createDocumentoPersonaComprobanteDomicilio(req, res) {
        console.log(req.body);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se subieron archivos.');
        }

        const files = req.files.archivo;
        // Si es un solo archivo, lo convertimos en un array para manejarlo de la misma forma
        const filesArray = Array.isArray(files) ? files : [files];

        // Función que sube un archivo y devuelve su ID
        const uploadFile = (file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = getGFS().openUploadStream(
                    file.name, {
                    chunkSizeBytes: 1048576,
                    //Para guardar el tipo de archivo
                    metadata: { contentType: file.mimetype }
                });

                const buffer = file.data;
                uploadStream.write(buffer);
                uploadStream.end();

                // Esperamos a que el archivo termine de subirse
                uploadStream.on('finish', () => {
                    resolve({
                        message: 'Archivo subido correctamente',
                        fileId: uploadStream.id,
                        fileName: uploadStream.filename
                    });
                });

                uploadStream.on('error', (err) => {
                    reject(err);
                });
            });
        };

        // Usamos `Promise.all()` para esperar la subida de todos los archivos
        const idFiles = await Promise.all(filesArray.map(file => uploadFile(file)));
        const resp = [];
        for (const fileX of idFiles) {
            const idDocumentoGuardado = fileX.fileId;
            const nombreDocumentoGuardado = fileX.fileName;

            const idUsuario = req.body.idUsuario;
            if (!idUsuario || idUsuario == '' || idUsuario == null || idUsuario == undefined) {
                throw new Error('El id del usuario es requerido');
            }

            const documentoPersonaCreado = await DocumentosPersonaService.createDocumentoPersonaComprobanteDomicilio(idUsuario, idDocumentoGuardado, nombreDocumentoGuardado);
            resp.push(documentoPersonaCreado);
        }

        res.json(resp);
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

            // Obtener el documento para acceder al idUsuario
            const documento = await DocumentosRepository.getDocumentoComprobanteDomicilioById(documentoId);
            if (!documento) {
                throw new Error(`El documento con ID ${documentoId} no existe`);
            }

            const usuarioId = documento.idUsuario;

            // Eliminar el documento
            const result = await DocumentosPersonaService.deleteDocumentoPersonaComprobanteDomicilio(documentoId);

            // Obtener el usuario para extraer su correo
            const usuario = await PersonaRepository.getUsuarioById(usuarioId);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            // Enviar el correo informando sobre la eliminación del documento
            await EmailService.enviarCorreo(
                usuario.correo,
                "Documento rechazado",
                `Hola, lamentamos informarte que uno de tus documentos ha sido rechazado. Sube lo antes posible nuevamente tu documento, se habilitará solo ese campo en tu pestaña para que lo puedas subir.`
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
