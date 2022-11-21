//Required functions and values as passed through parameters for display() function
import { accumulateByRate, cappedAmmount} from "./paye.js";
import { tax_rates as rates, rebates, annualize, deannualize } from "./tax_rates.js";
import { accumulateTableUntilCapped } from "./paye.js";
import { monthly_uif_limit, uif_rate } from "./tax_rates.js";

export function calcPayRoll(monthly_earnings, age) {

//naming functions be generic and descriptive 
    const num_period = 12;
    const annual_earnings = annualize(monthly_earnings, num_period);
    const rebate = accumulateTableUntilCapped(age, rebates); // tableAccumulate 
    const cappedUIFAmmount = cappedAmmount(monthly_earnings, monthly_uif_limit);
    const mthly_uif =  cappedUIFAmmount*uif_rate;
    const raw_tax = accumulateByRate(rates, annual_earnings);
    const tax_after = raw_tax - rebate;
    const mthly_tax_after = deannualize(tax_after, num_period);
    const take_home_pay = monthly_earnings - mthly_tax_after - mthly_uif;

    const result = {
        'annual_earnings': annual_earnings,
        'rebate': rebate,
        'mthly_uif': mthly_uif,
        'raw_tax': raw_tax,
        'tax_after': tax_after,
        'mthly_tax_after': mthly_tax_after,
        'take_home_pay': take_home_pay
    };

    return result;

}




