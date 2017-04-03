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
    var game = new Phaser.Game(705, 775, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    var bun1, bun2;
    var cat1, cat2;
    var chin1, chin2;
    var dog1, dog2;
    var frog1, frog2;
    var ham1, ham2;
    var mous1, mous2;
    var pig1, pig2;
    var snak1, snak2;
    var spid1, spid2;
    
    var pets;
    var bGroup;
    var xLoc = [10, 149, 288, 427, 566];
    var yLoc = [50, 232, 414, 596];

    var f = false; //ensures that it is truly clicked on for a moment!

    var c1X, c1Y;
    var c2X, c2Y;
    var cntClick;

    var text;

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('bunny1', 'assets/bunny1.png');
        game.load.image('bunny2', 'assets/bunny2.png');
        game.load.image('cat1', 'assets/cat1.png');
        game.load.image('cat2', 'assets/cat2.png');
        game.load.image('chinchilla1', 'assets/chinchilla1.png');
        game.load.image('chinchilla2', 'assets/chinchilla2.png');
        game.load.image('dog1', 'assets/dog1.png');
        game.load.image('dog2', 'assets/dog2.png');
        game.load.image('frog1', 'assets/frog1.png');
        game.load.image('frog2', 'assets/frog2.png');
        game.load.image('hamster1', 'assets/hamster1.png');
        game.load.image('hamster2', 'assets/hamster2.png');
        game.load.image('mouse1', 'assets/mouse1.png');
        game.load.image('mouse2', 'assets/mouse2.png');
        game.load.image('pig1', 'assets/pig1.png');
        game.load.image('pig2', 'assets/pig2.png');
        game.load.image('snake1', 'assets/snake1.png');
        game.load.image('snake2', 'assets/snake2.png');
        game.load.image('spider1', 'assets/spider1.png');
        game.load.image('spider2', 'assets/spider2.png');
        game.load.image('back', 'assets/back.png');
    }
    
    function create() {

        cntClick = 0;

        petNames();
        ranCards();
        assignPets();

        bGroup = game.add.group();
        assignBack();
        text = game.add.text(game.world.centerX, 25, "Hey brutha", { font: "25px Arial", fill: "#9999ff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
    }
    
    function update() {
        

        bGroup.forEach(function (back) {
            if (cntClick < 2) {
                back.events.onInputDown.add(check, { bKill: back });
                f = false;
            }
        });

        if (cntClick == 2) {
            cntClick = 0;
            bGroup.forEach(function (back) {
                back.inputEnabled = false;
            });
            game.time.events.add(Phaser.Timer.SECOND * 3, reset, this);
        }
    }

    function petNames() {

        bun1 = game.add.sprite(0, 0, 'bunny1');
        bun2 = game.add.sprite(0, 0, 'bunny2');
        cat1 = game.add.sprite(0, 0, 'cat1');
        cat2 = game.add.sprite(0, 0, 'cat2');
        chin1 = game.add.sprite(0, 0, 'chinchilla1');
        chin2 = game.add.sprite(0, 0, 'chinchilla2');
        dog1 = game.add.sprite(0, 0, 'dog1');
        dog2 = game.add.sprite(0, 0, 'dog2');
        frog1 = game.add.sprite(0, 0, 'frog1');
        frog2 = game.add.sprite(0, 0, 'frog2');
        ham1 = game.add.sprite(0, 0, 'hamster1');
        ham2 = game.add.sprite(0, 0, 'hamster2');
        mous1 = game.add.sprite(0, 0, 'mouse1');
        mous2 = game.add.sprite(0, 0, 'mouse2');
        pig1 = game.add.sprite(0, 0, 'pig1');
        pig2 = game.add.sprite(0, 0, 'pig2');
        snak1 = game.add.sprite(0, 0, 'snake1');
        snak2 = game.add.sprite(0, 0, 'snake2');
        spid1 = game.add.sprite(0, 0, 'spider1');
        spid2 = game.add.sprite(0, 0, 'spider2');

        pets = [bun1, bun2, cat1, cat2, chin1, chin2, dog1, dog2, frog1, frog2, ham1, ham2, mous1, mous2, pig1, pig2, snak1, snak2, spid1, spid2];
    }

    function ranCards() {

        var ran;
        var temp;
        var cur = pets.length;
        
        while (cur != 0) {
            ran = Math.floor(Math.random() * cur);
            cur--;

            temp = pets[cur];
            pets[cur] = pets[ran];
            pets[ran] = temp;
        }
    }

    function assignPets() {
        
        var cnt = 0;
        var i; //x position
        var j; //y position

        for (i = 0; i < 5; i++) {
            for (j = 0; j < 4; j++) {
                pets[cnt].x = xLoc[i];
                pets[cnt].y = yLoc[j];
                cnt++;
            }
        }
    }

    function assignBack() {

        var i;
        var j;

        for (i = 0; i < 5; i++) {
            for (j = 0; j < 4; j++) {
                bGroup.create(xLoc[i], yLoc[j], 'back');
            }
        }

        bGroup.forEach(function (back) {
            back.inputEnabled = true;
        });
    }

    function check() {

        if (!f && cntClick == 0) {
            c1X = this.bKill.x;
            c1Y = this.bKill.y;
            this.bKill.kill();
            cntClick++;
            f = true;
        }
        if (!f && cntClick == 1) {
            c2X = this.bKill.x;
            c2Y = this.bKill.y;
            this.bKill.kill();
            cntClick++;
            f = true;
        }
        
        text.setText(cntClick);
    }

    function reset() {
        bGroup.create(c1X, c1Y, 'back');
        bGroup.create(c2X, c2Y, 'back');
        text.setText(cntClick);
        bGroup.forEach(function (back) {
            back.inputEnabled = true;
        });
    }
};
