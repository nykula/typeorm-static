# typeorm-static

Static TypeORM connection using env vars.

## Environment

- https://nodejs.org/en/download/
- https://code.visualstudio.com/Download

## Usage

Install:

```bash
npm i @types/dotenv dotenv reflect-metadata typeorm typeorm-static
```

Configure SQLite:

```bash
npm i sqlite3
cat >.env <<EOF
TYPEORM_DATABASE=db.sqlite3
TYPEORM_DRIVER_TYPE=sqlite
TYPEORM_LOGGING=all
EOF
```

Or PostgreSQL:

```bash
npm i pg
cat >.env <<EOF
TYPEORM_DRIVER_TYPE=postgres
TYPEORM_DRIVER_EXTRA={"ssl": false}
TYPEORM_HOST=localhost
TYPEORM_USERNAME=user
TYPEORM_PASSWORD=1
TYPEORM_DATABASE=user
TYPEORM_LOGGING=
EOF
```

Enable decorators in tsconfig.json:

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

Use:

```javascript
// bin/index.js
const { config } = require("dotenv");
const { join } = require("path");

config({ path: join(__dirname, "..", ".env") });
// ...
```

```typescript
// src/domain/Foobar/Foobar.ts

import { Column, Entity } from "typeorm";
import { AbstractEntity, Bigint } from "typeorm-static";

@Entity()
export class Foobar extends AbstractEntity {
  @Column("bigint", { transformer: Bigint /* Ensure number in postgres. */ })
  public createdAt: number;
}
```

```typescript
// src/app/Foobar/FoobarService.ts

import "reflect-metadata";
import { Db, Id } from "typeorm-static";
import { Foobar } from "../../domain/Foobar/Foobar";

export class FoobarService {
  public repository = Db.connection.getRepository(Foobar);

  public async save(foobar: Foobar) {
    foobar.createdAt = Date.now();
    foobar.id = Id();
    foobar = await this.repository.save(foobar);
    return foobar;
  }
}
```

```typescript
// src/app/Foobar/FoobarService.test.ts

import "reflect-metadata";
import { Db } from "typeorm-static";
import { Foobar } from "../../domain/Foobar/Foobar";
import { FoobarService } from "./FoobarService";

describe("FoobarService", () => {
  it("saves", async () => {
    await Db.createTestConnection(); // Drops schema.

    // Or...
    await Db.createConnection(); // No schema drop.

    const foobarService = new FoobarService();
    let foobar: Foobar = {};
    foobar = await foobarService.save(foobar);
    console.assert(foobar.id);
  });
});
```

## Develop

```bash
git clone https://github.com/nykula/typeorm-static
cd typeorm-static
npm i
npm test
```

## License

[0BSD](LICENSE.md), public domain equivalent.
