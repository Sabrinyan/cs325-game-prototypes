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
    
    var game = new Phaser.Game( 900, 750, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('aclock', 'assets/alarm clock.png');
        game.load.image('gclock', 'assets/grandfather clock.png');
        game.load.image('laptop', 'assets/laptop.png');
        game.load.image('microwave', 'assets/microwave.png');
        game.load.image('phone', 'assets/phone.png');
        game.load.image('speaker', 'assets/speaker.png');
        game.load.image('tv', 'assets/tv.png');

        game.load.image('table1', 'assets/table.png');
        game.load.image('table2', 'assets/table1.png');
        game.load.image('table3', 'assets/table2.png');

        game.load.image('stressbar', 'assets/healthbar.png');
        game.load.image('stressborder', 'assets/border.png');
        game.load.image('background', 'assets/background.png');

        game.load.spritesheet('boi', 'assets/littleboy.png', 100, 240, 3);

        game.load.audio('phonesound', 'assets/soundeffects/phone.ogg');
    }
    
    var aclock;
    var gclock;
    var laptop;
    var microwave;
    var phone;
    var speaker;
    var table;
    var tv;

    var boy;
    
    var stressbar;
    var border;
    var stress = 0;

    var text;

    var phonesound;

    function create() {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //game.physics.enable(this.bouncy, Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, 900, 750, 'background');

        game.add.sprite(game.world.centerX - 100, game.world.centerY + 250, 'table1');
        game.add.sprite(game.world.centerX + 300, game.world.centerY + 150, 'table2');
        game.add.sprite(0, game.world.centerY + 175, 'table3');

        aclock = game.add.sprite(game.world.centerX + 75, game.world.centerY + 255, 'aclock');
        gclock = game.add.sprite(game.world.centerX + 225, game.world.centerY + 125, 'gclock');
        laptop = game.add.sprite(game.world.centerX + 375, game.world.centerY + 155, 'laptop');
        //microwave = game.add.sprite(game.world.centerX, game.world.centerY, 'microwave');
        phone = game.add.sprite(game.world.centerX - 20, game.world.centerY + 250, 'phone');
        speaker = game.add.sprite(game.world.centerX - 150, game.world.centerY + 175, 'speaker');
        tv = game.add.sprite(game.world.centerX - 320, game.world.centerY + 90, 'tv');

        boy = game.add.sprite(game.world.centerX-25, game.world.centerY, 'boi');
        //boy.animations.add('sad');
        //boy.animations.play('sad', 1, true);

        aclock.anchor.setTo(0.5, 0.5);
        gclock.anchor.setTo(0.5, 0.5);
        laptop.anchor.setTo(0.5, 0.5);
        //microwave.anchor.setTo(0.5, 0.5);
        phone.anchor.setTo(0.5, 0.5);
        speaker.anchor.setTo(0.5, 0.5);
        tv.anchor.setTo(0.5, 0.5);

        stressbar = game.add.sprite(0, 0, 'stressbar');
        stressbar.cropEnabled = true;
        stressbar.crop.width = (stress / 100) * stressbar.width;
        game.add.sprite(0, 0, 'stressborder');

        // Create a sprite at the center of the screen using the 'logo' image.
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.

        aclock.inputEnabled = true;
        gclock.inputEnabled = true;
        laptop.inputEnabled = true;
        phone.inputEnabled = true;
        speaker.inputEnabled = true;
        tv.inputEnabled = true;

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        text = game.add.text(this.game.world.centerX, 15, "...", style);
        text.anchor.setTo(0.5, 0.0);

        // When you click on the sprite, you go back to the MainMenu.
        phonesound = game.add.audio('phonesound');
        phonesound.play();
    }
    
    function update() {

        //d1.events.onInputDown.add(gone1);
        //d2.events.onInputDown.add(gone2);
        //d3.events.onInputDown.add(gone3);
    }

    function gone1() {
        text.setText("Good!");
    }

    function gone2() {
        text.setText("Bad!");

    }

    function gone3() {
        text.setText("Good!");

    }
};
