(function(){

 function submit(event){
     let fname = document.getElementById("fname").value.toLowerCase();
     let lname =  document.getElementById("lname").value.toLowerCase();
     let mail = document.getElementById("mail").value.toLowerCase();

     if (fname == "" || lname == "" || mail ==""){
         event.preventDefault();
     }

     document.getElementById("fname").value = fname;
     document.getElementById("lname").value = lname;
     document.getElementById("mail").value = mail;
 }

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("submit").addEventListener("click", function (event) {
            submit(event);}, false);
    }, false);
}());