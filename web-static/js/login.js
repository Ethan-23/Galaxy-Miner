const loginmodal = document.getElementById('login-modal');
const loginopenBtn = document.querySelector('.loginbutton');
const logincloseBtn = document.querySelector('.login-close-btn');

loginopenBtn.addEventListener('click', () => {
	loginmodal.style.display = 'block';
})

logincloseBtn.addEventListener('click', () => {
	loginmodal.style.display = 'none';
})

window.addEventListener('click', (e) => {
	if(e.target === loginmodal){
		loginmodal.style.display = 'none';
	}
})

const logform = document.getElementById('logform');
const logemail = document.getElementById('log-email');
const logpassword = document.getElementById('log-password');

function showError(input, message) {
	const formValidation = input.parentElement;
	formValidation.className = 'login-form-val error';
	
	const errorMessage = formValidation.querySelector('p');
	errorMessage.innerText = message;
}
function showValid(input){
	const formValidation = input.parentElement;
	formValidation.className = 'login-form-val valid';
}

function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if(input.value.trim() === ''){
			showError(input, `${getFieldName(input)} is required`);
		}else{
			showValid(input);
		}
	})
}


function getFieldName(input){
	return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

function getValue(input){
	console.log(input.value);
	return input.name;
}

logform.addEventListener('submit', (f) => {
	f.preventDefault();
	checkRequired([logemail, logpassword]);
	console.log(logemail.value);
	console.log(logpassword.value);
})
