# GSlides-Tabletop
Tools for using Google Slides as a Virtual Tabletop for D&amp;D and other roleplaying games
## How to use
Create a file in Google Slides. Create your virtual tabletop space by importing and drawing tokens and maps and other aids, just as you would in Roll20 or similar.

Go to Tools > Script editor. In `Code.gs`, paste the contents of `DiceRoller_forGSlides.gs`. Refresh your Google Slide file. A new menu called Roll Dice should appear.

To roll a single die, including d20 with 5e dis/advantage, 4dF (Fudge or Fate), and 2d6 (PbtA), go to the Roll Dice menu and select an option. A dialogue box will appear immediately with the result.

To roll multiple dice with modifiers, go to Roll Dice > Roll Dice. Three dialogue boxes will prompt for: the number of dice to roll, the die size, and any modifiers. A final dialogue box will appear, letting you know the result.

## Example 1
To roll 1d20, go to Roll Dice > Roll d20. A dialogue box presenting a roll of 1–20 will appear.

## Example 2
To roll 2d8 + 6, go to Roll Dice > Roll Dice. Enter '2' in the first dialogue prompt, '8' in the second prompt, and '6' in the third. A dialogue box presenting a roll of 8–22 will appear.

## Example 3
To roll 1d20 with disadvantage, go to Roll Dice > Roll d20 with Disadvantage. You will be prompted for any modifiers (leave blank if none). A dialogue box presenting the final modified roll of 1–20 and both raw rolls will appear.

## Example 4
To roll 4dF – 1 (Fudge or Fate dice with a –1 Poor skill), go to Roll Dice > Roll 4dF (Fate/Fudge). You will be prompted for any modifiers; in this example, we enter '-1'. A dialogue box will appear with the final result, an ASCII representation of the Fudge dice faces, and the Fate Ladder adjective of the result. In this example, one possible result is: 'Roll: 0 [ ] [–] [+] [+] Mediocre'

## Example 5
To roll 2d6 + 2 in a PbtA game, go to Roll Dice > Roll 2d6 (PbtA). You will be prompted for any modifiers; in this example, we enter '2'. A dialogue box will appear with the final result, and a description of the degree of success (6–: Failure or Hard GM Move, 7–9: Partial Success or Soft GM Move, 10–11: Complete Success, 12+: Complete Success and possible Advanced Move).
