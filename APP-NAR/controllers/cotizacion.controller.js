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

    async getCotizacionByIdUsuario(req, res) {
        try {
            const idUsuario = req.params.idUsuario;
            if (!idUsuario) {
                throw new Error('El Id de usuario es requerido');
            }
            const cotizaciones = await CotizacionService.getCotizacionByIdUsuario(idUsuario);
            res.status(200).json(cotizaciones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCotizacionByIdCliente(req, res) {
        try {
            const idCliente = req.params.idCliente;
            if (!idCliente) {
                throw new Error('El Id de cliente es requerido');
            }
            const cotizaciones = await CotizacionService.getCotizacionByIdCliente(idCliente);
            res.status(200).json(cotizaciones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCotizacionByIdAsegurado(req, res) {
        try {
            const idAsegurado = req.params.idAsegurado;
            if (!idAsegurado) {
                throw new Error('El Id de asegurado es requerido');
            }
            const cotizaciones = await CotizacionService.getCotizacionByIdAsegurado(idAsegurado);
            res.status(200).json(cotizaciones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getCotizacionByIdSeguro(req, res) {
        try {
            const idSeguro = req.params.idSeguro;
            if (!idSeguro) {
                throw new Error('El Id de seguro es requerido');
            }
            const cotizaciones = await CotizacionService.getCotizacionByIdSeguro(idSeguro);
            res.status(200).json(cotizaciones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new CotizacionController();
