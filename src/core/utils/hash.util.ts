import * as argon2 from 'argon2';

export const HashUtil = {
  hashData(data: string) {
    return argon2.hash(data);
  },

  verifyHash(hash: string, data: string) {
    return argon2.verify(hash, data);
  },
};
