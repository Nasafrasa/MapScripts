import { CustomEventInternals, activeDiff, Animation, AnimationInternals, arrAdd, BlenderEnvironment, complexifyArray, copy, CustomEvent, Difficulty, ENV, Environment, EVENT, Event, exportZip, LightRemapper, LOOKUP, PRESET, Regex, rotatePoint, SETTINGS, transferVisuals } from "swifter_remapper";
import * as Nootils from 'nootils'
let map = new Difficulty("ExpertPlusStandard.dat");
let env: Environment;

//////////////////////////////////////////////////////////////
// ENVIRONMENT REMOVAL
//////////////////////////////////////////////////////////////

// Remove with Contains

env = new Environment("PillarTrackLaneRing", LOOKUP.CONTAINS);
env.active = false;
env.push();
env.id = "SideLaser";
env.push();
env.id = "CloudsGenerator";
env.push();
env.id = "TrackMirror";
env.push();
env.id = "Cube";
env.push();

// Remove with Regex

env.lookupMethod = LOOKUP.REGEX;
env.id = "Construction$";
env.push();
env.id = "LowCloudsGenerator$";
env.push();
env.id = "HighCloudsGenerator$";
env.push();
env.id = "RectangleFakeGlow$";
env.push();

// Remove with Exact

env.lookupMethod = LOOKUP.EXACT;
env.id = "BTSEnvironment.[0]Environment.[6]PlayersPlace.[0]Mirror";
env.push();
env.id = "BTSEnvironment.[0]Environment.[13]PillarTrackLaneRingsR";
env.push();
env.id = "BTSEnvironment.[0]Environment.[14]PillarTrackLaneRingsR (1)";
env.push();

// Move out of sight because it's weird

env = new Environment("GlowLine", LOOKUP.CONTAINS);
env.position = [0, -69420, 0];
env.push();
env.id = "BottomGlow";
env.push();


//////////////////////////////////////////////////////////////
// OTHER PROPERTIES
//////////////////////////////////////////////////////////////

// Change Fog

new CustomEvent().assignFogTrack("fog").push();
let event = new CustomEvent().animateTrack("fog");
event.animate.startY = [-250];
event.animate.attenuation = [0.00001];
event.animate.height = [1];
event.push();

// Sunset Glow

let lightZ = 370;
let lightY = -300;

env = new Environment("MagicDoorSprite$", LOOKUP.REGEX);
env.scale = [10, 1 / 100, 1]
env.position = [0, lightY, lightZ]
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = new Regex().add("MagicDoorSprite").seperate().add("Bloom(L|R)").end().string;
env.scale = [1, 100, 1];
env.rotation = [0, 0, 90]
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = new Regex().add("MagicDoorSprite").seperate().add("BloomR").end().string;
env.position = [0, lightY + 5, lightZ];
env.push();

// Nootils Fire Generator

Nootils.Fire(0, 1000, 0.5, 0.5, 1.75, -5, 6)


//////////////////////////////////////////////////////////////
// LASERS
//////////////////////////////////////////////////////////////

// Fire Laser

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
            env.position = [0.030, -1.2, 6.901];  // Campfire Base
            env.rotation = [183, 0, 0];
            env.scale = [14.60, 1, 12.50];  
        }
        
        env.push();
        
    }
}

// Sky Lasers

let laserScale = 5;
let laserHeight = -300;
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
            env.position = [20, laserHeight, 100]; // Mountain Lights
            env.rotation = [0, 10, 2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 1) {
            env.position = [25, laserHeight, 80];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 2) {
            env.position = [-25, laserHeight, 80];
            env.rotation = [0, 0, 2.5];
            env.scale = [laserScale, 1, laserScale];//
        } else if (i == 3) {
            env.position = [20, laserHeight, 60];
            env.rotation = [0, 0, -5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 4) {
            env.position = [-20, laserHeight, 60];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 5) {
            env.position = [20, laserHeight, 40];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 6) {
            env.position = [-20, laserHeight, 40];
            env.rotation = [0, 0, 2.5];
            env.scale = [laserScale, 1, laserScale];
        } else if (i == 7) {
            env.position = [10, laserHeight, 20];
            env.rotation = [0, 0, 5];
            env.scale = [laserScale / 2, 1, laserScale / 2];
        } else if (i == 8) {
            env.position = [-10, laserHeight, 20];
            env.rotation = [0, 0, -2.5];
            env.scale = [laserScale / 2, 1, laserScale / 2];
        }
        
        env.push();
        
    }
}


//////////////////////////////////////////////////////////////
// ENVIRONMENT
//////////////////////////////////////////////////////////////

let blenderEnv = new BlenderEnvironment(ENV.BTS.PILLAR.SCALE, ENV.BTS.PILLAR.ANCHOR, ENV.BTS.PILLAR.ID, LOOKUP.REGEX);
blenderEnv.animate([
    ["env", 0, 0]
])


//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

function exportMap(diff: Difficulty) {
    diff.require("Chroma");
    diff.require("Noodle Extensions")
    diff.setSetting(SETTINGS.SFX_VOLUME, 0.1);
    diff.setSetting(SETTINGS.NO_HUD, true);
    diff.colorLeft = [1,0.624,0.161];
    diff.colorRight = [0.102, 0.302, 0.18];
    diff.obstacleColor = [1,1,1];
}
exportMap(map);

map.save();