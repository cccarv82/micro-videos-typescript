import { Category } from "./category";
import { omit } from "lodash";

describe("Category unit tests", () => {
  test("constructor of category", () => {
    let category = new Category({
      name: "test1",
    });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "test1",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "test2",
      description: "test2",
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "test2",
      description: "test2",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "test3",
      description: "test3",
    });
    expect(category.props).toMatchObject({
      name: "test3",
      description: "test3",
    });

    category = new Category({
      name: "test4",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "test4",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "test5",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "test5",
      created_at,
    });
  });

  test("getter of name prop", () => {
    const category = new Category({ name: "test1" });
    expect(category.name).toBe("test1");
  });

  test("getter of description prop", () => {
    let category = new Category({
      name: "test1",
      description: "test1",
    });
    expect(category.description).toBe("test1");
    category = new Category({
      name: "test2",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "test3",
    });

    category["description"] = "test3";
    expect(category.description).toBe("test3");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("getter of is_active prop", () => {
    let category = new Category({
      name: "test1",
      is_active: true,
    });
    expect(category.is_active).toBe(true);
    category = new Category({
      name: "test2",
    });
    expect(category.is_active).toBeTruthy();
    category = new Category({
      name: "test3",
      is_active: false,
    });
    expect(category.is_active).toBeFalsy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({
      name: "test1",
    });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "test2",
      created_at,
    });
    expect(category.created_at).toStrictEqual(created_at);
  });
});
