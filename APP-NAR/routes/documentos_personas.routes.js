const DocumentosPersonaController = require('../controllers/documentos_persona.controller');
const express = require('express');
const router = express.Router();


router.post('/upload', DocumentosPersonaController.createDocumentosPersona);

// Ruta para obtener un archivo por ID - descargarlo
router.get('/files/:id', DocumentosPersonaController.downloadFile);
//Consultar documentos de una persona
router.get('/files/persona/:id', DocumentosPersonaController.getDocumentosPersonaById);

//Cambiar el estado del documento
router.put('/files/:id', DocumentosPersonaController.updateStatusDocumentosPersona);
module.exports = router;
