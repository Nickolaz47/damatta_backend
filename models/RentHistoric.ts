// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Interface
import { RentHistoricInterface } from "./interfaces/RentHistoric";
// Models
import Locator from "./Locator";
import Renter from "./Renter";
import User from "./User";

const RentHistoric = sequelize.define<RentHistoricInterface>("RentHistoric", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payday: {
    type: DataTypes.DATE,
    allowNull: false,
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

RentHistoric.belongsTo(User);
User.hasMany(RentHistoric);

RentHistoric.belongsTo(Locator);
Locator.hasMany(RentHistoric);

RentHistoric.belongsTo(Renter);
Renter.hasOne(RentHistoric);

export default RentHistoric;
