export const permissions = {
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
}

export const users = [
    {
        traineeEmail: 'aviral.swarnkar@successive.tech',
        reviewerEmail: 'avinash.thube@successive.tech'
    },
    
    {
        traineeEmail: 'mudit.rajput@live.in' ,
        reviewerEmail: 'yogesh.singh@successive.tech'
    },
    
    {
        traineeEmail: 'nikhil.rawat@gmail.com',
        reviewerEmail: 'shalu.sharma@successive.tech'
    }
    
];
