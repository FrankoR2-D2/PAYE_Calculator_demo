export function calcTax  (table, annual_earnings)  {
    let  min = 0;
    let tax = 0;
    let range = 0;
    let taxable_income = 0;
    for(let [percent, max] of table){
        
        if(min < annual_earnings){
            range = max-min;
            taxable_income = annual_earnings-min;
            if (range < 0) range = taxable_income;
            tax += Math.min(range, taxable_income )*(percent/100);
            console.log(percent, min, range, taxable_income,  tax);
            min = max;

        }
    }
    return tax;
} 