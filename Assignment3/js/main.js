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
    var doorX;
    var doorY;

    var d1 = false;
    var d2 = false;
    var d3 = false;

    var cntLevel;
    var cntSec;
    var loopTime;
    var cont;

    var worldScale = 1;

    var text;
    var textLevel;
    var textTime;
    
    var camX;
    var camY;
    var timer;
    var event;

    function create() {

        cntLevel = 1;
        cont = true;
        cntSec = 10;
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
        textLevel = game.add.text(game.world.centerX, 115, "Level: " + cntLevel, { font: "25px Arial", fill: "#9999ff", align: "center" });
        textTime = game.add.text(game.world.centerX, 85, "Time: " + cntSec, { font: "25px Arial", fill: "#9999ff", align: "center" });
        text.anchor.setTo(0.5, 0.0);
        textLevel.anchor.setTo(0.5, 0.0);
        textTime.anchor.setTo(0.5, 0.0);

        timer = game.time.create(true);
        //timer = game.time.events.loop(Phaser.Timer.SECOND * .01, zoom, this);
        //event = timer.loop(Phaser.Timer.SECOND * .01, zoom, this);
        timer.start();
        game.time.events.loop(Phaser.Timer.SECOND, time, this);
        randomDoor();
        
        camX = game.world.width / 2;
        camY = game.world.height - 400;
    }
    
    function update() {

        door1.events.onInputDown.add(gone1);
        door2.events.onInputDown.add(gone2);
        door3.events.onInputDown.add(gone3);

        if (cntSec == 0 && cntLevel < 11) {
            
            timer.remove(event);
            game.world.scale.set(1);

            if (d1 == false && d2 == false && d3 == false)
                death();
            else {
                //event = timer.loop(Phaser.Timer.SECOND * .01, zoom, this);
                //timer.start();
                randomDoor();
                d1 = false;
                d2 = false;
                d3 = false;
            }
        }

        if (cntLevel == 10) {
            win();
        }
    }

    function time() {
        
        cntSec--;
        textTime.setText("Time: " + cntSec);
    }

    function zoom() {
        worldScale += 0.01;
        worldScale = Phaser.Math.clamp(worldScale, 0.25, 1.5);
        game.world.scale.set(worldScale);
        game.camera.focusOnXY(camX * game.world.scale.x, camY * game.world.scale.y);

    }

    function randomDoor() {

        doorX = Math.floor(Math.random() * 3) + 1;
        doorY = Math.floor(Math.random() * 3) + 1;

        if (doorX == 1 || doorY == 1) {
            d1 = true;
        }
        if (doorX == 2 || doorY == 2) {
            d2 = true;
        }
        if (doorX == 3 || doorY == 3) {
            d3 = true;
        }
    }

    function gone1() {

        cntSec = 10;
        textTime.setText("Time: " + cntSec);

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

        cntSec = 10;
        textTime.setText("Time: " + cntSec);

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

        cntSec = 10;
        textTime.setText("Time: " + cntSec);

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
