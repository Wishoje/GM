import * as express from 'express';
import { getRepository } from 'typeorm';
import UserPostsCategories from '../entities/user_posts_categories.entity';
import UserPlatformDto from '../models/UserPlatformDto';

class UserPostsCategoriesService {
	private userPostCategoriesRepository = getRepository(UserPostsCategories);

	public insertGamePostCategories = async (game: any, userPostId: number) => {
        try {
            await Promise.all(game.map(games => {
                return this.userPostCategoriesRepository.query(`
                    INSERT INTO 
                        user_posts_categories(user_post_id, category_id, category_name)
                    VALUES 
                        (${userPostId}, ${games.id}, '${games.name}')`);
            }));
        } catch(err) {
            throw new Error(err)
        }
    }

    public insertPlatformPostCategories = async (platform: UserPlatformDto, userPostId: number) => {
        try {
            await this.userPostCategoriesRepository.query(`
                INSERT INTO 
                    user_posts_categories(user_post_id, category_id, category_name)
                VALUES 
                    (${userPostId}, ${platform.id}, '${platform.name}')`
                );
        } catch(err) {
            throw new Error(err)
        }
    }

    public insertGenrePostCategories = async (genre: any, userPostId: number) => {
        try {
            await Promise.all(genre.map(genres => {
                return this.userPostCategoriesRepository.query(`
                    INSERT INTO 
                        user_posts_categories(user_post_id, category_id, category_name)
                    VALUES 
                        (${userPostId}, ${genres.id}, '${genres.name}')`);
            }));
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default UserPostsCategoriesService;