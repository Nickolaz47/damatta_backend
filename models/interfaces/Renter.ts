import {
  Model,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";

export interface RenterInterface
  extends Model<
    InferAttributes<RenterInterface>,
    InferCreationAttributes<RenterInterface>
  > {
  id: CreationOptional<string>;
  name: string;
  UserId: string;
}
