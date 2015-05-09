var style = { font: "40px Lucidatypewriter, monospace", fill: "#ffffff", align: "center" };

Player = function (game, terrain) {
    this.health = 100;
    this.score = 0;
    var tank;
    this.game = game;
    this.terrain = terrain;
    this.has_moved = false;

    this.sprite = tank = game.add.sprite(0, 0, 'vega');
    tank.anchor.setTo(0.5, 0.5);
    tank.animations.add('move', ["vega1.png", "vega2.png", "vega3.png", "vega4.png", "vega5.png", "vega6.png", "vega7.png", "vega8.png", "vega9.png", "vaga10.png", "vega11.png", "vega12.png", "vega14.png", "vega1.png"], 10, false);
    tank.animations.add('dead', ["vega20.png"], 10, false);


    this.effect = game.add.sprite(0, 0, 'effects');
    this.effect.anchor.setTo(0.5, 0.5);
    this.effect.animations.add('effects');
    this.effect_timer = 0;

    game.physics.enable(tank, Phaser.Physics.ARCADE);
    tank.body.maxVelocity.setTo(400, 400);
    tank.body.collideWorldBounds = true;
    this.start_x = 800;
    this.start_y = 820;
    tank.position.set(this.start_x,this.start_y)
}

Player.prototype.update = function(cursors, bulls) {
    var tank = this.sprite;
    var _this = this;

    if (this.effect_timer > 0) {
        this.effect_timer -= 1;
        if (this.effect_timer == 0) {
            this.effect.visible = false;
        }
    }


    if (this.health > 0) {
        if (cursors.left.isDown) tank.body.velocity.x = -200;
        if (cursors.right.isDown) tank.body.velocity.x = 200;
        if (cursors.up.isDown) tank.body.velocity.y = -200;
        if (cursors.down.isDown) tank.body.velocity.y = 200;
        if (jumpButton.isDown) {
            _.each(bulls, function(bull) { 
                var angle = game.physics.arcade.moveToObject(bull.sprite, _this.sprite.body, 300);
                tank.animations.frameName = "vega21.png";
                if (player.health > 0 && bulls.length > 0) {
                    player.score += 10;
                }});
        }        
        if ((Math.abs(tank.body.velocity.x) > 5) || (Math.abs(tank.body.velocity.y) > 5)) {
            tank.animations.play('move', 10, false);
        }
    } else {
        tank.animations.frameName = "vega20.png";
    }

    if (tank.body.velocity.x != 0 || tank.body.velocity.y != 0) {
        this.has_moved = true;
    }

    tank.body.velocity.x *= 0.8;
    tank.body.velocity.y = tank.body.velocity.y * 0.8;


    var _this = this;
    var effect_callback = function(p1, p2) {
        if (_this.effect_timer > 0) return;
        _this.effect.reset(p1.x, p1.y);
        _this.effect.frame = Math.floor(Math.random() * 11) + 1;
        _this.effect_timer = 30;
        if (_this.health > 0) _this.health -= 10;
    }

    this.game.physics.arcade.collide(tank, _.map(bulls, function(bull) { return bull.sprite; }), effect_callback);
    this.game.physics.arcade.collide(tank, layer);
}

Bull = function (game, terrain) {
    var sprite;
    this.game = game;
    this.terrain = terrain;
    this.sprite = sprite = game.add.sprite(1500, 820, 'bull');
    sprite.animations.add('run');
    sprite.animations.play('run', 15, true);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.velocity.x = -200;
    sprite.body.velocity.y = 4;
    sprite.body.collideWorldBounds = true;
    sprite.anchor.setTo(0.5, 0.5);
    sprite.body.bounce.setTo(1, 1);

    this.effect = game.add.sprite(0, 0, 'effects');
    this.effect.anchor.setTo(0.5, 0.5);
    this.effect.animations.add('effects');
    this.effect_timer = 0;
}


Bull.prototype.update = function(bulls, player) {
    var angleBetween = this.game.physics.arcade.angleBetween;
    var sprite = this.sprite;
    var body = sprite.body;
    var other_sprites = _.map(bulls, function(bull) { return bull.sprite; });

    if (this.effect_timer > 0) {
        this.effect_timer -= 1;
        if (this.effect_timer == 0) {
            this.effect.visible = false;
        }
    }

    sprite.rotation = angleBetween(body.velocity, {"x":0, "y":0})

    sprite.scale.y = (body.velocity.x > 0) ? -0.5 : 0.5;
    sprite.scale.x = 0.5;        

    if (body.velocity.getMagnitude() < 200) {
        body.velocity.x = Math.random() * 200 + 100;
        body.velocity.y = Math.random() * 200 + 100;
    }

    var _this = this;
    var effect_callback = function(p1, p2) {
        if (_this.effect_timer > 0) return;
        _this.effect.reset(p1.x, p1.y);
        _this.effect.frame = Math.floor(Math.random() * 11) + 1;
        _this.effect_timer = 30;
    }

    this.game.physics.arcade.collide(sprite, other_sprites, effect_callback);
    this.game.physics.arcade.collide(sprite, this.terrain);

}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
var game_state = "intro";
var land;
var cursors;
var jumpButton;
var player;
var bulls = [];
var timer = 0;
var t;

