import { IsString } from 'class-validator';

class UserPostsDto {
	@IsString()
	public name: string;

	@IsString()
	public playlist: string;
}

export default UserPostsDto;