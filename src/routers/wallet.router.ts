import Router = require('koa-router');
import { Context } from 'vm';
import { responseWrapperService, walletService } from '../dependecies';
import { Wallet } from '../models/wallet.model';

export class WalletRouter {
	getRouter(): Router {
		const router: Router = new Router();

		router.get('/', async (ctx: Context) => {
			try {
				const response: Wallet[] = walletService.getWallets();
				ctx.status = 200;
				ctx.body = responseWrapperService.wrapOk(response);
			} catch (e) {
				ctx.status = 500;
				ctx.body = responseWrapperService.wrapException(e);
			}
		});

		return router;
	}
}
