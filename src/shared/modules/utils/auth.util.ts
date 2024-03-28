import crypto from "node:crypto";
import { config } from "../../../config";

const HASH_ALGORITHM = "sha512";
const HASH_ITERATION = 1000;
const HASH_LENGTH = 120;

export const encryptPassword = (password: string): string => {
	return crypto
		.pbkdf2Sync(
			password,
			config.DB_SECRET,
			HASH_ITERATION,
			HASH_LENGTH,
			HASH_ALGORITHM,
		)
		.toString("hex");
};
