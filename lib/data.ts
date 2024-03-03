import dayjs from "dayjs";


const CategoryTypeDict = [
    {
        value: 'Despesa',
        label: "Despesa"
    },
    {
        value: 'Receita',
        label: "Receita"
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
    payment_method: 1
}

export {
    CategoryTypeDict,
    TransactionDefaultData
}