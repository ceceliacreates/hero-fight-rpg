//declare character objects
const wizard = {
  name: "wizard",
  health: 100,
  attack: 10,
  counterAttack: 20
};

const knight = {
  name: "knight",
  health: 75,
  attack: 8,
  counterAttack: 30
};

const monster = {
  name: "monster",
  health: 50,
  attack: 15,
  counterAttack: 10
};

const rogue = {
  name: "rogue",
  health: 40,
  attack: 30,
  counterAttack: 15
};
let currentPlayer;
let currentPlayerHealth;
let currentPlayerAttack;
let currentPlayerAttackBase;
let currentPlayerCounter;
let currentDefender;
let currentDefenderHealth;
let currentDefenderAttack;
let currentDefenderCounter;
let playerSelected = false;
let defenderSelected = false;
let enemiesDefeated = 0;
//select a character
//on click of class player
$(".character").on("click", function() {
  if (playerSelected == false) {
    //assigns character stats from object to currentPlayer
    currentPlayer = this.id;
    switch (currentPlayer) {
      case wizard.name:
        currentPlayer = wizard;
        break;
      case knight.name:
        currentPlayer = knight;
        break;
      case monster.name:
        currentPlayer = monster;
        break;
      case rogue.name:
        currentPlayer = rogue;
    }
    //moves selected character to player area
    let playerImage = $(`#${currentPlayer.name}`);
    $("#player").append(playerImage);
    playerImage.removeClass("character").addClass("player");
    //empties select a character div
    $("#choose").empty()
    //assigns enemy class to remaining characters
    $(".character").addClass("enemy");
    //moves remaining characters to enemies to fight
    $("#enemies").append($(".enemy"));
    playerSelected = true;
    //sets current player stats
    currentPlayerHealth = currentPlayer.health;
    currentPlayerAttack = currentPlayer.attack;
    currentPlayerCounter = currentPlayer.counterAttack;
    currentPlayerAttackBase = currentPlayer.attack;
  
  }
});

//select a defender
$("#enemies").on("click", ".enemy", function() {
  currentDefender = this.id;
  switch (currentDefender) {
    case wizard.name:
      currentDefender = wizard;
      break;
    case knight.name:
      currentDefender = knight;
      break;
    case monster.name:
      currentDefender = monster;
      break;
    case rogue.name:
      currentDefender = rogue;
  }
  // moves image of clicked character to defender div
  let defenderImage = $(`#${currentDefender.name}`);
  $("#defender").append(defenderImage);
  //empties info from previous fight
  $("#fight").empty();
  // doesn't allow other enemies to be selected once defender is in defender zone
  defenderSelected = true;
  //sets defender stats
  currentDefenderHealth = currentDefender.health;
  currentDefenderAttack = currentDefender.attack;
  currentDefenderCounter = currentDefender.counterAttack;
});

//attack button
$("#attack").on("click", function() {
  //if no defender, displays message that a defender must be selected
  if (defenderSelected === false) {
    $("#fight").html("<p>Select a defender to attack!</p>");
  } else {
    //if defender, reduces defender health FIRST (player attack)
    currentDefenderHealth = currentDefenderHealth - currentPlayerAttack;
    //increase playerattack by multiple of base attack
    currentPlayerAttack = currentPlayerAttack + currentPlayerAttackBase;
    //check if defender was defeated
    //if defender health < 1, remove defender image and allow new defender to be selected.
    if (currentDefenderHealth < 1) {
      if (enemiesDefeated === 2) {
        $("#defender").html("<h2>Defender</h2>");
        $("#fight").html("<p>You won! Refresh for a new game!</p>");
      }
      else {
      enemiesDefeated ++;
      defenderSelected = false;
      $("#defender").html("<h2>Defender</h2>");
      $("#fight").html(
        `<p>The ${currentDefender.name} was defeated! Select a new defender!</p>`
      );
      }
    } else {
      //reduce player health (defender counter attack)
      currentPlayerHealth = currentPlayerHealth - currentDefenderCounter;
      //check if current player was defeated
      //if playerHealth < 1, display lose message and display restart button
      if (currentPlayerHealth < 1) {
        $("#attack").attr("disabled", true);
        $("#fight").html(
          `<p>You have been defeated! Refesh to try again!`
        );
      }
      //displays message "You did ${damage} to ${defender}, reducing their health to ${defenderhealth}.
      //They counter-attacked for ${damage} damage, reducing your health to ${playerhealth}.
      else {
        $("#fight").html(
          `You did ${currentPlayerAttack} damage to the ${currentDefender.name}, who responded by attacking you for ${currentDefenderCounter} damage. Your health is now ${currentPlayerHealth}. Defender's health is now ${currentDefenderHealth}. Click Attack to attack again!`
        );
      }
    }
  }

 });

