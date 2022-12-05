import { arrAdd, CustomEvent, info, DIFFS, CustomEventInternals, ENV, rand, activeDiff, NOTE, Wall, KeyframesVec3, Difficulty, Environment, Event, EVENT, Geometry, KeyframesLinear, LightRemapper, ModelScene, PRESET, Regex, rotatePoint, transferVisuals, Vec3, KeyframesAny, notesBetween, jsonSet, exportZip, Note } from "https://deno.land/x/remapper@2.1.0/src/mod.ts"
import * as Nootils from "./nootils/index.ts"

function pain(input: DIFFS, output: DIFFS, fog: boolean, NJS:number, offset:number) {

let map = new Difficulty(input, output);
let env: Environment;

//////////////////////////////////////////////////////////////
// ENVIRONMENT STUFF
//////////////////////////////////////////////////////////////

// REMOVE/HIDE

env = new Environment("BackgroundGradient", "Contains");
env.active = false;
env.push();
env.id = "Mountains"
env.push();
//env.id = "Smoke"
//env.push();
env.id = "PlayersPlace"
env.push();
env.id = "HUD"
env.push();
env.id = "DayAndNight"
env.push();
env.id = "Clouds"
env.push();
env.id = "Rail"
env.active = true;
env.position = [-69420,911,80085]
env.push();



env = new Environment("Waterfall$", "Regex");
env.scale = [10, 1, 0.75];
env.position = [0, -1, -67]
env.track = "water";
env.push();

if (fog == false) {
  env = new Environment("Smoke", "Contains");
  env.position = [0, 25, 200]
  env.track = "smoke"
  env.push();

  const men = new CustomEvent(0).animateTrack("smoke")
  men.animate.scale = [1000,2,0.1]
  men.push();
  men.time = 101
  men.animate.scale = [2,2,0.1]
  men.push()
  men.time = 236
  men.animate.scale = [2,1000,0.1]
  men.push();

} else {
  env = new Environment("Smoke", "Contains");
  env.active = false;
  env.push();
}

// RAIN 

env = new Environment("Rain$", "Regex");
env.lightID = 201;
env.position = [0,0,50];
env.rotation = [90,0,0];
env.scale = [1,2,1];
env.track = "rain";
env.push();


for (let i = 0; i <= 64; i++) {
  const rainBeat = new CustomEvent(110+i*8).animateTrack("rain",2)
  rainBeat.animate.scale = [[1,5,1,0],[1,2,1,1]]
  rainBeat.push();
}

// FOG
if (fog == true) {
  new CustomEvent().assignFogTrack("fog").push();
  const event = new CustomEvent(0.001).animateTrack("fog");
  event.animate.startY = [0.05];
  event.animate.attenuation = [0.0000000001];
  event.animate.height = [-0.01];
  event.push();
} else {
  new CustomEvent().assignFogTrack("fog").push();
  const event = new CustomEvent(0.001).animateTrack("fog");
  event.animate.startY = [-99999];
  event.animate.attenuation = [0.0000000001];
  event.animate.height = [0];
  event.push();
}
// EXTRA WATER
/*
const water1 = new Wall(0, 319*2);//spawning the water 3 or 4 beats before the scene with the water youll see why below keep reading the comments
water1.track.value = "water2";
water1.scale = [250, 0, 250];
water1.interactable = false;
water1.fake = true;
water1.color = [0, 0, 0, 1];
water1.animate.definitePosition = [[water1.scale[0] / -2, -0.51, water1.scale[2] / -4,0],[(water1.scale[0] / -2) + 200, -0.51, water1.scale[2] / -4,1]];//im using here water scale so it would just put the water in the middle of the map -> 0,0,0 will be the center of the wall(only x and z because y will be something that you choose) feel free to keep it its not a varible that i created. its with the scale i set
water1.animate.dissolve = [[0, 0], [1, 0.001], [1,0.499], [0,0.5]];
water1.push();
*/
// NOTEMODS

Nootils.GiveTypeNotesTrack("leftNotes", "rightNotes", 0, 319)

const left = new CustomEvent(0).animateTrack("leftNotes");
//left.animate.position = [-5,0,0]
left.animate.color = [0.75,0.75,0.75,1]
left.push();
left.time = 68;
left.duration = 31;
left.animate.color = [[0.75,0.75,0.75,1,0],[0.513,0,0.513,1,1]]
left.push();
left.time = 102
left.animate.color = [1,1,0,1]
left.push();
left.time = 108
left.animate.color = [0.88,0.01,0.58,1]
left.push();
left.duration = 2;
left.time = 172
left.animate.color = [[0.88,0.01,0.58,1,0],[0.8,0,0,1,1]]
left.push();
left.duration = 32;
left.time = 236
left.animate.color = [[0.8,0,0,1,0],[0.202,0.755,0.737,1,1]]
left.push();

const right = new CustomEvent(0).animateTrack("rightNotes");
//right.animate.position = [5,0,0]
right.animate.color = [0.33,0.33,0.33,1]
right.push();
right.time = 108
right.animate.color = [0.5,0,0.85,1]
right.push();
right.duration = 1;
right.time = 172
right.animate.color = [[0.5,0,0.85,1,0],[1,0.69,0.24,1,1]]
right.push();
right.duration = 32;
right.time = 236
right.animate.color = [[1,0.69,0.24,1,0],[0,0.08,0.538,1,1]]
right.push();

/*
const filterednotes = map.notes.filter(n => n.time > 0 && n.time <= 319);
filterednotes.forEach(note => {
  if (note.type === 0) {
    note.noteGravity = false;
    note.spawnEffect = false;
    note.offset = -0.35+1;
    note.animate.dissolve = [[0,0],[1,0.5, "easeOutExpo"]]
    note.animate.dissolveArrow = [[0,0],[0.75,0.5, "easeOutExpo"]]
    note.animate.position = [[0, 0, 0, 0], [5, 0, 0, 0.4875, "easeOutExpo"]];
  } else if (note.type === 1) {
    note.noteGravity = false;
    note.spawnEffect = false;
    note.offset = -0.35+1;
    note.animate.dissolve = [[0,0],[1,0.5, "easeOutExpo"]]
    note.animate.dissolveArrow = [[0,0],[1,0.5, "easeOutExpo"]]
    note.animate.position = [[0, 0, 0, 0], [-5, 0, 0, 0.4875, "easeOutExpo"]];
  }
});
*/
//////////////////////////////////////////////////////////////
// LIGHT STUFF
//////////////////////////////////////////////////////////////

const rain = new LightRemapper().type(0);
rain.addToEnd(200);
rain.multiplyColor(2,1);
rain.run();

const mainLarers = new LightRemapper().type(EVENT.BILLIE_RIGHT).setType(EVENT.RING_LIGHTS);
mainLarers.addToEnd(100);
mainLarers.multiplyColor(17,0.01);
mainLarers.run();

//////////////////////////////////////////////////////////////
// GEOMETRY STUFF
//////////////////////////////////////////////////////////////

map.geoMaterials["whiteMat"] = {
    _shader: "Standard",
    _shaderKeywords: [],
    _color: [1,1,1]
}
  
map.geoMaterials["blackMat"] = {
    _shader: "Standard",
    _shaderKeywords: [],
    _color: [0.025,0.025,0.025] // TOO DARK
}


const scene = new ModelScene(new Geometry(undefined, "blackMat"));

scene.addPrimaryGroups(
  "white",
  new Geometry("Cube", "whiteMat")
);

const lasers = 5;
const laserTracks: string[] = [];
const laserEnv = new Environment(new Regex().add("LightRailingSegment").separate().add("NeonTubeDirectionalL").end(), "Regex");
laserEnv.lightID = 100;
for (let i = 1; i <= lasers; i++) laserTracks.push(`bloom${i}`);

scene.addPrimaryGroups(
  laserTracks,
  laserEnv,
  [4,0.2,4]
);

scene.animate([
  ["untitled",0]
]);

function exportMap(diff: Difficulty) {
    diff.require("Chroma", false);
    diff.suggest("Chroma", true);
    diff.rawSettings = PRESET.MODCHART_SETTINGS;
    diff.settings.leftHanded = false;
    diff.settings.maxShockwaveParticles = 0;
    diff.settings.lightsExPlus = "All";
    diff.settings.lights = "All";
    diff.settings.mirrorQuality = "HIGH";
    diff.settings.smoke = true;
    diff.obstacleColor = [1,1,1];
    diff.NJS = NJS;
    diff.offset = offset;
    jsonSet(diff.rawSettings, "_countersPlus._mainEnabled", false);
    jsonSet(diff.rawSettings, "_uiTweaks._multiplierEnabled", false);
    jsonSet(diff.rawSettings, "_uiTweaks._comboEnabled", false);
    jsonSet(diff.rawSettings, "_uiTweaks._energyEnabled", false);
    jsonSet(diff.rawSettings, "_uiTweaks._positionEnabled", false);
    jsonSet(diff.rawSettings, "_uiTweaks._progressEnabled", false);
  }
const mainMap = new Difficulty("ExpertPlusStandard");
map.events = mainMap.events
exportMap(map);
map.colorLeft = [0.75,0.75,0.75];
map.colorRight = [0.33,0.33,0.33];
map.require("Noodle Extensions", false);
map.save();
}

pain("ExpertPlusLawless", "ExpertPlusStandard", false, 16, -0.35)
pain("ExpertLawless", "ExpertStandard", false, 15, -0.25)

pain("HardLawless", "ExpertPlusOneSaber", true, 16, -0.35)
pain("NormalLawless", "ExpertOneSaber", true, 15, -0.25)

exportZip(["ExpertPlusLawless", "EasyLawless", "HardLawless", "ExpertLawless", "NormalLawless"]);