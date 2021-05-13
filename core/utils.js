// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Recursively freeze an object.
// NOTE: Do NOT use with a cyclic object
export function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

/**
 * Shuffles array in place.
 *
 * From https://stackoverflow.com/a/6274381/1037165
 *
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export const clamp = (value, min, max) => Math.max(Math.min(max, value), min);
