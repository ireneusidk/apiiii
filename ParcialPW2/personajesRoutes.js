const express = require('express');
const router = express.Router();
const fs = require('fs');
const ejs = require("ejs");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { mostrarTodo, agregar, eliminar } = require('./db.js');



//  let personajesCreados = [
//     { id: '2qxn4', nombre: 'Elara Firebrand', descripcion: 'Elara es una poderosa maga que domina el fuego.', imagen: 'elara.jpg' },
//     { id: '2qxn3', nombre: 'Thorn Shadowblade', descripcion: 'Thorn es un hábil guerrero que se mueve con sigilo y precisión.', imagen: 'thorn.jpg' },
//     { id: '2qxn2', nombre: 'Lyra Silverwind', descripcion: 'Lyra es una arquera experta que nunca falla su objetivo.', imagen: 'lyra.jpg' }
//  ];
 
///////////////////////////////////////////////////////////////////////////////////////////////////
const historiaBase = (nombre) => `
En un pequeño pueblo rodeado de montañas y bosques densos, vivía una joven llamada ${nombre}. Desde niña, ${nombre} tenía una conexión especial con la naturaleza; los animales la seguían y las plantas florecían a su paso. Su habilidad más asombrosa era comunicarse con los espíritus del bosque, quienes le susurraban secretos y le enseñaban antiguos conocimientos olvidados por los humanos.

${nombre} había crecido escuchando historias sobre un antiguo árbol sagrado, escondido en lo profundo del bosque, que concedía deseos a aquellos de corazón puro. Decidida a encontrar el árbol, un día se aventuró más allá de los límites del pueblo, siguiendo los susurros de los espíritus.

Después de días de viaje, enfrentando desafíos y ayudando a criaturas en apuros, ${nombre} finalmente llegó al árbol sagrado. Al posar su mano sobre el tronco, el árbol la reconoció como una guardiana del bosque. En ese momento, ${nombre} hizo su deseo: que el bosque y el pueblo coexistieran en armonía, protegidos del daño y la destrucción.

El árbol, complacido por la pureza de su deseo, concedió su petición y le otorgó a ${nombre} poderes mágicos para proteger y sanar. Desde entonces, ${nombre} se convirtió en la protectora del bosque y el pueblo, uniendo ambos mundos con su bondad y sabiduría.
`;

// Obtener todos los personajes
// router.get('/personajes', (req, res) => {
//     res.json(personajesCreados);
// });
router.get('/personajes', async (req, res) => {
    const personajes = await mostrarTodo();
    // res.json(personajes);
    res.render('personajes',{personajes:personajes});
});


// Obtener un personaje por su ID
// router.get('/personajes:id', (req, res) => {
//     const id = req.params.id;
//     let personaje = personajesCreados.find(p => p.id === id);
//     if (!personaje) {
//         res.status(404).send('Personaje no encontrado');
//     } else {
//         res.json(personaje);
//     }
// });


// Crear un nuevo personaje
// router.post('/personajes', (req, res) => {
//     if (!req.body || !req.body.nombre || !req.body.descripcion || !req.body.imagen) {
//         return res.status(400).send('El cuerpo de la solicitud no tiene el formato esperado');
//     }
//     const { nombre, descripcion, imagen } = req.body;
//     const nuevoPersonaje = {                          //Alfanumérico de 9 caracteres
//         id: Math.random().toString(36).substr(2, 9), // Genero un id unico para el personaje en formato alfanumerico
//         nombre,                                      //quitamos el cero inicial 
//         descripcion,
//         imagen
//     };
//     personajesCreados.push(nuevoPersonaje);
//     res.status(201).json(nuevoPersonaje); //codigo de respuesta al crear nuevo elemento
// });
// router.post('/personajes', async (req, res) => {
//     try {
//         const { nombre, descripcion} = req.body;
//         const nuevoPersonaje = { nombre, descripcion};
//         await agregar(nuevoPersonaje);
//         res.redirect('/personajes');
//     } catch (err) {
//         console.error('Error al agregar personaje:', err);
//         res.status(500).send('Error al agregar personaje');
//     }
// });
router.post('/personajes', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        console.log('Datos recibidos:', req.body);  // Depuración
        if (!nombre || !descripcion) {
            return res.status(400).send('Todos los campos son requeridos');
        }
        const nuevoPersonaje = { nombre, descripcion};
        const result = await agregar(nuevoPersonaje);
        console.log('Nuevo personaje agregado:', result);
        res.redirect('/personajes');
    } catch (err) {
        console.error('Error al agregar personaje:', err);
        res.status(500).send('Error al agregar personaje');
    }
});
// Actualizar un personaje existente
// router.put('/personajes/:id', (req, res) => {
//     const id = req.params.id;
//     const { nombre, descripcion, imagen } = req.body;
//     const index = personajesCreados.findIndex(p => p.id === id);
//     //FindIndex devuelve -1 si no se encontró el elemento buscado
//     //si el index no es -1 entonces actualiza el personaje
//     if (index === -1) {
//         res.status(404).send('Personaje no encontrado');
//     } else {
//         personajesCreados[index] = { id, nombre, descripcion, imagen };
//         res.json(personajesCreados[index]);
//     }
// });
// Ruta para actualizar el nombre de un personaje existente y generar la historia
// router.put('/personajes/:id/nombre', (req, res) => {
//     const id = req.params.id;
//     const { nombre } = req.body;
//     const index = personajesCreados.findIndex(p => p.id === id);
//     if (index === -1) {
//         res.status(404).send('Personaje no encontrado');
//     } else {
//         personajesCreados[index].nombre = nombre;

