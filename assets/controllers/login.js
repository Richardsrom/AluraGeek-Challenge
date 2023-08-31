
//Codigo de validacion para los inputs
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

const tipoDeErrores = [ "valueMissing", "typeMismatch", "patternMismatch" ];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
        patternMismatch: "Debe contener min 5 y max 40 caracteres"
    },
    email: { 
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo password no puede estar vacio",
        patternMismatch: "Min 6 caracteres max 12, 1 letra mayuscula, 1 letra minuscula, 1 caracter especial y 1 numero",
    },
}

// Función para verificar si hay errores en algún input
function hayErrores(formulario) {

    let errores = false;
    const inputs = formulario.querySelectorAll(".inputValidation");

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

requiredInputs.forEach((input) => {    
    input.addEventListener("blur", (event) => {
        valida(event.target);
    });
});


// Agregar evento de click al botón del formulario deseado
const formLogin = document.querySelector('.login__form-content');
const btnLogin = formLogin.querySelector('.login__input-btn');

btnLogin.addEventListener("click", (event) => {

    event.preventDefault();

    // Verificar si hay campos vacíos en los inputs del formulario
    const hayCamposVacios = Array.from(requiredInputs).some((input) => input.value.trim() === "");

    if (hayCamposVacios) {
        alert('Completa todos los campos');
    } else if (hayErrores(formLogin)) {
        alert('Completa todos los campos correctamente');
    } else {
        window.location.href = "../screens/products.html";
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