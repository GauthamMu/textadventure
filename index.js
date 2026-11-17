let gameField, inputField, flashlight, booklet;
// Variable for use in the Room classFunctions
let gameFieldText = "";
// Page of booklet, 0 indexed
let bookletPage = 0;

let startRoom, caveEntranceRoom, gameOverRoom, bookletRoom, winRoom;

class Room {
  constructor(classFunction, options) {
    this.classFunction = classFunction;
    this.options = options;
  }
}

function startFunction(option = "") {
  switch (option) {
    case "west":
    case "north":
      gameFieldText = winFunction(option);
      break;
    case "east":
      gameFieldText = gameOverFunction("wolf");
      break;
    case "cave":
      gameFieldText = caveEntranceFunction("cave");
      break;
    case "flashlight":
      flashlight = true;
      gameFieldText = `Shaking from frostbite, you flip the switch on the rustic torch you inherited from your great-great-grandfather, 
          <br>who passed away while working on a railway tunnel about a century ago. Or was it two centuries?
          <br>The light flickers.
          <br>You can now see that there are partings between the trees in the West, in the North, and in the East.
          <br><br>Options: [west, north, east, cave]`;
      break;
    case "out":
      currentLocation = startRoom;
      if (flashlight) {
        gameFieldText = `You are now back where you started, in a dark forest.
          <br>You see light coming out of a cave.
          <br>You also see that there are partings between the trees in the West, in the North, and in the East.
          <br><br>Options: [west, north, east, cave]`;
      } else {
        gameFieldText = `You are now back where you started, in a dark forest.
          <br>You see light coming out of a cave.
          <br>Because it's so cold, you put your hands in your pockets.
          <br>You find a flashlight.
          <br><br>Options: [cave, flashlight]`;
      }
      break;
    default:
      gameFieldText = `You are in a dark forest.
          <br>You see light coming out of a cave.
          <br>Because it's so cold, you put your hands in your pockets.
          <br>You find a flashlight.
          <br><br>Options: [cave, flashlight]`;
  }
  return gameFieldText;
}

function caveEntranceFunction(option = "") {
  switch (option) {
    case "out":
      gameFieldText = startFunction("out");
      break;
    case "flashlight":
      flashlight = true;
      gameFieldText = `Despite you being in a rather cozy cave you shake from frostbite when you flip the switch on the rustic torch you inherited from your great-great-grandfather, 
          <br>who passed away while working on a railway tunnel about a century ago. Or was it two centuries?
          <br>The light flickers.
          <br>You can now make out bits of the title of the booklet:
          <br>"T.e f..l.ng .ra.n."
          <br><br>Options: [out, booklet, candle]`;
      break;
    case "booklet":
      booklet = true;
      if (flashlight) {
        gameFieldText = `You reach your hand out to the cold leather shell of the booklet.
          <br>It feels weighty in your hands.
          <br>In the light of your flashlight, you now make out the entirety of the booklets' title:
          <br>"The failing brain."
          <br><br>Options: [out, candle, open]`;
      } else {
        gameFieldText = `You reach your hand out to the cold leather shell of the booklet.
          <br>It feels weighty in your hands.
          <br>In the faint light of the candle on the ground, you now make out the entirety of the bookets' title:
          <br>"The failing brain."
          <br><br>Options: [out, candle, flashlight, open]`;
      }
      break;
    case "candle":
      gameFieldText = gameOverFunction("candle");
      break;
    case "cave":
      currentLocation = caveEntranceRoom;
      if (flashlight) {
        gameFieldText = `Flashlight in hand, you walk into the entrance area of the cave.
          <br>The faint shimmer comes from a little tea candle, someone must've lit it ahead of time.
          <br>Next to it lies a booklet. You can only make out bits of its title from where you're standing,
          <br>"T.e f..l.ng .ra.n."
          <br><br>Options: [out, booklet, candle]`;
      } else {
        gameFieldText = `You walk into the entrance area of the cave.
          <br>The faint shimmer comes from a little tea candle, someone must've lit it ahead of time.
          <br>Next to it lies a booklet. You can't make out its title, the tea light is too dim.
          <br><br>Options: [out, booklet, candle, flashlight]`;
      }
      break;
    default:
      gameFieldText = caveEntranceFunction("cave");
  }
  return gameFieldText;
}

function gameOverFunction(option = "") {
  switch (option) {
    case "restart":
      location.reload();
      break;
    case "candle":
      currentLocation = gameOverRoom;
      gameFieldText = `You walk up to the tea candle, and pick it up.
        <br>But then, you freeze in place, just like if Medusa looked you straight in the eyes!
        <br>Horror washes over you as you are, slowly but surely, engulfed in flames.
        <br><br><b>GAME OVER</b>
        <br><br>Options: [restart]`;
      break;
    case "wolf":
      currentLocation = gameOverRoom;
      gameFieldText = `You take the eastern parting. The trees thin out, and something in the undergrowth stands up on two legs — or maybe four, it happens too fast.
        <br>There's a flash of red, and a voice you almost recognise from the booklet: "I told you not to come."
        <br><br><b>GAME OVER</b>
        <br><br>Options: [restart]`;
      break;
  }
  return gameFieldText;
}

