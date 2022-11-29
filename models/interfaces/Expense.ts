import {
  Model,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";

export interface ExpenseInterface
  extends Model<
    InferAttributes<ExpenseInterface>,
    InferCreationAttributes<ExpenseInterface>
  > {
  id: CreationOptional<string>;
  description: string;
  value: number;
  date: Date;
  UserId: string;
}
