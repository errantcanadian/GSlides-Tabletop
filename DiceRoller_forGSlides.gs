// This script creates a dice roller that is native to Slides so the app can be used as a virtual tabletop (VTT).

// I started from some of the code in a basic dice roller for interactive lessons and games developed by Alice Keeler <https://script.google.com/u/0/home/projects/1HuMPfc-sfehoZ06KFVI39J5dCr7kLAm7yxZyAc0tDw8NM1ER8FN8igMx/edit>.
// Inspired by Mike Shea (@SlyFlourish) talking about using Slides as a VTT alternative <https://twitter.com/SlyFlourish/status/1262912502679158786>.
// Any code or implementations in this script not owned by Google is licensed under the GPLv3 <https://www.gnu.org/licenses/gpl-3.0.html>.

function onOpen() {
  SlidesApp.getUi()
  .createMenu('Roll Dice')
  .addItem('Roll Dice', 'RollDice')
  .addItem('Roll d4', 'RollD4')
  .addItem('Roll d6', 'RollD6')
  .addItem('Roll d8', 'RollD8')
  .addItem('Roll d10', 'RollD10')
  .addItem('Roll d12', 'RollD12')
  .addItem('Roll d\%', 'RollD100')
  .addItem('Roll d20', 'RollD20')
  .addSubMenu(
    SlidesApp.getUi().createMenu('5e')
    .addItem('Roll d20', 'RollD20dnd')
    .addItem('Roll d20 with Advantage', 'RollD20Adv')
    .addItem('Roll d20 with Disadvantage', 'RollD20Dis')
    )
  .addItem('Roll 4dF (Fate/Fudge)', 'Roll4DF')
  .addSubMenu(
    SlidesApp.getUi().createMenu('Roll 2d6')
    .addItem('Powered by the Apocalypse', 'Roll2D6PBTA')
    .addItem('Traveller', 'Roll2D6Trav')
    //.addItem('Tunnel Goons', 'Roll2D6Goons')
    .addItem('WSCAOS', 'Roll2D6WSC')
    )
  .addSubMenu(
    SlidesApp.getUi().createMenu('Forged in the Dark')
    .addItem('Roll Fortune', 'RollFITDfort')
    .addItem('Roll Skill', 'RollFITDskill')
    .addItem('Roll Vice', 'RollFITDvice')
    .addItem('Roll Resistance', 'RollFITDresist')
    )
  .addToUi();
}

function getRndInt(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function RollDice(){
  var ui = SlidesApp.getUi();
  var qDiceIn = ui.prompt('Enter number of dice to roll.', ui.ButtonSet.OK_CANCEL);
  if (qDiceIn.getSelectedButton() == ui.Button.OK) {
    var numDice = Number(qDiceIn.getResponseText());
    Logger.log('The user rolled ' + numDice + ' dice');
  }
  else if (qDiceIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
    return;
  }
  else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
  return;
  }
  var qSizeIn = ui.prompt('Enter the die size.',ui.ButtonSet.OK_CANCEL);
  if (qSizeIn.getSelectedButton() == ui.Button.OK) {
    var sizeDice = Number(qSizeIn.getResponseText());
    Logger.log('The user rolled dice of d' + sizeDice + ' size.');
  }
  else if (qSizeIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
    return;
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
    return;
  }
  var qModIn = ui.prompt('Enter modifiers (leave blank if none).', ui.ButtonSet.OK_CANCEL);
  var modDice = Number();
  if (qModIn.getSelectedButton() == ui.Button.OK) {
    if (qModIn.getResponseText() == '') {
      modDice = 0;
    }
    else {
      modDice = Number(qModIn.getResponseText());
    }
    Logger.log('The user\'s roll is modified by ' + modDice);
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
    return;
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
    return;
  }
  var rollResult = Number();
  for (d=1; d<(numDice + 1); d++) {
    rollResult += getRndInt(1, sizeDice);
    Logger.log('Roll total at roll no. '+ d + " " + rollResult); 
  }
  rollResult += modDice;
  Logger.log('Final roll result with modifiers: %d', rollResult);
  ui.alert('Roll: ' + rollResult);
}

