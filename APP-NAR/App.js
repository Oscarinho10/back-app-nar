const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar el paquete cors
const bodyParser = require('body-parser');
const aseguradorasRoutes = require('./routes/aseguradora.routes');
const clientesRoutes = require('./routes/cliente.routes');
const aseguradosRoutes = require('./routes/asegurado.routes');
const usuariosRoutes = require('./routes/usuario.routes');
const segurosRoutes = require('./routes/seguro.routes');

const App = express();
const PORT = 3000;

App.use(cors());

App.use(bodyParser.json());

App.use('/nar/aseguradoras', aseguradorasRoutes);
App.use('/nar/clientes', clientesRoutes);
App.use('/nar/asegurados', aseguradosRoutes);
App.use('/nar/usuarios', usuariosRoutes);
App.use('/nar/seguros', segurosRoutes);

// mongodb+srv://20233tn143:5yZYXxMXa6998s1H@mongazo1.yez4y.mongodb.net/?retryWrites=true&w=majority&appName=Mongazo1'
mongoose.connect('mongodb+srv://20233tn143:5yZYXxMXa6998s1H@mongazo1.yez4y.mongodb.net/app-nar-db?retryWrites=true&w=majority&appName=Mongazo1')
    .then(() => {
        console.log('Conexión exitosa a la base de datos a MongoDB');
        App.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch((err) => console.log('Error al conectar en MongoDB', err));

/**
 * ¿Y dónde estás tú?
Aún tengo el tattoo, mientras tú tapaste con un fuck you el mío
No dejo dormir a los pinches vecinos
Con los tragos lloro, con un polvo me río

Y yo seguiré siendo un desmadre
Tú tendrás tu familia, pa' mí será tarde
Pidiendo otra onza, pidiendo más vino
Tú querías tus hijos, pero no conmigo
 */