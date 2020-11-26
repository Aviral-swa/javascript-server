import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export const createHash = (passwordInString: string) => {
    return bcrypt.hash(passwordInString, saltRounds);
};
