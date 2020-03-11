
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety";

const obj1: never[] = [];
const obj2 = {};
const obj3 = () => { };

for (const obj of [obj1, obj2, obj3] as const) {

    assert(Evt.getCtx(obj) === Evt.getCtx(obj));

}

assert(Evt.getCtx(obj1) !== Evt.getCtx(obj2));
assert(Evt.getCtx(obj1) !== Evt.getCtx(obj3));
assert(Evt.getCtx(obj2) !== Evt.getCtx(obj3));

console.log("PASS".green);
