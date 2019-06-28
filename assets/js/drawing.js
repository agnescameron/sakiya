function drawBranch() {

}


function drawMainTree() {
	var base = $( '#SAKIYA' ).offset();
	console.log($( '#SAKIYA' ).offset());
	// offset outputs e.g. { top: 451.20001220703125, left: 632 }
	base.left = base.left + $( '#SAKIYA' ).width()/2;
	base.top = base.top - $( '#SAKIYA' ).height()/2;
	// repositions base.left and base.top to the center of "$SAKIYA"
	var basePoint = new Point(base.left, base.top)
	// makes new basePoint var which is this center

	for(i=0; i<menus["main"].contents.length; i++){ // count up to total number of objects in "main"
		var branch = new Path({
		strokeColor: 'brown',
		strokeWidth: 20,
		strokeCap: 'round',
	});

		// console.log("segments" + branch.segments);
		var goalDiv = menus["main"].contents[i];
		var goal = $('#' + goalDiv).offset();
		goal.left =	goal.left + $( '#' + goalDiv ).width()/2;
		goal.top =	goal.top + $( '#' + goalDiv ).height()/2;
		var goalPoint = new Point(goal.left, goal.top);
		// makes a center goalPoint of each of the menus with class "main"


		var midPoint = new Point(((goalPoint.x + basePoint.x)/2), ((goalPoint.y + basePoint.y)/2));
		var firstPoint = new Point(((1/3)*basePoint.x + (2/3)*goalPoint.x), ((1/3)*basePoint.y + (2/3)*goalPoint.y));
		var thirdPoint = new Point(((2/3)*basePoint.x + (1/3)*goalPoint.x), ((2/3)*basePoint.y + (1/3)*goalPoint.y));
		var fourthPoint = new Point(((1/4)*basePoint.x + (3/4)*goalPoint.x), ((1/4)*basePoint.y + (3/4)*goalPoint.y));


		var length = branch.length;
		var points = 12;

		// var start = goalPoint;
		// for (var i = 0; i < points; i++) 
		// 	branch.add(start + new Point(i * goalPoint));

		// branch.add(new Point(midPoint));
		branch.fullySelected = true

		branch.moveTo(basePoint);
		branch.lineTo(firstPoint);
		branch.lineTo(midPoint);
		branch.lineTo(thirdPoint);
		branch.lineTo(thirdPoint);
		branch.lineTo(goalPoint);

	}
}

drawMainTree();