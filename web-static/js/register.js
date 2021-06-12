const modal = document.getElementById('register-modal');
const openBtn = document.querySelector('.regbutton');
const closeBtn = document.querySelector('.register-close-btn');

openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if(e.target === modal){
	modal.style.display = 'none';
    }
})

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

function regShowError(input, message) {
    const formValidation = input.parentElement;
    formValidation.className = 'register-form-val error';

    const errorMessage = formValidation.querySelector('p');
    errorMessage.innerText = message;
}
function regShowValid(input){
    const formValidation = input.parentElement;
    formValidation.className = 'register-form-val valid';
}

function regCheckRequired(inputArr) {
    inputArr.forEach(function(input) {
	if(input.value.trim() === ''){
	    regShowError(input, `${regGetFieldName(input)} is required`);
	    return;
	}else{
	    regShowValid(input);
	}
    })
}

function regCheckLength(input, min, max) {
    if (input.value.length < min) {
	regShowError(input, `${regGetFieldName(input)} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
	regShowError(input, `${regGetFieldName(input)} must be less than ${max} characters`);
    }
    else {
	regShowValid(input);
    }
}

function regPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
	regShowError(input2, "Passowrds do not match");
    }
}

function regGetFieldName(input){
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}


function regcheckEmail(input){
    $.getJSON("http://localhost:5000/api/v1/users/email/" + input.value, function (data){
        if (data) {
            showError(input, 'Email already in use');
        }else {
            console.log("SEND IT");
        }
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    regCheckRequired([name, email, password, passwordConfirm]);
    regCheckLength(name, 3, 30);
    regCheckLength(password, 8, 25);
    regCheckLength(passwordConfirm, 8, 25);
    regPasswordMatch(password, passwordConfirm);
    regcheckEmail(email);
})
