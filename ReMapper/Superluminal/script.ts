import { Difficulty, LightRemapper, Event, PRESET, exportZip, jsonSet, CustomEvent, notesBetween, arcsBetween, chainsBetween, Regex, baseEnvironmentTrack, ModelScene, AnimatedObjectInput, GEO_SHADER, GEO_TYPE, ColorType, modelToWall, rand, Wall, ENV } from "https://deno.land/x/remapper@3.1.2/src/mod.ts"
import { animateFog, animateMirror, animateRain, animateSmoke, animateTrack, bgLasers, directionalLightAnimation, hardRemove, lasers, softRemove, spin } from "./functions.ts"
import { info } from "https://deno.land/x/remapper@3.1.2/src/beatmap.ts"
import { ComplexKeyframesLinear, ComplexKeyframesVec3, KeyframesLinear, KeyframesVec3 } from "https://deno.land/x/remapper@3.1.2/src/animation.ts"
import { Environment, Geometry } from "https://deno.land/x/remapper@3.1.2/src/environment.ts"
import { Arc, Chain, Note } from "https://deno.land/x/remapper@3.1.2/src/note.ts"
import { HSVtoRGB } from "https://raw.githubusercontent.com/Splashcard04/Map-Key/main/src/HeckLib/HeckLib/main.ts";
import { ParticleSystem } from "./particle_system.ts";
import { bombsBetween } from "https://deno.land/x/remapper@3.1.2/src/general.ts"
import { Text } from "file:///G:/GitHub/ReMapperTutorials/ReMapperNasafrasa/src/mod.ts"

const map = new Difficulty("ExpertPlusNoArrows", "ExpertPlusStandard")
const final = true
let env: Environment;

const SONG_LENGTH = 639

/**
 * LIGHT LANES:
 * 0 - RAIN LIGHTS
 * 1 - DIRECTIONAL LIGHTS
 * 2 - AURORA LIGHTS
 * 3 - TUNNEL LASERS
 * 
 * 6 - CIRCLE LIGHTS
 * 10 - BACKGROUND LASERS
 * 11 - MAIN LASERS
 */

//! Functions

function materialMaker(modelScenename: any, name: string, shader: GEO_SHADER, type: GEO_TYPE, color: ColorType, depth: boolean) {
    if (depth) { map.geoMaterials[name + "Material"] = { shader: shader, color: color, track: name + "MaterialTrack" } } else {
        map.geoMaterials[name + "Material"] = { shader: shader, color: color, track: name + "MaterialTrack", shaderKeywords: [] }
    }
    modelScenename.addPrimaryGroups(name, new Geometry(type, name + "Material"));
}


//! Player

new CustomEvent().assignPlayerToTrack("PlayerTrack").push();
notesBetween(0, SONG_LENGTH, (note) => {
    note.track.add("NoteTrack")
    note.NJS = 16
    note.offset = 0
    note.noteGravity = false
    note.spawnEffect = false
});
bombsBetween(0, SONG_LENGTH, (bomb) => {
    bomb.track.add("BombTrack")
    bomb.NJS = 16
    bomb.offset = 0
    bomb.noteGravity = false
    bomb.spawnEffect = false
});
arcsBetween(0, SONG_LENGTH, (arc) => {
    arc.track.add("ArcTrack")
    arc.NJS = 16
    arc.offset = 0
    // arc.noteGravity = false
    arc.spawnEffect = false
});
chainsBetween(0, SONG_LENGTH, (chain) => {
    chain.track.add("ChainTrack")
    chain.NJS = 16
    chain.offset = 0
    // chain.noteGravity = false
    chain.spawnEffect = false
});
new CustomEvent().assignTrackParent(["NoteTrack", "BombTrack", "ArcTrack", "ChainTrack", "BackgroundLasersTrack", "PlayersPlaceTrack"], "PlayerTrack", true).push();

// Time, Duration, Animation
const playerPositions: [number, number, KeyframesVec3][] = [
    [0, 0, [0, 0, 0]],
    [68, 30, [[0, 0, 0, 0], [0, 0, 100, 1]]],
    [98, 4, [[0, 0, 100, 0], [0, 0, 150, 1, "easeInOutExpo"]]],
    [102, 14, [[0, 0, 150, 0], [0, 0, 200, 1, "easeInOutSine"]]],
    [116, 8, [[0, 0, 200, 0], [0, 0, 0, 1, "easeInExpo"]]],
    [132, 4, [[0, 0, 0, 0], [0, 0, 50, 1, "easeOutCubic"]]],
    [136, 8, [[0, 0, 50, 0], [0, 0, 100, 1, "easeInOutCubic"]]],
    [144, 8, [[0, 0, 100, 0], [0, 0, 150, 1, "easeInOutCubic"]]],
    [152, 4, [[0, 0, 150, 0], [0, 0, 0, 1, "easeInCubic"]]],

    [164, 14, [[0, 0, 0, 0], [0, 0, 30, 1, "easeInOutSine"]]],
    [178, 2, [[0, 0, 30, 0], [0, 0, 0, 1, "easeInCubic"]]],
    [195, 0, [0, 0, 0]],
    [324, 28, [[0, 0, 0, 0], [0, 0, 240*5, 1, "easeInOutSine"]]],

    [420, 4, [[0, 0, 40, 0], [0, 0, 20, 1, "easeOutSine"]]],
    [424, 28, [[0, 0, 20, 0], [0, 0, 0, 1, "easeInOutSine"]]],

    [468, 8, [[0, 0, 0, 0], [0, 0, -50, 1, "easeInOutSine"]]],
    [483, 1, [[0, 0, -50, 0], [0, 0, 0, 1, "easeOutExpo"]]],

    [486, 32, [[0, 0, 0, 0], [0, 0, -100, 1]]],
    [516, 2, [[0, 0, -100, 0], [0, 0, 0, 1, "easeInOutSine"]]],

    //[518, 28, [[0, 0, 0, 0], [0, 0, 200, 1, "easeInOutSine"]]],
    //[546, 2, [[0, 0, 200, 0], [0, 0, 0, 1, "easeInOutSine"]]],
]
playerPositions.forEach(p => {
    animateTrack(p[0], p[1], "PlayerTrack", (x) => {
        x.position = p[2]
    })
})


