// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import Locator from "./Locator";
import Renter from "./Renter";
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
  LocatorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  RenterId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Rent.belongsTo(User);
User.hasMany(Rent);

Rent.belongsTo(Locator);
Locator.hasMany(Rent);

Rent.belongsTo(Renter)
Renter.hasMany(Rent)

export default Rent;
