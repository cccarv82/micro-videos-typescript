import UniqueEntityID from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as uuidValidate } from "uuid";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}
describe("Entity unit tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "value1", prop2: 10 };
    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityID).toBeInstanceOf(UniqueEntityID);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });
  it("should accept a valid uuid", () => {
    const arrange = { prop1: "value1", prop2: 10 };
    const uniqueEntityId = new UniqueEntityID();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
    expect(entity.uniqueEntityID).toBeInstanceOf(UniqueEntityID);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });
  it("should convert a entity to a JSON", () => {
    const arrange = { prop1: "value1", prop2: 10 };
    const uniqueEntityId = new UniqueEntityID();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual({
      id: uniqueEntityId.value,
      ...arrange,
    });
  });
});
