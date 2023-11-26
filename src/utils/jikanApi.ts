import createClient from 'openapi-fetch';

import { paths } from '@/schema';

export const jikanRest = createClient<paths>({
  baseUrl: 'https://api.jikan.moe/v4',
});
