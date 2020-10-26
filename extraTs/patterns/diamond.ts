export default function diamond(rows: number): void {
    if (rows >= 2 && rows <= 10) {
        console.log('print diamond of row: ', rows);
        let s: string = '';
        let j: number = rows;
        for (let i = 1; i <= rows; i++) {
            s = '  '.repeat(j);
            console.log(s, ' *  '.repeat(i));
            s = '';
            j--;
        }

        j = 1;
        for (let i = rows; i >= 1; i--) {
            s = '  '.repeat(j);
            console.log(s, ' *  '.repeat(i));
            s = '';
            j++;
        }
    }
    else {
        console.log('range must be from 2 to 10');
    }
}