import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tool" })
export default class Tool {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  source: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;
}
