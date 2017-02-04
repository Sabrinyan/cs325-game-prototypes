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

    // --- INFORMATION FOUND ---
    // Tile Sprite - to make an infinitely scrolling background
    // Found from the website below (I had a hart time finding it on phaser.io/examples)
    // https://gamedevacademy.org/how-to-make-an-infinitely-scrolling-game-with-phaser/
    // Rotating arm - make the arm point to where the mouse cursor is at
    // Found from the website below
    // http://phaser.io/examples/v2/arcade-physics/angle-to-pointer
    
    "use strict";
    
    var game = new Phaser.Game( 1250, 670, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {

        // loads assets
        // the images are all exatly what you think it is
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground.png');
        this.game.load.image('arm', 'assets/arm.png');
        this.game.load.image('cowboy', 'assets/cowboy.png');
    }
    
    var ground;
    var cowboy;
    var sky;
    var arm;
    
    function create() {
      
        // creates a tile sprite so it looks like the image is tiled side by side
        sky = game.add.tileSprite(game.world.centerX, game.world.centerY - 100, game.world.bounds.width, game.world.bounds.height, 'sky');
        ground = game.add.tileSprite(game.world.centerX, game.height + 200, game.world.bounds.width, game.world.bounds.height, 'ground');
        
        // creates a sprite set around the lower left corner
        arm = game.add.sprite(139, game.world.centerY + 120, 'arm');
        cowboy = game.add.sprite(150, game.world.centerY + 150, 'cowboy');

        // sprite anchor set to middle of the image - centered
        sky.anchor.setTo(0.5, 0.5);
        ground.anchor.setTo(0.5, 0.5);
        arm.anchor.setTo(0.05, 0.5);
        cowboy.anchor.setTo(0.5, 0.5);
        
        // set game physics to arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        
        // moves the tileSprites position to the left constantly
        // because it is tiled however, it looks as if it is infinitely scrolling
        ground.tilePosition.x -= 3;
        sky.tilePosition.x -= .75;

        // updates the sprite rotation so it points to where the cursor is on the screen
        arm.rotation = game.physics.arcade.angleToPointer(arm);
    }
};
