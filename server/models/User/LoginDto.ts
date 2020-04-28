import { IsString } from 'class-validator';

class LoginDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default LoginDto;