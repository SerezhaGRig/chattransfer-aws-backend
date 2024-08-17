import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export default class User {
  @PrimaryColumn("uuid")
  conversation_id: string;

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
    type: "boolean",
    nullable: true,
  })
  tobacco_use: boolean;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  zipcode: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  effective_date: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  household_income: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  household_size: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  age: string;
}
