export const RESULT_STATUS = {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  CONFIRMED: 'CONFIRMED',
  DISPUTED: 'DISPUTED',
} as const;

export type ResultStatusType = (typeof RESULT_STATUS)[keyof typeof RESULT_STATUS];
