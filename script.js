$(document).ready(function() {

	/* result list, each element is a dictionary
	
	userList = [{'charttype' : 'bar', userSet : '10%', 'sysSet':'12%', userId: ''},
				{'charttype' : 'pie', userSet : '10%', 'sysSet':'12%', userId: ''},
				{'charttype' : 'radar', userSet : '10%', 'sysSet':'12%', userId: ''}
			]

	*/
	var userList = [];
	var numQuestion = 6;
	var originNum = numQuestion;
	var sys = 0;

	var randomNum = getRandomInt(1,7) - 1;

	var latinSquare = [
		['F','B','A','C','D','E'],
		['E','C','B','F','A','D'],
		['D','A','C','E','F','B'],
		['A','D','E','B','C','F'],
		['B','F','D','A','E','C'],
		['C','E','F','D','B','A']
	]

	var order = latinSquare[randomNum];

	function createSvg(){
		$('#warper').prepend('<div id = \'content\'></div>');
		$('#content').append($('<svg height="400" width="650"></svg>'));
	};

	$('#welButton').on('click',function(){
		$('#welcome').remove();
		$('#note').show();
	});


	$('#noteButton').on('click',function(userList){
		
		createSvg();
		$('#note').remove();
		sys = $('#content').myfunction(order[0]);
		$('#nextButton').show();

		slider();
	});

	$('#next').on('click',function(){

		var singleDict = {};
		singleDict['userSet'] = +$('#percent-display').text();
		singleDict['sysSet'] = sys;
		//console.log(singleDict);
		
		userList.push(singleDict);
		//console.log(userList);

		$('#content').remove();
		if (numQuestion == 1){
			$('#nextButton').remove();
			$('#thanks').show();
			var table = $.makeTable(userList);
			$(table).appendTo("#thanks");
		}else{
			createSvg();
			sys = $('#content').myfunction(order[originNum - numQuestion + 1]);	
			slider();

			//console.log(+$('#slider').val());
			numQuestion = numQuestion - 1;
			$('#done').text((originNum - numQuestion + 1) + ' / ' + originNum);
		}
	});

	console.log(userList);

	//var test_array = [["name1", 2, 3], ["name2", 4, 5], ["name3", 6, 7], ["name4", 8, 9], ["name5", 10, 11]];
	// var fname = "IJGResults";

	// var csvContent = "data:text/csv;charset=utf-8,";
	// $("#pressme").click(function(){
	// 	userList.forEach(function(infoArray, index){
	// 		dataString = infoArray.join(",");
	// 		csvContent += index < infoArray.length ? dataString+ "\n" : dataString;
	// 	});

	// 	var encodedUri = encodeURI(csvContent);
	// 	window.open(encodedUri);
	//});
});


/* select random chart type tp show */
//reference : http://hamsterandwheel.com/grids/index2d.php
(function( $ ){
   $.fn.myfunction = function(orderSingle) {

   		var randomInt = orderSingle;
   		
   		if ((randomInt =='A') || (randomInt =='D')){
   			var sys = makeBar();
   		}
		else if((randomInt =='B') || (randomInt =='E')){
   			var sys = makePie();
   		}
		else if((randomInt =='C') || (randomInt =='F')){
			var sys = makeRadial();
		}
    	return Math.round(sys);
   }; 
})( jQuery );


/* slider interface */
function slider(){
	$('#slider').on('click',function(){
		var userSet = +$('#slider').val();
		$('#percent-display').text(userSet);
	});
}


// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/* generate random number */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

//reference: http://stackoverflow.com/questions/1051061/convert-json-array-to-an-html-table-in-jquery
$.makeTable = function (mydata) {
    var table = $('<table border=1>');
    var tblHeader = "<tr>";
    for (var k in mydata[0]) tblHeader += "<th>" + k + "</th>";
    tblHeader += "</tr>";
    $(tblHeader).appendTo(table);
    $.each(mydata, function (index, value) {
        var TableRow = "<tr>";
        $.each(value, function (key, val) {
            TableRow += "<td>" + val + "</td>";
        });
        TableRow += "</tr>";
        $(table).append(TableRow);
    });
    return ($(table));
};

/* make Bar chart */
function makeBar(){
	  
	  var content = d3.select("#content");

      var svg = d3.select("svg");
      var w = 500,
          h = 100,
          N = 10,
          barPadding = 15;
          
      var dataBar = [];
      for (var i=0; i<N; i++) {
          var data = Math.random() * 100;   // random number (0-100)
          dataBar.push(data);
      }

      var barWidth = w/dataBar.length - barPadding;
      var chosenA = getRandomInt(0, N-1);
      var chosenB;
      for (i=0; i<10; i++) {
        chosenB = getRandomInt(0, N-1);
        if (chosenB != chosenA) {
          i = 10;
        }
      }
      var dataChosen = [[dataBar[chosenA], chosenA],
                        [dataBar[chosenB], chosenB]];

      max = d3.max([dataBar[chosenA], dataBar[chosenB]]);
	  min = d3.min([dataBar[chosenA], dataBar[chosenB]]);
	  realPercent = (min * 100)/max;

      svg.selectAll("rect")
         .data(dataBar)
         .enter()
         .append("rect")
         .attr("x", function(d, i) { return 140 + i * (w/dataBar.length); })
         .attr("y", function(d) { return 180 + h - 2.5 * d; })
         .attr("width", barWidth)
         .attr("height", function(d) { return d * 2.5; })
         .attr("fill", "#ffffff")
         .attr("stroke", "#000000");

      var mark = svg.selectAll("circle")
                    .data(dataChosen)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d, i) { return 140 + d[1] * (w/dataBar.length) + barWidth * 0.5; })
                    .attr("cy", function(d) { return 0.5 * (360 + 2 * h - 2.5 * d[0]); })
                    .attr("r", 3)
                    .attr("fill", "#000000");

     return realPercent;


};

