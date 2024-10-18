import clockInit from "./lib/clock";
import searchInit from "./lib/search";

clockInit();
searchInit();

console.log("Hello world!");
console.log(`Mode: ${ process.env["MODE"] }`)
