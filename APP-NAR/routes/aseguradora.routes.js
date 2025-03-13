const express = require('express');

const AseguradoraController = require("../controllers/aseguradora.controller");
const router = express.Router();

router.get('/', AseguradoraController.getAllAseguradoras);
router.get('/id/:id', AseguradoraController.getAseguradoraById);
router.post('/', AseguradoraController.createAseguradora);
router.put('/:id', AseguradoraController.updateAseguradora);
router.put('/inactive/:id', AseguradoraController.updateAseguradoraStatusInactive);

module.exports = router;