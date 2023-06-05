import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import jwt from 'jsonwebtoken'

export const ensureSufficientPermissionMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const {isAdmin} = response.locals
	const {id} = response.locals
	const userId = request.params.id

	if(!isAdmin && id != userId){
		throw new AppError("Insufficient Permission", 403)
	}

	return next()
}