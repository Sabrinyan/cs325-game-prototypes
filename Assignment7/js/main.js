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

    var c1, c1X, c1Y;
    var c2, c2X, c2Y;
    var match;
    var cntClick;

    var turn, p1, p2;
    var textTurn, textP1, textP2;

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
        match = false;
        turn = 1;
        p1 = 0; p2 = 0;
        
        petNames();
        ranCards();
        assignPets();

        bGroup = game.add.group();
        assignBack();

        textTurn = game.add.text(game.world.centerX, 25, "Player " + turn + "'s turn!", { font: "25px Arial", fill: "#9999ff", align: "center" });
        textTurn.anchor.setTo(0.5, 0.5);
        textP1 = game.add.text(75, 25, "P1 Score: " + p1, { font: "25px Arial", fill: "#9999ff", align: "center" });
        textP1.anchor.setTo(0.5, 0.5);
        textP2 = game.add.text(630, 25, "P2 Score: " + p2, { font: "25px Arial", fill: "#9999ff", align: "center" });
        textP2.anchor.setTo(0.5, 0.5);
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
            petMatch();
            bGroup.forEach(function (back) {
                back.inputEnabled = false;
            });
            game.time.events.add(Phaser.Timer.SECOND * 3, reset, this);
        }

        if (p1 + p2 == 10) {
            win();
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
    }

    function reset() {

        if (match && turn == 1) {
            p1++;
            turn = 2;
            c1.destroy();
            c2.destroy();
            textP1.setText("P1 Score: " + p1);
        }
        else if (match && turn == 2) {
            p2++;
            turn = 1;
            c1.destroy();
            c2.destroy();
            textP2.setText("P2 Score: " + p2);
        }
        else {

            if (turn == 1)
                turn = 2;
            else
                turn = 1;

            bGroup.create(c1X, c1Y, 'back');
            bGroup.create(c2X, c2Y, 'back');
        }

        textTurn.setText("Player " + turn + "'s turn!");
        bGroup.forEach(function (back) {
            back.inputEnabled = true;
        });
    }

    function petMatch() {

        for (var i = 0; i < pets.length; i++) {

            if (pets[i].x == c1X && pets[i].y == c1Y)
                c1 = pets[i];
            if (pets[i].x == c2X && pets[i].y == c2Y)
                c2 = pets[i];
        }

        if ((c1 == bun1 && c2 == bun2) || (c1 == bun2 && c2 == bun1))
            match = true;
        else if (c1 == cat1 && c2 == cat2 || (c1 == cat2 && c2 == cat1))
            match = true;
        else if (c1 == chin1 && c2 == chin2 || (c1 == chin2 && c2 == chin1))
            match = true;
        else if (c1 == dog1 && c2 == dog2 || (c1 == dog2 && c2 == dog1))
            match = true;
        else if (c1 == frog1 && c2 == frog2 || (c1 == frog2 && c2 == frog1))
            match = true;
        else if (c1 == ham1 && c2 == ham2 || (c1 == ham2 && c2 == ham1))
            match = true;
        else if (c1 == mous1 && c2 == mous2 || (c1 == mous2 && c2 == mous1))
            match = true;
        else if (c1 == pig1 && c2 == pig2 || (c1 == pig2 && c2 == pig1))
            match = true;
        else if (c1 == snak1 && c2 == snak2 || (c1 == snak2 && c2 == snak1))
            match = true;
        else if (c1 == spid1 && c2 == spid2 || (c1 == spid2 && c2 == spid1))
            match = true;
        else
            match = false;
    }

    function win() {

        if (p1 > p2)
            textTurn.setText("Player 1 wins!");
        else
            textTurn.setText("Player 2 wins!");
    }
};
