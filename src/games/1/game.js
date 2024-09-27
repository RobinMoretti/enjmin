 /*
Introduction à la programmation P5.js - 20
Title : Just Shapes and Tears
Team : Faer Souville - GD, Léa Docteur - CDP, Gaby Laty - CV 
Promotion : ENJMIN - P20
Tagline : Évitez les différentes attaques en déplaçant votre curseur et tentez de survivre le plus longtemps possible
Input : Déplacez votre souris pour vous déplacer sur l'écran, appuyez sur SPACEBAR pour recommencer.

Librairies used : *
Comments : 
*/
import characterURL from '../1/assets/chatJPEG.jpg'
import musiqueURL from '../1/assets/musique.mp3'
import looseSoundURL from '../1/assets/negatif3.wav'
import imgURL from '../1/assets/delimitations.png'

var character;
var jpos = [250, 250];
var proj = []

let fontSize = 40;
var isTouched = false;

var xc
var yc

let leftWall = 20;
let rightWall = 480;
let topWall = 20;
let bottomWall = 480;
let points = [];
var timer = 0

var quake_timer = 60;
var doquake = false;

var musique;

let looseSound;
let img;


const sketch = (p, props) => {
  p.preload = function() {
    character = p.loadImage(characterURL);
    musique = p.loadSound(musiqueURL)
    looseSound = p.loadSound(looseSoundURL);
    img = p.loadImage(imgURL);
  }

  p.setup = function() {
    p.createCanvas(500, 500);
    p.imageMode(p.CENTER);
    p.rectMode(p.CENTER);
    p.ellipseMode(p.CENTER);
    p.background(0);

    jpos = [0, 0];
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(fontSize);
    p.noCursor();
    musique.play();
    
    
    for(let i = 0; i < 15; i++){
      points.push({ x: 0, y: 0});
    }

  }

  p.draw = function() {
    p.background(0);
    p.stroke("white");
    p.strokeWeight(1);
    p.fill("white");
    p.image(img, 250, 250);
    
    p.char_movement();
    p.checkforded();
    
    if(p.frameCount % 20 == 0 && !isTouched){


      if (timer >= 57){
        p.phase_2();
      }
      else{
        p.phase_1();
      }
      
    }
    
    for (var i = 0; i < proj.length; i++){
      proj[i].aspect();
    }
    
    let pix = p.get(xc, yc);

    let isWhite = p.red(pix) === 255 && p.green(pix) === 255 &&   p.blue(pix) === 255 && p.alpha(pix) === 255
    if (!isWhite){
      isTouched = true;
    }
    else{
      if (p.frameCount % 30 == 0 && !isTouched){
        timer += 0.5;
      }
    }
    
    p.fill("white")
    p.noStroke();
    p.text(p.int(timer), 250, 20);


  }



  p.characterTrail = function (xc, yc) {
    for(let i = 0; i < points.length -1; i++){
      points[i] = points[i + 1];
    }
    
    points[points.length -1] = { x: xc, y: yc};
    
    for(let i = 0; i< points.length; i++){
      const diameter = p.floor(p.map(i, 0, points.length - 1, 0, 30));
      if(points[i].x == undefined) return
      p.ellipse(points[i].x, points[i].y, diameter, diameter);
    }
  }



  p.checkforded = function() {
    for (var i = 0; i < proj.length; i++){
      if (proj[i].lifetime <= 0){
        proj.splice(i, 1);
      }
    }
  }

  p.char_movement = function() {
    p.characterTrail();
    // xm is just the p.mouseX, while
    // xc is the p.mouseX, but constrained
    // between the leftWall and rightWall!
    let xm = p.mouseX;
    xc = p.constrain(jpos[0], leftWall, rightWall);
    let ym = p.mouseY;
    yc = p.constrain(jpos[1], topWall, bottomWall);
    //le lerp omg
    jpos[0] = p.lerp(jpos[0], p.mouseX, 0.4);
    jpos[1] = p.lerp(jpos[1], p.mouseY, 0.4);
    // draw les murs 
    p.stroke(150);
    p.line(leftWall, 20, leftWall, 480);
    p.line(rightWall, 20, rightWall, 480);
    p.line(20, topWall, 480, topWall);
    p.line(20, bottomWall, 480, 480);
    // la chose qui est contrainte
    
    if (!isTouched){
      p.stroke("white");
      p.fill("white");
    }
    else{
      p.stroke("cyan");
      p.fill("cyan");
      musique.setVolume(0,0.3,0);
      looseSound.play();
      looseSound.setVolume(0, 0.15, 0);
    }

    p.characterTrail(xc,yc);
    //ellipse(xc, yc, 25, 25);
    //image(character, xc, yc, 25, 25);
  }

  // ------------------------- DIFFICULTY

  p.phase_1 = function() {
    
      if (p.frameCount % 80 == 0){
        proj.push(new p.falling_pixel(p.random(500), -150));
      }
    
      if (timer > 10.5 && p.frameCount % 40 == 0){
        proj.push(new p.acne(p.random(500), p.random(500)))
        proj.push(new p.acne(p.random(500), p.random(500)))
      }
    
      if (timer > 23){
        proj.push(new p.laser_beam())
      }
      
      if (timer >= 35.5){
        
        if (quake_timer % 60 == 0){
          doquake = true;
          proj.push(new p.earthquake(p.random(500), p.random(500)))
          proj.push(new p.earthquake(p.random(500), p.random(500)))
        }
        if (doquake == true){
          quake_timer += 2;
          print(quake_timer)
        }
      }
  }

  p.phase_2 = function() {
      if (timer >= 57){
        proj.push(new p.earthquake(0,0));
        proj.push(new p.earthquake(500,0));
        proj.push(new p.earthquake(500,500));
        proj.push(new p.earthquake(0,500));
      }
      if (timer >= 65){proj.push(new p.laser_beam(proj.length))}
      if (timer >= 70){proj.push(new p.laser_beam(proj.length))}
      if (timer >= 80){
        proj.push(new p.laser_beam(proj.length));
        proj.push(new p.laser_beam(proj.length));
      }
      if (timer >= 90){
        proj.push(new p.laser_beam(proj.length))
        proj.push(new p.acne(p.random(500), p.random(500)));
      }
  }

  // ------------------------- SCORE
  p.sprite = function (x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.life = 3;
    
    p.rect(this.x, this.y, this.size);
    
    this.addLife = function(){
      this.life = this.life + 1;
    }
    this.removeLife = function(){
      this.life = this.life - 1;
    }
  }

  p.item = function (x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.life = 1;
    
    p.ellipse(this.x, this.y, this.size);
  }

  p.addScore = function() {
    
    score = score + 1;
  }

  p.removeScore = function() {
    score = score - 1;
  }

  // ------------------------- PROJECTILES


  p.laser_beam = function()  {
    p.strokeCap(p.PROJECT);
    
    var id = -1
    var rng = p.int(p.random(0,3));

    var xi = p.random(p.width);
    var yi = p.random(p.height);
    var xf = p.random(p.width);
    var yf = p.random(p.height);
    
    // TOP
    if (rng == 0)
    {
      yi = 0;
      rng = p.int(p.random(0,2));
      if (rng == 0){xf = 0;}
      if (rng == 1){xf = p.width * 5.0;}
      if (rng == 2){yf = p.height;}
    }
    
    // LEFT
    if (rng == 1)
    {
      xi = -50;
      rng = p.int(p.random(0,2));
      if (rng == 0){yf = -50;}
      if (rng == 1){xf = p.width;}
      if (rng == 2){yf = p.height * 5.0;}
    }
    
    // BOTTOM
    if (rng == 2){
      yi = p.height;
      rng = p.int(p.random(0,2));
      if (rng == 0){xf = -50;}
      if (rng == 1){xf = p.width * 5.0;}
      if (rng == 2){yf = -50;}
    }
    
    // RIGHT
    if (rng == 3){
      xi = p.width;
      rng = int(p.random(0,2));
      if (rng == 0){xf = -50;}
      if (rng == 1){yf = p.height * 5.0;}
      if (rng == 2){yf = -50;}
    }

    
    this.inipos = new p.constructor.Vector(xi, yi);
    this.finalpos = new p.constructor.Vector(xf, yf);
    this.lifetime = 60;
    
    this.aspect = function(){
      // Windup
      if (this.lifetime > 20){
        p.stroke(255,255,255,50);
      }
      else{
        p.stroke(this.lifetime*10, 10,0,255);
      }
      if (this.lifetime > 0){
        this.lifetime -= 1;
      }
      if (this.lifetime == 18 || this.lifetime == 19)
        { p.stroke(255,250,250,255)}
      if (this.lifetime < 10)
      { p.stroke(255,255,255,this.lifetime*10)
      }

      
      p.strokeWeight(this.lifetime);
      p.line(this.inipos.x, this.inipos.y, this.finalpos.x, this.finalpos.y);

    }
  }

  p.acne = function(x, y) {
    this.position = new p.constructor.Vector(x,y)
    this.lifetime = 60;
    this.size = 50;
    
    this.aspect = function(){
      if (this.lifetime > 20){
        p.stroke(255,255,255,50);
        p.fill(255,255,255,50)
        this.size = lerp(50,60,1)
      }
      else{
        p.fill(this.lifetime*10, 10,0,255)
        p.stroke(this.lifetime*10, 10,0,255);
        this.size -= 1
      }
      
      if (this.lifetime >= 10){this.size += 3;}
      if (this.lifetime > 0){
        this.lifetime -= 1;
      }
      p.strokeWeight(1);
      p.circle(this.position.x, this.position.y, this.size)
    }
  }

  p.earthquake = function(x, y) {
    this.position = new p.constructor.Vector(x,y)
    this.lifetime = 100;
    this.size = 50;
    
    this.aspect = function(){
      p.fill(0,0,0,0)
      if (this.lifetime > 50){
        p.stroke(255,255,255,50);
      }
      else{
        p.stroke(this.lifetime * 5, 0,0,255);
      }
      if (this.lifetime > 0){
        this.lifetime -= 1;
      }
      
      this.size += 3;
      p.strokeWeight(10);
      p.circle(this.position.x, this.position.y, this.size)
    }
  }

  p.falling_pixel = function (x, y) {
    this.position = new p.constructor.Vector(x,y)
    this.lifetime = 15000;
    
    this.small_size = 10;
    this.med_size = 20;
    this.big_size = 30;
    
    var target_small = 20;
    var target_med = 30;
    var target_big = 40;
    
    
    this.aspect = function(){

      p.strokeWeight(1);
      
      if (p.frameCount % 20 == 0){
        this.lifetime -= 1;
        this.position.y += 50;
        
        target_small = 20;
        target_med = 30;
        target_big = 40;
      }
      
      target_small = p.lerp(target_small, this.small_size, 0.5);
      target_med = p.lerp(target_med, this.med_size, 0.5);
      target_big = p.lerp(target_big, this.big_size, 0.5);
      
      
      p.stroke(255,10,0,50);
      p.fill(255,10,0,50);
      p.rect(this.position.x, this.position.y - 100, target_small)
      p.stroke(255,10,0,150);
      p.fill(255,10,0,150);
      p.rect(this.position.x, this.position.y - 50 , target_med)
      
      p.stroke(255,10,0,255);
      p.fill(255,10,0,255);
      p.rect(this.position.x, this.position.y, target_big)
      
      p.stroke(255,255,255,50);
      p.fill(255,255,255,50);
      p.rect(this.position.x, this.position.y + 50, target_med)
      p.rect(this.position.x, this.position.y + 100, target_small)
    }
  }


};




export default sketch;