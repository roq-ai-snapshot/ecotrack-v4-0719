import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface EnvironmentalDataInterface {
  id?: string;
  business_organization_id: string;
  carbon_footprint: number;
  waste_production: number;
  sustainable_practices: number;
  created_at?: Date;
  updated_at?: Date;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
