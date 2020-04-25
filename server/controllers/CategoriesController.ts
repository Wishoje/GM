import * as express from 'express';
import { getRepository } from 'typeorm';
import ControllerInterface from '../interfaces/ControllerInterface';
import Categories from '../entities/categories.entity';

class CategoriesController implements ControllerInterface {
	public path = '/api/categories';
	public router = express.Router();
	private categoriesRepository = getRepository(Categories);

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get(this.path, this.getCategories);
	}

	private getCategories = async (request: express.Request, response: express.Response) => {
		const checkData = await this.categoriesRepository.find();
		if (!checkData || !checkData.length) {
			await this.categoriesRepository.query(`INSERT INTO categories (name, active)
													VALUES ('Dota 2', 1), ('CS:GO', 1), ('LoL', 1), ('HearthStone', 1), ('HoN', 1),
													('Overwatch', 1), ('StarCraft', 1), ('WOT', 1), ('CoD', 1), ('FortNite', 1), ('GTA', 1),
													('WoW', 1), ('PUBG', 1), ('Minecraft', 1), ('Apex', 1), ('EfT', 1), ('Poker', 1)`);
		}
		const categoriesData = await this.categoriesRepository.find({ active: 1 });
		console.log(categoriesData);
		response.send(categoriesData);
	}
}

export default CategoriesController;