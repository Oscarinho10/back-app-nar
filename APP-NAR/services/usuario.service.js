const bcrypt = require("bcryptjs");
const UsuarioRepository = require("../repositories/usuario.repository");
const Validaciones = require("../utils/validation");
const Utils = require("../utils/utils");

class AseguradoraService {
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
        usuario.rol = "postulate";
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
        return await UsuarioRepository.updateUsuarioStatusActive(id)

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


}

module.exports = new AseguradoraService();