import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "contact" })
export default class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  email: string;
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  phoneNumber: string;
}
