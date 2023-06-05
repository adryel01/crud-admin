import { Request, Response } from "express";
import { createUsersService } from "../services/users/createUsers.service";
import { TUserRequest, TUserResponse, TUserDataUpdate, TPetsRequest, TPets } from "../interfaces/users.interfaces";
import { listUsersService } from "../services/users/listUsers.service";
import { retrieveUsersService } from "../services/users/retrieveUsers.service";
import { updateUsersService } from "../services/users/updateUsers.service";
import { petsSchemaRequest, requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { retrieveLoggedUsersService } from "../services/users/retrieveLoggedUsers.service";
import { deleteUsersService } from "../services/users/deleteUsers.service";
import { recoverUsersService } from "../services/users/recoverUsers.service";

export const createUsersController = async (request: Request, response: Response): Promise<Response> => {

	const userData: TUserRequest = requestUserSchema.parse(request.body)
	const newUser: TUserResponse = await createUsersService(userData)

	return response.status(201).json(newUser)

}

export const listUsersController = async (request: Request, response: Response): Promise<Response> => {

	const users: Array<TUserResponse> = await listUsersService()

	return response.status(200).json(users)
}

export const retrieveUsersController = async (request: Request, response: Response): Promise<Response> => {

	const userId: number = parseInt(request.params.id)
	const user: TUserResponse = await retrieveUsersService(userId)

	return response.json(user)
}

export const retrieveLoggedUsersController = async (request: Request, response: Response): Promise<Response> => {

	const token = request.headers.authorization

	const { id } = response.locals

	const user: TUserResponse = await retrieveLoggedUsersService(token, id)

	return response.json(user)
}

export const updateUsersController = async (request: Request, response: Response): Promise<Response> => {

	const userId: number = parseInt(request.params.id)

	const newUserData: TUserDataUpdate = updateUserSchema.parse(request.body)

	const userUpdate: TUserResponse = await updateUsersService(newUserData, userId)

	return response.json(userUpdate)
}

export const deleteUsersController = async (request: Request, response: Response): Promise<Response> => {

	const userId: number = parseInt(request.params.id)

	await deleteUsersService(userId)

	return response.status(204).send()
}

export const recoverUsersController = async (request: Request, response: Response): Promise<Response> => {

	const userId: number = parseInt(request.params.id)

	const user: TUserResponse = await recoverUsersService(userId)

	return response.json(user)
}


export const createPetsController =async (request: Request, response: Response): Promise<Response> => {
	
	const petData: TPetsRequest = petsSchemaRequest.parse(request.body)

	const newPet: TPets = await createPetsService(petData)

	return response.status(201).json(newPet)
}