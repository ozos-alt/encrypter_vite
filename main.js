import * as seedrandom from 'seedrandom'
import { appWindow } from '@tauri-apps/api/window'

//Global encrypt / decrypt mode select (0 encrypt || 1 decrypt)
let encrypt_decrypt = 0;

//Run button press listener
let button = document.getElementById('encrypt_button')
button.addEventListener("click", () => {
    run_button_pressed()
});

//Method select listener
let operation_selector = document.getElementById("encrypt_decrypt")
operation_selector.addEventListener("change", () => {
    operation_select()
})

//Quit button listener
let exitButton = document.getElementById('quitButton')
exitButton.addEventListener("click", () => {
    appWindow.close()
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        appWindow.close()
    }
})





//Switch between encrypt and decrypt mode and set a global variable accordingly
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



//Runs once the "run" button is pressed
function run_button_pressed() {

    //get handles to all needed elements
    let input_field = document.getElementById("encrypt_input");
    let output_field = document.getElementById("encrypt_output");
    let method_selection = document.getElementById("encryption_method");


    //get and sanitize user input
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
        }
        if(method_selection.value === "poly_alphabetic") {
            output_field.value = poly_encrypt(userInput, Math.abs(key))
            input_field.value = "";
        }
    }

    //if the program is in decrypt mode
    if (encrypt_decrypt === 1) {
        if (method_selection.value === "mono_alphabetic") {
            output_field.value = caesar_operation(userInput, -Math.abs(key))
            input_field.value = "";
        }
        if(method_selection.value === "poly_alphabetic") {
            output_field.value = poly_decrypt(userInput, Math.abs(key))
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
        encrypted_text = encrypted_text + shift_letter(input_text[i], key)
    }

    return(encrypted_text)
}

//Shift letters with support for negative keys
function shift_letter(char, key) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    let pos = alphabet.indexOf(char)
    let new_pos = pos + key

    let wrapped_new_pos = new_pos;

    if(wrapped_new_pos > 25) {
        wrapped_new_pos = new_pos % 26
    }
    if (wrapped_new_pos < 0){
        wrapped_new_pos = Math.abs(new_pos % 26 + 26) % 26
    }
    return(alphabet[wrapped_new_pos])
}

//generate an array of random int32 numbers
function generateRandomArray(length, key) {
    let rng = seedrandom(key)
    let tmpArray = []
    for (let i = 0; i < length; i++) {
        tmpArray.push(rng.int32())
    }
    return tmpArray
}


function poly_encrypt(input, seedKey) {
    let encryptedString = ""
    let keyArray = generateRandomArray(input.length, seedKey)
    for (let i = 0; i < input.length; i++) {
        encryptedString = encryptedString + shift_letter(input[i], Math.abs(keyArray[i]))
    }
    return encryptedString
}

function poly_decrypt(input, seedKey) {
    let decryptedString = ""
    let keyArray = generateRandomArray(input.length, seedKey)
    for (let i = 0; i < input.length; i++) {
        decryptedString = decryptedString + shift_letter(input[i], -Math.abs(keyArray[i]))
    }
    return decryptedString
}