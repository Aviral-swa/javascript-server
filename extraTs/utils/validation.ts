import validateEmail from './helper';
import { IUsers } from '../interfaces';

export default function validateUsers(user: IUsers[]): void {
    console.log('\n //running validation.js ... \n');
    const validUsers = [];
    const invalidUsers = [];
    user.forEach(({traineeEmail, reviewerEmail}) => {
            validateEmail(traineeEmail) ? validUsers.push(traineeEmail) : invalidUsers.push(traineeEmail);
            validateEmail(reviewerEmail) ? validUsers.push(reviewerEmail) : invalidUsers.push(reviewerEmail);
        }
    );
    console.log(`There are ${validUsers.length} valid users:`, validUsers);
    console.log(`There are ${invalidUsers.length} invalid users:`, invalidUsers);
}