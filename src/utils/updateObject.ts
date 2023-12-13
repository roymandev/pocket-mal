export const updateObject = <T extends object>(
  obj: Partial<T>,
  update: Partial<T>
) =>
  Object.keys(update).reduce<typeof obj>(
    (acc, _key) => {
      const key = _key as keyof T;
      const value = update[key] as T[keyof T];

      acc[key] = value;

      return acc;
    },
    { ...obj }
  );
