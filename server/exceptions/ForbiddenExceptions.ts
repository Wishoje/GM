import HttpException from "./HttpException";

class ForbiddenException extends HttpException {
	constructor(message: string) {
		super(403, message);
	}
}

export default ForbiddenException;