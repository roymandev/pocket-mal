import { SetStateAction, useState } from 'react';

// Function to update either single or multiple object property
export type ObjectStateUpdate<
  Obj extends Record<string, any>,
  Key extends keyof Obj = keyof Obj,
> = <
  Keys extends readonly Key[] | Key,
  Value extends Keys extends readonly Key[]
    ? // If key is an array, return object
      {
        [K in Keys[number]]: Obj[K];
      }
    : Keys extends Key
      ? // If key is a string, return value
        Obj[Keys]
      : never,
>(
  key: Keys,
  value: SetStateAction<Value>
) => void;

const setter = <V, P>(prev: P, value: SetStateAction<V>) => {
  if (typeof value === 'function') return (value as (prev: P) => V)(prev);
  return value;
};

export const useObjectState = <T extends Record<string, any>>(
  initialState: T
) => {
  const [state, setState] = useState(initialState);

  const update: ObjectStateUpdate<T> = (key, value) => {
    if (Array.isArray(key)) {
      setState((prev) => ({
        ...prev,
        ...Object.fromEntries(key.map((k) => [k, setter(prev[k], value)])),
      }));
    } else if (typeof key === 'string') {
      setState((prev) => ({
        ...prev,
        [key]: setter(prev[key], value),
      }));
    }
  };

  return [state, { update, set: setState }] as const;
};
