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
    
    //TO DO: FIX THE DANG DONG STRESS BAR AND MAKE THE BOY SAD

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

        game.load.audio('aclocksound', 'assets/soundeffects/alarm.ogg');
        game.load.audio('gclocksound', 'assets/soundeffects/gclock.ogg');
        game.load.audio('phonesound', 'assets/soundeffects/phone.ogg');
        game.load.audio('speakersound', 'assets/soundeffects/speaker.ogg');
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
    var stress;
    var text;
    var cnt;

    var aclocksound;
    var gclocksound;
    var phonesound;
    var speakersound;

    var cntA;
    var cntG;
    var cntP;
    var cntS;

    var timeLoop;
    var timeStop;
    var timeDelay = 5000;
    var timeCount;

    var stressText;

    function create() {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //game.physics.enable(this.bouncy, Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, 900, 750, 'background');

        stress = 0;
        timeCount = 0;

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
        stressbar.width = stress;
        game.add.sprite(0, 0, 'stressborder');

        aclock.inputEnabled = true;
        gclock.inputEnabled = true;
        laptop.inputEnabled = true;
        phone.inputEnabled = true;
        speaker.inputEnabled = true;
        tv.inputEnabled = true;

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        text = game.add.text(this.game.world.centerX, 15, "Have your volume up!", style);
        text.anchor.setTo(0.5, 0.0);
        stressText = game.add.text(this.game.world.centerX, 50, "Stress", style);
        stressText.anchor.setTo(0.5, 0.0);

        timeLoop = game.time.events.loop(Phaser.Timer.SECOND * 1, time, this);
        //timeStop = game.time.create(true);
        //timeStop.loop(Phaser.Timer.SECOND * 3, no, this);
        
        // When you click on the sprite, you go back to the MainMenu.
        aclocksound = game.add.audio('aclocksound', 1, true);
        gclocksound = game.add.audio('gclocksound', 1, true);
        phonesound = game.add.audio('phonesound', 1, true);
        speakersound = game.add.audio('speakersound', 1, true);
    }
    
    function update() {

        aclock.events.onInputDown.add(aclockPress);
        gclock.events.onInputDown.add(gclockPress);
        phone.events.onInputDown.add(phonePress);
        speaker.events.onInputDown.add(speakerPress);

        if (stress == 200)
            gameover();
    }

    function time() {

        cnt = Math.floor(Math.random() * 4) + 1;

        if (stress < 100) {
            stress += 10;
            stressbar.width = (stress / 200);
        }

        if (cnt == 1 && aclocksound.isPlaying == false) {
            aclocksound.play();
            setTimeout(no1, 10000);
        }
        if (cnt == 2 && gclocksound.isPlaying == false) {
            gclocksound.play();
            setTimeout(no2, 10000);
        }
        if (cnt == 3 && phonesound.isPlaying == false) {
            phonesound.play();
            setTimeout(no3, 10000);
        }
        if (cnt == 4 && speakersound.isPlaying == false) {
            speakersound.play();
            setTimeout(no4, 10000);
        }
    }

    function no1() {
            aclocksound.stop();
            text.setText("Yikes1");
            stress += 10;
            stressText.setText("Stress: " + stress);
            stressbar.width = (stress / 200);
    }
    function no2() {
            gclocksound.stop();
            text.setText("Yikes2");
            stress += 10;
            stressText.setText("Stress: " + stress);
            stressbar.width = (stress / 200);
    }
    function no3() {
            phonesound.stop();
            text.setText("Yikes3");
            stress += 10;
            stressText.setText("Stress: " + stress);
            stressbar.width = (stress / 200);
    }
    function no4() {
            speakersound.stop();
            text.setText("Yikes4");
            stress += 10;
            stressText.setText("Stress: " + stress);
            stressbar.width = (stress / 200);
    }

    function aclockPress() {
        
        if (aclocksound.isPlaying == true) {
            text.setText("Good 1!");
            aclocksound.stop();
        }
    }

    function gclockPress() {

        if (gclocksound.isPlaying == true) {
            text.setText("Good 2 !");
            gclocksound.stop();
        }
    }

    function phonePress() {

        if (phonesound.isPlaying == true) {
            text.setText("Bad!");
            stress = 200;
            stressbar.width = (stress / 200);
            phonesound.stop();
        }

    }

    function speakerPress() {

        if (speakersound.isPlaying == true) {
            text.setText("Good 3!");
            speakersound.stop();
        }
    }

    function laptopPress() {
        
    }

    function gameover() {
        game.paused = true;
    }
};
