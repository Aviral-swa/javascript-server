const users = [
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


const validateEmail = (email) => {
    const regex = /\w+[.]\w+@successive.tech$/i;
    return regex.test(email)
}


const validateUsers = (user) =>{
    const validUsers = [];
    const invalidUsers = [];
    user.forEach(({traineeEmail, reviewerEmail}) => {
            validateEmail(traineeEmail) ? validUsers.push(traineeEmail) : invalidUsers.push(traineeEmail)
            validateEmail(reviewerEmail) ? validUsers.push(reviewerEmail) : invalidUsers.push(reviewerEmail)
        }
    )
    console.log(`There are ${validUsers.length} valid users:`, validUsers)
    console.log(`There are ${invalidUsers.length} invalid users:`, invalidUsers)
    
}
validateUsers(users)