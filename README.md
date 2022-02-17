# Simon Says

game title: Simon Says
link: 

background:
I studied music theory and composition from the ages of 8 to 18. I grew to love complex pieces with linear melodies. The lack of rhyme or reason within a structure that needed 'some form of reason was deeply facinating. Upon my venture exploring the different game-build options, Simon Says shared a lot of these similar attributes to the complex pieces of music I poured over in my youth. Linear sequence... randomly chosen... increasing complexity with each repetion... so much fun. Especially with the notes attributed to each button. 

favicon source from https://is5-ssl.mzstatic.com/image/thumb/Purple4/v4/30/6e/d2/306ed24c-76c5-6906-07ba-70dcd251aae4/source/256x256bb.jpg

confetti.js from https://github.com/SEI-Remote/confetti

fonts taken from Google Fonts:
https://fonts.google.com/share?selection.family=Bungee%20Shade%7COxanium:wght@300


Todays goals:
- mobile still crashing
- get message to resize based on screen
- minimize body

# Minecat!

![A partially completed game of minecat on a 40x30 board with 140 bombs.](https://minecat.davidstinson.dev/assets/images/minecat.jpeg)

Minecat is a Minesweeper re-creation! Cells on the board can be clicked, which will reveal them. The goal of the game is to reveal every cell on the board, except for those that have mines. When revealed, cells with neighboring mines will be shown with a number on them, corresponding to the number of mines next to that cell. Clicking on a cell that has no adjacency with a bomb will reveal an empty space, and will reveal any empty space around it. This action cascades out until it reaches the edges of the board, any flags, or a numbered cell while revealing a single layer of numbered cells. Flags may be placed and removed with a right click, and are used to mark potential bomb locations.

The number of rows, columns, and bombs can be adjusted by using the bar beneath the play board.

---

## [Play the game here](https://dcollis92.github.io/simon-says/)

---

## Technologies used 

- CSS
- JavaScript
- HTML
- git

---

## Credits 🙌

- Check out the [Attributions](https://github.com/DavidStinson/minecat/blob/main/attributions.md).

---

## Recent Changes 🧹

- Refactored CSS, reducing file size by almost a quarter while simultaneously allowing for easier modification in the future.
- Made big changes to how light and dark mode interacts with the DOM, reducing the number of items held in the cache, massively improving memory performance.
- Changes around the number of columns and rows avaiable to improve performance.

## Ice Box 🧊

- [x] Add functionality to let user choose rows, columns, and number of bombs
- [x] Font design
- [x] Halo around fonts
- [x] Dark Mode
- [x] Fix flag display
- [ ] Add flags on touchscreen device
- [ ] Accessibility features (keyboard input, colorblind settings)
- [x] Confetti!
- [ ] Explosion Animations
- [x] Sound