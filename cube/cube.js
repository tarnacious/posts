(function() {
  var Buffers, Cube, Shader, ShaderProgram, colours, contextSettings, demo, fragmentScript, generateColours, initWebGL, triangles, vertextScript, vertices;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  vertices = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];
  triangles = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  colours = [[0.0, 1.0, 1.0, 1.0], [1.0, 0.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0], [1.0, 1.0, 0.0, 1.0], [1.0, 0.0, 1.0, 1.0]];
  vertextScript = '  attribute vec3 aVertexPosition;\n  attribute vec4 aVertexColor;\n\n  uniform mat4 uMVMatrix;\n  uniform mat4 uPMatrix;\n  \n  varying lowp vec4 vColor;\n\n  void main(void) {\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n    vColor = aVertexColor;\n  }';
  fragmentScript = 'varying lowp vec4 vColor;\n  \nvoid main(void) {\n  gl_FragColor = vColor;\n}';
  ShaderProgram = (function() {
    function ShaderProgram(context) {
      this.context = context;
    }
    ShaderProgram.prototype.compileShader = function(script, type) {
      var shader;
      shader = this.context.createShader(type);
      this.context.shaderSource(shader, script);
      this.context.compileShader(shader);
      if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " + this.context.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };
    return ShaderProgram;
  })();
  Shader = (function() {
    __extends(Shader, ShaderProgram);
    function Shader() {
      var fragmentShader, vertextShader;
      Shader.__super__.constructor.apply(this, arguments);
      this.program = this.context.createProgram();
      fragmentShader = this.compileShader(fragmentScript, this.context.FRAGMENT_SHADER);
      vertextShader = this.compileShader(vertextScript, this.context.VERTEX_SHADER);
      this.context.attachShader(this.program, fragmentShader);
      this.context.attachShader(this.program, vertextShader);
      this.context.linkProgram(this.program);
      if (!this.context.getProgramParameter(this.program, this.context.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
      }
      this.context.useProgram(this.program);
      this.positionAttribute = this.context.getAttribLocation(this.program, "aVertexPosition");
      this.context.enableVertexAttribArray(this.positionAttribute);
      this.colourAttribute = this.context.getAttribLocation(this.program, "aVertexColor");
      this.context.enableVertexAttribArray(this.colourAttribute);
    }
    return Shader;
  })();
  Buffers = (function() {
    function Buffers(context) {
      this.context = context;
    }
    Buffers.prototype.arrayBuffer = function(data) {
      var buffer;
      buffer = this.context.createBuffer();
      this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
      this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(data), this.context.STATIC_DRAW);
      return buffer;
    };
    Buffers.prototype.elementArrayBuffer = function(data) {
      var buffer;
      buffer = this.context.createBuffer();
      this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, buffer);
      this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), this.context.STATIC_DRAW);
      return buffer;
    };
    return Buffers;
  })();
  Cube = (function() {
    __extends(Cube, Buffers);
    function Cube() {
      Cube.__super__.constructor.apply(this, arguments);
      this.shader = new Shader(this.context);
      this.rotation = 0;
      this.colourBuffer = this.arrayBuffer(generateColours());
      this.verticesBuffer = this.arrayBuffer(vertices);
      this.triangleBuffer = this.elementArrayBuffer(triangles);
    }
    Cube.prototype.setMatrixUniforms = function(matrix, perspectiveMatrix) {
      var mvUniform, pUniform;
      pUniform = this.context.getUniformLocation(this.shader.program, "uPMatrix");
      this.context.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));
      mvUniform = this.context.getUniformLocation(this.shader.program, "uMVMatrix");
      return this.context.uniformMatrix4fv(mvUniform, false, new Float32Array(matrix.flatten()));
    };
    Cube.prototype.draw = function() {
      var m, perspectiveMatrix, rotation, translation;
      this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
      m = Matrix.I(4);
      translation = Matrix.Translation($V([-0.0, 0.5, -6.0])).ensure4x4();
      rotation = Matrix.Rotation(this.rotation, $V([1, 0, 1])).ensure4x4();
      m = m.x(translation);
      m = m.x(rotation);
      this.context.bindBuffer(this.context.ARRAY_BUFFER, this.verticesBuffer);
      this.context.vertexAttribPointer(this.shader.positionAttribute, 3, this.context.FLOAT, false, 0, 0);
      this.context.bindBuffer(this.context.ARRAY_BUFFER, this.colourBuffer);
      this.context.vertexAttribPointer(this.shader.colourAttribute, 4, this.context.FLOAT, false, 0, 0);
      this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.triangleBuffer);
      perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);
      this.setMatrixUniforms(m, perspectiveMatrix);
      return this.context.drawElements(this.context.TRIANGLES, 36, this.context.UNSIGNED_SHORT, 0);
    };
    return Cube;
  })();
  generateColours = function() {
    var colour, generatedColours, rgba, side;
    generatedColours = [];
    for (side = 0; side <= 5; side++) {
      colour = colours[side];
      for (rgba = 0; rgba <= 3; rgba++) {
        generatedColours = generatedColours.concat(colour);
      }
    }
    return generatedColours;
  };
  contextSettings = function(context) {
    context.clearColor(1.0, 1.0, 1.0, 1.0);
    context.clearDepth(1.0);
    context.enable(context.DEPTH_TEST);
    context.depthFunc(context.LEQUAL);
    return context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
  };
  demo = function(context) {
    var cube, frame;
    contextSettings(context);
    cube = new Cube(context);
    frame = function() {
      cube.draw();
      cube.rotation += 0.01;
      return setTimeout(frame, 20);
    };
    return frame();
  };
  initWebGL = function(canvas) {
    var context;
    try {
      context = canvas.getContext("experimental-webgl");
    } catch (_e) {}
    return context;
  };
  window.onload = function() {
    var canvas, context;
    canvas = document.getElementById("canvas");
    context = initWebGL(canvas);
    if (context) {
      return demo(context);
    } else {
      document.getElementById("canvas-container").style.display = 'none';
      return document.getElementById("notsupported").style.display = 'block';
    }
  };
}).call(this);
