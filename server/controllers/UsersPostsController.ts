import * as express from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import PageNotFoundException from '../exceptions/PageNotFoundException';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ControllerInterface from '../interfaces/ControllerInterface';
import UserPostsDto from '../models/User/UserPostsDto';
import UserPosts from '../entities/user_posts.entity';
import AuthMiddleware from '../middleware/AuthMiddleware';
import UserPostsCategoriesService from '../services/UserPostsCategoriesService';
import UserPostsInterface from '../interfaces/UserPostsInterface';
import FiltersService from '../services/FiltersService';

class UsersPostsContollers implements ControllerInterface {
	public path = '/api/usersPosts';
	public router = express.Router();
	private userPostRepository = getRepository(UserPosts);
	private userPostsCategoriesService = new UserPostsCategoriesService;
	private filtersService = new FiltersService;

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get(this.path, AuthMiddleware, this.getUserPosts);
		this.router.get(`${this.path}/categories`, this.getCategoriesPosts);
		this.router.post(this.path, [AuthMiddleware, ValidationMiddleware(UserPostsDto)], this.uploadPost);
		this.router.delete(`${this.path}/:id`, AuthMiddleware, this.deleteUser);
	}

	private getUserPosts = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			let result = null
			const userPosts = await this.userPostRepository.createQueryBuilder("user_posts")
				.innerJoinAndSelect("user_posts.user", "User")
				.innerJoinAndSelect("user_posts.userPostsCategories", "UserPostsCategories")
				.where("user_posts.user = :id", { id: response.locals.user.id })
				.getMany();

			const util = require('util');
			console.log('STORE1 ' + util.inspect(userPosts, false, null, true /* enable colors */));

			if (userPosts) {
				result = userPosts.map(userPost => {
					return {
						playlist: this.filtersService.getIframe(userPost.playlist),
						likes: userPost.likes,
						shares: userPost.shares,
						UserPostsCategories: userPost.userPostsCategories
					} as UserPostsInterface
				});
			}

			response.send(result);
		} catch (error) {
			next(error);
		} 
	}

	private getCategoriesPosts = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const categoryData = request.query.categoriesData;
			let result = null;
			const categoriesPosts = await this.userPostRepository.createQueryBuilder("user_posts")
				.innerJoinAndSelect("user_posts.user", "User")
				.innerJoinAndSelect("user_posts.userPostsCategories", "UserPostsCategories")
				.where("UserPostsCategories.category_id IN (:...categories)", { categories: categoryData })
				.getMany();

			const util = require('util');
			console.log('STORE ' + util.inspect(categoriesPosts, false, null, true /* enable colors */));
			
			if (categoriesPosts) {
				result = categoriesPosts.map(categoryPost => {
					return {
						playlist: this.filtersService.getIframe(categoryPost.playlist),
						likes: categoryPost.likes,
						shares: categoryPost.shares,
						UserPostsCategories: categoryPost.userPostsCategories
					} as UserPostsInterface
				});
			}

			response.send(result);
		} catch (error) {
			next(error);
		} 
	}

	private uploadPost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const postData: UserPostsDto = request.body;
			const newUserPost = this.userPostRepository.create({
				user_id: response.locals.user.id,
				user: response.locals.user.id,
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

export default UsersPostsContollers;