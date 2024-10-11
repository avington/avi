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
  body('transactionType')
    .notEmpty()
    .withMessage('Transaction Type is required')
    .isIn(['BUY', 'SELL'])
    .withMessage('Transaction Type must be BUY or SELL'),
  body('shares')
    .notEmpty()
    .withMessage('Shares is required')
    .isNumeric()
    .withMessage('Shares must be a number')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('Shares must be greater than 0');
      }
      return true;
    }),
  body('costPerShare')
    .notEmpty()
    .withMessage('Cost Per Share is required')
    .isNumeric()
    .withMessage('Shares must be a number')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('Cost per Shares must be greater than 0');
      }
      return true;
    }),
]);
