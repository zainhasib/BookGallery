import { User } from './user';

export class UserResponse {
  success: boolean;
  message: string;
  data: User;
}
