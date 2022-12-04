// Types
import { Request, Response } from "express";
import { RentHistoricInterface } from "../models/interfaces/RentHistoric";
// Models
import Locator from "../models/Locator";
import Renter from "../models/Renter";
import Rent from "../models/Rent";
import RentHistoric from "../models/RentHistoric";
import User from "../models/User";
// Sequelize
import { Op } from "sequelize";

const addedOneMonthToDate = (col: Date) => {
  return new Date(col.toString()).setMonth(
    new Date(col.toString()).getMonth() + 1
  );
};

const getRentHistoric = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rentHistoricData = await RentHistoric.findAll({
    include: [Locator, Renter],
    where: { UserId: user.id },
  });

  const rentHistoric = rentHistoricData.map((rentHistoric) =>
    rentHistoric.get({ plain: true })
  );

  res.json(rentHistoric);
};

const createRentHistoric = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rents = await Rent.findAll({
    include: [Locator, Renter],
    where: { UserId: user.id, payday: { [Op.ne]: "" } },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    raw: true,
  });

  const rentsToUpdate = rents.map(({ id, dueDate }) => {
    const rent = {
      id,
      payday: null,
      dueDate: new Date(addedOneMonthToDate(dueDate)),
    };
    return rent;
  });

  rentsToUpdate.forEach(
    async (rent) => await Rent.update(rent, { where: { id: rent.id } })
  );

  const rentHistoricToCreate = rents.map(
    ({ value, dueDate, payday, LocatorId, RenterId, UserId }) => {
      return { value, dueDate, payday, LocatorId, RenterId, UserId };
    }
  );

  let rentHistoric: RentHistoricInterface[] = [];
  if (rents.length !== 0) {
    rentHistoric = await RentHistoric.bulkCreate(rentHistoricToCreate);
  }

  return res.status(201).json(rentHistoric);
};

const rentHistoricController = {
  getRentHistoric,
  createRentHistoric,
};
export default rentHistoricController;
