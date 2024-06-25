// This file contains unit tests for the UniqueEntityID class in the domain value
// objects module.

import UniqueEntityID from "../unique-entity-id.vo";
import InvalidUuidError from "../../../errors/invalid-uuid.error";
import { validate as uuidValidate } from "uuid";

/**
 * Test suite for the UniqueEntityID class.
 */
describe("UniqueEntityID unit tests", () => {
  // Spy on the validate method of the UniqueEntityID class to ensure it is
  // called during the tests.
  const validateSpy = jest.spyOn(UniqueEntityID.prototype as any, "validate");

  /**
   * Test that an error is thrown when an invalid UUID is provided.
   */
  it("should throw error when uuid is invalid", () => {
    // Expect that calling the constructor with an invalid UUID will throw an
    // InvalidUuidError.
    expect(() => new UniqueEntityID("fake id")).toThrow(new InvalidUuidError());
    // Expect that the validate method was called.
    expect(validateSpy).toHaveBeenCalled();
  });

  /**
   * Test that a valid UUID can be passed to the constructor.
   */
  it("should accept a uuid passed in constructor", () => {
    // Generate a valid UUID.
    const uuid = "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";
    // Create a new UniqueEntityID instance with the generated UUID.
    const vo = new UniqueEntityID(uuid);
    // Expect that the value property of the instance is equal to the generated
    // UUID.
    expect(vo.value).toBe(uuid);
    // Expect that the validate method was called.
    expect(validateSpy).toHaveBeenCalled();
  });

  /**
   * Test that a new UUID is generated when none is provided to the constructor.
   */
  it("should accept a uuid passed in constructor", () => {
    // Create a new UniqueEntityID instance without providing a UUID.
    const vo = new UniqueEntityID();
    // Expect that the generated UUID is valid.
    expect(uuidValidate(vo.value)).toBeTruthy();
    // Expect that the validate method was called.
    expect(validateSpy).toHaveBeenCalled();
  });
});
