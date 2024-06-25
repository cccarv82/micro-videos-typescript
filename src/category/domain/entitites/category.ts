import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityID from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

/**
 * Represents a category entity.
 */
export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

/**
 * Represents a category entity.
 */
export class Category extends Entity<CategoryProperties> {
  /**
   * Creates a new category entity.
   *
   * @param props - The properties of the category.
   * @param id - The unique identifier of the category.
   */
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityID) {
    super(props, id);
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  /**
   * Updates the name and description of the category.
   *
   * @param name - The new name of the category.
   * @param description - The new description of the category.
   */
  update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }

  /**
   * Activates the category.
   */
  activate(): void {
    this.props.is_active = true;
  }

  /**
   * Deactivates the category.
   */
  deactivate(): void {
    this.props.is_active = false;
  }

  /**
   * Gets the name of the category.
   *
   * @returns The name of the category.
   */
  get name() {
    return this.props.name;
  }

  /**
   * Sets the name of the category.
   *
   * @param value - The new name of the category.
   */
  private set name(value) {
    this.props.name = value;
  }

  /**
   * Gets the description of the category.
   *
   * @returns The description of the category.
   */
  get description() {
    return this.props.description;
  }

  /**
   * Sets the description of the category.
   *
   * @param value - The new description of the category.
   */
  private set description(value: string) {
    this.props.description = value ?? null;
  }

  /**
   * Gets the activation status of the category.
   *
   * @returns The activation status of the category.
   */
  get is_active() {
    return this.props.is_active;
  }

  /**
   * Sets the activation status of the category.
   *
   * @param is_active - The new activation status of the category.
   */
  private set is_active(is_active: boolean) {
    this.props.is_active = is_active ?? true;
  }

  /**
   * Gets the creation date of the category.
   *
   * @returns The creation date of the category.
   */
  get created_at() {
    return this.props.created_at;
  }
}
