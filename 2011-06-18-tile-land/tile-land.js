(function() {
  var Input, KeyboardInput, MouseInput, MouseListener, Timer, Transform, World, addLoadEvent, onLoad;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  KeyboardInput = (function() {
    function KeyboardInput() {
      this.keys = {};
      document.onkeyup = __bind(function(e) {
        this.keys[this.charCode(e)] = false;
        return true;
      }, this);
      document.onkeydown = __bind(function(e) {
        this.keys[this.charCode(e)] = true;
        return true;
      }, this);
    }
    KeyboardInput.prototype.charCode = function(event) {
      var code;
      if (!event) {
        event = window.event;
      }
      code = event.keyCode;
      if (event.charCode && code === 0) {
        code = event.charCode;
      }
      return String.fromCharCode(code).toLowerCase();
    };
    return KeyboardInput;
  })();
  MouseListener = (function() {
    function MouseListener(id, key) {
      var element;
      this.id = id;
      this.key = key;
      element = document.getElementById(this.id);
      element.onmouseup = __bind(function(e) {
        if (this.onmouseup) {
          this.onmouseup(this.key);
        }
        return false;
      }, this);
      element.onmousedown = __bind(function(e) {
        if (this.onmousedown) {
          this.onmousedown(this.key);
        }
        return false;
      }, this);
      element.onclick = __bind(function(e) {
        return false;
      }, this);
    }
    return MouseListener;
  })();
  MouseInput = (function() {
    function MouseInput() {
      this.bindings = [["left", "h"], ["right", "l"], ["up", "j"], ["down", "k"], ["clockwise", "f"], ["anti-clockwise", "d"], ["zoom-in", "z"], ["zoom-out", "x"]];
      this.bind();
      this.keys = {};
    }
    MouseInput.prototype.bind = function() {
      var binding, key, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        key = new MouseListener(binding[0], binding[1]);
        key.onmouseup = __bind(function(key) {
          return this.keys[key] = false;
        }, this);
        _results.push(key.onmousedown = __bind(function(key) {
          return this.keys[key] = true;
        }, this));
      }
      return _results;
    };
    return MouseInput;
  })();
  Input = (function() {
    function Input() {
      this.keyboard = new KeyboardInput;
      this.mouse = new MouseInput;
    }
    Input.prototype.key = function(key) {
      return this.keyboard.keys[key] || this.mouse.keys[key];
    };
    return Input;
  })();
  Timer = (function() {
    function Timer() {
      this.frameTime = 0;
      this.lastLoop = new Date;
      this.thisLoop = new Date;
    }
    Timer.prototype.tick = function() {
      var thisTime;
      this.thisLoop = new Date;
      thisTime = this.thisLoop - this.lastLoop;
      this.frameTime += (thisTime - this.frameTime) / 20;
      return this.lastLoop = this.thisLoop;
    };
    Timer.prototype.framesPerSecond = function() {
      return (1000 / this.frameTime).toFixed(1) + " fps";
    };
    return Timer;
  })();
  Transform = (function() {
    function Transform() {
      this.width = 500;
      this.height = 500;
      this.offsetX = 250;
      this.offsetY = 250;
      this.element = document.getElementById("canvas");
      this.context = this.element.getContext('2d');
      this.timer = new Timer;
    }
    Transform.prototype.render = function(x, y, theta, zoom) {
      var offsetX, offsetY, pX, pY, pageX, pageY, tiles, _ref, _ref2;
      this.timer.tick();
      this.renderBackground();
      this.context.save();
      this.context.translate(this.offsetX, this.offsetY);
      this.context.scale(1 / zoom, 1 / zoom);
      this.context.rotate(theta);
      this.context.translate(-this.offsetX - x, -this.offsetY - y);
      pageX = Math.floor(x / this.width);
      pageY = Math.floor(y / this.height);
      offsetX = pageX * this.width + this.offsetX;
      offsetY = pageY * this.height + this.offsetY;
      tiles = Math.ceil(zoom);
      for (pX = _ref = -tiles; _ref <= tiles ? pX <= tiles : pX >= tiles; _ref <= tiles ? pX++ : pX--) {
        for (pY = _ref2 = -tiles; _ref2 <= tiles ? pY <= tiles : pY >= tiles; _ref2 <= tiles ? pY++ : pY--) {
          this.renderPage(pageX + pX, pageY + pY, offsetX + (this.width * pX), offsetY + (this.height * pY));
        }
      }
      this.context.restore();
      return this.renderOverlay(x, y, theta, zoom);
    };
    Transform.prototype.renderOverlay = function(x, y, theta, zoom) {
      var angle;
      this.context.save();
      this.context.font = "14pt Monospace";
      this.context.fillStyle = "Black";
      this.context.fillText("x = " + Math.round(x * 100) / 100, 10, 20);
      this.context.fillText("y = " + Math.round(y * 100) / 100, 10, 40);
      angle = Math.round(theta * 180 / Math.PI);
      this.context.fillText("theta = " + angle, 10, 60);
      this.context.fillText("zoom = " + Math.round(zoom * 100) / 100, 10, 80);
      this.context.fillText("tiles = " + Math.pow(Math.ceil(zoom) * 2 + 1, 2), 10, 100);
      this.context.fillText("fps = " + this.timer.framesPerSecond(), 10, 120);
      return this.context.restore();
    };
    Transform.prototype.renderPage = function(pageX, pageY, offsetX, offsetY) {
      this.context.textAlign = "center";
      this.context.font = "34pt monospace";
      this.context.fillStyle = "Black";
      this.context.fillText("Insert Tile", offsetX + this.width / 2, offsetY + this.width / 2);
      this.context.fillText("" + pageX + "," + pageY, offsetX + this.width / 2, offsetY + this.width / 2 + 60);
      this.context.strokeStyle = "Black";
      return this.context.strokeRect(offsetX, offsetY, this.height, this.width);
    };
    Transform.prototype.renderBackground = function() {
      this.context.save();
      this.context.fillStyle = "White";
      this.context.fillRect(0, 0, this.element.width, this.element.height);
      this.context.strokeStyle = "Black";
      this.context.strokeRect(0, 0, this.element.width, this.element.height);
      return this.context.restore();
    };
    return Transform;
  })();
  World = (function() {
    function World() {
      this.input = new Input;
      this.transform = new Transform;
      this.x = 0;
      this.y = 0;
      this.theta = 0;
      this.zoom = 3;
    }
    World.prototype.frame = function() {
      if (this.input.key('f')) {
        this.theta -= 0.1;
      }
      if (this.input.key('d')) {
        this.theta += 0.1;
      }
      if (this.input.key('l')) {
        this.x += 10 * this.zoom;
      }
      if (this.input.key('h')) {
        this.x -= 10 * this.zoom;
      }
      if (this.input.key('k')) {
        this.y += 10 * this.zoom;
      }
      if (this.input.key('j')) {
        this.y -= 10 * this.zoom;
      }
      if (this.input.key('z')) {
        this.zoom -= this.zoom / 10;
      }
      if (this.input.key('x')) {
        this.zoom += this.zoom / 10;
      }
      this.transform.render(this.x, this.y, this.theta, this.zoom);
      this.element = document.getElementById("canvas");
      return this.context = this.element.getContext('2d');
    };
    return World;
  })();
  addLoadEvent = function(func) {
    var oldonload;
    oldonload = window.onload;
    if (typeof window.onload !== 'function') {
      return window.onload = func;
    } else {
      return window.onload = function() {
        oldonload();
        return func();
      };
    }
  };
  onLoad = __bind(function(e) {
    var gameLoop, world;
    world = new World;
    gameLoop = function() {
      world.frame();
      return setTimeout(gameLoop, 20);
    };
    gameLoop();
    return true;
  }, this);
  addLoadEvent(onLoad);
}).call(this);
