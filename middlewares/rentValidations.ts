import { body } from "express-validator";

const rentCreateValidation = () => {
  return [
    body("value").isNumeric().withMessage("O valor do aluguel é obrigatório!"),
    body("dueDate").isDate().withMessage("A data de vencimento é obrigatória!"),
    body("payday")
      .optional()
      .isDate()
      .withMessage("A data de pagamento precisa estar no formato correto!"),
    body("LocatorId").isUUID().withMessage("O nome do locador é obrigatório!"),
    body("RenterId").isUUID().withMessage("O nome do inquilino é obrigatório!"),
  ];
};

const rentUpdateValidation = () => {
  return [
    body("value")
      .optional()
      .isNumeric()
      .withMessage("O valor do aluguel é obrigatório!"),
    body("dueDate")
      .optional()
      .isDate()
      .withMessage("A data de vencimento é obrigatória!"),
    body("payday")
      .optional()
      .isDate()
      .withMessage("A data de pagamento precisa estar no formato correto!"),
    body("LocatorId")
      .optional()
      .isUUID()
      .withMessage("O nome do locador é obrigatório!"),
    body("RenterId")
      .optional()
      .isUUID()
      .withMessage("O nome do inquilino é obrigatório!"),
  ];
};

const rentValidations = { rentCreateValidation, rentUpdateValidation };
export default rentValidations;
