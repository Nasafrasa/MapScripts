import { 
    Difficulty,
    jsonSet,
    PRESET,
    exportZip,
    Color,
    info,
    transferVisuals,
    AnimationInternals,
    CustomEvent,
    Environment,
    KeyframesVec3,
    notesBetween,
    LightRemapper,
    ModelScene,
    Geometry,
    GEO_SHADER,
    GEO_TYPE,
    LOOKUP,
    ColorType,
    Regex,
    baseEnvironmentTrack,
    CustomEventInternals,
    Wall,
    arcsBetween,
    chainsBetween,
    rand
} from "https://deno.land/x/remapper@3.0.0/src/mod.ts"

/////////////////////////////////////////////////////
// INTIALIZATION
/////////////////////////////////////////////////////

// File Management
const importDiff = "ExpertPlusLawless"
const exportDiff = "HardStandard"
const map = new Difficulty(importDiff, exportDiff);
const final = true;
const songLength = 332;
const NOODLE_UNIT = 0.6
const multiDiff = false;

// Main Tracks for Player and Notes
new CustomEvent().assignPlayerToTrack("PlayerTrack").push();
notesBetween(0, songLength, (note) => { note.track.value = "NoteTrack" });
arcsBetween(0, songLength, (note) => { note.track.value = "ArcTrack" });
chainsBetween(0, songLength, (note) => { note.track.value = "ChainTrack" });
new CustomEvent().assignTrackParent(["NoteTrack", "ArcTrack", "ChainTrack", "SunTrack" /*, "BackgroundLasersTrack"*/],"PlayerTrack", true).push();

// Custom Logging
function log(text: string) {
    console.log("\x1b[35m%s\x1b[0m", "[N]", text);
}

// Animating Player
function animatePlayer(time: number, duration: number, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const event = new CustomEvent(time).animateTrack("PlayerTrack", duration);
    anim(event.animate);
    event.push(false);
} 
animatePlayer(0, 8, x => {
    x.position = [0,0,0];
    x.rotation = [0,0,0];
});
animatePlayer(220, 64, x => {
    x.position = [[0,0,0,0],[0,25,-25,1]];
    x.rotation = [0,0,0];
});
animatePlayer(284, 16, x => {
    x.position = [[0,25,-25,0],[0,0,0,1,"easeInOutCubic"]];
    x.rotation = [0,0,0];
});
animatePlayer(328, 5, x => {
    x.position = [[0,0,0,0],[0,0,-10000,1,"easeInExpo"]];
    x.rotation = [0,0,0];
});

// Laser Maker 5000 
function lasers(lasers: number, environment: Environment | Geometry, type: number) {
    const laserTracks: string[] = [];
    const laserEnv = environment;
    laserEnv.lightID = 101;
    laserEnv.lightType = type;
    for (let i = 1; i <= lasers; i++) laserTracks.push(`laser${i}`);
    scene.addPrimaryGroups( laserTracks, laserEnv);
}

function bloomLasers(lasers: number, environment: Environment | Geometry, type: number) {
    const laserTracks: string[] = [];
    const laserEnv = environment;
    laserEnv.lightID = 101;
    laserEnv.lightType = type;
    for (let i = 1; i <= lasers; i++) laserTracks.push(`bloom${i}`);
    scene.addPrimaryGroups(laserTracks, laserEnv, [4,0.2,4]);
}

// Material Maker
function materialMaker(name: string, shader: GEO_SHADER, type: GEO_TYPE, color: ColorType, depth: boolean) {
    if (depth) { map.geoMaterials[name+"Material"] = { shader: shader, color: color, track: name+"MaterialTrack" } } else {
    map.geoMaterials[name+"Material"] = { shader: shader, color: color, track: name+"MaterialTrack", shaderKeywords: [] } }
    scene.addPrimaryGroups(
        name,
        new Geometry(type, name+"Material")
    );
}

