import { getData } from "./servise.js";

const categoryList = document.querySelector('#categoryList');

const getCategories = (category) => {
    const option = document.createElement('option');
    option.value = category;
    return option;

}

export const datalistControl = async () => {
    categoryList.textContent = '';

    const categories = await getData('/categories');

    console.log('categories:', categories);

    const optionsIncome = categories.income.map(getCategories);
    const optionsExpenses = categories.expenses.map(getCategories);

    categoryList.append(...optionsExpenses, ...optionsIncome)

};