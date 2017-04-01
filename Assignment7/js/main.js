window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game(900, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    var bun1, bun2;
    var cat1, cat2;
    var chin1, chin2;
    var dog1, dog2;
    var frog1, frog2;
    var ham1, ham2;
    var mous1, mous2;
    var pig1, pig2;
    var snak1, snak2;
    var spid1, spid2;
    var back;
    
    var text;

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('bunny1', 'assets/bunny1.png');
        game.load.image('bunny1', 'assets/bunny2.png');
        game.load.image('cat1', 'assets/cat1.png');
        game.load.image('cat2', 'assets/cat2.png');
        game.load.image('chinchilla1', 'assets/chinchilla1.png');
        game.load.image('chinchilla2', 'assets/chinchilla2.png');
        game.load.image('dog1', 'assets/dog1.png');
        game.load.image('dog2', 'assets/dog2.png');
        game.load.image('frog1', 'assets/frog1.png');
        game.load.image('frog2', 'assets/frog2.png');
        game.load.image('hamster1', 'assets/hamster1.png');
        game.load.image('hamster2', 'assets/hamster2.png');
        game.load.image('mouse1', 'assets/mouse1.png');
        game.load.image('mouse2', 'assets/mouse2.png');
        game.load.image('pig1', 'assets/pig1.png');
        game.load.image('pig2', 'assets/pig2.png');
        game.load.image('snake1', 'assets/snake1.png');
        game.load.image('snake2', 'assets/snake2.png');
        game.load.image('spider1', 'assets/spider1.png');
        game.load.image('spider2', 'assets/spider2.png');
        game.load.image('back', 'assets/back.png');
    }
    
    function create() {

        back = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'hint', 5);

        back.anchor.setTo(0.5, 0.5);

        text = game.add.text(game.world.centerX, 15, "Click on a door and hope that luck is on your side!\nIf it's not you'll probably die!", { font: "25px Arial", fill: "#9999ff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
    }
    
    function update() {
    }

    function ranCards() {

    }
};
