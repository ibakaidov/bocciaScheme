var windowWidth = window.innerWidth, windowHeight = window.innerHeight, balls=[];
    if (windowHeight<600|| windowWidth<1250){
    if (windowHeight/600<windowWidth/1250){
    var	cortSizeY=windowHeight,
         cortSizeX=600*(windowWidth/1250);
        
    }
        else{
            var	cortSizeY=600*(windowWidth/1250),
         cortSizeX=windowWidth;         
        }
    }
    else{
    var cortSizeX=1250,
	cortSizeY=600;
    }
    var cofX=cortSizeX/1250, cofY=cortSizeY/600;
    
    var mainSnap =Snap(cortSizeX, cortSizeY);
	var 	radiusBall=(27)/(2*Math.PI)*3;
	var cort=mainSnap.rect(0,0,cortSizeX,cortSizeY);
	cort.attr({ stroke: '#000', 'strokeWidth': 1, fill:"#bada55" });
mainSnap.g(
	mainSnap.path("M"+550*cofX+",0 L"+[400*cofX,300*cofY]),
	mainSnap.path("M"+[400*cofX,300*cofY]+" L"+[550*cofX,600*cofY]),
	mainSnap.path("M"+[750*cofX,287.5*cofY]+" L"+[750*cofX,312.5*cofY] ),
	mainSnap.path("M"+[737.5*cofX,300*cofY]+" L"+[762.5*cofX,300*cofY]),
	mainSnap.path("M"+250*cofX+",0 L"+[250*cofX,600*cofY])
	).attr({ stroke: '#000', 'strokeWidth': 1});
for (var box=1; box<7;box++){
	mainSnap.text(1, 100*box*cofY, "бокс №"+box+".");
	mainSnap.path("M 0,"+box*100*cofY+" L"+[250*cofX,box*100*cofY]).attr({ stroke: '#000', 'strokeWidth': 1});	
	}
function paintBalls()
    {
  for (var ball in balls){
  balls[ball].remove();
  }
       
	 balls=[];
	for(var i=1; i<14;i++){ 
		balls[i]=mainSnap.circle(radiusBall*i, cortSizeY-radiusBall, radiusBall).drag(function(x,y,cx,cy){
                  lastClickedBall=(Snap(this.node).attr({cx:cx,cy:cy}));
            repaintVector();
        }).attr({fill:(i<7)?"red":(i<13)?"blue":"#FFF"});
	
    }

}
function paintTarget(){
 
if (typeof target !=="undefined") target.remove();        
target = mainSnap.circle(cortSizeX-radiusBall,cortSizeY/2-radiusBall,radiusBall,radiusBall).attr({fill:"rgba(255,255,255,0)", stroke: '#000', 'strokeWidth': 1}).drag(function(x,y,cx,cy){
            target.attr({cx:cx,cy:cy});
    repaintVector();
        });   
}
function repaintVector(){
    if(typeof (lastClickedBall) ==="undefined" || typeof (target) ==="undefined") {}
        else{
        targetBBox=target.getBBox()
        lastClickedBallBBox=lastClickedBall.getBBox();
        if(typeof vector !=="undefined") vector.remove();
            vector =(  mainSnap.path("M"+[targetBBox.x+radiusBall,targetBBox.y+radiusBall]+"L"+[lastClickedBallBBox.x+radiusBall,lastClickedBallBBox.y+radiusBall]).attr({ stroke: '#000', 'strokeWidth': 1}));   
    }
}
    paintBalls();
    
    document.body.appendChild(document.createElement("br"));
function createButton(variable, text, parent, onclick){
 variable = document.createElement("button");
    variable.innerHTML=text;
    variable.onclick=function(){onclick()};
    parent.appendChild(variable);
}
var resetButton,vectorButton,throwButton;
createButton( resetButton, "Сбросить", document.body, function(){paintBalls(); paintTarget();if(typeof vector !=="undefined") vector.remove();});
createButton( vectorButton, "Нарисовать вектор", document.body, function(){ paintTarget();});
createButton(  throwButton, "Кинуть к целе", document.body, function(){ lastClickedBall.stop().animate({cx:targetBBox.x+radiusBall, cy:targetBBox.y+radiusBall}, 1000, mina.linear, function(){target.remove(); vector.remove(); delete lastClickedBall; paintTarget()});});