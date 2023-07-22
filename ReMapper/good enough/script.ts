import { 
    AnimatedObjectInput, 
    baseEnvironmentTrack, 
    CustomEvent, 
    CustomEventInternals, 
    Difficulty, 
    Environment, 
    exportZip, 
    Geometry, 
    jsonSet, 
    LightRemapper, 
    LOOKUP, 
    ModelScene, 
    PRESET,
    Text
} from "file:///G:/GitHub/ReMapperTutorials/ReMapperNasafrasa/src/mod.ts"

const map = new Difficulty("ExpertPlusLawless", "ExpertPlusStandard");
let env: Environment;


// FOG
baseEnvironmentTrack("FogTrack");
function fogAnimation(time: number, duration: number, anim: (x: CustomEventInternals.AnimateComponent) => void) {
    const fog = new CustomEvent(time).animateComponent("FogTrack", duration);
    anim(fog);
    fog.push();
}
fogAnimation(0, 0, x => {
    x.fog.attenuation = [0.005],
    x.fog.height = [100],
    x.fog.startY = [-185],
    x.lightMultiplier.bloomFogIntensityMultiplier = [10],
    x.lightMultiplier.colorAlphaMultiplier = [10]
});
fogAnimation(98, 0, x => {
    x.fog.attenuation = [0.0005]
});
fogAnimation(155, 5.5, x => {
    x.fog.attenuation = [[0.0005, 0], [-0.0005, 1]]
});


// BASE ENVIRONMENT
function hardRemove(lookup: LOOKUP, id: Array<string>,) {
    id.forEach((env) => {
        const yeet = new Environment(env, lookup);
        yeet.active = false;
        yeet.push();
    })
}
hardRemove("Contains", ["Castle", "Fence", "Grave", "TombStone", "8]Ground", "Bats"]);

env = new Environment("Moon", "EndsWith")
env.position = [0, 0, 44]
env.scale = [30, 5, 1]
env.push();

env = new Environment("Crow", "Contains")
env.position = [0, -2, 0]
env.scale = [20, 5, 20]
env.push();

env = new Environment("GroundStone", "Contains")
env.scale = [4, 2, 1.5]
env.push();

env = new Environment("Smoke", "Contains")
env.position = [0, 2, 0]
env.scale = [2, 0.5, 2]
env.push();

env = new Environment("BaseL", "EndsWith")
env.position = [0, 4, 60]
env.scale = [-1, 0.3, 1000]
env.push();

env = new Environment("BaseR", "EndsWith")
env.position = [0, 4, 60]
env.scale = [1, -0.3, 1000]
env.push();

env = new Environment("Hand", "Contains")
env.position = [0, -10, 0]
env.scale = [20, 4, 20]
env.push();
env.duplicate = 1;
env.position = [0, 22, 0]
env.scale = [20, 4, 20]
env.rotation = [180, 0, 0]
env.push();

env = new Environment("Tree", "Contains")
env.duplicate = 1;
env.scale = [1, 1, 1]
env.localPosition = [10, -5, 10]
env.rotation = [0, 180 + 45, 0]
env.push();
env.localPosition = [-10, -5, 10]
env.rotation = [0, 180 - 45, 0]
env.push();
env.localPosition = [10, -2.5, 0]
env.rotation = [0, 180 + 90, 0]
env.push();
env.localPosition = [-10, -2.5, 0]
env.rotation = [0, 180 - 90, 0]
env.push();


// BLENDER ENVIRONMENT
map.geoMaterials["DefaultMaterial"] = {
    shader: "BTSPillar",
    color: [0, 0, 0]
}
new ModelScene(new Geometry("Cube", "DefaultMaterial")).static("main");


// LYRICS
map.geoMaterials["TextMaterial"] = {
    shader: "BTSPillar",
    color: [1, 1, 1],
    shaderKeywords: []
}

// All credits to Swifter for this font!
const text = new Text("font");
text.position = [0, 0.25, 4];
text.rotation = [90, 0, 0];
text.scale = [0.05, 0.1, 0.05];
text.letterSpacing = 1.5;

