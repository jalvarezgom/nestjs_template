import { randomUUID } from 'node:crypto';

export const UUIDUtil = {
  generateUUID() {
    return randomUUID();
  },
};
