function init(){
	var windowHeight = $(window).height();
	var windowWidth = $(window).width()
	var stage = new Kinetic.Stage({
		container: 'container',
		width: windowWidth,
		height: windowHeight
	});
	var layer = new Kinetic.Layer();

	var imageObj = new Image();
	imageObj.onload = function() {
		var poker = new Kinetic.Image({
			image: imageObj,
			x: 0,
            y: 0,
			width:70,
			height:95,
            crop: {
                  x: 70*(1-1),
                  y: 95*(5-1),
                  width: 70,
                  height: 95
            },
			draggable: true
		});

		// add the shape to the layer
		layer.add(poker);

		// add the layer to the stage
		stage.add(layer);
	};
	imageObj.src = 'poker.png';
}