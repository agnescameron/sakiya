	var path = new Path();
	// Give the stroke a color
	path.strokeColor = 'black';
	var start = new Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note the plus operator on Point objects.
	// PaperScript does that for us, and much more!
	path.lineTo(start + [ 100, -50 ]);


var path = new Path.Circle({
	center: view.center,
	radius: 30,
	strokeColor: 'black'
});

function onResize(event) {
	// Whenever the window is resized, recenter the path:
	path.position = view.center;
}