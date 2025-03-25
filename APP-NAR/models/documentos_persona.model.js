const mongoose = require('mongoose');

const documentosPersonaSchema = new mongoose.Schema({
    idUsuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
    idDocumento: {type: mongoose.Schema.Types.ObjectId, ref: 'Documento', required: true},
    estado: {type: String, required: true, default: 'activo'}
})

module.exports = mongoose.model('DocumentosPersona', documentosPersonaSchema);    