import * as express from 'express';
import { getRepository } from 'typeorm';
import CategoriesType from '../entities/categories_type.entity';

class CategoriesServices {
	private categoriesTypeRepository = getRepository(CategoriesType);

	public async insertCategoriesType() {
        try {
            await this.categoriesTypeRepository.query(`
                INSERT INTO 
                    categories_type (category_type)
                VALUES 
                    ('Games'),('Platform'),('Genre')`);
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default CategoriesServices;