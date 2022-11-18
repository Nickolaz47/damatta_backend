// Connection
import { DataTypes, ModelDefined } from "sequelize";
import sequelize from "../db/conn";
// Interfaces
import { UserInterface } from "./interfaces/User";
// Models
import Locator from "./Locator";
import Renter from "./Renter";
import Rent from "./Rent";

const User = sequelize.define<UserInterface>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

Locator.belongsTo(User);
Renter.belongsTo(User);
Rent.belongsTo(User);

export default User;
