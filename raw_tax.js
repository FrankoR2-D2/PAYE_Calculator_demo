
//tax rates array, annual earnings passed through parameters for function to calculate the tax which is returned.
export function calcTax(table, annual_earnings) {
    let min = 0;
    let tax = 0;
    // iterates through tax_rates array
    for (let [percent, max] of table) {

        //checks if annual earnings does not exceed last tax bracket limit
        if (min < annual_earnings) {
            const taxable_income = annual_earnings - min; // taxable income per bracket
            const range = max < min ? taxable_income: max - min ;
            tax += Math.min(range, taxable_income) * (percent / 100); //takes taxable income per rate and accumulates the tax

        }
        min = max; // max of the current bracket is the minimum of next bracket

    }
    return tax;
} 