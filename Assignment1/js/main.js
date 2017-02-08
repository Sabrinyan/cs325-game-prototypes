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
    // Pause - used for game over
    // Found from the website below
    // http://phaser.io/examples/v2/misc/pause-menu
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
    var ast;

    // sound variables
    var explosion;

    // helper variables
    var fireRate;
    var nextFire;
    var timer;
    var textScore;
    var textOver;
    var score;
    var cntTime;
    var cntAst;

    function create() {
      
        //helper variable initializing
        fireRate = 100;
        nextFire = 0;
        score = 0;
        cntTime = 5000;
        cntAst = 0;

        // set game physics to arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // creates a tile sprite so it looks like the image is tiled side by side
        sky = game.add.tileSprite(game.world.centerX, game.world.centerY - 100, game.world.bounds.width, game.world.bounds.height, 'sky');
        ground = game.add.tileSprite(game.world.centerX, game.height + 200, game.world.bounds.width, game.world.bounds.height, 'ground');
        
        // creates a sprite set around the lower left corner
        bullet = game.add.group();
        arm = game.add.sprite(139, game.world.centerY + 120, 'arm');
        cowboy = game.add.sprite(150, game.world.centerY + 150, 'cowboy');
        asteroid = game.add.group();
        
        asteroid.createMultiple(50, 'asteroid');
        bullet.setAll('checkWorldBounds', true);
        bullet.setAll('outOfBoundsKill', true);

        // bullet sprite info!   
        bullet.createMultiple(50, 'bullet');
        bullet.setAll('checkWorldBounds', true); //states that the bullet object is within world bounds 
        bullet.setAll('outOfBoundsKill', true); //kills bullet object that is outside the bounds of the world

        // physics
        game.physics.enable([bullet, asteroid, ground], Phaser.Physics.ARCADE);

        // score
        textScore = game.add.text(15, 10, "Score: 0", { font: "25px Arial", fill: "#991414", align: "left" });

        // sound
        explosion = game.add.audio('explosion');

        // sprite anchor set to middle of the image - centered
        sky.anchor.setTo(0.5, 0.5);
        ground.anchor.setTo(0.5, 0.5);
        arm.anchor.setTo(0.05, 0.5);
        cowboy.anchor.setTo(0.5, 0.5);

        ranAst();
        //game.time.events.loop(Phaser.Timer.SECOND * 5, ranAst, this);

        //arm.body.allowRotation = false;
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

        game.physics.arcade.overlap(asteroid, bullet, bulAst); // calls function bulAst if asteroid and bullet overlap
        game.physics.arcade.overlap(asteroid, ground, over); // calls function over if asteroid and ground overlap
    }

    // function that handles what happens if the bullet hits the asteroid
    function bulAst() {

        asteroid.remove(ast);
        explosion.play();
        score += 10;
        textScore.setText("Score : " + score);
    }

    // function that handles what happens if the asteroid hits the earth
    function over() {

        game.paused = true;
        textOver = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER", { font: "75px Arial", fill: "#991414", align: "center" });
    }

    // function that handles random asteroid spawning from the sky
    function ranAst() {
        
        //asteroid = game.add.sprite(game.world.randomX, -(Math.random() * 700), 'asteroid');
        //asteroid.rotation = Math.random() * (310 - 225) + 1;
        //game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        //asteroid.anchor.setTo(0.5, 0.5);
        //game.add.tween(asteroid).to({ y: game.height + (1600 + asteroid.y) }, 20000, Phaser.Easing.Linear.None, true);

            timer = game.time.now + cntTime;
            ast = asteroid.getFirstDead();
            ast.reset(game.world.randomX + 200, -150);
            game.add.tween(ast).to({ y: game.height + (670 + asteroid.y) }, 20000, Phaser.Easing.Linear.None, true);

        if (cntAst < 5 && cntTime > 500) {
            cntAst++;
        }
        if (cntAst == 5 && cntTime > 500) {
            cntAst = 0;
            cntTime -= 500;
        }
    }

    // function that handles bullets shot from the cowboy's gun
    function fire() {

        if (game.time.now > nextFire && bullet.countDead() > 0) {

            nextFire = game.time.now + fireRate;
            var bullets = bullet.getFirstDead();
            bullets.reset(arm.x + 5, arm.y - 5);
            game.physics.arcade.moveToPointer(bullets, 1000);
        }
    }
};
