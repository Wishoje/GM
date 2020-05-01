import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UnathorizedException from '../exceptions/UnathorizedException';
import DataStoredInTokenInterface from '../interfaces/DataStoredInTokenInterface';
import RequestWithUserInterface from '../interfaces/RequestWithUserInterface';
import { getRepository } from 'typeorm';
import User from '../entities/user.entity';

async function authMiddleware(request: RequestWithUserInterface, response: Response, next: NextFunction) {
	const cookies = request.cookies;
	const userRepository = getRepository(User);
	if (cookies && cookies.Authorization) {
		const secret = process.env.JWT_SECRET;
		try {
			const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInTokenInterface;
			const id = verificationResponse._id;
			const user = await userRepository.findOne(id);
		if (user) {
			request.user = user;
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