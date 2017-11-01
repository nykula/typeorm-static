import { Column, Entity } from "typeorm";
import { Bigint } from "../../app/Bigint/Bigint";
import { AbstractEntity } from "../AbstractEntity/AbstractEntity";

@Entity()
export class Foobar extends AbstractEntity {
  @Column("bigint", { transformer: Bigint })
  public createdAt: number;
}
