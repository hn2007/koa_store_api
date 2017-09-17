/**
 * Response middleware for koajs
 *
 * @author Nick Rucci <nick@rucci.io>
 * @link https://github.com/potatogopher/koa-response-handler
 */

/**
 * Status codes
 *
 *
 */

const statusCodes = {
	CONTINUE: 100,
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	REQUEST_TIME_OUT: 408,
	IM_A_TEAPOT: 418,
	UNPROCESSABLE_ENTITY: 422,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIME_OUT: 504,
	
};

module.exports = (opts = {}) => {
	const { contentType = 'text/plain' } = opts;
	
	return async (ctx, next) => {
		// 100 CONTINUE
		ctx.res.continue = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.CONTINUE;
		};
		
		// 200 OK
		ctx.res.ok = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.OK;
		};
		
		// 201 CREATED
		ctx.res.created = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.CREATED;
		};
		
		// 202 ACCEPTED
		ctx.res.accepted = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.ACCEPTED;
		};
		
		// 204 NO CONTENT
		ctx.res.noContent = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.NO_CONTENT;
		};
		
		// 400 BAD REQUEST
		ctx.res.badRequest = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.BAD_REQUEST;
		};
		
		// 401 UNAUTHORIZED
		ctx.res.unauthorized = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.UNAUTHORIZED;
		};
		
		// 403 FORBIDDEN
		ctx.res.forbidden = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.FORBIDDEN;
		};
		
		// 404 NOT FOUND
		ctx.res.notFound = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.NOT_FOUND;
		};
		
		// 408 REQUEST TIME OUT
		ctx.res.requestTimeOut = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.REQUEST_TIME_OUT;
		};
		
		// 418 I'M A TEAPOT
		ctx.res.teapot = (res = 'I\'m a teapot') => {
			ctx.type = contentType;
			ctx.body.body = res;
			ctx.status = statusCodes.IM_A_TEAPOT;
		};
		
		// 418 I'M A UNPROCESSABLE ENTITY
		ctx.res.unprocessableEntity = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.UNPROCESSABLE_ENTITY;
		};
		
		// 500 INTERNAL SERVER ERROR
		ctx.res.internalServerError = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
		};
		
		// 501 NOT IMPLEMENTED
		ctx.res.notImplemented = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.NOT_IMPLEMENTED;
		};
		
		// 502 BAD GATEWAY
		ctx.res.badGateway = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.BAD_GATEWAY;
		};
		
		// 503 SERVICE UNAVAILABLE
		ctx.res.serviceUnavailable = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.SERVICE_UNAVAILABLE;
		};
		
		// 504 GATEWAY TIME OUT
		ctx.res.gatewayTimeOut = (res, msg) => {
			ctx.type = contentType;
			ctx.body = { body: res, message: msg };
			ctx.status = statusCodes.GATEWAY_TIME_OUT;
		};
		
		return next();
	};
};
