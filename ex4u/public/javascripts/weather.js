(function () {
    document.addEventListener('DOMContentLoaded', function () {
        getDB();
        document.getElementById("button-add").addEventListener('click', addDB);
        document.getElementById("id-button-remove").addEventListener('click', deleteItem);
        document.getElementById("id-button-select").addEventListener('click', selectItem);
    }, false);

    function getDB(){
        let cities = [];
        for (i of cities){
            addToList(i);
        }

    }
    function getUrl(strArr) {
        let str = " ";
        str = "http://www.7timer.info/bin/api.pl?lon=" + strArr[1] + "&lat=" + strArr[0] + "&product=civillight&output=json";
        return str;
    }

    function getUrlImage(strArr) {
        let str = " ";
        str = "http://www.7timer.info/bin/astro.php? lon=" + strArr[1] + "&lat=" + strArr[0] + "&ac=0&lang=en&unit=metric&output=internal&tzshift=0";
        return str;
    }

    function getVertex() {
        //A function that takes the input and returns the vertex
        let mySelect = document.getElementById("id-select");
        mySelect = mySelect[mySelect.selectedIndex].text.substring(mySelect[mySelect.selectedIndex].text.indexOf("(") + 1);
        mySelect = mySelect.substring(0, mySelect.length - 1);
        return mySelect.split(",");
    }


    function selectItem() {
        document.getElementById("id-error").style.display = "none";
        document.getElementById("id-table").style.display = "none";
        //A function that handles sending the data to the server
        let strArr = getVertex();//line 20
        let strUrl = getUrl(strArr);// line 8
        let strUrlImage = getUrlImage(strArr);
        getData(strUrl);
        getimage(strUrlImage)
    }

    function deleteItem() {
        let mySelect = document.getElementById("id-select");

        let user_id = document.getElementById("user_id").innerHTML;
        let city = mySelect[mySelect.selectedIndex].text.substring(0,mySelect[mySelect.selectedIndex].text.indexOf("(") -1 );

        const data = {  user_id: user_id, location: city};
        fetch('http://localhost:3000/weather/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .catch(err => {
                console.log(err)});

        mySelect.remove(mySelect.selectedIndex);

    }
    function checkInput(city, longitude, latitude){
        let str ="";
        if (city === "" || longitude === "" || latitude === ""){
            str +="The form is incomplete";
        }
        else if (longitude >180 || longitude < -180 || latitude > 90 || latitude < -90){
            str +="The location is not in range";
        }
        if (str !== "") {
            document.getElementById("id-error").innerHTML = str;
            document.getElementById("id-error").style.display = "block";
            return false
        }
        else
            return true;

    }
    //let accept = {city:"jerusalem", lon:15.3, lat:14.5};
    function addToList(accept) {

        let mySelect = document.getElementById("id-select");
        let morOption = document.createElement("option");
        console.log(accept["city"]);
        morOption.text = accept["city"] + " (" + accept["lon"] +
            "," + accept["lat"] + ")";
        console.log(morOption);
        mySelect.add(morOption);
    }

    function addDB(){
        if (checkInput(document.getElementById("my-city").value, document.getElementById("my-longitude").value, document.getElementById("my-latitude").value) === false){
            return;
        }
        else {
            document.getElementById("id-error").style.display = "none";
        }
        let city = document.getElementById("my-city").value;
        let lon = document.getElementById("my-longitude").value;
        let lat = document.getElementById("my-latitude").value;
        addToList({city:city,lon:lon,lat:lat});

        let user_id = document.getElementById("user_id").innerHTML;
        const data = {  user_id: user_id, location: city,lat:lat, lon:lon};

        fetch('http://localhost:3000/weather/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    function status(response) {//A function that handles status
        if (response.status <= 200 || response.status > 300) {
            //throw "first"
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    function getDate(numDate) {//A function that returns a date
        let str = numDate.toString();
        return str.substring(6, 8) + "/" + str.substring(4, 6) + "/" + str.substring(0, 4);
    }

    function checkWind(speed) {//A function that checks the wind speed and if the wind is equal to 1 then returns an empty string
        if (speed === 1)
            return " ";
        else
            return speed;
    }

    function defTable(json) {//Function the weather data into a table
        let str = "<thead>\n" +
            "<tr>\n" +
            "<th scope=\"col\">date</th>\n" +
            "<th scope=\"col\">weather</th>\n" +
            "<th scope=\"col\">max temperature</th>\n" +
            "<th scope=\"col\">min temperature</th>\n" +
            "<th scope=\"col\">wind speed</th>\n" +
            "</tr>\n" +
            "</thead>\n" +
            "<tbody>\n";
        for (let i = 0; i < 7; i++) {
            let strDate = getDate(json.dataseries[i].date);
            str += " <tr>\n" +
                " <th scope=\"row\">" + strDate + "</th>\n" +
                "  <td>" + json.dataseries[i].weather + "</td>\n" +
                "  <td>" + json.dataseries[i].temp2m.max + "</td>\n" +
                "  <td>" + json.dataseries[i].temp2m.min + "</td>\n" +
                "  <td>" + checkWind(json.dataseries[i].wind10m_max) + "</td>\n" +
                "  </tr>";
        }
        str += "</tbody>\n"
        document.getElementById("id-table").innerHTML = str;
        document.getElementById("id-table").style.display = "block";
    }

    function getData(strUrl) {//Function handles connection to server for weather data
        fetch(strUrl)
            .then(status)
            .then((response) => response.json())
            .then(function (json) {
                defTable(json);
            }).catch(function (error) {
            document.getElementById("id-error").innerHTML = "weather forecast service is not available right now, please try again later";
            document.getElementById("id-error").style.display = "block";
        })
    }

    function getimage(strUrlImage) {//Function handles the connection to the server for the weather image
        fetch(strUrlImage)
            .then(status)
            .then((response) => response.blob())
            .then(function (myBlob) {
                let imageUrl = URL.createObjectURL(myBlob);
                document.querySelector("img").src = imageUrl;
                document.getElementById("id-image").style.display = "block";
            })
            .catch(function (error) {
                document.querySelector("img").src = "images.jpg";
                document.getElementById("id-image").style.display = "block";
                document.getElementById("id-error").innerHTML = "fetch image error";
                document.getElementById("id-error").style.display = "block";
            })
    }
})();