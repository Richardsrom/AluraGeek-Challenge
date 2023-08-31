//GET
// Aqui vamos a hacer la primera llamada a nuestra API.
//Lo que estamos haciendo aqui con el CRUD es GET que es Read que esta leyendo todo mi array que esta en mi db.json

const listaProductos = () => {
    return fetch("https://fake-api-2-three.vercel.app/producto")
    .then((respuesta) => respuesta.json())//quiero que mi respuesta se transforme a .json()
    .catch((error) => console.log(error));//si hay error que me lo muestre
};

//Esta funcion la vamos a utilizar para nuestra screen editProduct.html que vamos a llamar unicamente al producto que queramos cambiar mediante el id

const listarUnProducto = (id) => {
    return fetch(`https://fake-api-2-three.vercel.app/producto/${id}`)
    .then( (answer) => {
        return answer.json();
    });
};


//POST
//Aqui vamos a crear nuestra funcion para crear una card para nuestros productos y lo haremos con el metodo POST que es Update del CRUD

const creaProductos = (name, img, price, category, description) => {
    return fetch("https://fake-api-2-three.vercel.app/producto", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            img,
            price,
            category,
            description,
        }),
    })
    .then(respuesta => {
        if (respuesta.ok) {
            return respuesta.body;
        }
        throw new Error('No se puede crear el producto 🫢');
    });
};


//PUT / PATCH
//Aqui vamos a editar nuestro producto
const alterarProducto = async (name, price, category, description, id) => {
    return fetch(`https://fake-api-2-three.vercel.app/producto/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            price,
            category,
            description,
        }),
    })
    .then( (answer) => {
        return answer.json();
    })
    .catch( (error) => console.log(error) );
}


//DELETE
//Aqui vamos a eliminar directamente un producto. 
const deleteProducto = async(id) => {
    return await fetch(`https://fake-api-2-three.vercel.app/producto/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};



//Aqui estamos exportando todas nuestras funciones para poder utilizarlas en nuestro archivo correspondiente
export const productosService = {
    listaProductos,
    listarUnProducto,
    creaProductos,
    alterarProducto,
    deleteProducto,
};



