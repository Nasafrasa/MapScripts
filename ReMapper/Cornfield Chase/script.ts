import { arrAdd, CustomEvent, CustomEventInternals, ENV, rand, Wall, KeyframesVec3, Difficulty, Environment, Event, EVENT, Geometry, KeyframesLinear, LightRemapper, ModelScene, PRESET, Regex, rotatePoint, transferVisuals, Vec3, KeyframesAny, notesBetween, jsonSet, exportZip } from "https://deno.land/x/remapper@2.1.0/src/mod.ts"
import { GiveTypeNotesTrack } from "./nootils/index.ts"

// Lots of unnecessary and unexplained stuff, but i dont care

const map = new Difficulty("ExpertPlusLawless", "ExpertPlusStandard");
let env: Environment;
const renderEnv = true;

const bpmDoubled = 1; // 1 = NO, 2 = YES

/*
env = new Environment(new Regex().add("DayAndNight").separate().add("Day").separate().add("Sun").end(), "Regex");
env.position = [0,0,2500];
env.scale = [sunSize, sunSize, 1];
env.track = "spin";
env.push();
env.duplicate = 1;
env.rotation = [85,0,0];
env.track = "spin2";
env.push();
*/
const sunSize = 1;
const sunPos = [0, 1000] as [number, number];
const flareID = new Regex("Sun").separate().add("NeonTube").vary(2).end();
const flareDist = 750/2.65;
const flareAmount = 720;
const flareSize = 1;

env = new Environment("Sun$", "Regex");
env.scale = [1, 1, 1].map(x => x * sunSize) as Vec3;
env.position = [0, ...sunPos]
env.track = "sun"
env.push();

env = new Environment(flareID, "Regex")
env.scale = [1.5, 1, 1].map(x => x * 20 / sunSize) as Vec3;
env.rotation = [0, 0, -5];
env.track = "spinSun"
env.push();

env.track = "";
env.duplicate = 1;
env.lightID = 100;
env.scale = [1, 0.1, 1].map(x => x * 20 / sunSize) as Vec3;
env.rotation = [0, 0, 90-5+90];
env.position = [-flareDist, ...sunPos];
env.track = "spinSun2"
env.push();
env.position = [flareDist, ...sunPos];
env.track = "spinSun3"
env.push();

env.track = "";
env.active = true;
env.lightID = 200;

const circleFlares: number[] = [];

for (let r = 0; r < 360; r += 360*10 / flareAmount) {
    const proximity = Math.abs(Math.max(
        0,
        360
    )) / 90;

    if (proximity === 0) continue;

    const rotation: Vec3 = [0, 0, r];
    env.scale = [1 / 1000, 3 * flareSize * proximity, 1 * flareSize * proximity].map(x => x / sunSize) as Vec3;
    env.rotation = rotation;
    env.position = arrAdd(rotatePoint(rotation, [flareDist, 0, 0]), [0, ...sunPos]) as Vec3;
    env.push();

    circleFlares.push(200 + circleFlares.length)
}


// Thank you Swifter for helping me with this!
const speen: KeyframesVec3 = [];
const speen2: KeyframesVec3 = [];
const speen3: KeyframesVec3 = [];
const spins = 20000;
const getTime = (value: number, index: number) => (value / spins) + (index / spins)

for (let i = 0; i < spins; i++) {
  speen.push([0,0,-5,getTime(0,i)]);
  speen.push([0,180,5,getTime(0.5,i)]);
  speen.push([0,360,-5,getTime(1,i)]);
}
for (let i = 0; i < spins; i++) {
  speen2.push([0,0,-5,getTime(0,i)]);
  speen2.push([0,180,5,getTime(0.5,i)]);
  speen2.push([0,360,-5,getTime(1,i)]);
}
for (let i = 0; i < spins; i++) {
  speen3.push([0,0,-5,getTime(0,i)]);
  speen3.push([0,180,5,getTime(0.5,i)]);
  speen3.push([0,360,-5,getTime(1,i)]);
}

