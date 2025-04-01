const UsuarioService = require("../services/usuario.service");
const UsuarioRepository = require("../repositories/usuario.repository");
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

    async getAllUsuariosAgentesActivos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosAgentesActivos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsuariosAgentesInactivos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosAgentesInactivos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsuariosAdministradoresActivos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosAdministradoresActivos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsuariosAdministradoresInactivos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosAdministradoresInactivos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsuariosActivosProspectos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosActivosProspectos();
            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 -> éxito | OK 
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsuariosInactivosProspectos(req, res) {
        try {
            const usuarios = await UsuarioService.getAllUsuariosInactivosProspectos();
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

    async getCotizacionesAndEmisionesUsuarioById(req, res) {
        try {
            // Validar que el Id venga en la petición
            const usuarioId = req.params.id;
            if (!usuarioId || usuarioId.trim() === '') {
                throw new Error('El Id del usuario es requerido');
            }
    
            const cotizaciones = await UsuarioService.getCotizacionesByUsuarioId(usuarioId);
            const emsiones = await UsuarioService.getEmisionesByUsuarioId(usuarioId);
    
            res.json({
                mensaje: "Cotizaciones y emisiones por mes",
                cotizaciones,
                emsiones
            });
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

            await EmailService.enviarCorreo(
                usuario.correo,
                "Bienvenido adminstrador",
                `Hola, Felicidades! Ya eres Administrador de nuestra aplicación web Multi Aseguradoras NAR, tu contraseña para ingresar será: ${usuario.nuevaContrasena}, una vez dentro puedes cambiarla.`
            );

            res.status(200).json({
                success: true,
                message: "Administrador creado correctamente y enviado al correo su nueva contraseña.",
                data: usuario,
            });
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

    async updateUsuarioPostulante(req, res) {
        try {
            const usuarioId = req.params.id;
            const { nuevaContrasena } = req.body;

            if (!usuarioId || usuarioId.trim() === '') {
                throw new Error('El Id del usuario es requerido');
            }

            if (!nuevaContrasena || nuevaContrasena.trim() === '') {
                throw new Error('La nueva contraseña es requerida');
            }

            const usuario = await UsuarioService.updateUsuarioPostulante(usuarioId, nuevaContrasena);
            res.json({
                success: true,
                message: "Contraseña actualizada correctamente.",
                data: usuario
            });
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

    async updatePostulanteRolAgente(req, res) {
        try {
            const usuarioId = req.params.id;

            const resultado = await UsuarioService.updatePostulanteRolAgente(usuarioId);

            // Obtener el usuario para extraer su correo
            const usuario = await UsuarioRepository.getUsuarioById(usuarioId);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            // Enviar el correo con la nueva contraseña
            await EmailService.enviarCorreo(
                usuario.correo,
                "Bienvenido agente",
                `Hola, Felicidades! Ya eres agente, tu contraseña es la misma para ingresar a la plataforma, una vez dentro puedes cambiar tu contraseña para que sea más segura, mucho éxito!`
            );

            res.status(200).json({
                success: true,
                message: "Agente aceptado correctamente y enviado a su respectivo correo mensaje de confirmación.",
                data: resultado,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updatePostulanteAceptado(req, res) {
        try {
            const usuarioId = req.params.id;

            // Actualizar el usuario y obtener la nueva contraseña generada
            const resultado = await UsuarioService.updatePostulanteAceptado(usuarioId);

            // Obtener el usuario para extraer su correo
            const usuario = await UsuarioRepository.getUsuarioById(usuarioId);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            // Enviar el correo con la nueva contraseña
            await EmailService.enviarCorreo(
                usuario.correo,
                "Bienvenido postulante",
                `Hola, Felicidades! Haz pasado el primer filtro. Utiliza la siguiente contraseña para ingresar y enviar todos tus documentos: ${resultado.nuevaContrasena}`
            );

            res.status(200).json({
                success: true,
                message: "Postulante aceptado correctamente y enviado al correo su nueva contraseña.",
                data: resultado,
            });
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

    async registrarCotizacion(req, res) {
        try {
            const usuario = await UsuarioService.registrarCotizacion(req.params.id);
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

            if (!correo || !contrasena) {
                return res.status(400).json({ success: false, message: "Correo y contraseña son obligatorios" });
            }

            const usuario = await UsuarioService.login(correo, contrasena);

            const token = jwt.sign({ _id: usuario._id }, "secreta", { expiresIn: '1h' });

            console.log("Usuario autenticado:", usuario); // Verifica qué datos contiene

            return res.status(200).json({
                success: true,
                message: "Bienvenido",
                data: {
                    _id: usuario._id,
                    correo: usuario.correo,
                    rol: usuario.rol, // Incluye explícitamente el rol
                    token,
                },
            });
        } catch (error) {
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