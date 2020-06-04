import * as express from 'express';
import { getRepository } from 'typeorm';
import Categories from '../entities/categories.entity';

class CategoriesServices {
	private categoriesRepository = getRepository(Categories);

	public insertCategories = async () => {
        try {
            await this.categoriesRepository.query(`
                INSERT INTO 
                    categories (name, active, sort, image, type)
                VALUES 
                    ('Poker', 1, 17, '/images/01.png', 1),('Dota 2', 1, 1, '/images/01.png', 1),
                    ('CS:GO', 1, 2, '/images/01.png', 1),('HearthStone', 1, 4, '/images/01.png', 1), 
                    ('HoN', 1, 5, '/images/01.png', 1), ('Overwatch', 1, 6, '/images/01.png', 1), 
                    ('StarCraft', 1, 7, '/images/01.png', 1), ('WOT', 1, 8, '/images/01.png', 1), 
                    ('CoD', 1, 9, '/images/01.png', 1), ('FortNite', 1, 10, '/images/01.png', 1), 
                    ('GTA', 1, 11, '/images/01.png', 1), ('WoW', 1, 12, '/images/01.png', 1), 
                    ('PUBG', 1, 13, '/images/01.png', 1), ('Minecraft', 1, 14, '/images/01.png', 1), 
                    ('Apex', 1, 15, '/images/01.png', 1), ('EfT', 1, 16, '/images/01.png', 1), 
                    ('LoL', 1, 3, '/images/01.png', 1),('Witcher', 1, 17, '/images/01.png', 1),('Destiny', 1, 1, '/images/01.png', 1),
                    ('Half-Life', 1, 1, '/images/01.png', 1),('Spotify', 1, 17, '/images/01.png', 2),('Youtube', 1, 1, '/images/01.png', 2),
                    ('SoundCloud', 1, 2, '/images/01.png', 2),('AmazonMusic', 1, 4, '/images/01.png', 2), 
                    ('AppleMusic', 1, 5, '/images/01.png', 2), ('Jazz', 1, 6, '/images/01.png', 3), 
                    ('Chill', 1, 7, '/images/01.png', 3), ('Techno', 1, 8, '/images/01.png', 3), 
                    ('Hip Hop', 1, 9, '/images/01.png', 3), ('Rap', 1, 10, '/images/01.png', 3), 
                    ('Rock', 1, 11, '/images/01.png', 3), ('Blues', 1, 12, '/images/01.png', 3), 
                    ('Metal', 1, 13, '/images/01.png', 3), ('Ambient', 1, 14, '/images/01.png',3),
                    ('Rnb', 1, 13, '/images/01.png', 3), ('Trance', 1, 14, '/images/01.png',3),
                    ('Instrumental', 1, 13, '/images/01.png', 3), ('Reggae', 1, 13, '/images/01.png', 3),
                    ('Funk', 1, 14, '/images/01.png',3), ('Dubstep', 1, 13, '/images/01.png', 3),
                    ('Disco', 1, 14, '/images/01.png',3), ('House', 1, 11, '/images/01.png', 3),
                    ('Pop', 1, 12, '/images/01.png', 3), ('Grunge', 1, 11, '/images/01.png', 3)`);
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default CategoriesServices;