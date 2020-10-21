const permissions = {
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: [],
    },

    'getProduct': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: ['manager'],
    }
}

const hasPermissions = (moduleName, role, permissionType) => {
    if (permissions[moduleName].all.includes(role)){
        console.log("true")
    }
    else if (permissions[moduleName][permissionType].includes(role)){
          console.log("true")
        }
    else{
        console.log("false")
    }
    
    }
     
hasPermissions("getUsers", "head-trainer", "read")