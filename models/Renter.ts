// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import Rent from "./Rent";

const Renter = sequelize.define("Renter", {
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

Renter.belongsTo(Rent)

export default Renter;
