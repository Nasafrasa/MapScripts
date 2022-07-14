# ScuffedWalls v2.1.1

# Documentation on functions can be found at
# https://github.com/thelightdesigner/ScuffedWalls/blob/main/Functions.md

# Using this tool requires an understanding of Noodle Extensions.
# https://github.com/Aeroluna/Heck/wiki

# If the documentation is not sufficient
# DM thelightdesigner#0832 or iswimfly#0556 for help (Discord)
# Noodle Extension Community Discord https://discord.gg/ZDC3pG3xB8

Workspace


0: Import
   Path:ExpertLawless.dat

0:Run
  Script:script.ts
  RunBefore: false
  RefreshOnSave: true






Workspace: Models

678:ModelToWall
   path:enth.dae 
   duration:64
   color:[1,1,1,1]
   animateDissolve:[0,0],[1,0],[1,0.9],[0,1]



Workspace: Effects

292:note
   repeat:2500
   repeataddtime:0.05
   rotation:[0,0,{repeat*15}]
   position:[0,7,0]
   scale:[1,1,1]
   type:3
   interactable: false
   track:bombHelix
   disableNoteGravity:true
   disableNoteLook:true
   fake:true
   color:[1,0,0,1]

292:AnimateTrack
    track:bombHelix
    duration:2
    animateDissolve:[1,0],[0,0.7,"easeInQuad"],[1,1,"easeInQuad"]
    animateScale:[1,1,1,0],[3,3,3,0.7,"easeInQuad"],[1,1,1,1,"easeInOutQuad"]
    repeat:64
    repeatAddTime:2




292:wall
   repeat:2500
   repeataddtime:0.05
   rotation:[0,0,{repeat*-15}]
   position:[0,11,-300]
   scale:[1,1,5]
   type:3
   track:bombHelix3
   disableNoteGravity:true
   disableNoteLook:true
   fake:true
   interactable:false
   color:[1,0,0,1]

292:AnimateTrack
    track:bombHelix3
    duration:2
    animateDissolve:[1,0],[0,0.7,"easeInQuad"],[1,1,"easeInQuad"]
    animateScale:[1,1,1,0],[3,3,3,0.7,"easeInQuad"],[1,1,1,1,"easeInOutQuad"]
    repeat:64
    repeatAddTime:2


292:ParentTrack
    ParentTrack:Helix
    ChildTracks:["bombHelix","bombHelix3"]

290:AnimateTrack
    track:Helix
    duration:2
    AnimateDefinitePosition:[0,0,-100,0],[0,0,0,1]





Workspace: spin

550:Wall
    repeat:180
    animatelocalrotation:[0,{repeat*10},{repeat*1},0],[20,{repeat*50},{repeat*1},0.25],[40,{repeat*100},{repeat*1},0.5],[60,{repeat*150},{repeat*1},0.75],[80,{repeat*200},{repeat*1},1]
    position:[-500,2,0]
    interactable: false
    duration:{58}
    scale:[1000,1,1]
    animateDissolve:[0,0],[0.5,0],[0.5,0.45],[0.25,0.5]
    animatedefiniteposition:[0,0,100,0],[0,0,100,1]
    animatecolor:[Random(0,1),Random(0,1),Random(0,1),0.05,0],[Random(0,1),Random(0,1),Random(0,1),0.1,1]
    track:dumpy

550:AnimateTrack
    track:dumpy
    duration:58
    animateRotation:[0,0,0,0],[180,180,180,1]



#CHANGEABLE!
var:sides
data:3

var:LMAO
data:repeat-1

#CHANGEABLE!
var:xPos
data:0
    
#CHANGEABLE!
var:yPos
data:2

var:angles
data:3.14*2/sides

var:rot
data:360/sides*repeat
    
var:radians
data:(3.14*2/sides)*LMAO

#CHANGEABLE!
var:radius
data:30

var:width
data:2*radius*Tan(3.14/sides)

var:height
data:2

var:sx
data:xPos+Cos((3.14*2/sides)*LMAO)*radius-(2*radius*Tan(3.14/sides))/2
    
var:sy
data:yPos+Sin((3.14*2/sides)*LMAO)*radius-height/2

var:stupid
data:10

580:Wall
    repeat:{3+1}
    localrotation:[0,0,{33.8+(360/3*repeat)}]
    position:[{xPos+Cos((3.14*2/3)*LMAO)*radius-(2*radius*Tan(3.14/3))/2},{yPos+Sin((3.14*2/3)*LMAO)*radius-height/2}]
        # CHANGE ANYTHING BELOW HERE AS YOU PLEASE! DO NOT TOUCH THE ABOVE!
    interactable: false
    duration:4
    scale:[105,1,50]
    animatedefiniteposition:[0,0,200,0],[0,0,-50,1]
    animatecolor:[1,0,0,stupid,0.2],[1,1,0,stupid,0.4],[0,1,0,stupid,0.6],[0,1,1,stupid,0.8],[0,0,1,stupid,1]
    track:shapeSpin