const spin = new CustomEvent(158).animateTrack("spinSun", 34);
spin.animate.localRotation = speen;
spin.push();

const spin2 = new CustomEvent(158).animateTrack("spinSun2", 34);
spin2.animate.localRotation = speen;
spin2.push();

const spin3 = new CustomEvent(158).animateTrack("spinSun3", 34);
spin3.animate.localRotation = speen;
spin3.push();




// Fog stuff
/*
new CustomEvent().assignFogTrack("fog").push();
const event = new CustomEvent().animateTrack("fog");
event.duration = 16;
event.animate.startY = [-10000];
event.animate.attenuation = [[0.0000000001,0],[0.0000005,1]];
event.animate.height = [200];
event.push();
*/
// Fog stuff
new CustomEvent().assignFogTrack("fog").push();
const event = new CustomEvent().animateTrack("fog");
event.animate.startY = [-10000];
event.animate.attenuation = [0.00000001];
event.animate.height = [200];
event.push();
event.time = 64
event.duration = 4;
event.animate.attenuation = [[0.00000001, 0],[0.00000001, 1]]; //- 0
event.push();



env = new Environment("Mountains", "Contains");
env.active = false;
env.push();
env.id = "Water"
env.push();
env.id = "Clouds"
env.push();
//env.id = "Smoke"
//env.push();
env.id = "BackgroundGradient"
env.push();
env.id = "Rain"
env.push();
env.id = "PlayersPlace"
env.push();
env.id = "HUD"
env.push();

env.id = "Rail"
env.active = true;
env.position = [-69420,911,80085]
env.push();


env = new Environment("BigSmokePS$", "Regex");
env.track = "smokeTrack";
env.push();

const smokeAni = new CustomEvent(189).animateTrack("smokeTrack", 2);
smokeAni.animate.scale = [[1,1,1,0],[1,1,3000,1, "easeInCubic"]];
smokeAni.animate.position = [[0,0,1500,0],[0,0,1500,1]]
smokeAni.push();

// Heliov Bloom Laser Background

const bloomID = new Regex().add("BottomPairLasers").separate().add("PillarL").separate().add("RotationBaseL").end();
const glowY = 2;
const glowZ = 300;
const glowRot = 30;
const glowDist = 15;


env = new Environment("", "Regex");
env.id = bloomID;
env.active = true;
env.duplicate = 1;
env.lightID = 100;
env.json.follow = true;
env.group = "mainLight";
env.track = "mainLight";
env.position = [-glowDist, glowY, glowZ];
env.rotation = [0, glowRot, -90];
env.scale = [1, 100 / 5, 1];
env.push();

env.active = true;
env.lightID = 101;
env.track = "mainLight2"
env.position = [glowDist, glowY, glowZ];
env.rotation = [0, -glowRot, 90];
env.scale = [1, 100 / 5, 1];
env.push();

//////////////////////////////////////////////////////////////
// ANIMATING PLAYER POSITION
//////////////////////////////////////////////////////////////

// MAKING USEFUL FUNCTIONS

function AnimatePlayer(time: number, duration: number, position: KeyframesAny, rotation: KeyframesAny) {
  new CustomEvent(time).assignPlayerToTrack("player").push();
  new CustomEvent(time).animateTrack("player", duration, {_position: position}).push();
  new CustomEvent(time).animateTrack("player", duration, {_rotation: rotation}).push();
  new CustomEvent(time).assignPlayerToTrack("NoteTrack").push();
  new CustomEvent(time).animateTrack("NoteTrack", duration, {_position: position}).push();
  new CustomEvent(time).animateTrack("NoteTrack", duration, {_rotation: rotation}).push();
}

