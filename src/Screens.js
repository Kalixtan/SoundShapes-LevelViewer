class Screen_object {
    constructor(data, sx, sy) {
        this.data = data;
        
        if (sx) this.data.screenX += sx
        if (sy) this.data.screenY += sy
        
        this.w = 40
        this.h = 25-2
    }

    draw() {
		noFill()
		stroke('rgb(255,255,255)');
		strokeWeight(0.1);
		
		rect( ((this.w-1)*(this.data.screenX+6))-0.5, ((this.h-1)*-(this.data.screenY+5))-0.5, this.w, this.h);
    }
}
