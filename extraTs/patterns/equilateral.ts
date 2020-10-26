export default function equilateral(rows: number): void {
    if (rows >= 2 && rows <= 10) {
        console.log('print equilateral of row: ', rows);
        let s: string = '';
        let j: number = rows;
        for (let i = 1; i <= rows; i++) {
            s = '  '.repeat(j);
            console.log(s, ' *  '.repeat(i));
            s = '';
            j--;
        }
    }
    else {
        console.log('range must be from 2 to 10');
    }
}