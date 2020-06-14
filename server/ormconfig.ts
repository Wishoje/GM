import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'admin',
	password: 'admin',
	database: 'GM',
	synchronize: true,
	logging: true,
	entities: [
		__dirname + '/../**/*.entity{.ts,.js}',
	],
	migrations: [
		'src/migrations/*{.ts,.js}',
	],
	cli: {
		migrationsDir: 'src/migrations',
	},
};

export = config;