function winFunction(option = "") {
  switch (option) {
    case "restart":
      location.reload();
      break;
    case "west":
      currentLocation = winRoom;
      gameFieldText = `You head west. The trees give way to an old embankment, and beyond it, a lit window in a station house.
        <br>You don't look back at the cave.
        <br><br><b>You made it out.</b>
        <br><br>Options: [restart]`;
      break;
    case "north":
      currentLocation = winRoom;
      gameFieldText = `You head north. The cold thins, and the sound of a railway line carries over the ridge — a train, right on time, with room in every carriage.
        <br>Whatever was in the booklet stays in the booklet.
        <br><br><b>You made it out.</b>
        <br><br>Options: [restart]`;
      break;
  }
  return gameFieldText;
}

function openBooklet(option = "") {
  if (option === "turn") {
    bookletPage++;
  } else if (option === "close") {
    bookletPage = 0;
    currentLocation = previousLocation;
    gameFieldText = currentLocation.classFunction();
    return gameFieldText;
  }

  switch (bookletPage) {
    case 0:
      gameFieldText = `With shaking hands, you lift the leather-bound hardcover — and are immediately blown away.
        <br>The handwriting is extremely intricate, like if the author – or authoress – had robbed a thousand hens of their feathers before picking the best one.
        <br>The text goes as follows:
        <br><i>Dear urban exploration
        <br>
        <br>This might be the last time I, Elizabeth W, ever use my hand again.
        <br>I have barricaded the door for now, but it sounds like a werewolf is scratching against the heavy timber door
            with the stolen strength of all of its past victims.
        <br>I might have to open this door, lest he breaks it and enters with full force, killing me in the process.
        <br>
        <br>But let me introduce myself first. I am Elizabeth from Leicester. I like trains.
        <br>OH SHIT THE WOLF'S INSID-</i>
        <br>The rest of the page is filled with splattered ink and blood.
        <br><br>Options: [turn, close]`;
      break;
    case 1:
      gameFieldText = `The horror of the first page having embedded itself in your veins and bones simultaneously,
            you turn the page.
        <br>The intricate handwriting of the first page has given way to a messy, perhaps frantic, scribble.
        <br>With the drastic change in text size, a lot less text fits on this page compared to the last:
        <br><i style="font-size: 2rem">OMG THIS HURTSSSSSS
        <br>I'M LITERALLY BEING RIPPED APART!!!!!</i>
        <br>This page, analogue to the last one, is footed by bloody spots.
        <br><br>Options: [turn, close]`;
      break;
    case 2:
      gameFieldText = `A third page, stuck to the second with something dark and tacky.
        <br>The handwriting has steadied again — careful, almost polite, like someone copying a letter they memorised:
        <br><i>Folk around here call me Red Wolf. The name fits the coat and the temper.
        <br>The men who drove the railway through these woods used to leave candles in the cave mouths so their children could find their way home after dark. I've been following one of those candles for years.
        <br>I'm headed east, through the last parting in the trees. Come that way only if you're tired of having a tomorrow.
        <br>— R.W.</i>
        <br><br>Options: [close]`;
      break;
  }
  return gameFieldText;
}

function startOptions() {
  if (flashlight) {
    return ["west", "north", "east", "cave"];
  } else {
    return ["cave", "flashlight"];
  }
}

function caveEntranceOptions() {
  if (flashlight) {
    if (booklet) {
      return ["out", "candle", "open"];
    } else {
      return ["out", "booklet", "candle"];
    }
  } else {
    if (booklet) {
      return ["out", "candle", "flashlight", "open"];
    } else {
      return ["out", "booklet", "candle", "flashlight"];
    }
  }
}

function bookletOptions() {
  if (bookletPage < 2) {
    return ["turn", "close"];
  } else {
    return ["close"];
  }
}

function gameOverOptions() {
  return ["restart"];
}

function winOptions() {
  return ["restart"];
}

startRoom = new Room(startFunction, startOptions);

caveEntranceRoom = new Room(caveEntranceFunction, caveEntranceOptions);

gameOverRoom = new Room(gameOverFunction, gameOverOptions);

bookletRoom = new Room(openBooklet, bookletOptions);

winRoom = new Room(winFunction, winOptions);

addEventListener("DOMContentLoaded", (event) => {
  gameField = document.getElementById("game-field");
  inputField = document.getElementById("input-field");
});

let currentLocation = startRoom;
//There's no prev location yet, so just setting it to startRoom too
let previousLocation = startRoom;

function gameLoop() {
  let inputValue = inputField.value.toLowerCase().trim();
  // If you entered nothing; likely a missclick
  if (inputValue == "") {
    return;
    // If you entered something not in the Options of your current room
  } else {
    inputField.value = "";
    if (!currentLocation.options().includes(inputValue)) {
      gameField.innerHTML += `<br><br>Supplied option "${inputValue}" invalid.`;
    } else {
      // If booklet is opened
      if (inputValue == "open") {
        previousLocation = currentLocation;
        currentLocation = bookletRoom;
        gameFieldText = openBooklet();
      } else {
        gameFieldText = currentLocation.classFunction(inputValue);
      }

      gameField.innerHTML = gameFieldText;
    }
  }
}
