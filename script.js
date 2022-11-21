
import { calcPayRoll } from "./calc_pay_roll.js";

const payeForm = document.getElementById('paye_form');

//instructions after submit button is clicked
payeForm.addEventListener('submit', (e) => {

    e.preventDefault(); 

    // Gets age and monthly_earnings from form
    let monthly_earnings = document.getElementById('salary').value;
    let age = document.getElementById('age').value;

    //Calculates the take home pay, rebate, uif and tax
    const result = calcPayRoll(monthly_earnings, age);

    //displays to index.html
    display(result);
});


//Output calculated tax
function display(result){
    document.getElementById('annual_earnings').innerHTML = result.annual_earnings; 
    document.getElementById('rebate').innerHTML = result.rebate;
    document.getElementById('mthly_uif').innerHTML = result.mthly_uif;
    document.getElementById('raw_tax').innerHTML = result.raw_tax;
    document.getElementById('tax_after').innerHTML = result.tax_after; 
    document.getElementById('mthly_tax_after').innerHTML = result.mthly_tax_after;
    document.getElementById('take_home_pay').innerHTML = result.take_home_pay;
}