//! Environment

// Remove
softRemove("Contains", ["Environment"])
hardRemove("Contains", ["DirectionalLightBack", "DirectionalLightLeft", "DirectionalLightRight", "SaberBurnMarksParticles"])
// BG Lasers
bgLasers(250)

// Directional Lights
{
    env = new Environment(new Regex().add("DirectionalLights").separate().add("DirectionalLightFront").end(), "Regex");
    for (let i = 1; i <= 4; i++) {
        if (i > 1) env.duplicate = 1
        env.track.value = `DirectionalLight${i}Track`
        env.lightID = 100 + i * 10;
        env.lightType = 1;
        env.push();
    }
}
const directionalLightsAnimations: [number, number, number, KeyframesVec3][] = [
    [1, 0, 60, spin(12, [0])],
    [2, 0, 60, spin(12, [0])],
    [3, 2, 62, spin(12, [1])],
    [4, 2, 62, spin(12 * 3, [1])],

    [1, 68, 0, [0, 180, 0]],
    [2, 68, 0, [10, 180, 0]],
    [3, 68, 0, [-10, 180, 0]],
    [4, 68, 0, [0, 180, 0]],

    [1, 126, 0, [165, 0, 0]],
    [2, 126, 0, [-180, 0, 0]],
    [3, 126, 0, [165, -30, 0]],
    [4, 126, 0, [165, 30, 0]],


    [1, 259, 4, spin(1, [0])],
    [2, 259, 4, spin(1, [0])],
    [3, 259, 4, spin(1, [1])],
    [4, 259, 4, spin(3, [1])],


    [1, 324, 0, [180, 0, 0]],
    [2, 324, 0, [-160, 0, 0]],
    [3, 324, 0, [180, 0, 0]],
    [4, 324, 0, [-160, 0, 0]],
]
directionalLightsAnimations.forEach(x => {
    directionalLightAnimation(x[0], x[1], x[2], x[3])
})


// Mirror
{
    env = new Environment("Mirror", "EndsWith");
    env.track.value = "MirrorTrack";
    env.push();
}
animateMirror(0, 0, x => {
    x.position = [69420, 0, 0]
});
animateMirror(132, 0, x => {
    x.position = [0, -5, 0]
    x.rotation = [0, 0, 0]
    x.scale = [1000, 1, 1000]
});
animateMirror(156, 0, x => {
    x.position = [69420, 69420, 0]
});

// Players Place
{
    env = new Environment("PlayersPlace", "EndsWith");
    env.position = [0, 0, 0]
    env.track.add("PlayersPlaceTrack")
    env.push();
}


//! Fog

baseEnvironmentTrack("FogTrack");
animateFog(0, 0, x => {
    x.fog.attenuation = [0]
    x.fog.height = [0]
    x.fog.startY = [-100000]
    x.lightMultiplier.bloomFogIntensityMultiplier = [1]
    x.lightMultiplier.colorAlphaMultiplier = [1]
});
animateFog(68, 0, x => {
    x.fog.attenuation = [0.00005]
    x.fog.height = [1]
    x.fog.startY = [-1000]
});
animateFog(100, 0, x => {
    x.fog.attenuation = [0.000007]
    x.fog.height = [1]
    x.fog.startY = [-1000]
});
animateFog(132, 0, x => {
    x.fog.attenuation = [0.0005]
    x.fog.height = [6]
    x.fog.startY = [-13]
});
animateFog(164, 0, x => {
    x.fog.attenuation = [0.0002]
    x.fog.height = [7]
    x.fog.startY = [-12]
});
animateFog(196, 0, x => {
    x.fog.attenuation = [0.0000001]
    x.fog.height = [1]
    x.fog.startY = [-100000]
});
 

animateFog(263, 0, x => {
    x.fog.attenuation = [-0.0000075]
});
animateFog(271, 0, x => {
    x.fog.attenuation = [0.0001]
});
animateFog(279, 0, x => {
    x.fog.attenuation = [0.0005]
});
animateFog(292, 0, x => {
    x.fog.attenuation = [0.0001]
});
animateFog(316, 0, x => {
    x.fog.attenuation = [-0.0005]
});