function GiveNotesTrack(track: string, t1: number, t2: number) { // From Nootils
  const filterednotes = map.notes.filter(n => n.time >= t1 && n.time <= t2)
  filterednotes.forEach(note => {
      if (!note.customData._track) note.customData._track = track
      if (Array.isArray(note.customData._track)) note.customData._track.push(track)
      else if (note.customData._track != track) note.customData._track = [note.customData._track, track]
  });
}

// ANIMATE PLAYER AND NOTE TRACK

GiveNotesTrack("NoteTrack", 0, 203);
new CustomEvent(122).animateTrack("NoteTrack", 36, {_rotation: [[0,0,0,0],[-20,0,0,0.9,"easeInOutSine"],[0,0,0,1,"easeInOutSine"]]}).push();
new CustomEvent(122).animateTrack("NoteTrack", 36, {_position: [[0,0,0,0],[0,-0.25,0,0.9,"easeInOutSine"],[0,0,0,1,"easeInOutSine"]]}).push();

new CustomEvent(190).animateTrack("NoteTrack", 1, {_dissolve: [[1,0],[0,1]]}).push();
new CustomEvent(190).animateTrack("NoteTrack", 1, {_dissolveArrow: [[1,0],[0,1]]}).push();
/*
AnimatePlayer(64, 8, [[0,0,0,0],[0,0,100,1,"easeInOutCubic"]], [[0,0,0,0],[0,0,0,1,"easeInOutCubic"]]);
AnimatePlayer(106, 8, [[0,0,100,0],[0,0,200,1,"easeInOutCubic"]], [[0,0,0,0],[0,0,0,1,"easeInOutCubic"]]);
*/
//AnimatePlayer(154, 8, [[0,0,200,0],[0,0,100,1,"easeInOutCubic"]], [[0,0,0,0],[0,0,0,1,"easeInOutCubic"]]);
AnimatePlayer(158, 33, [[0,0,100,0],[0,0,100,1,"easeInOutCubic"]], [[0,0,0,0],[0,0,180,1]]);



// 68
// 86




