
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "costs";
var chosenYAxis = "hap_entertainment";


// function used for updating x-scale var upon click on axis label
function xScale(hairData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
      d3.max(hairData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

//  updating xAxis var upon click on axis label
function renderXaxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

////////// UPDATING THE Y-AXIS upon click
function yScale(hairData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([
      d3.max(hairData, d => d[chosenYAxis]) * 1.2,
      d3.min(hairData, d => d[chosenYAxis]) * 0.8
    ])
    .range([0, height]);

  return yLinearScale;

}

// function used for updating yAxis var upon click on axis label
function renderYaxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, 
                      newXScale, chosenXAxis, 
                      newYScale, chosenYAxis) {
    circlesGroup.transition()
    .duration(800)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]))
    .attr("fill", color = function (d) {
      xvalue = d[chosenXAxis]
      yvalue = d[chosenYAxis]
      product = xvalue * yvalue
      console.log(product)
      if (product > 6400) {
       color = "maroon"
      } 
      else if (product >= 3600 && product <=6400) {
        color = "red"
      } 
      else if (product>= 1600 && product <=3600) {
        color = "orange"
      }
      else if (product>= 400 && product <=1600) {
        color = "yellow"
      }
      else {
        color = "green"
      }
      return(color)
  })

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  if (chosenXAxis === "weather") {
    var label = "Weather Ranking";
  }
  else if (chosenXAxis === "costs") {
    var label = "Cost Ranking";
  }
  else if (chosenXAxis === "parks") {
    var label = "Park Ranking";
  }

  if (chosenYAxis === "hap_entertainment") {
    var yLabel = "Happiness Ranking:";
  }
  else if (chosenYAxis === "health_rank") {
    var yLabel = "Health Ranking";
  }
  else if (chosenYAxis === "community_environment") {
    var yLabel = "Community Environment Ranking";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .style("background-color", "white")
    .html(function(hairData) {
      return (`${hairData.city}<br>${label} ${hairData[chosenXAxis]} <br> ${yLabel} ${hairData[chosenYAxis]}`);
    });

  
  circlesGroup.call(toolTip);
  
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("static/js/city_master_wallethub.csv", function(err, hairData) {
  //if (err) throw err;
 
  // parse data
  hairData.forEach(function(data) {
    // data.city = +data.city
    data.recreation_score = +data.recreation_score;
    data.rec_entertainment = +data.rec_entertainment;
    data.costs = +data.costs;
    data.parks = +data.parks;
    data.weather = +data.weather;
    data.latitude = +data.latitude;
    data.longitude = +data.longitude;
    data.health_score = +data.health_score;
    data.health_rank = +data.health_rank;
    data.food_rank = +data.food_rank;
    data.fitness_rank = +data.fitness_rank;
    data.greenspace_rank = +data.greenspace_rank;
    data.happiness_score = +data.happiness_score;
    data.hap_entertainment = +data.hap_entertainment;
    data.income_employment = +data.income_employment;
    data.community_environment = +data.community_environment;

  });

  // LinearScale functions above csv import
  var xLinearScale = xScale(hairData, chosenXAxis);
  var yLinearScale = yScale(hairData, chosenYAxis);


  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .attr("transform", `translate(0, 0)`)
    .call(leftAxis);

  // append initial circles

  var circlesGroup = chartGroup.selectAll("circle")
    .data(hairData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]) )
    .attr("r", 20)
    .attr("opacity", ".5")
    .attr("fill", color = function (d) {
      xvalue = d[chosenXAxis]
      yvalue = d[chosenYAxis]
      product = xvalue * yvalue
      console.log(product)
      if (product > 6400) {
       color = "maroon"
      } 
      else if (product >= 3600 && product <=6400) {
        color = "red"
      } 
      else if (product>= 1600 && product <=3600) {
        color = "orange"
      }
      else if (product>= 400 && product <=1600) {
        color = "yellow"
      }
      else {
        color = "green"
      }
      return(color)
  })

  // Create group for  twho x- axis and y-axis labels
  var labelXGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  var yLabelGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)")
  
    var weatherLabel = labelXGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "weather") // value to grab for event listener
    .classed("inactive", true)
    .text("Weather Ranking");

  var costsLabel = labelXGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "costs") // value to grab for event listener
    .classed("active", true)
    .text("Costs Ranking");

  var parksLabel = labelXGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "parks") // value to grab for event listener
    .classed("inactive", true)
    .text("Parks Ranking");

  // append y axis
  var healthLabel = yLabelGroup.append("text")
    .attr("y", 0 - margin.left +40)
    .attr("x", 0 - (height / 2))
    .attr("value", "health_rank") // value to grab for event listener
    .classed("inactive", true)
    .text("Health Ranking");

  var happinessLabel = yLabelGroup.append("text")
    .attr("y", 0 - margin.left +20)
    .attr("x", 0 - (height / 2))
    .attr("value", "hap_entertainment") // value to grab for event listener
    .classed("active", true)
    .text("Happiness Ranking");

  var communityLabel = yLabelGroup.append("text")
    .attr("y", 0 - margin.left +60)
    .attr("x", 0 - (height / 2))
    .attr("value", "community_environment") // value to grab for event listener
    .classed("inactive", true)
    .text("Community | Environment Ranking");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // x axis labels event listener
  labelXGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");

      if (value !== chosenXAxis) {
       
        // replaces chosenXAxis with value
        chosenXAxis = value;

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(hairData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXaxis(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "weather") {
          weatherLabel
            .classed("active", true)
            .classed("inactive", false);
          costsLabel
            .classed("active", false)
            .classed("inactive", true)
          parksLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "costs") {
          weatherLabel
            .classed("active", false)
            .classed("inactive", true);
          costsLabel
            .classed("active", true)
            .classed("inactive", false)
          parksLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "parks") {
            weatherLabel
              .classed("active", false)
              .classed("inactive", true);
            costsLabel
              .classed("active", false)
              .classed("inactive", true)
            parksLabel
              .classed("active", true)
              .classed("inactive", false);
            }
        }
  });

    // Else check for y-axis change// x axis labels event listener
  yLabelGroup.selectAll("text")
  .on("click", function() {
    // get value of selection
    var yvalue = d3.select(this).attr("value");
      
    if (yvalue !== chosenYAxis) {

      // replaces chosenYAxis with value
          chosenYAxis = yvalue;
        
          // functions here found above csv import
          // updates y scale for new data
          yLinearScale = yScale(hairData, chosenYAxis);
  
          // updates y axis with transition
          yAxis = renderYaxis(yLinearScale, yAxis);
  
          // updates circles with new y values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
  
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
  
          // changes classes to change bold text
          if (chosenYAxis === "hap_entertainment") {
            happinessLabel
              .classed("active", true)
              .classed("inactive", false);
            healthLabel
              .classed("active", false)
              .classed("inactive", true)
            communityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenYAxis === "health_rank") {
            happinessLabel
              .classed("active", false)
              .classed("inactive", true);
            healthLabel
              .classed("active", true)
              .classed("inactive", false)
            communityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenYAxis === "community_environment") {
            happinessLabel
                .classed("active", false)
                .classed("inactive", true);
            healthLabel
                .classed("active", false)
                .classed("inactive", true)
            communityLabel
                .classed("active", true)
                .classed("inactive", false);
              }
  }
  });
});
