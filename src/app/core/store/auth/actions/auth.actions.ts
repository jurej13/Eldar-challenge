import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../../../public/auth/interfaces/user.interface';
import { UserRoleEnum } from '../../../enums/UserRole.enum';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ username: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserModel; role: UserRoleEnum }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
