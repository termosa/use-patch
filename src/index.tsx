// This is the upgraded version of https://usehooks.com/useAsync/
import * as React from "react";

const isNaNType = (value: unknown) => typeof value === "number" && isNaN(value);

const isSame = (valueA: unknown, valueB: unknown): boolean => {
  if (typeof valueA !== typeof valueB) return false;
  if (isNaNType(valueA) && isNaNType(valueB)) return true;
  if (valueA === valueB) return true;
  if (typeof valueA !== "object") return false;
  if (valueA === null || valueB === null) return false;

  if (Array.isArray(valueA)) {
    if (!Array.isArray(valueB)) return false;
    if (valueA.length !== valueB.length) return false;
    return valueA.every((v, index) => isSame(v, valueB[index]));
  }

  const keysA = Object.keys(valueA);
  const keysB = Object.keys(valueB as Record<string, unknown>);
  if (keysA.length !== keysB.length) return false;
  if (keysA.some((key) => !keysB.includes(key))) return false;
  return keysA.every((key) => isSame(valueA[key], (valueB as Record<string, unknown>)[key]));
};

const selectDifferentProperties = <PatchType extends Record<string, unknown>>(
  origin: Record<string, unknown> | undefined,
  patch: PatchType
): Partial<PatchType> => {
  return Object.keys(patch).reduce((diff, key) => {
    return origin && key in origin && isSame(patch[key], origin[key])
      ? diff
      : Object.assign(diff, { [key]: patch[key] });
  }, {});
};

export interface PatchFunction<Type> {
  (changes: Partial<Type>, diff: Partial<Type>, origin: Type): Partial<Type>;
}

export function usePatch<Type extends Record<string, unknown>>(
  origin: Type,
  patch?: PatchFunction<Type>
) {
  const [diff, setDiff] = React.useState<Partial<Type>>({});

  return React.useMemo(
    () => ({
      value: { ...origin, ...diff },
      diff,
      changed: Boolean(Object.keys(diff).length),
      apply: (changes: Partial<Type>) => {
        const newDiff = patch
          ? patch(changes, diff, origin)
          : selectDifferentProperties(origin, { ...diff, ...changes });
        setDiff(newDiff);
      },
      set: (changes: Partial<Type>) => {
        const newDiff = patch
          ? patch(changes, {}, origin)
          : selectDifferentProperties(
              origin,
              Object.assign(
                Object.keys(origin).reduce(
                  (empty, key) => Object.assign(empty, { [key]: undefined }),
                  {}
                ),
                changes
              )
            );
        setDiff(newDiff);
      },
      reset: () => setDiff({}),
    }),
    [origin, diff, setDiff]
  );
}

export default usePatch;
