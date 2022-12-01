import { body } from "express-validator";

const rentHistoricCreationValidation = () => {
  return [
    body("value").isNumeric().withMessage("O valor do aluguel é obrigatório!"),
    body("dueDate").isDate().withMessage("A data de vencimento é obrigatória!"),
    body("payday").isDate().withMessage("A data de pagamento é obrigatória!"),
    body("LocatorId").isUUID().withMessage("O nome do locador é obrigatório!"),
    body("RenterId").isUUID().withMessage("O nome do inquilino é obrigatório!"),
  ];
};

const rentHistoricUpdateValidation = () => {
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

const rentHistoricValidations = {
  rentHistoricCreationValidation,
  rentHistoricUpdateValidation,
};
export default rentHistoricValidations;
