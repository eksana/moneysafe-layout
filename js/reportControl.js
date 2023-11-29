import { financeControl } from "./financeControl.js";
import { generateChart } from "./generateChart.js";
import { reformateDate } from "./helper.js";
import { delData, getData } from "./servise.js";



const typesOperation = {

    income: "доход",
    expenses: "расход",
};

let actualData = [];

const reportDates = document.querySelector('.report__dates');
const financeReport = document.querySelector('.finance__report');
const report = document.querySelector('.report');
const reportClose = document.querySelector('.report__close');
const reportOperatonList = document.querySelector('.report__operaton-list');
const generateChartButton = document.querySelector('#generateChartButton');

const closeReport = (e) => {

    let target = e.target;

    if (
        target.closest('.report__close') ||
        (!target.closest('.report') && target != financeReport)
    ) {
        report.classList.remove('report__open');
        document.removeEventListener('click', closeReport);
    }

    // if (
    //     target == reportClose
    // ) {
    //     report.classList.remove('report__open');
    // }


};

const openReport = () => {

    report.classList.add('report__open');

    document.addEventListener('click', closeReport)
}

const renderReport = (data) => {
    reportOperatonList.textContent = "Загрузка...";



    const reportRows = data.map(
        ({ category, amount, description, date, type, id }) => {
            const reportRow = document.createElement("tr");
            reportRow.classList.add('report__row');

            reportRow.innerHTML = `
                <td class="report__cell">${category}</td>
                <td class="report__cell">${amount.toLocaleString()} ₽</td>
                <td class="report__cell">${description}</td>
                <td class="report__cell">${reformateDate(date)}</td>
                <td class="report__cell">${typesOperation[type]}</td>
                <td class="report__action-cell">
                  <button
                    class="report__button report__button_table" data-id = ${id}>&#10006;</button>
                </td>
                `;

            return reportRow;
        });

    reportOperatonList.append(...reportRows);

}


export const reportControl = () => {

    reportOperatonList.addEventListener('click', async ({ target }) => {
        //console.log(target.dataset.id);
        const buttonDel = target.closest('.report__button_table');

        if (buttonDel) {

            await delData(`/finance/${buttonDel.dataset.id}`);
            const reportRow = buttonDel.closest('.report__row');
            reportRow.remove();
            financeControl();

            clearChat();
        }
    });

    financeReport.addEventListener('click', async () => {
        openReport();

        const data = await getData('/finance');
        //console.log(data)
        renderReport(data);

    });

    reportDates.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(reportDates));

        // const formData = new FormData(reportDates);
        // //console.log('formData': formData);
        // console.log('formData:', Object.fromEntries(formData));

        const searchParams = new URLSearchParams();

        if (formData.startDate) {
            searchParams.append('startDate', formData.startDate)
        }

        if (formData.endDate) {
            searchParams.append('endDate', formData.endDate)
        }

        const queryString = searchParams.toString();

        const url = queryString ? `/finance?${queryString}` : '/finance'
        actualData = await getData(url);
        //console.log(data)
        renderReport(actualData);
    });
}

generateChartButton.addEventListener('click', () => {
    generateChart(actualData);

})