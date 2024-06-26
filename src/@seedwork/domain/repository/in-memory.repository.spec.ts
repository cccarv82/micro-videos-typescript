import NotFoundError from "../../../@seedwork/errors/not-found.error";
import Entity from "../entity/entity";
import InMemoryRepository from "./in-memory.repository";
import UniqueEntityID from "../value-objects/unique-entity-id.vo";

type StubEntityProps = {
  name: string;
  price: number;
};
class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));
  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "test", price: 10 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw error when entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );

    expect(
      repository.findById(
        new UniqueEntityID("1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d`
      )
    );
  });

  it("should find a entity by id", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityID);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should return all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);
    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it("should throw error on update when entity not found", () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  it("should update an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 },
      entity.uniqueEntityID
    );
    await repository.update(entityUpdated);

    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw error on delete when entity not found", () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError("Entity Not Found using ID fake id")
    );
    expect(
      repository.delete(
        new UniqueEntityID("1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d`
      )
    );
  });

  it("should delete an entity", async () => {
    const entity = new StubEntity({ name: "new value", price: 5 });
    await repository.insert(entity);
    await repository.delete(entity.id);

    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityID);

    expect(repository.items).toHaveLength(0);
  });
});
