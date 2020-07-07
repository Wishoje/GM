import { ConnectionOptions } from 'typeorm';

const EMC = {
	synchronize: true,
	entities: [
		__dirname + '/entities/*.entity{.ts,.js}',
	],
	migrations: [
		'/migrations/*{.ts,.js}',
	],
	cli: {
		migrationsDir: '/migrations',
	},
}

const config: Record<string, ConnectionOptions> = {
	development: {
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'admin',
		password: 'admin',
		database: 'GM',
		logging: true,
		...EMC
	},
	production: {
		url: process.env.DATABASE_URL,
		type: 'postgres',
		...EMC
	}
};

const envConfig = config[process.env.NODE_ENV || 'development']

export default envConfig;