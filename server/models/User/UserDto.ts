import { IsString } from 'class-validator';

class UserDto {
	@IsString()
	public name: string;

	@IsString()
	public email: string;

	@IsString()
	public password: string;

	public loginType?: string;

	public image?: string;
}

export default UserDto;