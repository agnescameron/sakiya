// function drawBranch(menu) {

// 	var base = $( '#' + meu ).offset();
// 	console.log($( '#SAKIYA' ).offset());

// 	for(i=0; i<menus[menu].contents.length; i++){
// 		var branch = new Path();
// 		branch.strokeColor = 'black';
// 		var goalDiv = menus["main"].contents[i];

// 		var goal = $('#' + goalDiv).offset();
// 		goal.left =	goal.left + $( '#' + goalDiv ).width()/2;
// 		goal.top =	goal.top + $( '#' + goalDiv ).height()/2;

// 		var goalPoint = new Point(goal.left, goal.top)

// 		branch.moveTo(basePoint)
// 		branch.lineTo(goalPoint);
// 		// console.log(basePoint, goalPoint)
// 	}

// }


function drawTree() {
	for (j=0; j<Object.keys(menus).length; j++){
        drawBranch(Object.keys(menus)[j]);
        console.log(j)
    }
}

function drawBranch(menu) {
	$baseDiv = (menus[menu].contents[0] === "SAKIYA") ? $( '#SAKIYA' ) : $('#' + menu)
	console.log($baseDiv.attr('id'))
	console.log('menu is ', menu)
	
	var base = $baseDiv.offset();
	console.log($baseDiv.offset());
	// offset outputs e.g. { top: 451.20001220703125, left: 632 }
	base.left = base.left + $baseDiv.width()/2;
	base.top = base.top - $baseDiv.height()/2;
	// repositions base.left and base.top to the center of "$SAKIYA"
	var basePoint = new Point(base.left, base.top)
	console.log("basePoint is ", basePoint)
	
	
	//need to draw to parents not children
	for(i=0; i<menus[menu].contents.length; i++){
		console.log('we are at ', menu, menus[menu].contents[i]);

		if(menus[menu].contents[i] !== ''){
			var branch = new Path();
			branch.strokeColor = 'black';
			goalDiv = (menus[menu].level === 0) ? ('frame' + i) : ('frame' + (j-1) + i);
			//console.log(goalDiv)

			console.log('goalDiv is ', goalDiv, 'length is ', menus[menu].contents.length, 'menu is ', menu)

			var goal = $('#' + goalDiv).offset();
			goal.left =	goal.left + $( '#' + goalDiv ).width()/2;
			goal.top =	goal.top + $( '#' + goalDiv ).height()/2;

			var goalPoint = new Point(goal.left, goal.top)

			branch.moveTo(basePoint)
			branch.lineTo(goalPoint);
		}
	}
}

drawTree();