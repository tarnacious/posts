(function() {
  var RotateDiagram, ScaleDiagram, TranslateDiagram, addLoadEvent, onLoad;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  ScaleDiagram = (function() {
    function ScaleDiagram() {
      this.context;
      this.height = 40;
      this.width = 40;
      this.camera_x = 200;
      this.camera_y = 120;
      this.camera_height = 80;
      this.camera_width = 80;
    }
    ScaleDiagram.prototype.draw = function() {
      this.grid();
      return this.screen();
    };
    ScaleDiagram.prototype.screen = function() {
      this.context.save();
      this.context.translate(this.camera_x, this.camera_y);
      this.context.rotate(Math.PI / 4);
      this.context.translate(-this.height, -this.height);
      this.context.strokeStyle = "silver";
      this.context.fillStyle = "black";
      this.context.strokeRect(0, 0, this.camera_height, this.camera_width);
      this.context.font = "14pt Monospace";
      this.context.textAlign = "center";
      this.context.fillText("Camera", this.height, this.width);
      this.context.fillStyle = "rgba(255, 255, 255, 0.2)";
      this.context.fillRect(0, 0, this.camera_height, this.camera_width);
      return this.context.restore();
    };
    ScaleDiagram.prototype.grid = function() {
      var x, y, _ref, _results;
      for (x = 0; x <= 3; x++) {
        for (y = 0; y <= 3; y++) {
          this.context.fillStyle = "gray";
          this.context.strokeStyle = "black";
          this.context.fillRect((x + 3) * this.height, (y + 1) * this.width, this.height, this.width);
        }
      }
      _results = [];
      for (x = 0, _ref = 360 / this.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = 200 / this.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
            this.context.strokeStyle = "silver";
            _results2.push(this.context.strokeRect(x * this.height, y * this.width, this.height, this.width));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    return ScaleDiagram;
  })();
  RotateDiagram = (function() {
    function RotateDiagram() {
      this.context;
      this.height = 70;
      this.width = 70;
      this.camera_x = 140;
      this.camera_y = 150;
      this.camera_height = 70;
      this.camera_width = 70;
    }
    RotateDiagram.prototype.draw = function() {
      this.grid();
      return this.screen();
    };
    RotateDiagram.prototype.screen = function() {
      this.context.save();
      this.context.translate(this.camera_x, this.camera_y);
      this.context.rotate(Math.PI / 4);
      this.context.translate(-this.height, -this.height);
      this.context.fillStyle = "rgba(0, 0, 0, 0.2)";
      this.context.fillRect(0, 0, this.camera_height, this.camera_width);
      this.context.strokeStyle = "silver";
      this.context.fillStyle = "black";
      this.context.strokeRect(0, 0, this.camera_height, this.camera_width);
      this.context.font = "14pt Monospace";
      this.context.textAlign = "center";
      this.context.fillText("Camera", this.camera_height / 2, this.camera_width / 2);
      return this.context.restore();
    };
    RotateDiagram.prototype.grid = function() {
      var x, y, _results;
      _results = [];
      for (x = 0; x <= 2; x++) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (y = 0; y <= 2; y++) {
            this.context.strokeStyle = "silver";
            _results2.push(this.context.strokeRect(x * this.height, y * this.width, this.height, this.width));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    return RotateDiagram;
  })();
  TranslateDiagram = (function() {
    function TranslateDiagram() {
      this.context;
      this.height = 70;
      this.width = 70;
      this.camera_x = 100;
      this.camera_y = 100;
      this.camera_height = 70;
      this.camera_width = 70;
    }
    TranslateDiagram.prototype.draw = function() {
      this.grid();
      return this.screen();
    };
    TranslateDiagram.prototype.screen = function() {
      this.context.save();
      this.context.translate(this.camera_x, this.camera_y);
      this.context.translate(-this.height, -this.height);
      this.context.fillStyle = "rgba(0, 0, 0, 0.2)";
      this.context.fillRect(0, 0, this.camera_height, this.camera_width);
      this.context.strokeStyle = "silver";
      this.context.fillStyle = "black";
      this.context.strokeRect(0, 0, this.camera_height, this.camera_width);
      this.context.font = "14pt Monospace";
      this.context.textAlign = "center";
      this.context.fillText("Camera", this.camera_height / 2, this.camera_width / 2);
      return this.context.restore();
    };
    TranslateDiagram.prototype.grid = function() {
      var x, y, _results;
      _results = [];
      for (x = 0; x <= 1; x++) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (y = 0; y <= 1; y++) {
            this.context.strokeStyle = "silver";
            _results2.push(this.context.strokeRect(x * this.height, y * this.width, this.height, this.width));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    return TranslateDiagram;
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
    var diagram, element;
    diagram = new ScaleDiagram;
    element = document.getElementById("scale-diagram-canvas");
    diagram.context = element.getContext('2d');
    diagram.draw();
    diagram = new RotateDiagram;
    element = document.getElementById("rotate-diagram-canvas");
    diagram.context = element.getContext('2d');
    diagram.draw();
    diagram = new TranslateDiagram;
    element = document.getElementById("translate-diagram-canvas");
    diagram.context = element.getContext('2d');
    diagram.draw();
    return true;
  }, this);
  addLoadEvent(onLoad);
}).call(this);
