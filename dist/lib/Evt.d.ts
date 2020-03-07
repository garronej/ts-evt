import { EvtCore } from "./EvtCore";
import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
import { Operator } from "./types/Operator";
import { Ctx } from "./Ctx";
import { merge } from "./util/merge";
import { fromEvent } from "./util/fromEvent";
export declare class Evt<T> extends EvtCore<T> {
    static newCtx(): Ctx;
    static merge: typeof merge;
    static fromEvent: typeof fromEvent;
    private evtAttach;
    private evtDetach;
    private readonly initialPostCount;
    private __getEvtHandler;
    getEvtAttach(): Evt<Handler<any, any, Bindable>>;
    getEvtDetach(): Evt<Handler<any, any, Bindable>>;
    protected onHandler(target: "evtAttach" | "evtDetach", handler: Handler<T, any>): void;
    postAsyncOnceHandled(data: T): Promise<number>;
    postSyncOnceHandled(data: T): Promise<number>;
    private __postOnceHandled;
    private __parseOverloadParams;
    pipe(): Evt<T>;
    pipe<U>(op: Operator.fλ<T, U>): Evt<U>;
    pipe<U extends T>(op: (data: T) => data is U): Evt<U>;
    pipe(op: (data: T) => boolean): Evt<T>;
    pipe(ctx: Ctx): Evt<T>;
    pipe<U>(ctx: Ctx, op: Operator.fλ<T, U>): Evt<U>;
    pipe<U extends T>(ctx: Ctx, op: (data: T) => data is U): Evt<U>;
    pipe(ctx: Ctx, op: (data: T) => boolean): Evt<T>;
    pipe<B, C>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>): Evt<C>;
    pipe<B, C extends B>(op1: Operator.fλ<T, B>, op2: (data: B) => data is C): Evt<C>;
    pipe<B>(op1: Operator.fλ<T, B>, op2: (data: B) => boolean): Evt<B>;
    pipe<B extends T, C>(op1: (data: T) => data is B, op2: Operator.fλ<B, C>): Evt<B>;
    pipe<B>(op1: (data: T) => boolean, op2: Operator.fλ<T, B>): Evt<B>;
    pipe<B extends T, C extends B>(op1: (data: T) => data is B, op2: (data: B) => data is C): Evt<C>;
    pipe<B extends T>(op1: (data: T) => data is B, op2: (data: B) => boolean): Evt<B>;
    pipe<B extends T>(op1: (data: T) => boolean, op2: (data: T) => data is B): Evt<B>;
    pipe<T>(op1: (data: T) => boolean, op2: (data: T) => boolean): Evt<T>;
    pipe<B, C, D>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>): Evt<D>;
    pipe<B, C, D, E>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): Evt<E>;
    pipe<B, C, D, E>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): Evt<E>;
    pipe<B, C, D, E, F>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>, op5: Operator.fλ<E, F>): Evt<F>;
    pipe<B, C>(op1: Operator<T, B>, op2: Operator<B, C>): Evt<C>;
    pipe<B, C, D>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>): Evt<D>;
    pipe<B, C, D, E>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>): Evt<E>;
    pipe<B, C, D, E, F>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>, op5: Operator<E, F>): Evt<F>;
    pipe(...ops: [Operator<T, any>, ...Operator<any, any>[]]): Evt<any>;
    pipe<T>(...ops: [Operator<T, any>, ...Operator<any, any>[]]): Evt<any>;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * op - fλ
     *
     * timeout?
     */
    waitFor<U>(op: Operator.fλ.Stateless<T, U>, timeout?: number): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * op - Type guard
     *
     * timeout?
     */
    waitFor<Q extends T>(op: (data: T) => data is Q, timeout?: number): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * op - Filter
     *
     * timeout?
     */
    waitFor(op: (data: T) => boolean, timeout?: number): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * timeout?
     */
    waitFor(timeout?: number): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attach<U>(op: Operator.fλ<T, U>, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * callback
     */
    $attach<U>(op: Operator.fλ<T, U>, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attach<U>(op: Operator.fλ<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * callback
     */
    $attach<U>(op: Operator.fλ<T, U>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attach(op: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * boundTo
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * boundTo
     *
     * callback
     */
    attach(op: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attach(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attach(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * callback
     */
    attach(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * boundTo
     *
     * callback
     */
    attach(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * timeout
     *
     * callback
     */
    attach(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * callback
     */
    attach(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * callback
     */
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * callback
     */
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * boundTo
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnce(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Type guard
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * op - Filter
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * boundTo
     *
     * callback
     */
    attachOnce(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * timeout
     *
     * callback
     */
    attachOnce(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     *
     * callback
     */
    attachOnce(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachExtract<U>(op: Operator.fλ<T, U>, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * callback
     */
    $attachExtract<U>(op: Operator.fλ<T, U>, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachExtract<U>(op: Operator.fλ<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * callback
     */
    $attachExtract<U>(op: Operator.fλ<T, U>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - fλ
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Filter
     *
     * boundTo
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Filter
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachPrepend<U>(op: Operator.fλ<T, U>, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * callback
     */
    $attachPrepend<U>(op: Operator.fλ<T, U>, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachPrepend<U>(op: Operator.fλ<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * callback
     */
    $attachPrepend<U>(op: Operator.fλ<T, U>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Filter
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Filter
     *
     * boundTo
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachPrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Type guard
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * op - Filter
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * boundTo
     *
     * callback
     */
    attachPrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * timeout
     *
     * callback
     */
    attachPrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * callback
     */
    attachPrepend(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * callback
     */
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * callback
     */
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Filter
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Filter
     *
     * boundTo
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Type guard
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * op - Filter
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * boundTo
     *
     * callback
     */
    attachOncePrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * callback
     */
    attachOncePrepend(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * boundTo
     *
     * callback
     */
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     *
     * op - fλ
     *
     * callback
     */
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Filter
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Filter
     *
     * boundTo
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * boundTo
     *
     * timeout
     */
    attachOnceExtract(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Type guard
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * op - Filter
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * boundTo
     *
     * callback
     */
    attachOnceExtract(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * callback
     */
    attachOnceExtract(callback: (data: T) => void): Promise<T>;
}