animateFog(324, 0, x => {
    x.fog.attenuation = [0.00001]
});
animateFog(420, 0, x => {
    x.fog.attenuation = [0.0001]
    x.fog.height = [10]
    x.fog.startY = [-25]
});
animateFog(452, 0, x => {
    x.fog.attenuation = [0.0001]
    x.fog.height = [1]
    x.fog.startY = [-1000000]
});
animateFog(486, 0, x => {
    x.fog.attenuation = [0]
});

animateFog(518, 0, x => {
    x.fog.attenuation = [-0.0001]
});
animateFog(546, 0, x => {
    x.fog.attenuation = [0]
});

//! Blender Environments

// Materials
map.geoMaterials["DefaultMaterial"] = {
    shader: "BTSPillar",
    color: [0, 0, 0]
}
map.geoMaterials["LightMaterial"] = {
    shader: "TransparentLight",
    color: [0, 0, 0]
}
map.geoMaterials["WaterMaterial"] = {
    shader: "BillieWater",
    color: [0, 0, 0]
}
map.geoMaterials["TextMaterial"] = {
    shader: "Standard",
    color: [1, 1, 1],
    shaderKeywords: [],
    track: "TextMaterialTrack"
}

// ITS SO JOEVER ITS SO JOEVER

const sceneTracks: string[] = [];
const scene = new ModelScene(new Geometry("Cube", "DefaultMaterial"));
materialMaker(scene, "ship", "BTSPillar", "Cube", [1, 0, 1], true)
materialMaker(scene, "cyl", "BTSPillar", "Cylinder", [1, 0, 1], true)

materialMaker(scene, "wires", "InterscopeCar", "Cube", [1, 0, 1], true)
materialMaker(scene, "cubes", "InterscopeCar", "Cube", [1, 0, 1], true)
materialMaker(scene, "waterTunnel2", "BillieWater", "Cube", [0, 0, 0], true)

materialMaker(scene, "sph", "InterscopeCar", "Sphere", [1, 0, 1], true)
materialMaker(scene, "ship2", "InterscopeCar", "Cube", [10, 10, 10], true)
materialMaker(scene, "cyl2", "InterscopeCar", "Cylinder", [10, 10, 10], true)
materialMaker(scene, "triangle", "InterscopeCar", "Triangle", [10, 10, 10], true)
lasers(scene, 7, new Geometry("Cube", "LightMaterial"), 11, "laser")
lasers(scene, 3, new Geometry("Sphere", "LightMaterial"), 6, "cLaser")
lasers(scene, 16, new Environment(ENV.GAGA.SECOND_AURORA.ID, "Regex"), 2, "aurora", [0.0025, 0.02, 0.012], [0, 0.6, 0.05])
scene.animate([
    ["models/super", 0],
    ["models/hangher", 65],
    ["models/hangar", 100],
    [[], 124],

    ["models/line", 132],
    ["models/tri", 140],
    ["models/hex", 148],

    ["models/super", 156],
    ["models/takeoff", 163, 17],
    ["models/takeoffShip", 184],

    [[], 193.5],
    ["models/drop1", 195, 16],
    ["models/drop2", 212, 16],
    ["models/drop3", 228, 16],
    ["models/drop4", 244, 16],

    ["models/super", 258],
    ["models/network", 263, 12],
    [[], 275],
    ["models/drop2", 286],
    ["models/cubeComplex", 292, 16],
    ["models/nolimits", 308],
    ["models/nolimits2", 316, 4],
    [[], 321],
    ["models/sec5", 324, 96],

    ["models/bridge", 420],

    [[], 452],
    ["models/ship", 468],
    ["models/shipAni", 484, 2],

    ["models/space", 486],
    ["models/cover", 518],

    ["models/drop1", 548, 16],
    ["models/drop2", 564, 16],
    ["models/drop3", 580, 16],
    ["models/drop4", 596, 16],
    [[], 612],

], x => {
    sceneTracks.push(x.track.value.toString())
});
new CustomEvent().assignTrackParent(sceneTracks, "MainSceneTrack", true).push();

animateTrack(263, 12, "MainSceneTrack", x => {
    x.rotation = spin(1, [2])
    x.position = [[0, 0, 0, 0],[0, 0, -1200, 1]]
})
animateTrack(292, 16, "MainSceneTrack", x => {
    x.position = [[0, 0, -1200, 0],[0, 0, -2400, 1]]
})

animateTrack(321, 16, "MainSceneTrack", x => {
    x.rotation = [0, 0, 0]
    x.position = [0, 0, 0]
})

animateTrack(468, 8, "MainSceneTrack", x => {
    x.scale = [[1, 1, 1, 0], [1, 1, 5, 1]]
})

animateTrack(484, 0, "MainSceneTrack", x => {
    x.scale = [1, 1, 1]
})

animateTrack(486, 32, "MainSceneTrack", x => {
    x.rotation = spin(1, [2])
})


