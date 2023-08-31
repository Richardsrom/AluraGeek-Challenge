
//Aqui estamos importando para utilizar el GET de nuestros productos en db.json
import { productosService } from "./assets/services/productos-service.js";


const input = document.querySelectorAll("input");
const requiredInputs = document.querySelectorAll(".inputCheck");


input.forEach((inputElement) => {  
    inputElement.addEventListener("blur", (event) => {
        valida(inputElement); // Pasar el elemento input al llamar a la función 'valida()'
    });
});

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            if (mensajesDeError[tipoDeInput] && mensajesDeError[tipoDeInput][error]) {
                mensaje = mensajesDeError[tipoDeInput][error];
            }
        }
    });
    return mensaje;
}


function valida(input) {

    const tipoDeInput = input.dataset.naruto;

    if(input.validity.valid) {
        input.parentElement.classList.remove("us__group--invalid");
        input.parentElement.querySelector(".input__msj-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("us__group--invalid");
        input.parentElement.querySelector(".input__msj-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [ "valueMissing", "typeMismatch", "patternMismatch", "customError",];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
        patternMismatch: "Debe contener min 5 y max 40 caracteres"
    },
    img: {
        valueMissing: "El campo imagen no puede estar vacio",
        patternMismatch: "Debe contener min 5 y max 90 caracteres"
    },
    asunto: {
        valueMissing: "El campo asunto no puede estar vacio",
        patternMismatch: "Debe contener min 3 y max 30 caracteres",
    },
    category: {
        valueMissing: "La categoria no puede estar vacio",
        patternMismatch:"Sola letras minúsculas y debe contener min 5 y max 15 caracteres",
    },
    productName: {
        valueMissing:"El nombre del producto no puede estar vacio",
        patternMismatch: "Debe contener max 20 caracteres",
    },
    price: {
        valueMissing:"El precio no puede estar vacio",
        patternMismatch:"Debe contener solo numeros",
    },

}

requiredInputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});


// Función para verificar si hay errores en algún input
function hayErrores(formulario) {

    let errores = false;
    const inputs = formulario.querySelectorAll(".inputCheck");

    inputs.forEach((input) => {
        const tipoDeInput = input.dataset.naruto;

        // Verificar que el input pertenece al formulario deseado
        if (input.form === formulario && !input.validity.valid) {
            input.parentElement.classList.add("us__group--invalid");
            input.parentElement.querySelector(".input__msj-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
            errores = true;
        }
    });

    requiredInputs.forEach((input) => {

        const tipoDeInput = input.dataset.naruto;
        if (!input.validity.valid) {
            input.parentElement.classList.add("us__group--invalid");
            input.parentElement.querySelector(".input__msj-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
            errores = true;
        }
    });

    return errores;
}

// Agregar evento de click al botón del formulario deseado
const formProductos = document.querySelector(".products__form-content");
const btnProductos = formProductos.querySelector(".products__input-btn");


//Esta funcion se encarga de verificar si hay errores en los inputs y textarea del formulario y de publicar nuestro producto en nuestra pagina principal index.html con el metodo POST. 
btnProductos.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Verificar si hay campos vacíos en los inputs del formulario
    const hayCamposVacios = Array.from(requiredInputs).some((input) => input.value.trim() === "");
    const hayTextosVacios = Array.from(textarea).some( (textareaElement) => textareaElement.value.trim() === "");

    if (hayCamposVacios && hayTextosVacios) {
        alert("Completa todos los campos");
    } else if (hayErrores(formProductos)) {
        alert("Completa todos los campos correctamente");
    } else {
        // Aquí puedes realizar alguna acción si todos los campos están completos y sin errores
        // Por ejemplo, enviar un formulario o realizar una operación
        
        //Aqui estamos seleccionando todos los 'valores' de nuestro formulario para que se cré una card y que haga un POST en nuestro index.html y le estamos diciendo a donde se tiene que ir una vez dandole click al boton del formulario.
        const img = document.querySelector('[data-img]').value;
        const category = document.querySelector('[data-category]').value;
        const name = document.querySelector('[data-name]').value;
        const price = document.querySelector('[data-price]').value;
        const description = document.querySelector('[data-description]').value;

        productosService
        .creaProductos(name, img, price, category, description)
        .then(respuesta => {
            window.location.href = '../../index.html';
            console.log(respuesta);
        })
        .catch(error => {
            console.log(error);
        });
    }
});




//Codigo para el textarea validacion 

const mensajesDeErrorText = {

    mensaje: {
        pattern: /[\s\S]{10,120}/,
        longitud: "El mensaje debe tener entre 10 y max 120 caracteres",
        vacio: "El campo mensaje no puede estar vacío",
    },
    mensajeProducts: {
        pattern: /[\s\S]{5,150}/,
        longitud: "El mensaje debe tener entre 5 y  max 150 caracteres",
        vacio: "El campo mensaje no puede estar vacío",
    },
};

function validaTextarea(textarea) {

    const contenido = textarea.value;
    const tipoDeTextarea = textarea.dataset.naruto;

    const pattern = mensajesDeErrorText[tipoDeTextarea].pattern;
    const mensajeErrorLongitud = mensajesDeErrorText[tipoDeTextarea].longitud;;
    const mensajeErrorVacio = mensajesDeErrorText[tipoDeTextarea].vacio;

    if (contenido.trim() === "") {
        textarea.parentElement.classList.add("us__group--invalid");
        textarea.parentElement.querySelector(".input__msj-error").innerHTML = mensajeErrorVacio;
    } else if (pattern.test(contenido)) {
        textarea.parentElement.classList.remove("us__group--invalid");
        textarea.parentElement.querySelector(".input__msj-error").innerHTML = "";
    } else {
        textarea.parentElement.classList.add("us__group--invalid");
        textarea.parentElement.querySelector(".input__msj-error").innerHTML = mensajeErrorLongitud;
    }

}

const textarea = document.querySelectorAll("textarea");

textarea.forEach((textareaElement) => {
    textareaElement.addEventListener("blur", (event) => {
        validaTextarea(textareaElement); // Pasar el elemento textarea al llamar a la función 'validaTextarea()'
    });
});



