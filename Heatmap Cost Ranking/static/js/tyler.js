// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


var cities = [
  {'State': 'Alabama',
  'location': [32.859482801854035, -86.84384983545773],
  'income': 46472.0},
 {'State': 'Alaska',
  'location': [61.487933376383744, -152.49551165313642],
  'income': 76114.0},
 {'State': 'Arizona',
  'location': [33.625361104089265, -111.6907279330855],
  'income': 53510.0},
 {'State': 'Arkansas',
  'location': [35.11194386160107, -92.38092674898235],
  'income': 43813.0},
 {'State': 'California',
  'location': [36.14322517194392, -119.77399826435915],
  'income': 67169.0},
 {'State': 'Colorado',
  'location': [39.25645815441181, -105.29349037352928],
  'income': 65458.0},
 {'State': 'Connecticut',
  'location': [41.557624934537216, -72.81355222573357],
  'income': 73781.0},
 {'State': 'District of Columbia',
  'location': [38.89531540217382, -77.01958254710146],
  'income': 77649.0},
 {'State': 'Delaware',
  'location': [39.288821117647075, -75.52822093137257],
  'income': 63036.0},
 {'State': 'Florida',
  'location': [28.160068399204274, -82.02278675663142],
  'income': 50883.0},
 {'State': 'Georgia',
  'location': [33.04387886633166, -83.69556997085414],
  'income': 52977.0},
//  {'State': 'Hawaii',
//   'location': [21.988660087837854, -160.24180725675674],
//   'income': 74923.0},
 {'State': 'Idaho',
  'location': [44.53219026706227, -114.86423627002975],
  'income': 50985.0},
 {'State': 'Illinois',
  'location': [40.413877929317714, -88.99676377504608],
  'income': 61229.0},
 {'State': 'Indiana',
  'location': [39.92696671802326, -86.28425005329447],
  'income': 52182.0},
 {'State': 'Iowa',
  'location': [42.03104158763838, -93.35259181088537],
  'income': 56570.0},
 {'State': 'Kansas',
  'location': [38.51669433706466, -97.13040319900489],
  'income': 55477.0},
 {'State': 'Kentucky',
  'location': [37.61321107558133, -84.81892687403098],
  'income': 46535.0},
 {'State': 'Maine',
  'location': [44.5807254435947, -69.43483486806882],
  'income': 53024.0},
 {'State': 'Louisiana',
  'location': [30.916454238410562, -91.71963621324498],
  'income': 46710.0},
 {'State': 'Massachusetts',
  'location': [42.23348925979113, -71.47053237989562],
  'income': 74167.0},
 {'State': 'Maryland',
  'location': [39.053842560897415, -76.76812641666672],
  'income': 78916.0},
 {'State': 'Michigan',
  'location': [43.45838622859511, -84.73934209226925],
  'income': 52668.0},
 {'State': 'Minnesota',
  'location': [45.56461866982925, -94.11585473339673],
  'income': 65699.0},
 {'State': 'Mississippi',
  'location': [32.82185521415608, -89.70477279128859],
  'income': 42009.0},
 {'State': 'Missouri',
  'location': [38.384826557295945, -92.45494306183016],
  'income': 51542.0},
 {'State': 'Montana',
  'location': [46.939255623501204, -110.30170605275788],
  'income': 50801.0},
 {'State': 'Nebraska',
  'location': [41.19567994034535, -98.17969038775527],
  'income': 56675.0},
 {'State': 'New Hampshire',
  'location': [43.38614288196721, -71.57137717704911],
  'income': 71305.0},
 {'State': 'Nevada',
  'location': [38.004132909482756, -116.73172182758626],
  'income': 55434.0},
 {'State': 'New Jersey',
  'location': [40.38912234514436, -74.5161411220472],
  'income': 76475.0},
 {'State': 'New Mexico',
  'location': [34.671712544217684, -106.15317122675752],
  'income': 46718.0},
 {'State': 'New York',
  'location': [42.19682294344584, -75.1173882661116],
  'income': 62765.0},
 {'State': 'North Carolina',
  'location': [35.572244836330974, -79.53905628147477],
  'income': 50320.0},
 {'State': 'North Dakota',
  'location': [47.51129792807424, -99.64736574013925],
  'income': 61285.0},
 {'State': 'Ohio',
  'location': [40.3883791061415, -82.74078830440604],
  'income': 52407.0},
 {'State': 'Oklahoma',
  'location': [35.51939973836473, -96.99869426918228],
  'income': 49767.0},
 {'State': 'Oregon',
  'location': [44.53234251515152, -122.07812879595954],
  'income': 56119.0},
 {'State': 'Pennsylvania',
  'location': [40.62703925738208, -77.55345841780509],
  'income': 56951.0},
 {'State': 'Rhode Island',
  'location': [41.70335632978724, -71.50914851063831],
  'income': 61043.0},
 {'State': 'South Carolina',
  'location': [33.95816643140795, -81.03302287184111],
  'income': 48781.0},
 {'State': 'South Dakota',
  'location': [44.30692547099766, -99.15341047099768],
  'income': 54126.0},
 {'State': 'Tennessee',
  'location': [35.794630906862736, -86.45657238602935],
  'income': 48708.0},
 {'State': 'Texas',
  'location': [31.277162801676777, -98.0631534779438],
  'income': 57051.0},
 {'State': 'Utah',
  'location': [39.92115921910115, -111.82478212640456],
  'income': 65325.0},
 {'State': 'Vermont',
  'location': [44.03341062269942, -72.6428141871166],
  'income': 57808.0},
 {'State': 'Virginia',
  'location': [37.712614309019635, -78.22690068941182],
  'income': 68766.0},
 {'State': 'West Virginia',
  'location': [38.46459070000004, -80.982546019149],
  'income': 44061.0},
 {'State': 'Washington',
  'location': [47.32874533242869, -121.17334842062408],
  'income': 66174.0},
 {'State': 'Wyoming',
  'location': [42.887223562814036, -107.23295582914571],
  'income': 60938.0},
 {'State': 'Wisconsin',
  'location': [44.105610487233996, -89.53277944893613],
  'income': 56759.0}
];

