import { baseEnvironmentTrack, ColorType, arrAdd, Regex, CustomEvent, rotatePoint, Event, Vec3, LightRemapper, LOOKUP, AnimationInternals, KeyframesVec3, CustomEventInternals, jsonSet, Difficulty, Environment, Geometry, PRESET, GEO_SHADER, GEO_TYPE, ModelScene, rand, Text, exportZip } from "file:///G:/GitHub/ReMapperTutorials/ReMapperNasafrasa/src/mod.ts"

const map = new Difficulty("ExpertPlusLawless", "HardStandard");
let env: Environment;




// Directional Lights
env = new Environment(new Regex().add("DayAndNight").separate().add("Day").separate().add("DirectionalLightFront").end(), "Regex");
for (let i = 1; i <= 4; i++) {
    if (i > 1) env.duplicate = 1
    env.track.value = `DirectionalLight${i}Track`
    env.lightID = 100+i*10;
    env.lightType = 1;
    env.push();
}
function directionalLightAnimation(number: number, time:number, duration:number, rotation: KeyframesVec3) {
    const dirLight = new CustomEvent(time).animateTrack(`DirectionalLight${number}Track`, duration)
    dirLight.animate.rotation = rotation;
    dirLight.push();
}
directionalLightAnimation(1,0,0,[180,20,0]);
directionalLightAnimation(2,0,0,[180,-2,0]);
directionalLightAnimation(3,0,0,[180,0,0]);
directionalLightAnimation(4,0,0,[180,0,0]);




// Removes Original Environment Objects
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
softRemove("Contains",["Rail", "RectangleFakeGlow", "Mirror", "Clouds", "DayAndNight", "Tunnel"]);
hardRemove("Contains",["BackgroundGradient","DirectionalLightBack", "DirectionalLightLeft", "DirectionalLightRight", "HUD", "Player", "Chat"]);



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
    x.position = [0,-100000,0], 
    x.scale = [1,1,1], 
    x.rotation = [0,0,0] 
});
smokeAnimation(160, 0, x => { 
    x.position = [0,0,0], 
    x.scale = [20,20,100000], 
    x.rotation = [0,0,0] 
});
smokeAnimation(297, 0, x => { 
    x.position = [0,0,200], 
    x.scale = [20,10000,20], 
    x.rotation = [0,0,0] 
});
smokeAnimation(567, 0, x => { 
    x.position = [0,-100000,0], 
    x.scale = [1,1,1], 
    x.rotation = [0,0,0] 
});
smokeAnimation(668, 0, x => { 
    x.position = [0,0,200], 
    x.scale = [40,10000,40], 
    x.rotation = [0,0,0] 
});
smokeAnimation(860, 0, x => { 
    x.position = [0,0,0], 
    x.scale = [10,10,100000], 
    x.rotation = [0,0,0] 
});
smokeAnimation(1000, 0, x => { 
    x.position = [0,0,200], 
    x.scale = [40,10000,40], 
    x.rotation = [0,0,0] 
});


env = new Environment("Sun$", "Regex");
env.scale = [90, 60, 10]
env.position = [0, 0, 1000]
env.push();
env = new Environment("Moon$", "Regex");
env.scale = [20,20,20]
env.position = [-100, 150, 500]
env.rotation = [-10,5,5]
env.push();

new LightRemapper().type(4).range(1).setIDs([4, 22]).multiplyColor(20).run();




env = new Environment("Mountains", "Contains");
env.track.value = "MountainTrack"
env.push();

const mountainAnimation = new CustomEvent(0).animateTrack("MountainTrack")
mountainAnimation.animate.scale = [2,2,2]
mountainAnimation.push();
mountainAnimation.time = 429 ;
mountainAnimation.animate.scale = [0,0,0]
mountainAnimation.push();


env = new Environment("RainRipples", "Contains");
env.scale = [10,10000,10]
env.position = [0,-20,100]
env.rotation = [0,0,90]
env.lightType = 0;
env.lightID = 102;
env.push();


env = new Environment("Rain$", "Regex");
env.scale = [1,2,1]
env.lightType = 0;
env.lightID = 101;
env.track.value = "RainTrack"
env.push();

const rainAnimation = new CustomEvent(0).animateTrack("RainTrack")
rainAnimation.animate.scale = [1,2,1]
rainAnimation.push();
rainAnimation.time = 796;
rainAnimation.animate.rotation = [180,0,0]
rainAnimation.animate.position = [0, -25, 0]
rainAnimation.push();
rainAnimation.time = 860;
rainAnimation.animate.rotation = [0,0,0]
rainAnimation.animate.position = [0, 25, 0]
rainAnimation.push();


// Water
env = new Environment("Waterfall$", "Regex");
env.track.value = "WaterTrack"
env.push();

