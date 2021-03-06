import UserRepository from '../repositories/user/UserRepository';
import TraineeRepository from '../repositories/trainee/TraineeRepository';
import { traineeSeedData, trainerSeedData } from './constants';
import { createHash } from './helper';

const userRepository: UserRepository = new UserRepository();
export async function userSeed() {
    const count = await userRepository.count({});
    if (count === 0) {
        try {
            console.log('Seeding Data');
            const traineeHash = await createHash(traineeSeedData.password);
            traineeSeedData.password = traineeHash;
            const trainerHash = await createHash(trainerSeedData.password);
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
    const count = await traineeRepository.count({});
    if (count === 0) {
        try {
            console.log('Seeding Data');
            const traineeHash = await createHash(traineeSeedData.password);
            traineeSeedData.password = traineeHash;
            const trainerHash = await createHash(trainerSeedData.password);
            trainerSeedData.password = trainerHash;
            traineeRepository.create(traineeSeedData);
            traineeRepository.create(trainerSeedData);

        } catch (err) {
            console.log(err);
        }
    }
}
