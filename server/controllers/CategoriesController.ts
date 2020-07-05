import * as express from 'express';
import { getRepository } from 'typeorm';
import ControllerInterface from '../interfaces/ControllerInterface';
import Categories from '../entities/categories.entity';
import CategoriesServices from '../services/CategoriesServices';
import CategoriesTypeServices from '../services/CategoriesTypeServices';

class CategoriesController implements ControllerInterface {
	public path = '/api/categories';
	public router = express.Router();
	private categoriesRepository = getRepository(Categories);
	private categoriesServices = new CategoriesServices;
	private categoriesTypeServices = new CategoriesTypeServices;

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get([`${this.path}`, `${this.path}/games`, `${this.path}/platform`, `${this.path}/genre` ,`${this.path}/streamer` ], this.getCategories);
		this.router.get(`${this.path}/test`, this.getTest);
	}

	private getTest = async (request: express.Request, response: express.Response) => {
		response.send('HERE TESTING API');
	}

	private getCategories = async (request: express.Request, response: express.Response) => {
		try {
			const checkData = await this.categoriesRepository.find();
			let categoryType = null;
			if (!checkData || !checkData.length) {
				await this.categoriesServices.insertCategories();
				await this.categoriesTypeServices.insertCategoriesType();
			}
			if (request.path.includes('games')) {
				categoryType = 1;
			} else if (request.path.includes('platform')) {
				categoryType = 2;
			} else if (request.path.includes('genre')) {
				categoryType = 3;
			} else if (request.path.includes('streamer')) {
				categoryType = 4;
			}

			const categoriesData = categoryType ?
				await this.categoriesRepository.find({where: { active: 1, type: categoryType }}) :
				await this.categoriesRepository.find({where: { active: 1 }});
			response.send(categoriesData);
		} catch(err) {
            throw new Error(err)
        }
	}
}

export default CategoriesController;