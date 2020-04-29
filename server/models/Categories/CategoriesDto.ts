import { IsString, IsInt } from 'class-validator';

class CategoriesDto {
	@IsString()
	public name: string;

	@IsInt()
    public active: number;

    @IsInt()
    public sort: number;

    @IsString()
    public image: string;
}

export default CategoriesDto;