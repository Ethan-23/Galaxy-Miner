$(document).ready( function () {
    const email = localStorage.getItem('EMAIL');
    const planetBtn = document.querySelector('.planet');
    const drill_speed = document.querySelector('.Uspeed');
    let resource_counter = 0
    let user_id = 0
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
            resource_counter = resource;
            user_id = data['id'];
        }
    });


    //update Resources by 1
    function udpateResource() {
        //getting the resources and updating it by 1
        resource_counter += num;
        console.log(resource_counter);
        //getting the id
        const id = localStorage.getItem('USERID');

        //As long as resource exists...
        if (resource != null) {
            //udpate resources by 1
            $.ajax({
                url: 'http://localhost:5000/api/v1/users/' + id,
                type: 'PUT',
                data: JSON.stringify({"resource": resource_counter}),
                dataType: 'json',
                contentType: "application/json",
                success: function(data, textStatus) {
                    console.log(textStatus);
                    // console.log(data);
                }
            });
            //update the resource shown on the website
            document.getElementById("resource").innerHTML = "Resources: " + resource_counter;
        }
    };


    
    planetBtn.addEventListener('click', () => {
        udpateResource();
    })


    drill_speed.addEventListener('click',  function init() {
        var int = self.setInterval(function () {
            resource_counter += num;
            document.getElementById("resource").innerHTML = "Resources: " + resource_counter;
            console.log("test");
        }, 1000);
        console.log(int);
    })
})