const animateWater = new CustomEvent().animateTrack("WaterTrack");
animateWater.animate.position = [0, 0, -250]
animateWater.animate.scale = [100, 1, 4]
animateWater.push();
animateWater.time = 796
animateWater.animate.position = [0, 0, 250]
animateWater.animate.scale = [100, 1, 4]
animateWater.animate.localRotation = [0,180,0]
animateWater.push();
animateWater.time = 860
animateWater.animate.position = [0, 0, -250]
animateWater.animate.scale = [100, 1, 4]
animateWater.animate.localRotation = [0,0,0]
animateWater.push();
animateWater.time = 988
animateWater.animate.position = [0, 0, -2500000]
animateWater.push();

// For making lasers
function lasers(modelScenename: any, lasers: number, environment: Environment | Geometry, type: number, name: string, scale?: Vec3) {
    const laserTracks: string[] = [];
    const laserEnv = environment;
    laserEnv.lightID = 101;
    laserEnv.lightType = type;
    laserEnv.track.value = "LaserLightTrack"
    for (let i = 1; i <= lasers; i++) laserTracks.push(name + `${i}`);
    modelScenename.addPrimaryGroups( laserTracks, laserEnv, scale);
}

function bgLasers(distance: number) {
    const bgLarers = new Geometry("Cube", "LightMaterial");
    for (let i = 0; i <= 3; i++) {
        let posZ = distance;
        let posX = 0;
        let invert = 1;
        let rotation = 0;
        if (i == 0 || i == 1) {posX = 0; posZ = distance;}
        if (i == 2 || i == 3) {posX = distance; posZ = 0;}
        if (i == 1 || i == 3) {invert = -1;}
        if (i == 3 || i == 2) {rotation = 90;}
        //if (i == 0) env = new Environment(new Regex().add("LightRailingSegment").vary(0).separate().add("NeonTubeDirectionalL").end(), "Regex")
        if (i > 0) bgLarers.duplicate = 1;
        bgLarers.position = [posX*invert,-2,posZ*invert]
        bgLarers.scale = [0.001,distance*2.5,0.001]
        bgLarers.rotation = [0,rotation,90]
        bgLarers.lightID = 101+i
        bgLarers.lightType = 7
        bgLarers.track.value = `BackgroundLasersTrack`
        bgLarers.push();
    }
    //new CustomEvent(0).assignTrackParent(["BackgroundLasersTrack0", "BackgroundLasersTrack1", "BackgroundLasersTrack2", "BackgroundLasersTrack3"], "BackgroundLasersTrack").push();
}
bgLasers(250);


function starGenerator(starAmount: number, starSize: number, starDistance: number) {
    for (let i = 0; i <= starAmount; i++) {
        const star = new Geometry("Sphere", "StarMaterial")
        const rotation: Vec3 = [rand(-90, 90),rand(-90, 90),0];
        star.track.value = `StarTrack${i}`
        star.push();
    
        const starAnimation = new CustomEvent().animateTrack(`StarTrack${i}`);
        starAnimation.animate.position = [0,0,-69420911]
        starAnimation.animate.color = [0,0,0,0]
        starAnimation.push();
        starAnimation.time = 292+rand(-0.01,0.01);
        starAnimation.animate.position = arrAdd(rotatePoint([0, starDistance, -starSize / 2], rotation), 0) as Vec3;
        starAnimation.animate.scale = [starSize,starSize,starSize];
        starAnimation.push();
        starAnimation.time = 856+rand(-0.01,0.01);
        starAnimation.animate.position = [0,0,-69420911]
        starAnimation.animate.color = [0,0,0,0]
        starAnimation.push();
    }
  }
  
starGenerator(400,11.5,5000);

const starFade = new CustomEvent(292).animateTrack("StarMaterialTrack", 32)
starFade.animate.color = [[0,0,0,0,0],[1,1,1,1,1]]
starFade.push();
starFade.duration = 12
starFade.time = 416;
starFade.animate.color = [[1,1,1,1,0],[0,0,0,0,1]]
starFade.push();
starFade.duration = 5
starFade.time = 576;
starFade.animate.color = [[0,0,0,0,0],[1,1,1,1,1]]
starFade.push();
starFade.time = 856;
starFade.animate.color = [0,0,0,0]
starFade.push();

/**
 * KEY:
 * 
 * WATER 4: RAIN LIGHTS
 * WATER 1: DIRECTIONAL LIGHTS
 * LEFT SUNBEAMS: ???
 * RIGHT SUNBEAMS: ???
 * SUN: SUN
 * 
 * WATER 2: LIGHTHOUSE LIGHT
 * WATER 3: BG GLOW
 * LEFT LASERS: MAIN LASERS
 * RIGHT LASERS: BLOOM LASERS 
 */

 // MAKE BG GLOW COLORS DIFFERENT AT ORCHESTRAL PART

