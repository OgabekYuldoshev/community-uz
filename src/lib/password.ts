import { compare, genSalt, hash } from "bcrypt-ts";

export const hashPassword = async (password: string) => {
	const salt = await genSalt(10);
	return hash(password, salt);
};

export const comparePassword = async (
	password: string,
	hashPassword: string,
) => {
	return compare(password, hashPassword);
};
