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
    
    var door1;
    var door2;
    var door3;
    
    var anim1;
    var anim2;
    var anim3;

    //helper variables
    var d1 = false;
    var d2 = false;
    var d3 = false;
    var doorX;
    var doorY;

    var arrow;
    var left;
    var right;
    var enter;

    var cntLevel;
    var cntSec;

    var text;
    var textLevel;
    var textTime;

    var hb;
    var go;
    var win;

    var hint;
    var animHint;

    function create() {

        cntLevel = 1;
        cntSec = 10;

        door1 = game.add.sprite(game.world.centerX - 250, game.world.centerY + 50, 'door1', 5);
        door2 = game.add.sprite(game.world.centerX, game.world.centerY + 50, 'door2', 5);
        door3 = game.add.sprite(game.world.centerX + 250, game.world.centerY + 50, 'door3', 5);
        arrow = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'arrow');
        hint = game.add.sprite(-500, game.world.centerY + 50, 'hint', 5);

        door1.anchor.setTo(0.5, 0.5);
        door2.anchor.setTo(0.5, 0.5);
        door3.anchor.setTo(0.5, 0.5);
        arrow.anchor.setTo(0.5, 0.5);
        hint.anchor.setTo(0.5, 0.5);

        anim1 = door1.animations.add('open1');
        anim2 = door2.animations.add('open2');
        anim3 = door3.animations.add('open3');
        animHint = hint.animation.add('shine');
        animHint.play(7, true);

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
        randomDoor();

        hb = game.add.audio('heartbeat', 1, true);
        go = game.add.audio('gameover');
        win = game.add.audio('win');
        hb.play();
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

    function goleft() {
        if (arrow.position.x == game.world.centerX)
            arrow.x = game.world.centerX - 250;
        if (arrow.position.x == game.world.centerX + 250)
            arrow.x = game.world.centerX;
    }

    function goright() {
        if (arrow.position.x == game.world.centerX)
            arrow.x = game.world.centerX + 250;
        if (arrow.position.x == game.world.centerX - 250)
            arrow.x = game.world.centerX;
    }

    function time() {
        
        cntSec--;
        textTime.setText("Time: " + cntSec);
    }

    function randomDoor() {

        d1 = false;
        d2 = false;
        d3 = false;

        if (cntLevel <= 5) {
            doorX = Math.floor(Math.random() * 3) + 1;
            doorY = Math.floor(Math.random() * 3) + 1;
        }
        else {
            doorX = Math.floor(Math.random() * 3) + 1;
            doorY = 0;
        }

        if (cntLevel < 8)
            hint();

        if (doorX == 1 || doorY == 1)
            d1 = true;
        if (doorX == 2 || doorY == 2)
            d2 = true;
        if (doorX == 3 || doorY == 3)
            d3 = true;
    }

    function pickDoor() {
        if (arrow.position.x == game.world.centerX - 250) {
            gone1();
        }
        else if (arrow.position.x == game.world.centerX) {
            gone2();
        }
        else {
            gone3();
        }
    }

    function hint() {

        var x = Math.floor(Math.random() * 2) + 1;
        var y = Math.floor(Math.random() * 4) + 1;
        var z = Math.floor(Math.random() * 2) + 1;

        if (x == 1) {
            if (y >= 1 && y <= 3) { //give hint
                if (d1 && d2) {
                    if (z == 1)
                        hint.x = game.world.centerX - 250;
                    else
                        hint.x = game.world.centerX;
                }
                else if (d2 && d3) {
                    if (z == 1)
                        hint.x = game.world.centerX;
                    else
                        hint.x = game.world.centerX + 250;
                }
                else if (d1 && d3) {
                    if (z == 1)
                        hint.x = game.world.centerX - 250;
                    else
                        hint.x = game.world.centerX + 250;
                }
                else if (d1) {
                    hint.x = game.world.centerX - 250;
                }
                else if (d2) {
                    hint.x = game.world.centerX;
                }
                else { //d3 is true
                    hint.x = game.world.centerX + 250;
                }
            }
            else {
                if (!d1 && !d2) {
                    if (z == 1)
                        hint.x = game.world.centerX - 250;
                    else
                        hint.x = game.world.centerX;
                }
                else if (!d2 && !d3) {
                    if (z == 1)
                        hint.x = game.world.centerX;
                    else
                        hint.x = game.world.centerX + 250;
                }
                else if (!d1 && !d3) {
                    if (z == 1)
                        hint.x = game.world.centerX - 250;
                    else
                        hint.x = game.world.centerX + 250;
                }
                else if (!d1) {
                    hint.x = game.world.centerX - 250;
                }
                else if (!d2) {
                    hint.x = game.world.centerX;
                }
                else { //d3 is true
                    hint.x = game.world.centerX + 250;
                }
            }
        }
    }

    function gone1() {

        anim1.play(7, false);
        nextLvl();

        if (d1 == true)
            randomDoor();
        else {
            death();
        }
    }

    function gone2() {

        anim2.play(7, false);
        nextLvl();

        if (d2 == true)
            randomDoor();
        else {
            death();
        }
    }

    function gone3() {

        anim3.play(7, false);
        nextLvl();

        if (d3 == true)
            randomDoor();
        else {
            death();
        }
    }

    function nextLvl() {

        cntSec = 10;
        textTime.setText("Time: " + cntSec);
        cntLevel++;
        textLevel.setText("Level: " + cntLevel);
    }

    function death() {
        //go.play();
        game.paused = true;
        text.setText("YOU ARE NOW DEAD SORRY BUD");
    }

    function win() {
        //win.play();
        game.paused = true;
        text.setText("YOU'RE A LIVING WINNER BOI");
    }
};
