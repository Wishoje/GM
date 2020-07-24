import * as express from 'express';
import { getRepository } from 'typeorm';
import ControllerInterface from '../interfaces/ControllerInterface';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import UserDto from '../models/User/UserDto';
import LoginDto from '../models/User/LoginDto';
import AuthenticationService from '../services/AuthenticationService';
import AuthMiddleware from '../middleware/AuthMiddleware';
import { google } from 'googleapis';

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
		this.router.post(`${this.path}/google`, this.googleAuth);
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
			const user = await this.authenticationService.getUser(response.locals.user.email);
			response.send({ user });
		} catch (error) {
			next(error);
		}
	}

	private googleAuth = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const OAuth2 = google.auth.OAuth2;
			const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_ID, `${process.env.BASE_URL}/account`);
			const getPeople = google.people('v1');

			oauth2Client.setCredentials({
				access_token: request.body.token
			});

			const getUser = await getPeople.people.get({resourceName: "people/me", personFields: "names,emailAddresses,photos", auth: oauth2Client});
			if (getUser && getUser.data) {
				const verifyUser = await this.authenticationService.getUserByEmail(getUser.data.emailAddresses[0].value);
				if (!verifyUser) {

					const regData: UserDto = {
						name: getUser.data.names[0].displayName,
						email: getUser.data.emailAddresses[0].value,
						password: '',
						loginType: 'google',
						image: getUser.data.photos[0].url,
					};
					const {
						userAuth,
						user
					} = await this.authenticationService.registerService(regData);
					response.send({ user, userAuth });
				} else {
					const logData: LoginDto = { email: getUser.data.emailAddresses[0].value, password: '' };
					const {
						userAuth,
						user
					} = await this.authenticationService.logInService(logData);
					response.send({ user, userAuth });
				}
			}
		} catch (error) {
			next(error);
		}
	}
}

export default AuthenticationController;