const filterednotes = map.notes.filter(n => n.time > 0 && n.time <= 203);
filterednotes.forEach(note => {

  function rotateNotes (beat: number,angle: number, mult: number, side: number) {
    if (note.time >= beat && note.time < beat+1) {
    for (let i = 0; i <= 4; i++) { 
      if (side == 2) {    
        if (note.json._lineIndex == 0) {
            note.animate.rotation = [[0,0,0,0], [0,(angle*0.5)-(i*mult),0,0.4375, "easeOutExpo"]];
        }
        if (note.json._lineIndex == 1) {
            note.animate.rotation = [[0,0,0,0], [0,(angle*0.65)-(i*mult),0,0.4375, "easeOutExpo"]];
        }
        if (note.json._lineIndex == 2) {
            note.animate.rotation = [[0,0,0,0], [0,(angle*0.8)-(i*mult),0,0.4375, "easeOutExpo"]];
        }
        if (note.json._lineIndex == 3) {
            note.animate.rotation = [[0,0,0,0], [0,(angle)-(i*mult),0,0.4375, "easeOutExpo"]];
        }
    }
    if (side == 1) {    
        if (note.json._lineIndex == 3) {
            note.animate.rotation = [[0,0,0,0], [0,-(angle*0.5)+(i*mult),0,0.4375, "easeOutExpo"]];
        }
        if (note.json._lineIndex == 2) {
            note.animate.rotation = [[0,0,0,0], [0,-(angle*0.65)+(i*mult),0,0.4375, "easeOutExpo"]];
        }
        if (note.json._lineIndex == 1) {
            note.animate.rotation = [[0,0,0,0], [0,-(angle*0.8)+(i*mult),0,0.4375, "easeOutExpo"]];
        }
        if (note.json._lineIndex == 0) {
            note.animate.rotation = [[0,0,0,0], [0,-(angle)+(i*mult),0,0.4375, "easeOutExpo"]];
        }
      }
    }}
  }

  note.track.value = "NoteTrack";
  note.NJS = 11;
  note.offset = 12;
  note.noteGravity = false;
  note.spawnEffect = false;
  // MAKE DISSOLVE ANIMATION
  note.animate.dissolve = [[0,0], [1,0.45, "easeInExpo"]]
  note.animate.dissolveArrow = [[0,0], [1,0.45, "easeInExpo"]]
  note.animate.rotation = [[0,rand(-4,4),0,0.375], [0,0,0,0.5, "easeInOutCubic"]]
  note.animate.localRotation = [[rand(-45,45),rand(-45,45),rand(-45,45),0],[rand(-45,45),rand(-45,45),rand(-45,45),0.375, "easeInOutCubic"], [0,0,0,0.5, "easeInOutCubic"]]
  note.animate.position = [[rand(-2,2),rand(-3,3),0,0.35], [0,0,0,0.5, "easeInOutCubic"]]
  if (note.time >= 190.5) {
    note.fake = true;
    note.interactable = false;
  }


  // VARIABLE NJS
  if (note.time >= 53 && note.time < 68) {
    note.NJS = 12;
  }
  if (note.time >= 110 && note.time < 134) {
    note.NJS = 11;
  }
  if (note.time >= 134 && note.time < 158) {
    note.NJS = 11;
  }
  if (note.time >= 158 && note.time < 203) {
    note.NJS = 12;
  }

  // NOTE ROTATIONS
  const angle = 10
  const markiplier = 1
  rotateNotes(70,angle,markiplier,1);
  rotateNotes(73,angle,markiplier,1);
  rotateNotes(78,angle,markiplier,1);
  rotateNotes(82,angle,markiplier,1);
  
  rotateNotes(88,angle,markiplier,1);
  rotateNotes(90,angle,markiplier,2);
  rotateNotes(92,angle,markiplier,2);
  rotateNotes(93,angle,markiplier,1);
  rotateNotes(98,angle,markiplier,1);
  rotateNotes(101,angle,markiplier,1);
  rotateNotes(102,angle,markiplier,2);
  rotateNotes(104,angle,markiplier,2);
  rotateNotes(105,angle,markiplier,1);

  rotateNotes(111,angle,markiplier,1);
  rotateNotes(114,angle,markiplier,2);
  rotateNotes(118,angle,markiplier,1);
  rotateNotes(119,angle,markiplier,2);
  rotateNotes(124,angle,markiplier,1);
  rotateNotes(126,angle,markiplier,2);

});




env = new Environment(undefined, "Regex");
env.active = true;

//env.rotation = [9.1455, 10.9269, -143.137];

env.id = new Regex().add("DayAndNight").separate().add("Day").separate().add("DirectionalLightFront").end();
env.rotation = [90, 0, 0];
env.push();

env.id = new Regex().add("DayAndNight").separate().add("Day").separate().add("DirectionalLightBack").end();
env.rotation = [-15, 0, 0];
env.push();

env.id = new Regex().add("DayAndNight").separate().add("Day").separate().add("DirectionalLightLeft").end();
env.rotation = [90, 0, 0];
env.push();

env.id = new Regex().add("DayAndNight").separate().add("Day").separate().add("DirectionalLightRight").end();
env.rotation = [15, 0, 0];
env.push();

/*
const starAmount = 2000;
const starSize = 10
const starDistance = 5000;

for (let i = 0; i <= starAmount; i++) {
  const star = new Wall(0, 203);
  const rotation: Vec3 = [rand(0, 360),rand(0, 360),0];

  star.animate.definitePosition = arrAdd(rotatePoint(rotation, [0, starDistance, -starSize / 2]), 0) as Vec3;
  star.animate.scale = [starSize,starSize,starSize];
  star.animate.color = [1,1,1,1];
  star.push();
}

*/