/* make Pie chart */
function makePie(){

	  var content = d3.select("#content");

	  var svg = d3.select("svg");
	  var w = 500,
	      h = 100,
	      N = 10;
	   
	  var outerRadius = 150,
	      innerRadius = 0;
	  
	  var dataPie = [];
	  for (var i=0; i<N; i++) {
	      var data = Math.random() * 100;   // random number (0-100)
	      dataPie.push(data);
	  }

	  var chosenA = getRandomInt(0, N-1);
	  var chosenB;
	  for (i=0; i<10; i++) {
	    chosenB = getRandomInt(0, N-1);
	    if (chosenB != chosenA) {
	      i = 10;
	    }
	  }

	  var pie = d3.layout.pie();
	  var dataChosen = [pie(dataPie)[chosenA], pie(dataPie)[chosenB]];

	  var arc = d3.svg.arc()
	                  .innerRadius(innerRadius)
	                  .outerRadius(outerRadius);
	  
	  max = d3.max([dataPie[chosenA], dataPie[chosenB]]);
	  min = d3.min([dataPie[chosenA], dataPie[chosenB]]);
	  realPercent = (min * 100)/max;
	  // set up groups
	  var arcs = svg.selectAll("g.arc")
	                .data(pie(dataPie))
	                .enter()
	                .append("g")
	                .attr("class", "arc")
	                .attr("transform", "translate("+outerRadius+", "+outerRadius+")");
	                
	  // location of marks
	  var markArc = d3.svg.arc()
						  .outerRadius(outerRadius - 20)
						  .innerRadius(outerRadius - 80);
	  
	  // draw arc paths
	  arcs.append("path")
	      .attr("d", arc)
	      .attr("fill", "#ffffff")
	      .attr("stroke", "#000000");
	  
	  arcs.selectAll("circle")
	                .data(dataChosen)
	                .enter()
	                .append("circle")
	                .attr("transform", function(d) { return "translate(" + markArc.centroid(d) + ")"; })
	                .attr("r", 3)
	                .attr("fill", "#000000");

	  return realPercent;

};



/* make Radial chart */
function makeRadial() {

	  var width = 900,
	      height = 400,
	      barHeight = height / 2 - 40,
		  numBars = 10;

	  var formatNumber = d3.format("s");

	  var svg = d3.select('svg')
	              .append("g")
	              .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

	  var values = [];
	  var dataRadial = [{"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}, 
	                    {"value":0, "outerRadius":0}];
	            
	  for (var i=0; i<numBars; i++) {
	      var data = Math.random() * (100 - 30) + 30;   // random number (0-100)
	      values.push(data);
	  };
	  dataRadial.forEach(function (d, i) {
	      d.value = values[i];
	  });

	  /* random picked number */
	  var chosenA = getRandomInt(0, numBars - 1);
	  var chosenB;
	  for (i=0; i<10; i++) {
	      chosenB = getRandomInt(0, numBars - 1);
	      if (chosenB != chosenA) {
	          i = 10;
	      }
	  }
	  var dataChosen = [chosenA, chosenB];

	  max = d3.max([dataRadial[chosenA], dataRadial[chosenB]]);
	  min = d3.min([dataRadial[chosenA], dataRadial[chosenB]]);
	  realPercent = (min * 100)/max;

	  var extent = d3.extent(dataRadial, function(d) { return d.value; });
	  var barScale = d3.scale.linear()
	                   .domain(extent)
	                   .range([0, barHeight]);

	  var arc = d3.svg.arc()
	              .startAngle(function(d,i) { return (i * 2 * Math.PI) / numBars; })
				  .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
				  .innerRadius(0);

	  var segments = svg.selectAll("path")
	                    .data(dataRadial)
	                    .enter()
	                    .append("path")
						.style("fill", "#ffffff")
						.style("stroke", "#000000")
						.attr("d", function(d, index) {
							d.outerRadius = d.value * 2;
							return arc(d, index);
	                    });
	      
	  // Marks
	  var markRadius = barHeight - 140;

	  var marks = svg.append("g")
	                 .classed("marks", true)
					 .append("def")
	                 .append("path")
	                 .attr("id", "label-path")
					 .attr("d", "m0 " + -markRadius + " a" + markRadius + " " + markRadius + " 0 1,1 -0.01 0");

	  marks.selectAll("text")
	       .data(dataChosen)
	       .enter()
		   .append("text")
	       .style("text-anchor", "middle")
	       .append("textPath")
	       .attr("xlink:href", "#label-path")
	       .attr("startOffset", function(d, i) {return d * 100 / numBars + 50 / numBars + '%';})
	      .style("font-weight","bold")
	      .text("·");

	return chosenA;


};
