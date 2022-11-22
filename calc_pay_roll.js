//Required functions and values as passed through parameters for display() function
import { accumulateByRate, cappedAmmount } from "./paye.js";
import { tax_rates as rates, rebates, annualize, deannualize } from "./tax_rates.js";
import { lookupAccumulatedTableValue } from "./paye.js";
import { monthly_uif_limit, uif_rate } from "./tax_rates.js";


// let paye_commands = ['assign', 'annualize', 'calculateRebate', 'calculateCappedUIF', 'calculateMonthlyUIF', 'calculateRawTax',
// 'calculateTaxAfterRebate', 'calculateMonthlyTaxAfterRebate', 'calculateTakeHomePay'];

export function ExecutePayroll(x_periods, monthly_earnings, age) {
    this.execute('assign', x_periods);
    this.execute('calcAnnualEarnings', monthly_earnings);
    this.execute('calculateRebate', age);
    this.execute('calculateCappedUIF', monthly_earnings);
    this.execute('calculateMonthlyUIF',);
    this.execute('calculateRawTax');
    this.execute('calculateTaxAfterRebate');
    this.execute('calculateMonthlyTaxAfterRebate');
    this.execute('calculateTakeHomePay', monthly_earnings);

    console.log(this);

}

ExecutePayroll.prototype = {
    execute: function (paye_command) {
        let args = Array.from(arguments).slice(1);

        let command = paye_command;

        if (this[command]) {
            this[command](args);
        }
    },
    assign: function (x_periods) {
        console.log(x_periods);
        this.num_period = x_periods;
        console.log(`num_period: ${this.num_period}`);
    },

    deannualize: function (ammount) {
        let res = ammount / this.num_period;
        return res;
    },
    annualize: function (ammount) {
        let annual = ammount * this.num_period;
        return annual;
    },

    calcAnnualEarnings: function (monthly_earnings) {
        this.annual_earnings = this.annualize(monthly_earnings);
    },
    calculateRebate: function (age) {
        this.rebate = lookupAccumulatedTableValue(age, rebates);
    },
    calculateCappedUIF: function (monthly_earnings) {
        this.cappedUIFAmmount = cappedAmmount(monthly_earnings, monthly_uif_limit);
    },
    calculateMonthlyUIF: function () {
        this.mthly_uif = this.cappedUIFAmmount * uif_rate;
    },

    calculateRawTax: function () {
        this.raw_tax = accumulateByRate(rates, this.annual_earnings);
    },

    calculateTaxAfterRebate: function () {
        this.tax_after = this.raw_tax - this.rebate;
    },

    calculateMonthlyTaxAfterRebate: function () {
        this.mthly_tax_after = this.deannualize(this.tax_after);
    },
    calculateTakeHomePay: function (monthly_earnings) {
        this.take_home_pay = monthly_earnings - this.mthly_tax_after - this.mthly_uif;
    },

}










// --------------- TO DEL ----------------------

export function calcPayRoll(x_periods, monthly_earnings, age) {

//naming functions be generic and descriptive
    const num_period = x_periods; //
    const annual_earnings = annualize(monthly_earnings, num_period);
    const rebate = lookupAccumulatedTableValue(age, rebates); // tableAccumulate 
    const cappedUIFAmmount = cappedAmmount(monthly_earnings, monthly_uif_limit);
    const mthly_uif =  cappedUIFAmmount*uif_rate;
    const raw_tax = accumulateByRate(rates, annual_earnings);
    const tax_after = raw_tax - rebate;
    const mthly_tax_after = deannualize(tax_after, num_period);
    const take_home_pay = monthly_earnings - mthly_tax_after - mthly_uif;

// paye_commands = ['assign', 'annualize', 'calculateRebate', 'calculateCappedUIF', 'calculateMonthlyUIF', 'calculateRawTax',
                        // 'calculateTaxAfterRebate', 'calculateMonthlyTaxAfterRebate', 'calculateTakeHomePay']

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




