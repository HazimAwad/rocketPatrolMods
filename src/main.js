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
// - Implement parallax scrolling (10)
//
// TOTAL POINTS: 90
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