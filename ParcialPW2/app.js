// API de Personajes prueba de CRUD

// .Esta API nos permite crear nuestro personaje 
// . Ejemplo: aplicación que guarde productos (ejemplo arreglo de JS)
//   . GET /personajes (obtenemos todos los personajes)
//   . GET /personajes :id (obtenemos un personaje por id)
//   . GET /personajes/favoritos (Filtra los personajesCreados para obtener solo los favoritos, si es true los devuelve)
//   . POST /personajes (creamos un personaje con id random)
//   . PUT /personajes/:id (actualizamos un personaje ya creado)
//   . PUT /personajes/:id/favorito (Busca el personaje por su ID y establece su propiedad favorito en true)
//   . DELETE /personajes:id (eliminamos a un personaje, Filtra personajesCreados para eliminar el coincidente con el ID)
//   . GET /personajes/establecidos (obtenemos personajes consumidos de una API y los traducimos)
//   
//Routes maneja las rutas relacionadas con los personajes
//Tenemos una lista de personajes predefinida y podemos ir posteando mas
    const express = require('express');
    const methodOverride = require('method-override');
    const routes = require('./routes');
    const personajesRoutes = require('./personajesRoutes');
    
    const app = express();
    const port = 3000;
    const path = require('path');
    const ejs = require("ejs");
   
    app.use(methodOverride('_method'));
    ///////////////////////////////////////////////////
    app.use(express.static(__dirname + '/public'));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    
    app.use(express.urlencoded({ extended: true }));

   
    app.use(express.text());
    app.use(express.json());
    app.use(routes);
    app.use(personajesRoutes)
    //////////////////////////////////////////////////
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });