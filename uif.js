//Exports calcUIF function - the monthly uif is returned after monthly earnings and uif_limit is passed through.
export function calcIUF(mthly_earn, uif_limit){
    let uif = mthly_earn * 0.01;
    if(mthly_earn>=uif_limit){
        uif = 177.12;
    }    
    return uif;
}