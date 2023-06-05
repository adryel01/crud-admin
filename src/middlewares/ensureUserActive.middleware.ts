
import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

export const ensureUserActiveMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {


	const userId: string = request.params.id

	const queryString: string = `
		SELECT 
			*
		FROM
			users
		WHERE
			id = $1;
	`

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [userId]
	}

	const queryResult: QueryResult = await client.query(queryConfig)

	if (queryResult.rows[0].active) {
		throw new AppError('User already active',400)
	}

	return next()


}