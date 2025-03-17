const express = require('express');

const UsuarioController = require("../controllers/usuario.controller");
const router = express.Router();

router.get('/', UsuarioController.getAllUsuarios);
router.get('/activos', UsuarioController.getAllUsuariosActivos)
router.get('/id/:id', UsuarioController.getUsuarioById);
router.get('/nombre/:nombre', UsuarioController.getUsuariosByNombre);
router.post('/postulante', UsuarioController.createUsuarioPostulante);
router.post('/agente', UsuarioController.createUsuarioAgente);
router.post('/admin', UsuarioController.createUsuarioAdmin);
router.put('/:id', UsuarioController.updateUsuario);
router.put('/inactive/:id', UsuarioController.updateUsuarioStatusInactive);
router.put('/active/:id', UsuarioController.updateUsuarioStatusActive);

module.exports = router;