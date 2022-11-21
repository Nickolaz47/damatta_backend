import {
  Model,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";

export interface LocatorInterface
  extends Model<
    InferAttributes<LocatorInterface>,
    InferCreationAttributes<LocatorInterface>
  > {
  id: CreationOptional<string>;
  name: string;
  rentNumbers: number;
  UserId: string;
}
