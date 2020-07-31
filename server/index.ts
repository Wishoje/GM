import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import config from './ormconfig';
import UsersController from './controllers/UsersController';
import UsersPostsController from './controllers/UsersPostsController';
import CategoriesCotroller from './controllers/CategoriesController';
import AuthenticationController from './controllers/AuthenticationController';
import TwitchController from './controllers/TwitchController';
import validateEnv from './utils/validateEnv';

(async () => {
	try {
		const connection = await createConnection(config);
		await connection.runMigrations();
	} catch (error) {
		console.log('Error while connecting to the database', error);
		return error;
	}

	validateEnv();

	const app = new App(
		[
			new UsersController(),
			new UsersPostsController(),
			new CategoriesCotroller(),
			new AuthenticationController(),
			new TwitchController()
		],
	);
	app.start();
})();