import bcrypt from "bcryptjs";

export const encryptData = (data: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const encryptedData = bcrypt.hashSync(data, salt);
  return encryptedData;
};

export const decryptData = (
  originalData: string,
  encryptedData: string
): boolean => {
  const compairData = bcrypt.compareSync(originalData, encryptedData);
  return compairData;
};
