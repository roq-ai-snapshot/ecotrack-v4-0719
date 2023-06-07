import { EnvironmentalDataInterface } from 'interfaces/environmental-data';
import { GoalInterface } from 'interfaces/goal';
import { UserInterface } from 'interfaces/user';

export interface BusinessOrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  environmental_data?: EnvironmentalDataInterface[];
  goal?: GoalInterface[];
  user?: UserInterface;
  _count?: {
    environmental_data?: number;
    goal?: number;
  };
}
