import * as bcrypt from 'bcrypt';
import * as express from 'express';
import { getRepository } from 'typeorm';
import UnathorizedException from '../exceptions/UnathorizedException';
import BadRequestException from '../exceptions/BadRequestException';
import ControllerInterface from '../interfaces/ControllerInterface';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import UserDto from '../models/User/UserDto';
import User from '../entities/user.entity';
import LoginDto from '../models/User/LoginDto';
import AuthenticationService from '../services/AuthenticationService';

class AuthenticationController implements ControllerInterface {
	public path = '/auth';
	public router = express.Router();
	public authenticationService = new AuthenticationService();
	private userRepository = getRepository(User);

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/register`, ValidationMiddleware(UserDto), this.registration);
		this.router.post(`${this.path}/login`, ValidationMiddleware(LoginDto), this.logIn);
	}

	private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData: UserDto = request.body;
		const userExist = await this.userRepository.findOne({ email: userData.email });
		if (userExist) {
			next(new BadRequestException(`User with email ${userData.email} already exists`));
		} else {
			const hashedPassword = await bcrypt.hash(userData.password, 10);
			const user = this.userRepository.create({
				email: userData.email,
				name: userData.name,
				password: hashedPassword,
			});
			user.password = undefined;
			response.send(user);
		}
	}

	private logIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const logInData: LoginDto = request.body;
		const user = await this.userRepository.findOne({ email: logInData.email });
		if (user) {
		const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
		if (isPasswordMatching) {
			user.password = undefined;
			response.send(user);
		} else {
			next(new UnathorizedException('Wrong Credentials'));
		}
		} else {
			next(new UnathorizedException('Wrong Credentials'));
		}
	}
}

export default AuthenticationController;