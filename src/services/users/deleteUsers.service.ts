import { QueryConfig, QueryResult } from "pg";
import { TUserResponse, TUserDataUpdate, TPetsRequest, TPets } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { response } from "express";

export const deleteUsersService = async(userId: number): Promise<TUserResponse>=>{

	const queryString: string = `
	UPDATE users 
		SET active = false
	WHERE
		"id" = $1;
	`

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [userId]
	}

	const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig)

	return queryResult.rows[0]
}

export const deletePet =async (petid: number): Promise<TPets> => {
	
	const queryString: string = `
	UPDATE pets
		SET active = false
	WHERE
		id = $1
	`

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [petid]
	}

	const queryResult: QueryResult<TPets> = await client.query(queryConfig)

	return queryResult.rows[0]
}