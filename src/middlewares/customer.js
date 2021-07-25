import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
	const { Customer, Address } = db;
	return {
		createCustomer: async (req, res, next = null) => {
			const { body: { data } } = req;
			try{
				await Customer.create(data);
				next();

			}catch(e) {
				response(res,res)(
					{ data: null },
					new ResponseError('server.error', 500, req.translate, 'server.error')
				)
			}
		}
	}
}
