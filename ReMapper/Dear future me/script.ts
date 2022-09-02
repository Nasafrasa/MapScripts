import { Difficulty , ModelScene , GEO_TYPE, GEO_SHADER, Wall, Geometry, KeyframesAny, EASE, ColorType, PRESET, SETTINGS, Environment, LOOKUP, Regex, CustomEvent, notesBetween } from "https://deno.land/x/remapper@2.0.2/src/mod.ts"
import {  } from "./nootils/index.ts";

const map = new Difficulty("ExpertPlusLawless.dat", "ExpertPlusStandard.dat");
const redMain: ColorType = [0.5,0,0];
let env: Environment;

//////////////////////////////////////////////////////////////
// ANIMATING PLAYER POSITION
//////////////////////////////////////////////////////////////

// MAKING USEFUL FUNCTIONS

function AnimatePlayer(time: number, duration: number, position: KeyframesAny) {
  new CustomEvent(time).assignPlayerToTrack("player").push();
  new CustomEvent(time).animateTrack("player", duration, {_position: position}).push();
  new CustomEvent(time).assignPlayerToTrack("NoteTrack").push();
  new CustomEvent(time).animateTrack("NoteTrack", duration, {_position: position}).push();
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

const playerHeight = 4;
const playerDistance = -15;
GiveNotesTrack("NoteTrack", 0, 384); // Note Track
AnimatePlayer(111, 3, [[0,0,0,0, EASE.IN_OUT_CUBIC],[0,playerHeight,playerDistance,1,EASE.IN_OUT_CUBIC]]);
AnimatePlayer(175, 3, [[0,playerHeight,playerDistance,0,EASE.IN_OUT_CUBIC],[0,0,0,1, EASE.IN_OUT_CUBIC]]);
AnimatePlayer(303, 3, [[0,0,0,0, EASE.IN_OUT_CUBIC],[0,playerHeight,playerDistance,1,EASE.IN_OUT_CUBIC]]);
AnimatePlayer(363, 3, [[0,playerHeight,playerDistance,0,EASE.IN_OUT_CUBIC],[0,0,0,1, EASE.IN_OUT_CUBIC]]);

//////////////////////////////////////////////////////////////
// BTS ENVIRONMENT MANAGEMENT
//////////////////////////////////////////////////////////////

// REMOVE WITH CONTAINS

env = new Environment("PillarTrackLaneRing", LOOKUP.CONTAINS);
env.active = false;
env.push();
env.id = "SideLaser";
env.push();
env.id = "CloudsGenerator";
env.push();
env.id = "BottomGlow";
env.push();
env.id = "GlowLine";
env.push();

// REMOVE WITH REGEX

env.lookupMethod = LOOKUP.REGEX;
env.id = "Construction$";
env.push();
env.id = "LowCloudsGenerator$";
env.push();
env.id = "HighCloudsGenerator$";
env.push();
env.id = "RectangleFakeGlow$";
env.push();
env.id = "TrackMirror$";
env.push();

// MOVE OUT OF SIGHT

env.id = new Regex().add("PlayersPlace").separate().add("Mirror").end();
env.active = true;
env.position = [0,-69420,0];
env.push();

// MOVE HUD AROUND

env = new Environment("EnergyPanel$", LOOKUP.REGEX);
env.position = [0,-2,5.1];
env.rotation = [90,0,0];
env.active = false;
env.push();

env = new Environment("LeftPanel$", LOOKUP.REGEX);
env.position = [-3.56229,-2.17129,-1.15];
env.rotation = [90,0,0];
env.active = false;
env.push();

env = new Environment("RightPanel$", LOOKUP.REGEX);
env.position = [3.56229,-2.17129,-1.6];
env.rotation = [90,0,0];
env.active = false;
env.push();

// SKY THING

const lightZ = 370;
const lightY = 0;

env = new Environment("MagicDoorSprite$", LOOKUP.REGEX);
env.scale = [10, 1 / 10000, 1]
env.position = [0, lightY, lightZ]
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = new Regex().add("MagicDoorSprite").separate().add("Bloom(L|R)").end();
env.scale = [1, 10000, 1];
env.rotation = [0, 0, 90]
env.push();

env = new Environment("", LOOKUP.REGEX);
env.id = new Regex().add("MagicDoorSprite").separate().add("BloomR").end();
env.position = [0, lightY + 5, lightZ];
env.push();

// DIRECTIONAL LIGHTS

env = new Environment(undefined, LOOKUP.REGEX);
env.active = true;

env.id = new Regex().separate(5).add("DirectionalLight$").string;
env.rotation = [90, 0, 0];
env.push();

env.id = new Regex().separate(3).add("DirectionalLight$").string;
env.rotation = [15, 5, 0];
env.push();

//////////////////////////////////////////////////////////////
// MISCELLANEOUS STUFF
//////////////////////////////////////////////////////////////

// FOUNTAIN WALL

for (let x = 0; x <= 18; x++) {
  const circleWall = new Wall(0,1000);
  circleWall.color = [1,0,0];
  circleWall.animate.localRotation = [0,0+x*20,0];
  circleWall.scale = [10,1,2];
  circleWall.interactable = false;
  circleWall.fake = true;
  circleWall.animate.definitePosition = [-5,-1.5,19.5];
  circleWall.push();
}

// FOG MANAGEMENT

new CustomEvent().assignFogTrack("fog").push();
const event = new CustomEvent().animateTrack("fog");
event.animate.startY = [-3];
event.animate.attenuation = [0.0005];
event.animate.height = [1];
event.push();

//////////////////////////////////////////////////////////////
// LASER MANAGEMENT
//////////////////////////////////////////////////////////////

// LEFT LASERS (Yes I did manually import all of those numbers from Blender one by one)

const laserScale = 1;
const laserNum = 0;
for (let i = 0; i <= 8; i++) {
  const pair = new Regex().add(i % 2 === 0 ? "PillarPair" : "SmallPillarPair").vary(Math.floor(i / 2)).string;
  const id = new Regex().start().add(pair).separate().add(`PillarL`).string;

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(pair).separate().add(`PillarL`).separate().add("Pillar").end();
  env.position = [0,0,69420];
  env.push();
 
  env.id = new Regex().add(id).separate().add(`RotationBaseL`).separate().add("(Reflector$|LaserLight)").string;
  env.position = [0,0,69420];
  env.push();

  env.id = new Regex().add(id).separate().add("LaserLight").string;
  env.position = [0,0,69420];
  env.push();

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(id).separate().add(`RotationBaseL`).separate().add(`LaserLH$`).string;

  if (i == 0) {
    env.position = [4.96338,-1.12023,9.88263];
    env.rotation = [-3.03,-52.7,-2.16];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 1) {
    env.position = [5.62596,-1.2448,9.9999];
    env.rotation = [-26.6956,-82.1026,15.6994];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 2) {
    env.position = [13.7102,-1.44899,13.0661];
    env.rotation = [-17.7484,213.487,22.349];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 3) {
    env.position = [13.3976,-0.509983,15.1203];
    env.rotation = [-18.916,217.185,-3.75222];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 4) {
    env.position = [14.9712,-1.80006,27.7606];
    env.rotation = [-17.7484,-47.1579,-22.349];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 5) {
    env.position = [13.3212,-1.41792,28.796];
    env.rotation = [26.309,-9.89199,-29.5059];
    env.scale = [laserScale,1,laserScale];
  }else if (i == 6) {
    env.position = [10.9852,-2.06272,27.7371];
    env.rotation = [43.0005,17.6984,7.97705];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 7) {
    env.position = [6.93076,-1.22593,32.9073];
    env.rotation = [26.309,52.5623,29.5059];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 8) {
    env.position = [5.2519,-0.283866,32.1887];
    env.rotation = [-18.916,93.5263,-3.75222];
    env.scale = [laserScale,1,laserScale];
  }

  env.push();
        
}

// RIGHT LASERS

for (let i = 0; i <= 8; i++) {
  const pair = new Regex().add(i % 2 === 0 ? "PillarPair" : "SmallPillarPair").vary(Math.floor(i / 2)).string;
  const id = new Regex().start().add(pair).separate().add(`PillarR`).string;

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(pair).separate().add(`PillarR`).separate().add("Pillar").end();
  env.position = [0,0,69420];
  env.push();
 
  env.id = new Regex().add(id).separate().add(`RotationBaseR`).separate().add("(Reflector$|LaserLight)").string;
  env.position = [0,0,69420];
  env.push();

  env.id = new Regex().add(id).separate().add("LaserLight").string;
  env.position = [0,0,69420];
  env.push();

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(id).separate().add(`RotationBaseR`).separate().add(`LaserRH$`).string;

  if (i == 0) {
    env.position = [-5.57989,-1.66599,7.99058];
    env.rotation = [2.59961,-120.717,-17.597];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 1) {
    env.position = [-11.2613,-0.745285,11.1393];
    env.rotation = [-25.2932,353.723,2.43698];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 2) {
    env.position = [-12.8106,-1.67248,12.5319];
    env.rotation = [-24.5507,353.041,28.7793];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 3) {
    env.position = [-13.1207,-2.36008,23.1678];
    env.rotation = [45.6476,-124.568,-4.78547];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 4) {
    env.position = [-14.5776,-1.71381,24.8609];
    env.rotation = [26.309,-118.472,-29.5059];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 5) {
    env.position = [-13.9955,-2.09785,26.4156];
    env.rotation = [-17.7484,-155.738,-22.349];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 6) {
    env.position = [-11.908,0.161194,27.3275];
    env.rotation = [-18.916,-159.436,3.75222];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 7) {
    env.position = [-5.01515,-1.21076,32.3168];
    env.rotation = [-6.00259,72.0939,40.6248];
    env.scale = [laserScale,1,laserScale];
  } else if (i == 8) {
    env.position = [-4.20965,-1.35999,30.9073];
    env.rotation = [19.0456,64.1568,16.1906];
    env.scale = [laserScale,1,laserScale];
  }
        
  env.push();
        

}

// INNER LASERS RIGHT

for (let i = 0; i <= 8; i++) {
  const pair = new Regex().add(i % 2 === 0 ? "PillarPair" : "SmallPillarPair").vary(Math.floor(i / 2)).string;
  const id = new Regex().start().add(pair).separate().add(`PillarR`).string;

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(pair).separate().add(`PillarR`).separate().add("Pillar").end();
  env.position = [0,0,69420];
  env.push();
 
  env.id = new Regex().add(id).separate().add(`RotationBaseR`).separate().add("(Reflector$|LaserLight)").string;
  env.position = [0,0,69420];
  env.push();

  env.id = new Regex().add(id).separate().add("LaserLight").string;
  env.position = [0,0,69420];
  env.push();

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(id).separate().add(`LaserR`).end();
        
  env.track = `laser${laserNum}`;

  if (i == 1) {
    env.position = [0, -10, 19.5];
    env.rotation = [0, 0, 0];
    env.scale = [50, 1, 0.1];
  } else if (i == 3 || 5 || 7) {
    env.position = [0, 0, -69420];
    env.rotation = [0, 0, 0];
    env.scale = [0, 1, 0];
  } 
  env.push();

}

// INNER LASERS LEFT

for (let i = 0; i <= 8; i++) {
  const pair = new Regex().add(i % 2 === 0 ? "PillarPair" : "SmallPillarPair").vary(Math.floor(i / 2)).string;
  const id = new Regex().start().add(pair).separate().add(`PillarL`).string;

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(pair).separate().add(`PillarL`).separate().add("Pillar").end();
  env.position = [0,0,69420];
  env.push();
 
  env.id = new Regex().add(id).separate().add(`RotationBaseL`).separate().add("(Reflector$|LaserLight)").string;
  env.position = [0,0,69420];
  env.push();

  env.id = new Regex().add(id).separate().add("LaserLight").string;
  env.position = [0,0,69420];
  env.push();

  env = new Environment(undefined, LOOKUP.REGEX);
  env.id = new Regex().add(id).separate().add(`LaserL`).end();
        
  env.track = `laser${laserNum}`;

  if (i == 1) {
    env.position = [0, -10, 19.5];
    env.rotation = [0, 0, 0];
    env.scale = [50, 1, 0.1];
  } else if (i == 3 || 5 || 7) {
    env.position = [0, 0, -69420];
    env.rotation = [0, 0, 0];
    env.scale = [0, 1, 0];
  } 

  env.push();

}

//////////////////////////////////////////////////////////////
// CUSTOM ENVIRONMENT MANAGEMENT
//////////////////////////////////////////////////////////////

// MAKE MODELS
const scene = new ModelScene(new Geometry());
const scene1 = new ModelScene(new Geometry());

// BASE ENVIRONMENT MATERIALS
scene.addPrimaryGroups(
  "Floor",
  new Environment(new Regex().add("PlayersPlace").separate().add("Mirror").end(), LOOKUP.REGEX),
);
scene.addPrimaryGroups(
  "Enth",
  new Geometry(GEO_TYPE.CUBE, {
    _shader: GEO_SHADER.STANDARD,
    _color: [0.1,0.5,0.1],
    _shaderKeywords: []
  }),
);
scene.addPrimaryGroups(
  "crystalCube",
  new Geometry(GEO_TYPE.CUBE, {
    _shader: GEO_SHADER.STANDARD,
    _track: "crystalCube_material",
    _color: redMain
  }),
);

// ANIMATION MATERIALS
scene1.addPrimaryGroups(
  "crystalTri",
  new Geometry(GEO_TYPE.TRIANGLE, {
    _shader: GEO_SHADER.STANDARD,
    _track: "crystalTri_material",
    _color: redMain
  }),
);
scene1.addPrimaryGroups(
  "crystalCube",
  new Geometry(GEO_TYPE.CUBE, {
    _shader: GEO_SHADER.STANDARD,
    _track: "crystalCube_material",
    _color: redMain
  }),
);

// BOOST COLORS
// boost lights:
// ON - 240
// OFF - 272
// ON - 304
// OFF - 364
/* When Chroma gets fixed I'll add this
function boostColorManager (color: ColorType, time: number) {
    new CustomEvent(time).animateTrack("crystalTri_material", 0, {_color: color}).push();
    new CustomEvent(time).animateTrack("crystalCube_material", 0, {_color: color}).push();
    new CustomEvent(time).animateTrack("circleWall", 0, {_color: color}).push();
}
boostColorManager([10,0,0], 0);
boostColorManager([0,10,0], 10);
*/

// ANIMATE ENVIRONMENTS

scene.animate([ // BASE ENVIRONMENT
  ["ArdolfEnvironment", 0]
]);
scene1.animate([ // ANIMATIONS
  ["ArdolfEnvironment1", 111, 66], //66
  ["ArdolfEnvironment1", 303, 62],
])

//////////////////////////////////////////////////////////////
// NOTE ANIMATIONS
//////////////////////////////////////////////////////////////


notesBetween(0, 384, x => {
  if (x.track.value == "NoteTrack") {
  x.spawnEffect = false
  x.NJS = 16
  x.offset = 6
  }
})

const pathAnim = new CustomEvent(0).assignPathAnimation("NoteTrack", 1);
pathAnim.animate.position = [[0, 60, 20, 0], [0, 0, 0, 0.45, EASE.IN_OUT_QUART]]
pathAnim.animate.dissolve = [[0, 0], [0.5, 0.2], [1, 0.5]]
pathAnim.push();
pathAnim.time = 176;
pathAnim.animate.position = [[0, 60, 20, 0], [0, 0, 0, 0.45, EASE.IN_OUT_QUART]]
pathAnim.animate.dissolve = [[0, 0], [0.5, 0.2], [1, 0.5]]
pathAnim.push();
pathAnim.time = 364;
pathAnim.animate.position = [[0, 60, 20, 0], [0, 0, 0, 0.45, EASE.IN_OUT_QUART]]
pathAnim.animate.dissolve = [[0, 0], [0.5, 0.2], [1, 0.5]]
pathAnim.push();

const pathAnim1 = new CustomEvent(112).assignPathAnimation("NoteTrack", 1);
pathAnim1.animate.position = [[0, -60, 0.25, 0], [0, 0, 0, 0.45, EASE.IN_OUT_CUBIC]]
pathAnim1.animate.dissolve = [[0, 0], [0.9, 0.5]]
pathAnim1.push();
pathAnim1.time = 304;
pathAnim1.animate.position = [[0, -60, 0.25, 0], [0, 0, 0, 0.45, EASE.IN_OUT_CUBIC]]
pathAnim1.animate.dissolve = [[0, 0], [0.9, 0.5]]
pathAnim1.push();




/* Swifter Sun
env = new Environment("GlowLineH$", LOOKUP.REGEX);
env.lightID = 100;
env.duplicate = 1;
env.track = "sun"
env.push();*/


//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

function exportMap(diff: Difficulty) {
    diff.require("Chroma");
    diff.require("Noodle Extensions")
    diff.settings = PRESET.MODCHART_SETTINGS;
    diff.setSetting(SETTINGS.LEFT_HANDED, false);
    diff.setSetting(SETTINGS.NO_FAIL, undefined);
    diff.setSetting(SETTINGS.MAX_SHOCKWAVE_PARTICLES, 0);
    diff.setSetting("_countersPlus._mainEnabled", false);
    diff.setSetting("_uiTweaks._multiplierEnabled", false);
    diff.setSetting("_uiTweaks._comboEnabled", false);
    diff.setSetting("_uiTweaks._energyEnabled", false);
    diff.setSetting("_uiTweaks._positionEnabled", false);
    diff.setSetting("_uiTweaks._progressEnabled", false);
    diff.setSetting(SETTINGS.MIRROR_QUALITY.VALUE, SETTINGS.MIRROR_QUALITY.HIGH)
    diff.colorLeft = [0,0,0];
    diff.colorRight = [0, 0, 0];
    diff.lightColorLeft = [0,0,0];
    diff.lightColorRight = [0,0,0];
    diff.boostColorLeft = [0,0,0];
    diff.boostColorRight = [0,0,0];
    diff.obstacleColor = [0,0,0];
}
exportMap(map);
map.save();
