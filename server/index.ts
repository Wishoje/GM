import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import * as config from './ormconfig';
import UsersController from './controllers/UsersController';
import UsersPostsController from './controllers/UsersPostsController';

(async () => {
	try {
		const connection = await createConnection(config);
		const util = require('util');
		console.log('AAAAAAAAAA' + util.inspect(connection, false, null, true /* enable colors */));
		await connection.runMigrations();
	} catch (error) {
		console.log('Error while connecting to the database', error);
		return error;
	}
	const app = new App(
		[
			new UsersController(),
			new UsersPostsController()
		],
	);
	app.start();
})();