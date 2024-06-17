fetch('/personajes')
    .then(response => response.json())
    .then(data => {
        const personajesLista = document.getElementById('personajes-lista');
        data.forEach(personaje => {
            const li = document.createElement('li');
            li.textContent = `${personaje.nombre}: ${personaje.descripcion}`;
            personajesLista.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error al obtener los personajes:', error);
    });

    // fetch('/personajes')
    // .then(response => response.json())
    // .then(data => {
    //     const personajesLista = document.getElementById('personajes-lista');
    //     data.forEach(personaje => {
    //         const li = document.createElement('li');
    //         li.textContent = `${personaje.nombre}`;
    //         li.dataset.id = personaje.id;
    //         li.addEventListener('click', () => {
    //             fetch(`/personajes/${personaje.id}/historias`)
    //                 .then(response => response.text())
    //                 .then(historias => {
    //                     document.getElementById('historias').textContent = historias;
    //                 })
    //                 .catch(error => {
    //                     console.error('Error al obtener la historia:', error);
    //                 });
    //         });
    //         personajesLista.appendChild(li);
    //     });
    // })
    // .catch(error => {
    //     console.error('Error al obtener los personajes:', error);
    // });