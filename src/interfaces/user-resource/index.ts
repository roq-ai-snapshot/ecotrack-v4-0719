import { UserInterface } from 'interfaces/user';
import { ResourceInterface } from 'interfaces/resource';

export interface UserResourceInterface {
  id?: string;
  user_id: string;
  resource_id: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  resource?: ResourceInterface;
  _count?: {};
}
