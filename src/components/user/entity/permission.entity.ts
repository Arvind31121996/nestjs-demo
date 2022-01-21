import {
  Column,
  Entity,
  ObjectIdColumn,
} from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: "permission" })
export class Permission {
  @ObjectIdColumn()
  _id: string;

  @Column({
    type: "string",
  })
  name: string;

  @Column((type) => Role)
  role: Role;
}
