export default function validateEmail(email: string): boolean {
    const regex = /\w+[.]\w+@successive.tech$/i;
    return regex.test(email);
}