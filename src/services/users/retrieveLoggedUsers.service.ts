import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import jwt from 'jsonwebtoken'
import { AppError } from "../../error";
import 'dotenv/config'

export const retrieveLoggedUsersService = async(token: any, userId: number): Promise<TUserResponse>=>{

	token = token.split(" ")[1]

	jwt.verify(token, process.env.SECRET_KEY!, (error: any, decode: any)=>{
		if(error){
			throw new AppError(error.message, 403)
		}
	})

	const queryString: string = `
	SELECT 
		*
	FROM
		users
	WHERE
		"id" = $1;
	`

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [userId]
	}

	const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig)

	return responseUserSchema.parse(queryResult.rows[0])
}