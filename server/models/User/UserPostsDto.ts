import { IsString } from 'class-validator';
import UserPlatformDto from '../../models/UserPlatformDto';

class UserPostsDto {
	@IsString()
	public playlist: string;

	public game: Array<any>;

	public musicApp: UserPlatformDto;

	public genre: Array<any>;

	public streamer: number;

	public twitch: string;

	public mixer: string;
}

export default UserPostsDto;