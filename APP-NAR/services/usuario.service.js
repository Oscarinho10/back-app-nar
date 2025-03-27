const bcrypt = require("bcryptjs");
const UsuarioRepository = require("../repositories/usuario.repository");
const Validaciones = require("../utils/validation");
const Utils = require("../utils/utils");

class UsuarioService {
    async getAllUsuarios() {
        return await UsuarioRepository.getAllUsuarios();
    }

    async getAllUsuariosActivos() {
        return await UsuarioRepository.getAllUsuariosActivos();
    }

    async getAllUsuariosInactivos() {
        return await UsuarioRepository.getAllUsuariosInactivos();
    }

    async getUsuarioById(id) {
        const usuario = await UsuarioRepository.getUsuarioById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        return usuario;
    }

    async getUsuariosByNombre(nombre) {
        const usuarios = await UsuarioRepository.getUsuariosByNombre(nombre);
        if (!usuarios) {
            throw new Error('Usuarios no encontrados');
        }

        return usuarios;
    }

    async createUsuarioPostulante(usuario) {
        //Validar que todos los campos obligatorios vengan
        if (!usuario.nombre || !usuario.apellidoPaterno || !usuario.apellidoMaterno || !usuario.curp || !usuario.rfc || !usuario.correo || !usuario.contrasena || !usuario.telefono) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validar el formato de CURP, RFC, correo y contraseña
        Validaciones.validarCURP(usuario.curp);
        Validaciones.validarRFC(usuario.rfc);
        Validaciones.validarCorreo(usuario.correo);
        Validaciones.validarContrasena(usuario.contrasena);

        // Validar que el RFC, CURP, correo, y teléfono no existan en la base de datos
        const usuarioByCURP = await UsuarioRepository.getUsuarioByCURP(usuario.curp);
        const usuarioByRFC = await UsuarioRepository.getUsuarioByRFC(usuario.rfc);
        const usuarioByCorreo = await UsuarioRepository.getUsuarioByCorreo(usuario.correo);
        const usuarioByTelefono = await UsuarioRepository.getUsuarioByTelefono(usuario.telefono);

        if (usuarioByCURP) {
            throw new Error('La CURP ya existe');
        }
        if (usuarioByRFC) {
            throw new Error('El RFC ya existe');
        }
        if (usuarioByCorreo) {
            throw new Error('El correo ya existe');
        }
        if (usuarioByTelefono) {
            throw new Error('El telefono ya existe');
        }

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10); // 10 es el número de rondas de salt
        const contrasenaEncriptada = await bcrypt.hash(usuario.contrasena, salt);

        // Asignar la contraseña encriptada
        usuario.contrasena = contrasenaEncriptada;

        // Asignar el rol, fecha de registro y estado
        usuario.rol = "postulante";
        usuario.fechaRegistro = new Date();
        usuario.estado = "activo"; // Por defecto, estado activo

