import {
  Model,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";

export interface SaleInterface
  extends Model<
    InferAttributes<SaleInterface>,
    InferCreationAttributes<SaleInterface>
  > {
  id: CreationOptional<string>;
  seller: string;
  buyer: string;
  value: number;
  commission: number;
  agent: string;
  date: Date;
  UserId: string;
}
