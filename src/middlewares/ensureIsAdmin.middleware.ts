import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import jwt from 'jsonwebtoken'

export const ensureIsAdminMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const {isAdmin} = response.locals

	if(!isAdmin){
		throw new AppError("Insufficient Permission", 403)
	}

	return next()
}