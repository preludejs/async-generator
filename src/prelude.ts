export type AsyncIterated<G> =
  G extends AsyncIterable<infer T> ?
    T :
    G extends AsyncIterator<infer T> ?
      T :
      never
