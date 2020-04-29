import * as express from 'express';
import { getRepository } from 'typeorm';
import Categories from '../entities/categories.entity';

class CategoriesServices {
	private categoriesRepository = getRepository(Categories);

	public insertCategories = async () => {
        try {
            await this.categoriesRepository.query(`
                INSERT INTO 
                    categories (name, active, sort, image)
                VALUES 
                    ('Dota 2', 1, 1, '/images/01.png'), ('CS:GO', 1, 2, '/images/01.png'), 
                    ('LoL', 1, 3, '/images/01.png'), ('HearthStone', 1, 4, '/images/01.png'), 
                    ('HoN', 1, 5, '/images/01.png'), ('Overwatch', 1, 6, '/images/01.png'), 
                    ('StarCraft', 1, 7, '/images/01.png'), ('WOT', 1, 8, '/images/01.png'), 
                    ('CoD', 1, 9, '/images/01.png'), ('FortNite', 1, 10, '/images/01.png'), 
                    ('GTA', 1, 11, '/images/01.png'), ('WoW', 1, 12, '/images/01.png'), 
                    ('PUBG', 1, 13, '/images/01.png'), ('Minecraft', 1, 14, '/images/01.png'), 
                    ('Apex', 1, 15, '/images/01.png'), ('EfT', 1, 16, '/images/01.png'), 
                    ('Poker', 1, 17, '/images/01.png')`);
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default CategoriesServices;