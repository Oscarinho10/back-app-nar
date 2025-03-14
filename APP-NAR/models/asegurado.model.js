const mongoose = require('mongoose');

const AseguradoSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    correo: { type: String, required: true, unique: true },
    rfc: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true },
    idCliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }
})

module.exports = mongoose.model('Asegurado', AseguradoSchema);