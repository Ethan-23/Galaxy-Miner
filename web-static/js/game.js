window.addEventListener('load', () => {
    const email = localStorage.getItem('EMAIL');
    console.log(email);
    $.getJSON("http://localhost:5000/api/v1/users/email/" + email, function (data){
        if (data) {
        }
    });
})
