//getting all buttons and form window we are using in login
const modal = document.getElementById('register-modal');
const logmodal = document.getElementById('login-modal');
const openBtn = document.querySelector('.regbutton');
const closeBtn = document.querySelector('.register-close-btn');
const linkHere = document.querySelector('.register-input-login');


//if there's a click on the register we open the form
openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
})

//if there's a click close the form
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})


//if there's a click on here open opposite form
linkHere.addEventListener('click', () => {
    modal.style.display = 'none';
    logmodal.style.display = 'block';
})


//or if there's click outside the form (close the form)
window.addEventListener('click', (e) => {
    if(e.target === modal){
	modal.style.display = 'none';
    }
})

//getting the actual form inputs
const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

//if there's an incorrect input show this message
function regShowError(input, message) {
    const formValidation = input.parentElement;
    formValidation.className = 'register-form-val error';

    const errorMessage = formValidation.querySelector('p');
    errorMessage.innerText = message;
}

//if the inputs are correct show the green outline
function regShowValid(input){
    const formValidation = input.parentElement;
    formValidation.className = 'register-form-val valid';
}

//make sure there is an input
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

//make sure there is an input with correct amount of characters
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

//check for given passwords to match
function regPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
	regShowError(input2, "Passowrds do not match");
    }
}

//get the input field name
function regGetFieldName(input){
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}


//check if the user's email exist
function regcheckEmail(newEmail, newUsername, newPass){
    $.getJSON("http://localhost:5000/api/v1/users/email/" + newEmail.value, function (data){
        if (data) {
            showError(newEmail, 'Email already in use');
        }else {
            registerAccount(newEmail.value, newUsername.value, newPass.value);
        }
    });
}

//create the User by the api
function registerAccount(newEmail, newUsername, newPass){
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/v1/users",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({"email": newEmail, "username": newUsername, "password": newPass}),
        success: function (data) {
            console.log(data);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
      });
}

//when submitted check all inputs and make sure they are correct
form.addEventListener('submit', (e) => {
    e.preventDefault();
    regCheckRequired([username, email, password, passwordConfirm]);
    regCheckLength(username, 3, 30);
    regCheckLength(password, 8, 25);
    regCheckLength(passwordConfirm, 8, 25);
    regPasswordMatch(password, passwordConfirm);
    regcheckEmail(email, username, password);
})
