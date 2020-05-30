
import UserPostsCategories from './UserPostsCategoriesInterface';

interface UserPostsInterface {
	playlist: string;
	likes: number;
	shares: number;
    UserPostsCategories: UserPostsCategories[]
}

export default UserPostsInterface;