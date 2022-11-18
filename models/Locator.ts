// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import User from "./User";

const Locator = sequelize.define("Locator", {
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
  rentNumbers: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

Locator.belongsTo(User)
User.hasMany(Locator)

export default Locator;
