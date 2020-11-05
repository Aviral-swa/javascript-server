import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();
export default () => {
    userRepository.count()
        .then((res) => {
            if (res === 0) {
                console.log('Seeding Data');
                userRepository.create({
                    name: 'Head TrainerX',
                    email: 'head.trainer@successive.tech',
                    role: 'head-trainer',
                    password: 'headhead'
                });
                userRepository.create({
                    name: 'TrainerX',
                    email: 'trainer@successive.tech',
                    role: 'trainer',
                    password: 'trainertrainer'
                });
            }
        })

        .catch((err) => {
            console.log(err);
        });
};