/*
notesBetween(0, 384, x => {
  if (x.track.value == "NoteTrack") {
  x.spawnEffect = false
  x.NJS = 16
  x.offset = 0.25
  x.noteGravity = false
  }
})

const pathAnim = new CustomEvent(0).assignPathAnimation("NoteTrack", 1);
//pathAnim.animate.position = [[0, 0, 20, 0], [0, 0, 0, 0.45, "easeInOutCubic"]]
pathAnim.animate.dissolve = [[0, 0], [0.5, 0.2], [1, 0.5]]
//pathAnim.animate.localRotation = [[rand(0,90),rand(0,90),rand(0,90),0],[0,0,0,1]]
pathAnim.push();*/

// Star Generator

/**
 * Makes a sphere around you sprinkled with walls, which look like stars.
 * @param starAmount The amount of stars
 * @param starSize The size of each individual star
 * @param starDistance The distance of how far away the stars are from the player; radius of the sphere
 * @param startTime The beat on which the stars appear.
 * @param duration The duration of the stars.
 */

function starGenerator(starAmount: number, starSize: number, starDistance: number, startTime: number, duration: number) {
  for (let i = 0; i <= starAmount; i++) {
    const star = new Wall(startTime, duration);
    const rotation: Vec3 = [rand(0, 360),rand(0, 360),0];
  
    star.animate.definitePosition = arrAdd(rotatePoint(rotation, [0, starDistance, -starSize / 2]), 0) as Vec3;
    star.animate.scale = [starSize,starSize,starSize];
    star.animate.color = [1,1,1,1];
    star.push();
  }
}

starGenerator(400,7.5,7500,0,203);
/*
function starGenerator2(starAmount: number, starSize: number, starDistance: number, startTime: number, duration: number) {
  for (let i = 0; i <= starAmount; i++) {
    const star = new Geometry("Cube", {
      _shader: "Standard",
      _color: [1, 1, 1, 1],
      _track: "cube",
      _shaderKeywords: []
    }).push();
    const rotation: Vec3 = [rand(0, 360),rand(0, 360),0];
  
    star.active = true;
    star.position = arrAdd(rotatePoint(rotation, [0, starDistance, -starSize / 2]), 0) as Vec3;
    star.scale = [starSize,starSize,starSize];
    star.push();
  }
}

starGenerator2(500,6,7500,0,203);
*/

//GiveNotesTrack("NoteTrack", 0, 203); // Note Track
//AnimatePlayer(0, 0, [[-1271.48,293.28,-1221.83,0],[-1271.48,293.28,-1221.83,1]], [[0.2014965168,0.4642942329,-0.1434868339,0],[0.2014965168,0.4642942329,-0.1434868339,1]]);
/*
GiveNotesTrack("NoteTrack", 0, 203); // Note Track
AnimatePlayer(0, 0, [[-2324.14,1181.08,-1399.91,0],[-2324.14,1181.08,-1399.91,1]], [[21.7714,49.9773,0.30587,0],[21.7714,49.9773,0.30587,1]]);
AnimatePlayer(16, 100, [[-2324.14,1181.08,-1399.91,0,EASE.IN_OUT_CUBIC],[0,0,0,1,EASE.IN_OUT_CUBIC]], [[21.7714,49.9773,0.30587,0],[0,0,0,1]]);
AnimatePlayer(116, 100, [[0,0,0,0,EASE.IN_CIRC],[0,0,5000,1,EASE.IN_CIRC]], [[0,0,0,0],[0,0,0,1]]);
*/

//52

for (let i = 0; i <= 48; i++) {
  const bah = new Event(86+i).ringLights().fade(true);
  bah.color = [0.25,0.25,0.25,1];
  bah.lightID = Math.floor(rand(102,110));
  bah.push();
}


