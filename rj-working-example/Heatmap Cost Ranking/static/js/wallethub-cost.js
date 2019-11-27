var myMap1 = L.map("map1", {
  center: [36.8283, -98.5795],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap1);

d3.json("static/js/city_master_wallethub1.json", function(cityData) {

    for (var i = 0; i < 100; i++) {
 
     var coord = [cityData[i].latitude, cityData[i].longitude]

    // Color-code by magnitude

    if (cityData[i].costs > 80) {
        var color = "maroon"
      } 
      else if (cityData[i].costs >= 60 && cityData[i].costs <=80) {
        var color = "red"
      } 
      else if (cityData[i].costs >= 40 && cityData[i].costs <=60) {
        var color = "orange"
      }
      else if (cityData[i].costs >= 20 && cityData[i].costs <=40) {
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
       }).bindPopup("<p> City: " + cityData[i].city + "<p> <p> Cost Rank: " + cityData[i].costs + "</p>").addTo(myMap1);
    }
});
