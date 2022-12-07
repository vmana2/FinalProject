// This project was meant to represent basic RPG elements.
// Everything you see on the screen except for font was created by Vincent Manara Jr.

let health = 1500
let playerChances = ['critical', 'normal']
let monsterHealth = 1500
let monsterChoices = ['critical', 'normal', 'defense']
let playerDmg = 50
let monsterDmg = 50
let levelUp = 0
let playerTurn = true
let monsterTurn = false
var back
var player
var monster
var arrow
var sword

// Loads all of the images and font
function preload(){
  back = loadImage('background.gif')
  player = loadImage('player.gif')
  monster = loadImage('monster.gif')
  arrow = loadImage('arrow.gif')
  sword = loadImage('sword.gif')
  font = loadFont('font.otf')
}

function setup() {
  createCanvas(700, 700);
  frameRate(60)
  imageMode(CENTER)
}

// Controls how much damage the player will do each time.
function attack(){
  playerRoll = random(playerChances)
  if (playerRoll == 'critical' && monsterHealth > 0) {
    monsterHealth = monsterHealth - (playerDmg  + 50)
    print('Player Critical')
  } if (playerRoll == 'normal' && monsterHealth > 0) {
    monsterHealth = monsterHealth - playerDmg
    print('Player Normal')
  }
}
// Controls how much damage reduction you have
function defense(){
  monsterHealth = monsterHealth
  health = health - monsterDmg/2
}

// Controls which character gets to go
function turn(character){
  if (character == false){
    character = true
    return character
  } if (character == true){
    character = false
    return character
  }
}

// Controls whether or not the player wins / loses.
function gameplay(){
    if (health > 0){
      if (playerTurn == true) {
        if (mouseY > 0 && mouseY < 350){
          attack()
          playerTurn = false
          monsterTurn = true
          }
    if (mouseY > 350) {
      defense()
      playerTurn = false
      monsterTurn = true
      print('Player Defense')
      }
    }
  }
  if (monsterTurn == true && health >= 0){
  let AI = random(monsterChoices)
  if (monsterHealth > 0){
    if (AI == 'critical') {
    health = health - (monsterDmg + 40)
    playerTurn = true
    monsterTurn = false
    print('Monster Critical')
    }
  if (AI == 'normal'){
    health = health - monsterDmg
    playerTurn = true
    monsterTurn = false
    print('Monster Normal')
    }
  if (AI == 'defense') {
    health = health
    playerTurn = true
    monsterTurn = false
    print('Defense')
    }
  }
  if (monsterHealth <= 0) {
    text("PLAYER WINS.", 500, 500)
    }
  }
}


function draw() {
  textAlign(CENTER)
  textFont(font)
  textSize(40)
  fill(255)
  stroke(0)
  strokeWeight(10)
  background(225);
  image(back, 350, 350)
  image(arrow, 350, 550)
  image(player, 350, 550)
  image(monster, 350, 300)
  image(sword, 350, 300)
  text('ENEMY HP: ' + str(monsterHealth), 350, 50)
  textSize(30)
  text('HP: ' + str(health), 350, 690)
  for (let i = 50; i < 100; i++){
    textSize(i)
  }
  if (monsterHealth <= 0){
    text('PLAYER WINS', 350, 350)
  } if (health <= 0){
    text('YOU LOSE.', 350, 350)
  }
}

// Sword animation plays and arrows pause
function mousePressed(){
  sword.play()
  arrow.pause()
}

// Gameplay is activated, sword animation pauses and arrow plays.
function mouseReleased(){
  gameplay()
  sword.pause()
  arrow.play()
}