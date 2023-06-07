import * as yup from 'yup';

export const goalValidationSchema = yup.object().shape({
  carbon_footprint_goal: yup.number().integer().required(),
  waste_reduction_goal: yup.number().integer().required(),
  sustainable_practices_goal: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  business_organization_id: yup.string().nullable().required(),
});