// WATER 4 (0)
const rain = new LightRemapper().type(0);
rain.multiplyColor(1,1);
rain.addToEnd(100);
rain.run();
// WATER 2 (6)
const lighthouseLights = new LightRemapper().type(6);
lighthouseLights.addToEnd(100); 
lighthouseLights.multiplyColor(5,5);
lighthouseLights.run();
// WATER 3 (7)
const backgroundGlow = new LightRemapper().type(7);
backgroundGlow.multiplyColor(2.5,100);
backgroundGlow.addToEnd(100);
backgroundGlow.run();
// LEFT LASERS (10)
const mainLarers = new LightRemapper().type(10);
mainLarers.addToEnd(100);
mainLarers.run();
// RIGHT LASERS (11)
const bloomLarers = new LightRemapper().type(11);
bloomLarers.addToEnd(100);
bloomLarers.multiplyColor(20,0.01);
bloomLarers.run();
// WATER 1 (1)
const directionalLights = new LightRemapper().type(1);
directionalLights.addToEnd(100)
directionalLights.remapEnd([[100, 10]]);
directionalLights.run();


baseEnvironmentTrack("FogTrack");
function fogAnimation(time: number, duration: number, anim: (x: CustomEventInternals.AnimateComponent) => void) {
    const fog = new CustomEvent(time).animateComponent("FogTrack", duration);
    anim(fog);
    fog.push();
} 
fogAnimation(0, 0, x => { 
    x.fog.attenuation = [0.01], 
    x.fog.height = [0], 
    x.fog.startY = [-100000],
    x.lightMultiplier.bloomFogIntensityMultiplier = [1],
    x.lightMultiplier.colorAlphaMultiplier = [1]
});
fogAnimation(48, 32, x => { 
    x.fog.attenuation = [[0.01,0],[0.0001,1,"easeOutCirc"]]
});
fogAnimation(160, 0, x => { 
    x.fog.attenuation = [0.00005]
});
fogAnimation(557, 0, x => { 
    x.fog.attenuation = [0.0001]
});
fogAnimation(734, 64, x => { 
    x.fog.attenuation = [[0.0001,0],[0.00005,1,"easeOutCirc"]]
});

fogAnimation(860, 0, x => { 
    x.fog.attenuation = [0.00005]
});
fogAnimation(988, 0, x => { 
    x.fog.attenuation = [0.001]
});

map.geoMaterials["DefaultMaterial"] = {
    shader: "BTSPillar",
    color: [0,0,0]
}
map.geoMaterials["TextMaterial"] = {
    shader: "Standard",
    color: [1,1,1],
    shaderKeywords: []
}
map.geoMaterials["StarMaterial"] = {
    shader: "Standard",
    color: [0,0,0,0],
    shaderKeywords: [], 
    track: "StarMaterialTrack"
}
map.geoMaterials["LightMaterial"] = {
    shader: "TransparentLight",
    color: [0,0,0]
}
map.geoMaterials["SolidLightMaterial"] = {
    shader: "OpaqueLight",
    color: [0,0,0]
}


const scene = new ModelScene(new Geometry("Cube", "DefaultMaterial"));

const lighthouseLight = new Geometry("Cube", "SolidLightMaterial");
lighthouseLight.lightID = 101;
lighthouseLight.lightType = 6;
lighthouseLight.track.value = "LaserLightTrack"
scene.addPrimaryGroups( "house1", lighthouseLight );

scene.animate([
    ["mountains", 0],
    [[], 428],
    ["lighthouse", 568],
    ["sea", 1004]
]);

const laserScene = new ModelScene(new Geometry("Cube", "DefaultMaterial"));
lasers(laserScene, 9, new Geometry("Cube", "LightMaterial"), 10, "laser")
lasers(laserScene, 9, new Geometry("Cube", "LightMaterial"), 11, "bloom", [0.01,1,0.01])
laserScene.static("lasers");

const text = new Text("font");
text.position = [0, 4, 75];
text.rotation = [0,0,0];
text.scale = [1,1,1];
text.letterSpacing = 1;

const textScene = new ModelScene(new Geometry("Cube", "TextMaterial"));
textScene.animate([
    [[], 0],
    [text.toObjects("swallowed by the sea"), 431.5],
    [[], 436.5],
    [text.toObjects("trapped beneath the waves she lies"), 448],
    [[], 456],
    [text.toObjects("holding up her heart"), 464],
    [[], 469.5],
    [text.toObjects("inbetween the terrors of the night"), 480],
    [[], 490],
    [text.toObjects("trapped in ecstasy"), 504],
    [[], 509],
    [text.toObjects("where all colors look alive"), 520],
    [[], 527],
    [text.toObjects("the golden towers shine"), 535.5],
    [[], 541],
    [text.toObjects("and the dreamer dreams a dream of light"), 548],
    [[], 557],
]);


// SCRIPT

map.require("Chroma", true)
map.rawSettings = PRESET.CHROMA_SETTINGS;
map.settings.mirrorQuality = "HIGH";
map.settings.leftHanded = false;
map.settings.maxShockwaveParticles = 0;
map.settings.lights = "All";
map.colorRight = [0,0.565,0.617]
map.colorLeft = [0.293,0.329,0.38]
map.settings.smoke = true;
jsonSet(map.rawSettings, "_countersPlus._mainEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._multiplierEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._comboEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._energyEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._positionEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._progressEnabled", false); 
map.save();

exportZip(["ExpertPlusLawless"]);
