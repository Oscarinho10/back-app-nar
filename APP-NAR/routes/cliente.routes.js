const express = require('express');

const ClienteController = require("../controllers/cliente.controller");
const router = express.Router();

router.get('/', ClienteController.getAllClientes);
router.get('/id/:id', ClienteController.getClienteById);
router.get('/nombre/:nombre', ClienteController.getClientesByNombre);
router.post('/', ClienteController.createCliente);


module.exports = router;