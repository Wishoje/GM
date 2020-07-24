import * as express from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import PageNotFoundException from '../exceptions/PageNotFoundException';
import ValidationMiddleware from '../middleware/ValidationMiddleware';
import ControllerInterface from '../interfaces/ControllerInterface';
import AuthMiddleware from '../middleware/AuthMiddleware';
import UserPostsCategoriesService from '../services/UserPostsCategoriesService';
import UserPostsInterface from '../interfaces/UserPostsInterface';
import FiltersService from '../services/FiltersService';
import UserPosts from '../entities/user_posts.entity';
import UserPostsDto from '../models/User/UserPostsDto';
import UserPostsLikeDto from '../models/User/UserPostsLikeDto';
import UserPostsLikes from '../entities/user_posts_likes.entity';

class UsersPostsContollers implements ControllerInterface {
	public path = '/api/usersPosts';
	public router = express.Router();
	private userPostRepository = getRepository(UserPosts);
	private userPostsLikesRepository = getRepository(UserPostsLikes); 
	private userPostsCategoriesService = new UserPostsCategoriesService;
	private filtersService = new FiltersService;

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get(this.path, AuthMiddleware, this.getUserPosts);
		this.router.get(`${this.path}/categories`, this.getCategoriesPosts);
		this.router.get(`${this.path}/liked`, AuthMiddleware, this.getUserPostLikes);
		this.router.get(`${this.path}/favorites`, AuthMiddleware, this.getUserFavorites);
		this.router.post(this.path, [AuthMiddleware, ValidationMiddleware(UserPostsDto)], this.uploadPost);
		this.router.post(`${this.path}/like`, [AuthMiddleware, ValidationMiddleware(UserPostsLikeDto)], this.uploadPostLike);
		this.router.delete(`${this.path}/:id`, AuthMiddleware, this.deleteUser);
	}

	private getUserPosts = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const userPosts = await this.userPostRepository.createQueryBuilder("user_posts")
				.innerJoinAndSelect("user_posts.user", "User")
				.innerJoinAndSelect("user_posts.userPostsCategories", "UserPostsCategories")
				.where("user_posts.user = :id", { id: response.locals.user.id })
				.getMany();

			const result = await this.filtersService.iframeDataHelper(userPosts);

			response.send(result);
		} catch (error) {
			next(error);
		} 
	}

	private getCategoriesPosts = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const categoryData = request.query.categoriesData;
			
			const categoriesPosts = await this.userPostRepository.createQueryBuilder("user_posts")
				.innerJoinAndSelect("user_posts.user", "User")
				.innerJoinAndSelect("user_posts.userPostsCategories", "UserPostsCategories")
				.where("UserPostsCategories.category_id IN (:...categories)", { categories: categoryData })
				.limit(20)
				.getMany();
			
			const result = await this.filtersService.iframeDataHelper(categoriesPosts);

			result.sort((a, b) => parseInt(b.likes) - parseInt(a.likes));

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

	private uploadPostLike = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const postData: UserPostsLikeDto = request.body;
			const userId = response.locals.user.id;

			const userPostLike = this.userPostsLikesRepository.create({
				user: userId,
				userpost: postData.playlistId as any
			});

			if (userPostLike) {
				await this.userPostsLikesRepository.save(userPostLike);
			}

			response.send('Success');
		} catch (error) {
			next(error);
		} 
	}

	private getUserPostLikes = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const userId = response.locals.user.id;
			const userLikedPosts = await this.userPostsLikesRepository.createQueryBuilder("user_posts_likes")
				.innerJoin("user_posts_likes.user", "User")
				.innerJoinAndSelect("user_posts_likes.userpost", "UserPosts")
				.where("user_posts_likes.user = :id", { id: userId })
				.getMany();

			response.send(userLikedPosts);
		} catch (error) {
			next(error);
		} 
	}

	private getUserFavorites = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const userId = response.locals.user.id;

			const userLikedPosts = await this.userPostRepository.createQueryBuilder("user_posts")
				.innerJoin("user_posts.user", "User")
				.innerJoinAndSelect("user_posts.userPostLikes", "UserPostsLikes")
				.where("UserPostsLikes.user = :id", { id: userId })
				.getMany();

			console.log(userLikedPosts);

			const result = await this.filtersService.iframeDataHelper(userLikedPosts);

			response.send(result);
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