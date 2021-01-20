(function(){

    function submit(event){
        let fpasswrd = document.getElementById("fpasswrd").value;
        let lpasswrd =  document.getElementById("lpasswrd").value;
        document.getElementById("comment").innerHTML ="";
        if (fpasswrd.length < 8 ){
            event.preventDefault();
            document.getElementById("comment").innerHTML = "password must be at least 8"
        }
        else if(fpasswrd.localeCompare(lpasswrd) != 0){
            event.preventDefault();
            document.getElementById("comment").innerHTML = "verifying is failed"
        }


    }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("submit").addEventListener("click", function (event) {
            submit(event);}, false);
    }, false);
}());