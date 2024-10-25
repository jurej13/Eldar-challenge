import { UserRoleEnum } from '../../../core/enums/UserRole.enum';

export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRoleEnum;
  phone: string;
  token?: string;
}
