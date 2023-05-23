class KeyboardInput

    constructor: ->
        @keys = {}
        document.onkeyup = (e) =>
            @keys[@charCode e] = false
            true

        document.onkeydown = (e) =>
            @keys[@charCode e] = true
            true

    charCode: (event) ->
        if not event then event = window.event
        code = event.keyCode
        if event.charCode and code == 0
            code = event.charCode
        String.fromCharCode(code).toLowerCase()


class MouseListener

    constructor: (@id, @key) ->
        element = document.getElementById @id
       
        element.onmouseup = (e) =>
            if @onmouseup then @onmouseup @key
            false

        element.onmousedown = (e) =>
            if @onmousedown then @onmousedown @key
            false

        element.onclick = (e) =>
            return false


class MouseInput
    
    constructor: ->
        @bindings = [["left","h"],["right","l"],
         ["up","j"],["down","k"],
         ["clockwise", "f"],["anti-clockwise","d"]
         ["zoom-in", "z"],["zoom-out","x"]]
        @bind()
        @keys = {}

    bind: ->
        for binding in @bindings
            key = new MouseListener binding[0], binding[1]
            
            key.onmouseup = (key) =>
                @keys[key] = false
            
            key.onmousedown = (key) =>
                @keys[key] = true

class Input

    constructor: ->
        @keyboard = new KeyboardInput
        @mouse = new MouseInput

    key: (key) ->
        @keyboard.keys[key] or @mouse.keys[key]


class Timer

    constructor: ->
        @frameTime = 0
        @lastLoop = new Date
        @thisLoop = new Date

    tick: ->
        @thisLoop = new Date
        thisTime = @thisLoop - @lastLoop
        @frameTime += (thisTime - @frameTime) / 20
        @lastLoop = @thisLoop

    framesPerSecond: ->
        (1000/@frameTime).toFixed(1) + " fps"


class Transform

    constructor: ->
        @width = 500
        @height = 500
        @offsetX = 250
        @offsetY = 250
        @element = document.getElementById("canvas")
        @context = @element.getContext('2d')
        @timer = new Timer

    render: (x, y, theta, zoom) ->
        @timer.tick()
        @renderBackground()
        @context.save()
        
        # transform the canvas
        @context.translate @offsetX, @offsetY
        @context.scale 1/zoom, 1/zoom
        @context.rotate theta
        @context.translate -@offsetX - x, -@offsetY - y

        # calulate which pages we are looking at
        pageX = Math.floor x / @width
        pageY = Math.floor y / @height
        
        # calulate position we should start drawing the pages
        offsetX = pageX * @width + @offsetX
        offsetY = pageY * @height + @offsetY

        # surround tiles in each direction
        tiles = Math.ceil(zoom)

        # draw our page and surrounding pages
        for pX in [-tiles..tiles]
            for pY in [-tiles..tiles]
                @renderPage pageX + pX, pageY + pY, offsetX + (@width * pX), offsetY + (@height * pY)

        @context.restore()
        @renderOverlay x, y, theta, zoom

    renderOverlay: (x,y,theta,zoom) ->
        @context.save()
        @context.font = "14pt Monospace"
        @context.fillStyle = "Black"
        @context.fillText "x = " + Math.round(x*100)/100, 10, 20
        @context.fillText "y = " + Math.round(y*100)/100, 10, 40
        angle = Math.round theta * 180 / Math.PI
        @context.fillText "theta = " + angle, 10, 60
        @context.fillText "zoom = " + Math.round(zoom * 100) / 100, 10, 80
        @context.fillText "tiles = " + Math.pow(Math.ceil(zoom)*2+1,2), 10, 100
        @context.fillText "fps = " + @timer.framesPerSecond(), 10, 120
        @context.restore()

    renderPage: (pageX, pageY, offsetX, offsetY) ->
        @context.textAlign = "center"
        @context.font = "34pt monospace"
        @context.fillStyle = "Black"
        @context.fillText "Insert Tile", offsetX + @width / 2, offsetY + @width / 2
        @context.fillText "" + pageX + "," + pageY, offsetX + @width / 2, offsetY + @width / 2 + 60
        @context.strokeStyle = "Black"
        @context.strokeRect offsetX, offsetY, @height, @width

    renderBackground: ->
        @context.save()
        @context.fillStyle = "White"
        @context.fillRect 0,0, @element.width,@element.height
        @context.strokeStyle = "Black"
        @context.strokeRect 0,0, @element.width,@element.height
        @context.restore()

class World
    constructor: ->
        @input = new Input
        @transform = new Transform
        @x = 0
        @y = 0
        @theta = 0
        @zoom = 3

    frame: ->
        if @input.key 'f' then @theta -= 0.1
        if @input.key 'd' then @theta += 0.1
        if @input.key 'l' then @x += 10 * @zoom
        if @input.key 'h' then @x -= 10 * @zoom
        if @input.key 'k' then @y += 10 * @zoom
        if @input.key 'j' then @y -= 10 * @zoom
        if @input.key 'z' then @zoom -= @zoom / 10
        if @input.key 'x' then @zoom += @zoom / 10
        @transform.render @x, @y, @theta, @zoom


        @element = document.getElementById("canvas")
        @context = @element.getContext('2d')



addLoadEvent = (func) ->
  oldonload = window.onload
  if typeof window.onload isnt 'function'
    window.onload = func
  else
    window.onload = ->
      oldonload()
      func()

onLoad = (e) =>
    
    world = new World
    
    gameLoop = ->
        world.frame()
        setTimeout(gameLoop,20)

    gameLoop()

    true

addLoadEvent onLoad
