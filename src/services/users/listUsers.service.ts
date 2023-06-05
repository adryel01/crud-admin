import { QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import jwt from 'jsonwebtoken'
import { AppError } from "../../error";
import 'dotenv/config'

export const listUsersService = async(): Promise<Array<TUserResponse>>=>{

	const queryString: string = `
	SELECT 
		"id", "name", "email", "admin", "active"
	FROM
		users;
	`

	const queryResult: QueryResult<TUserResponse> = await client.query(queryString)

	return queryResult.rows
}