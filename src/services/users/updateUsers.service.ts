import { QueryConfig, QueryResult } from "pg";
import { TUserResponse, TUserDataUpdate } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { response } from "express";

export const updateUsersService = async(newUserData: TUserDataUpdate, userId: number): Promise<TUserResponse>=>{

	// const {isAdmin} = response.locals
	// console.log(isAdmin)

	const queryString: string = format(`
	UPDATE users 
		SET(%I) = ROW(%L)
	WHERE
		"id" = $1
	RETURNING "id", "name", "email", "admin", "active";
	`,
	Object.keys(newUserData),
	Object.values(newUserData)
	)

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [userId]
	}

	const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig)

	return queryResult.rows[0]
}