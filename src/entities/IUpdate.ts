export default interface IUpdate {
    originalId: string;
    dataToUpdate: updateData;
}
type updateData = {
    resources: {
        [key: string]: []
    };
};