// Yeeter 3000
function softRemove(lookup: LOOKUP,id: Array<string>,){
    id.forEach((env) =>{
        const yeet = new Environment(env, lookup);
        yeet.position = [-69420,-69420,-69420];
        yeet.push();
    })
}
function hardRemove(lookup: LOOKUP,id: Array<string>,){
    id.forEach((env) =>{
        const yeet = new Environment(env, lookup);
        yeet.active = false;
        yeet.push();
    })
}
softRemove("Contains",["Environment", "DayAndNight"]);
hardRemove("Contains",["BackgroundGradient","DirectionalLightBack", "DirectionalLightLeft", "DirectionalLightRight"]);

// For Spinning Objects 
/*
function spin(spins: number, axis: number) {
    const spinArray: KeyframesVec3 = [];
    const getTime = (value: number, index: number) => (value / spins) + (index / spins)
    let x = [0,0,0]
    let y = [0,0,0]
    let z = [0,0,0]
    if (axis == 0) { x = [0,180,360] }
    if (axis == 1) { y = [0,180,360] }
    if (axis == 2) { z = [0,180,360] }
    for (let i = 0; i < spins; i++) {
        spinArray.push([x[0],y[0],z[0],getTime(0,i)]);
        spinArray.push([x[1],y[1],z[1],getTime(0.5,i)]);
        spinArray.push([x[2],y[2],z[2],getTime(1,i)]);
    }
    return spinArray
}*/

/////////////////////////////////////////////////////
// ENVIRONMENT ANIMATIONS
/////////////////////////////////////////////////////

let env: Environment;

// REMOVE SPECIFIC STUFF


env = new Environment(new Regex().add("LightRailingSegment").vary(0).separate().add("NeonTubeDirectionalL").separate().add("BoxLight").end(), "Regex");
env.active = false;
env.push();

env = new Environment("Mountains", "Contains");
env.active = true;
env.position = [0,0,0]
env.scale = [2,2,1]
env.push();
env.duplicate = 1;
env.scale = [2,10,2]
env.push();

env = new Environment("Sun", "Contains");
env.active = true;
env.position = [0,0,750]
env.scale = [20,2000,20]
env.track.value = "SunTrack"
env.push();

// DIRECTIONAL LIGHTS

env = new Environment(new Regex().add("DayAndNight").separate().add("Day").separate().add("DirectionalLightFront").end(), "Regex");
for (let i = 1; i <= 4; i++) {
    if (i == 2 || i == 3 || i == 4) env.duplicate = 1;
    env.track.value = `DirectionalLight${i}Track`
    env.lightID = 100+i;
    env.lightType = 1;
    env.push();
}
function directionalLightAnimation(number: number, time:number, duration:number, rotation: KeyframesVec3) {
    const dirLight = new CustomEvent(time).animateTrack(`DirectionalLight${number}Track`, duration)
    dirLight.animate.rotation = rotation;
    dirLight.push();
}
directionalLightAnimation(1,0,0,[0,0,0])
directionalLightAnimation(2,0,0,[0,0,0])
directionalLightAnimation(3,0,0,[0,0,0])
directionalLightAnimation(4,0,0,[0,0,0])


// SMOKE

env = new Environment("BigSmokePS$", "Regex");
env.track.value = "SmokeTrack";
env.active = true;
env.push();
function smokeAnimation(time: number, duration: number, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const event = new CustomEvent(time).animateTrack("SmokeTrack", duration);
    anim(event.animate);
    event.push(false);
} 
smokeAnimation(0, 0, x => { 
    x.position = [0,0,0], 
    x.scale = [0.5,0.5,100000], 
    x.rotation = [0,0,0] 
});
smokeAnimation(43, 0, x => { 
    x.position = [0,-5,0], 
    x.scale = [10,0,10],    
    x.rotation = [0,0,0] 
});
smokeAnimation(219, 0, x => { 
    x.position = [0,0,0], 
    x.scale = [10,10,100000], 
    x.rotation = [0,0,0] 
});
smokeAnimation(284, 0, x => { 
    x.position = [0,-5,0], 
    x.scale = [10,0,10], 
    x.rotation = [0,0,0] 
});

