import * as yup from 'yup';

export const userResourceValidationSchema = yup.object().shape({
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  resource_id: yup.string().nullable().required(),
});
