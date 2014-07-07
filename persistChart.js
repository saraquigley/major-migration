
function drawIntChart() {

// persist chart
var persistData = [
{"college": "iL and S Administered Programs","sameValue": 44,"anyValue": 46,"totalValue":90,"color": "#CE6DBD","axisName": "L&S Programs"},
{"college": "iL and S Math and Physical Sciences","sameValue": 49,"anyValue": 43,"totalValue":92,"color": "#393B79","axisName": "Math Phys Sci"},
{"college": "iL and S Undergraduate Division","sameValue": 53,"anyValue": 40,"totalValue":93,"color": "#7a0177","axisName": "L&S Undergrad"},
{"college": "iL and S Bio Sciences","sameValue": 53,"anyValue": 42,"totalValue":95,"color": "#6B6ECF","axisName": "Bio Sciences"},
{"college": "iL and S Arts and Humanities","sameValue": 58,"anyValue": 33,"totalValue":92,"color": "#88419d","axisName": "Arts Humanities"},
{"college": "iCollege of Natural Resources","sameValue": 59,"anyValue": 32,"totalValue":91,"color": "#637939","axisName": "Nat Resources"},
{"college": "iL and S Social Sciences","sameValue": 60,"anyValue": 34,"totalValue":94,"color": "#5254A3","axisName": "Social Sciences"},
{"college": "iCollege of Chemistry","sameValue": 63,"anyValue": 27,"totalValue":90,"color": "#01665E","axisName": "Chemistry"},
{"college": "iCollege of Environmental Design","sameValue": 68,"anyValue": 24,"totalValue":92,"color": "#b5cf6b","axisName": "Env Design"},
{"college": "iCollege of Engineering","sameValue": 84,"anyValue": 9,"totalValue":93,"color": "#35978F","axisName": "Engineering"},
{"college": "iHaas School of Business","sameValue": 91,"anyValue": 8,"totalValue":99,"color": "#bd9e39","axisName": "Business"}
];

var margin = {top: 0, right: 10, bottom: 20, left: 100},
width = 200 - margin.left - margin.right,
height = 200 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
.rangeRoundBands([height,0], 0.2);

var x = d3.scale.linear()
.range([0, width - 10]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")
.ticks(3, "%")
.tickSize(-height)
.tickSubdivide(true)
.tickValues([ 0, 50, 100]);

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");


var persistChart = d3.select("#intChart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var stack;

y.domain(persistData.map(function(d) { return d.axisName; }));
x.domain([0, width]);

// Transpose the data into layers by cost.
 stack = d3.layout.stack()(["sameValue", "anyValue"].map(function(cost) {
    return persistData.map(function(d, i) {
      return {x: d.college, y: +d[cost], color: d.color, type: cost, label: d.axisName, total: d.totalValue};
    });
	}));

persistChart.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll(".x.axis text")
.style("text-anchor", "middle");

persistChart.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("");


//add a group of rects for each college
var colleges = persistChart.selectAll("g.colleges")
      .data(stack)
    .enter().append("svg:g");


// add a rect for each member in the series
colleges.selectAll("rect")
.data(Object)
.enter().append("svg:rect")
.attr("class", "bar")
.style("opacity", 1e-6)
.style("fill", function(d) {return d.type == "sameValue" ? d.color : "#ddd" ;})
.attr("y", function(d) { return y(d.x); })
.attr("x", 0)
.attr("height", y.rangeBand())
.attr("transform", function (d, i) { return "translate(" + x(d.y0) + "," + "0.15)"; })
.attr("width", function(d) { return x(d.y); })
.on("click", dispatchBar);





//tooltips 
	
	var barTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-8, 0])
    .html(function(d) { return d.type == "sameValue" ?  "<span style='color:#4682B4'>"  + d.y + "% </span>" : "<span style='color:#4682B4'>"  + d.total + "% </span>from UCB";});


	//set up the tool tips
	d3.selectAll(".bar").call(barTip);
	d3.selectAll(".bar").on('mouseover', barTip.show)
		.on('mouseout', barTip.hide);
	
	d3.selectAll(".bar")
		.transition().delay(1000).duration(2500)
		.style("opacity", 0.85);
}
