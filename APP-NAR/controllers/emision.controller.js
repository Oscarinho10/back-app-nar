const EmisionService = require("../services/emision.service");

class EmisionController {
    async getAllEmisiones(req, res) {
        try {
            const emisiones = await EmisionService.getAllEmisiones();
            res.status(200).json(emisiones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEmisionById(req, res) {
        try {
            const emisionId = req.params.id;
            if (!emisionId) {
                throw new Error("El Id de la emisión es requerido");
            }
            const emision = await EmisionService.getEmisionById(emisionId);
            res.status(200).json(emision);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createEmision(req, res) {
        try {
            const nuevaEmision = await EmisionService.createEmision(req.body);
            res.status(201).json(nuevaEmision);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateEmision(req, res) {
        try {
            const emisionId = req.params.id;
            if (!emisionId) {
                throw new Error("El Id de la emisión es requerido");
            }
            const emisionActualizada = await EmisionService.updateEmision(emisionId, req.body);
            res.status(200).json(emisionActualizada);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEmisionByIdUsuario(req, res) {
        try {
            const idUsuario = req.params.idUsuario;
            if (!idUsuario) {
                throw new Error("El Id de usuario es requerido");
            }
            const emisiones = await EmisionService.getEmisionByIdUsuario(idUsuario);
            res.status(200).json(emisiones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEmisionByIdCliente(req, res) {
        try {
            const idCliente = req.params.idCliente;
            if (!idCliente) {
                throw new Error("El Id de cliente es requerido");
            }
            const emisiones = await EmisionService.getEmisionByIdCliente(idCliente);
            res.status(200).json(emisiones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEmisionByIdAsegurado(req, res) {
        try {
            const idAsegurado = req.params.idAsegurado;
            if (!idAsegurado) {
                throw new Error("El Id de asegurado es requerido");
            }
            const emisiones = await EmisionService.getEmisionByIdAsegurado(idAsegurado);
            res.status(200).json(emisiones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEmisionByIdSeguro(req, res) {
        try {
            const idSeguro = req.params.idSeguro;
            if (!idSeguro) {
                throw new Error("El Id de seguro es requerido");
            }
            const emisiones = await EmisionService.getEmisionByIdSeguro(idSeguro);
            res.status(200).json(emisiones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getEmisionByIdCotizacion(req, res) {
        try {
            const idCotizacion = req.params.idCotizacion;
            if (!idCotizacion) {
                throw new Error("El Id de cotización es requerido");
            }
            const emisiones = await EmisionService.getEmisionByIdCotizacion(idCotizacion);
            res.status(200).json(emisiones);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new EmisionController();
