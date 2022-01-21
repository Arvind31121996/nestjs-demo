import {
    Column,
    Entity,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectID,
  } from "typeorm";
  import { User } from "@components/user/entity/user.entity";
  
  @Entity({ name: "shop" })
  export class Shop {
    @ObjectIdColumn()
    _id: string;
  
    @Column({
      type: "string",
    })
    name: string;
  
    @Column({
      type:"string",
    })
    createdBy: string;
  
    @Column({
      type: "string",
    })
    address: string;

    @Column({
      type: "string",
    })
    category: string;
  
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
  