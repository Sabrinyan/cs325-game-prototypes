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

    //Useful sites:
    //http://www.html5gamedevs.com/topic/1698-how-to-have-mouse-down-true-only-once-each-click/
    //http://phaser.io/examples/v2/arcade-physics/on-collide-event
    //http://examples.phaser.io/_site/view_full.html?d=arcade%20physics&f=launcher+follow+world.js&t=launcher%20follow%20world
    
    "use strict";
    
    var game = new Phaser.Game( 900, 900, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        this.game.load.image('backdrop', 'assets/backdrop.png');
        this.game.load.image('floor', 'assets/floor.png');

        this.game.load.image('heart', 'assets/heart.png');
        this.game.load.image('liver', 'assets/liver.png');
        this.game.load.image('lung', 'assets/lung.png');
        this.game.load.image('stomach', 'assets/stomach.png');
        this.game.load.image('eye', 'assets/eye.png');

        this.game.load.image("h_button", 'assets/heart_button.png');
        this.game.load.image("li_button", 'assets/liver_button.png');
        this.game.load.image("lu_button", 'assets/lung_button.png');
        this.game.load.image("s_button", 'assets/stomach_button.png');
        this.game.load.image("e_button", 'assets/eye_button.png');

        this.game.load.image("ptext", 'assets/player_text.png');

    }
    
    //var wall;
    //var floor;
    var heart;
    var liver;
    var lung;
    var stomach;
    var eye;

    var hbutton;
    var libutton;
    var lubutton;
    var sbutton;
    var ebutton;

    var pressQ;
    var pressW;
    var pressE;
    var pressR;
    var pressT;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create a sprite at the center of the screen using the 'logo' image.
        game.add.image(game.world.centerX, game.world.centerY, 'backdrop').anchor.set(0.5);
        game.add.image(game.world.centerX, game.world.centerY, 'floor').anchor.set(0.5);
        game.add.image(250, game.world.centerY, 'ptext').anchor.set(0.5);

        //heart = game.add.sprite(game.world.centerX, game.world.centerY, 'heart');
        //liver = game.add.sprite(game.world.centerX, game.world.centerY, 'liver');
        //lung = game.add.sprite(game.world.centerX, game.world.centerY, 'lung');
        //stomach = game.add.sprite(game.world.centerX, game.world.centerY, 'stomach');
        //eye = game.add.sprite(game.world.centerX, game.world.centerY, 'eye');

        hbutton = game.add.sprite(132, game.world.centerY, 'h_button');
        libutton = game.add.sprite(190, game.world.centerY, 'li_button');
        lubutton = game.add.sprite(249, game.world.centerY, 'lu_button');
        sbutton = game.add.sprite(307, game.world.centerY, 's_button');
        ebutton = game.add.sprite(365, game.world.centerY, 'e_button');

        //hbutton = game.add.button(250, game.world.centerY, 'h_button', heartClick, this,);

        //heart.anchor.setTo(0.5, 0.5);
        //liver.anchor.setTo(0.5, 0.5);
        //lung.anchor.setTo(0.5, 0.5);
        //stomach.anchor.setTo(0.5, 0.5);
        //eye.anchor.setTo(0.5, 0.5);

        hbutton.anchor.setTo(0.5, 0.5);
        libutton.anchor.setTo(0.5, 0.5);
        lubutton.anchor.setTo(0.5, 0.5);
        sbutton.anchor.setTo(0.5, 0.5);
        ebutton.anchor.setTo(0.5, 0.5);

        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //floor.anchor.setTo(0.5, 0.5);
        
        pressQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        pressW = game.input.keyboard.addKey(Phaser.Keyboard.W);;
        pressE = game.input.keyboard.addKey(Phaser.Keyboard.E);
        pressR = game.input.keyboard.addKey(Phaser.Keyboard.R);
        pressT = game.input.keyboard.addKey(Phaser.Keyboard.T);
    }
    
    function update() {

        pressQ.onDown.add(heartClick, this);
        pressW.onDown.add(liverClick, this);
        pressE.onDown.add(lungClick, this);
        pressR.onDown.add(stomachClick, this);
        pressT.onDown.add(eyeClick, this);
    }

    function heartClick() {

        heart = game.add.sprite(game.world.centerX, game.world.centerY, 'heart');
        game.physics.enable(heart, Phaser.Physics.ARCADE);
        heart.body.gravity.setTo(200);
        heart.body.velocity.setTo(100, 100);
    }

    function liverClick() {

        liver = game.add.sprite(game.world.centerX, game.world.centerY, 'liver');
        game.physics.enable(liver, Phaser.Physics.ARCADE);
        liver.body.gravity.setTo(200);
        liver.body.velocity.setTo(100, 100);
    }

    function lungClick() {

        lung = game.add.sprite(game.world.centerX, game.world.centerY, 'lung');
        game.physics.enable(lung, Phaser.Physics.ARCADE);
        lung.body.gravity.setTo(200);
        lung.body.velocity.setTo(100, 100);
    }

    function stomachClick() {

        stomach = game.add.sprite(game.world.centerX, game.world.centerY, 'stomach');
        game.physics.enable(stomach, Phaser.Physics.ARCADE);
        stomach.body.gravity.setTo(200);
        stomach.body.velocity.setTo(100, 100);
    }

    function eyeClick() {

        eye = game.add.sprite(game.world.centerX, game.world.centerY, 'eye');
        game.physics.enable(eye, Phaser.Physics.ARCADE);
        eye.body.gravity.setTo(200);
        eye.body.velocity.setTo(100, 100);
    }
};
