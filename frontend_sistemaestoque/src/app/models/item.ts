export interface Item {
    id?: number; // Opcional para novos itens
    name: string;
    quantity: number;
    unitPrice: number;
    ncm: string; // Novo campo NCM
}