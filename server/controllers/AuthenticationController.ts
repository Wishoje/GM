import * as express from 'express';
import { getRepository } from 'typeorm';
import ControllerInterface from '../interfaces/ControllerInterface';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import UserDto from '../models/User/UserDto';
import LoginDto from '../models/User/LoginDto';
import AuthenticationService from '../services/AuthenticationService';
import AuthMiddleware from '../middleware/AuthMiddleware';

class AuthenticationController implements ControllerInterface {
	public path = '/api';
	public router = express.Router();
	public authenticationService = new AuthenticationService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/register`, ValidationMiddleware(UserDto), this.registration);
		this.router.post(`${this.path}/login`, ValidationMiddleware(LoginDto), this.logIn);
		this.router.get(`${this.path}/me`, AuthMiddleware, this.getMe);

	}

	private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData: UserDto = request.body;
		try {
			const {
				userAuth,
			  	user
			} = await this.authenticationService.registerService(userData);
				response.send({ user, userAuth });
    		} catch (error) {
      			next(error);
		}
	}

	private logIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const logInData: LoginDto = request.body;
		try {
			const {
				userAuth,
			  	user
			} = await this.authenticationService.logInService(logInData);
				response.send({ user, userAuth });
    		} catch (error) {
      			next(error);
		}
	}

	private getMe = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const user = await this.authenticationService.getUserByEmail(response.locals.user.email);
			response.send({ user });
		} catch (error) {
			next(error);
		}
	}
}

export default AuthenticationController;