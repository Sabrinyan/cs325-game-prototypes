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
        game.load.image('door1', 'assets/d1.png');
        game.load.image('door2', 'assets/d2.png');
        game.load.image('door3', 'assets/d3.png');
    }
    
    var door1;
    var door2;
    var door3;

    var d1 = false;
    var d2 = false;
    var d3 = false;

    var cntLevel;
    var cntSec;
    var door;
    var loopTime;
    var cont;

    var text;
    var textLevel;
    
    function create() {

        cntLevel = 1;
        cont = true;
        cntSec = 0;
        // Create a sprite at the center of the screen using the 'logo' image.
        door1 = game.add.sprite(game.world.centerX - 250, game.world.centerY, 'door1');
        door2 = game.add.sprite(game.world.centerX, game.world.centerY, 'door2');
        door3 = game.add.sprite(game.world.centerX + 250, game.world.centerY, 'door3');

        door1.anchor.setTo(0.5, 0.5);
        door2.anchor.setTo(0.5, 0.5);
        door3.anchor.setTo(0.5, 0.5);

        door1.inputEnabled = true;
        door2.inputEnabled = true;
        door3.inputEnabled = true;
        
        text = game.add.text(game.world.centerX, 15, "Click on a door and hope that luck is on your side!\nIf it's not you'll probably die!", { font: "25px Arial", fill: "#9999ff", align: "center" });
        textLevel = game.add.text(game.world.centerX, 100, "Level: " + cntLevel, { font: "25px Arial", fill: "#9999ff", align: "center" });
        text.anchor.setTo(0.5, 0.0);
        textLevel.anchor.setTo(0.5, 0.0)

        game.time.events.loop(Phaser.Timer.SECOND, time, this);
        randomDoor();
    }
    
    function update() {

        door1.events.onInputDown.add(gone1);
        door2.events.onInputDown.add(gone2);
        door3.events.onInputDown.add(gone3);

        if (cntSec == 10 && cntLevel < 11) {
            if (d1 == false && d2 == false && d3 == false)
                death();
            else {
                randomDoor();
                cntSec = 0;
            }
        }

        if (cntLevel == 10) {
            win();
        }

        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }

    function time() {
        cntSec++;
    }

    function randomDoor() {

        door = Math.floor(Math.random() * 3) + 1;

        if (door == 1) {
            d1 = true;
            d2 = false;
            d3 = false;
        }
        if (door == 2) {
            d1 = false;
            d2 = true;
            d3 = false;
        }
        if (door == 3) {
            d1 = false;
            d2 = false;
            d3 = true;
        }
    }

    function gone1() {

        if (d1 == true) {
            cntLevel++;
            textLevel.setText("Level: " + cntLevel);
            randomDoor();
            d1 = false;
        }
        else {
            cont = false;
            door1.destroy();
            death();
        }
    }

    function gone2() {

        if (d2 == true) {
            cntLevel++;
            textLevel.setText("Level: " + cntLevel);
            randomDoor();
            d2 = false;
        }
        else {
            cont = false;
            door2.destroy();
            death();
        }
    }

    function gone3() {

        if (d3 == true) {
            cntLevel++;
            textLevel.setText("Level: " + cntLevel);
            randomDoor();
            d3 = false;
        }
        else {
            cont = false;
            door3.destroy();
            death();
        }
    }

    function death() {
        game.paused = true;
        text.setText("YOU ARE NOW DEAD SORRY BUD");
    }

    function win() {
        game.paused = true;
        text.setText("YOU'RE A LIVING WINNER BOI");
    }
};
