const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    curp: { type: String, required: true, unique: true },
    rfc: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    telefono: { type: String, required: true, unique: true },
    rol: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now },
    estado: { type: String, required: true, default: "activo" },
    codigoRecuperacion: { type: String, default: null }, // Código para recuperar contraseña
    expiracionCodigo: { type: Date, default: null },     // Fecha de expiración del código
    reactivaciones: { type: Number, default: 0 }, // Contador de reactivaciones
    emisiones: { type: Number, default: 0 } // Contador de emisiones
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
