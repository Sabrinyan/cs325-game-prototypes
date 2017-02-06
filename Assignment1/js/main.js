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
    // Shooting - make the cowboy shoot
    // Found from the website below
    // http://phaser.io/examples/v2/arcade-physics/shoot-the-pointer
    // Overlap - make the asteroids dissapear when it gets hit with a bullet
    // Found from the website below
    // http://stackoverflow.com/questions/27343431/phaser-collision-execute-function-one-time
    // Text box - update text box for keeping track of score
    // Found From the website below
    // http://phaser.io/examples/v2/text/update-text
    // USEFUL MAYBE LATER? : http://phaser.io/examples/v2/weapon/single-bullet
    // Stuff: http://phaser.io/examples/v2/arcade-physics/on-collide-event
    // ---- END INFORMATION ---
    
    "use strict";
    
    var game = new Phaser.Game( 1250, 670, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {

        // loads assets
        // the images are all exatly what you think it is
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/ground.png');
        this.game.load.image('arm', 'assets/arm.png');
        this.game.load.image('cowboy', 'assets/cowboy.png');
        this.game.load.image('bullet', 'assets/bullet.png');
        this.game.load.image('asteroid', 'assets/bigboi.png');

        this.game.load.audio('explosion', 'assets/soundeffects/exp.ogg');
    }
    
    // sprite variables
    var ground;
    var cowboy;
    var sky;
    var arm;
    var bullet;
    var asteroid;

    // sound variables
    var explosion;

    // helper variables
    var fireRate;
    var nextFire;
    var timer;
    var text;
    var score;

    function create() {
      
        //helper variable initializing
        fireRate = 100;
        nextFire = 0;
        score = 0;

        // set game physics to arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // creates a tile sprite so it looks like the image is tiled side by side
        sky = game.add.tileSprite(game.world.centerX, game.world.centerY - 100, game.world.bounds.width, game.world.bounds.height, 'sky');
        ground = game.add.tileSprite(game.world.centerX, game.height + 200, game.world.bounds.width, game.world.bounds.height, 'ground');
        
        // creates a sprite set around the lower left corner
        bullet = game.add.group();
        arm = game.add.sprite(139, game.world.centerY + 120, 'arm');
        cowboy = game.add.sprite(150, game.world.centerY + 150, 'cowboy');

        
        // bullet sprite info!   
        bullet.enableBody = true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;
        bullet.createMultiple(50, 'bullet');
        bullet.setAll('checkWorldBounds', true); //states that the bullet object is within world bounds 
        bullet.setAll('outOfBoundsKill', true); //kills bullet object that is outside the bounds of the world
        game.physics.arcade.enable(bullet, Phaser.Physics.ARCADE);

        // score
        text = game.add.text(15, 10, "Score: 0", { font: "25px Arial", fill: "#991414", align: "left" });

        // sound
        explosion = game.add.audio('explosion');

        // sprite anchor set to middle of the image - centered
        sky.anchor.setTo(0.5, 0.5);
        ground.anchor.setTo(0.5, 0.5);
        arm.anchor.setTo(0.05, 0.5);
        cowboy.anchor.setTo(0.5, 0.5);

        ranAst();

        //arm.body.allowRotation = false;
        
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

        // checks if user is trying to fire a bullet
        if (game.input.activePointer.isDown) {

            fire();
        }
        // checks if valid time has passed for another asteroid to spawn
        if (game.time.now > timer) {

            ranAst();
        }

        game.physics.arcade.overlap(asteroid, bullet, bulAst, null, this);
    }

    function bulAst() {

        //bullet.destroy();
        asteroid.destroy();
        explosion.play();
        score += 10;
        text.setText("Score : " + score);
    }

    function ranAst() {
        
        asteroid = game.add.sprite(game.world.randomX, -(Math.random() * 670), 'asteroid');
        asteroid.rotation = Math.random() * (310 - 225) + 1;
        asteroid.anchor.setTo(0.5, 0.5);
        asteroid.enableBody = true;
        asteroid.physicsBodyType = Phaser.Physics.ARCADE;

        game.physics.arcade.enable(asteroid, Phaser.Physics.ARCADE);
        game.add.tween(asteroid).to({ y: game.height + (1600 + asteroid.y) }, 20000, Phaser.Easing.Linear.None, true);

        timer = game.time.now + 10000;
    }

    function fire() {

        if (game.time.now > nextFire && bullet.countDead() > 0) {

            nextFire = game.time.now + fireRate;
            var bullets = bullet.getFirstDead();
            //bullets.reset(arm.x + 30, arm.y - 23);
            bullets.reset(arm.x + 5, arm.y - 5);
            game.physics.arcade.moveToPointer(bullets, 1000);
        }
    }
};
