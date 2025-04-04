const mongoose = require('mongoose');

const CuotaMensualSchema = mongoose.Schema({
    cuotaMensual: {type: Number }
})

module.exports = mongoose.model('CuotaMensual', CuotaMensualSchema);