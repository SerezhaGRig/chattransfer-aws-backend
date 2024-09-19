import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Tool from "./tool";

export enum ToolRespTypes {
  STRING = "string",
  NUMBER = "number",
}

@Entity({ name: "tool_schema_response" })
export default class ToolSchemaResponse {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  @ManyToOne("Tool", {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn()
  tool: Tool;

  @Column({
    type: "enum",
    enum: ToolRespTypes,
    default: ToolRespTypes.STRING,
  })
  type: ToolRespTypes;

  @Column({
    type: "text",
    nullable: false,
  })
  value: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  conversation_id: string;
}
