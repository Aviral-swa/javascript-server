const permissions = {
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

const hasPermissions = (moduleName, role, permissionType) => {
    try{
        if (permissions[moduleName].all.includes(role)){   //To check if ${role} has 'all' permission and return true 
                console.log(`${role} has all permissions`)                  //else move to the next condition
                return true
        }
        else if (permissions[moduleName][permissionType].includes(role)){
                console.log(`${role} has ${permissionType} permissions`)
                return true
            }
        else{
                console.log(`${role} does not has ${permissionType} permissions`)
                return false
            }
        }
    catch(err) {
        console.log("Enter valid moduleName: " + err)
        }
}
 
hasPermissions("getProduct", "manager", "all")
hasPermissions("getRelations", "developmentTeam", "write")
hasPermissions("getUsers", "head-trainer", "write")
hasPermissions("getUsers", "trainee", "read")