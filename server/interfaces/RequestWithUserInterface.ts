
import { Request } from 'express';
import User from './UserInterface';

interface RequestWithUserInterface extends Request {
    user: User;
}

export default RequestWithUserInterface;