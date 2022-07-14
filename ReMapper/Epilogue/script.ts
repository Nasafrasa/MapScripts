import { Wall, CustomEvent, Difficulty, Environment, exportZip, LOOKUP, Regex, SETTINGS, transferVisuals } from "swifter_remapper";
let map = new Difficulty("ExpertPlusStandard.dat");
let env: Environment;

/*
//////////////////////////////////////////////////////////////
// WELCOME!
//////////////////////////////////////////////////////////////

Welcome to my first (good) map script! This one is very inefficient with environment stuff,
so i recommened not copying that. Just use this if you were wondering how to use
the Billie Environment in more interesting ways.

*/


//////////////////////////////////////////////////////////////
// ENVIRONMENT MANAGEMENT
//////////////////////////////////////////////////////////////

// REMOVE

env = new Environment("PlayersPlace", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("Waterfall", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[21]RailingFullFront", LOOKUP.EXACT);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[22]LastRailingCurve", LOOKUP.EXACT);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[34]LightRailingSegment (3).[3]NeonTubeDirectionalL (1)", LOOKUP.CONTAINS);
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[34]LightRailingSegment (3).[4]NeonTubeDirectionalR (1)", LOOKUP.CONTAINS);
env.active = false;
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

env = new Environment("BillieEnvironment.[0]Environment.[28]Clouds", LOOKUP.EXACT);
env.active = false;
env.push();

env = new Environment("FarRail", LOOKUP.CONTAINS);
env.active = false;
env.push();


// MOVE

env = new Environment("BillieEnvironment.[0]Environment.[34]LightRailingSegment (3).[1]NeonTubeDirectionalL", LOOKUP.EXACT);
env.position = [3,0,-100];
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[34]LightRailingSegment (3).[2]NeonTubeDirectionalR", LOOKUP.EXACT);
env.position = [-3,0,-100];
env.active = false;
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[27]DayAndNight.[1]Night.[0]Moon", LOOKUP.EXACT);
env.localPosition = [50,150,500];  
env.scale = [22.5,22.5,22.5];
env.push();
env.duplicate = 1;
env.localPosition = [50,-150,500];  
env.rotation = [180,0,0];
env.scale = [22.5,22.5,22.5];
env.push();

env = new Environment("Sun", LOOKUP.CONTAINS);
env.active = false;
env.push();


// RAILINGS

env = new Environment("BillieEnvironment.[0]Environment.[20]RailingFullBack", LOOKUP.EXACT);
env.rotation = [0,20,0];
env.scale = [1,1,1];
env.position = [15,0,30];
env.push();
env.duplicate = 1;
env.rotation = [0,-20,0];
env.scale = [1,1,1];
env.position = [-15,0,30];
env.push();


// HUD (For people like Mawntee)

env = new Environment("BillieEnvironment.[0]Environment.[2]NarrowGameHUD.[1]LeftPanel", LOOKUP.EXACT);
env.localRotation = [0,-20,0];
env.localPosition = [-15,3.5,30];
env.scale = [2,2,2];
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[2]NarrowGameHUD.[2]RightPanel", LOOKUP.EXACT);
env.localRotation = [0,20,0];
env.localPosition = [15,2.5,30];
env.scale = [2,2,2];
env.push();

env = new Environment("BillieEnvironment.[0]Environment.[2]NarrowGameHUD.[0]EnergyPanel", LOOKUP.EXACT);
env.localRotation = [-20,0,0];
env.localPosition = [0,6,10];
env.push();


// MOUNTAIN RINGS

env = new Environment("BillieEnvironment.[0]Environment.[12]Mountains", LOOKUP.EXACT);
env.localRotation = [0,5,0];
env.scale = [1,1,1];
env.localPosition = [0,32,0];
env.push();
env.duplicate =1;
env.localRotation = [180,180+5,0];
env.scale = [1,1,1];
env.localPosition = [0,-32,0];
env.push();
env.duplicate = 1;
env.localRotation = [-90,0,0];
env.scale = [0.4,0.4,0.4];
env.localPosition = [0,-1,400];
env.trackSet = "RingFun";
env.push();


//////////////////////////////////////////////////////////////
// LASERS
//////////////////////////////////////////////////////////////

//!!! this code is like the worst thing ever

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
// WATER MANAGEMENT
//////////////////////////////////////////////////////////////

// Thank you TzurS11 for this code!
let water1 = new Wall(0, 292*2);
water1.trackSet = "water2";
water1.scale = [3000, 0.5, 3000];
water1.interactable = false;
water1.fake = true;
water1.color = [0, 0, 0, 20];
water1.animate.definitePosition = [[water1.scale[0] / -2, -0.51, water1.scale[2] / -4, 0], [water1.scale[0] / -2, -0.51, water1.scale[2] / -1, 1]];
water1.animate.dissolve = [[0, 0], [1, 0.001], [1,0.499], [0,0.5]];
water1.push();
water1.time = 2
water1.push


//////////////////////////////////////////////////////////////
// FOG MANAGEMENT
//////////////////////////////////////////////////////////////

// Fog :skull:
new CustomEvent(0).assignFogTrack("fog").push();
let event = new CustomEvent().animateTrack("fog");
event.animate.startY = [-1000];
event.animate.attenuation = [0.0001];
event.animate.height = [10];
event.push();


//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

function exportMap(diff: Difficulty) {
    diff.require("Chroma");
    diff.require("Noodle Extensions")
    diff.setSetting(SETTINGS.SCREEN_DISTORTION, true);
    diff.setSetting(SETTINGS.NO_HUD, true);
    diff.setSetting(SETTINGS.LEFT_HANDED, false);
    diff.setSetting(SETTINGS.MAX_SHOCKWAVE_PARTICLES, 0);
    diff.colorLeft = [0.35,0.37,0.38];
    diff.colorRight = [0.23, 0.69, 1];
    diff.obstacleColor = [1,1,1];
}
exportMap(map);
transferVisuals(["ExpertStandard.dat","ExpertPlusLightshow.dat"], x => { exportMap(x) });
map.save();
exportZip(["ExpertPlusLawless.dat"]);