584:Wall
    repeat:{4+1}
    localrotation:[0,0,{33.8+(360/4*repeat)}]
    position:[{xPos+Cos((3.14*2/4)*LMAO)*radius-(2*radius*Tan(3.14/4))/2},{yPos+Sin((3.14*2/4)*LMAO)*radius-height/2}]
        # CHANGE ANYTHING BELOW HERE AS YOU PLEASE! DO NOT TOUCH THE ABOVE!
    interactable: false
    duration:4
    scale:[60,1,50]
    animatedefiniteposition:[0,0,200,0],[0,0,-50,1]
    animatecolor:[1,0,0,stupid,0.2],[1,1,0,stupid,0.4],[0,1,0,stupid,0.6],[0,1,1,stupid,0.8],[0,0,1,stupid,1]
    track:shapeSpin

588:Wall
    repeat:{5+1}
    localrotation:[0,0,{33.8+(360/5*repeat)}]
    position:[{xPos+Cos((3.14*2/5)*LMAO)*radius-(2*radius*Tan(3.14/5))/2},{yPos+Sin((3.14*2/5)*LMAO)*radius-height/2}]
        # CHANGE ANYTHING BELOW HERE AS YOU PLEASE! DO NOT TOUCH THE ABOVE!
    interactable: false
    duration:4
    scale:[45,1,50]
    animatedefiniteposition:[0,0,200,0],[0,0,-50,1]
    animatecolor:[1,0,0,stupid,0.2],[1,1,0,stupid,0.4],[0,1,0,stupid,0.6],[0,1,1,stupid,0.8],[0,0,1,stupid,1]
    track:shapeSpin

592:Wall
    repeat:{6+1}
    localrotation:[0,0,{33.8+(360/6*repeat)}]
    position:[{xPos+Cos((3.14*2/6)*LMAO)*radius-(2*radius*Tan(3.14/6))/2},{yPos+Sin((3.14*2/6)*LMAO)*radius-height/2}]
        # CHANGE ANYTHING BELOW HERE AS YOU PLEASE! DO NOT TOUCH THE ABOVE!
    interactable: false
    duration:4
    scale:[35,1,50]
    animatedefiniteposition:[0,0,200,0],[0,0,-50,1]
    animatecolor:[1,0,0,stupid,0.2],[1,1,0,stupid,0.4],[0,1,0,stupid,0.6],[0,1,1,stupid,0.8],[0,0,1,stupid,1]
    track:shapeSpin

596:Wall
    repeat:{3+1}
    localrotation:[0,0,{33.8+(360/3*repeat)}]
    position:[{xPos+Cos((3.14*2/3)*LMAO)*radius-(2*radius*Tan(3.14/3))/2},{yPos+Sin((3.14*2/3)*LMAO)*radius-height/2}]
        # CHANGE ANYTHING BELOW HERE AS YOU PLEASE! DO NOT TOUCH THE ABOVE!
    interactable: false
    duration:4
    scale:[105,1,50]
    animatedefiniteposition:[0,0,200,0],[0,0,-50,1]
    animatecolor:[1,0,0,stupid,0.2],[1,1,0,stupid,0.4],[0,1,0,stupid,0.6],[0,1,1,stupid,0.8],[0,0,1,stupid,1]
    track:shapeSpin

600:Wall
    repeat:{4+1}
    localrotation:[0,0,{33.8+(360/4*repeat)}]
    position:[{xPos+Cos((3.14*2/4)*LMAO)*radius-(2*radius*Tan(3.14/4))/2},{yPos+Sin((3.14*2/4)*LMAO)*radius-height/2}]
        # CHANGE ANYTHING BELOW HERE AS YOU PLEASE! DO NOT TOUCH THE ABOVE!
    interactable: false
    duration:4
    scale:[60,1,50]
    animatedefiniteposition:[0,0,200,0],[0,0,-50,1]
    animatecolor:[1,0,0,stupid,0.2],[1,1,0,stupid,0.4],[0,1,0,stupid,0.6],[0,1,1,stupid,0.8],[0,0,1,stupid,1]
    track:shapeSpin

604:Wall
    repeat:{5+1}
    localrotation:[0,0,{33.8+(360/5*repeat)}]
    position:[{xPos+Cos((3.14*2/5)*LMAO)*radius-(2*radius*Tan(3.14/5))/2},{yPos+Sin((3.14*2/5)*LMAO)*radius-height/2},{repeat*10}]
        # CHANGE ANYTHING BELOW HERE AS YOU PLEASE! DO NOT TOUCH THE ABOVE!
    interactable: false
    duration:4
    scale:[45,1,50]
    animatedefiniteposition:[0,0,200,0],[0,0,-50,1]
    animatecolor:[1,0,0,stupid,0.2],[1,1,0,stupid,0.4],[0,1,0,stupid,0.6],[0,1,1,stupid,0.8],[0,0,1,stupid,1]
    track:shapeSpin


579:AnimateTrack
   track:shapeSpin
   duration:32
   animateRotation:[0,0,0,0],[0,0,180,1]










   



Workspace: Text

