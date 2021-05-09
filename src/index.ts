import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as cors from '@koa/cors';
import { walletRouter } from './dependecies';
import * as bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router().use(walletRouter.getRouter().routes());

app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.routes());

app.listen(process.env.PORT || 3000, () => {
	// tslint:disable-next-line:no-console
	console.log('Koa started');
});
