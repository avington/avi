import { withValidationErrors } from '@avi/server/middleware';

import { body } from 'express-validator';

export const validatePostLot = withValidationErrors([
  body('openDate')
    .notEmpty()
    .withMessage('Open Date is required')
    .isDate()
    .withMessage('Open Date must be a date')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('Open Date cannot be in the future');
      }
      return true;
    }),
  body('portfolioId').notEmpty().withMessage('Portfolio ID is required'),
  body('symbol').notEmpty().withMessage('Symbol is required'),
]);
