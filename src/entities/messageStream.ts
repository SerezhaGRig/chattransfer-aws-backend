import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "message_stream" })
export default class MessageStream {
  //make it not primary
  @PrimaryColumn({
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
}
