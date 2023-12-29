export interface CategoryDAO {
    id: number;
    name: string;
    type: CategoryType;
}

export type CategoryType = "Receita" | "Despesa Fixa" | "Despesa Variável" | null;

export const CategoryTypeDict = [
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

export interface GroupDAO {
    id: number;
    name: string;
}