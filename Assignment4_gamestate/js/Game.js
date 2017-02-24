
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    // Create your own variables.
    this.d1 = null;
    this.d2 = null;
    this.d3 = null;
    this.text = null;
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.game.physics.enable( this.bouncy, Phaser.Physics.ARCADE );

        // Create a sprite at the center of the screen using the 'logo' image.
        this.d1 = this.game.add.sprite(this.game.world.centerX - 250, this.game.world.centerY, 'door1');
        this.d2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'door2');
        this.d3 = this.game.add.sprite(this.game.world.centerX + 250, this.game.world.centerY, 'door3');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.d1.anchor.setTo(0.5, 0.5);
        this.d2.anchor.setTo(0.5, 0.5);
        this.d3.anchor.setTo(0.5, 0.5);
        
        // Turn on the arcade physics engine for this sprite.
        // Make it bounce off of the world bounds.
        this.bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        this.text = this.game.add.text( this.game.world.centerX, 15, "...", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        // When you click on the sprite, you go back to the MainMenu.
        this.bouncy.inputEnabled = true;
        this.bouncy.events.onInputDown.add( function() { this.state.start('MainMenu'); }, this );
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );

        this.d1.events.onInputDown.add(gone1);
        this.d2.events.onInputDown.add(gone2);
        this.d3.events.onInputDown.add(gone3);
    },

    gone1: function() {

    },

    gone2: function() {

    },

    gone3: function() {

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
