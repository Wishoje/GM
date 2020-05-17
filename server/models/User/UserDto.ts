import { IsString } from 'class-validator';

class UserDto {
	@IsString()
	public name: string;

	@IsString()
	public email: string;

	@IsString()
	public password: string;

	@IsString()
	public loginType?: string;

	@IsString()
	public image?: string;
}

export default UserDto;