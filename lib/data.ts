import dayjs from "dayjs";


const CategoryTypeDict = [
    {
        value: 'Receita',
        label: "Receita"
    },
    {
        value: 'Despesa Fixa',
        label: "Despesa Fixa"
    },
    {
        value: 'Despesa Variável',
        label: "Despesa Variável"
    }
];
const TransactionDefaultData = {
    amount: 0,
    category_id: 3,
    cashed: true,
    description: "",
    due_date: dayjs(Date.now()),
    times: 2,
    recurring: false,
    payment_date: dayjs(Date.now()),
    payed_amount: 0,
    payment_option_id: 3,
}

export {
    CategoryTypeDict,
    TransactionDefaultData
}