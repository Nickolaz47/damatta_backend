import {
  Model,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";

export interface UserInterface
  extends Model<
    InferAttributes<UserInterface>,
    InferCreationAttributes<UserInterface>
  > {
  id: CreationOptional<string>;
  name: string;
  password: string;
}
