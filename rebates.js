
//age and rebates (array) required parameters to return the calculated rebate
 export function calcRebate(age, tbl) {

    let reb = 0;
    let min = 0;
    for (let [age_limit, rebate] of tbl) {
        
        if (min < age){
            reb += rebate;
            
        }
        min = age_limit;
    }

    return reb;
}
