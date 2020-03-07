import {
    VoidEvt
} from "../lib/index";

let evt = new VoidEvt();

let evtProxy= new VoidEvt();

evt.attach(()=>{

    if( !evtProxy.getEvtAttach().postCount )
        evtProxy.getEvtAttach().attachOnce(()=> evtProxy.post());
    else
        evtProxy.post();

});

//@ts-ignore: unused i
for( let i in [ ".", ".", ".", ".", "." ])
    evt.post();

let count= 0;

evtProxy.attach(() => {

    count++;

});


//@ts-ignore: unused i
for( let i in [ "f", "g", "h" ])
    evt.post();

console.assert(count === 8);

console.log("PASS".green);