var incometop5 = []
for (var i = 0; i < cities.length; i++) {
  incometop5.push(parseInt(cities[i].income))
}
var incometop5 = incometop5.sort(function(a, b){return b-a})
var incometop5 = [incometop5[0], incometop5[1], incometop5[2], incometop5[3], incometop5[4]];

for (var i = 0; i < cities.length; i++) {
    mycircles = L.circleMarker(cities[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    radius: cities[i].income / 4800,
    riseOnHover: false
  }).bindPopup("<h3>" + cities[i].State + "</h1> <hr> <h5>Avg Household Income: " + cities[i].income + "</h5>", {maxWidth: 200}).addTo(myMap);
  };

  for (var i = 0; i < cities.length; i++) {
    if (incometop5.includes(cities[i].income)) {
      mycircles = L.circleMarker(cities[i].location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "red",
        radius: cities[i].income / 4800,
        riseOnHover: true
      }).bindPopup("<h3>" + cities[i].State + "</h1> <hr> <h5>Avg Household Income: " + cities[i].income + "</h5>", {maxWidth: 200}).addTo(myMap); 
    }
  }


  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend');
  labels = ['<strong>Categories</strong>'],
  categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

  for (var i = 0; i < categories.length; i++) {

          div.innerHTML += 
          labels.push(
              '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
          (categories[i] ? categories[i] : '+'));

      }
      div.innerHTML = labels.join('<br>');
  return div;
  };

  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "tylers-legend");
    var limits = ["Top 5 Avg. Household Income"];
    var colors = ["Red"]
    var labels = [];


    // Add min & max
    var legendInfo = 
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>"
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

