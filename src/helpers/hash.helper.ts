import Hashids from "hashids";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: ".env",
});

export default class HashHelper {
  /**
   ** Encode value to hash.
   *
   * @param value
   * @returns string
   */
  public static encode = (value: any) => {
    const hashids = new Hashids("", parseInt(process.env.HASH_LENGTH), process.env.HASH_ALPHABET);
    return hashids.encode(value);
  };

  /**
   ** Decode hash to value.
   *
   * @param value
   * @returns string
   */
  public static decode = (value: any) => {
    const hashids = new Hashids("", parseInt(process.env.HASH_LENGTH), process.env.HASH_ALPHABET);
    let decode = [];

    try {
      decode = hashids.decode(value);
    } catch (err) {
      return 0;
    }

    if (decode.length == 0) {
      return 0;
    }

    const result = Number(decode[0]);

    return result;
  };
}
