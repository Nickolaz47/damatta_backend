import {
  Model,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";

export interface RentHistoricInterface
  extends Model<
    InferAttributes<RentHistoricInterface>,
    InferCreationAttributes<RentHistoricInterface>
  > {
  id: CreationOptional<string>;
  value: number;
  dueDate: Date;
  payday: Date | null;
  LocatorId: string;
  RenterId: string;
  UserId: string;
}