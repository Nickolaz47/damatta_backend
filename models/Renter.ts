// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import User from "./User";
// Interfaces
import { RenterInterface } from "./interfaces/Renter";

const Renter = sequelize.define<RenterInterface>("Renter", {
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
});

Renter.belongsTo(User);
User.hasMany(Renter);

export default Renter;
