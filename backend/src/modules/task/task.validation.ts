import * as yup from 'yup';

export const completeTaskSchema = yup.object({
  submissionLink: yup.string().url('Must be a valid URL').required('Submission link is required'),
  submissionText: yup.string().optional(),
});
