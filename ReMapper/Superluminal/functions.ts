import { 
    jsonSet,
    Difficulty, 
    Environment, 
    PRESET,
    LOOKUP,
    Regex,
    baseEnvironmentTrack,
    CustomEvent,
    CustomEventInternals,
    AnimationInternals,
    Geometry,
    Vec3,
    TrackValue,
    KeyframesVec3
} from "https://deno.land/x/remapper@3.1.2/src/mod.ts"

export function softRemove(lookup: LOOKUP,id: Array<string>,){
    id.forEach((env) =>{
        const yeet = new Environment(env, lookup);
        yeet.position = [-69420,-69420,-69420];
        yeet.push();
    })
}

export function hardRemove(lookup: LOOKUP,id: Array<string>,){
    id.forEach((env) =>{
        const yeet = new Environment(env, lookup);
        yeet.active = false;
        yeet.push();
    })
}

export function animateSmoke(time: number, duration: number, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const event = new CustomEvent(time).animateTrack("SmokeTrack", duration);
    anim(event.animate);
    event.push(false);
} 

export function animateRain(time: number, duration: number, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const rain = new CustomEvent(time).animateTrack("RainTrack", duration);
    anim(rain.animate);
    rain.push();
}

export function animateMirror(time: number, duration: number, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const event = new CustomEvent(time).animateTrack("MirrorTrack", duration);
    anim(event.animate);
    event.push(false);
} 

export function lasers(modelScenename: any, lasers: number, environment: Environment | Geometry, type: number, name: string, scale?: Vec3, anchor?: Vec3) {
    const laserTracks: string[] = [];
    const laserEnv = environment;
    laserEnv.lightID = 101;
    laserEnv.lightType = type;
    laserEnv.track.value = "LaserLightTrack"
    for (let i = 1; i <= lasers; i++) laserTracks.push(name + `${i}`);
    modelScenename.addPrimaryGroups( laserTracks, laserEnv, scale, anchor);
}

export function animateFog(time: number, duration: number, anim: (x: CustomEventInternals.AnimateComponent) => void) {
    const fog = new CustomEvent(time).animateComponent("FogTrack", duration);
    anim(fog);
    fog.push();
} 

export function animatePlayer(time: number, duration: number, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const event = new CustomEvent(time).animateTrack("PlayerTrack", duration);
    anim(event.animate);
    event.push(false);
} 

export function animateTrack(time: number, duration: number, track: TrackValue, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const event = new CustomEvent(time).animateTrack(track, duration);
    anim(event.animate);
    event.push(false);
}

export function assignPathAnimation(time: number, duration: number, track: TrackValue, anim: (x: AnimationInternals.AbstractAnimation) => void) {
    const event = new CustomEvent(time).assignPathAnimation(track, duration);
    anim(event.animate);
    event.push(false);
}

export function directionalLightAnimation(number: number, time:number, duration:number, rotation: KeyframesVec3) {
    const dirLight = new CustomEvent(time).animateTrack(`DirectionalLight${number}Track`, duration)
    dirLight.animate.rotation = rotation;
    dirLight.push();
}

export function spin(spins: number, axis: number[]) {
    const spinArray: KeyframesVec3 = [];
    const getTime = (value: number, index: number) => (value / spins) + (index / spins)
    let x = [0,0,0]
    let y = [0,0,0]
    let z = [0,0,0]
    if (axis.includes(0)) { x = [0,180,360] }
    if (axis.includes(1)) { y = [0,180,360] }
    if (axis.includes(2)) { z = [0,180,360] }
    for (let i = 0; i < spins; i++) {
        spinArray.push([x[0],y[0],z[0],getTime(0,i)]);
        spinArray.push([x[1],y[1],z[1],getTime(0.5,i)]);
        spinArray.push([x[2],y[2],z[2],getTime(1,i)]);
    }
    return spinArray
}

export function bgLasers(distance: number) {
    const bgLarers = new Geometry("Cube", "LightMaterial");
    for (let i = 0; i <= 3; i++) {
        let posZ = distance;
        let posX = 0;
        let invert = 1;
        let rotation = 0;
        if (i == 0 || i == 1) { posX = 0; posZ = distance; }
        if (i == 2 || i == 3) { posX = distance; posZ = 0; }
        if (i == 1 || i == 3) { invert = -1; }
        if (i == 3 || i == 2) { rotation = 90; }
        if (i > 0) bgLarers.duplicate = 1;
        bgLarers.position = [posX * invert, 1.5, posZ * invert]
        bgLarers.scale = [0.001, distance * 2.5, 0.001]
        bgLarers.rotation = [0, rotation, 90]
        bgLarers.lightID = 101 + i
        bgLarers.lightType = 10
        bgLarers.track.value = "BackgroundLasersTrack"
        bgLarers.push();
    }
}