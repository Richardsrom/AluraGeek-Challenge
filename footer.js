
const input = document.querySelectorAll("input");
//const requiredInputs = document.querySelectorAll(".inputCheck");

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
    search: {
        valueMissing: "El campo nombre no puede estar vacio",
    }
}
/*
requiredInputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});
*/

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