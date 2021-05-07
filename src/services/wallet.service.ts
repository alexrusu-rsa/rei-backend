import * as wallets from '../mock/wallets.json';
import { Wallet } from '../models/wallet.model';

export class WalletService {
	getWallets(): Wallet[] {
		return wallets;
	}
}
