import * as seedrandom from 'seedrandom'
let encrypt_decrypt = 0;



function operation_select() {
    let input_field = document.getElementById("encrypt_input");
    let output_field = document.getElementById("encrypt_output");
    let operation_select = document.getElementById("encrypt_decrypt")

    if(operation_select.value === "encrypt") {
        input_field.placeholder = "Cleartext";
        output_field.placeholder = "Encrypted text";
        encrypt_decrypt = 0;
    }
    if(operation_select.value === "decrypt") {
        input_field.placeholder = "Encrypted text";
        output_field.placeholder = "Cleartext";
        encrypt_decrypt = 1;
    }
}



function run_button_pressed() {
    let rng = seedrandom('Hello!')
    console.log(rng())

    let input_field = document.getElementById("encrypt_input");
    let output_field = document.getElementById("encrypt_output");
    let method_selection = document.getElementById("encryption_method");
    let key = parseInt(document.getElementById("encryption_key").value);

    let userInput = input_field.value.replace(/[^A-Z0-9]/ig, "")
    userInput = userInput.toLowerCase();

    //If no key is entered
    if(key === ""){
        key = 0;
        encrypt_decrypt = 3;
        output_field.value = "Dont use default key";
    }

    //if the program is in encrypt mode
    if(encrypt_decrypt === 0) {
        if(method_selection.value === "mono_alphabetic") {
            output_field.value = caesar_operation(userInput, Math.abs(key))
            input_field.value = "";
            console.log("Key:" + Math.abs(key))
        }
        if(method_selection.value === "poly_alphabetic") {
            input_field.value = "poly";
        }
    }

    //if the program is in decrypt mode
    if (encrypt_decrypt === 1) {
        if(method_selection.value === "mono_alphabetic") {
            output_field.value = caesar_operation(userInput, -Math.abs(key))
            console.log("Key:" + -Math.abs(key))
            input_field.value = "";
        }
    }




}

//caesar shifts an input string and returns the encrypted version.
//To decrypt just use a negative version of the original key
function caesar_operation(input, key) {
    let input_text = input
    let encrypted_text = ""

    for (let i = 0; i < input_text.length; i++) {
        //console.log(input_text[i])
        encrypted_text = encrypted_text + shifted_letter(input_text[i], key)
    }

    return(encrypted_text)
}

//shifts letters with support for negative keys
function shifted_letter(char, key) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    let pos = alphabet.indexOf(char)
    console.log("pos: " + pos)
    let new_pos = pos + key
    console.log("new pos: " + new_pos)

    let wrapped_new_pos = new_pos;

    if(wrapped_new_pos > 25) {
        wrapped_new_pos = new_pos % 26
    }
    if (wrapped_new_pos < 0){
        wrapped_new_pos = Math.abs(new_pos % 26 + 26) % 26
    }
    console.log("Wrapped position: " + wrapped_new_pos)
    return(alphabet[wrapped_new_pos])
}


function poly_encrypt(input, key) {

}

function poly_decrypt(input, key) {

}