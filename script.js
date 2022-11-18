
import { calcTax } from "./raw_tax.js";
import { tax_rates as rates, rebates } from "./tax_rates.js";
import { calcRebate } from "./rebates.js";
import { monthly_uif_limit } from "./tax_rates.js";
import { calcIUF } from "./uif.js";

const payeForm = document.getElementById('paye_form');


payeForm.addEventListener('submit', (e) => {

    e.preventDefault();
    let monthly_earnings = document.getElementById('salary').value;
    let age = document.getElementById('age').value;
    console.log(`Rebate ${calcRebate(age, rebates)}`);
    console.log(calcTax(rates, monthly_earnings * 12));
    console.log(`UIF: ${calcIUF(monthly_earnings, monthly_uif_limit)}`);
    display(monthly_earnings*12, calcRebate(age, rebates),calcIUF(monthly_earnings, monthly_uif_limit), calcTax(rates, monthly_earnings*12))
});

function display(annual_earnings, rebate,uif, tax){
    document.getElementById('annual_earnings').innerHTML = annual_earnings;
    document.getElementById('rebate').innerHTML = rebate;
    document.getElementById('mthly_uif').innerHTML = uif;
    document.getElementById('raw_tax').innerHTML = tax;
    document.getElementById('tax_after').innerHTML = tax - rebate;
    document.getElementById('mthly_tax_after').innerHTML = (tax - rebate)/12;
    document.getElementById('take_home_pay').innerHTML = (annual_earnings/12) - (tax - rebate)/12 - uif;
}








