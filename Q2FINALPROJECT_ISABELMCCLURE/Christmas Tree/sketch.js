var canvas;
var ornaments = [];
var maxOrnaments = 10;
var dragged = [];
var full;
var count;
var colors = [];

function setup(){
  colors = [createVector(0, 0, 255), createVector(153, 51, 255), createVector(0, 255, 204) ];
  canvas = createCanvas(1585, 820)
  full = false;
  loadOrnaments();
  count = maxOrnaments;
}
function draw(){
  background(230, 0, 0);
  fill(128, 43, 0);
  noStroke();
  rect(width/2-50, height*(5/6)+50, 100, 200);
  fill(0, 102, 0);
  triangle(width/2-400, height*(5/6)+50, width/2, height*(2.25/6)+50, width/2+400, height*(5/6)+50);
  triangle(width/2-300, height*(3.5/6)+50, width/2, height*(1.25/6)+50, width/2+300, height*(3.5/6)+50);
  triangle(width/2-200, height*(2/6)+50, width/2, height*(0.25/6)+50, width/2+200, height*(2/6)+50);
  fill(204, 122, 0);
  rect(width-230, 10, 200, height-20);
  runOrnaments();
  for(var i = 0; i< maxOrnaments; i++){
    if(ornaments[i].isInside == false){
      count--;
    }
    if(count == 0){
      fill(255, 255, 0);
      /*translate(width/2, height*(0.25/6)+50);*/
      push();
      translate(width/2, height*(0.25/6)+50);
      rotate(frameCount / -100.0);
      star(0, 0, 30, 70, 5);
      pop();

    }
  }
  count = maxOrnaments;
}
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function loadOrnaments(){
  for(var i = 0; i< maxOrnaments; i++){
    ornaments.push(new Ornaments(i));
  }
}
function runOrnaments(){
  for(var j = 0; j < maxOrnaments; j++){
    ornaments[j].run();
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function Ornaments(id){
  this.rand = Math.round(random(0, colors.length-1));
  this.loc = createVector(width - 130, height*(0.5/6)+(id*60));
  this.color = color(colors[this.rand].x, colors[this.rand].y, colors[this.rand].z );
  this.dragged = false;
  this.isInside = true;

  this.run = function(){
    this.update();
    this.render();
  }
  this.update = function(){
    if(mouseIsPressed && collidePointCircle(mouseX, mouseY, this.loc.x, this.loc.y, 50)){
      dragged.push(id);
      this.dragged = true;
    }
    if(dragged.length > 0){
      full = true;
    }
    if(id == dragged[0] && mouseIsPressed && this.dragged){
      this.loc.x = mouseX;
      this.loc.y = mouseY;
    }
    if(!mouseIsPressed){
      dragged.splice(0, 1);
    }
    if(!collideRectCircle(width-230, 10, 200, height-20, this.loc.x, this.loc.y, 50)){
      this.isInside = false;
    }
  }
  this.render = function(){
    fill(this.color);
    ellipse(this.loc.x, this.loc.y, 50);
  }
}
