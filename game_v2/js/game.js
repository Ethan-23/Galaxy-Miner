$(document).ready( function () {
    const email = localStorage.getItem('EMAIL');
    const planetBtn = document.querySelector('.planet');
    const drill_speed = document.querySelector('.Uspeed');
    const drill_pickaxe = document.querySelector('.Upickaxe');
    const drill_power = document.querySelector('.Upower');
    const drill_durability = document.querySelector('.Udurability');
    let resource_counter = 0;
    let user_speed = 0;
    let user_pickaxe = 0;
    let user_id = 0;
    let num = 0;
    let drill_pickaxe_cost = 0;
    let drill_speed_cost = 0;
    let drill_power_cost = 0;
    let drill_durability_cost = 0;
    let rps = 0;
    let rpc = 0;
    

    //get the User info with Email we got from login
    $.getJSON("http://localhost:5000/api/v1/users/email/" + email, function (data){
        if (data) {
            userEmail = data['email'];
            // console.log(userEmail)
            username = data['username'];
            // console.log(username);
            resource_counter = data['resource'];
            // console.log(resource);
            user_speed = data['drill_speed'];
            // console.log(speed);
            user_pickaxe = data['drill_pickaxe'];
            user_power = data['drill_power'];
            user_durability = data['drill_durability'];
            // console.log(pickaxe);
            user_id = data['id'];

            //set elements to the data we get
            document.getElementById("username").innerHTML = username;
            document.getElementById("resource").innerHTML = "Resources: " + resource_counter.toFixed(0);
            document.getElementById("speed").innerHTML = "Speed: " + user_speed + "<br> Cost: " + drill_speed_cost.toFixed(0);
            document.getElementById("pickaxe").innerHTML = "Pickaxe: " + user_pickaxe + "<br> Cost: " + drill_pickaxe_cost.toFixed(0);
            document.getElementById("power").innerHTML = "Power: " + user_power + "<br> Cost: " + drill_power_cost.toFixed(0);
            document.getElementById("durability").innerHTML = "Durability: " + user_durability + "<br> Cost: " + drill_durability_cost.toFixed(0);
    
            //storing the data locally to be abled to use it from anywhere
            drill_pickaxe_cost = (10 * (1.25)**user_pickaxe).toFixed(0);
            drill_speed_cost = (15 * (1.15)**user_speed).toFixed(0);
            drill_power_cost = (230 * (1.15)**user_power).toFixed(0);
            drill_durability_cost = (5000 * (2.5)**user_durability).toFixed(0);
            dataload();
        }
    });

//-----------------------------------------------------------------------------------------------------------------------------------------------
    function udpateResource(amount) {
        //getting the resources and updating it by 1
        resource_counter += amount;
        //console.log(resource_counter);
        //getting the id

        //As long as resource exists...
        if (resource != null) {
            //udpate resources by 1
            $.ajax({
                url: 'http://localhost:5000/api/v1/users/' + user_id,
                type: 'PUT',
                data: JSON.stringify({"resource": resource_counter, "drill_speed": user_speed, "drill_pickaxe": user_pickaxe, "drill_power": user_power, "drill_durability": user_durability}),
                dataType: 'json',
                contentType: "application/json",
                success: function(data, textStatus) {
                    //console.log(textStatus);
                    // console.log(data);
                }
            });
            //update the resource shown on the website
            document.getElementById("resource").innerHTML = "Resources: " + resource_counter.toFixed(0);
        }
    };
//-----------------------------------------------------------------------------------------------------------------------------------------------
    

//-----------------------------------------------------------------------------------------------------------------------------------------------

//Main Click
planetBtn.addEventListener('click', () => {
    num = (user_pickaxe * 0.5) + 1;
    udpateResource(num);
})

//Upgrade
drill_pickaxe.addEventListener('click',  function init() {
    drill_pickaxe_cost = (10 * (1.25)**user_pickaxe).toFixed(0);
    if(resource_counter >= drill_pickaxe_cost){
        resource_counter -= drill_pickaxe_cost; 
        user_pickaxe += 1;
        rpc += 0.5;
        document.getElementById("rpc").innerHTML = "RPC: " + rpc;
        drill_pickaxe_cost = (10 * (1.25)**user_pickaxe).toFixed(0);
        document.getElementById("pickaxe").innerHTML = "Pickaxe: " + user_pickaxe + "<br> Cost: " + drill_pickaxe_cost;
    }
})

//-----------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------
    
    //Speed Upgrade
    drill_speed.addEventListener('click',  function init() {
        drill_speed_cost = (15 * (1.15)**user_speed).toFixed(0);
        if(resource_counter >= drill_speed_cost){
            resource_counter -= drill_speed_cost; 
            user_speed += 1;
            rps = (((0.1 * user_speed) + (1 * user_power)) * (user_durability + 1)).toFixed(1);
            document.getElementById("rps").innerHTML = "RPS: " + rps;
            drill_speed_cost = (15 * (1.15)**user_speed).toFixed(0);
            document.getElementById("speed").innerHTML = "Speed: " + user_speed + "<br> Cost: " + drill_speed_cost;
        }
    })
    //Power Upgrade
    drill_power.addEventListener('click',  function init() {
        drill_power_cost = (230 * (1.15)**user_power).toFixed(0);
        if(resource_counter >= drill_power_cost){
            resource_counter -= drill_power_cost; 
            user_power += 1;
            rps = (((0.1 * user_speed) + (1 * user_power)) * (user_durability + 1)).toFixed(1);
            document.getElementById("rps").innerHTML = "RPS: " + rps;
            drill_power_cost = (230 * (1.15)**user_power).toFixed(0);
            document.getElementById("power").innerHTML = "Power: " + user_power + "<br> Cost: " + drill_power_cost;
        }
    })
    //Durability Upgrade
    drill_durability.addEventListener('click',  function init() {
        drill_durability_cost = (2500 * (2.5)**user_durability).toFixed(0);
        if(resource_counter >= drill_durability_cost){
            resource_counter -= drill_durability_cost; 
            user_durability += 1;
            rps = (((0.1 * user_speed) + (1 * user_power)) * (user_durability + 1)).toFixed(1);
            document.getElementById("rps").innerHTML = "RPS: " + rps;
            drill_durability_cost = (2500 * (2.5)**user_durability).toFixed(0);
            document.getElementById("durability").innerHTML = "Durability: " + user_durability + "<br> Cost: " + drill_durability_cost;
        }
    })


    //Loads background process
    function dataload(){
        document.getElementById("speed").innerHTML = "Speed: " + user_speed + "<br> Cost: " + drill_speed_cost;
        document.getElementById("pickaxe").innerHTML = "Pickaxe: " + user_pickaxe + "<br> Cost: " + drill_pickaxe_cost;
        document.getElementById("power").innerHTML = "Power: " + user_power + "<br> Cost: " + drill_power_cost;
        document.getElementById("durability").innerHTML = "Durability: " + user_durability + "<br> Cost: " + drill_durability_cost;
        rpc = (user_pickaxe * 0.5) + 1;
        rps = (((0.1 * user_speed) + (1 * user_power)) * (user_durability + 1)).toFixed(1);
        document.getElementById("rps").innerHTML = "RPS: " + rps;
        document.getElementById("rpc").innerHTML = "RPC: " + rpc;
            var int = self.setInterval(function () {
                num = ((0.1 * user_speed) + (1 * user_power)) * (user_durability + 1);
                udpateResource(num);
            }, 1000);
    }
//-----------------------------------------------------------------------------------------------------------------------------------------------
})

