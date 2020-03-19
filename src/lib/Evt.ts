import { EvtCore } from "./EvtCore";
import { Handler } from "./types/Handler";
import { Operator } from "./types/Operator";
import { Ctx } from "./Ctx";
import { invokeOperator } from "./util/invokeOperator";
import { merge } from "./util/merge";
import { from } from "./util/from";
import { parseOverloadParamsFactory } from "./util/parseOverloadParams";
import { getLazyEvtFactory } from "./util/getLazyEvtFactory";
import { getCtxFactory } from "./util/getCtxFactory";
type VoidCtx = import("./Ctx").VoidCtx;

/** https://docs.evt.land/api/evt */
export class Evt<T> extends EvtCore<T> {

    /** 
     * https://docs.evt.land/api/evt/newctx
     * 
     * return a new Ctx instance
     * */
    public static newCtx<T = void>(): T extends void ? VoidCtx : Ctx<T>{
        return new Ctx() as any;
    }

    /** 
     * https://docs.evt.land/api/evt/getctx
     * 
     * Evt.weakCtx(obj) always return the same instance of VoidCtx for a given object.
     * No strong reference to the object is created
     * when the object is no longer referenced it's associated Ctx will be freed from memory.
     */
    public static readonly getCtx = getCtxFactory();

    /** https://docs.evt.land/api/evt/merge */
    public static merge = merge;

    /** https://docs.evt.land/api/evt/from */
    public static from = from;

    /** https://docs.evt.land/api/evt/getevtattachdetach */
    public readonly getEvtAttach: () => Evt<Handler<T, any>>;

    /** https://docs.evt.land/api/evt/getevtattachdetach */
    public readonly getEvtDetach: () => Evt<Handler<T, any>>;

    constructor() {
        super();

        const { getEvt: getEvtAttach, post: postEvtAttach } = getLazyEvtFactory<Handler<T, any>>();
        const { getEvt: getEvtDetach, post: postEvtDetach } = getLazyEvtFactory<Handler<T, any>>();

        this.onHandler = (isAttach, handler) =>
            (isAttach ? postEvtAttach : postEvtDetach)(handler)
            ;

        this.getEvtAttach = getEvtAttach;
        this.getEvtDetach = getEvtDetach;

    }

    /** https://docs.evt.land/api/evt/post */
    public postAsyncOnceHandled(data: T): number | Promise<number> {

        if (this.isHandled(data)) {
            return this.post(data);
        }

        let resolvePr: (postCount: number) => void;
        const pr = new Promise<number>(resolve => resolvePr = resolve);

        this.getEvtAttach().attachOnce(
            ({ op }) => !!invokeOperator(this.getStatelessOp(op), data),
            () => Promise.resolve().then(() => resolvePr(this.post(data)))
        );

        return pr;

    }


    private __parseOverloadParams = parseOverloadParamsFactory<T>();

    /** https://docs.evt.land/api/evt/pipe */
    public pipe(): Evt<T>;

    public pipe<U>(
        op: Operator.fλ<T, U>
    ): Evt<U>;
    public pipe<U extends T>(
        op: (data: T) => data is U
    ): Evt<U>;
    public pipe(
        op: (data: T) => boolean
    ): Evt<T>;

    public pipe(ctx: Ctx): Evt<T>;

    public pipe<U>(
        ctx: Ctx,
        op: Operator.fλ<T, U>
    ): Evt<U>;
    public pipe<U extends T>(
        ctx: Ctx,
        op: (data: T) => data is U
    ): Evt<U>;
    public pipe(
        ctx: Ctx,
        op: (data: T) => boolean
    ): Evt<T>;

