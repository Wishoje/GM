import * as express from 'express';
import { Nuxt, Builder } from 'nuxt';
import * as bodyParser from 'body-parser';
import errorMiddleware from './middleware/ErrorMiddleware';
import ControllerInteface from './interfaces/ControllerInterface';
import * as cookieParser from 'cookie-parser';
const nuxtConfig = require('../nuxt.config.js');

class App {
	public app: express.Application;
	public nuxt: any;
	public port: number;
	public host: string;
	public config: any;
 
	constructor(controllers: ControllerInteface[]) {
		this.app = express();
		this.config = nuxtConfig;
		this.initializeDevConfig();
		console.log('HERE');
		this.nuxt = new Nuxt(this.config);
		console.log('PORT : ' + this.port);
		console.log('HOST : ' + this.host);
		this.port = this.nuxt.options.server.port;
		this.host = this.nuxt.options.server.host;
		console.log('HOST 2: ' + this.host);

		this.initializeMiddlewares();
		this.initializeControllers(controllers);
	}

	private initializeDevConfig() {
		this.config.dev = process.env.NODE_ENV !== 'production';
	}

	private async initializeNuxt() {
		await this.nuxt.ready();
	}

	private async initializeNuxtBuilder() {
		if (this.config.dev) {
			const builder = new Builder(this.nuxt);
			await builder.build();
		}
	}

	// after nuxt
	private initializeMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use(cookieParser());
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private initializeNuxtRender() {
		this.app.use(this.nuxt.render)
	}

	private initializeControllers(controllers: ControllerInteface[]) {
		controllers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	}
 
	private listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}

	public async start() {
		this.initializeNuxt();
		this.initializeNuxtBuilder();

		// after nuxt builder attach middlewares
		this.initializeErrorHandling();

		// render app
		this.initializeNuxtRender();
		this.listen();
	} 
}
 
export default App;