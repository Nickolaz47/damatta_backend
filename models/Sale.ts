// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import User from "./User";
// Interfaces
import { SaleInterface } from "./interfaces/Sale";

const Sale = sequelize.define<SaleInterface>("Sale", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  seller: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buyer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commission: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Sale.belongsTo(User);
User.hasMany(Sale);

export default Sale;
