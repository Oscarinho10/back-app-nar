const SeguroService = require("../services/seguro.service");

class SeguroController {
    async getAllSeguros(req, res) {
        try {
            const seguros = await SeguroService.getAllSeguros();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(seguros);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllSegurosActivos(req, res) {
        try {
            const seguros = await SeguroService.getAllSegurosActivos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(seguros);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getSeguroById(req, res) {
        try {
            //Validar que el Id venga en la petición
            const seguroId = req.params.id;
            if (!seguroId || seguroId == '' || seguroId == null || seguroId == undefined) {
                throw new Error('El Id del seguro es requerido');
            }
            const seguro = await SeguroService.getSeguroById(seguroId);
            res.json(seguro);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAseguradoraById(req, res) {
        try {
            //Validar que el Id venga en la petición
            const aseguradoraId = req.params.id;
            if (!aseguradoraId || aseguradoraId == '' || aseguradoraId == null || aseguradoraId == undefined) {
                throw new Error('El Id de la aseguradora es requerido');
            }
            const aseguradora = await SeguroService.getAseguradoraById(aseguradoraId);
            res.json(aseguradora);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createSeguro(req, res) {
        try {
            const seguro = await SeguroService.createSeguro(req.body);
            res.json(seguro);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateSeguro(req, res) {
        try {
            const seguroId = req.params.id;
            if (!seguroId || seguroId == '' || seguroId == null || seguroId == undefined) {
                throw new Error('El Id del seguro es requerido');
            }

            const seguro = await SeguroService.updateSeguro(seguroId, req.body);
            res.json(seguro);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateSeguroStatusInactive(req, res) {
        try {
            const seguroId = req.params.id;
            const seguro = await SeguroService.updateSeguroStatusInactive(seguroId, req.body);
            res.json(seguro);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateSeguroStatusActive(req, res) {
        try {
            const seguroId = req.params.id;
            const seguro = await SeguroService.updateSeguroStatusActive(seguroId, req.body);
            res.json(seguro);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAseguradorasByTipo(req, res) {
        try {
            console.log(req.params); // Para verificar qué llega en la URL
            const { tipo } = req.params; // Cambia req.query por req.params
            if (!tipo) {
                throw new Error('El tipo es requerido');
            }
            const seguros = await SeguroService.getSegurosByTipo(tipo);
            res.json(seguros);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }    
}


module.exports = new SeguroController();
