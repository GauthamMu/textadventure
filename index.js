class Room {
  constructor(classFunction, options) {
    this.classFunction = classFunction;
    this.options = options;
  }
}

function startFunction(option = "", isArrival = true) {}

const startObject = new Room(startFunction(), ["cave", "flashlight"]);

let gameField, inputField;

addEventListener("DOMContentLoaded", (event) => {
  gameField = document.getElementById("game-field");
  inputField = document.getElementById("input-field");
});

let currentLocation = startObject;

function gameLoop() {
  let inputValue = inputField.value.toLowerCase();

  if (!currentLocation.options.includes(inputValue)) {
    gameField.innerHTML += `<br><br>Supplied option "${inputValue}" invalid.`;
    inputField.value = "";
  } else {
    currentLocation.classFunction(inputValue);
  }
}
