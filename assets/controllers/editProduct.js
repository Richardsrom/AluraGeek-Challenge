
import { productosService } from "../services/productos-service.js";

const getURL = new URL(window.location);

const id = getURL.searchParams.get('id');

console.log(id);

const inputImg = document.querySelector('[data-url');
const inputCategory = document.querySelector('[data-category]');
const inputName = document.querySelector('[data-name]');
const inputPrice = document.querySelector('[data-price]');
const inputDescription = document.querySelector('[data-description]');

productosService.listarUnProducto(id)
.then( (datos) => {
    inputImg.setAttribute('src', datos.img);
    inputCategory.value = datos.category;
    inputName.value = datos.name;
    inputPrice.value = datos.price;
    inputDescription.value = datos.description;
});

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    productosService.alterarProducto(
        inputName.value,
        inputPrice.value,
        inputCategory.value,
        inputDescription.value,
        id
    )    
    .then( () => {
        window.location.href = '../screens/index.html';
    });
});