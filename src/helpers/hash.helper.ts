import Hashids from "hashids";

import env from "../config/env";

export default class HashHelper {
  /**
   ** Encode value to hash.
   *
   * @param value
   * @returns string
   */
  public static encode = (value: any) => {
    const hashids = new Hashids("", env.hash.length, env.hash.alphabet);
    return hashids.encode(value);
  };

  /**
   ** Decode hash to value.
   *
   * @param value
   * @returns string
   */
  public static decode = (value: any) => {
    const hashids = new Hashids("", env.hash.length, env.hash.alphabet);
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