// RAIN

env = new Environment("Rain$", "Regex");
env.track.value = "RainTrack";
env.lightType = 0;
env.lightID = 101;
env.push();
function rainAnimation(time: number, duration: number, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const rain = new CustomEvent(time).animateTrack("RainTrack", duration);
    anim(rain.animate);
    rain.push(false);
} 
rainAnimation(0, 0, x => { 
    x.position = [0,0,0], 
    x.scale = [0.5,10,0.5], 
    x.rotation = [90,0,0] 
});
rainAnimation(44, 0, x => { 
    x.position = [0,-25,0], 
    x.scale = [11,5,11], 
    x.rotation = [180,0,0] 
});

// FOG

baseEnvironmentTrack("FogTrack");
function fogAnimation(time: number, duration: number, anim: (x: CustomEventInternals.AnimateComponent) => void) {
    const fog = new CustomEvent(time).animateComponent("FogTrack", duration);
    anim(fog);
    fog.push();
} 
fogAnimation(0, 0, x => { 
    x.fog.attenuation = [0.0001], 
    x.fog.height = [40], 
    x.fog.startY = [-100],
    x.lightMultiplier.bloomFogIntensityMultiplier = [1],
    x.lightMultiplier.colorAlphaMultiplier = [1]
});
fogAnimation(36, 0, x => { 
    x.fog.attenuation = [0], 
    x.fog.height = [40], 
    x.fog.startY = [-100],
    x.lightMultiplier.bloomFogIntensityMultiplier = [1],
    x.lightMultiplier.colorAlphaMultiplier = [1]
});
fogAnimation(40, 0, x => { 
    x.fog.attenuation = [0.00005], 
    x.fog.offset = [1000],
    x.fog.height = [7.5], 
    x.fog.startY = [-15],
    x.lightMultiplier.colorAlphaMultiplier = [100]
});
fogAnimation(92, 32, x => { 
    x.fog.attenuation = [[0.00005,0],[0.00001,1]], 
    x.lightMultiplier.bloomFogIntensityMultiplier = [[1,0],[0.5,1]]
});

// BACKGROUND BLOOM LASERS

function bgLasers(distance: number) {
    for (let i = 0; i <= 3; i++) {
        let posZ = distance;
        let posX = 0;
        let invert = 1;
        let rotation = 0;
        if (i == 0 || i == 1) {posX = 0; posZ = distance;}
        if (i == 2 || i == 3) {posX = distance; posZ = 0;}
        if (i == 1 || i == 3) {invert = -1;}
        if (i == 3 || i == 2) {rotation = 90;}
        if (i == 0) env = new Environment(new Regex().add("LightRailingSegment").vary(0).separate().add("NeonTubeDirectionalL").end(), "Regex")
        if (i > 0) env.duplicate = 1;
        env.position = [posX*invert,1.5,posZ*invert]
        env.scale = [10,distance/2.333,10]
        env.rotation = [0,rotation,90]
        env.lightID = 101+i
        env.lightType = 10
        env.track.value = "BackgroundLasersTrack"
        env.push();
    }
}
bgLasers(500);

env = new Environment("Waterfall$", "Regex");
env.track.value = "waterballs";
env.push();

/* WATER
const waterTrack = new CustomEvent().animateTrack("waterballs");
waterTrack.time = 0;
waterTrack.animate.scale = [100, 1, 3];
waterTrack.animate.position = [0, 0, -250]
waterTrack.push();*/

/////////////////////////////////////////////////////
// NOODLE EXTENSIONS
/////////////////////////////////////////////////////

const wallsAreFake = false

