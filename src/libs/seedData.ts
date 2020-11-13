import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/user/UserRepository';
import { seedData1, seedData2 } from './constants';

const userRepository: UserRepository = new UserRepository();
export default async function seed() {
    const count = await userRepository.count();
    if (count === 0) {
        try {
            console.log('Seeding Data');
            const hashPass1 = await bcrypt.hash(seedData1.password, 10);
            seedData1.password = hashPass1;
            const hashPass2 = await bcrypt.hash(seedData2.password, 10);
            seedData2.password = hashPass2;
            userRepository.create(seedData1);
            userRepository.create(seedData2);

        } catch (err) {
            console.log(err);
        }
    }
}
