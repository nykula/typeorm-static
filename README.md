# typeorm-static

Static TypeORM connection using env vars.

## Environment

- https://nodejs.org/en/download/
- https://yarnpkg.com/en/docs/install
- https://code.visualstudio.com/Download

## Usage

Install:

```bash
yarn add @types/dotenv dotenv reflect-metadata typeorm typeorm-static
```

Configure:

```bash
cat > .env <<EOF
TYPEORM_DATABASE=db.sqlite3
TYPEORM_DRIVER_EXTRA={}
TYPEORM_DRIVER_TYPE=sqlite
TYPEORM_LOGGING=all
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
```

```typescript
// src/domain/Foobar/Foobar.ts

import { Entity } from "typeorm";
import { AbstractEntity } from "typeorm-static";

@Entity()
export class Foobar extends AbstractEntity { }
```

```typescript
// src/app/Foobar/FoobarService.ts

import "reflect-metadata";
import { Db, Id } from "typeorm-static";
import { Foobar } from "../../domain/Foobar/Foobar";

export class FoobarService {
  public repository = Db.connection.getRepository(Foobar);

  public async save(foobar: Foobar) {
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
  })
});
```

## Develop

```bash
git clone https://github.com/makepost/typeorm-static
cd typeorm-static
yarn
yarn prepare
yarn test
yarn coverage
```

## License

MIT
