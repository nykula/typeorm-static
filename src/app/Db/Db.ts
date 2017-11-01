import { join } from "path";
import { Connection, ConnectionOptions, createConnection } from "typeorm";

export class Db {
  public static connection: Connection;

  public static async createTestConnection() {
    await this.createConnection({
      dropSchema: true,
    });
  }

  public static async createConnection(options: Partial<ConnectionOptions> = {}) {
    if (this.connection) {
      await this.connection.close();
    }

    const entities = [
      join(process.cwd(), "out", "domain", "**", "*.js"),
    ];

    const finalOptions: any = {
      database: process.env.TYPEORM_DATABASE,

      dropSchema: false,

      entities,

      extra: JSON.parse(process.env.TYPEORM_DRIVER_EXTRA || "{}"),

      host: process.env.TYPEORM_HOST,

      logging: process.env.TYPEORM_LOGGING,

      password: process.env.TYPEORM_PASSWORD,

      port: process.env.TYPEORM_PORT,

      synchronize: true,

      type: process.env.TYPEORM_DRIVER_TYPE,

      username: process.env.TYPEORM_USERNAME,

      ...options,
    };

    this.connection = await createConnection(finalOptions);
  }
}
