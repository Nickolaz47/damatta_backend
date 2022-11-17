// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";

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

export default Rent;
