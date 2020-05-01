
import {
	cleanEnv, str,
} from 'envalid';

function validateEnv() {
	cleanEnv(process.env, {
		JWT_SECRET: str(),
	});
}

export default validateEnv;