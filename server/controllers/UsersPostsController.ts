import * as express from 'express';
import { getRepository } from 'typeorm';
import PageNotFoundException from '../exceptions/PageNotFoundException';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ControllerInterface from '../interfaces/ControllerInterface';
import UserPostsDto from '../models/User/UserPostsDto';
import UserPosts from '../entities/user_posts.entity';
import AuthMiddleware from '../middleware/AuthMiddleware';

class UsersContollers implements ControllerInterface {
	public path = '/api/usersPosts';
	public router = express.Router();
	private userRepository = getRepository(UserPosts);

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get(this.path, this.getUser);
		this.router.all(`${this.path}/*`, AuthMiddleware)
		.post(this.path, ValidationMiddleware(UserPostsDto), this.createUser)
		.delete(`${this.path}/:id`, this.deleteUser);
	}

	private getUser = async (request: express.Request, response: express.Response) => {
		const userData = await this.userRepository.find();
		response.send(userData);
	}

	private createUser = async (request: express.Request, response: express.Response) => {
		const postData: UserPosts = request.body;
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