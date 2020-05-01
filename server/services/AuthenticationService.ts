import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import BadRequestException from '../exceptions/BadRequestException';
import AuthStoredInTokenInterface from '../interfaces/AuthStoredInTokenInterface';
import AuthTokenDataInterface from '../interfaces/AuthTokenDataInterface';
import UserDto from '../models/User/UserDto';
import UserIntefrace from '../interfaces/UserInterface';
import User from '../entities/user.entity';
import LoginDto from '../models/User/LoginDto';
import { getRepository } from 'typeorm';
import UnathorizedException from '../exceptions/UnathorizedException';

class AuthenticationService {
	private userRepository = getRepository(User);

	public async registerService(userData: UserDto) {
		const userExist = await this.userRepository.findOne({ email: userData.email });
		if (userExist) {
			throw new BadRequestException(`User with email ${userData.email} already exists`)
		}
		
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		console.log(hashedPassword);
		const user = this.userRepository.create({
			email: userData.email,
			name: userData.name,
			password: hashedPassword,
		});

		if (user) {
			await this.userRepository.save(user);
		}

		const tokenData = this.createToken(user);
		const cookie = this.createCookie(tokenData);

		return {
			cookie,
			user,
		};
	}

	public async logInService(loginData: LoginDto) {
		const user = await this.userRepository.findOne({ email: loginData.email });
		console.log(loginData);
		let cookie = null;
		if (user) {
			const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);
			if (isPasswordMatching) {
				cookie = this.createToken(user);
			} else {
				throw new UnathorizedException('Wrong Credentials');
			}
		} else {
			throw new UnathorizedException('Wrong Credentials');
		}

		return {
			cookie,
			user,
		}; 
	}

	public createCookie(tokenData: AuthTokenDataInterface) {
		return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
	}

	public createToken(user: UserIntefrace): AuthTokenDataInterface {
		const expiresIn = 60 * 60; // an hour
		const secret = process.env.JWT_SECRET;
		const dataStoredInToken: AuthStoredInTokenInterface = {
			_id: user.id,
		};
		return {
			expiresIn,
			token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
		};
	}
}

export default AuthenticationService;