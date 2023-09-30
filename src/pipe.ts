type Z<A, B> = (a: A) => B

export function pipe<A>(a: A): A
export function pipe<A,B>(a: A, b: Z<A,B>): B
export function pipe<A,B,C>(a: A, b: Z<A,B>, c: Z<B,C>): C
export function pipe<A,B,C,D>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>): D
export function pipe<A,B,C,D,E>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>): E
export function pipe<A,B,C,D,E,F>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>): F
export function pipe<A,B,C,D,E,F,G>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>): G
export function pipe<A,B,C,D,E,F,G,H>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>): H // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>): I // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>): J // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>): K // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>): L // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>): M// NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>): N // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>): O // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>): P // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>): Q // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>): R // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>, s: Z<R,S>): S // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>, s: Z<R,S>, t: Z<S,T>): T // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>, s: Z<R,S>, t: Z<S,T>, u: Z<T,U>): U // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>, s: Z<R,S>, t: Z<S,T>, u: Z<T,U>, v: Z<U,V>): V // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>, s: Z<R,S>, t: Z<S,T>, u: Z<T,U>, v: Z<U,V>, w: Z<V,W>): W // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>, s: Z<R,S>, t: Z<S,T>, u: Z<T,U>, v: Z<U,V>, w: Z<V,W>, x: Z<W,X>): X // NOSONAR
export function pipe<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y>(a: A, b: Z<A,B>, c: Z<B,C>, d: Z<C,D>, e: Z<D,E>, f: Z<E,F>, g: Z<F,G>, h: Z<G,H>, i: Z<H,I>, j: Z<I,J>, k: Z<J,K>, l: Z<K,L>, m: Z<L,M>, n: Z<M,N>, o: Z<N,O>, p: Z<O,P>, q: Z<P,Q>, r: Z<Q,R>, s: Z<R,S>, t: Z<S,T>, u: Z<T,U>, v: Z<U,V>, w: Z<V,W>, x: Z<W,X>, y: Z<X,Y>): Y // NOSONAR

export function pipe(g: unknown, ...gs: (Z<unknown, unknown>)[]): unknown {
  return gs.reduce((r, _) => _(r), g)
}
