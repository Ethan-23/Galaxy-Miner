//getting all buttons and form window we are using in login
const loginmodal = document.getElementById('login-modal');
const regmodal = document.getElementById('register-modal');
const loginopenBtn = document.querySelector('.loginbutton');
const logincloseBtn = document.querySelector('.login-close-btn');
const hereLink = document.querySelector('.login-input-login');


//if there's a click on the login we open the form
loginopenBtn.addEventListener('click', () => {
    loginmodal.style.display = 'block';
})


//if there's a click close the form
logincloseBtn.addEventListener('click', () => {
    loginmodal.style.display = 'none';
})


//if there's a click on here open opposite form
hereLink.addEventListener('click', () => {
    loginmodal.style.display = 'none';
    regmodal.style.display = 'block';
})


//or if there's click outside the form (close the form)
window.addEventListener('click', (e) => {
    if(e.target === loginmodal){
	loginmodal.style.display = 'none';
    }
})


//getting the actual form inputs
const logform = document.getElementById('logform');
const logemail = document.getElementById('log-email');
const logpassword = document.getElementById('log-password');


//if there's an incorrect input show this message
function showError(input, message) {
    const formValidation = input.parentElement;
    formValidation.className = 'login-form-val error';

    const errorMessage = formValidation.querySelector('p');
    errorMessage.innerText = message;
}

//if the inputs are correct show the green outline
function showValid(input){
    const formValidation = input.parentElement;
    formValidation.className = 'login-form-val valid';
}

//make sure there is an input
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
	if(input.value.trim() === ''){
	    showError(input, `${getFieldName(input)} is required`);
	}else{
	    showValid(input);
	}
    })
}

//get the input field name
function getFieldName(input){
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

//set email to store locally
function storeSession(){
    const fullemail = logemail.value;
    localStorage.setItem("EMAIL", fullemail);
    return;
}

//check if the user's email and password are correct
function checkEmail(input, pass){
    $.getJSON("http://localhost:5000/api/v1/users/email/" + input.value, function (data){
        if (data) {
            if (pass.value == data["password"]){
                location.href = "../game_v2/main_page.html";
                return;
            }else {
                showError(pass, 'incorrect password');
                return;
            }
        }else {
            showError(input, 'couldn\'t find your account');
            showError(pass, "");
            return;
        }
    });
}

//when submitted check all inputs and make sure they are correct
logform.addEventListener('submit', (f) => {
    f.preventDefault();
    checkRequired([logemail, logpassword]);
    checkEmail(logemail, logpassword);
    storeSession();
    return;
})
