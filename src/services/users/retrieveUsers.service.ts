import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

export const retrieveUsersService = async(userId: number): Promise<TUserResponse>=>{

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