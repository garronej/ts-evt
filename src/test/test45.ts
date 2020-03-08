

import { EvtError } from "../lib/index";
import { race } from "../lib/util/race";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";

const { mustReject } = getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": false });

const error = new Error("my error");


const prMessage: Promise<string> = new Promise((...[, reject]) => reject(error));

mustReject({
    "promise": race([
        prMessage,
        new Promise<string>(resolve => setTimeout(() => resolve("OK"), 100))
    ]).attachOnce(
        () => assert(false),
        () => assert(false)
    ),
    "expectedRejectedValue": new EvtError.RacePromiseRejection(error, 0, prMessage),
    "delay": 0
});

setTimeout(()=> console.log("PASS".green), 200);
