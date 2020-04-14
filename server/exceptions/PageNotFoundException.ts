import HttpException from "./HttpException";

class PageNotFoundException extends HttpException {
	constructor(id: string) {
		super(404, `Page Not Found`);
	}
}

export default PageNotFoundException;