function RollDiceSpec(s) {
  var ui = SlidesApp.getUi();
  var rollResult = getRndInt(1,s);
  Logger.log('The user rolled a %s', rollResult);
  ui.alert('Roll: ' + rollResult);
}

function RollD4(){
  RollDiceSpec(4);
}

function RollD6(){
  RollDiceSpec(6);
}

function RollD8(){
  RollDiceSpec(8);
}

function RollD10(){
  RollDiceSpec(10);
}

function RollD12(){
  RollDiceSpec(12);
}

function RollD100(){
  RollDiceSpec(100);
}

function RollD20(){
  RollDiceSpec(20);
}

function RollD20Adv(){
  var ui = SlidesApp.getUi();
  var r1 = getRndInt(1,20);
  var r2 = getRndInt(1,20);
  var rollResult = Math.max(r1, r2);
  Logger.log('The user rolled ' + r1 + ' and ' + r2 + ' for a result of ' + rollResult);
  var qModIn = ui.prompt('Enter modifiers (leave blank if none).', ui.ButtonSet.OK_CANCEL);
  var modDice = Number();
  if (qModIn.getSelectedButton() == ui.Button.OK) {
    if (qModIn.getResponseText() == '') {
      modDice = 0;
    }
    else {
      modDice = Number(qModIn.getResponseText());
    }
    Logger.log('The user\'s roll is modified by ' + modDice);
    rollResult += modDice;
    Logger.log('The final roll was %d', rollResult)
    ui.alert('Roll: ' + rollResult + ' (' + r1 + ', ' + r2 + ')')
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function RollD20Dis(){
  var ui = SlidesApp.getUi();
  var r1 = getRndInt(1,20);
  var r2 = getRndInt(1,20);
  var rollResult = Math.min(r1, r2);
  Logger.log('The user rolled ' + r1 + ' and ' + r2 + ' for a result of ' + rollResult);
  var qModIn = ui.prompt('Enter modifiers (leave blank if none).', ui.ButtonSet.OK_CANCEL);
  var modDice = Number();
  if (qModIn.getSelectedButton() == ui.Button.OK) {
    if (qModIn.getResponseText() == '') {
      modDice = 0;
    }
    else {
      modDice = Number(qModIn.getResponseText());
    }
    Logger.log('The user\'s roll is modified by ' + modDice);
    rollResult += modDice;
    Logger.log('The final roll was %d', rollResult)
    ui.alert('Roll: ' + rollResult + ' (' + r1 + ', ' + r2 + ')')
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function FudgeConv(i) {
  if (i == -1){
    return '[–]';
  }
  else if (i == 0){
    return '[\ \ ]';
  }
  else if (i == 1){
    return '[+]';
  }
  else {
    return '';
  }
}

function FateLadder(i) {
  let fladder = new Array('Horrifying', 'Catastrophic', 'Terrible', 'Poor', 'Mediocre', 'Average', 'Fair', 'Good', 'Great', 'Superb', 'Fantastic', 'Epic', 'Legendary');
  if (i < -4) {
    i = -4;
  }
  else if (i > 8){
    i = 8;
  }
  i += 4;
  return fladder[i];
}

function pbtaMove(i){
  if (i < 7){
    return 'Failure or Hard GM Move.';
  }
  else if (i > 6 && i < 10){
    return 'Partial Success or Soft GM Move.';
  }
  else if (i > 9 && i < 12){
    return 'Complete Success.';
  }
  else if (i > 11){
    return 'Complete Success and possible Advanced Move.';
  }
  else {
    return 'Invalid input.';
  }
}

function Roll2D6PBTA(){
  var ui = SlidesApp.getUi();
  var r1 = getRndInt(1,6);
  var r2 = getRndInt(1,6);
  Logger.log('The user rolled ' + r1 + ' and ' + r2);
  var qModIn = ui.prompt('Enter modifiers (leave blank if none).', ui.ButtonSet.OK_CANCEL);
  var modDice = Number();
  if (qModIn.getSelectedButton() == ui.Button.OK) {
    if (qModIn.getResponseText() == '') {
      modDice = 0;
    }
    else {
      modDice = Number(qModIn.getResponseText());
    }
    Logger.log('The user\'s roll is modified by ' + modDice);
    rollResult = r1 + r2 + modDice;
    Logger.log('The final roll was %d', rollResult);
    ui.alert('The final roll was ' + rollResult + ' (' + pbtaMove(rollResult) + ')');
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function Roll4DF(){
  var ui = SlidesApp.getUi();
  var r1 = getRndInt(-1,1);
  var r2 = getRndInt(-1,1);
  var r3 = getRndInt(-1,1);
  var r4 = getRndInt(-1,1);
  Logger.log('User rolled ' + r1 + ', ' + r2 + ', ' + r3 + ', ' + r4);
  var rollResult = r1 + r2 + r3 + r4;
  var qModIn = ui.prompt('Enter modifiers (leave blank if none).', ui.ButtonSet.OK_CANCEL);
  var modDice = Number();
  if (qModIn.getSelectedButton() == ui.Button.OK) {
    if (qModIn.getResponseText() == '') {
      modDice = 0;
    }
    else {
      modDice = Number(qModIn.getResponseText());
    }
    Logger.log('The user\'s roll is modified by ' + modDice);
    rollResult += modDice;
    Logger.log('The final roll was %d', rollResult)
    ui.alert('Roll: ' + rollResult + ' ' + FudgeConv(r1) + ' ' + FudgeConv(r2) + ' ' + FudgeConv(r3) + ' ' + FudgeConv(r4) + ' ' + FateLadder(rollResult));
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
   Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function RollD20dnd(){
  var ui = SlidesApp.getUi();
  var rollResult = getRndInt(1,20);
  Logger.log('User rolled ' + rollResult);
  var qModIn = ui.prompt('Enter modifiers (leave blank if none).', ui.ButtonSet.OK_CANCEL);
  var modDice = Number();
  if (qModIn.getSelectedButton() == ui.Button.OK) {
    if (qModIn.getResponseText() == '') {
      modDice = 0;
    }
    else {
      modDice = Number(qModIn.getResponseText());
    }
    Logger.log('The user\'s roll is modified by ' + modDice);
    rollResult += modDice;
    ui.alert('Roll: ' + rollResult);
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function FITDinterpreter(rolls,type){
  Logger.log('Array to process: ' + rolls)
  if (type == 's') {
    if (rolls.filter(n => n == 6).length > 1) {
      Logger.log('Critical Success');
      return 'Critical Success!!';
      }
    else if (rolls.includes(6) == true) {
      Logger.log('Full Success');
      return 'Full Success!';
    }
    else if (rolls.includes(4) == true || rolls.includes(5) == true) {
      Logger.log('Partial Success');
      return 'Partial Success.';
    }
    else {
      Logger.log('Bad Outcome');
      return 'Bad Outcome.';
    }
  }
  else if (type == 'f') {
    if (rolls.filter(n => n == 6).length > 1) {
      Logger.log('Critical');
      return 'Exceptional Result!!';
    }
    else if (rolls.includes(6) == true) {
      Logger.log('Success');
      return 'Good Result!';
    }
    else if (rolls.includes(4) == true || rolls.includes(5) == true) {
      Logger.log('Partial');
      return 'Mixed Result.';
    }
    else {
      Logger.log('Bad');
      return 'Bad Result.';
    }
  }
}

function RollFITDskill(){
  var ui = SlidesApp.getUi();
  var qRating = ui.prompt('Enter skill rating:', ui.ButtonSet.OK_CANCEL);
  if (qRating.getSelectedButton() == ui.Button.OK) {
    var dice = Number(qRating.getResponseText());
    if (dice == '') { dice = 0; }
    Logger.log('User has skill rating ' + dice);
    let rollResult = new Array();
      var qBonus = ui.prompt('Enter bonus dice:', ui.ButtonSet.OK_CANCEL);
      if (qBonus.getSelectedButton() == ui.Button.OK) {
        var bonus = Number(qBonus.getResponseText());
        if (bonus == '') { bonus = 0; }
        Logger.log('User adds ' + bonus + ' bonus dice.');
        dice += bonus;
        Logger.log('User rolling ' + dice + ' dice.');
        if (dice == 0) {
          var r1 = getRndInt(1,6);
          Logger.log('Rolled a ' + r1);
          var r2 = getRndInt(1,6);
          Logger.log('Rolled a ' + r2);
          rollResult.push(r1,r2);
          let rollLower = new Array();
          rollLower.push(Math.min(r1,r2));
          Logger.log('Zero-rated: taking the lowest of ' + rollResult + ' — ' + rollLower);
          ui.alert('Roll (zero dice — take the lowest): ' + rollResult + ' — ' + FITDinterpreter(rollLower,'s'));
        }
        else {
          for (d=1; d<dice+1; d++){
            var roll = getRndInt(1,6);
            Logger.log('Rolled a ' + roll);
            rollResult.push(roll);
          }
          Logger.log('Final roll: ' + rollResult);
          ui.alert('Roll: ' + rollResult + ' — ' + FITDinterpreter(rollResult, 's'));
        }
      }
      else if (qBonus.getSelectedButton() == ui.Button.CANCEL) {
        Logger.log('The user cancelled the roll.');
        return
      }
      else {
        Logger.log('The user clicked the close button in the dialog\'s title bar.');
        return
      }
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
    return
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
    return
  }
}

function RollFITDfort(){
  var ui = SlidesApp.getUi();
  var qRating = ui.prompt('Enter number of dice:', ui.ButtonSet.OK_CANCEL);
  if (qRating.getSelectedButton() == ui.Button.OK) {
    var dice = Number(qRating.getResponseText());
    if (dice == '') { dice = 0; }
    let rollResult = new Array();
    Logger.log('User rolling ' + dice + ' fortune dice.');
    if (dice == 0) {
      var r1 = getRndInt(1,6);
      Logger.log('Rolled a ' + r1);
      var r2 = getRndInt(1,6);
      Logger.log('Rolled a ' + r2);
      rollResult.push(r1,r2);
      let rollLower = new Array();
      rollLower.push(Math.min(r1,r2));
      Logger.log('Zero-rated: taking the lowest of ' + rollResult + ' — ' + rollLower);
      ui.alert('Roll (zero dice — take the lowest): ' + rollResult + ' — ' + FITDinterpreter(rollLower,'f'));
    }
    else {
      for (d=1; d<dice+1; d++){
        var roll = getRndInt(1,6);
        Logger.log('Rolled a ' + roll);
        rollResult.push(roll);
      }
      Logger.log('Final roll: ' + rollResult);
      ui.alert('Roll: ' + rollResult + ' — ' + FITDinterpreter(rollResult,'f'));
    }
  }
  else if (qBonus.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
    return
  }
  else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
    return
  }
}

function RollFITDvice(){
  var ui = SlidesApp.getUi();
  var qStress = ui.prompt('How much stress do you currently have?', ui.ButtonSet.OK_CANCEL);
  if (qStress.getSelectedButton() == ui.Button.OK){
    var stress = Number(qStress.getResponseText());
    Logger.log('Character has ' + stress + ' stress.');
    var qRating = ui.prompt('Enter lowest Attribute rating:', ui.ButtonSet.OK_CANCEL);
    if (qRating.getSelectedButton() == ui.Button.OK) {
      var dice = Number(qRating.getResponseText());
      if (dice == '') { dice = 0; }
      let rollArr = new Array();
      var roll = Number();
      Logger.log('User rolling ' + dice + ' indulgence dice.');
      if (dice == 0) {
        var r1 = getRndInt(1,6);
        Logger.log('Rolled a ' + r1);
        var r2 = getRndInt(1,6);
        Logger.log('Rolled a ' + r2);
        rollArr.push(r1,r2);
        roll = Math.min(r1, r2);
        Logger.log('Zero-rated: taking the lowest of ' + rollArr + ' — ' + roll);
        if (roll > stress){
          Logger.log('Roll ' + roll + ' greater than stress ' + stress + '. Overindulged.');
          ui.alert('Roll: ' + rollArr + '\nResult: Overindulged! Clear all stress, but make a Bad Decision.');
        }
        else {
          Logger.log('Roll ' + roll + ' clears stress.');
          ui.alert('Roll: ' + rollArr + '\nResult: Clear ' + roll + ' stress.');
        }
      }
      else {
        for (d=1; d<dice+1; d++){
          var r = getRndInt(1,6);
          Logger.log('Rolled a ' + r);
          rollArr.push(r);
        }
        roll = Math.max(...rollArr);
        if (roll > stress){
          Logger.log('Roll ' + roll + ' greater than stress ' + stress + '. Overindulged.');
          ui.alert('Roll: ' + rollArr + '\nResult: Overindulged! Clear all stress, but make a Bad Decision.');
        }
        else {
          Logger.log('Roll ' + roll + ' clears stress.');
          ui.alert('Roll: ' + rollArr + '\nResult: Clear ' + roll + ' stress.');
        }
      }
    }
    else if (qRating.getSelectedButton() == ui.Button.OK) {
      Logger.log('User cancelled the roll');
      return;
    }
    else {
      Logger.log('User closed the prompt.');
      return;
    }
  }
  else if (qStress.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
    return;
  }
  else {
    Logger.log('The user closed the prompt.');
    return;
  }
}

function RollFITDresist(){
  var ui = SlidesApp.getUi();
  var qResist = ui.prompt('Enter the rating of the Attribute you are resisting with:', ui.ButtonSet.OK_CANCEL);
  if (qResist.getSelectedButton() == ui.Button.OK) {
    var dice = Number();
    if (qResist.getResponseText() == '') {
      dice = 0
    }
    else {
      dice = Number(qResist.getResponseText());
    }
    Logger.log(`Character rolls ${dice} dice.`);
    var r = Number();
    let rollArr = new Array();
    var stress = Number();
    if (dice == 0) {
      var r1 = getRndInt(1,6);
      rollArr.push(r1);
      Logger.log(`Rolled a ${r1}`);
      var r2 = getRndInt(1,6);
      rollArr.push(r2);
      Logger.log(`Rolled a ${r2}`);
      var rollLower = Math.min(r1, r2);
      Logger.log(`Zero dice: taking the lower of ${rollArr}: ${rollLower}`)
      stress = 6 - rollLower;
      ui.alert(`Roll (zero dice — take the lowest): ${rollArr}\nConsequence resisted.\nTake ${stress} stress.`);
    }
    else {
      for (d=1; d<dice+1; d++){
      r = getRndInt(1,6);
      Logger.log(`Rolled a ${r}.`);
      rollArr.push(r);
      }
      if (rollArr.filter(n => n == 6).length >1){
        Logger.log('Critical success');
        ui.alert(`Roll: ${rollArr} (Critical!!)\nConsequence resisted. Clear 1 stress.`);
      }
      else {
        stress = 6 - Math.max(...rollArr);
        Logger.log(`Character takes ${stress} stress.`);
        ui.alert(`Roll: ${rollArr}\nConsequence resisted.\nTake ${stress} stress.`);
      }
    }
  }
  else if (qResist.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
    return;
  }
  else {
    Logger.log('The user closed the prompt.');
    return;
  }
}

function Roll2D6WSC(){
  var ui = SlidesApp.getUi();
  var roll = getRndInt(1,6) + getRndInt(1,6);
  Logger.log(`User rolled ${roll}.`);
  var adv = ui.prompt('How many advantages do you have?', ui.ButtonSet.OK_CANCEL);
  if (adv.getSelectedButton() == ui.Button.OK) {
    var nadv = Number()
    if (adv.getResponseText() == '') {
      nadv = 0
    }
    else {
      nadv = Number(adv.getResponseText());
    }
    Logger.log(`Character has ${nadv} advantages.`);
  }
  else {
    Logger.log('User cancelled the roll.');
    return;
  }
  var dis = ui.prompt('How many disadvantages do you have?', ui.ButtonSet.OK_CANCEL);
  if (dis.getSelectedButton() == ui.Button.OK) {
    var ndis = Number()
    if (dis.getResponseText() == '') {
      ndis = 0
    }
    else {
      ndis = Number(dis.getResponseText());
    }
    Logger.log(`Character has ${ndis} advantages.`);
  }
  else {
    Logger.log('User cancelled the roll.');
    return;
  }
  var rollResult = roll + nadv - ndis;
  Logger.log(`Final roll: ${rollResult}.`);
  var outcome = String();
  if (rollResult > 7) {
    outcome = 'Success!';
  }
  else {
    outcome = 'Failure!';
  }
  Logger.log(`Roll was a ${outcome}.`)
  ui.alert(`Roll: ${rollResult} (${roll} + ${nadv} - ${ndis}) — ${outcome}`);
}

function Roll2D6Trav() {
  var ui = SlidesApp.getUi();
  var roll = getRndInt(1,6) + getRndInt(1,6);
  var rollResult = roll;
  var skillR = 0;
  var diceMod = 0;
  var charMod = 0;
  var diff = 8;
  Logger.log(`User rolled ${roll}.`);
  var attrib = ui.prompt('Enter your rank in the relevant characteristic:', ui.ButtonSet.OK_CANCEL);
  if (attrib.getSelectedButton() == ui.Button.OK) {
    var nAttrib = Number()
    if (attrib.getResponseText() == '') {
      nAttrib = 0;
    }
    else {
      nAttrib = Number(attrib.getResponseText());
    }
    Logger.log(`Character has ${nAttrib} rank in attribute.`);
    if (nAttrib == 0) {charMod = -3;}
    else if (nAttrib <= 2) {charMod = -2;}
    else if (nAttrib <= 5) {charMod = -1;}
    else if (nAttrib <= 8) {charMod = 0;}
    else if (nAttrib <= 11) {charMod = 1;}
    else if (nAttrib <=14) {charMod = 2;}
    else if (nAttrib >=15) {charMod = 3;}
    Logger.log(`Characteristic modifier: ${charMod}.`);
  }
  else {
    Logger.log('User cancelled the roll.');
    return;
  }
  var qSkill = ui.alert('Is this a skill check?', ui.ButtonSet.YES_NO);
  if (qSkill == ui.Button.YES) {
    var qSkillR = ui.prompt('Enter your level in the relevant skill (leave blank for None)', ui.ButtonSet.OK_CANCEL);
    if (qSkillR.getSelectedButton() == ui.Button.OK) {
      skillR = Number(qSkillR.getResponseText());
      if (isNaN(skillR) == true || qSkillR.getResponseText() == '') {skillR = -3;}
      Logger.log(`Character has ${skillR} DM from skill.`);
    }
    else {
      Logger.log('User cancelled the roll.');
      return;
    }
  }
  else if (qSkill == ui.Button.NO) {
    Logger.log('Not a skill check.');
  }
  else {
    Logger.log('User cancelled the roll.');
    return;
  }
  var qDM = ui.prompt('Enter any other dice modifiers (leave blank for none).', ui.ButtonSet.OK_CANCEL);
  if (qDM.getSelectedButton() == ui.Button.OK) {
    if (qDM.getResponseText() == '' || isNaN(Number(qDM.getResponseText())) == true) {
      diceMod = 0;
    }
    else {
      diceMod = Number(qDM.getResponseText());
    }
    Logger.log(`Dice modifier = ${diceMod}.`);
  }
  else {
    Logger.log('User cancelled the roll.');
    return;
  }
  var qDiff = ui.prompt('What is the difficulty of the check? (Leave blank for Average 8+)', ui.ButtonSet.OK_CANCEL);
  if (qDiff.getSelectedButton() == ui.Button.OK) {
    diff = Number(qDiff.getResponseText());
    if (isNaN(diff) == true || qDiff.getResponseText() == '') {diff = 8;}
    Logger.log(`Check difficulty: ${diff}.`)
  }
  else {
    Logger.log('User cancelled the roll.');
    return;
  }
  rollResult = roll + charMod + skillR + diceMod;
  Logger.log(`Roll result was ${rollResult}.`);
  if (rollResult >= diff) {
    Logger.log('Check succeeds');
    ui.alert(`Roll: ${rollResult} (${roll} + ${charMod} + ${skillR} + ${diceMod}) — Success!`);   
  }
  else {
    Logger.log('Check fails');
    ui.alert(`Roll: ${rollResult} (${roll} + ${charMod} + ${skillR} + ${diceMod}) — Failure!`);
  }
}

// function Roll2D6Goons(){

// }
