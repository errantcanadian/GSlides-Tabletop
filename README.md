# GSlides-Tabletop
Tools for using Google Slides as a Virtual Tabletop for D&amp;D and other roleplaying games
## How to use
Create a file in Google Slides. Create your virtual tabletop space by importing and drawing tokens and maps and other aids, just as you would in Roll20 or similar.

Go to Tools > Script editor. In `Code.gs`, paste the contents of `DiceRoller_forGSheets.gs`. Refresh your Google Slide file. A new menu called Roll Dice should appear.

To roll dice, go to Roll Dice > Roll Dice (rolling with 5e dis/advantage not yet supported). Dialogue boxes will prompt for the number of dice to roll, the die size, and any modifiers. A final dialogue box will appear, letting you know the result.

## Example 1
To roll 1d20, go to Roll Dice > Roll Dice. Enter '1' in the first dialogue prompt, '20' in the second prompt, and '' in the third. A dialogue box presenting a roll of 1–20 will appear.

## Example 2
To roll 2d6+6, go to Roll Dice > Roll Dice. Enter '2' in the first dialogue prompt, '6' in the second prompt, and '6' in the third. A dialogue box presenting a roll of 8–18 will appear.
