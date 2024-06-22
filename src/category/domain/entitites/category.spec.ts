import { Category } from "./category";

describe("Category unit tests", () => {
  test("constructor of category", () => {
    const created_at = new Date();
    const category = new Category({
      name: "test",
      description: "test",
      is_active: true,
      created_at: created_at,
    });

    expect(category.props).toStrictEqual({
      name: "test",
      description: "test",
      is_active: true,
      created_at,
    });
  });
});