// we dont talk about this
const lyrics: [AnimatedObjectInput, number, number?, number?, ((event: CustomEventInternals.AnimateTrack, objects: number) => void)?][] = [
    [[], 0],
    [text.toObjects("i dont focus"), 35],
    [text.toObjects("when i need to"), 37],
    [text.toObjects("i dont listen"), 39],
    [text.toObjects("and it leads to"), 41],
    [text.toObjects("everyone just"), 43],
    [text.toObjects("getting mad at"), 45],
    [text.toObjects("me again"), 47],
    [[], 49],
    [text.toObjects("talk to much when"), 51],
    [text.toObjects("i dont want to"), 53],
    [text.toObjects("look for something"), 55],
    [text.toObjects("to respond to"), 57],
    [text.toObjects("hope i never"), 59],
    [text.toObjects("see ur face"), 61],
    [text.toObjects("again"), 63],
    [[], 66],
    [text.toObjects("dont talk to me"), 67.5],
    [text.toObjects("just shut ur mouth"), 69.5],
    [[], 72.5],
    [text.toObjects("it feels like no one"), 74.5],
    [text.toObjects("ever wants me around"), 77],
    [[], 82],
    [text.toObjects("just hold my breath"), 83.5],
    [text.toObjects("until i pass out"), 85.5],
    [[], 90],
    [text.toObjects("n ill never know"), 90.5],
    [text.toObjects("what u think"), 92.5],
    [text.toObjects("but i just wanna know"), 94.5],
    [text.toObjects("am i"), 97],
    [[], 98],
    [text.toObjects("good"), 99],
    [text.toObjects("enough"), 99.5],
    [text.toObjects("good"), 100.5],
    [text.toObjects("enough"), 101],
    [text.toObjects("good"), 102],
    [text.toObjects("enough"), 102.5],
    [text.toObjects("good"), 103.5],
    [text.toObjects("enough"), 104],
    [text.toObjects("good"), 105],
    [[], 105.5],
    [text.toObjects("good"), 107],
    [text.toObjects("enough"), 107.5],
    [text.toObjects("good"), 108.5],
    [text.toObjects("enough"), 109],
    [text.toObjects("good"), 110],
    [text.toObjects("enough"), 110.5],
    [text.toObjects("good"), 111.5],
    [text.toObjects("enough"), 112],
    [text.toObjects("good"), 113],
    [text.toObjects("enough"), 113.5],
    [text.toObjects("good"), 115],
    [text.toObjects("enough"), 115.5],
    [text.toObjects("good"), 116.5],
    [text.toObjects("enough"), 117],
    [text.toObjects("good"), 118],
    [text.toObjects("enough"), 118.5],
    [text.toObjects("good"), 119.5],
    [text.toObjects("enough"), 120],
    [text.toObjects("good"), 121],
    [[], 121.5],
    [text.toObjects("good"), 123],
    [text.toObjects("enough"), 123.5],
    [text.toObjects("good"), 124.5],
    [text.toObjects("enough"), 125],
    [text.toObjects("good"), 126],
    [text.toObjects("enough"), 126.5],
    [text.toObjects("good"), 127.5],
    [text.toObjects("enough"), 128],
    [text.toObjects("am i"), 129],
    [[], 130],
    [text.toObjects("good"), 131],
    [text.toObjects("enough"), 131.5],
    [text.toObjects("good"), 132.5],
    [text.toObjects("enough"), 133],
    [text.toObjects("good"), 134],
    [text.toObjects("enough"), 134.5],
    [text.toObjects("good"), 135.5],
    [text.toObjects("enough"), 136],
    [text.toObjects("good"), 137],
    [[], 137.5],
    [text.toObjects("good"), 139],
    [text.toObjects("enough"), 139.5],
    [text.toObjects("good"), 140.5],
    [text.toObjects("enough"), 141],
    [text.toObjects("good"), 142],
    [text.toObjects("enough"), 142.5],
    [text.toObjects("good"), 143.5],
    [text.toObjects("enough"), 144],
    [text.toObjects("good"), 145],
    [text.toObjects("enough"), 145.5],
    [text.toObjects("good"), 147],
    [text.toObjects("enough"), 147.5],
    [text.toObjects("good"), 148.5],
    [text.toObjects("enough"), 149],
    [text.toObjects("good"), 150],
    [text.toObjects("enough"), 150.5],
    [text.toObjects("good"), 151.5],
    [text.toObjects("enough"), 152],
    [text.toObjects("good"), 153],
    [[], 153.5],
    [text.toObjects("good"), 155],
    [text.toObjects("enough"), 155.5],
    [text.toObjects("good"), 156.5],
    [text.toObjects("enough"), 157],
    [[], 158]
]
new ModelScene(new Geometry("Cube", "TextMaterial")).animate(lyrics);


// LIGHTING
new LightRemapper().type(2).multiplyColor(2, 0.05).addProcess(x => {
    x.push()
    x.type = 3
}).run()


// EXPORTING MAP
map.require("Chroma", true)
map.rawSettings = PRESET.CHROMA_SETTINGS;
map.settings.lights = "All";
map.settings.hideSpawnEffect = true;
map.colorRight = [182 / 255, 252 / 255, 251 / 255]
map.colorLeft = [252 / 255, 185 / 255, 234 / 255]
map.wallColor = [1, 1, 1]
map.settings.smoke = true;
map.NJS = 16.5;
jsonSet(map.rawSettings, "_countersPlus._mainEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._multiplierEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._comboEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._energyEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._positionEnabled", false);
jsonSet(map.rawSettings, "_uiTweaks._progressEnabled", false);
map.save();


// ZIP MAP
exportZip(["ExpertPlusLawless"]);