// LETS GO THIS ACTUALLY WORKS YEEEEEES AAAAAA
const tunnelTracks: string[] = [];
const tunnelScene = new ModelScene(new Geometry("Cube", "default"));
materialMaker(tunnelScene, "waterTunnel", "BillieWater", "Cube", [0, 0, 0], true)
tunnelScene.animate([
    [[], 0],
    ["models/lightTunnel", 196, 63],
    [[], 259],
    ["models/lightTunnel", 548, 64],
    [[], 612],
], x => {
    tunnelTracks.push(x.track.value.toString())
})
new CustomEvent().assignTrackParent(tunnelTracks, "TunnelTrack", true).push();

animateTrack(196, 63, "TunnelTrack", x => {
    x.rotation = spin(10, [2])
})
animateTrack(548, 64, "TunnelTrack", x => {
    x.rotation = spin(10, [2])
})


//! Text

const mT = new Text("modusFont");
mT.position = [0, 1.75, 7.5];
mT.rotation = [0, 0, 0];
mT.scale = [0.2, 0.2, 0.2];
mT.letterSpacing = 2.5;

const eT = new Text("modusFont");
eT.position = [0, 1.75, 30];
eT.rotation = [0, 0, 0];
eT.scale = [0.40, 0.40, 0.40];
eT.letterSpacing = 2.5;

const lT = new Text("modusFont");
lT.position = [-15, 3, 40];
lT.rotation = [0, -35, 0];
lT.scale = [0.2, 0.2, 0.2];
lT.letterSpacing = 2.5;

const rT = new Text("modusFont");
rT.position = [15, 3, 40];
rT.rotation = [0, 35, 0];
rT.scale = [0.2, 0.2, 0.2];
rT.letterSpacing = 2.5;

const tP = new CustomEvent(124).animateTrack("TextMaterialTrack", 1)
tP.animate.color = [[1, 1, 1, 1, 0], [1, 1, 1, 1, 0.5], [0, 0, 0, 1, 1]]
tP.push();
tP.time = 125;
tP.push();
tP.time = 128;
tP.push();
tP.time = 128.75;
tP.push();
tP.time = 129.75;
tP.push();
tP.time = 133;
tP.animate.color = [100, 0, 0, 1];
tP.push();
tP.time = 164;
tP.animate.color = [1, 1, 1, 1];
tP.push();

const text = new ModelScene(new Geometry("Cube", "TextMaterial"));
text.animate([
    [[], 0],
    [rT.toObjects("and so it begins"), 65.333],
    [[], 68],
    [lT.toObjects("for the human race"), 72, 0, 0, x => {
        x.animate.position[2] += 20
    }],
    [lT.toObjects("to venture beyond"), 74, 0, 0, x => {
        x.animate.position[2] += 30
    }],
    [[], 76],
    [rT.toObjects("they must conquer"), 79, 0, 0, x => {
        x.animate.position[2] += 45
    }],
    [rT.toObjects("their greatest fears "), 82, 0, 0, x => {
        x.animate.position[2] += 55
    }],
    [[], 85],
    [lT.toObjects("and search"), 87.25, 0, 0, x => {
        x.animate.position[2] += 75
    }],
    [lT.toObjects("for the secrets within"), 92, 0, 0, x => {
        x.animate.position[2] += 90
    }],
    [[], 95],
    [rT.toObjects("and for their quest"), 98.333, 0, 0, x => {
        x.animate.position[2] += 140
    }],
    [rT.toObjects("to be successful"), 102.25, 0, 0, x => {
        x.animate.position[2] += 160
    }],
    [[], 105],
    [lT.toObjects("they shall defy"), 106.5, 0, 0, x => {
        x.animate.position[2] += 185
    }],
    [[], 109],
    [lT.toObjects("the laws of physics"), 111, 0, 0, x => {
        x.animate.position[2] += 210
    }],
    [[], 114],
    [rT.toObjects("and traverse the unknown"), 117, 0, 0, x => {
        x.animate.position[2] += 210
    }],
    [[], 123],
    [mT.toObjects("speeds"), 124],
    [mT.toObjects("faster"), 125],
    [mT.toObjects("than"), 128],
    [mT.toObjects("light"), 128.75],
    [mT.toObjects("itself"), 129.75],
    [[], 131],
    [mT.toObjects("we are"), 157.5],
    [mT.toObjects("controlling"), 158],
    [mT.toObjects("transmission"), 160],
    [[], 162],
    [eT.toObjects("superluminal"), 612],
    ["models/endLogos", 628]
]);


//! Noodle Extensions

// Model to Wall
modelToWall("models/ico", 263, 275, (x) => {
    x.color = [rand(0, 1), 0, rand(1, 2)]
    // x.animate.dissolve = [[0, 0], [0, 0.2], [1, 0.3], [1, 0.8], [0, 1]]
});

modelToWall("models/walltest3", 276, 279, (x) => { // vanishing point
    x.color = [rand(0, 1), 0, rand(1, 2)]
    x.track.add("vpWalls")
});
modelToWall("models/walltest2", 279, 282, (x) => { //hour gallss middle
    x.color = [rand(0, 1), 0, rand(1, 2)]
});
modelToWall("models/walltest", 283, 286, (x) => { //hour gallss
    x.color = [rand(0, 1), 0, rand(1, 2)]
});

