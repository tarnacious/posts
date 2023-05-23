(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.onload = __bind(function(e) {
    var diagram, element, gameLoop, world;
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
    world = new World;
    gameLoop = function() {
      world.frame();
      return setTimeout(gameLoop, 20);
    };
    gameLoop();
    return true;
  }, this);
}).call(this);
