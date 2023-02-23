import React from "react";

type Store<T> = {
  get(): T;
  set(newValue: T): void;
  sub(subscriber: (v: T) => void): () => void;
};

export function store<T>(initialValue: T): Store<T> {
  let value = initialValue;
  const subscribers = new Set<(v: T) => void>();
  return {
    get() {
      return value;
    },
    set(newValue: T) {
      value = newValue;
      subscribers.forEach((s) => s(value));
    },
    sub(subscriber: (v: T) => void) {
      subscribers.add(subscriber);
      return () => {
        subscribers.delete(subscriber);
      };
    },
  };
}

export function useStore<T>(store: Store<T>) {
  const [value, set] = React.useState(store.get());
  React.useEffect(() => store.sub(set), [store]);
  return value;
}

export function sub<T extends any[]>(
  stores: { [K in keyof T]: Store<T[K]> },
  merge: (...args: T) => void
) {
  const onChange = () => {
    const values: T = (stores as any).map((store) => store.get());
    merge(...values);
  };
  onChange();
  const unsubscribes = stores.map((s) => s.sub(onChange));
  return () => unsubscribes.forEach((u) => u());
}
