import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/user/UserRepository';
import TraineeRepository from '../repositories/trainee/TraineeRepository';
import { traineeSeedData, trainerSeedData } from './constants';

const userRepository: UserRepository = new UserRepository();
export async function userSeed() {
    const count = await userRepository.countAll();
    if (count === 0) {
        try {
            console.log('Seeding Data');
            const traineeHash = await bcrypt.hash(traineeSeedData.password, 10);
            traineeSeedData.password = traineeHash;
            const trainerHash = await bcrypt.hash(trainerSeedData.password, 10);
            trainerSeedData.password = trainerHash;
            userRepository.create(traineeSeedData);
            userRepository.create(trainerSeedData);

        } catch (err) {
            console.log(err);
        }
    }
}
const traineeRepository: TraineeRepository = new TraineeRepository();
export async function traineeSeed() {
    const count = await traineeRepository.countAll();
    if (count === 0) {
        try {
            console.log('Seeding Data');
            const traineeHash = await bcrypt.hash(traineeSeedData.password, 10);
            traineeSeedData.password = traineeHash;
            const trainerHash = await bcrypt.hash(trainerSeedData.password, 10);
            trainerSeedData.password = trainerHash;
            traineeRepository.create(traineeSeedData);
            traineeRepository.create(trainerSeedData);

        } catch (err) {
            console.log(err);
        }
    }
}
