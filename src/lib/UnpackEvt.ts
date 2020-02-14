
//NOTE: Do not export directly so we can support typescript before 2.8.

type EvtBaseProtected<T> = import("./EvtBaseProtected").EvtBaseProtected<T>;

/** https://garronej.github.io/ts-evt/#unpackevttypeof-evt */
export type UnpackEvt<T extends EvtBaseProtected<any>> = T extends EvtBaseProtected<infer U> ? U : never;
