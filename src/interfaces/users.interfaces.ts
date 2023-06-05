import {z} from 'zod'
import { petsSchema, petsSchemaRequest, requestUserSchema, responseUserSchema, updateUserSchema, userSchema } from '../schemas/users.schemas';

export type TUser = z.infer<typeof userSchema>

export type TUserRequest = z.infer<typeof requestUserSchema>

export type TUserDataUpdate = z.infer<typeof updateUserSchema>

export type TUserResponse = z.infer<typeof responseUserSchema>

export type TPets = z.infer<typeof petsSchema>

export type TPetsRequest = z.infer<typeof petsSchemaRequest>