function preload () {
    // characters and effects
    game.load.atlasJSONHash('bull', '/static/journal/running_of_the_bulls/static/assets/bulls.png', '/static/journal/running_of_the_bulls/static/assets/bull.json');
    game.load.atlasJSONHash('vega', '/static/journal/running_of_the_bulls/static/assets/vega.png', '/static/journal/running_of_the_bulls/static/assets/vega.json');
    game.load.atlasJSONHash('effects', '/static/journal/running_of_the_bulls/static/assets/effects.png', '/static/journal/running_of_the_bulls/static/assets/effect.json');

    // background
    game.load.image('earth', '/static/journal/running_of_the_bulls/static/assets/scorched_earth.png');

    // map 
    game.load.tilemap('land-tilemap', '/static/journal/running_of_the_bulls/static/assets/land.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('fence', '/static/journal/running_of_the_bulls/static/assets/fence.png');
}



function create () {
    // create background
    land = game.add.tileSprite(0, 0, 800, 600, 'earth');
    land.fixedToCamera = true;
    
    // load a map
    map = game.add.tilemap('land-tilemap');
    map.addTilesetImage('fence');

    // everything the isn't empty 
    map.setCollisionByExclusion([0]);
    
    // create a layer
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
    
    // create a player 
    player = new Player(game, layer);

    // create inital bull
    // bulls = _.map(_.range(1), function(_) { return new Bull(game, layer); });

    game.camera.follow(player.sprite);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(player.start_x, player.start_y);

    // setup input 
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    t = game.add.text(100, 100, "hsdfsd", style);
    t.fixedToCamera = true;
}

function update () {
    // update the bulls
    _.each(bulls, function(bull) { bull.update(bulls, player) });

    // update the player
    player.update(cursors, bulls);
    timer += 1;
    // add a bull every 1000 points, if we haven't already
    // first bull added in the into.
    if (player.score % 1000 == 0 && 
        bulls.length < player.score / 1000 &&
        bulls.length != 0)  {
        bulls.push(new Bull(game, layer)); 
    }

    if (game_state == "intro") {
        t.text = "Press the Arrow Keys";
    }

    if (game_state == "intro" && bulls.length == 0 && player.has_moved) {
        //t.destroy()
        game_state = "moving";
        t.text = "Great, you can move!";
        timer = 0;
    }

    if (game_state == "moving" && timer > 300) {
        game_state = "first_bull";
        t.text = "Watch out for that bull!";
        timer = 0;
        bulls.push(new Bull(game, layer)); 
    }

    if (game_state == "first_bull" && timer > 500) {
        game_state = "taunt-1";
        t.text = "Taunt to get points..";
        timer = 0;
    }

    if (game_state == "taunt-1" && timer > 200) {
        game_state = "taunt-2";
        t.text = "Taunt to get points..\nbut watch out!";
        timer = 0;
    }

    if (game_state == "taunt-2" && timer > 200) {
        game_state = "taunt-3";
        t.text = "Spacebar to taunt";
        timer = 0;
    }

    if (game_state == "taunt-3" && timer > 400) {
        game_state = "first-1000";
        t.text = "";
        timer = 0;
    }

    if (game_state == "first-1000" && player.score > 1000) {
        game_state = "first-2000";
        t.text = "Your getting it!";
        timer = 0;
    }
    
    if (game_state == "first-2000" && timer > 300) {
        game_state = "playing";
        t.text = "";
        timer = 0;
    }

    if (game_state == "playing" && player.score % 1000 == 0) {
        game_state = "multibull";
        t.text = "MULTI-BULL!";
        timer = 0;
    }

    if (game_state == "multibull" && timer > 200) {
        game_state = "playing";
        t.text = "";
        timer = 0;
    }

    if (player.health == 0) {
        game_state = "gameover";
        t.text = "Game Over";
        timer = 0;
    }


    timer += 1


    // sync camera and land
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
}

function render () {
    game.debug.text("Health : " + player.health + "%", 32, 32);
    game.debug.text("Score  : " + player.score, 32, 52);
}


