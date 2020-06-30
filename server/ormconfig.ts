import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
	url: process.env.DATABASE_URL,
	type: 'postgres',
	synchronize: true,
	ssl: true,
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