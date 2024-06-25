import { deepFreeze } from "./object";

/**
 * Tests the `deepFreeze` function to ensure it behaves as expected.
 */
describe("object unit tests", () => {
  it("should not freeze a scalar value", () => {
    // Test that a string is not frozen
    const str = deepFreeze("a");
    expect(typeof str).toBe("string");

    // Test that a boolean is not frozen
    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe("boolean");

    // Test that setting a boolean to false does not freeze it
    boolean = deepFreeze(false);
    expect(typeof boolean).toBe("boolean");

    // Test that a number is not frozen
    const num = deepFreeze(1);
    expect(typeof num).toBe("number");
  });

  it("should freeze an object and make it immutable", () => {
    // Test that an object is frozen
    const obj = deepFreeze({
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    });

    // Test that trying to modify a property throws an error
    expect(() => {
      (obj as any).prop1 = "other value";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    // Test that trying to modify a nested property throws an error
    expect(() => {
      (obj as any).deep.prop2 = "other value";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    // Test that a date is not affected by the freeze
    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