modelToWall("models/anothercool", 292, 308, (x) => { // circles
    x.color = [rand(0, 1), 0, rand(1, 2)]
    x.animate.dissolve = [[0, 0], [0, 0.2], [0.1, 0.3], [0.1, 0.9], [0, 1]]
});

animateTrack(277, 0, "vpWalls", x => {
    x.offsetPosition = [0, 0, -100000]
})
animateTrack(278, 0, "vpWalls", x => {
    x.offsetPosition = [0, 0, 0]
})

// Light Tunnel Walls
for (let i = 0; i <= 2000; i++) {
    const rand1 = rand(-100, 100)
    const rand2 = rand(-100, 100)
    const impact = new Wall(196 + rand(0, 64), 1);
    impact.animate.definitePosition = [[rand1, rand2, 3000, 0], [rand1, rand2, rand(-1000, -5000), 1]]
    impact.scale = [0.5, 0.5, 200]
    impact.animate.scale = [1, 1, 1]
    impact.animate.color = [rand(0.5, 1), 0, rand(0.5, 2), 10]
    impact.animate.dissolve = [[0, 0], [1, 0.05], [1, 0.95], [0, 1]]
    impact.interactable = false;
    impact.track.value = "SpeedyWallsTrack"
    impact.push(true);
}
for (let i = 0; i <= 2000; i++) {
    const rand1 = rand(-100, 100)
    const rand2 = rand(-100, 100)
    const impact = new Wall(548 + rand(0, 64), 1);
    impact.animate.definitePosition = [[rand1, rand2, 3000, 0], [rand1, rand2, rand(-1000, -5000), 1]]
    impact.scale = [0.5, 0.5, 200]
    impact.animate.scale = [1, 1, 1]
    impact.animate.color = [...HSVtoRGB(rand(0, 1), 1, 1), 10]
    impact.animate.dissolve = [[0, 0], [1, 0.05], [1, 0.95], [0, 1]]
    impact.interactable = false;
    impact.track.value = "SpeedyWallsTrack"
    impact.push(true);
}

for (let i = 0; i <= 1000; i++) {
    const rand1 = rand(-50, 50)
    const rand2 = rand(-50, 50)
    const impact = new Wall(486 + rand(0, 32), 1);
    impact.animate.definitePosition = [[rand1, rand2, 3000, 0], [rand1, rand2, rand(-1000, -5000), 1]]
    impact.scale = [0.1, 0.1, 200]
    impact.animate.scale = [1, 1, 1]
    impact.animate.color = [1, 1, 1, 10]
    impact.animate.dissolve = [[0, 0], [1, 0.05], [1, 0.95], [0, 1]]
    impact.interactable = false;
    impact.track.value = "SpeedyWallsTrack"
    impact.push(true);
}

for (let i = 0; i <= 1000; i++) {
    const rand1 = rand(-50, 50)
    const rand2 = rand(0, 100)
    const impact = new Wall(518 + rand(0, 32), 1);
    impact.animate.definitePosition = [[3000, rand1, rand2, 0], [rand(-1000, -5000), rand1, rand2, 1]]
    impact.scale = [200, 0.1, 0.1]
    impact.animate.scale = [1, 1, 1]
    impact.animate.color = [1, 1, 1, 10]
    impact.animate.dissolve = [[0, 0], [1, 0.05], [1, 0.95], [0, 1]]
    impact.interactable = false;
    impact.track.value = "SpeedyWallsTrack"
    impact.push(true);
}

const speedy = new CustomEvent(0).animateTrack("SpeedyWallsTrack");
speedy.animate.dissolve = [0]
speedy.push();
function speedThing(time: number) {
    speedy.time = time; 
    speedy.animate.dissolve = [1]
    speedy.push();
    speedy.time = time + 3;
    speedy.animate.dissolve = [0]
    speedy.push();
}
speedThing(196)
speedThing(200)
speedy.time = 204;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 207.5;
speedy.animate.dissolve = [0]
speedy.push();
speedThing(212)
speedThing(216)
speedy.time = 220;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 224;
speedy.animate.dissolve = [0]
speedy.push();
speedThing(228)
speedThing(232)
speedy.time = 236;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 239.5;
speedy.animate.dissolve = [0]
speedy.push();
speedThing(244)
speedThing(248)
speedy.time = 252;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 256;
speedy.animate.dissolve = [0]
speedy.push();


speedy.time = 486;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 498;
speedy.animate.dissolve = [0]
speedy.push();
speedy.time = 502;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 506;
speedy.animate.dissolve = [0]
speedy.push();
speedy.time = 511;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 516;
speedy.animate.dissolve = [0]
speedy.push();

