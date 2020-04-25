import { IsString } from 'class-validator';

class CategoriesDto {
	@IsString()
	public name: string;
}

export default CategoriesDto;