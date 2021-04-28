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

export const adminSeedData = {
    name: 'Super Admin',
    email: 'sadmin@successive.tech',
    role: 'admin',
    password: configuration.traineePassword
};
export const trainerSeedData = {
    name: 'Head Trainer',
    email: 'trainer@successive.tech',
    role: 'head-trainer',
    password: configuration.trainerPassword
};

export const adminpermissionSeedData = {
    email: 'sadmin@successive.tech',
    resources: {
        trainee: ['create', 'read', 'update', 'delete' ],
        employee: ['create', 'read', 'update', 'delete' ],
        permissions: ['create', 'read', 'update', 'delete' ],
    },

};

export const trainerpermissionSeedData = {
    email: 'trainer@successive.tech',
    resources: {
        trainee: ['create', 'read', 'update' ],
        employee: ['create', 'read', 'update' ],
        permissions: ['read' ],
    },

};

export const traineepermissionSeedData = {
    email: 'trainee@successive.tech',
    resources: {
        trainee: ['read' ],
        employee: ['read' ],
        permissions: ['read' ],
    },

};

export const employeeSeedData = {
    name: 'employee 1',
    role: 'CEO',
    parent: '',
    ancestors: []

};
