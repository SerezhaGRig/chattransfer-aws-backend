import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Bot from "./bot";

@Entity({ name: "contact" })
export default class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  name: string;
  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  email: string;
  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  conversation_id: string;

  @ManyToOne("bot", {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn()
  bot: Bot;
}
