import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../../errors/invalid-uuid.error";
import ValueObject from "./value-object";

/**
 * Class representing a unique identifier for an entity.
 *
 * @template Value - The type of the value stored in the value object.
 */
export default class UniqueEntityID extends ValueObject<string> {
  /**
   * Creates an instance of UniqueEntityID.
   *
   * @param {string} [id] - The identifier value. If not provided, a new UUID will be generated.
   */
  constructor(readonly id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  /**
   * Validates the identifier.
   *
   * @throws {InvalidUuidError} - If the identifier is invalid.
   */
  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
