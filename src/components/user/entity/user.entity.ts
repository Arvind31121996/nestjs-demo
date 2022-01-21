import {
  BeforeInsert,
  Column,
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID
} from "typeorm";
import { hashSync, genSaltSync } from "bcrypt";
import { Role } from "./role.entity";

@Entity({ name: "users" })
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column({
    type: "string",
  })
  email: string;

  @Column((type) => Role)
  role: Role;

  @Column({
    type: "string",
  })
  password: string;

  @Column({
    type: "enum",
  })
  isVerified: string;

  @Column({
    type: 'number'
  })
  age: number

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashSync(this.password, genSaltSync(10));
  }
}

@Entity({ name: "returnUsers" })
export class ReturnUser {
  @ObjectIdColumn()
  _id: string;

  @Column({
    type: "string",
  })
  email: string;

  @Column((type) => Role)
  role: Role;

  @Column({
    type: "enum",
  })
  isVerified: string;

  @Column({
    type: 'number'
  })
  age: number

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
