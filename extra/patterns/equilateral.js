function equilateral(rows){
    if (rows >= 2 && rows <=10){
        let s= "";
        let j = rows;
        for(let i=1;i<=rows;i++){
            s = "  ".repeat(j);
            console.log(s,' *  '.repeat(i));
            s="";
            j--;
        }
    }
    else{
        console.log("range must be from 2 to 10")
    }
}

equilateral(process.argv[2])