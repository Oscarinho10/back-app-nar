const UsuarioService = require("../services/usuario.service");
const EmailService = require("../services/email.service");
const jwt = require('jsonwebtoken');

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

    async updateUsuarioByAdmin(req, res) {
        try {
            const usuarioId = req.params.id;
            if (!usuarioId || usuarioId == '' || usuarioId == null || usuarioId == undefined) {
                throw new Error('El Id del usuario es requerido');
            }

            // Llamar a la función updateUsuarioByAdmin desde el servicio
            const usuario = await UsuarioService.updateUsuarioByAdmin(usuarioId, req.body);
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

    async registrarEmision(req, res) {
        try {
            const usuario = await UsuarioService.registrarEmision(req.params.id);
            res.json(usuario);
        } catch (error) {
            res.status(400).send(error.message);
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

            // Validar que los campos no estén vacíos
            if (!correo || !contrasena) {
                return res.status(400).json({ success: false, message: "Correo y contraseña son obligatorios" });
            }

            // Llamar al servicio para autenticar al usuario
            const usuario = await UsuarioService.login(correo, contrasena);

            // Generar token JWT
            const token = jwt.sign({ _id: usuario._id }, "secreta", { expiresIn: '1h' });

            // Responder con el usuario y el token
            return res.status(200).json({
                success: true,
                message: "Bienvenido",
                data: {
                    ...usuario,
                    contrasena: null, // Ocultar la contraseña
                    token
                }
            });
        } catch (error) {
            // Manejo de errores
            return res.status(401).json({ success: false, message: error.message });
        }
    }

    async loginAgente(req, res) {
        try {
            const { correo, contrasena } = req.body;
    
            // Validar que los campos no estén vacíos
            if (!correo || !contrasena) {
                return res.status(400).json({ success: false, message: "Correo y contraseña son obligatorios" });
            }
    
            // Llamar al servicio para autenticar al agente
            const usuario = await UsuarioService.loginAgente(correo, contrasena);
    
            // Generar token JWT si el usuario existe
            const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET || "secreta", { expiresIn: '1h' });
    
            // Enviar respuesta exitosa con el token
            return res.status(200).json({
                success: true,
                message: "Autenticación exitosa",
                data: {
                    ...usuario,
                    contrasena: null, // Ocultar contraseña
                    token
                }
            });
        } catch (error) {
            // Manejo de errores
            const statusCode = error.message.includes("obligatorios") ? 400 : 401;
            return res.status(statusCode).json({ success: false, message: error.message });
        }
    }

    async generarCodigoRecuperacion(req, res) {
        try {
            const { correo } = req.body;
            if (!correo) {
                throw new Error("El correo es obligatorio para generar un código de recuperación.");
            }

            const resultado = await UsuarioService.generarCodigoRecuperacion(correo);

            // Enviar el código por correo
            await EmailService.enviarCorreo(
                correo,
                "Recuperación de Contraseña"
                ,
                `Hola, para recuperar tu contraseña, utiliza el siguiente código: ${resultado.codigoRecuperacion}`
            );

            res.status(200).json({
                success: true,
                message: "Código de recuperación generado correctamente y enviado al correo.",
                data: resultado,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

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