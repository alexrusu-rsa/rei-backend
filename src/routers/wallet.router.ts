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

		router.post('/', async (ctx: Context) => {
			try {
				const walletResponse: Wallet = walletService.saveWallet(
					ctx.request.body.name
				);
				if (walletResponse) {
					ctx.status = 200;
					ctx.body = responseWrapperService.wrapOk(walletResponse);
				} else {
					ctx.status = 500;
					ctx.body = responseWrapperService.wrapException({
						message: `The walletName: ${ctx.request.body.name} property does not respect the format`,
					});
				}
			} catch (e) {
				ctx.status = 422;
				ctx.body = responseWrapperService.wrapException(e);
			}
		});

		router.put('/', async (ctx: Context) => {
			try {
				const walletResponse: Wallet = walletService.addTransaction(
					ctx.request.body.name,
					ctx.request.body.transaction
				);
				if (walletResponse) {
					ctx.status = 200;
					ctx.body = responseWrapperService.wrapOk(walletResponse);
				} else {
					ctx.status = 422;
					ctx.body = responseWrapperService.wrapException({
						message: `The walletName: ${ctx.request.body.name} property does not respect the format`,
					});
				}
			} catch (e) {
				ctx.status = 500;
				ctx.body = responseWrapperService.wrapException(e);
			}
		});

		return router;
	}
}
