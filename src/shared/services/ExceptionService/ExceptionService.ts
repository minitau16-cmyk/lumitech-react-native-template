/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

import { z } from 'zod';
import { Injectable } from '../lib';
import { LocalizationServiceImpl } from '../LocalizationService';

export const ErrorSchema = z.object({
  message: z.string(),
  successful: z.boolean(),
  status: z.string(),
  data: z.null(),
});

export interface ExceptionService {
  errorResolver(error: unknown): string;
}

@Injectable()
export class ExceptionServiceImpl implements ExceptionService {
  constructor(private readonly localizationService: LocalizationServiceImpl) {}

  errorResolver(error: unknown): string {
    const parsedError = ErrorSchema.safeParse(error);

    if (parsedError.success) {
      return parsedError.data.message;
    }

    return this.localizationService.i18n.t('errors.server-unable');
  }
}
