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
        if (permissions[moduleName].all.includes(role) || permissions[moduleName][permissionType].includes(role)){  
                console.log(`${role} has ${permissionType} permissions`)                  
                return true
        }
        
          console.log(`${role} does not has ${permissionType} permissions`)
            return false         
    } 
    catch(err) {
        console.log(`TypeError: ${moduleName} is not a valid moduleName`)
    }
   
}
 
hasPermissions("getProduct", "manager", "all")
hasPermissions("getRelations", "developmentTeam", "write")
hasPermissions("getUsers", "head-trainer", "write")
hasPermissions("getUsers", "trainee", "all")