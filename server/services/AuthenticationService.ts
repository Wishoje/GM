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
			throw new BadRequestException(`User with email ${userData.email} already exists`);
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);
		const user = this.userRepository.create({
			email: userData.email,
			name: userData.name,
			password: hashedPassword,
			login_type: userData.loginType || 'internal',
			image: userData.image || ''
		});

		if (user) {
			await this.userRepository.save(user);
		}

		const userAuth = this.createToken(user);

		return {
			userAuth,
			user
		};
	}

	public async logInService(loginData: LoginDto) {
		const user = await this.getUserByEmail(loginData.email);
		let userAuth = null;
		if (user) {
			const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);
			if (isPasswordMatching) {
				userAuth = this.createToken(user);
			} else {
				throw new UnathorizedException('Wrong Credentials');
			}
		} else {
			throw new UnathorizedException('Wrong Credentials');
		}

		return {
			userAuth,
			user
		}; 
	}

	public createToken(user: UserIntefrace): AuthTokenDataInterface {
		const secret = process.env.JWT_SECRET;
		const dataStoredInToken: AuthStoredInTokenInterface = {
			_id: user.id,
			_email: user.email
		};
		
		return {
			token: jwt.sign(dataStoredInToken, secret),
		};
	}

	public async getUserByEmail(email: string) {
		try {
			const user = await this.userRepository.createQueryBuilder("user")
				.addSelect('name').addSelect('email').addSelect('followers').addSelect('playlists')
				.where("user.email = :email", {email: email}).getOne();
			return user;
        } catch(err) {
            throw new Error(err);
        } 
	}
}

export default AuthenticationService;