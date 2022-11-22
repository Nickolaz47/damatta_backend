// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import User from "./User";
// Interfaces
import { LocatorInterface } from "./interfaces/Locator";

const Locator = sequelize.define<LocatorInterface>("Locator", {
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Locator.belongsTo(User);
User.hasMany(Locator);

export default Locator;
