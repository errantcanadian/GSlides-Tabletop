// With some code from Alice Keeler https://script.google.com/u/0/home/projects/1HuMPfc-sfehoZ06KFVI39J5dCr7kLAm7yxZyAc0tDw8NM1ER8FN8igMx/edit
// The hope is to make a dice roller that is native to Slides so it can be used more easily as a virtual tabletop.
// Inspired by Mike Shea (@SlyFlourish) talking about using Slides as a VTT alternative for those who aren't so bothered about tactical grids.

function onOpen() {
  SlidesApp.getUi()
  .createMenu('Roll Dice')
  .addItem('Roll Dice', 'RollDice')
  .addItem('Roll with Advantage', 'RollDiceAdv')
  .addItem('Roll with Disadvantage', 'RollDiceDis')
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