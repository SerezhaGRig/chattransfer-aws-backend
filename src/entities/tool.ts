import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Bot from "./bot";
import ToolSchemaProperty from "./toolSchemaPropery";
import ToolSchemaResponse from "./toolSchemaResponse";

export enum ToolTypes {
  DOCUMENT = "DOCUMENT",
  FUNCTION = "FUNCTION",
}

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

  @ManyToOne("Bot", {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn()
  bot: Bot;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  source: string | undefined;

  @OneToMany(
    "tool_schema_property",
    (toolProp: ToolSchemaProperty) => toolProp.tool,
    {
      cascade: ["insert", "update", "remove", "recover"],
    },
  )
  tool_schema_properties: ToolSchemaProperty[];

  @OneToMany(
    "tool_schema_response",
    (toolResp: ToolSchemaResponse) => toolResp.tool,
    {
      cascade: ["insert", "update", "remove", "recover"],
    },
  )
  tool_schema_responses: ToolSchemaResponse[];

  @Column({
    type: "enum",
    enum: ToolTypes,
    default: ToolTypes.DOCUMENT,
  })
  type: ToolTypes;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;
  @Column({
    type: "text",
    nullable: true,
  })
  response: string;
}
