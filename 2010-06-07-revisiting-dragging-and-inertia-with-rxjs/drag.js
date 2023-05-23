function drag(target, events) {
   
    function handleOutOfBounds(position, offset) {
       if (position.x - offset.x > 400) { position.x = 400 + offset.x; position.vx *= -1 };
       if (position.x - offset.x < 0) { position.x = 0 + offset.x; position.vx *= -1 };
       if (position.y - offset.y > 400) {position.y = 400 + offset.y; position.vy *= -1 };
       if (position.y - offset.y < 0) { position.y = 0 + offset.y; position.vy *= -1 };
       return position;
    }

    function dragTo(position,moveTo) {
       var newX = position.x + ((moveTo.x - position.x) * 0.2);
       var newY = position.y + ((moveTo.y - position.y) * 0.2);
       return  { x : newX, y : newY, 
            vx : newX - position.x, vy : newY - position.y };
    }

    function dragOut(position) {
        return newPos = { x : position.x + position.vx, y : position.y + position.vy,
            vx : position.vx * 0.96, vy : position.vy * 0.96 };
    }

    function isDragOutComplete(position) {
        return ( Math.abs(position.vx) < 0.1 && Math.abs(position.vy) < 0.1 ); 
    }

    function dragMotion(start) {
        
        var position = start.mouse;
        var movementComplete = new Rx.Subject();                 
    
        function targetPosition() {
            return { target : target,
                x : position.x - start.offset.x,
                y : position.y - start.offset.y}
        };
        
        function easeTo(moveTo) {
            function easeFrame (e) {
               position = handleOutOfBounds(dragTo(position, moveTo),start.offset);
               return  targetPosition();
            }
            return events.frame.Select(easeFrame).TakeUntil(events.mouseMove);
        } 
        
        function easeToStop(frameEvent) {
            position = handleOutOfBounds(dragOut(position),start.offset);
                                
            if (isDragOutComplete(position)) {
                movementComplete.OnNext(); }
            
            return targetPosition(); 
        }
        
        return events.mouseMove.SelectMany(easeTo)
            .TakeUntil(events.mouseUp)
            .Concat(events.frame.Select(easeToStop)
            .TakeUntil(events.mouseDown.Merge(movementComplete)))};

    return events.mouseDown.SelectMany(dragMotion);
};

