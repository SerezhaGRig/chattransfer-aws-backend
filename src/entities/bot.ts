import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Tool from "./tool";

@Entity({ name: "bot" })
export default class Bot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  @OneToMany("tool", (tool: Tool) => tool.bot, {
    cascade: ["insert", "update", "remove", "recover"],
  })
  @JoinColumn()
  tools: Tool[];
}
