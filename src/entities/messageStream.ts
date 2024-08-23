import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "message_stream" })
export default class MessageStream {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  message_id: string;

  @Column({
    type: "text",
    nullable: false,
  })
  content: string;

  @Column({
    type: "bigint",
    nullable: false,
  })
  timestamp: number;

  @Column({
    type: "boolean",
    nullable: false,
  })
  ended: boolean;
}
