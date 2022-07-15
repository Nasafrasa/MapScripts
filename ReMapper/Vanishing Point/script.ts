import { CustomEventInternals, notesBetween,  KeyframesAny, Wall, rand,  activeDiff, Animation, AnimationInternals, arrAdd, BlenderEnvironment, complexifyArray, copy, CustomEvent, Difficulty, ENV, Environment, EVENT, Event, exportZip, LightRemapper, LOOKUP, PRESET, Regex, rotatePoint, SETTINGS, transferVisuals, EASE, Note } from "swifter_remapper";
import * as Nootils from 'nootils'
import { GiveNotesTrack } from "nootils";
let map = new Difficulty("ExpertPlusStandard.dat");
let env: Environment;


/* TO DO LIST:

- make chroma lighting
- note animations(?)
- do more stuff with 1st drop (noodles)
?- make 2nd drop part 1 effects
- change settings
- align path lights
- remove extra neon tubes
- do stuff with rain (and remove path droplet splahes)
- smoother 1st drop to verse
- move lyrics over a little
- make moon more moon at end
- make credits text further away and less bloom
- fix enth eye
- fix smoke intro at end of drop 1

*/

// FUNCTIONS IG


function EnvSwitch(start: number, end: number, xpos: number, ypos: number, zpos: number, name: string){
    let thing = new CustomEvent().animateTrack(name)
    thing.time = 0;
    thing.animate.localPosition = [0,-100000,0];
    thing.push();
    thing.time = start;
    thing.animate.localPosition = [xpos,ypos,zpos];
    thing.push();
    thing.time = end;
    thing.animate.localPosition = [0,-100000,0];
    thing.push();
}


//////////////////////////////////////////////////////////////
// ENVIRONMENT ONE [SUNSET]
//////////////////////////////////////////////////////////////

env = new Environment("BillieEnvironment.[0]Environment.[20]RailingFullBack", LOOKUP.EXACT);
env.rotation = [0,90,0];
env.scale = [1,1,1];
env.position = [20,0,0];
env.trackSet = "Environment1";
env.push();

env.duplicate = 1;
env.rotation = [0,90,0];
env.scale = [1,1,1];
env.position = [-20,0,0];
env.trackSet = "Environment1";
env.push();

env.duplicate = 1;
env.rotation = [0,20,0];
env.scale = [1,1,1];
env.position = [-10,0,-15];
env.trackSet = "Environment1";
env.push();

env.duplicate = 1;
env.rotation = [0,-20,0];
env.scale = [1,1,1];
env.position = [10,0,-15];
env.trackSet = "Environment1";
env.push();



env.duplicate = 1;
env.rotation = [-16.3,17.1,-1.46];
env.scale = [1,1,1];
env.position = [10.53+7,0,21.59];
env.trackSet = "Environment3a";
EnvSwitch(420, 548, 10.53+7,0,21.59, "Environment3a");
env.push();

env.duplicate = 1;
env.rotation = [11,24,10,];
env.scale = [1,1,1];
env.position = [-33.17,0,51.73];
env.trackSet = "Environment3b";
EnvSwitch(420, 548, -33.17,0,51.73, "Environment3b");
env.push();

env.duplicate = 1;
env.rotation = [-10,32.9,4.75,];
env.scale = [1,1,1];
env.position = [25.64,0,60.61];
env.trackSet = "Environment3c";
EnvSwitch(420, 548, 25.64,0,60.61, "Environment3c");
env.push();

env.duplicate = 1;
env.rotation = [10.8,-24.6,-1.8,];
env.scale = [1,1,1];
env.position = [-9.73,0,76.19];
env.trackSet = "Environment3d";
EnvSwitch(420, 548, -9.73,0,76.19, "Environment3d");
env.push();

env.duplicate = 1;
env.rotation = [16,17.7,-6,];
env.scale = [1,1,1];
env.position = [17.17,0,93.59];
env.trackSet = "Environment3e";
EnvSwitch(420, 548, 17.17,0,93.59, "Environment3e");
env.push();

env.duplicate = 1;
env.rotation = [-16.3,-45.1,-1.46];
env.scale = [1,1,1];
env.position = [-20.53,0,5.59];
env.trackSet = "Environment3n";
EnvSwitch(420, 548, -20.53,0,5.59, "Environment3n");
env.push();

