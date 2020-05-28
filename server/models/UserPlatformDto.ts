import { IsString } from 'class-validator';

class UserPlatformDto {
	public id: number;

    public name: string;

	public active: number;

	public sort?: number;

    public image?: string;
    
    public type?: number;
}

export default UserPlatformDto;