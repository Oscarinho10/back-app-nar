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
            // Llamar a createUsuarioPostulante en lugar de createUsuario
            const usuario = await UsuarioService.createUsuarioPostulante(req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createUsuarioAgente(req, res) {
        try {
            // Llamar a createUsuarioAgente en lugar de createUsuario
            const usuario = await UsuarioService.createUsuarioAgente(req.body);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createUsuarioAdmin(req, res) {
        try {
            // Llamar a createUsuarioAdmin en lugar de createUsuario
            const usuario = await UsuarioService.createUsuarioAdmin(req.body);
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

    async login(req, res) {
        try {
            const { correo, contrasena } = req.body;
            if (!correo || !contrasena) {
                throw new Error("Correo y contraseña son obligatorios");
            }

            const usuario = await UsuarioService.login(correo, contrasena);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async loginAgente(req, res) {
        try {
            const { correo, contrasena } = req.body;
    
            // Validar que los campos no estén vacíos
            if (!correo || !contrasena) {
                return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
            }
    
            // Llamar al servicio para login de postulante
            const usuario = await UsuarioService.loginAgente(correo, contrasena);
    
            // Respuesta en caso de éxito
            res.status(200).json(usuario);
        } catch (error) {
            const statusCode = error.message.includes("obligatorios") ? 400 : 401;
            res.status(statusCode).json({ message: error.message });
        }
    }
    

    async generarCodigoRecuperacion(req, res) {
        try {
            const { correo } = req.body;
            if (!correo) {
                throw new Error("El correo es obligatorio para generar un código de recuperación.");
            }

            const resultado = await UsuarioService.generarCodigoRecuperacion(correo);
            res.status(200).json({
                success: true,
                message: "Código de recuperación generado correctamente.",
                data: resultado,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Validar un código de recuperación.
     */
    async validarCodigoRecuperacion(req, res) {
        try {
            const { correo, codigoRecuperacion } = req.body;
            if (!correo || !codigoRecuperacion) {
                throw new Error("El correo del usuario y el código de recuperación son obligatorios.");
            }

            const usuario = await UsuarioService.validarCodigoRecuperacion(correo, codigoRecuperacion);
            res.status(200).json({
                success: true,
                message: "El código de recuperación es válido.",
                data: usuario,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Cambiar la contraseña tras validar el código de recuperación.
     */
    async cambiarContrasena(req, res) {
        try {
            const { correo, codigoRecuperacion, nuevaContrasena } = req.body;

            if (!correo || !codigoRecuperacion || !nuevaContrasena) {
                throw new Error("El correo, el código de recuperación y la nueva contraseña son obligatorios.");
            }

            const usuario = await UsuarioService.recuperarContrasenaConCodigo(correo, codigoRecuperacion, nuevaContrasena);
            res.status(200).json({
                success: true,
                message: "Contraseña actualizada correctamente.",
                data: usuario,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UsuarioController();