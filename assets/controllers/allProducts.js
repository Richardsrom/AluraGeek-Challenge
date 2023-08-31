
import { productosService } from "../services/productos-service.js";

//Aqui vamos a darle funcionamiento a nuestro input de busqueda, cuando sea para movil.
let logoSearchBtn = document.querySelector('.logoSearchBtn');
let inputSearch = document.querySelector('.input__searchBar');

logoSearchBtn.onclick = () => {
    inputSearch.classList.toggle('reveal');
}


const getProducts = (name, img, price, id ) => {
    const card = document.createElement('div');

    const content = `
    <div class="starwars__produts-item" id=${id}>
        <div class="starwars__products-img-container">
            <div class="starwars__img-container">
                <img class="starwars__products-img" src="${img}" alt="Baby Yoda">
            </div>
            <div class="products__item-edit">
            <button class="btn__erase" type="button"><i class="fa-solid fa-trash"></i></button>
            <a href="../screens/editProduct.html?id=${id}">
            <button class="btn__edit"><i class="fa-solid fa-pen"></i></button>
            </a>
            </div>
        </div>
        <ul class="starwars__products-list">
            <li class="starwars__product-info">${name}</li>
            <li class="starwars__product-infoPrice">${price}</li>
            <li class="starwars__product-infoLink">Ver producto</li>
        </ul>
    </div>
    `;
    card.innerHTML = content;
    card.dataset.id = id;
    return card;
};


//Borrar un producto con el id
const products = document.querySelector('[data-AllProducts]');

products.addEventListener('click', async (event) => {

    let deleteBtn = event.target.classList.contains('btn__erase');

    // Si el clic se hizo en el ícono, sube un nivel para llegar al botón
    if (!deleteBtn && event.target.closest('.btn__erase')) {
        deleteBtn = true;

        event.preventDefault();
    }

    if (deleteBtn) {
        const product = event.target.closest('[data-id]'); 

        let id = product.dataset.id;

        productosService.deleteProducto(id)
        .then( (res) => {
            product.remove();
            console.log(res);
        })
        .catch( (err) => console.log('Error al eliminar',err) );
    }
}); 

//Codigo para hacer una busqueda de un producto por el nombre

const allProductsContainer = document.querySelector('[data-AllProducts]');
const searchInput = document.getElementById('searchInput');

const renderProducts = (productsData, container) => {
    container.innerHTML = '';
    productsData.forEach(product => {
        container.appendChild(
            getProducts(
                product.name,
                product.img,
                product.price,
                product.id
            )
        );
    });
};

const renderAllProducts = async () => {
    try {
        const listProducts = await productosService.listaProductos();
        renderProducts(listProducts, allProductsContainer);
    } catch (error) {
        console.log(error);
    }
};

renderAllProducts();

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterAndRender(searchTerm);
});

const filterAndRender = async (filter) => {
    try {
        const listaProducto = await productosService.listaProductos();

        const filteredProducts = listaProducto.filter(product => {
            const productName = product.name.toLowerCase();
            return productName.includes(filter);
        });

        renderProducts(filteredProducts, allProductsContainer);

    } catch (error) {
        console.log(error);
    }
};

// Renderizar la lista completa al cargar la página inicialmente
filterAndRender('');



