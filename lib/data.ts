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
    date: dayjs(Date.now()),
    times: 2,
    recurring: false,
}

export {
    CategoryTypeDict,
    TransactionDefaultData
}