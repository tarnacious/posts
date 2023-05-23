# Playing around with the examples in Getting Started with WebGL.
#
# https://developer.mozilla.org/en/WebGL/Getting_started_with_WebGL
#

vertices = [ -1.0, -1.0,  1.0, # Font Face
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            
            -1.0, -1.0, -1.0, # Back face
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,
            
            -1.0,  1.0, -1.0, # Top face
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,
            
            -1.0, -1.0, -1.0, # Bottom face
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
            
             1.0, -1.0, -1.0, # Right face
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,
            
            -1.0, -1.0, -1.0, # Left face
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0 ]

triangles = [ 0,  1,  2,      0,  2,  3,    # front
              4,  5,  6,      4,  6,  7,    # back
              8,  9,  10,     8,  10, 11,   # top
              12, 13, 14,     12, 14, 15,   # bottom
              16, 17, 18,     16, 18, 19,   # right
              20, 21, 22,     20, 22, 23]   # left

colours = [ [0.0,  1.0,  1.0,  1.0],    # Front face: white
            [1.0,  0.0,  0.0,  1.0],    # Back face: red
            [0.0,  1.0,  0.0,  1.0],    # Top face: green
            [0.0,  0.0,  1.0,  1.0],    # Bottom face: blue
            [1.0,  1.0,  0.0,  1.0],    # Right face: yellow
            [1.0,  0.0,  1.0,  1.0]]    # Left face: purple
            


vertextScript = '''
              attribute vec3 aVertexPosition;
              attribute vec4 aVertexColor;
            
              uniform mat4 uMVMatrix;
              uniform mat4 uPMatrix;
              
              varying lowp vec4 vColor;
            
              void main(void) {
                gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
                vColor = aVertexColor;
              }
              '''

fragmentScript = '''
                  varying lowp vec4 vColor;
                    
                  void main(void) {
                    gl_FragColor = vColor;
                  }
                '''

class ShaderProgram
    constructor: (@context) ->
    
    compileShader: (script, type) ->
        shader = @context.createShader type
        @context.shaderSource shader, script
        @context.compileShader shader
        if not @context.getShaderParameter shader, @context.COMPILE_STATUS
            console.log "An error occurred compiling the shaders: " + @context.getShaderInfoLog(shader)
            return null
        shader


class Shader extends ShaderProgram
    constructor: ->
        super
        @program = @context.createProgram()
        
        fragmentShader = @compileShader fragmentScript, @context.FRAGMENT_SHADER
        vertextShader = @compileShader vertextScript, @context.VERTEX_SHADER

        @context.attachShader(@program, fragmentShader)
        @context.attachShader(@program, vertextShader)
        
        @context.linkProgram(@program)
        if not @context.getProgramParameter(@program, @context.LINK_STATUS)
            alert("Unable to initialize the shader program.")
        @context.useProgram @program
    
        @positionAttribute = @context.getAttribLocation(@program, "aVertexPosition")
        @context.enableVertexAttribArray(@positionAttribute)

        @colourAttribute = @context.getAttribLocation(@program, "aVertexColor")
        @context.enableVertexAttribArray(@colourAttribute)

class Buffers
    constructor: (@context) ->
    
    arrayBuffer: (data) ->
        buffer = @context.createBuffer()
        @context.bindBuffer(@context.ARRAY_BUFFER, buffer)
        @context.bufferData(@context.ARRAY_BUFFER, new Float32Array(data), @context.STATIC_DRAW)
        buffer
    
    elementArrayBuffer: (data) ->
        buffer = @context.createBuffer()
        @context.bindBuffer(@context.ELEMENT_ARRAY_BUFFER, buffer)
        @context.bufferData(@context.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), @context.STATIC_DRAW)
        buffer


class Cube extends Buffers
    constructor: ->
        super
        @shader = new Shader @context
        @rotation = 0
        @colourBuffer = @arrayBuffer generateColours()
        @verticesBuffer = @arrayBuffer vertices
        @triangleBuffer = @elementArrayBuffer triangles
        
    setMatrixUniforms: (matrix,perspectiveMatrix) ->
        pUniform = @context.getUniformLocation(@shader.program, "uPMatrix")
        @context.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()))

        mvUniform = @context.getUniformLocation(@shader.program, "uMVMatrix")
        @context.uniformMatrix4fv(mvUniform, false, new Float32Array(matrix.flatten()))

    draw: ->
        @context.clear(@context.COLOR_BUFFER_BIT | @context.DEPTH_BUFFER_BIT)

        m = Matrix.I(4)
        translation = Matrix.Translation($V([-0.0, 0.5, -6.0])).ensure4x4()
        rotation = Matrix.Rotation(@rotation, $V([1,0,1])).ensure4x4()
        m = m.x(translation)
        m = m.x(rotation)
        
        @context.bindBuffer(@context.ARRAY_BUFFER, @verticesBuffer)
        @context.vertexAttribPointer(@shader.positionAttribute, 3, @context.FLOAT, false, 0, 0)

        @context.bindBuffer(@context.ARRAY_BUFFER, @colourBuffer)
        @context.vertexAttribPointer(@shader.colourAttribute, 4, @context.FLOAT, false, 0, 0)

        @context.bindBuffer(@context.ELEMENT_ARRAY_BUFFER, @triangleBuffer)
        
        perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0)
        @setMatrixUniforms m, perspectiveMatrix
        @context.drawElements(@context.TRIANGLES, 36, @context.UNSIGNED_SHORT, 0)

generateColours = ->
    generatedColours = []
    for side in [0..5]
        colour = colours[side]
        for rgba in [0..3]
            generatedColours = generatedColours.concat(colour)
    generatedColours

contextSettings = (context) ->
    context.clearColor(1.0, 1.0, 1.0, 1.0)                             # Set clear color to black, fully opaque
    context.clearDepth(1.0)                                            # Clear everything
    context.enable(context.DEPTH_TEST)                                 # Enable depth testing
    context.depthFunc(context.LEQUAL)                                  # Near things obscure far things
    context.clear(context.COLOR_BUFFER_BIT|context.DEPTH_BUFFER_BIT)   # Clear the color as well as the depth buffer.

demo = (context) ->
    contextSettings(context)
    cube = new Cube context
    frame = ->
        cube.draw()
        cube.rotation += 0.01
        setTimeout(frame,20)
    frame()

initWebGL = (canvas) ->
    try
        context = canvas.getContext "experimental-webgl"
    context
        
window.onload = ->
    canvas = document.getElementById "canvas"
    context = initWebGL canvas
    if context
        demo context
    else
        document.getElementById("canvas-container").style.display = 'none'
        document.getElementById("notsupported").style.display = 'block'





    


