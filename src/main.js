/*
// Hazim Awad
// Rocket Patrol Mods
// 6/30/2021
// 16 houres to complete
//
// POINTS BREAKDOWN:
// - Finishing the Tutorial: an automatic (20) points.
// - Redesign the game's artwork, UI, and sound to change
//     its theme/aesthetic (to something other than sci-fi) (60)
// - Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
//   -3sec for lower cake
//   -5sec for mid cake
//   -7sec for upper cake
// - Implement parallax scrolling (10)
// - Display the time remaining (in seconds) on the screen (10)
//
// TOTAL POINTS: 120
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3; 

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;