env.duplicate = 1;
env.rotation = [0,0,0];
env.scale = [1,1,1];
env.position = [0,0,21.186];
env.trackSet = "Environment3o";
EnvSwitch(676, 804, 0,0,21.186, "Environment3o");
env.push();




env = new Environment("BillieEnvironment.[0]Environment.[27]DayAndNight.[0]Day.[0]Sun", LOOKUP.EXACT);
env.localPosition = [0,1,325];  
env.scale = [12.5,12.5,1];
env.push();


env = new Environment("Moon", LOOKUP.CONTAINS);
env.localPosition = [0,1,325];  
env.scale = [12.5,12.5,1];
env.push();



env = new Environment("PlayersPlace", LOOKUP.CONTAINS);
env.active = false;
env.push();


env = new Environment("BillieEnvironment.[0]Environment.[2]NarrowGameHUD", LOOKUP.EXACT);
env.active = false;
env.push();


env = new Environment("Waterfall", LOOKUP.CONTAINS);
env.rotation = [180,0,0];
env.active = false;
env.trackSet = "Environment2";
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[21]RailingFullFront", LOOKUP.EXACT);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[22]LastRailingCurve", LOOKUP.EXACT);
env.active = false;
env.push();


// KNEYON TUBES

env = new Environment("BillieEnvironment.[0]Environment.[34]LightRailingSegment (3).[1]NeonTubeDirectionalL", LOOKUP.EXACT);
env.position = [3,0,-100];
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[34]LightRailingSegment (3).[2]NeonTubeDirectionalR", LOOKUP.EXACT);
env.position = [-3,0,-100];
env.push();





