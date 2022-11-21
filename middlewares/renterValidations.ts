import { body } from "express-validator";

const renterCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome precisa de no mínimo 5 caracteres."),
  ];
};

const renterUpdateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Insira um nome válido.")
      .isLength({ min: 5 })
      .withMessage("O nome precisa de no mínimo 5 caracteres."),
  ];
};

const renterValidations = { renterCreateValidation, renterUpdateValidation };
export default renterValidations;
