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
    
    var game = new Phaser.Game( 1250, 670, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Loads the ground - call it ground
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground.png');
        this.game.load.image('cowboy', 'assets/cowboy.png');
    }
    
    var grnd;
    var cwboy;
    var sky;
    
    function create() {
      
        //creates a tile sprite so it looks like the image is tiled side by side
        sky = game.add.tileSprite(game.world.centerX, game.world.centerY - 100, game.world.bounds.width, game.world.bounds.height, 'sky');
        grnd = game.add.tileSprite(game.world.centerX, game.height + 200, game.world.bounds.width, game.world.bounds.height, 'ground');
        
        //creates a sprite set around the lower left corner
        cwboy = game.add.sprite(150, game.world.centerY + 150, 'cowboy');

        //sprite anchor set to middle of the image - centered
        sky.anchor.setTo(0.5, 0.5);
        grnd.anchor.setTo(0.5, 0.5);
        cwboy.anchor.setTo(0.5, 0.5);
        
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.

        //moves the tileSprites position to the left constantly
        //because it is tiled however, it looks as if it is infinitely scrolling
        grnd.tilePosition.x -= 3;
        sky.tilePosition.x -= .75;
    }
};
