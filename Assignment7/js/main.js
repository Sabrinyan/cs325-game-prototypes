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
    
    var game = new Phaser.Game( 900, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('arrow', 'assets/arrow.png');
        game.load.spritesheet('door1', 'assets/door1.png', 200, 250, 5);
        game.load.spritesheet('door2', 'assets/door2.png', 200, 250, 5);
        game.load.spritesheet('door3', 'assets/door3.png', 200, 250, 5);
        game.load.spritesheet('hint', 'assets/shine.png', 200, 250, 5);
        game.load.audio('heartbeat', 'assets/heart.ogg');
        game.load.audio('gameover', 'assets/gameover.ogg');
        game.load.audio('win', 'assets/win.ogg');
    }
    


    function create() {

        hint = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'hint', 5);
        door1 = game.add.sprite(game.world.centerX - 250, game.world.centerY + 50, 'door1', 5);
        door2 = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'door2', 5);
        door3 = game.add.sprite(game.world.centerX + 250, game.world.centerY + 50, 'door3', 5);
        arrow = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'arrow');

        door1.anchor.setTo(0.5, 0.5);
        door2.anchor.setTo(0.5, 0.5);
        door3.anchor.setTo(0.5, 0.5);
        arrow.anchor.setTo(0.5, 0.5);
        hint.anchor.setTo(0.5, 0.5);

        anim1 = door1.animations.add('open1');
        anim2 = door2.animations.add('open2');
        anim3 = door3.animations.add('open3');
        animHint = hint.animations.add('shine');
        animHint.play(10, true);

        left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        text = game.add.text(game.world.centerX, 15, "Click on a door and hope that luck is on your side!\nIf it's not you'll probably die!", { font: "25px Arial", fill: "#9999ff", align: "center" });
        textLevel = game.add.text(game.world.centerX, 115, "Level: " + cntLevel, { font: "25px Arial", fill: "#9999ff", align: "center" });
        textTime = game.add.text(game.world.centerX, 85, "Time: " + cntSec, { font: "25px Arial", fill: "#9999ff", align: "center" });
        text.anchor.setTo(0.5, 0.0);
        textLevel.anchor.setTo(0.5, 0.0);
        textTime.anchor.setTo(0.5, 0.0);

        game.time.events.loop(Phaser.Timer.SECOND, time, this);
    }
    
    function update() {

        left.onDown.add(goleft, this);
        right.onDown.add(goright, this);
        enter.onDown.add(pickDoor, this);

        //this must be fixed. the ondown is called too many times!

        if (anim1.isFinished)
            door1.frame = 0;
        if (anim2.isFinished)
            door2.frame = 0;
        if (anim3.isFinished)
            door3.frame = 0;

        if (cntSec == 0) {
            go.play();
            if (go.isPlaying == false)
                death();
        }
        if (cntLevel == 10)
            win();
    }
};