    public pipe<B, C>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>
    ): Evt<C>;
    public pipe<B, C extends B>(
        op1: Operator.fλ<T, B>,
        op2: (data: B) => data is C
    ): Evt<C>;
    public pipe<B>(
        op1: Operator.fλ<T, B>,
        op2: (data: B) => boolean
    ): Evt<B>;
    public pipe<B extends T, C>(
        op1: (data: T) => data is B,
        op2: Operator.fλ<B, C>
    ): Evt<B>;
    public pipe<B>(
        op1: (data: T) => boolean,
        op2: Operator.fλ<T, B>
    ): Evt<B>;
    public pipe<B extends T, C extends B>(
        op1: (data: T) => data is B,
        op2: (data: B) => data is C
    ): Evt<C>;
    public pipe<B extends T>(
        op1: (data: T) => data is B,
        op2: (data: B) => boolean
    ): Evt<B>;
    public pipe<B extends T>(
        op1: (data: T) => boolean,
        op2: (data: T) => data is B
    ): Evt<B>;
    public pipe<T>(
        op1: (data: T) => boolean,
        op2: (data: T) => boolean
    ): Evt<T>;


    public pipe<B, C, D>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>
    ): Evt<D>;

    public pipe<B, C, D, E>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>
    ): Evt<E>;

    public pipe<B, C, D, E>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>
    ): Evt<E>;

    public pipe<B, C, D, E, F>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>,
        op5: Operator.fλ<E, F>
    ): Evt<F>;


    public pipe<B, C>(
        op1: Operator<T, B>,
        op2: Operator<B, C>
    ): Evt<C>;

    public pipe<B, C, D>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>
    ): Evt<D>;

    public pipe<B, C, D, E>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>,
        op4: Operator<D, E>
    ): Evt<E>;

    public pipe<B, C, D, E, F>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>,
        op4: Operator<D, E>,
        op5: Operator<E, F>
    ): Evt<F>;

    public pipe(
        ...ops: [
            Operator<T, any>,
            ...Operator<any, any>[]
        ]
    ): Evt<any>;

    public pipe<T>(
        ...ops: [
            Operator<T, any>,
            ...Operator<any, any>[]
        ]
    ): Evt<any>;

    public pipe(...inputs: any[]): Evt<any> {

        const evtDelegate = new Evt<any>();

        //To do if there is special operator pipe should be called recursively.
        this.__attach(
            {
                ...this.__parseOverloadParams(inputs, "pipe"),
                "callback": (transformedData: any) => evtDelegate.post(transformedData)
            }
        );

        return evtDelegate;

    }


    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: Ctx,
        timeout?: number
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        timeout?: number
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor(
        op: (data: T) => boolean,
        ctx: Ctx,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - fλ
     * 
     * timeout?
     */
    public waitFor<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout?: number
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Type guard
     * 
     * timeout?
     */
    public waitFor<Q extends T>(
        op: (data: T) => data is Q,
        timeout?: number
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Filter
     * 
     * timeout?
     */
    public waitFor(
        op: (data: T) => boolean,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor(
        ctx: Ctx,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * timeout?
     */
    public waitFor(
        timeout?: number
    ): Promise<T>;
    public waitFor(...inputs: any[]) {
        return super.__waitFor(this.__parseOverloadParams(inputs, "waitFor"));
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        ctx: Ctx,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        ctx: Ctx,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attach(...inputs: any[]) {
        return (this.attach as any)(...inputs);
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attach(
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback 
     */
    public attach(
        callback: (data: T) => void
    ): Promise<T>;
    public attach(...inputs: any[]) {
        return this.__attach(this.__parseOverloadParams(inputs, "attach*"));
    }




    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: Ctx,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: Ctx,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Stateless<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOnce(...inputs: any[]) {
        return (this.attachOnce as any)(...inputs);
    }






    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachOnce(
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachOnce(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(...inputs: any[]) {
        return this.__attachOnce(this.__parseOverloadParams(inputs, "attach*"));
    }





    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        ctx: Ctx,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        ctx: Ctx,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }








    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachExtract(...inputs: any[]) {
        return this.__attachExtract(this.__parseOverloadParams(inputs, "attach*"));
    }











    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        ctx: Ctx,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        ctx: Ctx,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachPrepend(...inputs: any[]) {
        return (this.attachPrepend as any)(...inputs);
    }









    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;

    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;

    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachPrepend(
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachPrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(...inputs: any[]) {
        return this.__attachPrepend(this.__parseOverloadParams(inputs, "attach*"));
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: Ctx,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: Ctx,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Stateless<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOncePrepend(...inputs: any[]) {
        return (this.attachOncePrepend as any)(...inputs);
    }









    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachOncePrepend(
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachOncePrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(...inputs: any[]) {
        return this.__attachOncePrepend(this.__parseOverloadParams(inputs, "attach*"));
    }








    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: Ctx,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        ctx: Ctx,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Stateless<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;

    public $attachOnceExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: Ctx,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     */
    public attachOnceExtract(
        ctx: Ctx,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachOnceExtract(
        ctx: Ctx,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachOnceExtract(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(...inputs: any[]) {
        return this.__attachOnceExtract(this.__parseOverloadParams(inputs, "attach*"));
    }


}


