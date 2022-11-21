// Types
import { Request, Response } from "express";
// Models
import Renter from "../models/Renter";
import User from "../models/User";

const getRenters = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const renters = await Renter.findAll({
    where: { UserId: user.id },
    raw: true,
  });

  return res.json({ renters });
};

const createRenter = async (req: Request, res: Response) => {
  const { user } = req;
  const { name } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const renter = { name, UserId: user.id };
  const newRenter = await Renter.create(renter);

  return res.status(201).json({ renter: newRenter });
};

const updateRenter = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { name } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const renterToUpdate = await Renter.findOne({
    where: { id, UserId: user.id },
  });
  if (!renterToUpdate) {
    return res.status(404).json({ errors: ["Inquilino não encontrado!"] });
  }

  await renterToUpdate.update({ name });

  const updatedRenter = renterToUpdate;

  return res.json({ renter: updatedRenter });
};

const deleteRenter = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const renterToDelete = await Renter.findOne({
    where: { id, UserId: user.id },
  });
  if (!renterToDelete) {
    return res.status(404).json({ errors: ["Inquilino não encontrado!"] });
  }

  await renterToDelete.destroy();

  return res.json({ renter: renterToDelete });
};

const renterController = {
  getRenters,
  createRenter,
  updateRenter,
  deleteRenter,
};
export default renterController;
