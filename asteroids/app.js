(function() {
  var Asteroid, Element, Game, GameMechanics, HEIGHT, Input, MathHelpers, Missile, Ship, Vector, WIDTH;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  HEIGHT = 600;
  WIDTH = 900;
  Vector = (function() {
    function Vector(x, y) {
      this.x = x;
      this.y = y;
    }
    Vector.prototype.add = function(other) {
      return new Vector(this.x + other.x, this.y + other.y);
    };
    Vector.prototype.multiply = function(other) {
      return new Vector(this.x * other.x, this.y * other.y);
    };
    Vector.prototype.divide = function(other) {
      return new Vector(this.x * other.x, this.y * other.y);
    };
    Vector.prototype.scale = function(scale) {
      return new Vector(this.x * scale, this.y * scale);
    };
    Vector.prototype.clone = function() {
      return new Vector(this.x, this.y);
    };
    return Vector;
  })();
  Input = (function() {
    function Input() {
      this.keys = {};
      document.onkeyup = __bind(function(event) {
        return this.keyup(event);
      }, this);
      document.onkeydown = __bind(function(event) {
        return this.keydown(event);
      }, this);
    }
    Input.prototype.charCode = function(event) {
      if (event.keyCode !== null) {
        return String.fromCharCode(event.keyCode);
      } else if (event.which !== 0 && event.charCode !== 0) {
        return String.fromCharCode(event.which);
      }
    };
    Input.prototype.key = function(event) {
      var c;
      c = this.charCode(event).toLowerCase();
      if ("jkdf".indexOf(c) >= 0) {
        return c;
      }
    };
    Input.prototype.keyup = function(event) {
      var k;
      k = this.key(event);
      if (k) {
        return this.keys[k] = false;
      }
    };
    Input.prototype.keydown = function(event) {
      var k;
      k = this.key(event);
      if (k) {
        if (this.onkey) {
          this.onkey(k);
        }
        return this.keys[k] = true;
      }
    };
    return Input;
  })();
  MathHelpers = (function() {
    function MathHelpers() {}
    MathHelpers.prototype.fromAngle = function(theta) {
      var x, y;
      x = Math.sin(theta);
      y = Math.cos(theta);
      return new Vector(x, y);
    };
    MathHelpers.prototype.distance = function(a, b) {
      return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    };
    MathHelpers.prototype.hitTest = function(a, b) {
      var size;
      size = a.size + b.size;
      return this.distance(a.position, b.position) < Math.pow(size, 2);
    };
    return MathHelpers;
  })();
  Element = (function() {
    __extends(Element, MathHelpers);
    function Element() {
      this.angle = 0;
      this.velocity = new Vector(0, 0);
      this.size = 30;
      this.position = new Vector(0, 0);
    }
    Element.prototype.move = function() {
      this.position = this.position.add(this.velocity);
      if (this.velocity.x > 0 && this.position.x > (WIDTH + this.size / 1)) {
        this.position.x = 0 - (this.size / 1);
      }
      if (this.velocity.y > 0 && this.position.y > (HEIGHT + this.size / 1)) {
        this.position.y = 0 - (this.size / 1);
      }
      if (this.velocity.x < 0 && this.position.x < (-this.size / 1)) {
        this.position.x = WIDTH + (this.size / 1);
      }
      if (this.velocity.y < 0 && this.position.y < (-this.size / 1)) {
        return this.position.y = HEIGHT + (this.size / 1);
      }
    };
    Element.prototype.calcPoint = function(angle, size) {
      var direction, scaled, translated;
      direction = this.fromAngle(this.angle + angle);
      scaled = direction.scale(size);
      return translated = scaled.add(this.position);
    };
    Element.prototype.direction = function() {
      return this.fromAngle(this.angle);
    };
    return Element;
  })();
  Missile = (function() {
    __extends(Missile, Element);
    function Missile() {
      Missile.__super__.constructor.apply(this, arguments);
      this.size = 2;
      this.timetolive = 100;
    }
    Missile.prototype.move = function() {
      this.timetolive--;
      if (this.timetolive === 0 && this.onexpire) {
        this.onexpire(this);
      }
      return Missile.__super__.move.apply(this, arguments);
    };
    Missile.prototype.render = function(canvas) {
      var nose;
      canvas.save();
      canvas.beginPath();
      canvas.moveTo(this.position.x, this.position.y);
      nose = this.calcPoint(0, 3);
      canvas.lineTo(nose.x, nose.y);
      canvas.stroke();
      return canvas.restore();
    };
    return Missile;
  })();
  Ship = (function() {
    __extends(Ship, Element);
    function Ship() {
      this.input = new Input;
      this.input.onkey = __bind(function(key) {
        if (key === 'f' && this.onfire) {
          return this.onfire(this);
        }
      }, this);
      Ship.__super__.constructor.apply(this, arguments);
      this.size = 1;
    }
    Ship.prototype.reset = function() {
      this.position.x = WIDTH / 2;
      this.position.y = HEIGHT / 2;
      this.velocity.x = 0;
      this.velocity.y = 0;
      return this.angle = Math.PI;
    };
    Ship.prototype.accelerate = function() {
      this.acceleration = this.direction().scale(0.2);
      this.velocity = this.velocity.add(this.acceleration);
      return this.restrictVelocity();
    };
    Ship.prototype.restrictVelocity = function() {
      var max, ratio, speed;
      speed = this.distance(new Vector(0, 0), this.velocity);
      max = Math.pow(3, 2);
      if (speed >= max) {
        ratio = max / speed;
        return this.velocity = this.velocity.scale(ratio);
      }
    };
    Ship.prototype.move = function() {
      if (this.input.keys['j']) {
        this.angle += 0.1;
      }
      if (this.input.keys['k']) {
        this.angle -= 0.1;
      }
      if (this.input.keys['d']) {
        this.accelerate();
      }
      return Ship.__super__.move.apply(this, arguments);
    };
    Ship.prototype.render = function(canvas) {
      var nose, wing1, wing2;
      canvas.save();
      canvas.beginPath();
      wing1 = this.calcPoint(3 * Math.PI / 4, 10);
      nose = this.calcPoint(0, 10);
      wing2 = this.calcPoint(-3 * Math.PI / 4, 10);
      canvas.moveTo(wing1.x, wing1.y);
      canvas.lineTo(nose.x, nose.y);
      canvas.lineTo(wing2.x, wing2.y);
      canvas.lineTo(wing1.x, wing1.y);
      canvas.stroke();
      return canvas.restore();
    };
    return Ship;
  })();
  Asteroid = (function() {
    __extends(Asteroid, Element);
    function Asteroid() {
      Asteroid.__super__.constructor.apply(this, arguments);
    }
    Asteroid.prototype.move = function() {
      this.angle += 0.05;
      return Asteroid.__super__.move.apply(this, arguments);
    };
    Asteroid.prototype.edge = function(number, total) {
      var theta;
      theta = number * (2 * Math.PI / (total + 1));
      return this.calcPoint(theta, this.size);
    };
    Asteroid.prototype.render = function(canvas) {
      var next, number, start;
      canvas.save();
      canvas.beginPath();
      start = this.edge(0, 6);
      canvas.moveTo(start.x, start.y);
      for (number = 1; number <= 6; number++) {
        next = this.edge(number, 6);
        canvas.lineTo(next.x, next.y);
      }
      canvas.lineTo(start.x, start.y);
      canvas.stroke();
      return canvas.restore();
    };
    return Asteroid;
  })();
  GameMechanics = (function() {
    __extends(GameMechanics, MathHelpers);
    function GameMechanics(context) {
      this.ctx = context;
      this.asteroids = this.createAsteroids(3);
      this.missiles = [];
      this.ship = this.createShip();
    }
    GameMechanics.prototype.createMissile = function() {
      var missile;
      if (this.missiles.length < 10) {
        missile = new Missile;
        missile.position = this.ship.calcPoint(0, 10);
        missile.velocity = this.ship.direction().scale(4);
        missile.onexpire = __bind(function(m) {
          return this.missiles.splice(this.missiles.indexOf(m), 1);
        }, this);
        return this.missiles.push(missile);
      }
    };
    GameMechanics.prototype.createShip = function() {
      var ship;
      ship = new Ship;
      ship.onfire = __bind(function(ship) {
        console.log("fire");
        if (this.playing) {
          return this.createMissile();
        } else {
          return this.start();
        }
      }, this);
      return ship;
    };
    GameMechanics.prototype.createAsteroid = function() {
      var angle, b, direction, speed;
      b = new Asteroid;
      speed = 0.3 + Math.random() * 2;
      angle = Math.random() * 2 * Math.PI;
      direction = this.fromAngle(angle);
      b.velocity = direction.scale(speed);
      if (Math.random() > 0.5) {
        b.position = new Vector(Math.random() * WIDTH, -30);
      } else {
        b.position = new Vector(-30, Math.random() * HEIGHT);
      }
      return b;
    };
    GameMechanics.prototype.createAsteroids = function(number) {
      var _, _results;
      _results = [];
      for (_ = 1; 1 <= number ? _ <= number : _ >= number; 1 <= number ? _++ : _--) {
        _results.push(this.createAsteroid());
      }
      return _results;
    };
    GameMechanics.prototype.spawnAsteroid = function(asteroid) {
      var a;
      a = this.createAsteroid();
      a.position = asteroid.position.clone();
      a.size = asteroid.size / 2;
      return a;
    };
    GameMechanics.prototype.spawnAsteroids = function(asteroid) {
      var _, _results;
      if (asteroid.size > 10) {
        _results = [];
        for (_ = 1; _ <= 3; _++) {
          _results.push(this.spawnAsteroid(asteroid));
        }
        return _results;
      } else {
        return [];
      }
    };
    GameMechanics.prototype.renderAsteroids = function() {
      var asteroid, objects, _i, _len, _results;
      objects = this.asteroids.concat(this.missiles);
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        asteroid = objects[_i];
        asteroid.render(this.ctx);
        _results.push(asteroid.move());
      }
      return _results;
    };
    GameMechanics.prototype.renderShip = function() {
      this.ship.render(this.ctx);
      return this.ship.move();
    };
    GameMechanics.prototype.handleCollisions = function() {
      var asteroid, asteroids, hit, hits, missile, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _results;
      hits = [];
      _ref = this.asteroids;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        asteroid = _ref[_i];
        _ref2 = this.missiles;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          missile = _ref2[_j];
          if (this.hitTest(asteroid, missile)) {
            hits.push({
              asteroid: asteroid,
              missile: missile
            });
          }
        }
      }
      for (_k = 0, _len3 = hits.length; _k < _len3; _k++) {
        hit = hits[_k];
        this.asteroidHit();
        this.asteroids.splice(this.asteroids.indexOf(hit.asteroid), 1);
        this.missiles.splice(this.missiles.indexOf(hit.missile), 1);
        asteroids = this.spawnAsteroids(hit.asteroid);
        this.asteroids = this.asteroids.concat(asteroids);
      }
      _ref3 = this.asteroids;
      _results = [];
      for (_l = 0, _len4 = _ref3.length; _l < _len4; _l++) {
        asteroid = _ref3[_l];
        _results.push(this.hitTest(asteroid, this.ship) ? this.shipHit() : void 0);
      }
      return _results;
    };
    return GameMechanics;
  })();
  Game = (function() {
    __extends(Game, GameMechanics);
    function Game(context) {
      this.score = 0;
      this.level = 0;
      this.lives = 0;
      this.playing = false;
      this.showLevelCounter = 0;
      this.splashCounter = 0;
      Game.__super__.constructor.call(this, context);
    }
    Game.prototype.start = function() {
      this.score = 0;
      this.level = 1;
      this.lives = 3;
      this.playing = true;
      return this.startLevel();
    };
    Game.prototype.startLevel = function() {
      this.asteroids = this.createAsteroids(this.level + 2);
      this.missiles = [];
      this.ship.reset();
      return this.showLevelCounter = 200;
    };
    Game.prototype.clear = function() {
      this.ctx.save();
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
      this.ctx.fillStyle = 'black';
      this.ctx.illStyle = 'black';
      this.ctx.strokeRect(0, 0, WIDTH, HEIGHT);
      return this.ctx.restore();
    };
    Game.prototype.frame = function() {
      this.clear(this.ctx);
      if (this.playing) {
        this.checkLevelComplete();
        this.handleCollisions();
        this.renderShip();
        this.showLevel();
      } else {
        this.showSplash();
      }
      this.renderAsteroids();
      return this.showScore();
    };
    Game.prototype.checkLevelComplete = function() {
      if (this.playing && this.asteroids.length === 0) {
        this.level++;
        return this.startLevel();
      }
    };
    Game.prototype.shipHit = function() {
      this.lives--;
      if (this.lives > 0) {
        return this.startLevel();
      } else {
        return this.playing = false;
      }
    };
    Game.prototype.asteroidHit = function() {
      return this.score += 20;
    };
    Game.prototype.showScore = function() {
      this.ctx.textAlign = "left";
      this.ctx.font = "8pt Monospace";
      this.ctx.fillText("Score " + this.score, 20, 20);
      this.ctx.fillText("Level " + this.level, 20, 30);
      return this.ctx.fillText("Lives " + this.lives, 20, 40);
    };
    Game.prototype.showLevel = function() {
      if (this.showLevelCounter > 0) {
        this.showLevelCounter--;
        this.ctx.textAlign = "center";
        this.ctx.font = "30pt Monospace";
        return this.ctx.fillText("Level " + this.level, WIDTH / 2, (HEIGHT / 2) - 20);
      }
    };
    Game.prototype.showSplash = function(heading, message) {
      var start;
      this.ctx.save();
      this.ctx.textAlign = "center";
      this.ctx.font = "30pt Monospace";
      start = new Vector(WIDTH / 2, HEIGHT / 2);
      this.ctx.fillText("Asteroids", start.x, start.y - 50);
      this.ctx.textAlign = "left";
      this.ctx.font = "14pt Monospace";
      this.ctx.fillText("[j] left", start.x - 60, start.y - 20);
      this.ctx.fillText("[k] right", start.x - 60, start.y + 0);
      this.ctx.fillText("[d] accelerate", start.x - 60, start.y + 20);
      this.ctx.fillText("[f] missiles", start.x - 60, start.y + 40);
      if (this.splashCounter < 20) {
        this.ctx.textAlign = "center";
        this.ctx.font = "14pt Monospace";
        this.ctx.fillText("Insert coin/s to play", start.x, start.y + 90);
      }
      if (this.splashCounter < 0) {
        this.splashCounter = 40;
      }
      this.splashCounter--;
      return this.ctx.restore();
    };
    return Game;
  })();
  window.onload = function() {
    var canvas, ctx, frame, game;
    canvas = document.getElementById("asteroids-canvas");
    ctx = canvas.getContext('2d');
    game = new Game(ctx);
    frame = function() {
      game.frame();
      return setTimeout(frame, 20);
    };
    return frame();
  };
}).call(this);
