/*

Esta funcion la estamos utilizando con sripts.js por las validaciones.

import { productosService } from "../services/productos-service.js";

const form = document.querySelector('[data-form]');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const img = document.querySelector('[data-img]').value;
    const category = document.querySelector('[data-category]').value;
    const name = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const description = document.querySelector('[data-description]').value;

    productosService
    .creaProductos(name, img, price, category, description)
    .then(respuesta => {
        window.location.href = '../screens/index.html';
        console.log(respuesta);
    })
    .catch(error => {
        console.log(error);
    });
});

*/