485:TextToWall
   #njsoffset:-0.5
   #njs:20
   rotation:[0,-20,0,0]
   duration:4
   animateDissolve:[0,0],[0,0.1],[0.75,0.4],[0.75,0.6],[0,0.9]
   AnimateDefinitePosition:[-3, -10, 200,0],[-3, 2.5, 30,0.3,"easeOutQuint"],[-3, 2.5, 30,0.75,"easeOutQuint"],[-200, 2.5, 30,1, "easeInCubic"]
   interactable:false
   size:0.03
   letting:2.5
   path:font.png
   color:[10,10,10,0]
   line:if   you   go    now
   track:nah

493:TextToWall
   #njsoffset:-0.5
   #njs:20
   rotation:[0,-20,0,0]
   duration:4
   animateDissolve:[0,0],[0,0.1],[0.75,0.4],[0.75,0.6],[0,0.9]
   AnimateDefinitePosition:[-3, -10, 200,0],[-3, 2.5, 30,0.3,"easeOutQuint"],[-3, 2.5, 30,0.75,"easeOutQuint"],[-200, 2.5, 30,1, "easeInCubic"]
   interactable:false
   size:0.03
   letting:2.5
   path:font.png
   color:[10,10,10,0]
   line:i   won't    mind     
   line:it    at    all...
   track:nah 

500:TextToWall
   #njsoffset:-0.5
   #njs:20
   rotation:[0,-20,0,0]
   duration:4
   animateDissolve:[0,0],[0,0.1],[0.75,0.4],[0.75,0.6],[0,0.9]
   AnimateDefinitePosition:[-3, -10, 200,0],[-3, 2.5, 30,0.3,"easeOutQuint"],[-3, 2.5, 30,0.75,"easeOutQuint"],[-200, 2.5, 30,1, "easeInCubic"]
   interactable:false
   size:0.03
   letting:2.5
   path:font.png
   color:[10,10,10,0]
   line:it's   better
   line:somehow
   track:nah

517:TextToWall
   #njsoffset:-0.5
   #njs:20
   rotation:[0,-20,0,0]
   duration:4
   animateDissolve:[0,0],[0,0.1],[0.75,0.4],[0.75,0.6],[0,0.9]
   AnimateDefinitePosition:[-3, -10, 200,0],[-3, 2.5, 30,0.3,"easeOutQuint"],[-3, 2.5, 30,0.75,"easeOutQuint"],[-200, 2.5, 30,1, "easeInCubic"]
   interactable:false
   size:0.03
   letting:2.5
   path:font.png
   color:[10,10,10,0]
   line:but    if    i'm
   line:not    there
   track:nah

524:TextToWall
   #njsoffset:-0.5
   #njs:20
   rotation:[0,-20,0,0]
   duration:6
   animateDissolve:[0,0],[0,0.1],[0.75,0.4],[0.75,0.6],[0,0.9]
   AnimateDefinitePosition:[-3, -10, 200,0],[-3, 2.5, 30,0.3,"easeOutQuint"],[-3, 2.5, 30,0.75,"easeOutQuint"],[-200, 2.5, 30,1, "easeInCubic"]
   interactable:false
   size:0.03
   letting:2.5
   path:font.png
   color:[10,10,10,0]
   line:by  the   end
   line:of  it    all...
   track:nah


533:TextToWall
   #njsoffset:-0.5
   #njs:20
   rotation:[0,-20,0,0]
   duration:4
   animateDissolve:[0,0],[0,0.1],[0.75,0.4],[0.75,0.6],[0,0.9]
   AnimateDefinitePosition:[-3, -7.5, 200,0],[-3, 2.5, 30,0.3,"easeOutQuint"],[-3, 2.5, 30,0.75,"easeOutQuint"],[-200, 2.5, 30,1, "easeInCubic"]
   interactable:false
   size:0.03
   letting:2.5
   path:font.png
   color:[10,10,10,0]
   line:i    won't    be    found
   track:nah




#end

805.5:TextToWall
   njsoffset:-0.5
   njs:20
   animateDissolve:[0,0],[1,0]
   AnimateDefinitePosition:[0,5,40,0]
   duration:5
   interactable:false
   size:0.05
   letting:2.5
   path:font.png
   color:[1,1,1,0]
   line:Vanishing    Point
   track:endCredits

813.5:TextToWall
   njsoffset:-0.5
   njs:20
   animateDissolve:[0,0],[1,0]
   AnimateDefinitePosition:[0,5,40,0]
   duration:5
   interactable:false
   size:0.05
   letting:2.5
   path:font.png
   color:[1,1,1,0]
   line:Visuals     made     by     nasafrasa
   track:endCredits

821.5:TextToWall
   njsoffset:-0.5
   njs:20
   animateDissolve:[0,0],[1,0]
   AnimateDefinitePosition:[0,5,40,0]
   duration:5
   interactable:false
   size:0.05
   letting:2.5
   path:font.png
   color:[1,1,1,0]
   line:Charting    made    by
   line:RJB    and    totally balloon
   track:endCredits





