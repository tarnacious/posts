/* transform matrices */

function rotateTransform(angle) {
    return { name: "rotate(" + Math.round( angle/(2*Math.PI) * 360) + ")",
             transform: [[Math.cos(angle),-Math.sin(angle),1],
                     [Math.sin(angle),Math.cos(angle),1],
                     [0,0,1]]
    };
} 


function translateTransform(x,y) {
    return { 
            name: "translate(" + Math.round(x) +","+ Math.round(y)+")",
            transform: [[1,0,x],
            [0,1,y],
            [0,0,1]] };
} 

/* transform matrices wrappers to animate */

function animateRotation(angle) {
    return function(percent) {
        return rotateTransform(angle*percent); 
    };
}

function animateTranslate(x,y) {
    return function(percent) {
        return translateTransform(x*percent,y*percent);
    };
}

/* canvas drawing functions */

function drawBox(ctx) {
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (0,0,50,50);
}

function addOverlay(ctx,x,y) {
    ctx.save();
    ctx.translate(x||0,y||0);
    ctx.fillText("+x",80,-5);
    ctx.fillText("-x",-100,-5);
    ctx.fillText("-y",5,-100);
    ctx.fillText("+y",5,+100);
    ctx.fillText("(0,0)",5,-10);

    ctx.beginPath();
    ctx.moveTo(0,-100);
    ctx.lineTo(0,100);
    ctx.stroke();    
    ctx.beginPath();
    ctx.moveTo(-100,0);
    ctx.lineTo(100,0);
    ctx.stroke();    
    ctx.restore();
}

function clear(ctx) { 
    ctx.save(); 
    ctx.fillStyle = 'white'; 
    ctx.fillRect (0, 0, 300, 300); 
    ctx.restore();
}

function applyTransform(ctx,m) {
   ctx.transform(m[0][0],m[1][0],m[0][1],m[1][1],m[0][2],m[1][2]);     
}

function printTransforms(transforms,ctx) {
    var i = 0, il = transforms.length;
    for(;i < il; i++) {
        ctx.fillText(transforms[i].name,10,10 + 10 * i);
    }
}

function applyTransforms(transforms,ctx,ondraw) {
   var i=0, il = transforms.length;
   ctx.save();

   // translate to centre of canvas before applying other transforms
   applyTransform(ctx,translateTransform(150,150).transform);
    
   for(;i < il; i++) {
        applyTransform(ctx,transforms[i].transform);
   }
   ondraw(ctx);
   ctx.restore();
   
} 

// move the box
function drawStandard(transforms, ctx) {
    clear(ctx);
    printTransforms(transforms,ctx);
    // draw box after apply tranforms
    applyTransforms(transforms,ctx,drawBox); 
    // draw overlay statically
    addOverlay(ctx,150,150);
}

// move the world
function drawAlternate(transforms, ctx) {
    clear(ctx);
    printTransforms(transforms,ctx);
    // draw overlay after transforms
    applyTransforms(transforms,ctx, addOverlay);
    // draw box statically
    applyTransforms([],ctx,drawBox);
}

/* functions which how lists are combined */

function addToStart(list1, list2) {
    return list1.concat(list2);
}

function addToEnd(list1, list2) {
    return list2.concat(list1);
}

/* animate frame loop */ 

function animateTransform(onframe,oncomplete) {
    (function frame(i) {
        onframe(i); 
        if (i <= 1) {
            setTimeout(function() { frame(i+0.01);}, 20);
        } 
        else 
        { 
            oncomplete();
        }
    }(0));
}

/* animate a list of transforms */

function animateTransforms(ctx, transforms, previous, oncombine, ondraw, oncomplete) {
    if (transforms.length === 0) {
        oncomplete();
        return;
    }

    var frame = function(i) {
        var current = oncombine(previous,[transforms[0](i)]);
        ondraw(current,ctx);
    };

    var nextTransform = function() {  
        animateTransforms(ctx, transforms.slice(1), 
                oncombine(previous,[transforms[0](1)]), oncombine, ondraw, oncomplete); 
    };
    
    animateTransform(frame, nextTransform);
}







function demo() {
} 





