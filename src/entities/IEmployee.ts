export default interface Iemployee {
    _id?: string;
    name: string;
    role: string;
    parent?: string;
    ancestors?: string[];
    __v?: number;
}
