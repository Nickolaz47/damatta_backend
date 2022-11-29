// Connection
import { DataTypes } from "sequelize";
import sequelize from "../db/conn";
// Models
import User from "./User";
// Interfaces
import { ExpenseInterface } from "./interfaces/Expense";

const Expense = sequelize.define<ExpenseInterface>("Expense", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: { type: DataTypes.DATE, allowNull: false },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Expense.belongsTo(User);
User.hasMany(Expense);

export default Expense;
