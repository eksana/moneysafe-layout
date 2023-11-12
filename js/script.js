import { convertStringToNumber } from "./convertStringToNumber.js";

//alert('h)'
const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');

let amount = 0;
financeAmount.textContent = amount;

financeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const typeOperation = event.submitter.dataset.typeOperation;
    //const changeAmount = financeForm.amount.value;
    const changeAmount = Math.abs(convertStringToNumber(financeForm.amount.value));
    console.log(typeof changeAmount);
    let totalAmount = 0;

    if (typeOperation === 'income') {

        //amount = amount + changeAmount;
        amount += changeAmount;

    }

    if (typeOperation === 'expenses') {

        //amount = amount - changeAmount;
        amount -= changeAmount;

    }

    financeAmount.textContent = `${amount.toLocaleString()} ₽`;
    console.log(typeOperation);
    console.time();
    console.timeEnd();
})

