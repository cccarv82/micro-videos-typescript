import UniqueEntityID from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

/**
 * Test suite for the Category entity.
 */
describe("Category unit tests", () => {
  /**
   * Test that the constructor correctly initializes the properties of the category.
   */
  test("constructor of category", () => {
    // Test that the name and description properties are set correctly
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

    // Test that the creation date is set correctly
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

    // Test that the name and description properties can be set using the constructor
    category = new Category({
      name: "test3",
      description: "test3",
    });
    expect(category.props).toMatchObject({
      name: "test3",
      description: "test3",
    });

    // Test that the name and is_active properties can be set using the constructor
    category = new Category({
      name: "test4",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "test4",
      is_active: true,
    });

    // Test that the creation date can be set using the constructor
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

  /**
   * Test that the id property is set correctly.
   */
  test("id prop", () => {
    // Define the data for testing the id property
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityID };
    const data: CategoryData[] = [
      { props: { name: "test1" } },
      { props: { name: "test1" }, id: null },
      { props: { name: "test1" }, id: undefined },
      { props: { name: "test1" }, id: new UniqueEntityID() },
    ];

    // Test that the id property is set correctly
    data.forEach((item) => {
      const category = new Category(item.props, item.id as any);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityID).toBeInstanceOf(UniqueEntityID);
    });
  });

  /**
   * Test that the getter and setter for the name property work correctly.
   */
  test("getter and setter of name prop", () => {
    const category = new Category({ name: "test1" });

    // Test that the getter returns the correct value
    expect(category.name).toBe("test1");

    // Test that the setter sets the correct value
    category["name"] = "test2";
    expect(category.name).toBe("test2");
  });

  /**
   * Test that the getter and setter for the description property work correctly.
   */
  test("getter and setter of description prop", () => {
    let category = new Category({
      name: "test1",
      description: "test1",
    });

    // Test that the getter returns the correct value
    expect(category.description).toBe("test1");

    // Test that the setter sets the correct value
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

  /**
   * Test that the getter and setter for the is_active property work correctly.
   */
  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: "test1",
      is_active: true,
    });

    // Test that the getter returns the correct value
    expect(category.is_active).toBe(true);

    // Test that the setter sets the correct value
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

  /**
   * Test that the getter of the created_at property works correctly.
   */
  test("getter of created_at prop", () => {
    let category = new Category({
      name: "test1",
    });

    // Test that the getter returns the correct value
    expect(category.created_at).toBeInstanceOf(Date);

    // Test that the creation date can be set using the constructor
    let created_at = new Date();
    category = new Category({
      name: "test2",
      created_at,
    });
    expect(category.created_at).toStrictEqual(created_at);
  });

  /**
   * Test that the update method correctly updates the name and description properties of the category.
   */
  it("should update a category", () => {
    const category = new Category({ name: "test1" });
    category.update("test2", "test2");
    expect(category.name).toBe("test2");
    expect(category.description).toBe("test2");
  });

  /**
   * Test that the activate method correctly activates the category.
   */
  it("should activate a category", () => {
    const category = new Category({ name: "test1", is_active: false });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  /**
   * Test that the deactivate method correctly deactivates the category.
   */
  it("should deactivate a category", () => {
    const category = new Category({ name: "test1", is_active: true });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });
});
