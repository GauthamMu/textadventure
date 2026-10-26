class Room {
  constructor(classFunction) {
    this.classFunction = classFunction;
  }
}

function startFunction(isDeparture = true) {}

const startObject = new Room(startFunction());

let gameField, inputField;

addEventListener("DOMContentLoaded", (event) => {
  gameField = document.getElementById("game-field");
  inputField = document.getElementById("input-field");
});

let options = ["cave", "flashlight"];
let currentLocation = startObject;

function gameLoop() {}
