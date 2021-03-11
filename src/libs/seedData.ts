import UserRepository from '../repositories/user/UserRepository';
import TraineeRepository from '../repositories/trainee/TraineeRepository';
import EmployeeRepository from '../repositories/employee/EmployeeRepo';
import PermissionsRepository from '../repositories/permissions/PermissionsRepository';
import { adminSeedData, trainerSeedData, employeeSeedData,
         adminpermissionSeedData, trainerpermissionSeedData, traineepermissionSeedData } from './constants';
import { createHash } from './helper';

const userRepository: UserRepository = new UserRepository();
export async function userSeed() {
    const count = await userRepository.count({});
    if (count === 0) {
        try {
            console.log('Seeding Data');
            const traineeHash = await createHash(adminSeedData.password);
            adminSeedData.password = traineeHash;
            userRepository.create(adminSeedData);

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
            const trainerHash = await createHash(trainerSeedData.password);
            trainerSeedData.password = trainerHash;
            traineeRepository.create(trainerSeedData);

        } catch (err) {
            console.log(err);
        }
    }
}
const permissionsRepository: PermissionsRepository = new PermissionsRepository();
export async function permissionsSeed() {
    const count = await permissionsRepository.count();
    if (count === 0) {
        try {
            console.log('Seeding Data');
            permissionsRepository.create(adminpermissionSeedData);
            permissionsRepository.create(trainerpermissionSeedData);
            permissionsRepository.create(traineepermissionSeedData);
        } catch (err) {
            console.log(err);
        }
    }
}
const employeeRepository: EmployeeRepository = new EmployeeRepository();
export async function employeeSeed() {
    const count = await employeeRepository.count();
    if (count === 0) {
        try {
            console.log('Seeding Data');
            employeeRepository.create(employeeSeedData);
        } catch (err) {
            console.log(err);
        }
    }
}
