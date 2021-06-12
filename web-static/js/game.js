$(document).ready( function () {
    const email = localStorage.getItem('EMAIL');
    // console.log(email);
    $.getJSON("http://localhost:5000/api/v1/users/email/" + email, function (data){
        if (data) {
            userEmail = data['email'];
            // console.log(userEmail)
            username = data['username'];
            // console.log(username);
            resource = data['resource'];
            // console.log(resource);
            speed = data['drill_speed'];
            // console.log(speed);
            size = data['drill_size'];
            // console.log(size);

            document.getElementById("username").innerHTML = username;
            document.getElementById("resource").innerHTML = "Resources: " + resource;
            document.getElementById("speed").innerHTML = "Speed: " + speed;
            document.getElementById("size").innerHTML = "Size: " + size;
            localStorage.setItem("RESOURCE", resource);
            localStorage.setItem("USERID", data['id']);
        }
    });
    const planetBtn = document.querySelector('.planet');

    planetBtn.addEventListener('click', () => {
        let resources = localStorage.getItem('RESOURCE');
        resources = parseInt(resources) + 1
        const id = localStorage.getItem('USERID');
        if (resource != null) {
            $.ajax({
                url: 'http://localhost:5000/api/v1/users/' + id,
                type: 'PUT',
                data: JSON.stringify({"resource": parseInt(resources)}),
                dataType: 'json',
                contentType: "application/json",
                success: function(data, textStatus) {
                    console.log(textStatus);
                    console.log(data);
                }
            });
            localStorage.setItem("RESOURCE", resources);
            document.getElementById("resource").innerHTML = "Resources: " + resources;
        }
    })
})
