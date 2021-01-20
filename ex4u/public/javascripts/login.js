(function(){

    function submit(event){
        let email = document.getElementById("email").value;
        let pswrd =  document.getElementById("pswrd").value;
        document.getElementById("comment").innerHTML ="";
        if (email == "" ){
            event.preventDefault();
            document.getElementById("comment").innerHTML = "enter an email"
        }
        else if(pswrd.length < 8 ){
            event.preventDefault();
            document.getElementById("comment").innerHTML = "password must be at least 8"
        }


    }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("submit").addEventListener("click", function (event) {
            submit(event);}, false);
    }, false);
}());