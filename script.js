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

/* select random chart type tp show */
(function( $ ){
   $.fn.myfunction = function() {
      var sys = makeBar();
      return sys;
   }; 
})( jQuery );

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/* generate random number */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

/* make Bar chart */
function makeBar(){
	  
	  var content = d3.select("#content");

	  var svg = d3.select("svg");
	  var w = 500,
	      h = 100,
	      N = 10,
	      barPadding = 7;
	      
	  var dataBar = [];
	  for (var i=0; i<N; i++) {
	      var data = Math.random() * 100;   // random number (0-100)
	      dataBar.push(data);
	  }

	  var barWidth = w/dataBar.length - barPadding;
	  var chosenA = getRandomInt(0, N-1);
	  // console.log(chosenA);
	  // console.log(dataBar[chosenA]);

	  svg.selectAll("rect")
	     .data(dataBar)
	     .enter()
	     .append("rect")
	     .attr("x", function(d, i) { return 150 + i * (w/dataBar.length); })
	     .attr("y", function(d) { return 150 + h - 2 * d; })
	     .attr("width", barWidth)
	     .attr("height", function(d) { return d * 2; })
	     .attr("fill", "#ffffff")
	     .attr("stroke", "#000000");

	  svg.selectAll("circle")
	     .data(dataBar)
	     .enter()
	     .append("circle")
	     .attr("cx", function(d) { return 150 + chosenA * (w/dataBar.length) + barWidth * 0.5; })
	     .attr("cy", function(d) { return 0.5 * (300 + 2 * h - 2 * dataBar[chosenA]); })
	     .attr("r", 5)
	     .attr("fill", "#000000");

	     return chosenA;
};