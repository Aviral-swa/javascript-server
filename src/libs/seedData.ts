import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();
export default function seed() {
    userRepository.count()
        .then((res) => {
            if (res === 0) {
                console.log('Seeding Data');
                userRepository.create({
                    name: 'Aviral Swarnkar',
                    email: 'aviral.swarnkar@successive.tech',
                    role: 'trainee',
                    password: 'asdfghjkl'
                });
                userRepository.create({
                    name: 'Trainer',
                    email: 'trainer@successive.tech',
                    role: 'trainer',
                    password: 'zxcvbnm'
                });
            }
        })
        .catch((err) => console.log(err));
}
