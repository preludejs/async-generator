export type AsyncIterated<G> =
  G extends AsyncIterable<infer T> ?
    T :
    G extends AsyncIterator<infer T> ?
      T :
      never

export type Predicate<T> =
  (value: T, index: number) =>
    boolean

export type AsyncPredicate<T> =
  (value: T, index: number) =>
    Promise<boolean>

export type TypePredicate<T, U extends T> =
  (value: T, index: number) =>
    value is U
