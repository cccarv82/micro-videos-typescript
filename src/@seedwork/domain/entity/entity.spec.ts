import UniqueEntityID from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as uuidValidate } from "uuid";

/**
 * Stub entity class for testing purposes.
 */
class StubEntity extends Entity<{ prop1: string; prop2: number }> {
  /**
   * Creates a new instance of StubEntity.
   * @param props - The initial properties of the entity.
   * @param id - Optional unique identifier for the entity. If not provided, a new
   *   identifier will be generated.
   */
  constructor(props: { prop1: string; prop2: number }, id?: UniqueEntityID) {
    super(props, id);
  }
}

describe("Entity unit tests", () => {
  it("should set props and id", () => {
    // Arrange
    const arrange = { prop1: "value1", prop2: 10 };

    // Act
    const entity = new StubEntity(arrange);

    // Assert
    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityID).toBeInstanceOf(UniqueEntityID);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    // Arrange
    const arrange = { prop1: "value1", prop2: 10 };
    const uniqueEntityId = new UniqueEntityID();

    // Act
    const entity = new StubEntity(arrange, uniqueEntityId);

    // Assert
    expect(entity.id).toBe(uniqueEntityId.value);
    expect(entity.uniqueEntityID).toBeInstanceOf(UniqueEntityID);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should convert a entity to a JSON", () => {
    // Arrange
    const arrange = { prop1: "value1", prop2: 10 };
    const uniqueEntityId = new UniqueEntityID();
    const entity = new StubEntity(arrange, uniqueEntityId);

    // Act

    // Assert
    expect(entity.toJSON()).toStrictEqual({
      id: uniqueEntityId.value,
      ...arrange,
    });
  });
});
