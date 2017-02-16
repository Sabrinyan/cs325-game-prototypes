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
    //http://phaser.io/examples/v2/time/basic-looped-event
    
    "use strict";
    
    var game = new Phaser.Game( 900, 900, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {

        //loading images

        //background/floor
        this.game.load.image('backdrop', 'assets/backdrop.png');
        this.game.load.image('floor', 'assets/floor.png');

        //sprites
        this.game.load.image('heart', 'assets/heart.png');
        this.game.load.image('liver', 'assets/liver.png');
        this.game.load.image('lung', 'assets/lung.png');
        this.game.load.image('stomach', 'assets/stomach.png');
        this.game.load.image('eye', 'assets/eye.png');

        //people
        this.game.load.image('man', 'assets/man.png');
        this.game.load.image('doctor', 'assets/doctor.png');

        //buttons
        this.game.load.image('h_button', 'assets/heart_button.png');
        this.game.load.image('li_button', 'assets/liver_button.png');
        this.game.load.image('lu_button', 'assets/lung_button.png');
        this.game.load.image('s_button', 'assets/stomach_button.png');
        this.game.load.image('e_button', 'assets/eye_button.png');

        //text boxes
        this.game.load.image('ptext', 'assets/player_text.png');
        this.game.load.image('dtext', 'assets/doctor_text.png');

        this.game.load.audio('main', 'assets/soundeffects/music.ogg');

    }
   
    // constants
    const G = 800;
    const X_VELOCITY = 300;
    const Y_VELOCITY = -400;
    var score100 = false;
    var score200 = false;
    var score300 = false;
    var score400 = false;

    // sprites
    var doctor;
    var heart;
    var liver;
    var lung;
    var stomach;
    var eye;

    // keys
    var pressQ;
    var pressW;
    var pressE;
    var pressR;
    var pressT;

    // helper vars
    var request; // doctor's request
    var cnt; // the number for the organ requested
    var chances;
    var score;
    var requestTime;
    var loopTime;

    //text
    var textChances;
    var textOver;
    var textScore;

    var music;

    function create() {

        chances = 3;
        score = 0;
        requestTime = 3000;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Create a sprite at the center of the screen using the 'logo' image.
        game.add.image(game.world.centerX, game.world.centerY, 'backdrop').anchor.set(0.5);
        game.add.image(game.world.centerX, game.world.centerY, 'floor').anchor.set(0.5);
        game.add.image(250, game.world.centerY, 'ptext').anchor.set(0.5);
        game.add.image(700, game.world.centerY + 10, 'dtext').anchor.set(0.5);

        game.add.image(132, game.world.centerY + 10, 'h_button').anchor.set(0.5);
        game.add.image(190, game.world.centerY + 10, 'li_button').anchor.set(0.5);
        game.add.image(249, game.world.centerY + 10, 'lu_button').anchor.set(0.5);
        game.add.image(307, game.world.centerY + 10, 's_button').anchor.set(0.5);
        game.add.image(365, game.world.centerY + 10, 'e_button').anchor.set(0.5);

        game.add.image(101, game.world.centerY + 200, 'man').anchor.set(0.5);
        doctor = game.add.sprite(800, game.world.centerY + 180, 'doctor');
        doctor.anchor.setTo(0.5, 0.5);
        game.physics.enable(doctor, Phaser.Physics.ARCADE);
        
        pressQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        pressW = game.input.keyboard.addKey(Phaser.Keyboard.W);;
        pressE = game.input.keyboard.addKey(Phaser.Keyboard.E);
        pressR = game.input.keyboard.addKey(Phaser.Keyboard.R);
        pressT = game.input.keyboard.addKey(Phaser.Keyboard.T);

        loopTime = game.time.events.loop(Phaser.Timer.SECOND, docOrders, this);
        loopTime.delay = requestTime;

        textChances = game.add.text(275, 350, "Chances: 3", { font: "25px Arial", fill: "#991414", align: "left" });
        textScore = game.add.text(500, 350, "Score: 0", { font: "25px Arial", fill: "#991414", align: "left" });

        music = new Phaser.Sound(game, 'main', 1, true);
        music.play();
    }
    
    function update() {

        pressQ.onDown.add(heartClick, this);
        pressW.onDown.add(liverClick, this);
        pressE.onDown.add(lungClick, this);
        pressR.onDown.add(stomachClick, this);
        pressT.onDown.add(eyeClick, this);

        game.physics.arcade.overlap(doctor, heart, heartKill);
        game.physics.arcade.overlap(doctor, liver, liverKill);
        game.physics.arcade.overlap(doctor, lung, lungKill);
        game.physics.arcade.overlap(doctor, stomach, stomachKill);
        game.physics.arcade.overlap(doctor, eye, eyeKill);

        if (score == 100 && score100 == false)
            difficulty();
        if (score == 200 && score200 == false)
            difficulty();
        if (score == 300 && score300 == false)
            difficulty();
        if (score == 400 && score300 == false)
            difficulty();

        if (chances == 0)
            gameover();
    }

    function difficulty() {
        requestTime -= 500;
        loopTime.delay = requestTime;

        if (score == 100)
            score100 = true;
        if (score == 200)
            score200 = true;
        if (score == 300)
            score300 = true;
        if (score == 400)
            score400 = true;
    }

    function gameover() {
        Phaser.Keyboard.enabled = false;
        game.paused = true;
        textOver = game.add.text(200, 250, "YOU'RE FIRED", { font: "75px Arial", fill: "#991414", align: "center" });
    }

    function docOrders() {

        cnt = Math.floor(Math.random() * 5) + 1;

        if (cnt == 1) 
            request = game.add.sprite(701, game.world.centerY, 'h_button');
        else if (cnt == 2)
            request = game.add.sprite(701, game.world.centerY, 'li_button');
        else if (cnt == 3)
            request = game.add.sprite(701, game.world.centerY, 'lu_button');
        else if (cnt == 4)
            request = game.add.sprite(701, game.world.centerY, 's_button');
        else if (cnt == 5)
            request = game.add.sprite(701, game.world.centerY, 'e_button');

        request.anchor.setTo(0.5, 0.5);
        game.time.events.repeat(Phaser.Timer.SECOND * ((requestTime/1000) - 1), 1, deleteRequest, this);
    }

    function deleteRequest() {
        request.kill();
    }
    
    //functions that kill the organ when recieved by the doctor
    function heartKill() {
        if (cnt != 1) {
            chances--;
            textChances.setText("Chances: " + chances);
        }
        else {
            score += 10;
            textScore.setText("Score: " + score);
        }
        heart.kill();
    }
    function liverKill() {
        if (cnt != 2) {
            chances--;
            textChances.setText("Chances: " + chances);
        }
        else {
            score += 10;
            textScore.setText("Score: " + score);
        }
        liver.kill();
    }
    function lungKill() {
        if (cnt != 3) {
            chances--;
            textChances.setText("Chances: " + chances);
        }
        else {
            score += 10;
            textScore.setText("Score: " + score);
        }
        lung.kill();
    }
    function stomachKill() {
        if (cnt != 4) {
            chances--;
            textChances.setText("Chances: " + chances);
        }
        else {
            score += 10;
            textScore.setText("Score: " + score);
        }
        stomach.kill();
    }
    function eyeKill() {
        if (cnt != 5) {
            chances--;
            textChances.setText("Chances: " + chances);
        }
        else {
            score += 10;
            textScore.setText("Score: " + score);
        }
        eye.kill();
    }

    //functions that handle each organ when it is asked for

    function heartClick() {

        heart = game.add.sprite(150, 600, 'heart');
        game.physics.enable(heart, Phaser.Physics.ARCADE);
        heart.body.gravity.setTo(G);
        heart.body.velocity.setTo(X_VELOCITY, Y_VELOCITY);
    }
    function liverClick() {

        liver = game.add.sprite(150, 600, 'liver');
        game.physics.enable(liver, Phaser.Physics.ARCADE);
        liver.body.gravity.setTo(G);
        liver.body.velocity.setTo(X_VELOCITY, Y_VELOCITY);
    }
    function lungClick() {

        lung = game.add.sprite(150, 600, 'lung');
        game.physics.enable(lung, Phaser.Physics.ARCADE);
        lung.body.gravity.setTo(G);
        lung.body.velocity.setTo(X_VELOCITY, Y_VELOCITY);
    }
    function stomachClick() {

        stomach = game.add.sprite(150, 600, 'stomach');
        game.physics.enable(stomach, Phaser.Physics.ARCADE);
        stomach.body.gravity.setTo(G);
        stomach.body.velocity.setTo(X_VELOCITY, Y_VELOCITY);
    }
    function eyeClick() {

        eye = game.add.sprite(150, 600, 'eye');
        game.physics.enable(eye, Phaser.Physics.ARCADE);
        eye.body.gravity.setTo(G);
        eye.body.velocity.setTo(X_VELOCITY, Y_VELOCITY);
    }
};
