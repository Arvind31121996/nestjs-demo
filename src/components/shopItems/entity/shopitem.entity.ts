import {
    Column,
    Entity,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectID,
  } from "typeorm";
  import { Shop } from "@components/shops/entity/shop.entity"
  import { User } from "@components/user/entity/user.entity";
  
  @Entity({ name: "shopItems" })
  export class ShopItems {
    @ObjectIdColumn()
    _id: string;
  
    @Column({
      type: "string",
    })
    name: string;

    @Column({
      type: "string",
    })
    brand: string;

    @Column({
      type: "number",
    })
    mrp: number;
  
    @Column((type) => Shop)
    shopId: ObjectID;

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
  