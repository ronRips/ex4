(function(){
    function $(x) { return document.getElementById(x)};


    //to translate the key words of weather
    let meaning = {
        pcloudy:"partly cloudy",
        vcloudy:"very cloudy",
        ishower:"isolated showers",
        lightrain:"light rain",
        oshowers:"occasional shower",
    }

    //json of places and their lat & lon
    let places = {};

    //do validation for input and add location to the list
    function add_place(){
        let user_id = $("userId").innerHTML;

        $("comment").innerHTML ="";
        let country = $("place").value;

        if (!valid(country, user_id, ))return;

        let lat = $("latitude").value;
        let long = $("longitude").value;

        if( in_range(lat, 90, "latitude") && in_range (long, 180, "longitude")){
            places[country] = {latitude:lat , longitude:long};
            let elem = $("put");
             let str = `<div class="p-1" id=\"${country}_row\">`+
                `<input type=\"radio\" id=\"${country}\" name=\"locations\" >\n` +
                `<label for=\"${country}\">${country}</label>\n` +
                `</div>`;
            elem.innerHTML += str;
            $("del").classList.remove("d-none");
        }
    }

    //valid the input of a place that it not empty and it didn't exist already
    function valid(country, user_id){
        if (country == ""){
            $("comment").innerHTML = "enter a name of location";
            return false;
        }
        const data = { place: country, id: user_id};

        fetch('http://localhost:3000/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (places.hasOwnProperty(country)){
            $("comment").innerHTML = "this location already exist";
            return false;
        }
        return true;
    }

    //by click on delete it del the chosen place
    function del(){
        let country = document.querySelector('input[type="radio"]:checked').id;
        $(country+"_row").remove();
        delete places[country];
    }

    //check the input of lat & lon are in the range and print a comment
    function in_range(num, limit, type){
        let number = Number(num);
        if (!number){
            $("comment").innerHTML = type +" must be a number";
            return false;
        }
        if (-limit > number || number > limit){
            $("comment").innerHTML = "enter "+type +" between " + -limit +" and "+ limit;
            return false;
        }
        return true;
    }

    //call to the server for json to show the temperature
    function display() {
        let place = document.querySelector('input[type="radio"]:checked').id;

        let lon = places[place].longitude;
        let lat = places[place].latitude;

        let url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;
        let imgUrl = `http://www.7timer.info/bin/astro.php? lon=${lon}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;
        $("img").src = imgUrl;

        fetch(url)
            .then(function (response) {
                if (response.status !== 200) {
                    document.querySelector("#error").innerHTML = 'Looks like there was a problem. Status Code: ' +
                        response.status;
                    return;
                }
                response.json().then(function (data) {

                    fill_table(data);                                    //fill the table
                    $("none-table").classList.remove("d-none");   //and show it
                });
            })
            .catch(function (err) {
                document.querySelector("#error").innerHTML = "weather forecast service is not available right now, please try again later";
            });
    }

    //fill the table with the updating data
    function fill_table(data){
        for (let i = 1; i <= 7; i++) {
            $("weather" + i).innerHTML = translate(data.dataseries[i - 1].weather);
            $("min" + i).innerHTML = data.dataseries[i - 1].temp2m.min;
            $("max" + i).innerHTML = data.dataseries[i - 1].temp2m.max;
            if(data.dataseries[i - 1].wind10m_max !== 1) {
                $("wind" + i).innerHTML = data.dataseries[i - 1].wind10m_max;
            }
        }
    }


    function translate(clue){
        if (meaning.hasOwnProperty(clue))
            return meaning[clue];
        else return clue;
    }



    document.addEventListener('DOMContentLoaded', function(){
        $("add").addEventListener("click", add_place ,false);
        $("display").addEventListener("click", display ,false);
        $("del").addEventListener("click", del ,false);
    }, false);
}());