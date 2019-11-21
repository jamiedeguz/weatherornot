var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.csv("city_master_wallethub.csv", function(err, hairData) {
  //if (err) throw err;
 
  // parse data
  hairData.forEach(function(data) {
    data.costs = +data.costs;
    data.latitude = +data.latitude
    data.longitude = +data.longitude
    console.log(data.costs);
  
    var heatArray = []


  for (var i = 0; i < data.length; i++) {
      heatArray.push([data.latitude[i], data.longitude[i]]);
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

});
});