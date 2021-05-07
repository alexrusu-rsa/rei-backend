import { WalletRouter } from './routers/wallet.router';
import { ResponseWrapperService } from './services/response-wrapper.service';
import { WalletService } from './services/wallet.service';

const walletService: WalletService = new WalletService();
const responseWrapperService: ResponseWrapperService = new ResponseWrapperService();

const walletRouter: WalletRouter = new WalletRouter();

export { responseWrapperService, walletService, walletRouter };
