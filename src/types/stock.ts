export type Price = {
    currency: string;
    amount: number;
}
export type Stock = {
    name: string;
    price: Price;
    percent_change: number;
    volume: number;
    symbol: string;
}
export type APIResponse = {
    stock: [Stock];
    as_of: string;
}
