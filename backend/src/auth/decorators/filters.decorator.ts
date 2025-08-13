import { SetMetadata } from '@nestjs/common';

export const FILTERS_KEY = 'filters';
export const Filters = (...filters: string[]) => SetMetadata(FILTERS_KEY, filters);
