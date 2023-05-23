      function getDomEvents(target) { 
            function getMouse(e) {
                return { x : e.clientX,y : e.clientY }; }
            
            function getDragItem(target) {
                return { x : parseFloat(target.css("left").replace("px","")),
                         y : parseFloat(target.css("top").replace("px","")) }; }
            
            function getOffset(mouse,position) {
                return { x: mouse.x - position.x, y : mouse.y - position.y }; }

            function getDragStart(mouseEvent) {
                mouseEvent.preventDefault();
                var mouse = getMouse(mouseEvent);
                var position = getDragItem(target);
                return { mouse : mouse, position : position,
                         offset : getOffset(mouse,position) }; }
    
            return { mouseUp : $(document).toObservable("mouseup"),
                mouseDown : target.toObservable("mousedown").Select(getDragStart),
                mouseMove : $(document).toObservable("mousemove").Select(getMouse),
                frame : Rx.Observable.Interval(10) };
        };

        function dragElement(target) {
                var events = getDomEvents(target);
                return drag(target, events);
        };  

        $(function() {
            var panel = $("#panel");
            for(var x = 0; x < 4; x++) {
            for(var y = 0; y < 4; y++) {
                var element = $('<div class="tile"/>');
                var offset = "-" + (x * 100) + "px -" + (y * 100) + "px";
                element.css( { top: y * 101 + 48, left: x *  101 + 48 });
                element.css( "background-position", offset );
                panel.append(element);
            }
         };
          $(".tile").each(
             function(target) {
                dragElement($(this)).Subscribe( function ( pos ) 
                    {
                        pos.target.css( { top: pos.y, left: pos.x } );
                    })
             });
                    
    });

