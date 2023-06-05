//age and rebates (array) required parameters to return the calculated rebate
// example of tbl =[[65,16425],[75,9000], [-1,2997]];
// the left value is the limit and the added amount is the right value in two dimensional array
export function lookupAccumulatedTableValue(capped_value, tbl) {
    let reb = 0; // the rebate value that will be returned
    let min = 0; // initial cap 
    for (let [age_limit, rebate] of tbl) {
        if (min <= capped_value){
            reb += rebate;
        }
        min = age_limit;
    }

    return reb;
}



//Returns value if the vaule exceeds capped ammount
// use 0.01 in tax_rates and before this function 
export function cappedAmmount(value, limit){
    if(value >= limit) {
        return limit; 
    }
    return value;
}






//Tax rates array, annual earnings passed through parameters for function to calculate the tax which is returned.
// example of table = [[18, 226000], [26, 353100], [31, 488700], [36, 641400], [39, 817600], [41, 1731600], [45, -1]];
export function accumulatedValueByRate(table, amount) { // 
    let min = 0;
    let tax = 0;
    // iterates through tax_rates array
    for (let [percent, max] of table) {

        //checks if annual earnings does not exceed last tax bracket limit
        if (min < amount) {
            const taxable_income = amount - min; // taxable income per bracket
            const range = max < min ? taxable_income: max - min ;
            tax += Math.min(range, taxable_income) * (percent / 100); //takes taxable income per rate and accumulates the tax

        }
        min = max; // max of the current bracket is the minimum of next bracket

    }
    return tax;
} 