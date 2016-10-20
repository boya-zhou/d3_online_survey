$(document).ready(function() {

	/* result list, each element is a dictionary
	
	userList = [{'charttype' : 'bar', userSer : '10%', 'sysSet':'12%', userId: ''},
				{'charttype' : 'pie', userSer : '10%', 'sysSet':'12%', userId: ''},
				{'charttype' : 'radar', userSer : '10%', 'sysSet':'12%', userId: ''}
			]

	*/
	var userList = [];
	var numQuestion = 6;
	var originNum = numQuestion;

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
		var sys = $('#content').myfunction();
		$('#nextButton').show();

		slider();
	});

	$('#next').on('click',function(){

		var singleDict = {};
		singleDict['userSet'] = +$('#percent-display').text();
		//console.log(singleDict);
		
		userList.push(singleDict);
		//console.log(userList);

		$('#content').remove();
		if (numQuestion == 1){
			$('#nextButton').remove();
			$('#thanks').show();
		}else{
			createSvg();
			$('#content').myfunction();	
			slider();

			//console.log(+$('#slider').val());
			numQuestion = numQuestion - 1;
			$('#done').text((originNum - numQuestion + 1) + ' / ' + originNum);
		}
	});

	console.log(userList);

	// /*write file*/
	// require("fs").writeFile(
	//     './' + '00' + '.result',
	//     //arr.map(function(v){ return v.join(', ')).join('\n'),
	//     function (err) { console.log(err ? 'Error :'+err : 'ok') }
	// );
});

/*slider interface*/
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

/* select random chart type tp show */
(function( $ ){
   $.fn.myfunction = function() {

   		var randomInt = getRandomInt(1,3);
   		if (randomInt ==1){
   			var sys = makePie();
   		}else if(randomInt == 2){
   			var sys = makeBar();
   		}
    	return sys;
   }; 
})( jQuery );



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
                    .attr("r", 5)
                    .attr("fill", "#000000");

     return chosenA;
};

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
	  //console.log(dataChosen);

	  var arc = d3.svg.arc()
	                  .innerRadius(innerRadius)
	                  .outerRadius(outerRadius);
	  
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
	                .attr("r", 5)
	                .attr("fill", "#000000");

	  return chosenA;

};