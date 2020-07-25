
import UserPostsCategories from './UserPostsCategoriesInterface';

interface UserPostsInterface {
	id: number,
	playlist: string;
	likes: number;
	shares: number;
	UserPostsCategories: UserPostsCategories[],
	userName: string,
	userId: number
}

export default UserPostsInterface;