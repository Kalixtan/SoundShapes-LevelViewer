class Entity { // BASE OBJECT
    constructor(data) {
        this.data = data;
    }
    style_color() {
		noStroke();
		switch (this.data.style) {
			case 0: // stick
				fill('rgba(0,255,255, 0.5)');
				//fill('rgb(0,255,255)');
				break;
			case 1: // no stick
				fill('rgba(0,0,0, 0.5)');
				//fill('rgb(0,0,0)');
				break;
			case 2: // death
				fill('rgba(255,0,0, 0.5)');
				//fill('rgb(255,0,0)');
				break;
			default: // Unknown
				fill('rgba(255,255,255, 0.5)');
				//fill('rgb(255,255,255)');
				break;
		}
    }
}

class PLACEHOLDER extends Entity { // PLACEHOLDER OBJECT
    constructor(data) {
        super( data )
        console.log( "ADDED UNKNOWN OBJECT: ", data )
    }

    draw() {
        // Placeholder: Draw a circle at the entity's position
		//*
		fill('rgba(255,255,255, 0.25)');
		noStroke();
        circle(this.data.posX, -this.data.posY, 1);
        //*/
    }
}


class Note_Entity extends Entity { // SPLIT OFF SO EACH NOTE OBJECT GETS ITS OWN OBJECT
    draw() {
		fill('rgba(255,255,0, 0.75)');
		noStroke();
        circle(this.data.posX, -this.data.posY, 0.5);
    }
}


// SOLIDS
class Ground_Entity extends Entity {
    draw_rect() {
		let angle = Math.atan2(-this.data.ry, this.data.rx);
		
        push();  // save the current transformation
		translate(this.data.posX, -this.data.posY);  // move the origin to the rectangle's position
		rotate(angle);  // rotate by the computed angle
		
		rect(-this.data.w/2, -this.data.h/2, this.data.w, this.data.h);  // draw the rectangle centered at the new origin
		pop();  // restore the transformation

    }
}
class Platformer_EntityPacks_GroundResizeNoRotate extends Ground_Entity { // DONE
    draw() {
        this.style_color()
        this.draw_rect()
    }
}
class Platformer_EntityPacks_GroundResizeNoRotateNoClimb extends Ground_Entity { // TODO ?
    draw() {
        this.style_color()
        this.draw_rect()
    }
}
class Platformer_EntityPacks_SingleCircleGround extends Entity { // Verify sizeing
    draw() {
        this.style_color()
        circle(this.data.posX, -this.data.posY, this.data.radius*0.5);
    }
}
class Platformer_EntityPacks_TriangleGround extends Entity { 
    draw() {
		this.style_color()
		
        push();  // save the current transformation
		translate(this.data.posX, -this.data.posY);  // move the origin to the rectangle's position
        triangle(this.data.ax, -this.data.ay, this.data.bx, -this.data.by, this.data.cx, -this.data.cy);
		pop();  // restore the transformation
    }
}




// MODS
class Mob_Entity extends Entity {
    constructor(data) {
        super( data )
        this.radius = 2
        
        console.log( "ADDED UNKNOWN MOB: ", data )
        
    }
    draw_mob() {
		let angle = this.data.editRotateValue;

        push();
        translate(this.data.posX, -this.data.posY);  // Remember to invert the y-coordinate
        rotate(angle);  
		
		noFill()
		strokeWeight(0.1);
		
        // Draw a simple arrow
        line(0,0, 0,this.radius*0.5);  // arrow shaft
        circle(0,0,this.radius);

        pop();
    }
    draw() {
		stroke('rgb(255,255,255)');
		this.draw_mob()
    }
}
class BG_Mob_Entity extends Mob_Entity { // TMP
    constructor(data) {
        super( data )
        this.radius = 1
    }
    draw() {
		stroke('rgba(255,255,255,0.25)');
		this.draw_mob()
    }
}

// TEXT
class Text_Entity extends Entity {
    constructor(data) {
        super( data )
        this.data.noteText = this.data.noteText.replace(/\^/g, '\n');
    }
    draw() {
        push();
        translate(this.data.posX, -this.data.posY);
        scale(this.data.editStretchValue);
		
		noStroke()
		
		textAlign(CENTER);
		text(this.data.noteText, 0, 0);

        pop();
    }
}

let entityClasses = {
	// TEXT
    "Platformer_EntityPacks_TutorialMessage": Text_Entity,
    
	// NOTES
    "Platformer_EntityPacks_HillsLongMelody": Note_Entity,
    "Platformer_EntityPacks_ColinWorld_NoteColinSynth": Note_Entity,
    "Platformer_EntityPacks_Vicland_VicMelodyNote": Note_Entity,
    "Platformer_EntityPacks_DrumSquareLongMelody": Note_Entity,
    "Platformer_EntityPacks_HillsSnare": Note_Entity,
    "Platformer_EntityPacks_ColinWorld_HillsKick": Note_Entity,
    "Platformer_EntityPacks_Beck_HillsKick": Note_Entity,
    "Platformer_EntityPacks_Beck_SpiralDrumsV3": Note_Entity,
    "Platformer_EntityPacks_HillsKick": Note_Entity,
    "Platformer_EntityPacks_DrumSquareTextural": Note_Entity,
       
	// Core Mobs
    "Platformer_EntityPacks_SpawnPoint": Mob_Entity,
    "Platformer_EntityPacks_GameStuff_PlayerCheckpoint": Mob_Entity,
    "Platformer_EntityPacks_WinThing": Mob_Entity,
    
	// Mobs
    "Platformer_EntityPacks_SwayingTree": Mob_Entity,
    "Platformer_EntityPacks_GoombaCritterGuitar": Mob_Entity,
    "Platformer_EntityPacks_GoombaCritterGuitar3": Mob_Entity,
    "Platformer_EntityPacks_AtlasCrab": Mob_Entity,
    "Platformer_EntityPacks_PlanetStemFleur": Mob_Entity,
    "Platformer_EntityPacks_SafeVine": Mob_Entity,
    "Platformer_EntityPacks_SlimeEyes": Mob_Entity,
    
	// Background Mobs
	//*
    "Platformer_EntityPacks_VicPipe": BG_Mob_Entity,
    "Platformer_EntityPacks_VicCrackBG": BG_Mob_Entity,
    "Platformer_EntityPacks_VicStars": BG_Mob_Entity,
    "Platformer_EntityPacks_VicVolcano": BG_Mob_Entity,
    "Platformer_EntityPacks_VicEyesBG": BG_Mob_Entity,
    //*/
    
    // SOLID RECT
    "Platformer_EntityPacks_GroundResizeNoRotateNoClimb": Platformer_EntityPacks_GroundResizeNoRotateNoClimb,
    "Platformer_EntityPacks_GroundResizeNoRotate": Platformer_EntityPacks_GroundResizeNoRotate,
    
    // SOLID CIRCLE
    "Platformer_EntityPacks_SingleCircleGround": Platformer_EntityPacks_SingleCircleGround,
    
    // SOLID OTHER
    "Platformer_EntityPacks_TriangleGround": Platformer_EntityPacks_TriangleGround,
    
    // Add other entity classes here...
}
