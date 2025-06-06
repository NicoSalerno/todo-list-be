import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

export class NotFoundError extends Error {
    constructor() {
        super('Entity Not Found');
    }
}

export const notFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof NotFoundError) {
        res.status(404).json({
            error: 'NotFoundError',
            message: 'Entity not found'
        });
    } else {
        next(err);
    }
};