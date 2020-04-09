import * as express from 'express';
import { getRepository } from 'typeorm';
import PageNotFoundException from '../exceptions/PageNotFoundException';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ControllerInterface from '../interfaces/ControllerInterface';
import UserDto from '../models/User/UserDto';
import User from '../entities/user.entity';
import UserIntefrace from '../interfaces/UserInterface';

class UsersContollers implements ControllerInterface {
	public path = '/api/users';
	public router = express.Router();
	private userRepository = getRepository(User);

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.post(this.path, ValidationMiddleware(UserDto), this.createUser);
		this.router.get(this.path, this.getUser);
		this.router.delete(`${this.path}/:id`, this.deleteUser);
	}

	private getUser = async (request: express.Request, response: express.Response) => {
		console.log('aweffeafw');
		response.send('aaaaaaaaaaa');
		// const userData = await this.userRepository.find();
		// response.send(userData);
	}

	private createUser = async (request: express.Request, response: express.Response) => {
		const postData: UserDto = request.body;
		const newUser = this.userRepository.create(postData);
		await this.userRepository.save(newUser);
		response.send(newUser);
	}

	private deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const id = request.params.id;
		const deleteResponse = await this.userRepository.delete(id);
		if (deleteResponse.raw[1]) {
			response.sendStatus(200);
		} else {
			next(new PageNotFoundException(id));
		}
	}
}

export default UsersContollers;