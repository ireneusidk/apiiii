// cypress/integration/personajes.spec.js
describe('Personajes CRUD Tests', () => {
    // // URL base de tu aplicación
     const baseUrl = 'http://localhost:3000';

    it('cargar personajes en la pagina', () => {
        cy.visit(`${baseUrl}/personajes`);
        cy.contains('Lista de personajes creados por el usuario');
    });

    it('añadir un nuevo personaje', () => {
        cy.visit(`${baseUrl}/personajes`);
        
        // Fill in the form
        cy.get('input[name="nombre"]').type('Nuevo Personaje');
        cy.get('input[name="descripcion"]').type('Descripción del nuevo personaje');
        // // Si no tienes un campo de carga de imagen puedes omitir esta línea
        // cy.get('input[name="imagen"]').attachFile('path/to/image.jpg');

        // Submit the form
        cy.get('input[type="submit"]').click();
        
        // Check if the new personaje is listed
        cy.contains('Nuevo Personaje');
        cy.contains('Descripción del nuevo personaje');
    });


});
