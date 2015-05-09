class ScaleDiagram
    constructor: ->
        @context
        @height = 40
        @width = 40
        @camera_x = 200
        @camera_y = 120
        @camera_height = 80
        @camera_width = 80

    draw: ->
        @grid()
        @screen()
 
    screen: ->
        @context.save()
        @context.translate(@camera_x,@camera_y)
        @context.rotate(Math.PI/4)
        @context.translate(-@height,-@height)
        @context.strokeStyle = "silver"
        @context.fillStyle = "black"
        @context.strokeRect 0, 0, @camera_height, @camera_width
        @context.font = "14pt Monospace"
        @context.textAlign = "center"
        @context.fillText "Camera", @height, @width
        @context.fillStyle = "rgba(255, 255, 255, 0.2)"
        @context.fillRect 0, 0, @camera_height, @camera_width
        @context.restore()
 
    grid: ->
        for x in [0..3]
            for y in [0..3]
                @context.fillStyle = "gray"
                @context.strokeStyle = "black"
                @context.fillRect (x + 3) * @height, (y + 1) * @width, @height, @width
        for x in [0..360/@width]
            for y in [0..200/@height]
                @context.strokeStyle = "silver"
                @context.strokeRect x * @height, y * @width, @height, @width

class RotateDiagram
    constructor: ->
        @context
        @height = 70
        @width = 70
        @camera_x = 140
        @camera_y = 150
        @camera_height = 70
        @camera_width = 70

    draw: ->
        @grid()
        @screen()
 
    screen: ->
        @context.save()
        @context.translate(@camera_x,@camera_y)
        @context.rotate(Math.PI/4)
        @context.translate(-@height,-@height)
        @context.fillStyle = "rgba(0, 0, 0, 0.2)"
        @context.fillRect 0, 0, @camera_height, @camera_width
        @context.strokeStyle = "silver"
        @context.fillStyle = "black"
        @context.strokeRect 0, 0, @camera_height, @camera_width
        @context.font = "14pt Monospace"
        @context.textAlign = "center"
        @context.fillText "Camera", @camera_height / 2, @camera_width / 2
        @context.restore()

    grid: ->
        for x in [0..2]
            for y in [0..2]
                @context.strokeStyle = "silver"
                @context.strokeRect x * @height, y * @width, @height, @width


class TranslateDiagram
    constructor: ->
        @context
        @height = 70
        @width = 70
        @camera_x = 100
        @camera_y = 100
        @camera_height = 70
        @camera_width = 70

    draw: ->
        @grid()
        @screen()
 
    screen: ->
        @context.save()
        @context.translate(@camera_x,@camera_y)
        @context.translate(-@height,-@height)
        @context.fillStyle = "rgba(0, 0, 0, 0.2)"
        @context.fillRect 0, 0, @camera_height, @camera_width
        @context.strokeStyle = "silver"
        @context.fillStyle = "black"
        @context.strokeRect 0, 0, @camera_height, @camera_width
        @context.font = "14pt Monospace"
        @context.textAlign = "center"
        @context.fillText "Camera", @camera_height / 2, @camera_width / 2
        @context.restore()

    grid: ->
        for x in [0..1]
            for y in [0..1]
                @context.strokeStyle = "silver"
                @context.strokeRect x * @height, y * @width, @height, @width

addLoadEvent = (func) ->
  oldonload = window.onload
  if typeof window.onload isnt 'function'
    window.onload = func
  else
    window.onload = ->
      oldonload()
      func()

onLoad = (e) =>
    diagram = new ScaleDiagram
    element = document.getElementById "scale-diagram-canvas"
    diagram.context = element.getContext '2d'
    diagram.draw()

    diagram = new RotateDiagram
    element = document.getElementById "rotate-diagram-canvas"
    diagram.context = element.getContext '2d'
    diagram.draw()
    
    diagram = new TranslateDiagram
    element = document.getElementById "translate-diagram-canvas"
    diagram.context = element.getContext '2d'
    diagram.draw()

    true

addLoadEvent onLoad
