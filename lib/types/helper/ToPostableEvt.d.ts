import type { EvtLike } from "./EvtLike";
import type { StatefulPostable, Postable, NonPostableEvt, StatefulReadonlyEvt, StatefulEvt, Evt } from "../interfaces";
declare type ToPostableEvtBase<E extends EvtLike<any>> = E extends StatefulReadonlyEvt<infer U> ? StatefulEvt<U> : E extends NonPostableEvt<infer U> ? Evt<U> : E extends {
    state: infer U;
} ? E & StatefulPostable<U> : E & Postable<E>;
declare type ToPostableEvtRecord<R extends {
    [key: string]: any;
}> = {
    [P in keyof R]: R[P] extends EvtLike<any> ? ToPostableEvtBase<R[P]> : R[P];
};
/** https://docs.evt.land/api/helpertypes#topostableevt-less-than-e-greater-than */
export declare type ToPostableEvt<E extends ({
    [key: string]: any;
} | EvtLike<any>)> = E extends EvtLike<any> ? ToPostableEvtBase<E> : ToPostableEvtRecord<E>;
export {};