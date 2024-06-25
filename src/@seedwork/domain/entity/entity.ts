import UniqueEntityID from "../value-objects/unique-entity-id.vo";

/**
 * Base class for entities in the domain.
 *
 * @template Props - The type of the entity's properties.
 */
export default abstract class Entity<Props = any> {
  /**
   * Unique identifier for the entity.
   */
  public readonly uniqueEntityID: UniqueEntityID;

  /**
   * Creates a new entity.
   *
   * @param props - The initial properties of the entity.
   * @param id - Optional unique identifier for the entity. If not provided, a new
   *   identifier will be generated.
   */
  constructor(public readonly props: Props, id?: UniqueEntityID) {
    this.uniqueEntityID = id || new UniqueEntityID();
  }

  /**
   * Returns the unique identifier of the entity.
   *
   * @returns The unique identifier as a string.
   */
  get id() {
    return this.uniqueEntityID.value;
  }

  /**
   * Returns the entity as a JSON object.
   *
   * @returns The entity as a JSON object with the unique identifier and the
   *   entity's properties.
   */
  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
