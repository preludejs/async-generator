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

export type AnyPredicate<T, U extends T = T> =
  | Predicate<T>
  | AsyncPredicate<T>
  | TypePredicate<T, U>

export type Producer<T> =
  () =>
    AsyncGenerator<T>

export type Transformer<T, R = T> =
  (values: AsyncIterable<T>) =>
    AsyncGenerator<R>

export type Consumer<T, R> =
  (values: AsyncIterable<T>) =>
    Promise<R>

export type Defined<T> =
  T extends undefined ?
    never :
    T