const startWall = new Wall(22,10);
startWall.animate.definitePosition = [[-2.6,2.5,100,0],[-2.6,2.5,10,1]]
startWall.scale = [0.5/NOODLE_UNIT,0.5/NOODLE_UNIT,0.5/NOODLE_UNIT]
startWall.animate.scale = [10,10,10]
startWall.animate.color = [[1,1,100,100,0.7],[50,0,100,100,1, "easeInQuart"]]
startWall.animate.dissolve = [[0,0],[0,0.7],[0.75,0.85],[0.75,0.849],[0,0.85]]
startWall.localRotation = [45,45,0];
startWall.interactable = false;
startWall.push(wallsAreFake);

const texture = new Wall(44,songLength-44);
texture.animate.definitePosition = [[-1000,-10,-1000,0],[-1000,-10,-1250,1]]
texture.scale = [1,1,1]
texture.animate.scale = [10000,0,10000]
texture.animate.color = [0,0,0,10]
texture.animate.dissolve = [0.25]
texture.interactable = false;
texture.push(wallsAreFake);
texture.animate.definitePosition = [[-1002,-10,-2000,0],[-1002,-10,-1750,1]]
texture.push(wallsAreFake);
texture.animate.definitePosition = [[-1000,-10,-1000,0],[-1250,-10,-1000,1]]
texture.push(wallsAreFake);
texture.animate.definitePosition = [[-2000,-10,-1002,0],[-1750,-10,-1002,1]]
texture.push(wallsAreFake);

for (let i = 0; i <= 500; i++) {
    const rand1 = rand(-500,500)
    const rand2 = rand(-500,500)
    const impact = new Wall(220+rand(-0.5,0.5),64);
    impact.animate.definitePosition = [[rand1,-50,rand2,0],[rand1,rand(10,500),rand2,1]]
    impact.scale = [0.1,10,0.1]
    impact.animate.scale = [1,1,1]
    impact.animate.color = [1,1,1,1]
    impact.animate.dissolve = [[0,0],[1,0.05],[1,0.95],[0,1]]
    impact.interactable = false;
    impact.push(wallsAreFake);
}

/////////////////////////////////////////////////////
// BLENDER ENVIRONMENTS
/////////////////////////////////////////////////////

map.geoMaterials["default"] = {
    shader: "BTSPillar",
    color: [0,0,0]
}
map.geoMaterials["laser"] = {
    shader: "TransparentLight"
}
map.geoMaterials["water"] = {
    shader: "BillieWater",
}
map.geoMaterials["shiny"] = {
    shader: "InterscopeCar"
}

const scene = new ModelScene(new Geometry("Cube", "default"));
lasers(9, new Geometry("Sphere", "laser"), 11)
bloomLasers(9, new Environment(new Regex().add("LightRailingSegment").separate().add("NeonTubeDirectionalL").end(), "Regex"), 2);
materialMaker("text", "Standard", "Cube", [1,1,1], false);
materialMaker("textCurves", "Standard", "Cube", [1,1,1], false);
scene.animate([
    ["are", 36],
    ["you", 38],
    ["ready", 40],
    ["main", 42,songLength-42]
]);

const portal = new ModelScene(new Geometry("Cube", "water"));
portal.animate([
    ["waterTube", 0],
    [[], 43]
]);

const ship = new ModelScene(new Geometry("Cube", "default"));
ship.animate([
    ["ship", 220, 64],
    [[], 284]
]);

// TEXT PULSING
const textFade = new CustomEvent().animateTrack(["textMaterialTrack", "textCurvesMaterialTrack"],2);
textFade.time = 36;
textFade.animate.color = [[1,1,1,1,0],[0,0,0,0,1]];
textFade.push();
textFade.time = 38;
textFade.animate.color = [[1,1,1,1,0],[0,0,0,0,1]];
textFade.push();
textFade.time = 40;
textFade.animate.color = [[1,1,1,1,0],[0,0,0,0,1]];
textFade.push();





