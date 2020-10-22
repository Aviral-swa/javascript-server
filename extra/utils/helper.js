export default function validateEmail(email) {
    const regex = /\w+[.]\w+@successive.tech$/i;
    return regex.test(email)
}