import { UserResourceInterface } from 'interfaces/user-resource';

export interface ResourceInterface {
  id?: string;
  title: string;
  description: string;
  url: string;
  created_at?: Date;
  updated_at?: Date;
  user_resource?: UserResourceInterface[];

  _count?: {
    user_resource?: number;
  };
}
