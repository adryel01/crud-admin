import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";
import jwt, { decode } from 'jsonwebtoken'

export const ensureTokenIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	let token: string | undefined = request.headers.authorization


	if(!token){
		throw new AppError('Missing Bearer Token', 401)
	}
	token = token.split(" ")[1]

	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any)=>{
		if(error){
			throw new AppError(error.message, 401)
		}
		response.locals.isAdmin = decode.admin
		response.locals.id = parseInt(decode.sub)
	})
	

	return next()
}