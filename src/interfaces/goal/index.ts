import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface GoalInterface {
  id?: string;
  business_organization_id: string;
  carbon_footprint_goal: number;
  waste_reduction_goal: number;
  sustainable_practices_goal: number;
  created_at?: Date;
  updated_at?: Date;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
