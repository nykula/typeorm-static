import "dotenv/config";
import "reflect-metadata";
import "source-map-support/register";
import * as assert from "assert";
import { Db } from "./db";
import { Foobar } from "./foobar";
import { Id } from "./id";
process.on("unhandledRejection", x => (console.error(x), process.exit(1)));
(async () => {
  {
    const id = Id();
    await Db.createTestConnection();
    let repository = Db.connection.getRepository(Foobar);
    await repository.save({ createdAt: Date.now(), id });
    await Db.createTestConnection();
    repository = Db.connection.getRepository(Foobar);
    const foobar = await repository.findOne(id);
    assert(!foobar, "drops schema when creating test connection");
  }
  {
    const id = Id();
    await Db.createTestConnection();
    let repository = Db.connection.getRepository(Foobar);
    await repository.save({ createdAt: Date.now(), id });
    await Db.createConnection();
    repository = Db.connection.getRepository(Foobar);
    const foobar = await repository.findOne(id);
    assert(foobar, "creates regular connection without dropping schema");
  }
})();
