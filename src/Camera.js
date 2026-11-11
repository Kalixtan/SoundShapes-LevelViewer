// Camera.js

let panX = 0, panY = 0;
let panSpeed = 5;
let zoom = 7;
let zoom_min = 0.01;
let zoomSpeed = 0.025;

let dragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

function mouseWheel(event) {
    // Adjust zoom
    let delta = event.delta * zoomSpeed * 0.1;
    let new_zoom = zoom - delta;

    if (new_zoom >= zoom_min) {
        // Get the position of the mouse in world coordinates before zooming
        let worldMouseX = (mouseX - width / 2) / zoom + panX;
        let worldMouseY = (mouseY - height / 2) / zoom + panY;
        
        // Apply the new zoom
        zoom = new_zoom;

        // Get the position of the mouse in world coordinates after zooming
        let newWorldMouseX = (mouseX - width / 2) / zoom + panX;
        let newWorldMouseY = (mouseY - height / 2) / zoom + panY;

        // Adjust panning to keep the mouse over the same world point
        panX -= worldMouseX - newWorldMouseX;
        panY -= worldMouseY - newWorldMouseY;
    }
}




function mousePressed() {
    // Start dragging
    dragging = true;
    previousMouseX = mouseX;
    previousMouseY = mouseY;
}

function mouseReleased() {
    // Stop dragging
    dragging = false;
}

function mouseDragged() {
    // Pan the view if dragging
    if (dragging) {
        panX -= ((previousMouseX - mouseX) / zoom)*panSpeed;
        panY -= ((previousMouseY - mouseY) / zoom)*panSpeed;
        previousMouseX = mouseX;
        previousMouseY = mouseY;
    }
}

function Camera_keyboard_update() {
    // Pan camera
    if (keyIsDown(UP_ARROW)) panY += panSpeed;
    if (keyIsDown(DOWN_ARROW)) panY -= panSpeed;
    if (keyIsDown(LEFT_ARROW)) panX += panSpeed;
    if (keyIsDown(RIGHT_ARROW)) panX -= panSpeed;

    // Zoom in and out
    if (keyIsDown(187)) zoom += zoomSpeed; // '+' key
    if (keyIsDown(189)) zoom = max(zoom_min, zoom - zoomSpeed); // '-' key
}
