import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

export const recoverUsersService = async(userId: number): Promise<TUserResponse>=>{

	const queryString: string = `
	UPDATE users 
		SET active = true
	WHERE
		"id" = $1
	RETURNING *;
	`

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [userId]
	}

	const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig)

	return responseUserSchema.parse(queryResult.rows[0])
}