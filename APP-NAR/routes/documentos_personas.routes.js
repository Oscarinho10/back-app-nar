const DocumentosPersonaController = require('../controllers/documentos_persona.controller');
const express = require('express');
const router = express.Router();


router.post('/subirDocumento', DocumentosPersonaController.createDocumentoPersonaComprobanteDomicilio);

// Ruta para obtener un archivo por ID - descargarlo
router.get('/descargarDocumento/:id', DocumentosPersonaController.downloadFile);

//Consultar documentos de una persona por su id
router.get('/documentosPostulante/:id', DocumentosPersonaController.getDocumentoComprobanteDomicilioByPersonaId);

//Cambiar el estado del documento
router.delete('/rechazarDocumento/:id', DocumentosPersonaController.deleteDocumentoPersonaComprobanteDomicilio);

router.put('/aceptarDocumento/:id', DocumentosPersonaController.updateStatusAceptadoDocumentoPersonaDomicilio);

// router.put('/updateDocumento/:id', DocumentosPersonaController.updateDocumentoPersonaComprobanteDomicilio);

module.exports = router;
