import ValueObject from "../value-object";

/**
 * Stub value object for testing purposes.
 */
class StubValueObject extends ValueObject {}

/**
 * Test suite for the ValueObject class.
 */
describe("ValueObject Unit Tests", () => {
  /**
   * Tests if the value stored in the ValueObject is set correctly.
   */
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop: "value" });
    expect(vo.value).toStrictEqual({ prop: "value" });
  });

  /**
   * Tests if the ValueObject can be converted to a string.
   */
  it("should convert to string", () => {
    // Arrange
    const date = new Date();
    const arrange = [
      { received: "", expected: "" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: -5, expected: "-5" },
      { received: 5, expected: "5" },
      { received: 0.5, expected: "0.5" },
      { received: "string", expected: "string" },
      { received: date, expected: date.toString() },
      {
        received: { prop: "value" },
        expected: JSON.stringify({ prop: "value" }),
      },
    ];

    // Act & Assert
    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + "").toBe(value.expected);
    });
  });

  /**
   * Tests if the ValueObject is immutable.
   */
  it("should be a immutable object", () => {
    // Arrange
    const obj = {
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    };

    // Act & Assert
    const vo = new StubValueObject(obj);
    expect(() => {
      (vo as any).value.prop1 = "other value";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );
    expect(() => {
      (vo as any).value.deep.prop2 = "other value";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
