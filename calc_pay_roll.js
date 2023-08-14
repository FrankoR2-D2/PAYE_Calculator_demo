// - naming of parameters like args
// - sort out period 
// - take_home_pay_1 and _2 and _final 
// 



//Required functions and values as passed through parameters for display() function
import { accumulatedValueByRate, cappedAmmount } from "./paye.js";
import { tax_rates as rates, rebates, annualize, deannualize } from "./tax_rates.js";
import { lookupAccumulatedTableValue } from "./paye.js";
import { monthly_uif_limit, uif_rate } from "./tax_rates.js";


// test data for classes. 
// let inputs = {}



class PayRollTasks {
    constructor() {
        if (!this.execute) {
            throw Error('Execute doesnt exist')
        }
    }
}


class Arithmetic extends PayRollTasks {
    constructor(value1, value2, operation, result) {
        super();
        this.value1 = value1;
        this.value2 = value2;
        this.operation = operation;
        this.result = result;
    }

    toString() {
        return `${this.result}=${this.value1}${this.operation}${this.value2}`
    }

}

class MapPayroll extends PayRollTasks {
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }
}

class Assign extends MapPayroll {
    constructor(key, value) {
        super(key, value);
    }
    execute(elements) {
        elements[this.key] = this.value;
        return elements;
    }
}

class ManipulateTable extends PayRollTasks {
    constructor(arg1, arg2, result) {
        super();
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.result = result;
    }
}

// Test Assign class
// let inputs_p = { period: 12 };
// const a = new Assign('period', 12);
// console.table(a.execute(inputs_p));

class Add extends Arithmetic {
    constructor(value1, value2, result) {
        super(value1, value2, '+', result)
    }
    execute(elements) {
        elements[this.result] = elements[this.value1] + elements[this.value2];
        return elements;
    }
}



// Test Add class
// const ad = new Add('x', 'y', '+', 'z');
let inputs = { x: 9, y: 3 };
// console.table(ad.execute(inputs))




class Subtract extends Arithmetic {
    constructor(value1, value2, result) {
        super(value1, value2, '-', result)
    }
    execute(elements) {
        elements[this.result] = elements[this.value1] - elements[this.value2];
        return elements;
    }
}



// // Test Subtract class:
// const s = new Subtract('x', 'y','-', 'z')
// console.table(s.execute(inputs));




class Multiply extends Arithmetic {
    constructor(value1, value2, result) {
        super(value1, value2, '*', result)
    }
    execute(elements) {
        elements[this.result] = elements[this.value1] * elements[this.value2];
        return elements;
    }
}

// Test Multiply class 
// const m = new Multiply('x', 'y','*', 'z');
// console.table(m.execute(inputs));


class Divide extends Arithmetic {
    constructor(value1, value2, result) {
        super(value1, value2, '/', result)
    }
    execute(elements) {
        elements[this.result] = elements[this.value1] / elements[this.value2];
        return elements;
    }
}

// Test Divide class 
// const d = new Divide('x', 'y','/', 'z');
// console.table(d.execute(inputs));


class Annualize extends ManipulateTable {
    constructor(ammount, period, result) {
        super(ammount, period, result);
    }
    execute(elements) {
        elements[this.result] = elements[this.arg1] * elements[this.arg2];
        return elements;
    }
}

// Test Annualize class
// const an = new Annualize('ammount', 'period', 'result');
// let inputs_a = { ammount: 30000, period: inputs_p['period'] };
// console.table(an.execute(inputs_a));

class Deanualize extends ManipulateTable {
    constructor(ammount, period, result) {
        super(ammount, period, result);
    }
    execute(elements) {
        elements[this.result] = elements[this.arg1] / elements[this.arg2];
        return elements;
    }
}

// Test Deannualize class
// const dn = new Deanualize('ammount', 'period', 'result');
// let inputs_d = { ammount: inputs_a['result'], period: inputs_p['period']};

// console.table(dn.execute(inputs_d));


class LookupAccumulatedTable extends ManipulateTable {
    constructor(capped_value, table, result) {
        super(capped_value, table, result);

    }
    execute(elements) {
        elements[this.result] = lookupAccumulatedTableValue(elements[this.arg1], elements[this.arg2]);
        return elements;
    }
}