speedy.time = 518;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 519.5;
speedy.animate.dissolve = [0]
speedy.push();
speedy.time = 520;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 527.5;
speedy.animate.dissolve = [0]
speedy.push();
speedy.time = 528;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 530;
speedy.animate.dissolve = [0]
speedy.push();
speedy.time = 532;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 534;
speedy.animate.dissolve = [0]
speedy.push();
speedy.time = 536;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 538;
speedy.animate.dissolve = [0]
speedy.push();
speedy.time = 540;
speedy.duration = 4;
speedy.animate.dissolve = [[1, 0], [0, 1]]
speedy.push();

speedy.duration = 0;
speedy.time = 556;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 559.5;
speedy.animate.dissolve = [0]
speedy.push();
speedThing(564)
speedThing(568)
speedy.time = 572;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 576;
speedy.animate.dissolve = [0]
speedy.push();
speedThing(580)
speedThing(584)
speedy.time = 588;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 591.5;
speedy.animate.dissolve = [0]
speedy.push();
speedThing(596)
speedThing(600)
speedy.time = 604;
speedy.animate.dissolve = [1]
speedy.push();
speedy.time = 610;
speedy.animate.dissolve = [0]
speedy.push();


// Drop 1 Zoom Walls
function shapeZoom(time: number, sides: number, rotation: number) {
    for (let repeat = 1; repeat <= sides + 1; repeat++) {
        const radius = 20;
        const xPos = 0;
        const yPos = 2;

        const LMAO = repeat - 1
        const angles = Math.PI * 2 / sides
        const rot = 360 / sides * repeat
        const radians = angles * LMAO
        const width = 2 * radius * Math.tan(Math.PI / sides)
        const height = 2
        const sx = xPos + Math.cos(radians) * radius - width / 2
        const sy = yPos + Math.sin(radians) * radius - height / 2

        const shape = new Wall(time + 0.25)
        shape.localRotation = [0, 0, rot]
        shape.position = [sx, sy]
        shape.interactable = false;
        shape.duration = 0.5;
        shape.scale = [width, 1, 10]
        shape.rotation = [0, rotation, rotation]
        shape.animate.definitePosition = [[0, 0, 200, 0.25], [0, 0, -100, 1]]
        shape.animate.color = [[1, 1, 1, 1, 0], [rand(0, 1), 0, rand(1, 2), 0, 1]]
        shape.NJS = 50;
        shape.animate.dissolve = [[0, 0], [1, 0.25, "easeStep"]]
        shape.track.value = "shapeZoomTrack"
        shape.push();
        shape.time = time + 0.26
        shape.animate.dissolve = [[0, 0], [0.9, 0.25, "easeStep"]]
        shape.push();
        shape.time = time + 0.27
        shape.animate.dissolve = [[0, 0], [0.8, 0.25, "easeStep"]]
        shape.push();
    }
}

shapeZoom(263, 4, 0);
shapeZoom(263.75, 4, 20,);
shapeZoom(264.5, 4, 0);
shapeZoom(265.25, 4, -20);

shapeZoom(267, 4, 20);
shapeZoom(267.75, 4, 0);
shapeZoom(268.5, 4, -20);
shapeZoom(269.25, 4, 0);

shapeZoom(279, 4, 0);
shapeZoom(279.75, 4, 20);
shapeZoom(280.5, 4, 0);
shapeZoom(281.25, 4, -20);

shapeZoom(283, 4, 20);
shapeZoom(283.75, 4, 0);
shapeZoom(284.5, 4, -20);
shapeZoom(285.25, 4, 0);

shapeZoom(308, 8, 0);
shapeZoom(308.75, 8, 0);
shapeZoom(309.5, 8, 0);
shapeZoom(310.25, 8, 0);

shapeZoom(312, 8, 0);
shapeZoom(312.75, 8, 0);
shapeZoom(313.5, 8, 0);
shapeZoom(314.25, 8, 0);

// Buildup 2 Walls
const buildup2WallTracks = []
for (let i = 0; i <= 500; i++) {
    const rand1 = rand(-1000, 1000)
    const rand2 = rand(-1000, 1000)
    const rand3 = rand(2000, -500)
    const spaceThings = new Wall(452 + rand(0, 14), 32);
    spaceThings.animate.definitePosition = [[rand1, rand2, 3000, 0], [rand1, rand2, rand3, 0.01], [rand1, rand2, rand3 - 100, 1]]
    spaceThings.scale = [0.5, 0.5, 750]
    spaceThings.animate.scale = [[5, 5, 1, 0], [5, 5, 5, 1, "easeInExpo"]]
    spaceThings.animate.dissolve = [[0, 0], [1, 0.001]]
    spaceThings.interactable = false;
    spaceThings.track.value = `TheUnknownWalls${i}`
    buildup2WallTracks.push(`TheUnknownWalls${i}`)
    spaceThings.push();
}

new CustomEvent().assignTrackParent(buildup2WallTracks, "TheUnknownWalls").push()

const unknownWallTrack = new CustomEvent(440).animateTrack(buildup2WallTracks, 0);
unknownWallTrack.animate.dissolve = [0]
unknownWallTrack.push();
unknownWallTrack.time = 452
unknownWallTrack.animate.dissolve = [[0, 0], [1, 0.0001]]
unknownWallTrack.push();
unknownWallTrack.time = 468
unknownWallTrack.duration = 19
unknownWallTrack.animate.scale = [[1, 1, 1, 0], [1, 1, 50, 1, "easeInCirc"]]
unknownWallTrack.push();
unknownWallTrack.time = 486
unknownWallTrack.animate.dissolve = [[1, 0], [0, 0.0001]]
unknownWallTrack.push();

