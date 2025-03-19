const UsuarioService = require("../services/usuario.service");

class UsuarioController {
    async getAllUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuarios();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsuariosActivos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosActivos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsuariosInactivos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosInactivos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUsuarioById(req, res) {
        try {
            //Validar que el Id venga en la petición
            const usuarioId = req.params.id;
            if (!usuarioId || usuarioId == '' || usuarioId == null || usuarioId == undefined) {
                throw new Error('El Id del usuario es requerido');
            }
            const usuario = await UsuarioService.getUsuarioById(usuarioId);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createUsuarioPostulante(req, res) {
        try {
            const usuario = await UsuarioService.createUsuario(req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createUsuarioAgente(req, res) {
        try {
            const usuario = await UsuarioService.createUsuario(req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createUsuarioAdmin(req, res) {
        try {
            const usuario = await UsuarioService.createUsuario(req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateUsuario(req, res) {
        try {
            const usuarioId = req.params.id;
            if (!usuarioId || usuarioId == '' || usuarioId == null || usuarioId == undefined) {
                throw new Error('El Id del usuario es requerido');
            }

            const usuario = await UsuarioService.updateUsuario(usuarioId, req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateUsuarioStatusInactive(req, res) {
        try {
            const usuarioId = req.params.id;
            const usuario = await UsuarioService.updateUsuarioStatusInactive(usuarioId, req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateUsuarioStatusActive(req, res) {
        try {
            const usuarioId = req.params.id;
            const usuario = await UsuarioService.updateUsuarioStatusActive(usuarioId, req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUsuariosByNombre(req, res) {
        try {
            const { nombre } = req.query;
            if (!nombre) {
                throw new Error('El nombre es requerido');
            }
            const usuarios = await UsuarioService.getUsuariosByNombre(nombre);
            res.json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UsuarioController();