//         const historia = historiaBase(nombre);
//         const filePath = `./historias/${id}_historia.txt`;

//         fs.writeFile(filePath, historia, (err) => {
//             if (err) {
//                 return res.status(500).send('Error al escribir la historia.');
//             }
//             res.json({ personaje: personajesCreados[index], mensaje: 'Historia generada', archivo: filePath });
//         });
//     }
// });
// Ruta para obtener la historia de un personaje por su ID
// router.get('/personajes/:id/historia', (req, res) => {
//     const id = req.params.id;
//     const filePath = path.join(__dirname, 'historias', `${id}_historia.txt`);

//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(404).send('Historia no encontrada');
//         }
//         res.send(data);
//     });
// });
// Eliminar un personaje existente
// router.delete('/personajes:id', (req, res) => {
//     const id = req.params.id;
//     personajesCreados = personajesCreados.filter(p => p.id !== id);
//     res.status(204).end();
// });


router.delete('/personajes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await eliminar(id);
        if (result.deletedCount === 0) {
            return res.status(404).send('Personaje no encontrado');
        }
        res.redirect('/personajes');
    } catch (err) {
        console.error('Error al eliminar personaje:', err);
        res.status(500).send('Error al eliminar personaje');
    }
});

// try {
    //     const id = req.params.id;
    //     const result = await eliminar(id);
    //     if (result.deletedCount === 0) {
    //         return res.status(404).send('Personaje no encontrado');
    //     }
    //     res.status(204).send(); // Código de respuesta 204: No Content
    // } catch (err) {
    //     console.error('Error al eliminar personaje:', err);
    //     res.status(500).send('Error al eliminar personaje');
    // }

// router.put('/personajes/:id/favorito', (req, res) => {
//     const id = req.params.id;
//     const index = personajesCreados.findIndex(p => p.id === id);
//     if (index === -1) {
//         res.status(404).send('Personaje no encontrado2');
//     } else {
//         personajesCreados[index].favorito = true;
//         res.json(personajesCreados[index]);
//     }
// });
//Obtener los personajes favoritos
// router.get('/personajes/favoritos', (req, res) => {
//     const favoritos = personajesCreados.filter(p => p.favorito);
//     res.json(favoritos);
// });
///////////////////////////////////////////////////////////////////////////////////////
 router.get('/personajes/establecidos', async (req, res) => {
     try {
         const response = await fetch('https://rickandmortyapi.com/api/character');
         const data = await response.json();
         const traducciones = {
             species: {
                 'Human': 'Humano',
                 'Alien': 'Extraterrestre',
             },
             gender: {
                 'Male': 'Masculino',
                 'Female': 'Femenino',
                 'unknown': 'Desconocido',
                 'Genderless': 'Sin género',
             }
         };
         // Esta funcion sirve para traducir los datos recibidos de la pagina rick and morty
         //en categoria van las especies 
         //si no se encuentra el valor entonces retorna el valor original en ingles
         function traducir(categoria, valor) {
             return traducciones[categoria][valor] || valor;
         }
         personajesRickMorty = data.results.map(personaje=>({
             id:personaje.id,
            nombre: personaje.name,
             descripcion: `${traducir('species', personaje.species)} ${traducir('gender', personaje.gender)}`,
             imagen: personaje.image,
         }));
         res.json(personajesRickMorty); 
     } catch (error) {
         console.error('Error al obtener los personajes específicos', error);
         res.status(500).send('Error interno del servidor');
     }
 });
module.exports = router;

