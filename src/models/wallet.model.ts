export interface Transaction {
	amount?: number;
	reference?: string;
}

export interface Wallet {
	id?: number;
	name: string;
	balance?: number;
	transactions?: Transaction[];
	transactionsTotal?: number;
}
