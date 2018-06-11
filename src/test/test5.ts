import {
    SyncEvent
} from "../lib/index";

let evt = new SyncEvent<string>();


setTimeout(() => {
    evt.post("foo");
    setImmediate( ()=> evt.post("bar"));
}, 100);

let success= false;

(async () => {
    
    console.assert(await evt.waitFor() === "foo");

    console.assert(await evt.waitFor() === "bar");

    success= true;

})();


setTimeout(()=>{

    console.assert(success);

    console.log("PASS".green);

}, 2000);




