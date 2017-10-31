import { PrimaryColumn } from "typeorm";

export abstract class AbstractEntity {
  @PrimaryColumn("varchar", { length: 255 })
  public id?: string;
}
