import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
	host: 'ec2-34-192-173-173.compute-1.amazonaws.com',
	database: 'da790omsnum82d',
	username: 'cnbvouylkxgbph',
	port: 5432,
	password: '22b11a2896de1f5283d9f91c4603c10c2652fc52dbe85d32c420e8bbd7052ccd',
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