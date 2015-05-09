HEIGHT  = 600
WIDTH = 900

class Vector
   
    constructor:(@x,@y) ->

    add: (other) ->
        new Vector @x + other.x, @y + other.y

    multiply: (other) ->
        new Vector @x * other.x, @y * other.y
    
    divide: (other) ->
        new Vector @x * other.x, @y * other.y

    scale: (scale) ->
        new Vector @x * scale, @y * scale

    clone: ->
        new Vector @x, @y

class Input

    constructor: ->
        @keys = {}
        document.onkeyup = (e) =>
            @keyup e

        document.onkeydown = (e) =>
            @keydown e

    charCode: (event) ->
         if not event then event = window.event
         code = event.keyCode
         if event.charCode and code == 0
             code = event.charCode
         String.fromCharCode(code)
    
    key: (event) ->
        c = @charCode(event).toLowerCase()
        if "jkdf".indexOf(c) >= 0
            c
       
    keyup: (e) ->
         k = @key(e)
         if k
            @keys[k] = false
            
    keydown: (e) ->
         k = @key(e)
         if k
            if @onkey then @onkey k
            @keys[k] = true

class MathHelpers

    constructor: ->
    
    fromAngle: (theta) ->
        x = Math.sin(theta)
        y = Math.cos(theta)
        new Vector x, y
    
    distance: (a,b) ->
        Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
    
    hitTest: (a,b) ->
        size = a.size + b.size
        @distance(a.position, b.position) < Math.pow(size,2)


class Element extends MathHelpers

    constructor: ->
        @angle = 0
        @velocity = new Vector 0, 0
        @size = 30
        @position = new Vector 0, 0

    move: ->
        @position = @position.add(@velocity)
        if @velocity.x > 0 and @position.x > (WIDTH + @size / 1)
           @position.x = 0 - (@size / 1)
        if @velocity.y > 0 and @position.y > (HEIGHT + @size / 1)
           @position.y = 0 - (@size / 1)
        if @velocity.x < 0 and @position.x < (-@size / 1)
           @position.x = WIDTH + (@size / 1)
        if @velocity.y < 0 and @position.y < (-@size / 1)
           @position.y = HEIGHT + (@size / 1)
    
    calcPoint: (angle, size) ->
        direction = @fromAngle (@angle + angle)
        scaled = direction.scale size
        translated = scaled.add @position

    direction: ->
        @fromAngle(@angle)

class Missile extends Element

    constructor: ->
        super
        @size = 2
        @timetolive = 100

    move: ->
        @timetolive--
        if @timetolive is 0 and @onexpire
            @onexpire(this)
        super

    render: (canvas) ->
        canvas.save()
        canvas.beginPath()
        
        canvas.moveTo @position.x, @position.y
        nose = @calcPoint 0,3
        
        canvas.lineTo nose.x, nose.y

        canvas.stroke()
        canvas.restore()


class Ship extends Element

    constructor: ->
        @input = new Input
        @input.onkey = (key) =>
            if key is 'f' and @onfire
                @onfire(this)
        super
        @size = 1 #make ship hard to hit

    reset: ->
        @position.x = WIDTH / 2
        @position.y = HEIGHT / 2
        @velocity.x = 0
        @velocity.y = 0
        @angle = Math.PI
  
    accelerate: ->
        @acceleration = @direction().scale 0.2
        @velocity = @velocity.add @acceleration
        @restrictVelocity()
       
    restrictVelocity: ->
        speed = @distance (new Vector 0, 0), @velocity
        max = Math.pow(3,2)

        if (speed >= max)
            ratio = max / speed
            @velocity = @velocity.scale ratio

    move: ->
        if @input.keys['j'] then @angle += 0.1
        if @input.keys['k'] then @angle -= 0.1
        if @input.keys['d'] then @accelerate()
        super


    render: (canvas) ->
        canvas.save()
        canvas.beginPath()
        

        wing1 = @calcPoint (3*Math.PI/4), 10
        nose = @calcPoint 0, 10
        wing2 = @calcPoint (-3*Math.PI/4), 10
        
        canvas.moveTo wing1.x, wing1.y
        canvas.lineTo nose.x, nose.y
        canvas.lineTo wing2.x, wing2.y
        canvas.lineTo wing1.x, wing1.y


        canvas.stroke()
        canvas.restore()


class Asteroid extends Element

    constructor: ->
        super
  
    move: ->
        @angle += 0.05
        super
    
    edge: (number, total) ->
        theta = number * (2 * Math.PI / (total + 1))
        @calcPoint theta, @size

    render: (canvas) ->
        canvas.save()
        canvas.beginPath()
        start = @edge 0, 6
        canvas.moveTo start.x, start.y
        for number in [1..6]
            next = @edge number, 6
            canvas.lineTo next.x, next.y
        canvas.lineTo start.x, start.y
        canvas.stroke()
        canvas.restore()

