import * as bcrypt from 'bcrypt';
import PermissionsRepository from '../repositories/permissions/PermissionsRepository';
import IPermissions from '../entities/IPermissions';

const saltRounds = 10;
export const createHash = (passwordInString: string) => {
    return bcrypt.hash(passwordInString, saltRounds);
};

const permissionsRepository: PermissionsRepository = new PermissionsRepository();
export const isAuthorized = async (email: string, attrb: string, action: string): Promise<boolean> => {
    try {
        const allPermissions: IPermissions = await permissionsRepository.findOne({email});
        if (!allPermissions) return false;
        const { resources } = allPermissions;
        return resources[attrb]?.includes(action) ? true : false;
    } catch (err) {
        console.log(err);
        return false;
    }
};
