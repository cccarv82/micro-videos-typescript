import UniqueEntityID from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props> {
  public readonly uniqueEntityID: UniqueEntityID;

  constructor(public readonly props: Props, id?: UniqueEntityID) {
    this.uniqueEntityID = id || new UniqueEntityID();
  }

  get id() {
    return this.uniqueEntityID.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
