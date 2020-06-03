import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import UnathorizedException from '../exceptions/UnathorizedException';
import DataStoredInTokenInterface from '../interfaces/DataStoredInTokenInterface';
import { getRepository } from 'typeorm';
import User from '../entities/user.entity';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
	const token = request.cookies['x-access-token'];
	const userRepository = getRepository(User);
	if (token) {
		const secret = process.env.JWT_SECRET;
		try {
			const verificationResponse = jwt.verify(token, secret) as DataStoredInTokenInterface;
			const id = verificationResponse._id;
			const user = await userRepository.findOne(id);
		if (user) {
			response.locals.user = user;
			next();
		} else {
			next(new UnathorizedException('Please check your credentials'));
		}
		} catch (error) {
			next(new UnathorizedException('Please check your credentials'));
		}
	} else {
		next(new UnathorizedException('Please check your credentials'));
	}
}

export default authMiddleware;