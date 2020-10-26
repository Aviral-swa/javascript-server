interface IPermissions {
    getUsers: GetUsers;
    getProduct: GetProduct;
}
type GetUsers = {
    all: string[],
    read: string[],
    write: string[],
    delete: string[]
};

type GetProduct = {
    all: string[],
    read: string[],
    write: string[],
    delete: string[]
};


interface IUsers {
    [index: number]: {traineeEmail: string; reviewerEmail: string};
}