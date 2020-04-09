import HttpException from "./HttpException";

class PostNotFoundException extends HttpException {
	constructor(id: string) {
	super(404, `Page Not Found`);
	}
}

export default PostNotFoundException;