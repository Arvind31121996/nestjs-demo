import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "role" })
export class Role {
  @ObjectIdColumn()
  id: number;

  @Column({
    type: "string",
    unique: false,
  })
  name: string;
}
