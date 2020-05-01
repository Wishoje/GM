import * as express from 'express';
import { getRepository } from 'typeorm';
import ControllerInterface from '../interfaces/ControllerInterface';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import UserDto from '../models/User/UserDto';
import LoginDto from '../models/User/LoginDto';
import AuthenticationService from '../services/AuthenticationService';

class AuthenticationController implements ControllerInterface {
	public path = '/auth';
	public router = express.Router();
	public authenticationService = new AuthenticationService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/register`, ValidationMiddleware(UserDto), this.registration);
		this.router.post(`${this.path}/login`, ValidationMiddleware(LoginDto), this.logIn);
		this.router.post(`${this.path}/logout`, this.logOut);
	}

	private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const userData: UserDto = request.body;
		try {
			const {
			  	cookie,
			  	user,
			} = await this.authenticationService.registerService(userData);
				response.setHeader('Set-Cookie', [cookie]);
				response.send(user);
    		} catch (error) {
      			next(error);
		}
	}

	private logIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const logInData: LoginDto = request.body;
		try {
			const {
			  	cookie,
			  	user,
			} = await this.authenticationService.logInService(logInData);
				response.setHeader('Set-Cookie', [cookie]);
				response.send(user);
    		} catch (error) {
      			next(error);
		}
	}

	private logOut = (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
			response.send(200);
		} catch (error) {
			next(error);
		}
	}
}

export default AuthenticationController;