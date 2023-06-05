import { number, z } from 'zod'

export const userSchema = z.object({
	id: z.number(),
	name: z.string({ required_error: 'Required' }),
	email: z.string({ required_error: 'Invalid email' }).email(),
	password: z.string({ required_error: 'Expected string, received number' }),
	admin: z.boolean().optional(),
	active: z.boolean()
})

export const requestUserSchema = userSchema.omit({
	id: true,
	active: true
})

export const responseUserSchema = userSchema.omit({
	password: true
})

export const updateUserSchema = userSchema.omit({
	id: true,
	admin: true,
	active: true
}).partial()


export const petsSchema = z.object({
	id: z.number(),
	name: z.string(),
	owner: z.string(),
	active: z.boolean()
})

export const petsSchemaRequest = petsSchema.omit({id: true, active: true})