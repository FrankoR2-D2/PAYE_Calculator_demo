

let table = [[18, 226000], [26, 353100], [31, 488700], [36, 641400], [39, 817600], [41, 1731600], [45, -1]];




const payeForm = document.getElementById('paye_form');

payeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let monthly_earnings = document.getElementById('salary').value;
    let age = document.getElementById('age').value;
    calcTax(table, monthly_earnings * 12);
});



let calcTax = (table, annual_earnings) => {
    let tax, min, range, taxable_income = 0 
     for(let idx in table){
        if(min <+ annual_earnings){

            range = table[idx][1]-min;
            min = table[idx][1];
            taxable_income = annual_earnings-min;
            tax += Math.min(range, tax )*(table[idx][0]/100);
            console.log(min, annual_earnings, tax);
        }
    }
    return tax;
} 
