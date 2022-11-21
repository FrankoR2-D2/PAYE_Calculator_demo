

//SARS 2023 Income Tax Rates, Rebates, Thresholds and Monthly UIF limit. 
export const tax_rates = [[18, 226000], [26, 353100], [31, 488700], [36, 641400], [39, 817600], [41, 1731600], [45, -1]];
export const rebates =[[65,16425],[75,9000], [-1,2997]];
export const thresholds = [[65,91250], [75,141250], [-1,157900]];
export const monthly_uif_limit = 17712;
export const annual_uif_limit = 212544;
export const uif_rate = 0.01;

 // deanaunlize and anualize 
export function annualize(value, num_period){
    return value * num_period;
}

export function deannualize(value, num_period){
    return value/num_period; 
}