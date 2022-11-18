// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Interfaces
import { UserInterface } from "./interfaces/User";

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

export default User;
