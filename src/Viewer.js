let levelData = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvasContainer'); // This makes the canvas a child of the div with id 'canvasContainer'
    frameRate(60); // Increase the frame rate to 60 FPS
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(125);

	if (levelData) {
		Camera_keyboard_update();

		// Translate to center of screen, apply zoom, and translates to the correct location
		translate(width / 2, height / 2);
		scale(zoom);
		translate(panX, panY);

		// Draw screens
		if (levelData.screenData) {
			levelData.screenData.forEach(screen => {
				screen.draw();
			});
		}

		// Draw entities
		if (levelData.entities) {
			levelData.entities.forEach(entity => {
				entity.draw();
			});
		}
	}
}

function displayLevelData(_levelData) {
    levelData = _levelData;

    // center cam on player start pos
    panX = levelData.playerX;
    panY = levelData.playerY;
    
    
    // if new entities exists
    if( levelData.entitiesB ) levelData.entities = levelData.entitiesB

    // Convert entities to objects
    levelData.entities = levelData.entities.map(data => {
        let cls = entityClasses[data.entType] || PLACEHOLDER;
        return new cls(data);
    });

    // Convert screens to objects
    levelData.screenData = levelData.screenData.map(data => {
        return new Screen_object( data, levelData.firstScreenX, levelData.firstScreenY );
    });
}
