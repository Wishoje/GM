import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import * as config from './ormconfig';
import UsersController from './controllers/UsersController';
import UsersPostsController from './controllers/UsersPostsController';
import CategoriesCotroller from './controllers/CategoriesController';
import AuthenticationController from './controllers/AuthenticationController';

(async () => {
	try {
		const connection = await createConnection(config);
		await connection.runMigrations();
	} catch (error) {
		console.log('Error while connecting to the database', error);
		return error;
	}
	const app = new App(
		[
			new UsersController(),
			new UsersPostsController(),
			new CategoriesCotroller(),
			new AuthenticationController()
		],
	);
	app.start();
})();