/**
 * Return a copy of the object with the specified properties removed.
 * @param {obj} object
 * @param {keys} array The list of properties to remove.
 */
export function objectWithoutProperties(obj: Record<string, any>, keys: Array<string>): Record<string, any> {
  const target: Record<string, any> = {};
  for (const i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

export function getPropertyFromDottedString(obj: Record<string, any>, dottedString: string): any {
  const strArr = dottedString.split('.');
  const [res, _] = strArr.reduce(
    (prev: any, current: string) => {
      if (!prev[0] && !prev[1]) return [undefined, false];
      if (!prev[0] && prev[1] && obj[current]) return [obj[current], true];
      if (prev[0] && prev[1] && prev[0][current]) return [prev[0][current], true];
      if (prev[0] && prev[1] && !prev[0][current]) return [undefined, false];
      return [undefined, true];
    },
    [undefined, true],
  );
  return res;
}
