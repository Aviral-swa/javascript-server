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


const validateUsers = (arr) =>{
    let validUsers = [];
    let invalidUsers = [];
    arr.forEach(function (user) {
        const {traineeEmail,reviewerEmail} = user; 
        if (validateEmail(traineeEmail)){
            validUsers.push(traineeEmail)
        }
        else{
            invalidUsers.push(traineeEmail)
        }
        if(validateEmail(reviewerEmail)){
            validUsers.push(reviewerEmail)
        }
        else{
            invalidUsers.push(reviewerEmail)
        }
    })

    let countValid = validUsers.length;
    let countInvalid = invalidUsers.length;
    console.log(`There are ${countValid} valid users:`, validUsers)
    console.log(`There are ${countInvalid} invalid users:`, invalidUsers)
    
}
validateUsers(users)