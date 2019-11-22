var myMap4 = L.map("map4", {
  center: [36.8283, -98.5795],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap4);

d3.json("static/js/city_master_wallethub4.json", function(cityData) {

    for (var i = 0; i < 100; i++) {
 
     var coord = [cityData[i].latitude, cityData[i].longitude]

    // Color-code by magnitude

    if (cityData[i].health_rank > 80) {
        var color = "maroon"
      } 
      else if (cityData[i].health_rank >= 60 && cityData[i].health_rank <=80) {
        var color = "red"
      } 
      else if (cityData[i].health_rank >= 40 && cityData[i].health_rank <=60) {
        var color = "orange"
      }
      else if (cityData[i].health_rank >= 20 && cityData[i].health_rank <=40) {
        var color = "yellow"
      }
      else {
        var color = "green"
      }
       /// test section
       L.circle(coord, {
         fillOpacity: 0.75,
         color: "white",
         fillColor: color,
         radius: (100000)
       }).bindPopup("<p> City: " + cityData[i].city + "<p> <p> Health Rank: " + cityData[i].health_rank + "</p>").addTo(myMap4);
    }
});
