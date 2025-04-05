const DocumentosPersonaController = require('../controllers/documentos_persona.controller');
const express = require('express');
const router = express.Router();


router.post('/uploadComprobanteDomicilio', DocumentosPersonaController.createDocumentoPersonaComprobanteDomicilio);

// Ruta para obtener un archivo por ID - descargarlo
router.get('/descargarComprobanteDomicilio/:id', DocumentosPersonaController.downloadFile);

//Consultar documentos de una persona
router.get('/comprobanteDomicilio/postulante/:id', DocumentosPersonaController.getDocumentoComprobanteDomicilioByPersonaId);

//Cambiar el estado del documento
router.delete('/rechazarComprobanteDomicilio/:id', DocumentosPersonaController.deleteDocumentoPersonaComprobanteDomicilio);

router.put('/aceptarComprobanteDomicilio/:id', DocumentosPersonaController.updateStatusAceptadoDocumentoPersonaDomicilio);

// router.put('/updateDocumento/:id', DocumentosPersonaController.updateDocumentoPersonaComprobanteDomicilio);

module.exports = router;
