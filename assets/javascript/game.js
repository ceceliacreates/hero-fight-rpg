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
let currentDefender;
let playerSelected = false;
//select a character
//on click of class player
$(".player").on("click", function() {
  if (playerSelected == false) {
  //assigns character stats from object to currentPlayer
  currentPlayer = this.id;
//  switch (currentPlayer) {
 //   case wizard.name:
 //     currentPlayer = wizard;
 //     break;
  //  case knight.name:
  //    currentPlayer = knight;
  //    break;
  //  case monster.name:
  //    currentPlayer = monster;
  //    break;
  //  case rogue.name:
  //    currentPlayer = rogue;
 // }
  //moves selected character to player area
  let playerImage = $(`#${currentPlayer.name}`);
  $("#player").append(playerImage);
  //empties select a character div
  $("#choose").detach();
  //moves remaining characters to enemies to fight
  $("#enemies").append($("#characters"));
  //assigns enemy class to remaining characters
  $("#enemies img").removeClass("player").addClass("enemy");
  playerSelected = true;
}
});


//select a defender
$(".enemy").on("click", function() {
  currentDefender = this.id;
 // switch (currentDefender) {
   // case wizard.name:
     // currentDefender = wizard;
 //     break;
 //   case knight.name:
 //     currentDefender = knight;
   //   break;
 //   case monster.name:
   //   currentDefender = monster;
   //   break;
  //  case rogue.name:
  //    currentDefender = rogue;
  }
  //moves image of clicked character to defender div
  //let defenderImage = $(`#${currentDefender.name}`);
 // $("#defender").append(defenderImage);
  //doesn't allow other enemies to be selected once defender is in defender zone
 // defenderSelected = true;
//}
);

//attack button
//if no defender, displays message that a defender must be selected
//if defender, reduces defender health FIRST (player attack)
//then reduces player health (defender counter attack)
//displays message "You did ${damage} to ${defender}, reducing their health to ${defenderhealth}.
//They counter-attacked for ${damage} damage, reducing your health to ${playerhealth}.
//if playerHealth < 0, display lose message and display restart button
//if defender health < 0, remove defender image and allow new defender to be selected.
//increase playerattack by multiple of base attack

//if enemies zone is empty, win the game, display restart option
