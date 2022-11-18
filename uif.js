export function calcIUF(mthly_earn, uif_limit){
    let uif = mthly_earn * 0.01;
    if(mthly_earn>=uif_limit){
        uif = 177.12;
    }    
    return uif;
}