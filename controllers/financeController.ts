// Types
import { Request, Response } from "express";
import { Op } from "sequelize";
// Models
import User from "../models/User";
import Rent from "../models/Rent";
import Sale from "../models/Sale";
import Expense from "../models/Expense";

const getBalance = async (req: Request, res: Response) => {
  const { user } = req;

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rents = await Rent.findAll({
    where: {
      UserId: user.id,
      payday: { [Op.gte]: firstDay, [Op.lte]: lastDay },
    },
    raw: true,
  });
  const rentsTotal = rents.reduce((acc, rent) => acc + rent.value * 0.1, 0);

  const expenses = await Expense.findAll({
    where: {
      UserId: user.id,
      date: { [Op.gte]: firstDay, [Op.lte]: lastDay },
    },
    raw: true,
  });
  const expensesTotal = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );

  const sales = await Sale.findAll({
    where: { UserId: user.id, date: { [Op.gte]: firstDay, [Op.lte]: lastDay } },
    raw: true,
  });
  const salesTotal = sales.reduce((acc, sale) => acc + sale.commission, 0);

  const balance = [
    { name: "Aluguéis", total: rentsTotal },
    { name: "Vendas", total: salesTotal },
    { name: "Despesas", total: expensesTotal },
  ];

  return res.json(balance);
};

const financeController = { getBalance };
export default financeController;
