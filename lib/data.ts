import dayjs from "dayjs";


const CategoryTypeDict = [
    {
        value: 'Despesa',
        label: "Despesa"
    },
    {
        value: 'Receita',
        label: "Receita"
    },
    {
        value: 'Transacao',
        label: "Transação"
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

const latinCharacters: { [key: string]: string } = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ã: "a",
    õ: "o",
    â: "a",
    ê: "e",
    î: "i",
    ô: "o",
    û: "u",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    ç: "c",
    ñ: "n",
    ü: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ã: "A",
    Õ: "O",
    Â: "A",
    Ê: "E",
    Î: "I",
    Ô: "O",
    Û: "U",
    À: "A",
    È: "E",
    Ì: "I",
    Ò: "O",
    Ù: "U",
    Ç: "C",
    Ñ: "N",
    Ü: "U",
};

export {
    CategoryTypeDict,
    TransactionDefaultData,
    latinCharacters
}