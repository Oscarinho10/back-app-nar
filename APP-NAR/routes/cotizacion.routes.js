const express = require('express');

const CotizacionController = require("../controllers/cotizacion.controller");
const router = express.Router();

router.get('/', CotizacionController.getAllCotizaciones);
router.get('/pendientes', CotizacionController.getAllCotizacionesPendientes)
router.get('/id/:id', CotizacionController.getCotizacionById);
router.post('/', CotizacionController.createCotizacion);
router.put('/id/:id', CotizacionController.updateCotizacion);
router.put('/emitida/:id', CotizacionController.updateCotizacionStatusEmitida);

module.exports = router;