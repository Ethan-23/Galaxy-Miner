$(document).ready( function () {
    const email = localStorage.getItem('EMAIL');
    const planetBtn = document.querySelector('.planet');
    const drill_speed = document.querySelector('.Uspeed');
    let num = 1;

    //get the User info with Email we got from login
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

            //set elements to the data we get
            document.getElementById("username").innerHTML = username;
            document.getElementById("resource").innerHTML = "Resources: " + resource;
            document.getElementById("speed").innerHTML = "Speed: " + speed;
            document.getElementById("size").innerHTML = "Size: " + size;
    
            //storing the data locally to be abled to use it from anywhere
            localStorage.setItem("RESOURCE", resource);
            localStorage.setItem("USERID", data['id']);
        }
    });

    //update Resources with the amount of 
    planetBtn.addEventListener('click', function udpateResource() {
        //getting the resources and updating it by 1
        let resources = localStorage.getItem('RESOURCE');
        resources = parseInt(resources) + num
        //getting the id
        const id = localStorage.getItem('USERID');

        //As long as resource exists...
        if (resource != null) {
            //udpate resources by 1
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
            //update the resource stored locally
            localStorage.setItem("RESOURCE", resources);
            //update the resource shown on the website
            document.getElementById("resource").innerHTML = "Resources: " + resources;
        }
    })
    speed.addEventListener('click',  function init() {
        var int = self.setInterval(function () {
            let resources = localStorage.getItem('RESOURCE');
            resources = parseInt(resources) + num
            localStorage.setItem("RESOURCE", resources);
            document.getElementById("resource").innerHTML = "Resources: " + resources;
            console.log("test");
        }, 10000);
        console.log(int);
    })
})
