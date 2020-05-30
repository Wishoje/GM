import * as express from 'express';
import { getRepository } from 'typeorm';
import UserPostsCategories from '../entities/user_posts_categories.entity';
import UserPlatformDto from '../models/UserPlatformDto';

class UserPostsCategoriesService {
	private userPostCategoriesRepository = getRepository(UserPostsCategories);

	public insertGamePostCategories = async (game: any, userPostId: any) => {
        try {
            await Promise.all(game.map(games => {
                return this.userPostCategoriesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(UserPostsCategories)
                    .values({ 
                        category_id: games.id,
                        category_name: games.name,
                        userpost: userPostId
                    })
                    .execute();
                })
            );
        } catch(err) {
            throw new Error(err)
        }
    }

    public insertPlatformPostCategories = async (platform: UserPlatformDto, userPostId: any) => {
        try {
            this.userPostCategoriesRepository
                .createQueryBuilder()
                .insert()
                .into(UserPostsCategories)
                .values({ 
                    category_id: platform.id,
                    category_name: platform.name,
                    userpost: userPostId
                })
                .execute();
        } catch(err) {
            throw new Error(err)
        }
    }

    public insertGenrePostCategories = async (genre: any, userPostId: any) => {
        try {

            await Promise.all(genre.map(genres => {
                return this.userPostCategoriesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(UserPostsCategories)
                    .values({ 
                        category_id: genres.id,
                        category_name: genres.name,
                        userpost: userPostId
                    })
                    .execute();
                })
            );
        } catch(err) {
            throw new Error(err)
        }
    }
}

export default UserPostsCategoriesService;