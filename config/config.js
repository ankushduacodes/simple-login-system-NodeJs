// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

// eslint-disable-next-line no-console
export default result.parsed;