class GameMechanics extends MathHelpers

    constructor: (context) ->
        @ctx = context
        @asteroids = @createAsteroids 3
        @missiles = []
        @ship = @createShip()

    createMissile: ->
        if @missiles.length < 10
            missile = new Missile
            missile.position = @ship.calcPoint 0, 10
            missile.velocity = @ship.direction().scale(4)
            missile.onexpire = (m) =>
                @missiles.splice (@missiles.indexOf m), 1
            @missiles.push(missile)
    
    createShip: ->
        ship = new Ship
        ship.onfire = (ship) =>
            if @playing
                @createMissile()
            else
                @start()
        ship
         
    createAsteroid: ->
        b = new Asteroid
        speed = 0.3 + Math.random() * 2
        angle = Math.random() * 2 * Math.PI
        direction = @fromAngle angle
        b.velocity = direction.scale speed
        if Math.random() > 0.5
            b.position = new Vector Math.random() * WIDTH, -30
        else
            b.position = new Vector -30, Math.random() * HEIGHT
        b
    
    createAsteroids: (number) ->
        @createAsteroid() for _ in [1..number]
    
    spawnAsteroid: (asteroid) ->
        a = @createAsteroid()
        a.position = asteroid.position.clone()
        a.size = asteroid.size / 2
        a

    spawnAsteroids: (asteroid) ->
        if asteroid.size > 10
            @spawnAsteroid(asteroid) for _ in [1..3]
        else
            []
    
    renderAsteroids: ->
        objects = @asteroids.concat(@missiles)
        for asteroid in objects
            asteroid.render @ctx
            asteroid.move()

    renderShip: ->
        @ship.render @ctx
        @ship.move()

    handleCollisions: ->
        hits = []
        for asteroid in @asteroids
            for missile in @missiles
                if @hitTest asteroid, missile
                    hits.push({asteroid:asteroid,missile:missile})

        for hit in hits
            @asteroidHit()
            @asteroids.splice (@asteroids.indexOf hit.asteroid), 1
            @missiles.splice (@missiles.indexOf hit.missile), 1
            asteroids = @spawnAsteroids hit.asteroid
            @asteroids = @asteroids.concat(asteroids)

        for asteroid in @asteroids
            if @hitTest asteroid, @ship
                @shipHit()


class Game extends GameMechanics

    constructor: (context) ->
        @score = 0
        @level = 0
        @lives = 0
        @playing = false
        @showLevelCounter = 0
        @splashCounter = 0
        super context
        
    start: ->
        @score = 0
        @level = 1
        @lives = 3
        @playing = true
        @startLevel()
    
    startLevel: ->
        @asteroids = @createAsteroids (@level + 2)
        @missiles = []
        @ship.reset()
        @showLevelCounter = 200

    clear: ->
        @ctx.save()
        @ctx.fillStyle = 'white'
        @ctx.fillRect 0, 0, WIDTH, HEIGHT
        @ctx.fillStyle = 'black'
        @ctx.illStyle = 'black'
        @ctx.strokeRect 0, 0, WIDTH, HEIGHT
        @ctx.restore()
    
    frame: ->
        @clear(@ctx)
        if @playing
            @checkLevelComplete()
            @handleCollisions()
            @renderShip()
            @showLevel()
        else
            @showSplash()
        @renderAsteroids()
        @showScore()
    
    checkLevelComplete: ->
        if @playing and @asteroids.length == 0
            @level++
            @startLevel()

    shipHit: ->
        @lives--
        if @lives > 0
            @startLevel()
        else
            @playing = false

    asteroidHit: ->
        @score += 20

    showScore: ->
        @ctx.textAlign = "left"
        @ctx.font = "8pt Monospace"
        @ctx.fillText "Score " + @score, 20, 20
        @ctx.fillText "Level " + @level, 20, 30
        @ctx.fillText "Lives " + @lives, 20, 40

    showLevel: ->
        if @showLevelCounter > 0
            @showLevelCounter--
            @ctx.textAlign = "center"
            @ctx.font = "30pt Monospace"
            @ctx.fillText "Level " + @level, (WIDTH/2), (HEIGHT/2) - 20

    showSplash: (heading, message) ->
        @ctx.save()
        @ctx.textAlign = "center"
        @ctx.font = "30pt Monospace"
        start = new Vector (WIDTH/2), (HEIGHT/2)
        @ctx.fillText "Asteroids", start.x, start.y - 50
        @ctx.textAlign = "left"
        @ctx.font = "14pt Monospace"
        @ctx.fillText "[j] left", start.x - 60, start.y - 20
        @ctx.fillText "[k] right", start.x - 60, start.y + 0
        @ctx.fillText "[d] accelerate", start.x - 60, start.y + 20
        @ctx.fillText "[f] missiles", start.x - 60, start.y + 40
        if @splashCounter < 20
            @ctx.textAlign = "center"
            @ctx.font = "14pt Monospace"
            @ctx.fillText "Insert coin/s to play", start.x, start.y + 90
        if @splashCounter < 0 then @splashCounter = 40
        @splashCounter--
        @ctx.restore()

window.onload = ->
    canvas = document.getElementById "asteroids-canvas"
    ctx = canvas.getContext '2d'
    game = new Game ctx

    frame = ->
        game.frame()
        setTimeout frame, 20

    frame()

