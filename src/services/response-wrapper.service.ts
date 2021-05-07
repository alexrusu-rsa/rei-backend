import { IWrappedResponse } from '../models/wrapped-response.model';

export class ResponseWrapperService {
	wrapOk(payload: any): IWrappedResponse {
		return {
			data: payload,
		};
	}

	wrapException(error: any): IWrappedResponse {
		return {
			status: 'error',
			message: error.message,
			typeId: error.typeId,
		};
	}
}
