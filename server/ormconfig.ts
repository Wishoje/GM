import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
	host: 'ec2-18-214-211-47.compute-1.amazonaws.com',
	database: 'd8djh3l2mro22a',
	username: 'gycdkioujcqecw',
	port: 5432,
	password: '6dd499e2a5ddab249d0c9134e4bced8cca0c66d4da103b2452689ce74f8c05cd',
	url: process.env.DATABASE_URL,
	type: 'postgres',
	synchronize: true,
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