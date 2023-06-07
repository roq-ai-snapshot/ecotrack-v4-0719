import * as yup from 'yup';
import { environmentalDataValidationSchema } from 'validationSchema/environmental-data';
import { goalValidationSchema } from 'validationSchema/goals';

export const businessOrganizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  environmental_data: yup.array().of(environmentalDataValidationSchema),
  goal: yup.array().of(goalValidationSchema),
});
