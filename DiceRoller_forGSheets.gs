// With some code from Alice Keeler https://script.google.com/u/0/home/projects/1HuMPfc-sfehoZ06KFVI39J5dCr7kLAm7yxZyAc0tDw8NM1ER8FN8igMx/edit
// The hope is to make a dice roller that is native to Slides so it can be used as a virtual tabletop.
// Inspired by Mike Shea (@SlyFlourish) talking about using Slides as a VTT alternative for those who aren't so bothered about tactical grids.

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
  .addItem('Roll d20 with Advantage', 'RollD20Adv')
  .addItem('Roll d20 with Disadvantage', 'RollD20Dis')
  .addItem('Roll 4dF (Fate/Fudge)', 'Roll4DF')
  .addItem('Roll 2d6 (PBtA)', 'Roll2D6')
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
  }
  else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
  var qSizeIn = ui.prompt('Enter the die size.',ui.ButtonSet.OK_CANCEL);
  if (qSizeIn.getSelectedButton() == ui.Button.OK) {
    var sizeDice = Number(qSizeIn.getResponseText());
    Logger.log('The user rolled dice of d' + sizeDice + ' size.');
  }
  else if (qSizeIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
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
  }
  else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
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
  Logger.log('The user rolled a %d', rollResult);
  ui.alert('Roll: ' + rollResult)
}

function RollD20Dis(){
  var ui = SlidesApp.getUi();
  var r1 = getRndInt(1,20);
  var r2 = getRndInt(1,20);
  var rollResult = Math.min(r1, r2);
  Logger.log('The user rolled a %d', rollResult);
  ui.alert('Roll: ' + rollResult)
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
  else if (i > 9 && i < 13){
    return 'Complete Success.';
  }
  else if (i > 11){
    return 'Complete Success and possible Advanced Move.';
  }
  else {
    return 'Invalid input.';
  }
}

function Roll2D6(){
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
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
  rollResult = r1 + r2 + modDice;
  Logger.log('The final roll was %d', rollResult);
  var outMessage = 'The final roll was ' + rollResult + ' ';
  outMessage += pbtaMove(rollResult);
  ui.alert(outMessage);
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
  }
  else if (qModIn.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user cancelled the roll.');
  }
  else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
  rollResult += modDice;
  Logger.log('The final roll was %d', rollResult)
  ui.alert('Roll: ' + rollResult + ' ' + FudgeConv(r1) + ' ' + FudgeConv(r2) + ' ' + FudgeConv(r3) + ' ' + FudgeConv(r4) + ' ' + FateLadder(rollResult));