// Test LookupAccumulatedTable
// const la = new LookupAccumulatedTable('capped', 'table', 'rebates');
// let inputs_l = { capped: 25, table: rebates };
// console.table(la.execute(inputs_l));



class CalculateCappedValue extends ManipulateTable {
    constructor(ammount, limit, result) {
        super(ammount, limit, result);
    }
    execute(elements) {
        elements[this.result] = cappedAmmount(elements[this.arg1], elements[this.arg2]);
        return elements;
    }
}

// Test CalculateCappedValue
// const cap = new CalculateCappedValue('ammount', 'limit', 'capped_ammount');
// const inputs_cap = { ammount: 30000, limit: monthly_uif_limit };
// console.table(cap.execute(inputs_cap));

class LookupAccumulatedValueByRate extends ManipulateTable {
    constructor(table, ammount, result) {
        super(table, ammount, result);
    }
    execute(elements) {
        elements[this.result] = accumulatedValueByRate(elements[this.arg1], elements[this.arg2]);
        return elements;
    }
}

// Test LookupAccumulatedValueByRate class
// const t = new LookupAccumulatedValueByRate('table', 'ammount', 'tax');
// const inputs_t = { table: rates, ammount: an.execute(inputs_a)['result'] }
// console.table(t.execute(inputs_t))




export function calcPayRoll(x_periods, monthly_earnings, age) {

    const commands = [
        new Assign('period', 12),
        new Annualize('ammount', 'period', 'annual_earnings'),
        new Assign('rebates', rebates),
        new LookupAccumulatedTable('age', 'rebates', 'rebate'),
        new CalculateCappedValue('ammount', 'limit', 'capped_result'),
        new Assign('uif_rate', uif_rate),
        new Multiply('capped_result', 'uif_rate', 'monthly_uif'),
        new LookupAccumulatedValueByRate('rates', 'annual_earnings', 'raw_tax'),
        new Subtract('raw_tax', 'rebate', 'tax_after_rebate'),
        new Deanualize('tax_after_rebate', 'period', 'monthly_tax_after_rebate'),
        new Subtract('ammount', 'monthly_tax_after_rebate', 'take_home_pay'),
        new Subtract('take_home_pay', 'monthly_uif', 'take_home_pay')
    ];

    let elements = {
        period: x_periods,
        age: age,
        ammount: monthly_earnings,
        rebates: rebates,
        rates: rates,
        limit: monthly_uif_limit,
    }

    for (let command of commands) {
        command.execute(elements);
    }

    return elements;

}

// calcPayRoll(12, 30000, 25);




// export function calcPayRoll(x_periods, monthly_earnings, age) {





//     //naming functions be generic and descriptive
//     const num_period = x_periods; // assign - specifies financial period
//     const annual_earnings = annualize(monthly_earnings, num_period); // annualize - converts ammount to yearly financial period
//     const rebate = lookupAccumulatedTableValue(age, rebates); // lookupAccumulatedTable - gets accumulated value from table
//     const cappedUIFAmmount = cappedAmmount(monthly_earnings, monthly_uif_limit); // calculateCappedValue - cappped ammount or limit is calculated
//     const mthly_uif = cappedUIFAmmount * uif_rate; // multiply - specific to SARS unemployment calculation
//     const raw_tax = accumulatedValueByRate(rates, annual_earnings); // lookupAccumulatedValueByRate - apportioned values by rate is accumulated
//     const tax_after = raw_tax - rebate; // minus - gets the difference between tax_after and rebate || calculateDifference
//     const mthly_tax_after = deannualize(tax_after, num_period); // deanualize - converts ammount back to monthly financial period
//     const take_home_pay = monthly_earnings - mthly_tax_after - mthly_uif; // subtract - subtracts deductions from ammount



//     const result = {
//         'annual_earnings': annual_earnings,
//         'rebate': rebate,
//         'mthly_uif': mthly_uif,
//         'raw_tax': raw_tax,
//         'tax_after': tax_after,
//         'mthly_tax_after': mthly_tax_after,
//         'take_home_pay': take_home_pay
//     };

//     return result;

// }