/////////////////////////////////////////////////////
// LIGHT REMAPPER
/////////////////////////////////////////////////////

// WATER 4 (0)
const rainLights = new LightRemapper().type(0);
rainLights.addToEnd(100);
rainLights.run();

// WATER 1 (1)
const directionalLights = new LightRemapper().type(1);
directionalLights.addToEnd(100);
directionalLights.run();

// LEFT SUNBEAMS (2)
const bloomLarers = new LightRemapper().type(2);
bloomLarers.addToEnd(100);
bloomLarers.multiplyColor(25,0.01);
bloomLarers.run();


// LEFT LASERS (10)
const bgLarers = new LightRemapper().type(10);
bgLarers.addToEnd(100);
bgLarers.multiplyColor(25,0.01);
bgLarers.run();

// RIGHT LASERS (11)
const mainLarers = new LightRemapper().type(11);
mainLarers.addToEnd(100);
mainLarers.run();





/////////////////////////////////////////////////////
// EXPORT
/////////////////////////////////////////////////////

// SETTINGS
const leftColor = new Color([0.62,0.45,0.67], "RGB");
const rightColor = new Color([0.25,0.23,0.42], "RGB");
const wallColor = new Color([1,0,0], "RGB")
const NJS = 14;
const offset = 0.25;
const usesChroma = true;
const usesNoodle = true;
const usesCinema = false;
const enviro = "Billie"; // You would usually use this when making Gaga charts
const extraSafe = true;
const presetType = PRESET.MODCHART_SETTINGS;
const exportDiffs = [exportDiff]

// EXPORT DIFFS
function exportMap(diff: Difficulty) { // @ts-ignore: Not an issue
    info.environment = enviro + "Environment"; 
    diff.require("Chroma", usesChroma);
    diff.require("Noodle Extensions", usesNoodle); // @ts-ignore: Not an issue
    diff.require("Cinema", usesCinema)
    diff.rawSettings = presetType;
    diff.settings.leftHanded = false;
    diff.settings.maxShockwaveParticles = 0;
    diff.settings.lightsExPlus = "All";
    diff.settings.lights = "All";
    diff.settings.mirrorQuality = "HIGH";
    diff.settings.smoke = true; // @ts-ignore: Not an issue
    diff.colorLeft = leftColor.export();  // @ts-ignore: Not an issue
    diff.colorRight = rightColor.export();  // @ts-ignore: Not an issue
    diff.lightColorLeft = leftColor.export().map(function(x) { return x + 0.25; }); // @ts-ignore: Not an issue
    diff.lightColorRight = rightColor.export().map(function(x) { return x + 0.25; }); // @ts-ignore: Not an issue
    diff.boostColorLeft = leftColor.export().map(function(x) { return x * 2; }); // @ts-ignore: Not an issue
    diff.boostColorRight = rightColor.export().map(function(x) { return x * 2; }); // @ts-ignore: Not an issue
    diff.wallColor = wallColor.export();
    diff.NJS = NJS;
    diff.offset = offset;
    if (extraSafe) { 
        jsonSet(diff.rawSettings, "_countersPlus._mainEnabled", false);
        jsonSet(diff.rawSettings, "_uiTweaks._multiplierEnabled", false);
        jsonSet(diff.rawSettings, "_uiTweaks._comboEnabled", false);
        jsonSet(diff.rawSettings, "_uiTweaks._energyEnabled", false);
        jsonSet(diff.rawSettings, "_uiTweaks._positionEnabled", false);
        jsonSet(diff.rawSettings, "_uiTweaks._progressEnabled", false); 
    }
}
map.save(); // @ts-ignore: Not an issue
if (multiDiff) transferVisuals(exportDiffs, x => { exportMap(x) });
log("Successfully Exported " + info.name + "!");
if (final) exportZip([importDiff]);