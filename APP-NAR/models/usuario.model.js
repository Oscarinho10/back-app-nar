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
    rol: { type: String, required: true},
    fechaRegistro: { type: Date, default: Date.now },    
    estado: {type: String, required: true, default: "activo"}
})

module.exports = mongoose.model('Usuario', UsuarioSchema);