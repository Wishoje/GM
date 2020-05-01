import HttpException from "./HttpException";

class BadRequestException extends HttpException {
	constructor(message: string) {
		super(400, message);
	}
}

export default BadRequestException;