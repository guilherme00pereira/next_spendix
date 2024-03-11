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
    in_installments: false,
    installments: 2,
    payment_date: dayjs(Date.now()),
    payed_amount: 0,
    payment_method_id: 1,
    payment_id: null,
}

export {
    CategoryTypeDict,
    TransactionDefaultData
}