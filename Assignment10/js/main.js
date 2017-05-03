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
    var game = new Phaser.Game(1500, 1000, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    var maze;
    var heart;
    var star;
    var butt;

    var step1; //size of movement for going up and down
    var step2; //size of movement for going left and right

    var up, down, left, right;

    var ol;
    var text;

    var hx, hy;
    var sx, sy;
    var mArray = [
        [2, 24, 34, 34, 234, 34, 34, 34, 234, 34, 34, 23, 24, 34, 34, 34, 34, 34, 34, 34, 23],
        [12, 12, 24, 23, 14, 34, 23, 2, 14, 23, 2, 12, 12, 4, 34, 34, 34, 34, 234, 23, 12],
        [12, 12, 12, 124, 234, 23, 12, 14, 23, 12, 12, 12, 14, 34, 34, 34, 34, 23, 12, 12, 12],
        [12, 124, 123, 12, 12, 124, 1234, 234, 123, 12, 12, 12, 24, 34, 34, 34, 34, 123, 12, 14, 123],
        [12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 12, 12, 1, 3, 24, 34, 34, 13, 12, 24, 13],
        [12, 12, 12, 12, 12, 12, 12, 12, 12, 24, 134, 134, 34, 34, 13, 24, 34, 34, 123, 14, 23],
        [14, 13, 12, 14, 13, 12, 12, 12,  12, 12, 4, 34, 34, 234, 34, 13, 24, 3, 12, 24, 123],
        [24, 34, 134, 34, 34, 13, 1, 12, 12, 12, 24, 34, 23, 12, 24, 34, 13, 24, 13, 12, 12],
        [14, 34, 34, 34, 234, 34, 3, 12, 12, 12, 14, 3, 12, 12, 14, 34, 34, 123, 24, 123, 12],
        [24, 234, 34, 234, 134, 34, 34, 1234, 13, 14, 34, 34, 13, 14, 34, 34, 23, 12, 12, 12, 12],
        [12, 12, 2, 12, 24, 234, 34, 13, 24, 34, 34, 34, 34, 234, 234, 234, 13, 12, 14, 123, 12],
        [12, 12, 12, 12, 12, 124, 34, 34, 13, 24, 34, 34, 34, 13, 12, 14, 23, 14, 23, 12, 12],
        [12, 14, 134, 13, 12, 124, 34, 34, 34, 1234, 34, 34, 34, 34, 1234, 34, 1234, 34, 13, 12, 12],
        [124, 34, 34, 34, 13, 14, 34, 34, 23, 124, 34, 34, 34, 3, 12, 2, 124, 3, 24, 13, 12],
        [12, 24, 34, 34, 34, 34, 34, 34, 13, 124, 34, 34, 34, 23, 12, 124, 13, 24, 13, 24, 123],
        [12, 14, 34, 34, 234, 34, 34, 34, 34, 134, 234, 34, 23, 12, 12, 12, 24, 13, 24, 13, 12],
        [14, 34, 34, 3, 12, 24, 234, 34, 234, 23, 12, 2, 12, 12, 12, 1, 12, 24, 1234, 34, 13],
        [24, 23, 24, 23, 12, 12, 12, 24, 13, 12, 12, 12, 12, 14, 134, 34, 123, 12, 14, 34, 23],
        [12, 14, 13, 14, 13, 1, 12, 14, 34, 123, 14, 134, 134, 34, 34, 3, 12, 14, 34, 34, 123],
        [14, 34, 34, 34, 34, 34, 134, 34, 3, 14, 34, 34, 34, 34, 34, 34, 134, 34, 34, 3, 1],
    ];
    var roll, cnt;
    var turn; //1 = p1 ; 2 = p2

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image('maze', 'assets/maz.png');
        game.load.image('maz', 'assets/maz.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('star', 'assets/star.png');

        game.load.image('butt', 'assets/slurp.png');

        //game.load.physics('maze_phys', 'assets/maze_test.json');
    }
    
    function create() {

        step1 = 50;
        step2 = 52.5;
        cnt = -1;
        hx = 0;
        hy = 0;
        sx = 0;
        sy = 0;
        turn = Math.floor((Math.random() * 2) + 1);

        game.stage.backgroundColor = '#ffffff';

        maze = game.add.sprite(0, 0, 'maze');
        heart = game.add.sprite(25, 25, 'heart');
        star = game.add.sprite(25, 25, 'star');
        heart.anchor.setTo(0.5, 0.5);
        star.anchor.setTo(0.5, 0.5);

        butt = game.add.button(1300, game.world.centerY, 'butt', actionOnClick, this);
        butt.scale.setTo(0.5, 0.5);
        butt.anchor.setTo(0.5, 0.5);

        up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        up.onDown.add(goUp, this);
        down.onDown.add(goDown, this);
        left.onDown.add(goLeft, this);
        right.onDown.add(goRight, this);

        text = game.add.text(1300, game.world.centerY + 125, "Player " + turn + " it's your turn!" , { font: "25px Arial", fill: "#9999ff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
    }
    
    function update() {

        if (hx == 20 && hy == 19) {
            win(1);
        }
        else if (sx == 20 && sy == 19) {
            win(2);
        }
    }

    function goUp() {

        if (cnt != -1 && cnt < roll) {
            if (turn == 1) {
                if (mArray[hy][hx] == 1 || mArray[hy][hx] == 12 || mArray[hy][hx] == 13 || mArray[hy][hx] == 14 || mArray[hy][hx] == 123 || mArray[hy][hx] == 124 || mArray[hy][hx] == 134 || mArray[hy][hx] == 1234) {
                    if (hy - 1 >= 0) {
                        heart.y -= step1;
                        hy--;
                    }
                    cnt++;
                }
            }
            else {
                if (mArray[sy][sx] == 1 || mArray[sy][sx] == 12 || mArray[sy][sx] == 13 || mArray[sy][sx] == 14 || mArray[sy][sx] == 123 || mArray[sy][sx] == 124 || mArray[sy][sx] == 134 || mArray[sy][sx] == 1234) {
                    if (sy - 1 >= 0) {
                        star.y -= step1;
                        sy--;
                    }
                    cnt++;
                }
            }
        }
    }

    function goDown() {

        if (cnt != -1 && cnt < roll) {
            if (turn == 1) {
                if (mArray[hy][hx] == 2 || mArray[hy][hx] == 12 || mArray[hy][hx] == 23 || mArray[hy][hx] == 24 || mArray[hy][hx] == 123 || mArray[hy][hx] == 124 || mArray[hy][hx] == 234 || mArray[hy][hx] == 1234) {
                    if (hy + 1 <= 19) {
                        heart.y += step1;
                        hy++;
                    }
                    cnt++;
                }
            }
            else {
                if (mArray[sy][sx] == 2 || mArray[sy][sx] == 12 || mArray[sy][sx] == 23 || mArray[sy][sx] == 24 || mArray[sy][sx] == 123 || mArray[sy][sx] == 124 || mArray[sy][sx] == 234 || mArray[sy][sx] == 1234) {
                    if (sy + 1 <= 19) {
                        star.y += step1;
                        sy++;
                    }
                    cnt++;
                }
            }
        }
    }

    function goLeft() {

        if (cnt != -1 && cnt < roll) {
            if (turn == 1) {
                if (mArray[hy][hx] == 3 || mArray[hy][hx] == 13 || mArray[hy][hx] == 23 || mArray[hy][hx] == 34 || mArray[hy][hx] == 123 || mArray[hy][hx] == 134 || mArray[hy][hx] == 234 || mArray[hy][hx] == 1234) {
                    if (hx - 1 >= 0) {
                        heart.x -= step2;
                        hx--;
                    }
                    cnt++;
                }
            }
            else {
                if (mArray[sy][sx] == 3 || mArray[sy][sx] == 13 || mArray[sy][sx] == 23 || mArray[sy][sx] == 34 || mArray[sy][sx] == 123 || mArray[sy][sx] == 134 || mArray[sy][sx] == 234 || mArray[sy][sx] == 1234) {
                    if (sx - 1 >= 0) {
                        star.x -= step2;
                        sx--;
                    }
                    cnt++;
                }
            }
        }
    }

    function goRight() {

        if (cnt != -1 && cnt < roll) {
            if (turn == 1) {
                if (mArray[hy][hx] == 4 || mArray[hy][hx] == 14 || mArray[hy][hx] == 24 || mArray[hy][hx] == 34 || mArray[hy][hx] == 124 || mArray[hy][hx] == 134 || mArray[hy][hx] == 234 || mArray[hy][hx] == 1234) {
                    if (hx + 1 <= 20) {
                        heart.x += step2;
                        hx++;
                    }
                    cnt++;
                }
            }
            else {
                if (mArray[sy][sx] == 4 || mArray[sy][sx] == 14 || mArray[sy][sx] == 24 || mArray[sy][sx] == 34 || mArray[sy][sx] == 124 || mArray[sy][sx] == 134 || mArray[sy][sx] == 234 || mArray[sy][sx] == 1234) {
                    if (sx + 1 <= 20) {
                        star.x += step2;
                        sx++;
                    }
                    cnt++;
                }
            }
        }
    }

    function actionOnClick() {

        if (cnt == roll && turn == 1)
            turn = 2;
        else if (cnt == roll && turn == 2)
            turn = 1;

        if (cnt == roll || cnt == -1) {
            roll = Math.floor((Math.random() * 6) + 1);
            text.setText("Player " + turn + " you rolled a " + roll);
            cnt = 0;

        }
    }

    function win(winner) {
        
        game.input.enabled = false;

        if (winner == 1)
            text.setText("Player 1 wins!");
        else
            text.setText("Player 2 wins!");
    }
};
