import * as yup from 'yup';

export const googleLoginSchema = yup.object({
  credential: yup.string().required('Google credential is required'),
});
