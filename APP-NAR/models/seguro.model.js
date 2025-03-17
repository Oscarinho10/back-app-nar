const mongoose = require('mongoose');

const SeguroSchema = mongoose.Schema({
    idAseguradora: { type: mongoose.Schema.Types.ObjectId, ref: 'Aseguradora', required: true },
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    cobertura: { type: String, required: true },
    precioBase: { type: Number, required: true },
    periodoCobertura: { type: String, required: true },
    estado: { type: String, required: true, default: "activo" }
})

module.exports = mongoose.model('Seguro', SeguroSchema);