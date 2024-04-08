import { encryptionKey } from "~/cockpit/constants";

const SALT = "dtf4f3435dsW1E";

export const GetEncryptionKey = () => {
  return encryptionKey.toUpperCase() + SALT;
};
