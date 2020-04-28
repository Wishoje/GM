import HttpException from "./HttpException";

class UnathorizedException extends HttpException {
	constructor(message: string) {
		super(401, message);
	}
}

export default UnathorizedException;