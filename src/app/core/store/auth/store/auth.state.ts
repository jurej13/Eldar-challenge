import { UserModel } from '../../../../public/auth/interfaces/user.interface';
import { UserRoleEnum } from '../../../enums/UserRole.enum';

export interface AuthState {
  user: UserModel | null;
  role: UserRoleEnum | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  role: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};
