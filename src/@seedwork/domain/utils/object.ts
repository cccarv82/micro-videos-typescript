/**
 * Deep freezes an object by freezing all properties recursively.
 *
 * @template T - The type of the object to be frozen.
 * @param {T} obj - The object to be frozen.
 * @returns {readonly T} - The frozen object.
 */
export function deepFreeze<T>(obj: T): Readonly<T> {
  // Get the property names of the object.
  const propNames = Object.getOwnPropertyNames(obj);

  // Iterate over each property name.
  for (const name of propNames) {
    // Get the value of the property.
    const value = obj[name as keyof T];

    // If the value is an object, recursively call deepFreeze.
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  // Freeze the object and return it.
  return Object.freeze(obj);
}
