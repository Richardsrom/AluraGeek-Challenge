// Aqui se va a encargar de crear la estructura del 'card' para ponerla en el HTML y renderizar toda la lista que tenemos en el db.json en nuestro HMTL

import { productosService } from "../services/productos-service.js";

//Aqui vamos a darle funcionamiento a nuestro input de busqueda, cuando sea para movil.
let logoSearchBtn = document.querySelector('.logoSearchBtn');
let inputSearch = document.querySelector('.input__searchBar');
let btnLogin = document.querySelector('.header__button');

logoSearchBtn.onclick = () => {
    inputSearch.classList.toggle('reveal');
    btnLogin.classList.toggle('hide');
}


const categories = {
    starwars: document.getElementById("starwars"),
    consoles: document.getElementById("consoles"),
    various: document.getElementById("various"),
    //Aqui podemos agregar mas categorias si es necesario. 
};

const nuevoProducto = (name, img, price, id) => {

    const card = document.createElement('div');

    const contenido = `
    <div class="starwars__products">
        <div class="starwars__produts-item" id= ${id}>
            <div class="starwars__products-img-container">
                <img class="starwars__products-img" src="${img}" alt="Picture">
            </div>
            <ul class="starwars__products-list">
                <li class="starwars__product-info">${name}</li>
                <li class="starwars__product-infoPrice">${price}</li>
                <li class="starwars__product-infoLink">Ver Producto</li>
            </ul>
        </div>
    </div>
    `;

    card.innerHTML = contenido;
    return card;
};

//const productos = document.querySelector("[data-product]")

const render = async () => {
    try {
        const listaProducto = await productosService.listaProductos();

        listaProducto.forEach( (element) => {

            const categoria = element.category;

            if( categoria in categories ) {
                categories[categoria].appendChild(
                    nuevoProducto(
                        element.name,
                        element.img,
                        element.price,
                        element.description,
                        element.id
                    )
                )
            }
        });
    } catch (error) {
        console.log(error);
        
    }
};

render();

//Codigo para hacer la busqueda de un producto por el nombre.
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterAndRender(searchTerm);
});

const filterAndRender = async (filter) => {
    try {
        const listaProducto = await productosService.listaProductos();

        // Filtrar productos según el término de búsqueda
        const filteredProducts = listaProducto.filter(product => {
            const productName = product.name.toLowerCase();
            return productName.includes(filter);
        });

        // Limpiar los contenedores antes de renderizar
        Object.values(categories).forEach(category => {
            category.innerHTML = "";
        });

        // Renderizar los productos filtrados
        filteredProducts.forEach(element => {
            const categoria = element.category;
            if (categoria in categories) {
                categories[categoria].appendChild(
                    nuevoProducto(
                        element.name,
                        element.img,
                        element.price,
                        element.id
                    )
                );
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// Renderizar la lista completa al cargar la página inicialmente
filterAndRender("");
