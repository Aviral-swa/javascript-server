import IVersionableDocument from '../versionable/IVersionableDocument';

export default interface IPermissionsModel extends IVersionableDocument {
    email: string;
    resources: {};
}
