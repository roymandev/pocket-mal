import { SetStateAction, useEffect, useState } from 'react';

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

type Props<T> = {
  value?: T;
  defaultValue?: T;
  finalValue?: T;
  onChange?: (value: T) => void;
};

export const useObjectState = <T extends Record<string, any>>({
  value,
  defaultValue = {} as T,
  onChange,
}: Props<T>) => {
  const [_value, setValue] = useState(value || defaultValue);

  useEffect(() => {
    if (value) setValue(value);
  }, [value]);

  useEffect(() => {
    onChange?.(_value);
  }, [_value]);

  const update: ObjectStateUpdate<T> = (key, newValue) => {
    if (Array.isArray(key)) {
      setValue((prev) => ({
        ...prev,
        ...Object.fromEntries(key.map((k) => [k, setter(prev[k], newValue)])),
      }));
    } else if (typeof key === 'string') {
      setValue((prev) => ({
        ...prev,
        [key]: setter(prev[key], newValue),
      }));
    }
  };

  return [_value, { update, set: setValue }] as const;
};
