# to o for ate

a 2048 replica :D

## how to play

Use arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!

# technologies used

This game was written in HTML, CSS, and JavaScript.

## general approach

1. Visual pencil and paper sketch of how the screen should look

2. Splitting the visual sketch into divisions and class names - with DOM manipulation and CSS styling in mind

3. Writing the html out

4. Styling each html element

5. Writing the main code in js

    - Creating const variables using DOM selectors on relevant html elements 

    - Game logic part 1: Function for creating new tiles - **createNewtile()**

    - Game logic part 2: Function for moving tiles after checking adjacent tiles for merges/ movement/ neither - **moveBox(boxFrom, boxTo)**

    - Game logic part 3: Function that loops moveBox() to move multiple tiles in the direction specified - **push(direction)**

    - Linking event listeners to functions

    - Updating of score

    - Checking winning and losing of game

    - Restarting of the game

## sketches of wireframes

![disasterframe](uhh.jpg)

## major hurdles

The starting hurdle was very big... game logic played a huge part to how I would write the `<div>`s in the game grid of the html code. The html code changed multiple times while I was brainstorming different methods of how to move the tiles around. After overcoming this hurdle, most of the project up to 90% of its completion was pretty straightforward.

... Until I tried to animate the sliding of the tiles. I still haven't found a working method to do this :(

