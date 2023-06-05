import { Request, Response } from "express"
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces"
import { createSessionService } from "../services/login/createSession.service"
import { requestLoginSchema } from "../schemas/login.schemas"


export const createSessionController = async (request: Request, response: Response): Promise<Response> => {

	const payload: TLoginRequest = requestLoginSchema.parse(request.body)
	const token: TLoginResponse = await createSessionService(payload)

	return response.status(200).json(token)
}