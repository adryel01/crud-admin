import { Router } from "express";
import { createUsersController, deleteUsersController, listUsersController, recoverUsersController, retrieveLoggedUsersController, retrieveUsersController, updateUsersController } from "../controllers/users.controllers";
import { ensureEmailNotExistsMiddleware } from "../middlewares/ensureEmailNotExists.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureSufficientPermissionMiddleware } from "../middlewares/ensureSufficientPermission.middleware";
import { ensureUserActiveMiddleware } from "../middlewares/ensureUserActive.middleware";


export const userRoutes: Router = Router()

userRoutes.post('', ensureEmailNotExistsMiddleware, createUsersController)

userRoutes.get('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listUsersController)

userRoutes.get('/profile', ensureTokenIsValidMiddleware, retrieveLoggedUsersController)

// userRoutes.get('/:id', ensureUserExistsMiddleware, retrieveUsersController)

userRoutes.patch('/:id', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureEmailNotExistsMiddleware, ensureSufficientPermissionMiddleware, updateUsersController)

userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureSufficientPermissionMiddleware, deleteUsersController)

userRoutes.put('/:id/recover', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureSufficientPermissionMiddleware, ensureUserActiveMiddleware, recoverUsersController)