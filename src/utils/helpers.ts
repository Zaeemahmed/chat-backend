import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const compareHash = async (
  rawPassword: string,
  hashPassword: string,
) => {
  return bcrypt.compare(rawPassword, hashPassword);
};
