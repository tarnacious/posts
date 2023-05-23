window.onload = (e) =>

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

    world = new World
    gameLoop = ->
        world.frame()
        setTimeout(gameLoop,20)

    gameLoop()

    true
