export async function GET() {
    return {
        status: 200,
        headers: {
        "content-type": "application/json",
        },
        body: {
        categories: [
            {
            id: 1,
            name: "Alimentação",
            type: "Despesa",
            parent: 0,
            color: "#ff0000",
            icon: "local_dining",
            slug: "alimentacao",
            },
            {
            id: 2,
            name: "Salário",
            type: "Receita",
            parent: 0,
            color: "#00ff00",
            icon: "account_balance",
            slug: "salario",
            },
            {
            id: 3,
            name: "Transporte",
            type: "Despesa",
            parent: 0,
            color: "#0000ff",
            icon: "directions_bus",
            slug: "transporte",
            },
            {
            id: 4,
            name: "Lazer",
            type: "Despesa",
            parent: 0,
            color: "#ff00ff",
            icon: "sports_esports",
            slug: "lazer",
            },
            {
            id: 5,
            name: "Investimento",
            type: "Receita",
            parent: 0,
            color: "#00ffff",
            icon: "monetization_on",
            slug: "investimento",
            },
        ],
        },
    };
    }
    