        // Guardar el usuario en la base de datos
        return await UsuarioRepository.createUsuario(usuario);
    }

    async createUsuarioAgente(usuario) {
        //Validar que todos los campos obligatorios vengan
        if (!usuario.nombre || !usuario.apellidoPaterno || !usuario.apellidoMaterno || !usuario.curp || !usuario.rfc || !usuario.correo || !usuario.contrasena || !usuario.telefono) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validar el formato de CURP, RFC, correo y contraseña
        Validaciones.validarCURP(usuario.curp);
        Validaciones.validarRFC(usuario.rfc);
        Validaciones.validarCorreo(usuario.correo);
        Validaciones.validarContrasena(usuario.contrasena);

        // Validar que el RFC, CURP, correo, y teléfono no existan en la base de datos
        const usuarioByCURP = await UsuarioRepository.getUsuarioByCURP(usuario.curp);
        const usuarioByRFC = await UsuarioRepository.getUsuarioByRFC(usuario.rfc);
        const usuarioByCorreo = await UsuarioRepository.getUsuarioByCorreo(usuario.correo);
        const usuarioByTelefono = await UsuarioRepository.getUsuarioByTelefono(usuario.telefono);

        if (usuarioByCURP) {
            throw new Error('La CURP ya existe');
        }
        if (usuarioByRFC) {
            throw new Error('El RFC ya existe');
        }
        if (usuarioByCorreo) {
            throw new Error('El correo ya existe');
        }
        if (usuarioByTelefono) {
            throw new Error('El telefono ya existe');
        }

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10); // 10 es el número de rondas de salt
        const contrasenaEncriptada = await bcrypt.hash(usuario.contrasena, salt);

        // Asignar la contraseña encriptada
        usuario.contrasena = contrasenaEncriptada;

        // Asignar el rol, fecha de registro y estado
        usuario.rol = "agente";
        usuario.fechaRegistro = new Date();
        usuario.estado = "activo"; // Por defecto, estado activo

        // Guardar el usuario en la base de datos
        return await UsuarioRepository.createUsuario(usuario);
    }

    async createUsuarioAdmin(usuario) {
        //Validar que todos los campos obligatorios vengan
        if (!usuario.nombre || !usuario.apellidoPaterno || !usuario.apellidoMaterno || !usuario.curp || !usuario.rfc || !usuario.correo || !usuario.contrasena || !usuario.telefono) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validar el formato de CURP, RFC, correo y contraseña
        Validaciones.validarCURP(usuario.curp);
        Validaciones.validarRFC(usuario.rfc);
        Validaciones.validarCorreo(usuario.correo);
        Validaciones.validarContrasena(usuario.contrasena);

        // Validar que el RFC, CURP, correo, y teléfono no existan en la base de datos
        const usuarioByCURP = await UsuarioRepository.getUsuarioByCURP(usuario.curp);
        const usuarioByRFC = await UsuarioRepository.getUsuarioByRFC(usuario.rfc);
        const usuarioByCorreo = await UsuarioRepository.getUsuarioByCorreo(usuario.correo);
        const usuarioByTelefono = await UsuarioRepository.getUsuarioByTelefono(usuario.telefono);

        if (usuarioByCURP) {
            throw new Error('La CURP ya existe');
        }
        if (usuarioByRFC) {
            throw new Error('El RFC ya existe');
        }
        if (usuarioByCorreo) {
            throw new Error('El correo ya existe');
        }
        if (usuarioByTelefono) {
            throw new Error('El telefono ya existe');
        }

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10); // 10 es el número de rondas de salt
        const contrasenaEncriptada = await bcrypt.hash(usuario.contrasena, salt);

        // Asignar la contraseña encriptada
        usuario.contrasena = contrasenaEncriptada;

        // Asignar el rol, fecha de registro y estado
        usuario.rol = "administrador";
        usuario.fechaRegistro = new Date();
        usuario.estado = "activo"; // Por defecto, estado activo

        // Guardar el usuario en la base de datos
        return await UsuarioRepository.createUsuario(usuario);
    }

    async updateUsuario(id, usuario) {
        //Validar que la persona exista
        const usuarioById = await UsuarioRepository.getUsuarioById(id);
        if (!usuarioById) {
            throw new Error('Usuario no encontrado');
        }

        //Validar que todos los campos vengan en el body
        if (!usuario.nombre || !usuario.apellidoPaterno || !usuario.apellidoMaterno || !usuario.curp || !usuario.rfc || !usuario.correo || !usuario.contrasena || !usuario.telefono) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validar el rol permitido
        const rolesPermitidos = ["administrador", "postulante", "agente"];
        if (!rolesPermitidos.includes(usuario.rol.toLowerCase())) {
            throw new Error('El rol debe ser "administrador", "postulante" o "agente"');
        }

        Validaciones.validarCURP(usuario.curp);

        Validaciones.validarRFC(usuario.rfc);

        Validaciones.validarCorreo(usuario.correo);

        Validaciones.validarContrasena(usuario.contrasena);

        const usuarioByCURPAndNotId = await UsuarioRepository.getUsuarioByCURPAndNotId(id, usuario.curp);
        if (usuarioByCURPAndNotId) {
            throw new Error('La curp ya existe');
        }

        const usuarioByRFCAndNotId = await UsuarioRepository.getUsuarioByRFCAndNotId(id, usuario.rfc);
        if (usuarioByRFCAndNotId) {
            throw new Error('El RFC ya existe');
        }

        const usuarioByCorreoAndNotId = await UsuarioRepository.getUsuarioByCorreoAndNotId(id, usuario.correo);
        if (usuarioByCorreoAndNotId) {
            throw new Error('El correo ya existe');
        }

        const usuarioByTelefonoAndNotId = await UsuarioRepository.getUsuarioByTelefonoAndNotId(id, usuario.telefono);
        if (usuarioByTelefonoAndNotId) {
            throw new Error('El telefono ya existe');
        }

        return await UsuarioRepository.updateUsuario(id, usuario);

    }

    async updateUsuarioByAdmin(id, usuario) {
        // Validar que la persona exista
        const usuarioById = await UsuarioRepository.getUsuarioById(id);
        if (!usuarioById) {
            throw new Error('Usuario no encontrado');
        }

        // Validar que los campos permitidos vengan en el body
        if (!usuario.nombre || !usuario.apellidoPaterno || !usuario.apellidoMaterno || !usuario.telefono || !usuario.correo) {
            throw new Error('Los campos nombre, apellido paterno, apellido materno, telefono y correo son requeridos');
        }

        // Validar que no se intenten modificar campos no permitidos
        if (usuario.curp || usuario.rfc || usuario.contrasena || usuario.rol) {
            throw new Error('No se puede modificar CURP, RFC, contraseña ni rol');
        }

        // Validar el correo
        Validaciones.validarCorreo(usuario.correo);

        // Validar teléfono (puedes agregar validación específica si es necesario)
        if (!usuario.telefono) {
            throw new Error('Teléfono es obligatorio');
        }

        // Validar que no haya otro usuario con el mismo correo o teléfono
        const usuarioByCorreoAndNotId = await UsuarioRepository.getUsuarioByCorreoAndNotId(id, usuario.correo);
        if (usuarioByCorreoAndNotId) {
            throw new Error('El correo ya existe');
        }

        const usuarioByTelefonoAndNotId = await UsuarioRepository.getUsuarioByTelefonoAndNotId(id, usuario.telefono);
        if (usuarioByTelefonoAndNotId) {
            throw new Error('El teléfono ya existe');
        }

        // Actualizar el usuario
        return await UsuarioRepository.updateUsuario(id, usuario);
    }


    async updateUsuarioStatusInactive(id) {
        //Validar que la aseguradora exista
        const usuario = await UsuarioRepository.getUsuarioById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado')
        }
        return await UsuarioRepository.updateUsuarioStatusInactive(id)

    }

    async updateUsuarioStatusActive(id) {
        //Validar que la aseguradora exista
        const usuario = await UsuarioRepository.getUsuarioById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado')
        }

        // Incrementar el contador de reactivaciones
        await UsuarioRepository.incrementReactivaciones(id);

        return await UsuarioRepository.updateUsuarioStatusActive(id)

    }

    async registrarEmision(id) {
        const usuario = await UsuarioRepository.getUsuarioById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar que el rol del usuario sea "agente"
        if (usuario.rol !== "agente") {
            throw new Error('Solo los agentes pueden registrar emisiones');
        }

        // Incrementar el contador de emisiones
        await UsuarioRepository.incrementEmisiones(id);

        return usuario;
    }

    async login(correo, contrasena) {
        // Validar que los campos no estén vacíos
        if (!correo || !contrasena) {
            throw new Error("Correo y contraseña son obligatorios");
        }

        // Buscar usuario por correo
        const usuario = await UsuarioRepository.getUsuarioByCorreo(correo);
        if (!usuario) {
            throw new Error("Correo o contraseña incorrectos");
        }

        // Comparar contraseñas
        const esPasswordValido = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esPasswordValido) {
            throw new Error("Correo o contraseña incorrectos");
        }

        // Retornar usuario si la autenticación es correcta
        return usuario;
    }

    async loginAgente(correo, contrasena) {
        // Validar campos obligatorios
        if (!correo || !contrasena) {
            throw new Error("Correo y contraseña son obligatorios");
        }

        // Buscar usuario por correo
        const usuario = await UsuarioRepository.getUsuarioByCorreo(correo);
        if (!usuario) {
            throw new Error("Correo o contraseña incorrectos");
        }

        // Comparar contraseñas
        const esPasswordValido = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esPasswordValido) {
            throw new Error("Correo o contraseña incorrectos");
        }

        // Verificar si el rol del usuario es "postulante"
        if (usuario.rol !== "agente") {
            throw new Error("Acceso denegado. Solo los usuarios con el rol de 'agente' pueden iniciar sesión.");
        }

        return usuario;
    }


    async generarCodigoRecuperacion(correo) {
        // Validar que el correo no esté vacío
        if (!correo) {
            throw new Error("El correo es obligatorio");
        }

        // Validar formato del correo
        Validaciones.validarCorreo(correo);

        // Buscar usuario por correo
        const usuario = await UsuarioRepository.getUsuarioByCorreo(correo);
        if (!usuario) {
            throw new Error("No se encontró un usuario con este correo");
        }

        // Generar un código único de recuperación
        const codigoRecuperacion = Utils.generarCodigoRecuperacion(); // Ejemplo: 6 dígitos numéricos
        const expiracion = new Date(Date.now() + 15 * 60 * 1000); // Expira en 15 minutos

        // Guardar el código y la expiración en la base de datos
        await UsuarioRepository.setRecoveryCode(usuario._id, codigoRecuperacion, expiracion);

        // Retornar el código (en producción, enviar por correo en lugar de devolverlo)
        return codigoRecuperacion;
    }

    // Validar un código de recuperación
    async validarCodigoRecuperacion(correo, codigo) {
        // Validar que los campos no estén vacíos
        if (!correo || !codigo) {
            throw new Error("Correo y código son obligatorios");
        }

        // Validar formato del correo
        Validaciones.validarCorreo(correo);

        // Buscar usuario por correo
        const usuario = await UsuarioRepository.getUsuarioByCorreo(correo);
        if (!usuario) {
            throw new Error("No se encontró un usuario con este correo");
        }

        // Validar el código de recuperación usando el repository
        await UsuarioRepository.validateRecoveryCode(usuario.correo, codigo);

        // Si es válido, retornar éxito
        return true;
    }

    // Cambiar la contraseña utilizando un código de recuperación
    async recuperarContrasenaConCodigo(correo, codigo, nuevaContrasena) {
        // Validar el código de recuperación
        await this.validarCodigoRecuperacion(correo, codigo);

        // Validar la nueva contraseña
        Validaciones.validarContrasena(nuevaContrasena);

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(nuevaContrasena, salt);

        // Buscar usuario por correo
        const usuario = await UsuarioRepository.getUsuarioByCorreo(correo);

        // Actualizar la contraseña del usuario
        await UsuarioRepository.updateUsuario(usuario._id, { contrasena: contrasenaEncriptada });

        // Limpiar el código de recuperación y su expiración
        await UsuarioRepository.setRecoveryCode(usuario._id, null, null);

        return "Contraseña actualizada correctamente";
    }
}

module.exports = new UsuarioService();