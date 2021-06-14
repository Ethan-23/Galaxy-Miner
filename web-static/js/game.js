$(document).ready( function () {
    const email = localStorage.getItem('EMAIL');
    const planetBtn = document.querySelector('.planet');
    const drill_speed = document.querySelector('.Uspeed');
    const drill_size = document.querySelector('.Usize');
    let resource_counter = 0;
    let user_speed = 0;
    let user_size = 0;
    let user_id = 0;
    let num = 0;

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
            user_speed = speed;
            user_size = size;
            user_id = data['id'];
            dataload();
        }
    });


    //update Resources by 1
    function udpateResource(amount) {
        //getting the resources and updating it by 1
        resource_counter += amount;
        console.log(resource_counter);
        //getting the id

        //As long as resource exists...
        if (resource != null) {
            //udpate resources by 1
            $.ajax({
                url: 'http://localhost:5000/api/v1/users/' + user_id,
                type: 'PUT',
                data: JSON.stringify({"resource": resource_counter, "drill_speed": user_speed, "drill_size": user_size}),
                dataType: 'json',
                contentType: "application/json",
                success: function(data, textStatus) {
                    console.log(textStatus);
                    // console.log(data);
                }
            });
            //update the resource shown on the website
            document.getElementById("resource").innerHTML = "Resources: " + resource_counter;
            document.getElementById("speed").innerHTML = "Speed: " + user_speed;
            document.getElementById("size").innerHTML = "Size: " + user_size;
        }
    };


    
    drill_size.addEventListener('click',  function init() {
        cost = 1 //cost of upgrade 
        if(resource_counter >= cost){
            resource_counter -= cost; 
            user_size += 1;
            udpateResource(0);
        }
    })



    planetBtn.addEventListener('click', () => {
        num = user_size
        udpateResource(num);
    })



    drill_speed.addEventListener('click',  function init() {
        cost = 1 //cost of upgrade 
        if(resource_counter >= cost){
            resource_counter -= cost; 
            user_speed += 1;
            udpateResource(0);
        }
    })
    function dataload(){
        if(user_speed > 0){
            var int = self.setInterval(function () {
                num = 1 * user_speed
                udpateResource(num);
                console.log("test");
            }, 1000);
        }
    }
})
