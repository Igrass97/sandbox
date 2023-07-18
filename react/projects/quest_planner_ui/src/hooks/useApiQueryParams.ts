import { useState } from 'react';
import { PaginatedQueryParams } from '../types';

export const useApiQueryParams = (
  initial: PaginatedQueryParams & Record<string, any> = {
    page: 1,
    page_size: 10,
  }
) => {
  return useState<PaginatedQueryParams & Record<string, any>>(initial);
};
