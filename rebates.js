

 export function calcRebate(age, tbl) {

    let reb = 0;
    for (let [age_limit, rebate] of tbl) {
        
        console.log(`Age ${age_limit}, Rebate ${rebate}`);
        
        if(age_limit<=age){
            reb += rebate;
        }
        console.log(`Actual age: ${age}, Reb: ${reb}`)
    }

    return reb;
}