animateTrack(451, 0, buildup2WallTracks, x => {
    x.color = [0, 0, 100, 10]
})
animateTrack(466, 0, buildup2WallTracks, x => {
    x.color = [0, 0, 0, 0]
})
animateTrack(468, 0, buildup2WallTracks, x => {
    x.color = [0, 0, 100, 10]
})
animateTrack(476, 7, buildup2WallTracks, x => {
    x.color = [[0, 0, 0, 0, 0],[0, 0, 100, 10, 1, "easeInCubic"]]
})
animateTrack(483, 0, buildup2WallTracks, x => {
    x.color = [0, 0, 0, 0]
})
animateTrack(484, 0, buildup2WallTracks, x => {
    x.color = [10, 10, 10, 10]
})
animateTrack(485.75, 0, buildup2WallTracks, x => {
    x.color = [0, 0, 0, 0]
})

// End Explode
const explosion = new ParticleSystem(614, 0.02, 150);
explosion.generator.name = "ExplosionPS";
explosion.generator.shape = "Sphere";
explosion.particle.distance = 100;
explosion.particle.life = 4;
explosion.particle.easing = "easeOutExpo";
explosion.particle.animate.scale = [[0.1, 0.1, 0.1, 0], [30, 30, 30, 1, "easeInQuart"]];
explosion.particle.animate.color = [[10, 10, 10, 10, 0], [10, 10, 10, 10, 0.2]];
explosion.particle.animate.dissolve = [[1, 0], [0, 1]];
explosion.generator.position = [0.6, 2, 20]
explosion.push(x => {
    x.animate.localRotation = [[rand(0, 180), rand(0, 180), rand(0, 180), 0], [rand(0, 180), rand(0, 180), rand(0, 180), 1]]
});

//! Notemods

// Note Flickers
function noteFlicker(time: number, duration: number) {
    animateTrack(time, duration, ["NoteTrack", "ArcTrack", "ChainTrack"], x => {
        x.dissolve = [[1, 0], [0, 0.5, "easeStep"], [1, 1, "easeStep"]];
        x.dissolveArrow = [[1, 0], [0, 0.5, "easeStep"], [1, 1, "easeStep"]];
    })
}
noteFlicker(99, 0.5)
noteFlicker(339, 0.5)

// Note Dissolves
function noteDissolve(time: number, duration: number) {
    animateTrack(time, duration, ["NoteTrack", "ArcTrack", "ChainTrack"], x => {
        x.dissolve = [[0.05, 0], [1, 1, "easeStep"]];
    })
}
noteDissolve(466, 2)

// Intro Notes
notesBetween(0, 59, x => {
    x.offset = 12
    x.animate.dissolve = [[0, 0], [1, 0.45, "easeInExpo"]]
    x.animate.dissolveArrow = [[0,0], [1,0.45, "easeInExpo"]]
    x.animate.localRotation = [[rand(-45,45),rand(-45,45),rand(-45,45),0],[rand(-45,45),rand(-45,45),rand(-45,45),0.375, "easeInOutCubic"], [0,0,0,0.5, "easeInOutCubic"]]
    x.animate.position = [[rand(-2,2),rand(-3,3),0,0.35], [0,0,0,0.5, "easeInOutCubic"]]
    x.NJS = 14
    const ripple = new Note(x.time + 1, x.type, x.direction, x.x, x.y)
    ripple.animate.dissolve = [0]
    ripple.animate.dissolveArrow = [[0, 0], [0.2, 0.5]]
    ripple.noteGravity = false
    ripple.interactable = false
    ripple.noteLook = false;
    ripple.NJS = 14
    ripple.push(true)
})
for (let i = 0; i <= 24; i++) {
    animateTrack(4 + i * 2, 1, "NoteTrack", x => {
        x.scale = [[1.2, 1.2, 1.2, 0], [1, 1, 1, 1, "easeInCirc"]]
    })
}

notesBetween(0, SONG_LENGTH, x => {
    if (x.track.has("fakeLMAO")) {
        x.interactable = false
        x.push(true)
        x.animate.position = [10000000, 100000, 100000]
    }
})

// noteText fade
notesBetween(131, 136, x => {
    x.track.add("noteFadeIn1")
})

animateTrack(0, 0, "noteFadeIn1", x => {
    x.dissolve = [0]
})
animateTrack(131, 0.5, "noteFadeIn1", x => {
    x.dissolve = [[0, 0], [1, 1]]
})

notesBetween(161, 167, x => {
    x.track.add("noteFadeIn2")
})

animateTrack(0, 0, "noteFadeIn2", x => {
    x.dissolve = [0]
})
animateTrack(161.5, 0.5, "noteFadeIn2", x => {
    x.dissolve = [[0, 0], [1, 1]]
})

