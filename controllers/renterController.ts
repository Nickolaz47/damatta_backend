// Types
import { Request, Response } from "express";
// Models
import Renter from "../models/Renter";
import Rent from "../models/Rent";
import User from "../models/User";
// Helpers
import titleCase from "../helpers/titleCase";

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

  return res.json(renters);
};

const getRenterById = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const renter = await Renter.findOne({ where: { id, UserId: user.id } });
  if (!renter) {
    return res.status(404).json({ errors: ["Inquilino não encontrado!"] });
  }

  return res.json(renter);
};

const createRenter = async (req: Request, res: Response) => {
  const { user } = req;
  const { name } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const standardizedName = titleCase(name);

  const renterExists = await Renter.findOne({
    where: { name: standardizedName },
  });
  if (renterExists) {
    return res.status(209).json({ errors: ["O inquilino já existe!"] });
  }

  const renter = { name, UserId: user.id };
  const newRenter = await Renter.create(renter);

  return res.status(201).json(newRenter);
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

  return res.json(updatedRenter);
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

  const renterHasRent = await Rent.findOne({
    where: { RenterId: renterToDelete.id },
  });
  if (renterHasRent) {
    return res.status(409).json({
      errors: [
        "Inquilino não pode ser deletado pois está associado a um aluguel.",
      ],
    });
  }

  await renterToDelete.destroy();

  return res.json(renterToDelete);
};

const renterController = {
  getRenters,
  getRenterById,
  createRenter,
  updateRenter,
  deleteRenter,
};
export default renterController;
