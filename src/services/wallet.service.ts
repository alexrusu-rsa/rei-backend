import * as fs from 'fs';
import { Transaction, Wallet } from '../models/wallet.model';

export class WalletService {
	wallets: Wallet[];

	constructor() {
		this.getWallets();
	}

	getWallets(): Wallet[] {
		const rawData = fs.readFileSync('src/mock/wallets.json');
		this.wallets = JSON.parse(rawData as any);

		return this.wallets;
	}

	saveWallet(walletName: string): Wallet {
		const wallet: Wallet = {
			name: walletName,
			balance: 0,
			transactions: [],
			transactionsTotal: 0,
			id: this.wallets.length + 1,
		};

		if (!this.validateWallet(wallet)) return null;

		this.getWallets();

		this.wallets.push(wallet);
		fs.writeFileSync('src/mock/wallets.json', JSON.stringify(this.wallets));

		return wallet;
	}

	addTransaction(walletName: string, transaction: Transaction): Wallet {
		if (!this.validateTransaction(transaction)) return null;

		const walletExistsIndex: number = this.wallets.findIndex(
			(_wallet) => _wallet.name === walletName
		);

		if (walletExistsIndex !== -1) {
			this.wallets[walletExistsIndex].transactions.push(transaction);
			this.wallets[walletExistsIndex].transactionsTotal++;
		} else throw new Error(`Wallet ${walletName} does not exist!`);

		fs.writeFileSync('src/mock/wallets.json', JSON.stringify(this.wallets));

		return this.wallets[walletExistsIndex];
	}

	private validateTransaction(transaction: Transaction): boolean {
		const alphanumeric = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
		if (!transaction.reference.match(alphanumeric))
			throw new Error('Transaction reference is not Alphanumeric!');

		if (transaction.reference.length > 8)
			throw new Error('Transaction reference longer than 8 digits!');

		if (transaction.amount === 0)
			throw new Error('Transaction amount cannot be equal with 0!');

		return true;
	}

	private validateWallet(wallet: Wallet): boolean {
		const alphanumeric = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
		if (!wallet.name.match(alphanumeric))
			throw new Error('Wallet name is not Alphanumeric!');

		if (wallet.name.length > 16)
			throw new Error('Wallet name longer than 16 digits!');

		const walletExists = this.wallets.find(
			(_wallet) => _wallet.name === wallet.name
		);
		if (!!walletExists) throw new Error('Wallet name already exists!');

		return true;
	}
}
