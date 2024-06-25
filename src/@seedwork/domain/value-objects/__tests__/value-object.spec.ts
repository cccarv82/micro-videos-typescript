import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop: "value" });
    expect(vo.value).toStrictEqual({ prop: "value" });
  });

  it("should convert to string", () => {
    const date = new Date();
    let arrange = [
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

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + "").toBe(value.expected);
    });
  });

  it("should be a immutable object", () => {
    const obj = {
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    };
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
