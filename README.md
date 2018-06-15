# Word-Guess-Game
UMN Coding Boot Camp Homework 3 - JavaScript 

## Things to keep track of
* The secret word to be discovered by guessing letters
* The number of guesses taken so far or the number of guesses remaining
* Which letters have been guessed
* Wins thus far
* Failures thus far

## States
* On key press, check whether the letter was guessed
    * If already guessed, do nothing
    * If not already guessed
        * And it is a missing letter or letters of the word, then fill in letters
        * And it is not a missing letter of the word, then decrease the guesses remaining
        * Check if the game is over with two scenarios
            * No guesses remaining: 
                * show failure screen/play failure sound
                * increment numLosses
            * All letters guessed for wrord:
                * show winner screen/play winner sound
                * increment numWins

## Input
* get key input
* convert key to character for comparison

## Display
Current game:
* Current word
    * Show underscores for unknown letters
    * Show guessed letters
* Number of guesses remaining
    * if time permits, make an animation for it

Totals:

* Number of losses
* Number of wins

## Technical details
* Store "mystery word" in String mysteryString
* Store the string to display in displayString
* Store failed guesses thus far in String usedLetters
* Store wins thus far as a number in numWins
* Store losses thus far in numLosses

## Initialization
* Set mysteryString to an unused word from the dictionary

## TBD
* Data structure for dictionary of words?
* Handle spaces