import { IPermissions } from './interfaces';
import { configuration } from '../config';

export const permissions: IPermissions = {
    getUsers: {
        all: ['head-trainer'],
        read : ['trainee', 'trainer'],
        write : ['trainer'],
        delete: []
    },

    getProduct: {
        all: ['manager'],
        read : ['marketingTeam', 'developmentTeam'],
        write : ['developmentTeam'],
        delete: []
    }
};

export const traineeSeedData = {
    name: 'Aviral Swarnkar',
    email: 'aviral.swarnkar@successive.tech',
    role: 'trainee',
    password: configuration.traineePassword
};
export const trainerSeedData = {
    name: 'Head Trainer',
    email: 'trainer@successive.tech',
    role: 'head-trainer',
    password: configuration.trainerPassword
};

export const permissionSeedData = {
    email: 'superadmin@successive.tech',
    resources: {
        trainee: ['create', 'read', 'update', 'delete' ],
        employee: ['create', 'read', 'update', 'delete' ],
        permissions: ['create', 'read', 'update', 'delete' ],
    },

};

export const employeeSeedData = {
    name: 'employee 1',
    role: 'CEO',
    parent: '',
    ancestors: []

};
