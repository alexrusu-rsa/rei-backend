export interface Transaction {
	sum?: number;
	reference?: string;
}

export interface Wallet {
	id: number;
	name: string;
	balance: number;
	transactions: Transaction[];
	transactionsTotal: number;
}
