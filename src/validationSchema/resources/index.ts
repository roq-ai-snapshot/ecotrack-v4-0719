import * as yup from 'yup';
import { userResourceValidationSchema } from 'validationSchema/user-resources';

export const resourceValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  url: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_resource: yup.array().of(userResourceValidationSchema),
});
