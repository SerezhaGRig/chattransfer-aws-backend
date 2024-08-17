import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "message_stream" })
export default class MessageStream {
  @PrimaryColumn("uuid")
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
