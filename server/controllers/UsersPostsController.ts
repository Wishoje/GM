import * as express from 'express';
import { getRepository } from 'typeorm';
import PageNotFoundException from '../exceptions/PageNotFoundException';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ControllerInterface from '../interfaces/ControllerInterface';
import UserPostsDto from '../models/User/UserPostsDto';
import UserPosts from '../entities/user_posts.entity';
import AuthMiddleware from '../middleware/AuthMiddleware';
import UserPostsCategoriesService from '../services/UserPostsCategoriesService';

class UsersContollers implements ControllerInterface {
	public path = '/api/usersPosts';
	public router = express.Router();
	private userPostRepository = getRepository(UserPosts);
	private userPostsCategoriesService = new UserPostsCategoriesService;

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get(this.path, this.getUserPosts);
		this.router.post(this.path, [AuthMiddleware, ValidationMiddleware(UserPostsDto)], this.uploadPost);
		this.router.delete(`${this.path}/:id`, AuthMiddleware, this.deleteUser);
	}

	private getUserPosts = async (request: express.Request, response: express.Response) => {
		const userData = await this.userPostRepository.find({ user_id: response.locals.user.id });
		response.send(userData);
	}

	private uploadPost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const postData: UserPostsDto = request.body;
			const newUserPost = this.userPostRepository.create({
				user_id: response.locals.user.id,
				playlist: postData.playlist,
				twitch_link: postData.twitch,
				mixer: postData.mixer
			});

			if (newUserPost) {
				await this.userPostRepository.save(newUserPost);
			}
			const getPost = await this.userPostRepository.findOne({ playlist: postData.playlist });
			if (getPost.id) {
				await this.userPostsCategoriesService.insertGamePostCategories(postData.game, getPost.id);
				await this.userPostsCategoriesService.insertGenrePostCategories(postData.genre, getPost.id);
				await this.userPostsCategoriesService.insertPlatformPostCategories(postData.musicApp, getPost.id);
			}
			response.send('Success');
		} catch (error) {
			next(error);
		} 
	}

	private deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const id = request.params.id;
		const deleteResponse = await this.userPostRepository.delete(id);
		if (deleteResponse.raw[1]) {
			response.sendStatus(200);
		} else {
			next(new PageNotFoundException(id));
		}
	}
}

export default UsersContollers;