// Buildup Rotate Notes
animateTrack(188, 4.5, "NoteTrack", x => {
    x.offsetRotation = [[0, 0, 0, 0], [-32, 0, 0, 0.95, "easeInOutSine"], [0, 0, 0, 1, "easeInOutSine"]]
    x.offsetPosition = [[0, 0, 0, 0], [0, -0.2, 0, 0.95, "easeInOutSine"], [0, 0, 0, 1, "easeInOutSine"]]
})

// Drop Note Glitch 1
{
    const n = new Note(260);
    n.noteLook = false;
    n.noteGravity = false;
    n.interactable = false;
    n.animate.definitePosition = [2, 2, 20];
    n.animate.scale = [10, 10, 10];
    n.animate.dissolve = [[0, 0], [0.5, 0.5, "easeStep"], [0, 0.666, "easeStep"]]
    n.animate.dissolveArrow = [0]
    n.animate.localRotation = spin(3, [0, 2])
    n.color = [1, 1, 1]
    n.push(true);
}

// Bridge Pulsing Notes
for (let i = 0; i <= 14; i++) {
    animateTrack(325 + i * 2, 1, ["NoteTrack", "ArcTrack", "ChainTrack"], x => {
        x.scale = [[1.2, 1.2, 1.2, 0], [1, 1, 1, 1]]
    })
}

// Bridge Memory Notes
function memoryRead(startTime: number, endTime: number) {
    notesBetween(startTime + 4, endTime + 4, note => {
        note.time -= 4;
        note.noteLook = false;
        note.noteGravity = false;
        note.interactable = false;
        note.animate.definitePosition = [(0 + note.x * 3) - 4, (0 + note.y * 3) - 2, 20];
        note.animate.scale = [[5, 5, 5, 0.5], [4, 4, 4, 0.666, "easeOutCubic"]];
        note.animate.dissolve = [[0, 0], [1, 0.5, "easeStep"], [0, 0.666, "easeStep"]]
        note.animate.dissolveArrow = [[0, 0], [1, 0.5, "easeStep"], [0, 0.666, "easeStep"]]
        note.push(true);
        note.time += 4;
        note.animate.dissolveArrow = [0]
        note.noteGravity = false;
        note.noteLook = false;
        note.interactable = true;
        note.animate.definitePosition = []
        note.animate.scale = []
        note.animate.dissolve = []
    })
}
memoryRead(356, 359);
memoryRead(372, 375);
memoryRead(388, 391);
memoryRead(404, 407);

// Notes Fading
notesBetween(412, 414.5, note => {
    note.track.add("Note1")
    note.time += 3
    note.interactable = false
    note.push(true)
    note.time -= 3
    note.interactable = true
})
animateTrack(412, 6, "Note1", x => {
    x.dissolve = [[1, 0], [0.1, 0.999], [1, 1]]
    x.scale = [[1, 1, 1, 0], [0, 0, 0, 0.999], [1, 1, 1, 1]]
})

// NJS Stuff

notesBetween(196, 256, x => {
    x.NJS = 17
})
bombsBetween(196, 256, x => {
    x.NJS = 17
})
arcsBetween(196, 256, x => {
    x.NJS = 17
})
chainsBetween(196, 256, x => {
    x.NJS = 17
})

notesBetween(486, 612, x => {
    x.NJS = 17
})
bombsBetween(486, 612, x => {
    x.NJS = 17
})
arcsBetween(486, 612, x => {
    x.NJS = 17
})
chainsBetween(486, 612, x => {
    x.NJS = 17
})


//! Light Remapper

new LightRemapper().type(0).addToEnd(200).multiplyColor(20, 10).run()
new LightRemapper().type(1).addToEnd(100).remapEnd([[100, 10]]).run()
new LightRemapper().type(2).addToEnd(100).multiplyColor(1,2.5).run()
new LightRemapper().type(3).multiplyColor(25, 1).run()

new LightRemapper().type(6).addToEnd(100).run()
new LightRemapper().type(10).addToEnd(100).multiplyColor(5, 0.01).run()
new LightRemapper().type(11).addToEnd(100).run()


//! Export

info.environment = "GagaEnvironment"

const otherSettings = [
    "_countersPlus._mainEnabled",
    "_uiTweaks._multiplierEnabled",
    "_uiTweaks._comboEnabled",
    "_uiTweaks._energyEnabled",
    "_uiTweaks._positionEnabled",
    "_uiTweaks._progressEnabled"
]

map.require("Noodle Extensions", true)
map.require("Chroma", true)
map.suggest("Chroma", false)
map.rawSettings = PRESET.MODCHART_SETTINGS
map.settings.mirrorQuality = "HIGH"
map.settings.lightsExPlus = "All"
map.settings.lights = "All"
map.settings.smoke = true
map.settings.noHud = true
map.settings.hideSpawnEffect = true;
map.colorLeft = [154 / 255, 65 / 255, 254 / 255]
map.colorRight = [33 / 255, 55 / 255, 211 / 255]
for (let i = 0; i <= otherSettings.length - 1; i++) {
    jsonSet(map.rawSettings, otherSettings[i], false);
}
map.save()
if (final) exportZip(["ExpertPlusNoArrows"])