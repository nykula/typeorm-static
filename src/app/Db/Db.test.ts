import { Foobar } from "../../domain/Foobar/Foobar";
import { Id } from "../Id/Id";
import { Db } from "./Db";

describe("Db", () => {
  it("drops schema when creating test connection", async () => {
    const id = Id();

    await Db.createTestConnection();
    let repository = Db.connection.getRepository(Foobar);
    await repository.save({ createdAt: Date.now(), id });

    await Db.createTestConnection();
    repository = Db.connection.getRepository(Foobar);
    const foobar = await repository.findOneById(id);
    console.assert(!foobar);
  });

  it("creates regular connection without dropping schema", async () => {
    const id = Id();

    await Db.createTestConnection();
    let repository = Db.connection.getRepository(Foobar);
    await repository.save({ createdAt: Date.now(), id });

    await Db.createConnection();
    repository = Db.connection.getRepository(Foobar);
    const foobar = await repository.findOneById(id);
    console.assert(foobar);
  });
});
