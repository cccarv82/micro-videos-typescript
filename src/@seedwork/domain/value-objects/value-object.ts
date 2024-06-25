import { deepFreeze } from "../utils/object";

/**
 * Represents a value object in the domain.
 * A value object is an object that represents a concept and the concept
 * itself is the value.
 *
 * @template Value - The type of the value stored in the value object.
 */
export default abstract class ValueObject<Value = any> {
  /**
   * The value stored in the value object.
   *
   * @protected
   * @readonly
   */
  protected readonly _value: Value;

  /**
   * Creates an instance of ValueObject.
   *
   * @param {Value} value - The value to be stored in the value object.
   */
  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  /**
   * Returns the value stored in the value object.
   *
   * @returns {Value} The value stored in the value object.
   */
  get value(): Value {
    return this._value;
  }

  /**
   * Returns a string representation of the value object.
   *
   * @returns {string} The string representation of the value object.
   */
  toString = (): string => {
    // If the value is not an object or is null, return the string representation of the value.
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch (e) {
        return this.value + "";
      }
    }

    // If the value is an object, return the string representation of the value.
    const valueStr = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
