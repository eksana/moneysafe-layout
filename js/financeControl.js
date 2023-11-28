import { convertStringToNumber } from "./helper.js";
import { getData, postData } from "./servise.js";

const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');
// const financeReport = document.querySelector('.finance__report');
// const report = document.querySelector('.report');
// const reportClose = document.querySelector('.report__close');
// const reportOperatonList = document.querySelector('.report__operaton-list');
// const typesOperation = {

//     income: "доход",
//     expenses: "расход",
// };
// const reportDates = document.querySelector('.report__dates');
const addNewOperatjin =
    async (event) => {
        event.preventDefault();
        const typeOperation = event.submitter.dataset.typeOperation;
        //const changeAmount = financeForm.amount.value;

        // читаем поля из формы с помощью new FormData и добавляем новое  поле type
        const financeFormDate = Object.fromEntries(new FormData(financeForm));
        financeFormDate.type = typeOperation;
        console.log('financeFormDate:', financeFormDate);

        const newOperation = await postData("/finance", financeFormDate)
        console.log("newOperation:", newOperation)

        //const changeAmount = Math.abs(convertStringToNumber(financeForm.amount.value));
        const changeAmount = Math.abs(convertStringToNumber(newOperation.amount));
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
        // console.log(typeOperation);
        // console.time();
        // console.timeEnd();
        financeForm.reset();
    }


let amount = 0;
financeAmount.textContent = amount;

export const financeControl = async () => {
    const operations = await getData('/finance');

    amount = operations.reduce((acc, item) => {
        if (item.type === 'income') {
            acc += convertStringToNumber(item.amount);

        }
        if (item.type === 'expenses') {
            acc -= convertStringToNumber(item.amount);

        }
        return acc;
    }, 0)
    financeAmount.textContent = `${amount.toLocaleString()} ₽`;

    financeForm.addEventListener('submit', addNewOperatjin)

}
