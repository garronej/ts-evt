"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var evtText = new lib_1.Evt();
evtText.$attach(function (str) { return [str, { "DETACH": lib_1.Evt.newCtx() }]; }, function (str) { return str.toLowerCase(); });
evtText.$attach(function (str) { return str.startsWith("a") ? [str] : { "DETACH": lib_1.Evt.newCtx() }; }, function (str) { return str.toLowerCase(); });
evtText.$attach(function (str) { return [str, { "DETACH": lib_1.Evt.newCtx(), "err": new Error() }]; }, function (str) { return str.toLowerCase(); });
evtText.$attach(function (str) { return str.startsWith("a") ? [str] : { "DETACH": lib_1.Evt.newCtx(), "err": new Error() }; }, function (str) { return str.toLowerCase(); });
evtText.$attach(function (str) { return [str, { "DETACH": lib_1.Evt.newCtx(), "res": true }]; }, function (str) { return str.toLowerCase(); });
evtText.$attach(function (str) { return [str, { "DETACH": lib_1.Evt.newCtx(), "err": new Error() }]; }, function (str) { return str.toLowerCase(); });
evtText.$attach(function (str) { return str.startsWith("a") ? [str] : { "DETACH": lib_1.Evt.newCtx(), "res": true }; }, function (str) { return str.toLowerCase(); });
evtText.$attach(function (str) { return str.startsWith("a") ? [str] : { "DETACH": lib_1.Evt.newCtx(), "err": new Error() }; }, function (str) { return str.toLowerCase(); });
var aNumber = 3;
aNumber;
var anOtherNumber = 4;
anOtherNumber;
var aVoid = null;
aVoid;
var anOtherVoid = null;
anOtherVoid;
console.log("PASS");
//# sourceMappingURL=test70.js.map