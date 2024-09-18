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
  source: string;

  @OneToMany(
    "tool_schema_property",
    (toolProp: ToolSchemaProperty) => toolProp.tool,
    {
      cascade: ["insert", "update", "remove", "recover"],
    },
  )
  @JoinColumn()
  tool_schema_properties: ToolSchemaProperty[];

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
}
