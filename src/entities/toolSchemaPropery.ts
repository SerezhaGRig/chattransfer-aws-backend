import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Tool from "./tool";

export enum ToolPropTypes {
  STRING = "string",
  NUMBER = "number",
}

@Entity({ name: "tool_schema_property" })
export default class ToolSchemaProperty {
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
    enum: ToolPropTypes,
    default: ToolPropTypes.STRING,
  })
  type: ToolPropTypes;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;
}
