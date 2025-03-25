const Cotizacion = require('../models/cotizacion.model'); // Ajusta la ruta según la ubicación de tu modelo

class Utils {
    calcularEdad(fechaNacimiento) {
        // Convertir la fecha de nacimiento en un objeto Date
        const fechaNac = new Date(fechaNacimiento);

        // Obtener la fecha actual
        const hoy = new Date();

        // Calcular la edad
        let edad = hoy.getFullYear() - fechaNac.getFullYear();

        // Verificar si ya cumplió años este año
        const mesActual = hoy.getMonth();
        const diaActual = hoy.getDate();
        const mesNacimiento = fechaNac.getMonth();
        const diaNacimiento = fechaNac.getDate();

        // Si aún no ha cumplido años este año, restar 1 a la edad
        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
            edad--;
        }

        // Retornar la edad
        return edad;
    }

    async updateCotizacionStatusEmitida(idCotizacion) {
        // Verifica si la cotización existe
        const cotizacion = await Cotizacion.findById(idCotizacion);

        if (!cotizacion) {
            throw new Error('La cotización no existe');
        }

        // Actualiza el estado de la cotización
        cotizacion.estado = 'emitida';

        // Guarda los cambios
        await cotizacion.save();

        return cotizacion; // Devuelve la cotización actualizada
    }

    // Ejemplo de uso

    // console.log(esMayorDeEdad("2005-02-12")); // ✅ true (mayor de edad)
    // console.log(esMayorDeEdad("2010-08-25")); // ❌ false (menor de edad)
}

module.exports = new Utils();