import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as logger from 'koa-logger';
import * as json from 'koa-json';
import { walletRouter } from './dependecies';

const app = new Koa();
const router = new Router().use(walletRouter.getRouter().routes());

app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
	// tslint:disable-next-line:no-console
	console.log('Koa started');
});