env = new Environment("BillieEnvironment.[0]Environment.[31]LightRailingSegment.[", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[32]LightRailingSegment (1)", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[33]LightRailingSegment (2)", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[25]WaterRainRipples", LOOKUP.CONTAINS);
env.active = false;
env.push();


env = new Environment("BillieEnvironment.[0]Environment.[24]Rain", LOOKUP.CONTAINS);
env.trackSet = "rain";
EnvSwitch(676, 804, 0, 10, 0, "rain");
env.push();








env = new Environment("LeftRail", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("RightRail", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("LeftFarRail1", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("LeftFarRail2", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("RightFarRail1", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("RightFarRail2", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("RailingCurveF", LOOKUP.CONTAINS);
env.active = false;
env.push();




// REMOVE

env = new Environment("BillieEnvironment.[0]Environment.[28]Clouds", LOOKUP.EXACT);
env.active = false;
env.trackSet = "Environment1";
env.push();

env = new Environment("FarRail", LOOKUP.CONTAINS);
env.active = false;
env.push();

// RINGS

env = new Environment("BillieEnvironment.[0]Environment.[12]Mountains", LOOKUP.EXACT);
/*env.localRotation = [-90,45,0];
env.scale = [0.01,0.01,0.01];
env.localPosition = [20,-1,30];
env.trackSet = "Environment1";
env.push();
*/
env.localRotation = [0,0,0];
env.scale = [1,1,1];
env.localPosition = [0,32,0];
env.trackSet = "Environment1";
env.push();

env.duplicate =1;
env.localRotation = [180,180,0];
env.scale = [1,1,1];
env.localPosition = [0,-32,0];
env.trackSet = "Environment1";
env.push();

env.duplicate = 1;
env.localRotation = [-90,0,0];
env.scale = [0.4,0.4,0.4];
env.localPosition = [0,-1,400];
env.trackSet = "RingFun";
env.push();

// ENVIRONMENT 2
env.duplicate = 1;
env.localRotation = [0,0,0];
env.scale = [1,1,1];
env.localPosition = [0,32,0];
env.trackSet = "Environment3f";
EnvSwitch(420, 548, 0,32,0, "Environment3f");
env.push();

env.duplicate =1;
env.localRotation = [180,180,0];
env.scale = [1,1,1];
env.localPosition = [0,-32,0];
env.trackSet = "Environment3g";
EnvSwitch(420, 548, 0,-32,0, "Environment3g");
env.push();


// smol rocks
env.duplicate = 1;
env.scale = [0.01,0.01,0.01];
env.position = [10.53+7,0,21.59];
env.localRotation = [0,0,0];
env.trackSet = "Environment3h";
EnvSwitch(420, 548, 10.53+7,0,21.59, "Environment3h");
env.push();

env.duplicate = 1;
env.scale = [0.01,0.01,0.01];
env.position = [-33.17,0,51.73];
env.localRotation = [0,0,0];
env.trackSet = "Environment3i";
EnvSwitch(420, 548, -33.17,0,51.73, "Environment3i");
env.push();

env.duplicate = 1;
env.scale = [0.01,0.01,0.01];
env.position = [25.64,0,60.61];
env.localRotation = [0,0,0];
env.trackSet = "Environment3j";
EnvSwitch(420, 548, 25.64,0,60.61, "Environment3j");
env.push();

env.duplicate = 1;
env.scale = [0.01,0.01,0.01];
env.position = [-9.73,0,76.19];
env.localRotation = [0,0,0];
env.trackSet = "Environment3k";
EnvSwitch(420, 548, -9.73,0,76.19, "Environment3k");
env.push();

env.duplicate = 1;
env.scale = [0.01,0.01,0.01];
env.position = [17.17,0,93.59];
env.localRotation = [0,0,0];
env.trackSet = "Environment3l";
EnvSwitch(420, 548, 17.17,0,93.59, "Environment3l");
env.push();

env.duplicate = 1;
env.scale = [0.01,0.01,0.01];
env.position = [-20.53,0,5.59];
env.localRotation = [0,0,0];
env.trackSet = "Environment3m";
EnvSwitch(420, 548, -20.53,0,5.59, "Environment3m");
env.push();





//////////////////////////////////////////////////////////////
// ENVIRONMENT TWO [CAVE]
//////////////////////////////////////////////////////////////

let laserScale = 5;
let laserHeight = 0;
for (let i = 0; i <= 17; i++) {
    for (let s = -1; s <= 1; s += 2) {
        let pair = new Regex().add(i % 2 === 0 ? "BottomPairLasers" : "BottomPairLasers").vary(Math.floor(i / 2)).string;
        let side = s === -1 ? "R" : "";
        let id = new Regex().start().add(pair).seperate().add(`Pillar${side}`).string;


        env = new Environment(undefined, LOOKUP.REGEX);
        env.id = new Regex().add(pair).seperate().add(`Pillar${side}`).seperate().add("Pillar").end().string;
        env.position = [0,0,69420];
        env.push();

 
        env.id = new Regex().add(id).seperate().add(`RotationBase${side}`).seperate().add("(Reflector$|LaserLight)").string;
        env.position = [0,0,69420];
        env.push();


        env.id = new Regex().add(id).seperate().add("LaserLight").string;
        env.position = [0,0,69420];
        env.push();

        env = new Environment(undefined, LOOKUP.REGEX);
        env.id = new Regex().add(id).seperate().add(`RotationBase${side}`).seperate().add(`Laser${side}H$`).string;


        if (i == 1) {
            env.position = [-7.3*4, laserHeight, 39*3]; // Mountain Lights
            env.rotation = [0, 10, 2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 3) {
            env.position = [-22*4, laserHeight, 50*3];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 5) {
            env.position = [-17*4, laserHeight, 63*3];
            env.rotation = [0, 0, 2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 7) {
            env.position = [-39*4, laserHeight, 72*3];
            env.rotation = [0, 0, -5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 9) {
            env.position = [-2*4, laserHeight, 84.5*3];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 11) {
            env.position = [8*4, laserHeight, 74*3];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 13) {
            env.position = [11*4, laserHeight, 56*3];
            env.rotation = [0, 0, 2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 15) {
            env.position = [19*4, laserHeight, 51*3];
            env.rotation = [0, 0, 5];
            env.scale = [laserScale / 2, 1, laserScale / 2];
        } else if (i == 17) {
            env.position = [38*4, laserHeight, 74*3];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale / 2, 1, laserScale / 2];
        }
        
        env.push();
        
    }
}

for (let i = 0; i <= 17; i++) {
    for (let s = -1; s <= 1; s += 2) {
        let pair = new Regex().add(i % 2 === 0 ? "BottomPairLasers" : "BottomPairLasers").vary(Math.floor(i / 2)).string;
        let side = s === -1 ? "" : "L";
        let id = new Regex().start().add(pair).seperate().add(`Pillar${side}`).string;


        env = new Environment(undefined, LOOKUP.REGEX);
        env.id = new Regex().add(pair).seperate().add(`Pillar${side}`).seperate().add("Pillar").end().string;
        env.position = [0,0,69420];
        env.push();

 
        env.id = new Regex().add(id).seperate().add(`RotationBase${side}`).seperate().add("(Reflector$|LaserLight)").string;
        env.position = [0,0,69420];
        env.push();


        env.id = new Regex().add(id).seperate().add("LaserLight").string;
        env.position = [0,0,69420];
        env.push();

        env = new Environment(undefined, LOOKUP.REGEX);
        env.id = new Regex().add(id).seperate().add(`RotationBase${side}`).seperate().add(`Laser${side}H$`).string;


        if (i == 1) {
            env.position = [-7.3*4, laserHeight, 39*3]; // Mountain Lights
            env.rotation = [180, 10, 2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 3) {
            env.position = [-22*4, laserHeight, 50*3];
            env.rotation = [180, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 5) {
            env.position = [-17*4, laserHeight, 63*3];
            env.rotation = [180, 0, 2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 7) {
            env.position = [-39*4, laserHeight, 72*3];
            env.rotation = [180, 0, -5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 9) {
            env.position = [-2*4, laserHeight, 84.5*3];
            env.rotation = [180, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 11) {
            env.position = [8*4, laserHeight, 74*3];
            env.rotation = [180, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 13) {
            env.position = [11*4, laserHeight, 56*3];
            env.rotation = [180, 0, 2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 15) {
            env.position = [19*4, laserHeight, 51*3];
            env.rotation = [180, 0, 5];
            env.scale = [laserScale / 2, 1, laserScale / 2];
        } else if (i == 17) {
            env.position = [38*4, laserHeight, 74*3];
            env.rotation = [180, 0, -2.5];
            env.scale = [laserScale / 2, 1, laserScale / 2];
        }
        
        env.push();
        
    }
}


//////////////////////////////////////////////////////////////
// ENVIRONMENT MANAGEMENT
//////////////////////////////////////////////////////////////

let Environment1 = new CustomEvent().animateTrack("Environment1")
Environment1.time = 292;
Environment1.animate.localPosition = [0,-100000,0];
Environment1.push();



let Environment2 = new CustomEvent().animateTrack("Environment2")
Environment2.time = 0;
Environment2.animate.localPosition = [0,-100000,0];
Environment2.push();
Environment2.time = 292;
Environment2.animate.localPosition = [0,-40,0];
Environment2.push();
Environment2.time = 420; //nice
Environment2.animate.localPosition = [0,-100000,0];
Environment2.push();

let Environment3 = new CustomEvent().animateTrack("Environment3")
Environment3.time = 0;
Environment3.animate.localPosition = [0,-100000,0];
Environment3.push();
Environment3.time = 420;
Environment3.animate.localPosition = [0,0,0];
Environment3.push();
Environment3.time = 548;
Environment3.animate.localPosition = [0,-100000,0];
Environment3.push();



//////////////////////////////////////////////////////////////
// WATER MANAGEMENT
//////////////////////////////////////////////////////////////

let water1 = new Wall(0, 292*2);//spawning the water 3 or 4 beats before the scene with the water youll see why below keep reading the comments
water1.trackSet = "water2";
water1.scale = [3000, 0.5, 3000];
water1.interactable = false;
water1.fake = true;
water1.color = [0, 0, 0, 20];
water1.animate.definitePosition = [[water1.scale[0] / -2, -0.51, water1.scale[2] / -4, 0], [water1.scale[0] / -2, -0.51, water1.scale[2] / -1, 1]];//im using here water scale so it would just put the water in the middle of the map -> 0,0,0 will be the center of the wall(only x and z because y will be something that you choose) feel free to keep it its not a varible that i created. its with the scale i set
water1.animate.dissolve = [[0, 0], [1, 0.001], [1,0.499], [0,0.5]];
water1.push();
water1.time = 4
water1.push


let water2 = new Wall(422, 126*2);//spawning the water 3 or 4 beats before the scene with the water youll see why below keep reading the comments
water2.trackSet = "water3";
water2.scale = [1000, 0.5, 1000];
water2.interactable = false;
water2.fake = true;
water2.color = [0, 0, 0, 20];
water2.animate.definitePosition = [[water2.scale[0] / -2, -0.51, water2.scale[2] / -4, 0], [water2.scale[0] / -2, -0.51, water2.scale[2] / -1, 1]];//im using here water scale so it would just put the water in the middle of the map -> 0,0,0 will be the center of the wall(only x and z because y will be something that you choose) feel free to keep it its not a varible that i created. its with the scale i set
water2.animate.dissolve = [[0, 0], [1, 0.001], [1,0.499], [0,0.5]];
water2.push();
water2.time = 420
water2.push

let water4 = new Wall(612, 128);//spawning the water 3 or 4 beats before the scene with the water youll see why below keep reading the comments
water4.trackSet = "water5";
water4.scale = [2000, 12, 2000];
water4.interactable = false;
water4.fake = true;
water4.color = [0, 0, 0, 150];
water4.animate.definitePosition = [[water4.scale[0] / -2 -6, 0, water4.scale[2] / -4, 0], [water4.scale[0] / -2 -6, 18, water4.scale[2] / -1, 1]];//im using here water scale so it would just put the water in the middle of the map -> 0,0,0 will be the center of the wall(only x and z because y will be something that you choose) feel free to keep it its not a varible that i created. its with the scale i set
water4.animate.dissolve = [[0, 0], [1, 0.001], [1,0.499], [0,0.5]];
water4.animate.localRotation = [[0,0,0,0],[0,0,180,0.5],[0,0,-0,1]];
water4.push();
water4.time = 612
water4.push

let water3 = new Wall(676, 128*2);//spawning the water 3 or 4 beats before the scene with the water youll see why below keep reading the comments
water3.trackSet = "water4";
water3.scale = [1500, 0.5, 1500];
water3.interactable = false;
water3.fake = true;
water3.color = [0, 0, 0, 10];
water3.animate.definitePosition = [[water3.scale[0] / -2, -0.51, water3.scale[2] / -4, 0], [water3.scale[0] / -2, -0.51, water3.scale[2] / -2, 1]];//im using here water scale so it would just put the water in the middle of the map -> 0,0,0 will be the center of the wall(only x and z because y will be something that you choose) feel free to keep it its not a varible that i created. its with the scale i set
water3.animate.dissolve = [[0, 0], [1, 0.001], [1,0.499], [0,0.5]];
water3.push();
water3.time = 676
water3.push



/*let funNumber = rand(0,20);
for (let i = 0; i <= 3; i++) {
let glitch = new Wall(292, 100);
glitch.scale = [3000, 3000, 0.5];
glitch.animate.definitePosition = [-1500+(i*2),-300,-10+(i*10)];
glitch.interactable = false;
glitch.fake = true;
glitch.duration = 128;
glitch.animate.dissolve = [[0.5 * (i / 2),0]];
glitch.animate.color = 
[[0,0,0,funNumber,0],
[0,0,0,funNumber,0.05],
[0,0,0,funNumber,0.1],
[0,0,0,funNumber,0.15],
[0,0,0,funNumber,0.2],
[0,0,0,funNumber,0.25],
[0,0,0,funNumber,0.30],
[0,0,0,funNumber,0.35],
[0,0,0,funNumber,0.4],
[0,0,0,funNumber,0.45],
[0,0,0,funNumber,0.5],
[0,0,0,funNumber,0.55],
[0,0,0,funNumber,0.60],
[0,0,0,funNumber,0.65],
[0,0,0,funNumber,0.70],
[0,0,0,funNumber,0.75],
[0,0,0,funNumber,0.80],
[0,0,0,funNumber,0.85],
[0,0,0,funNumber,0.90],
[0,0,0,funNumber,0.95],
[0,0,0,funNumber,1]];
glitch.push();
}*/

Nootils.GiveTypeNotesTrack("noteL", "noteR", 0, 831)



let noteL = new CustomEvent().animateTrack("noteL");
noteL.trackSet = "noteL";
noteL.animate.color = [0.35,0.37,0.38,1];
noteL.push();

let noteR = new CustomEvent().animateTrack("noteR");
noteR.trackSet = "noteR";
noteR.time = 0;
noteR.animate.color = [0.93, 0.60, 0.29,1];
noteR.push();
noteR.time = 292;
noteR.duration = 1;
noteR.animate.color = [0.9, 0, 0, 1];
noteR.push();
noteR.time = 420;
noteR.duration = 1;
noteR.animate.color = [0.8, 0.8, 0.82, 1];
noteR.push();
noteR.time = 484;
noteR.duration = 0;
noteR.animate.color = [0.93, 0.60, 0.29,1];
noteR.push();
noteR.time = 676;
noteR.duration = 0;
noteR.animate.color = [0.557,0.702,0.776,1];
noteR.push();




//////////////////////////////////////////////////////////////
// FOG MANAGEMENT
//////////////////////////////////////////////////////////////

new CustomEvent().assignFogTrack("fog").push();
let event = new CustomEvent().animateTrack("fog");
event.animate.startY = [-1000];
event.animate.attenuation = [0.0001];
event.animate.height = [10];
event.push();



new CustomEvent(164).assignFogTrack("fog1").push();
new CustomEvent(164).animateTrack("fog1", 16, {_attenuation: [[0.0001, 0],[0.1, 1, EASE.IN_CUBIC]]}).push();
new CustomEvent(180).animateTrack("fog1", 0.5, {_attenuation: [[0.0001, 0],[0.0001, 1]]}).push();
new CustomEvent(181).animateTrack("fog1", 0.5, {_startY: [[-10000, 0],[-10000, 1]]}).push();


new CustomEvent(356).animateTrack("fog1", 0.1, {_startY: [[100000, 0],[100000, 1]]}).push();
new CustomEvent(356).animateTrack("fog1", 0.1, {_attenuation: [[0.1, 0],[0.1, 1]]}).push();

new CustomEvent(357).animateTrack("fog1", 0.1, {_startY: [[-10000, 0],[-10000, 1]]}).push();
new CustomEvent(357).animateTrack("fog1", 0.1, {_attenuation: [[0.0001, 0],[0.0001, 1]]}).push();


new CustomEvent(610).animateTrack("fog1", 0.1, {_startY: [[100000, 0],[100000, 1]]}).push();
new CustomEvent(610).animateTrack("fog1", 0.1, {_attenuation: [[0.1, 0],[0.1, 1]]}).push();

new CustomEvent(612).animateTrack("fog1", 0.1, {_startY: [[-10000, 0],[-10000, 1]]}).push();
new CustomEvent(612).animateTrack("fog1", 0.1, {_attenuation: [[0.0001, 0],[0.0001, 1]]}).push();


new CustomEvent(610).animateTrack("fog1", 0.1, {_startY: [[100000, 0],[100000, 1]]}).push();
new CustomEvent(610).animateTrack("fog1", 0.1, {_attenuation: [[0.1, 0],[0.1, 1]]}).push();

new CustomEvent(612).animateTrack("fog1", 0.1, {_startY: [[-10000, 0],[-10000, 1]]}).push();
new CustomEvent(612).animateTrack("fog1", 0.1, {_attenuation: [[0.0001, 0],[0.0001, 1]]}).push();


new CustomEvent(674).animateTrack("fog1", 0.1, {_startY: [[100000, 0],[100000, 1]]}).push();
new CustomEvent(674).animateTrack("fog1", 0.1, {_attenuation: [[0.1, 0],[0.1, 1]]}).push();

new CustomEvent(676).animateTrack("fog1", 0.1, {_startY: [[-10000, 0],[-10000, 1]]}).push();
new CustomEvent(676).animateTrack("fog1", 0.1, {_attenuation: [[0.001, 0],[0.001, 1]]}).push();


for(let index = 1; index <= 100; index++) {

    let note = new Note(243.5, 3, 0);
    note.spawnEffect = false;
    note.noteGravity = false;
    note.noteLook = false;
    note.trackSet = `NoteExplode${index}`;
    note.fake = true;
    note.interactable = false;
    note.animate.position = [0,-7,-5];
    note.color = [0, 0, 0, 2];
    note.time = 243.5;
    note.animate.dissolve = [[0.8,0]];
    note.push();

    new CustomEvent(0).animateTrack(`NoteExplode${index}`,0, {_time: [[0.5,0]]}).push();

    new CustomEvent(244).animateTrack(`NoteExplode${index}`,12, {
    _position: [[0, -10, 50, 0], [rand(-200,200), rand(-20,80), rand(75,200), 1, EASE.OUT_QUART]],
    _scale: [[0,0,0,0],[rand(10,20),rand(10,20),rand(10,20),1, EASE.OUT_QUART]],
    _localRotation: [[0,0,0,0],[rand(0,360),rand(0,360),rand(0,360),1, EASE.OUT_QUART]]
    }).push();

    new CustomEvent(0).assignTrackParent([`NoteExplode${index}`], "NoteExplode").push();

    new CustomEvent(253).animateTrack("NoteExplode", 36, {_position: [[0, 0, 0, 0], [0, -10, 50,1, EASE.IN_OUT_SINE]]}).push();

    new CustomEvent(260).animateTrack("NoteExplode", 5, {_scale: [[1,1,1,0],[0,0,0,1,EASE.IN_OUT_SINE]]}).push();

}

/*
for(let index2 = 1; index2 <= 100; index2++) {

    let note2 = new Note(547.25, 3, 0);
    note2.spawnEffect = false;
    note2.noteGravity = false;
    note2.noteLook = false;
    note2.trackSet = `NoteExplode1${index2}`;
    note2.fake = true;
    note2.interactable = false;
    note2.animate.position = [0,-7,-5];
    note2.color = [1, 1, 1, 2];
    note2.time = 547.25;
    note2.animate.dissolve = [[0.8,0]];
    note2.push();

    new CustomEvent(0).animateTrack(`NoteExplode1${index2}`,0, {_time: [[0.5,0]]}).push();

    new CustomEvent(547.75).animateTrack(`NoteExplode1${index2}`,12, {
    _position: [[0, 0, 200, 0], [rand(-200,200), rand(-80,80), rand(75,200), 1, EASE.OUT_QUART]],
    _scale: [[0,0,0,0],[rand(10,20),rand(10,20),rand(10,20),1, EASE.OUT_QUART]],
    _localRotation: [[0,0,0,0],[rand(0,360),rand(0,360),rand(0,360),1, EASE.OUT_QUART]]
    }).push();

    new CustomEvent(0).assignTrackParent([`NoteExplode1${index2}`], "NoteExplode1").push();

    new CustomEvent(553).animateTrack("NoteExplode1", 36, {_position: [[0, 0, 0, 0], [0, -10, 50,1, EASE.IN_OUT_SINE]]}).push();

    new CustomEvent(555).animateTrack("NoteExplode1", 5, {_scale: [[1,1,1,0],[0,0,0,1,EASE.IN_OUT_SINE]]}).push();

}*/
/*for(let index2 = 1; index2 <= 100; index2++) {

    let note1 = new Note(292, 3, 0);
    note1.spawnEffect = false;
    note1.noteGravity = false;
    note1.noteLook = false;
    note1.fake = true;
    note1.interactable = false;
    note1.animate.scale = [50,50,50];
    note1.color = [1, 0, 0, 1];
    note1.time = 292;
    note1.trackSet = `NoteExplode2${index2}`;
    note1.push();

    new CustomEvent(0).animateTrack(`NoteExplode2${index2}`,0, {_time: [[0.5,0]]}).push();

    new CustomEvent(292).animateTrack(`NoteExplode2${index2}`,12, {
    _position: [[rand(-200,200),rand(-200,200),rand(50,200), 0], [rand(-200,200),rand(-200,200),rand(50,200), 1, EASE.OUT_QUART]],
    }).push();

}*/



//new CustomEvent(292).animateTrack("RingFun", 16, {_localRotation: [[-90,0,90,0],[-90,0,0,1, EASE.OUT_CUBIC]]}).push();

// Nootils (+ more!)

Nootils.Smoke(424, 544-424, 4, 1, 13.5+7, -2, 21.59)
Nootils.Smoke(424, 544-424, 4, 1, -33.17, -2, 51.73)
Nootils.Smoke(424, 544-424, 4, 1, 28.64, -2, 60.61)
Nootils.Smoke(424, 544-424, 4, 1, -8.73, -2, 76.19)
Nootils.Smoke(424, 544-424, 4, 1, 19.17, -2, 93.59)
Nootils.Smoke(424, 544-424, 4, 1, -20.5, -2, 5.59)

Nootils.FloatingDebris(548, 676, 2, 1)





//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

function exportMap(diff: Difficulty) {
    diff.require("Chroma");
    diff.require("Noodle Extensions")
    diff.settings = PRESET.MODCHART_SETTINGS;
    diff.setSetting(SETTINGS.NO_HUD, true);
    diff.setSetting(SETTINGS.LEFT_HANDED, false);
    diff.setSetting(SETTINGS.NO_HUD, true);
    diff.setSetting(SETTINGS.MAX_SHOCKWAVE_PARTICLES, 0);
    diff.colorLeft = [0.35,0.37,0.38];
    diff.colorRight = [0.93, 0.60, 0.29];
    diff.obstacleColor = [1,1,1];
}
exportMap(map);
transferVisuals(["ExpertPlusLawless.dat"], x => { exportMap(x) });
map.save();
exportZip(["ExpertLawless.dat"]);