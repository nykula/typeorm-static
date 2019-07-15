import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstractentity";
import { Bigint } from "./bigint";
@Entity()
export class Foobar extends AbstractEntity {
  @Column("bigint", { transformer: Bigint }) public createdAt = Date.now();
}
