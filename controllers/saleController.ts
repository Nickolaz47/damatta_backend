// Types
import { Request, Response } from "express";
// Models
import Sale from "../models/Sale";
import User from "../models/User";

const getSales = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const sales = await Sale.findAll({
    where: { UserId: user.id },
    order: [["date", "DESC"]],
  });

  return res.json(sales);
};

const getSaleById = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const sale = await Sale.findOne({ where: { id, UserId: user.id } });
  if (!sale) {
    return res.status(404).json({ errors: ["Venda não encontrada!"] });
  }

  return res.json(sale);
};

const createSale = async (req: Request, res: Response) => {
  const { user } = req;
  const { seller, buyer, value, commission, agent, date } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const sale = {
    seller,
    buyer,
    value,
    commission,
    agent,
    date,
    UserId: user.id,
  };
  const newSale = await Sale.create(sale);

  return res.status(201).json(newSale);
};

const updateSale = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { seller, buyer, value, commission, agent, date } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const saleToUpdate = await Sale.findOne({ where: { id, UserId: user.id } });
  if (!saleToUpdate) {
    return res.status(404).json({ errors: ["Venda não encontrada!"] });
  }

  await saleToUpdate.update({ seller, buyer, value, commission, agent, date });

  return res.json(saleToUpdate);
};

const deleteSale = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const saleToDelete = await Sale.findOne({ where: { id, UserId: user.id } });
  if (!saleToDelete) {
    return res.status(404).json({ errors: ["Venda não encontrada!"] });
  }

  await saleToDelete.destroy();

  return res.json(saleToDelete);
};

const saleController = {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};
export default saleController;
