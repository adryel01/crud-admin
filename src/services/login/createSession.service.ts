import format from "pg-format";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createSessionService = async (payload: TLoginRequest): Promise<TLoginResponse> => {

	const queryString: string = format(`
	SELECT
		*
	FROM
		users
	WHERE
		email = %L
	`, payload.email)

	const queryResult: QueryResult<TUser> = await client.query(queryString)

	const user = queryResult.rows[0]

	if (queryResult.rowCount == 0) {
		throw new AppError('Wrong email/password',401)
	}

	const comparePassword: boolean = await bcrypt.compare(payload.password, user.password)

	if (!comparePassword) {
		throw new AppError('Wrong email/password',401)
	}

	if (!user.active){
		throw new AppError('Wrong email/password',401)
	}

	const token: string = jwt.sign(
		{
			admin: user.admin
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: process.env.EXPIRES_IN!,
			subject: user.id.toString()
		}
	)

	return { token }
}