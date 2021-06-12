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
const username = document.getElementById('name');
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


function regcheckEmail(newEmail, newUsername, newPass){
    $.getJSON("http://localhost:5000/api/v1/users/email/" + newEmail.value, function (data){
        if (data) {
            showError(newEmail, 'Email already in use');
        }else {
            console.log("SEND IT");
            registerAccount(newEmail.value, newUsername.value, newPass.value);
        }
    });
}

function registerAccount(newEmail, newUsername, newPass){
    // $.post("http://localhost:5000/api/v1/users", {email: newEmail, username: newUsername, password: newPass})
    // .done(function( data ) {
    //     console.log("Done")
    //   });
    console.log(newEmail);
    console.log(newUsername);
    console.log(newPass);
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/v1/users",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({"email": newEmail, "username": newUsername, "password": newPass}),
        success: function (data) {
            console.log(data);
            console.log("Posted");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
      });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    regCheckRequired([username, email, password, passwordConfirm]);
    regCheckLength(username, 3, 30);
    regCheckLength(password, 8, 25);
    regCheckLength(passwordConfirm, 8, 25);
    regPasswordMatch(password, passwordConfirm);
    regcheckEmail(email, username, password);
})
