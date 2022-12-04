import {
  Model,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";

export interface RentInterface
  extends Model<
    InferAttributes<RentInterface>,
    InferCreationAttributes<RentInterface>
  > {
  id: CreationOptional<string>;
  value: number;
  dueDate: Date;
  payday: CreationOptional<Date> | null;
  LocatorId: string;
  RenterId: string;
  UserId: string;
}
