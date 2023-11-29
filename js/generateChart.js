const reportChart = document.querySelector('.report__chart');
export const clearChat = () => {
    reportChart.textContent = '';

};

export const generateChart = (data) => {

    const incomeData = data.filter((item) => item.type === "income");
    const expensesData = data.filter((item) => item.type === "expenses");

    const chartLabel = [...new Set(data.map(item => item.date))];

    //let accIncome = 0;
    //let accExpenses = 0;

    const accIncome = chartLabel.reduce(date => {

        const total = incomeData
            .filter(item => item.date === date)
            .reduce((acc, record) => acc + parseFloat(record.amount), 0);
        return acc + total
    }, 0)

    const accExpenses = chartLabel.reduce(date => {

        const total = expensesData
            .filter(item => item.date === date)
            .reduce((acc, record) => acc + parseFloat(record.amount), 0);
        return acc + total
    }, 0)
    console.log(accIncome, accExpenses);
};