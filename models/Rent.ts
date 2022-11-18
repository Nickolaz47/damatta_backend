// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import Locator from "./Locator";
import User from "./User";

const Rent = sequelize.define("Rent", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Rent.belongsTo(User);
User.hasMany(Rent);

Rent.belongsTo(Locator);
Locator.hasMany(Rent);

export default Rent;
