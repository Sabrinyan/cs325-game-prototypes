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
    
    //705 * 738
    var game = new Phaser.Game(1500, 1000, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    var maze;
    var heart;
    var star;

    var step1; //size of movement for going up and down
    var step2; //size of movement for going left and right

    var up, down, left, right;

    var ol;
    var text;

    function preload() {
        // Load an image and call it 'logo'.
        //game.load.image('maze', 'assets/maz.png');
        game.load.image('maz', 'assets/maz.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('star', 'assets/star.png');

        game.load.physics('maze_phys', 'assets/maze_test.json');
    }
    
    function create() {

        step1 = 50;
        step2 = 52.5;

        game.stage.backgroundColor = '#ffffff';
        game.physics.startSystem(Phaser.Physics.P2JS);

        maze = game.add.sprite(0, 0, 'maz');
        game.physics.p2.enable([maze], true);
        maze.body.clearShapes();
        maze.body.loadPolygon('maze_phys', 'maz');

        heart = game.add.sprite(25, 25, 'heart');
        star = game.add.sprite(25, 25, 'star');
        heart.anchor.setTo(0.5, 0.5);
        star.anchor.setTo(0.5, 0.5);

        up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        up.onDown.add(goUp, this);
        down.onDown.add(goDown, this);
        left.onDown.add(goLeft, this);
        right.onDown.add(goRight, this);

        text = game.add.text(1300, game.world.centerY, "false", { font: "25px Arial", fill: "#9999ff", align: "center" });
    }
    
    function update() {

    }

    function overlap() {
        var p = heart.getBounds();
        var m = maze.getBounds();

        return Phaser.Rectangle.intersects(p, m);
    }

    function goUp() {
        heart.y -= step1;
    }

    function goDown() {
        heart.y += step1;
    }

    function goLeft() {
        heart.x -= step2;
    }

    function goRight() {
        heart.x += step2;
    }
};