if (renderEnv) {
// MAKE MODELS

map.geoMaterials["cube"] = {
  _shader: "Standard",
  _color: [0,0,0,1],
}

const scene = new ModelScene();

scene.addPrimaryGroups(
  "blackHole",
  new Geometry("Sphere", {
    _shader: "Standard",
    _color: [0,0,0],
    _shaderKeywords: []
  }),
);

scene.addPrimaryGroups(
  "cube",
  new Geometry("Cube", "cube"),
);


/**
laser 1 = Main laser
laser 2-4 = inside lasers 1
laser 5-7 = inside lasers 2
laser 8-10 = inside lasers 3
 */

const lasers = 10;
const laserTracks: string[] = [];
const laserEnv = new Environment(new Regex().add("LightRailingSegment").separate().add("NeonTubeDirectionalL").end(), "Regex");
laserEnv.lightID = 100;
for (let i = 1; i <= lasers; i++) laserTracks.push(`laser${i}`);

// scene definition here
scene.addPrimaryGroups(
  laserTracks,
  laserEnv,
  [1,0.2,1],
  [0,0,0]
);
// scene.animate call here

scene.animate([ // BASE ENVIRONMENT
  ["stationFar", 0, 68], // 42.5 sec
  ["stationClose", 68, 18], // 11.25 sec
  ["stationInside", 86, 72], // 55 sec
  ["stationBlackHole", 158, 33], // doesnt matter 33
  [[], 191]
]);


GiveTypeNotesTrack("noteL", "noteR", 0, 203);

const noteL = new CustomEvent().animateTrack("noteL");
noteL.animate.color = [0.40,0.38,0.38, 1];
noteL.push();

const noteR = new CustomEvent().animateTrack("noteR");
noteR.time = 0;
noteR.animate.color = [0, 0.25, 0.6, 1];
noteR.push();
noteR.time = 158;
noteR.duration = 1;
noteR.animate.color = [1.043, 0.848, 0.726, 1];
noteR.push();


//Swifter Sun
/*
env = new Environment("GlowLineH$", LOOKUP.REGEX);
env.active = true;
env.lightID = 100;
env.duplicate = 100;
env.position = [0,0,1000];
env.scale = [1,1,100000000]
env.rotation = [90,0,0];
env.track = "sun"
env.push();*/

/*
env = new Environment("GlowLineH$", LOOKUP.REGEX);
env.active = true;
env.lightID = 100;
env.duplicate = 100;
env.position = [0,0,1000];
env.scale = [1000,1000,1000]
env.rotation = [90,0,0];
env.track = "sun"
env.push();*/

// ANIMATE ENVIRONMENTS


}

function exportMap(diff: Difficulty) {
  diff.require("Chroma", true);
  diff.require("Noodle Extensions", true);
  diff.rawSettings = PRESET.MODCHART_SETTINGS;
  diff.settings.leftHanded = false;
  diff.settings.maxShockwaveParticles = 0;
  diff.settings.lightsExPlus = "All";
  diff.settings.lights = "All";
  diff.settings.mirrorQuality = "OFF";
  diff.settings.smoke = true;
  diff.colorLeft = [0.35,0.33,0.33];
  diff.colorRight = [0, 0.25, 0.6];
  diff.lightColorLeft = [0.15,0.13,0.13];
  diff.lightColorRight = [0.78, 0.17, 0.25];
  diff.boostColorLeft = [0.15,0.13,0.13];
  diff.boostColorRight = [0.24,0.81,0.31];
  diff.obstacleColor = [1,1,1];
  diff.NJS = 18;
  diff.offset = 0.25;
  jsonSet(diff.rawSettings, "_countersPlus._mainEnabled", false);
  jsonSet(diff.rawSettings, "_uiTweaks._multiplierEnabled", false);
  jsonSet(diff.rawSettings, "_uiTweaks._comboEnabled", false);
  jsonSet(diff.rawSettings, "_uiTweaks._energyEnabled", false);
  jsonSet(diff.rawSettings, "_uiTweaks._positionEnabled", false);
  jsonSet(diff.rawSettings, "_uiTweaks._progressEnabled", false);
}
exportMap(map);
map.save();
exportZip(["ExpertPlusLawless.dat"]);