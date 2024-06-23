// write the unit tests for unique-entity-id.vo.ts

import UniqueEntityID from "./unique-entity-id.vo";
import InvalidUuidError from "../errors/invalid-uuid.error";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityID unit tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityID.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityID("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";
    const vo = new UniqueEntityID(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const vo = new UniqueEntityID();
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
