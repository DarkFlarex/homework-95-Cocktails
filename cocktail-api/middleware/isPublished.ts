import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { UserFields, UserMethods } from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
    user?: HydratedDocument<UserFields, UserMethods>;
}

const isPublished = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const headerValue = req.get('Authorization');

    if (headerValue) {
        const [_bearer, token] = headerValue.split(' ');

        if (token) {
            const user = await User.findOne({ token });

            if (user) {
                req.user = user;
            }
        }
    }
    return next();
};

export default isPublished;