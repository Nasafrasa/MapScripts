import { info, activeDiff, Difficulty, LOOKUP, Environment, ENV, CustomEvent, Regex, Wall, BlenderEnvironment, EVENT, LightRemapper, SETTINGS, PRESET } from "swifter_remapper";
let map = new Difficulty("ExpertPlusStandard.dat");
let env: Environment;


env = new Environment("PillarTrackLaneRing", LOOKUP.CONTAINS);
env.active = false;
env.push();
env.id = "SideLaser";
env.push();
//env.id = "CloudsGenerator";
//env.push();
//env.id = "DirectionalLight";
//env.push();
env.id = "TrackMirror";
env.push();
env.id = "Cube";
env.push();

// Remove with regex
env.lookupMethod = LOOKUP.REGEX;
env.id = "Construction$";
env.push();
env.id = "LowCloudsGenerator$";
env.push();
//env.id = "HighCloudsGenerator$";
//env.push();
env.id = "RectangleFakeGlow$";
env.push();

env.lookupMethod = LOOKUP.EXACT;
env.id = "BTSEnvironment.[0]Environment.[6]PlayersPlace.[0]Mirror";
env.push();
env.id = "BTSEnvironment.[0]Environment.[13]PillarTrackLaneRingsR";
env.push();
env.id = "BTSEnvironment.[0]Environment.[14]PillarTrackLaneRingsR (1)";
env.push();

// Move outta sightssssss
env = new Environment("GlowLine", LOOKUP.CONTAINS);
env.position = [0, -69420, 0];
env.push();
env.id = "BottomGlow";
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = "HighCloudsGenerator$";
env.position = [0, 200, 0];
env.rotation = [0, 0, 0];
env.scale = [2, 2, 2];
env.duplicate = 1;
env.position = [0, 225, 0];
env.rotation = [0, 180, 0];
env.scale = [2, 2, 2];
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = "LowCloudsGenerator$";
env.position = [0, -9, 0];
env.rotation = [0, 0, 0];
env.push();

// Fog stuff
new CustomEvent().assignFogTrack("fog").push();
let event = new CustomEvent().animateTrack("fog");
event.animate.startY = [-3];
event.animate.attenuation = [0.0001];
event.animate.height = [1.63];
event.push();

//AURORA

let lightZ = 370;
let lightY = 300;

env = new Environment("MagicDoorSprite$", LOOKUP.REGEX);
env.scale = [10, 1 / 10000, 1]
env.position = [0, lightY, lightZ]
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = new Regex().add("MagicDoorSprite").seperate().add("Bloom(L|R)").end().string;
env.scale = [1, 10000, 1];
env.rotation = [0, 0, 90]
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = new Regex().add("MagicDoorSprite").seperate().add("BloomR").end().string;
env.position = [0, lightY + 5, lightZ];
env.push();


//// LASERS!!!!!

// LEFT LASERS (WATER)

let laserWidth = 2.5;
let laserNum = 0;
for (let i = 0; i <= 8; i++) {
    for (let s = -1; s <= 1; s += 2) {
        let pair = new Regex().add(i % 2 === 0 ? "PillarPair" : "SmallPillarPair").vary(Math.floor(i / 2)).string;
        let side = s === -1 ? "L" : "";
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

        if (i == 0) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, 0, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 1) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, 15, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 2) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, -15, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 3) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, 30, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 4) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, -30, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 5) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, 45, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 6) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, -45, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 7) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, 60, 0];
            env.scale = [laserWidth, 1, laserWidth];
        } else if (i == 8) {
            env.position = [0, -1.5, 0]; 
            env.rotation = [90, -60, 0];
            env.scale = [laserWidth, 1, laserWidth];
        }
        
        env.push();
        
    }
}

// RIGHT LASERS (MOUNTAIN BACK)

for (let i = 0; i <= 8; i++) {
    for (let s = -1; s <= 1; s += 2) {
        let pair = new Regex().add(i % 2 === 0 ? "PillarPair" : "SmallPillarPair").vary(Math.floor(i / 2)).string;
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

        if (i == 0) {
            env.position = [0, -10, 400]; // Mountain Lights
            env.rotation = [0, 0, 0];
            env.scale = [50, 1, 50];
        } else if (i == 1) {
            env.position = [50, -10, 390];
            env.rotation = [0, 20, -20];
            env.scale = [50, 1, 50];
        } else if (i == 2) {
            env.position = [-50, -10, 390];
            env.rotation = [0, -20, 20];
            env.scale = [50, 1, 50];
        } else if (i == 3) {
            env.position = [100, -10, 375];
            env.rotation = [0, 40, -40];
            env.scale = [50, 1, 50];
        } else if (i == 4) {
            env.position = [-100, -10, 375];
            env.rotation = [0, -40, 40];
            env.scale = [50, 1, 50];
        } else if (i == 5) {
            env.position = [150, -10, 350];
            env.rotation = [0, 60, -60];
            env.scale = [50, 1, 50];
        } else if (i == 6) {
            env.position = [-150, -10, 350];
            env.rotation = [0, -60, 60];
            env.scale = [50, 1, 50];
        } else if (i == 7) {
            env.position = [200, -10, 325];
            env.rotation = [0, 80, -80];
            env.scale = [50, 1, 50];
        } else if (i == 8) {
            env.position = [-200, -10, 325];
            env.rotation = [0, -80, 80];
            env.scale = [50, 1, 50];
        }
        
        env.push();
        
    }
}

// INNER LASERS (MOUNTAIN FRONT)

for (let i = 0; i <= 8; i++) {
    for (let s = -1; s <= 1; s += 2) {
        let pair = new Regex().add(i % 2 === 0 ? "PillarPair" : "SmallPillarPair").vary(Math.floor(i / 2)).string;
        let side = s === -1 ? "L" : "R";
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
        env.id = new Regex().add(id).seperate().add(`Laser${side}`).end().string;
        
        env.trackSet = `laser${laserNum}`;

        if (i == 1) {
            env.position = [50, -10, 190];
            env.rotation = [0, 20, -20];
            env.scale = [50, 1, 50];
        } else if (i == 3) {
            env.position = [-50, -10, 190];
            env.rotation = [0, -20, 20];
            env.scale = [50, 1, 50];
        } else if (i == 5) {
            env.position = [100, -10, 175];
            env.rotation = [0, 40, -40];
            env.scale = [50, 1, 50];
        } else if (i == 7) {
            env.position = [-100, -10, 175];
            env.rotation = [0, -40, 40];
            env.scale = [50, 1, 50];
        } 
        
        env.push();
        
    }
}


let blenderEnv = new BlenderEnvironment(ENV.BTS.PILLAR.SCALE, ENV.BTS.PILLAR.ANCHOR, ENV.BTS.PILLAR.ID, LOOKUP.REGEX);


blenderEnv.static("env", x => { x.active = true })

blenderEnv.animate([
    ["env", 0, 0]
])


//// EXPORT

function exportMap(diff: Difficulty) {
    diff.require("Chroma");
    diff.require("Noodle Extensions")
    diff.setSetting(SETTINGS.NO_HUD, true);
    diff.colorLeft = [0.278,0.71,1];
    diff.colorRight = [0.075, 0.388, 0.875];
    diff.obstacleColor = [0,0,0];
}
exportMap(map);


map.save();