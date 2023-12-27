export interface CategoryDAO {
    id: number;
    name: string;
    type: "Receita" | "Despesa Fixa" | "Despesa Variável" | null;
}