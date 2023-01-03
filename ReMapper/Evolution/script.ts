import { CinemaScreen, Difficulty } from "https://deno.land/x/remapper@3.1.1/src/mod.ts"

const map = new Difficulty("ExpertPlusStandard");
map.suggest("Cinema");
map.save();

const screen = new CinemaScreen("YoutubeID", "95m45ozwwZw", "Evolution - Creo");
screen.offset = -1417;
screen.push();