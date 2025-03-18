const CotizacionService = require("../services/cotizacion.service");

class CotizacionController {
    async getAllCotizaciones(req, res) {
        try {
            const cotizaciones = await CotizacionService.getAllCotizaciones();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(cotizaciones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllCotizacionesPendientes(req, res) {
        try {
            const cotizaciones = await CotizacionService.getAllCotizacionesPendientes();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(cotizaciones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCotizacionById(req, res) {
        try {
            //Validar que el Id venga en la petición
            const cotizacionId = req.params.id;
            if (!cotizacionId || cotizacionId == '' || cotizacionId == null || cotizacionId == undefined) {
                throw new Error('El Id de la cotizacion es requerido');
            }
            const cotizacion = await CotizacionService.getCotizacionById(cotizacionId);
            res.json(cotizacion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createCotizacion(req, res) {
        try {
            const cotizacion = await CotizacionService.createCotizacion(req.body);
            res.json(cotizacion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateCotizacion(req, res) {
        try {
            const cotizacionId = req.params.id;
            if (!cotizacionId || cotizacionId == '' || cotizacionId == null || cotizacionId == undefined) {
                throw new Error('El Id de la cotizacion es requerido');
            }

            const cotizacion = await CotizacionService.updateCotizacion(cotizacionId, req.body);
            res.json(cotizacion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateCotizacionStatusEmitida(req, res) {
        try {
            const cotizacionId = req.params.id;
            const cotizacion = await CotizacionService.updateCotizacionStatusEmitida(cotizacionId, req.body);
            res.json(cotizacion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new CotizacionController();
