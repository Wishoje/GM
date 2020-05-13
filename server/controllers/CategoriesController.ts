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
	}

	private getCategories = async (request: express.Request, response: express.Response) => {
		try {
			const checkData = await this.categoriesRepository.find();
			let categoryType = 1;
			if (!checkData || !checkData.length) {
				await this.categoriesServices.insertCategories();
				await this.categoriesTypeServices.insertCategoriesType();
			}
			
			if (request.path.includes('platform')) {
				categoryType = 2;
			} else if (request.path.includes('genre')) {
				categoryType = 3;
			} else if (request.path.includes('streamer')) {
				categoryType = 4;
			}

			const categoriesData = await this.categoriesRepository.find({where: { active: 1, type: categoryType }});
			response.send(categoriesData);
		} catch(err) {
            throw new Error(err)
        }
	}
}

export default CategoriesController;