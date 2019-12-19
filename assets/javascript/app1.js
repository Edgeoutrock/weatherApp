$(document).ready(function(){
    var appID = "8f02ab235e3ff57329f8072d90de636e";
    $("#submitWeather").click(function(){
        var cityName = $("#city").val();
        var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",US&units=imperial&APPID=" + appID;
        var apiQuery="http://api.openweathermap.org/data/2.5/uvi?appid=8f02ab235e3ff57329f8072d90de636e";
        var fullForecastQuery = "http://api.openweathermap.org/data/2.5/forecast?id="+5387428 +"&units=imperial&APPID=" + appID;
        var appendHere = $("#searchedCities");
        var pinCity = $("<li>" + cityName + "</li>");
        appendHere.append(pinCity);
        if ( cityName != ''){
          $.ajax({
                url: weather,
                method: "GET",
                dataType: "jsonp"
            }).then(function(weatherPoint){
                    console.log(weatherPoint);
                    $("#citycity").html(cityName);
            $("#description_weather").html(weatherPoint.weather[0].description);
            $("#temperature").text(weatherPoint.main.temp);
            $("#humidity").html(weatherPoint.main.humidity);
            $("#wind_speed").html(weatherPoint.wind.speed);
            $("#lon_lat").html(weatherPoint.coord['lon'] + ',' + weatherPoint.coord['lat']);
            $("#city").val('');
            var longitude = weatherPoint.coord['lon'];
            var latitude = weatherPoint.coord['lat'];
            // var holdings = searchUV(longitude, latitude);
            // ***********************************
            var apiFullQuery = apiQuery + "&lat=" + weatherPoint.coord['lat'] + "&lon=" + weatherPoint.coord['lon'];
            /*
            var lonlat = $("#lon_lat").val();
            var splitLonLat = lonlat.split(',');
            var longitude = splitLonLat[0];
            // var latitude = splitLonLat[1]; 
            var uv_query_call=apiQuery + "&lat=" + weatherPoint.coord['lat'] + "&lon=" + weatherPoint.coord['lon']; */
            $.ajax({url: apiFullQuery, method: "GET"}).then(function(uv_data){
                console.log(uv_data);
                $("#uv_index").html(uv_data.value);
                }); 
        }); // end to first ajax then
        } else {
            $("#error").html("field cannot be empty");
        };
    }); // end the click button search
});